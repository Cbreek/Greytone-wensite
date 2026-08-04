import { useEffect, useState } from 'react'
import type { ProspectData } from '../../types'
import { getTemplate } from '../../templates'
import { createGmailDraft, openGmailDraft } from '../../lib/gmail'
import { generateSubjectLines } from '../../lib/ai'

interface Props { data: ProspectData | null }

export function EmailPreview({ data }: Props) {
  const [draftLoading, setDraftLoading] = useState(false)
  const [draftError, setDraftError] = useState('')
  const [copied, setCopied] = useState(false)
  const [subject, setSubject] = useState('')
  const [subjectOptions, setSubjectOptions] = useState<string[] | null>(null)
  const [subjectLoading, setSubjectLoading] = useState(false)
  const [subjectError, setSubjectError] = useState('')

  useEffect(() => {
    if (data) {
      setSubject(getTemplate(data.templateId).subjectLine(data))
      setSubjectOptions(null)
      setSubjectError('')
    }
  }, [data])

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full min-h-64 text-greytone-400 font-sans text-sm">
        Fill in the form and click <span className="mx-1 font-medium text-greytone-600">Generate Email</span> to preview here.
      </div>
    )
  }

  const template = getTemplate(data.templateId)
  const html = template.generateHtml(data)

  async function handleRegenerateSubject() {
    setSubjectError('')
    setSubjectLoading(true)
    setSubjectOptions(null)
    try {
      const subjects = await generateSubjectLines(data!, subject)
      setSubjectOptions(subjects)
    } catch (e: any) {
      setSubjectError(e.message || 'Subject regeneration failed')
    } finally {
      setSubjectLoading(false)
    }
  }

  function chooseSubject(s: string) {
    setSubject(s)
    setSubjectOptions(null)
  }

  async function handleGmailDraft() {
    setDraftError('')
    setDraftLoading(true)
    try {
      const draftId = await createGmailDraft({ to: data!.toEmail, subject, htmlBody: html })
      openGmailDraft(draftId)
    } catch (e: any) {
      setDraftError(e.message || 'Failed to create draft')
    } finally {
      setDraftLoading(false)
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(html)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="bg-greytone-50 border border-greytone-200 rounded-lg p-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0 relative">
            <p className="text-xs tracking-wider uppercase text-greytone-400 font-sans mb-1">Subject</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="flex-1 min-w-0 px-2 py-1.5 bg-white border border-greytone-200 rounded text-sm font-sans font-medium text-greytone-800 focus:outline-none focus:border-greytone-400 transition-colors"
              />
              <button
                type="button"
                onClick={handleRegenerateSubject}
                disabled={subjectLoading}
                className="flex-shrink-0 text-xs font-sans text-greytone-500 hover:text-greytone-700 border border-greytone-300 px-3 py-1.5 rounded hover:bg-greytone-100 transition-colors disabled:opacity-40 whitespace-nowrap"
              >
                {subjectLoading ? 'Thinking…' : '✨ Regenerate'}
              </button>
            </div>
            {subjectOptions && (
              <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-greytone-200 rounded-lg shadow-md overflow-hidden">
                {subjectOptions.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => chooseSubject(s)}
                    className="block w-full text-left px-3 py-2 text-sm font-sans text-greytone-700 hover:bg-greytone-50 border-b border-greytone-100 last:border-b-0 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            {subjectError && <p className="text-xs text-red-500 mt-1 font-sans">{subjectError}</p>}
            {data.toEmail && <p className="text-xs text-greytone-400 font-sans mt-1.5">To: {data.toEmail}</p>}
          </div>
          <div className="flex gap-2 flex-shrink-0 flex-wrap">
            <button onClick={handleCopy}
              className="px-4 py-2 border border-greytone-300 rounded text-xs tracking-wider uppercase text-greytone-600 font-sans hover:bg-greytone-100 transition-colors">
              {copied ? '✓ Copied' : 'Copy HTML'}
            </button>
            <button onClick={handleGmailDraft} disabled={draftLoading}
              className="px-4 py-2 bg-greytone-800 text-greytone-50 rounded text-xs tracking-wider uppercase font-sans hover:bg-greytone-700 transition-colors disabled:opacity-50">
              {draftLoading ? 'Opening…' : '→ Open in Gmail'}
            </button>
          </div>
        </div>
        {draftError && <p className="text-xs text-red-500 mt-2 font-sans">{draftError}</p>}
      </div>
      <div className="flex-1 border border-greytone-200 rounded-lg overflow-hidden bg-white min-h-[500px]">
        <iframe srcDoc={html} title="Email Preview" className="w-full h-full min-h-[500px]" sandbox="allow-same-origin" />
      </div>
    </div>
  )
}
