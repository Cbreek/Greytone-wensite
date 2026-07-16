import type { Template, ProspectData } from '../types'
import { buildEmailHtml } from './shared'

export const warmTemplate: Template = {
  id: 'warm',
  label: 'Warm / Known Leads',
  requiresReferrer: false,
  subjectLine: (data: ProspectData) =>
    `A thought about ${data.businessName || '[Business Name]'}`,

  generateHtml: (data: ProspectData) => {
    const name = data.firstName || '[First Name]'
    const biz = data.businessName || '[Business Name]'
    const obs = data.observation || '[Personalized observation about their business or website.]'

    return buildEmailHtml({
      greeting: `Hi ${name},`,
      paragraphs: [
        obs,
        `What I build isn't just a website — it's a system that works for your business around the clock. Here's what that could look like for ${biz}:`,
      ],
      showBullets: true,
      closingParagraph: undefined,
    })
  },
}
