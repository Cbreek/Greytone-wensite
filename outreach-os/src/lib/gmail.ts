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

export async function createGmailDraft(params: {
  to: string
  subject: string
  htmlBody: string
}): Promise<string> {
  await ensureGmailAccess()

  const { to, subject, htmlBody } = params

  const raw = btoa(
    `To: ${to}\r\n` +
    `Subject: ${subject}\r\n` +
    `MIME-Version: 1.0\r\n` +
    `Content-Type: text/html; charset=UTF-8\r\n` +
    `\r\n` +
    htmlBody
  ).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

  const response = await fetch(
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

  if (!response.ok) {
    const err = await response.json()
    if (response.status === 401) {
      accessToken = null
      return createGmailDraft(params)
    }
    throw new Error(err.error?.message || 'Failed to create Gmail draft')
  }

  const draft = await response.json()
  return draft.id
}

export function openGmailDraft(draftId: string) {
  window.open(
    `https://mail.google.com/mail/#drafts/${draftId}`,
    '_blank',
    'noopener'
  )
}
