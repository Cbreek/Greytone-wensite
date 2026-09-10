declare const google: any
declare const gapi: any

const SCOPES = 'https://www.googleapis.com/auth/gmail.compose'
let tokenClient: any = null
let accessToken: string | null = null

export function initGmail(clientId: string) {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: SCOPES,
    callback: (resp: any) => {
      if (resp.access_token) accessToken = resp.access_token
    },
  })
}

export async function ensureGmailAccess(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (accessToken) { resolve(); return }
    tokenClient.callback = (resp: any) => {
      if (resp.error) { reject(new Error(resp.error)); return }
      accessToken = resp.access_token
      resolve()
    }
    tokenClient.requestAccessToken({ prompt: 'consent' })
  })
}

function toBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export async function createGmailDraft(params: {
  to: string
  subject: string
  htmlBody: string
}): Promise<string> {
  await ensureGmailAccess()

  const { to, subject, htmlBody } = params

  const message =
    `To: ${to}\r\n` +
    `Subject: ${subject}\r\n` +
    `MIME-Version: 1.0\r\n` +
    `Content-Type: text/html; charset=UTF-8\r\n` +
    `\r\n` +
    htmlBody

  let raw: string
  try {
    raw = toBase64Url(message)
  } catch (e: any) {
    throw new Error(`Encoding error: ${e.message}`)
  }

  let response: Response
  try {
    response = await fetch(
      'https://gmail.googleapis.com/gmail/v1/users/me/drafts',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: { raw } }),
      }
    )
  } catch (e: any) {
    throw new Error(`Network error: ${e.message}`)
  }

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    if (response.status === 401) {
      accessToken = null
      return createGmailDraft(params)
    }
    throw new Error(err?.error?.message || `Gmail API error ${response.status}`)
  }

  const draft = await response.json()
  return draft.id
}

export function draftUrl(draftId: string): string {
  return `https://mail.google.com/mail/#drafts/${draftId}`
}

// Open a blank tab synchronously, inside the click handler, before any
// awaited work — browsers only allow window.open() without treating it
// as a blocked pop-up when it happens immediately in response to a click.
export function openPendingGmailTab(): Window | null {
  return window.open('about:blank', '_blank')
}

export function openGmailDraft(draftId: string, pendingTab?: Window | null) {
  const url = draftUrl(draftId)
  if (pendingTab && !pendingTab.closed) {
    pendingTab.location.href = url
  } else {
    window.open(url, '_blank', 'noopener')
  }
}
