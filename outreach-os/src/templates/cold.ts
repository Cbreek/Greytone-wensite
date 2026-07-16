import type { Template, ProspectData } from '../types'
import { buildEmailHtml } from './shared'

export const coldTemplate: Template = {
  id: 'cold',
  label: 'Cold Outreach',
  requiresReferrer: false,
  subjectLine: () => 'I was on your website',

  generateHtml: (data: ProspectData) => {
    const name = data.firstName || '[First Name]'
    const biz = data.businessName || '[Business Name]'
    const city = data.cityArea || '[City/Area]'
    const obs = data.observation || '[Personalized observation about their business or website.]'

    return buildEmailHtml({
      greeting: `Hi ${name},`,
      paragraphs: [
        `While researching businesses in the ${city} area, I spent a few minutes on your website.`,
        obs,
        `Whether your website needs a refresh or simply needs to work harder for your business, here are a few areas that typically make the biggest difference:`,
      ],
      showBullets: true,
      closingParagraph: `Every business has a bottleneck. Tell me where yours is, and I'll build the AI-powered digital system to solve it. Because your website shouldn't just exist, it should contribute to your business every day.`,
    })
  },
}
