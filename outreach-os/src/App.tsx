import { useEffect, useState } from 'react'
import { initGmail } from './lib/gmail'
import { AppLayout } from './components/layout/AppLayout'
import { ProspectForm } from './components/outreach/ProspectForm'
import { EmailPreview } from './components/outreach/EmailPreview'
import type { ProspectData } from './types'

const GMAIL_CLIENT_ID = import.meta.env.VITE_GMAIL_CLIENT_ID as string

export default function App() {
  const [generatedData, setGeneratedData] = useState<ProspectData | null>(null)

  useEffect(() => {
    if (GMAIL_CLIENT_ID) {
      const interval = setInterval(() => {
        if (typeof (window as any).google !== 'undefined') {
          initGmail(GMAIL_CLIENT_ID)
          clearInterval(interval)
        }
      }, 200)
    }
  }, [])

  return (
    <AppLayout>
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        <div className="w-full lg:w-[380px] lg:flex-shrink-0 bg-greytone-50 border border-greytone-200 rounded-lg p-6 flex flex-col">
          <h2 className="font-serif text-greytone-800 text-lg mb-1">New Outreach</h2>
          <p className="text-xs text-greytone-400 font-sans tracking-wide mb-5">Fill in the recipient details below.</p>
          <div className="flex-1"><ProspectForm onGenerate={setGeneratedData} /></div>
        </div>
        <div className="flex-1 bg-greytone-50 border border-greytone-200 rounded-lg p-6 flex flex-col">
          <h2 className="font-serif text-greytone-800 text-lg mb-1">Email Preview</h2>
          <p className="text-xs text-greytone-400 font-sans tracking-wide mb-5">
            {generatedData
              ? `${generatedData.businessName || 'Recipient'} · ${generatedData.templateId === 'warm' ? 'Warm / Known Leads' : generatedData.templateId === 'cold' ? 'Cold Outreach' : 'Referral Introduction'}`
              : 'Your generated email will appear here.'}
          </p>
          <div className="flex-1"><EmailPreview data={generatedData} /></div>
        </div>
      </div>
    </AppLayout>
  )
}
