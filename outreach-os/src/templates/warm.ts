import type { Template, ProspectData } from '../types'
import { buildEmailHtml } from './shared'

const WARM_BULLETS = [
  'Turn your website into a business tool, not just an online brochure.',
  'Refresh and modernize your existing website without starting over.',
  'Improve how your business shows up on Google and AI search.',
  'Connect your website to social media, customer reviews, Google, and the everyday tools that make it easier for customers to find and connect with you.',
  'Add user-friendly AI tools that can answer questions, capture leads, and handle specific jobs for your business 24/7.',
  'Rebuild or completely rebrand if your business has outgrown its current website.',
  'Automate repetitive work that costs you and your team time every week.',
]

export const warmTemplate: Template = {
  id: 'warm',
  label: 'Warm / Known Leads',
  requiresReferrer: false,
  subjectLine: (data: ProspectData) =>
    `I've been thinking about ${data.businessName || '[Business Name]'}`,

  generateHtml: (data: ProspectData) => {
    const name = data.firstName || '[First Name]'
    const biz = data.businessName || '[Business Name]'
    const obs = data.observation || '[Personal observation about their business.]'
    const idea = data.specificIdea || '[One specific opportunity or idea for their business.]'

    return buildEmailHtml({
      greeting: `Hi ${name},`,
      paragraphs: [
        obs,
        `I've been building Greytone around a pretty simple idea: most businesses don't need more technology — they need the technology they already have to do more of the work.`,
        `Your website is a good example. Most websites are essentially online brochures. I build them to work more like an employee — helping generate business, capture opportunities, answer questions, and work for you around the clock.`,
      ],
      showBullets: true,
      customBullets: WARM_BULLETS,
      bulletsIntro: 'Depending on the business, that can mean:',
      paragraphsAfterBullets: [
        `And it can go beyond the website. Think about the work you'd hand to another employee or executive assistant if one showed up tomorrow — follow-ups, organizing, tracking, research, prep work. We can now build AI-powered business systems to handle many of those jobs, customized around how your business actually works.`,
        `When I thought about ${biz}, I immediately thought about ${idea}.`,
      ],
      closingParagraph: `I'd love to show you what I mean and share a few ideas specific to your business. Can we find 15 minutes to connect?`,
    })
  },
}
