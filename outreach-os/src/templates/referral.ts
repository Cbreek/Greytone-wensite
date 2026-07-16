import type { Template, ProspectData } from '../types'
import { buildEmailHtml } from './shared'

export const referralTemplate: Template = {
  id: 'referral',
  label: 'Referral Introduction',
  requiresReferrer: true,
  subjectLine: (data: ProspectData) =>
    `${data.referrerName || '[Referrer Name]'} suggested I reach out`,

  generateHtml: (data: ProspectData) => {
    const name = data.firstName || '[First Name]'
    const biz = data.businessName || '[Business Name]'
    const referrer = data.referrerName || '[Referrer Name]'
    const obs = data.observation || '[Personalized observation about their business or website.]'

    return buildEmailHtml({
      greeting: `Hi ${name},`,
      paragraphs: [
        `I am reaching out as a follow-up from my recent conversation with ${referrer}. They suggested I connect with you and mentioned ${biz}.`,
        `I own Greytone Digital and help businesses modernize their digital presence through AI-powered websites and business development systems designed to support growth and streamline day-to-day operations.`,
        obs,
        `Whether your website needs a refresh or simply needs to work harder for your business, here are a few areas that typically make the biggest difference:`,
      ],
      showBullets: true,
      closingParagraph: `Every business has a bottleneck. Tell me where yours is, and I'll build the AI-powered digital system to solve it. Because your website shouldn't just exist, it should contribute to your business every day.`,
    })
  },
}
