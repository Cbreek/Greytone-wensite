import { useState } from 'react'
import type { ProspectData, TemplateId } from '../../types'
import { INDUSTRIES } from '../../types'
import { TEMPLATES } from '../../templates'
import { generateObservation } from '../../lib/ai'

const TEMPLATE_OPTIONS = TEMPLATES.map(t => ({ id: t.id, label: t.label, requiresReferrer: t.requiresReferrer }))

const CITY_AREAS = [
  'Orange County',
  'Los Angeles County',
  'San Diego County',
] as const

const BLANK: ProspectData = {
  firstName: '',
  businessName: '',
  cityArea: '',
  industry: '',
  websiteUrl: '',
  referrerName: '',
  observation: '',
  templateId: 'cold',
  toEmail: '',
}

interface Props {
  onGenerate: (data: ProspectData) => void
}

export function ProspectForm({ onGenerate }: Props) {
  const [data, setData] = useState<ProspectData>(BLANK)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')

  function set<K extends keyof ProspectData>(key: K, value: ProspectData[K]) {
    setData(prev => ({ ...prev, [key]: value }))
  }

  const selectedTemplate = TEMPLATE_OPTIONS.find(t => t.id === data.templateId)

  async function handleAiAssist() {
    setAiError('')
    setAiLoading(true)
    try {
      const obs = await generateObservation(data)
      set('observation', obs)
    } catch (e: any) {
      setAiError(e.message || 'AI assist failed')
    } finally {
      setAiLoading(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onGenerate(data)
  }

  function handleReset() {
    setData(BLANK)
    setAiError('')
  }

  const inputClass = "w-full px-3 py-2.5 bg-white border border-greytone-200 rounded text-greytone-900 text-sm font-sans focus:outline-none focus:border-greytone-400 transition-colors"
  const labelClass = "block text-xs tracking-wider uppercase text-greytone-500 mb-1.5 font-sans"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 h-full">

      {/* Template selector */}
      <div>
        <label className={labelClass}>Template</label>
        <select
          value={data.templateId}
          onChange={e => set('templateId', e.target.value as TemplateId)}
          className={inputClass}
        >
          {TEMPLATE_OPTIONS.map(t => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>
      </div>

      {/* To email */}
      <div>
        <label className={labelClass}>Prospect Email</label>
        <input
          type="email"
          value={data.toEmail}
          onChange={e => set('toEmail', e.target.value)}
          placeholder="mike@acmeroofing.com"
          className={inputClass}
        />
      </div>

      {/* Name + Business */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>First Name</label>
          <input
            type="text"
            required
            value={data.firstName}
            onChange={e => set('firstName', e.target.value)}
            placeholder="Mike"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Business Name</label>
          <input
            type="text"
            required
            value={data.businessName}
            onChange={e => set('businessName', e.target.value)}
            placeholder="Apex Roofing"
            className={inputClass}
          />
        </div>
      </div>

      {/* City + Industry */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>City / Area</label>
          <select
            value={data.cityArea}
            onChange={e => set('cityArea', e.target.value)}
            className={inputClass}
          >
            <option value="">Select…</option>
            {CITY_AREAS.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Industry</label>
          <select
            value={data.industry}
            onChange={e => set('industry', e.target.value as any)}
            className={inputClass}
          >
            <option value="">Select…</option>
            {INDUSTRIES.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Website */}
      <div>
        <label className={labelClass}>Website URL <span className="normal-case tracking-normal text-greytone-400">(optional)</span></label>
        <input
          type="url"
          value={data.websiteUrl}
          onChange={e => set('websiteUrl', e.target.value)}
          placeholder="https://apexroofing.com"
          className={inputClass}
        />
      </div>

      {/* Referrer — only shown for referral template */}
      {selectedTemplate?.requiresReferrer && (
        <div>
          <label className={labelClass}>Referrer Name</label>
          <input
            type="text"
            required
            value={data.referrerName}
            onChange={e => set('referrerName', e.target.value)}
            placeholder="Jane Smith"
            className={inputClass}
          />
        </div>
      )}

      {/* Observation */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1.5">
          <label className={labelClass + ' mb-0'}>Personalized Observation</label>
          <button
            type="button"
            onClick={handleAiAssist}
            disabled={aiLoading || !data.firstName}
            className="text-xs font-sans text-greytone-500 hover:text-greytone-700 border border-greytone-300 px-3 py-1 rounded hover:bg-greytone-50 transition-colors disabled:opacity-40"
          >
            {aiLoading ? 'Generating…' : '✦ AI Assist'}
          </button>
        </div>
        <textarea
          value={data.observation}
          onChange={e => set('observation', e.target.value)}
          placeholder="What did you notice about their business or website? Be specific."
          rows={5}
          className={inputClass + ' resize-none leading-relaxed'}
        />
        {aiError && <p className="text-xs text-red-500 mt-1 font-sans">{aiError}</p>}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 py-3 bg-greytone-800 text-greytone-50 rounded text-xs tracking-[0.18em] uppercase font-sans hover:bg-greytone-700 transition-colors"
        >
          Generate Email
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-3 border border-greytone-300 rounded text-xs tracking-wider uppercase text-greytone-500 font-sans hover:bg-greytone-50 transition-colors"
        >
          Clear
        </button>
      </div>

    </form>
  )
}
