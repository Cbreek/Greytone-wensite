import type { Template, ProspectData } from '../types'
import { buildEmailHtml } from './shared'

const DEFAULT_EMPLOYEE_FUNCTIONS = [
  'A sales rep — helping visitors understand what you offer and take the next step.',
  'A concierge — answering common questions instantly, day or night.',
  'A coordinator — handling scheduling, booking, or ordering.',
  'A follow-up person — keeping past customers and leads engaged automatically.',
]

const DEFAULT_COMPARISON_ROWS: { current: string; prototype: string }[] = [
  { current: 'A few basic pages', prototype: 'A full branded, multi-page experience' },
  { current: 'Static content only', prototype: 'Content tailored to what customers actually need' },
  { current: 'No online ordering or booking', prototype: 'Built-in ordering, booking, or scheduling' },
  { current: 'Generic contact form', prototype: 'Guided inquiry flow that qualifies leads' },
  { current: 'Generic pop-up chat (if any)', prototype: 'Built-in concierge that answers visitor questions' },
  { current: 'Manual follow-up', prototype: 'Automated follow-up emails' },
  { current: 'One general customer list', prototype: 'Customer segmentation for targeted outreach' },
  { current: 'Limited search structure', prototype: 'Built for stronger Google, mobile, and AI-search visibility' },
]

function parseComparisonRows(raw?: string): { current: string; prototype: string }[] {
  if (!raw || !raw.trim()) return DEFAULT_COMPARISON_ROWS
  const rows = raw
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const [current, prototype] = line.split('|').map(s => s?.trim() ?? '')
      return { current, prototype }
    })
    .filter(row => row.current && row.prototype)
  return rows.length > 0 ? rows : DEFAULT_COMPARISON_ROWS
}

export const warm2Template: Template = {
  id: 'warm2',
  label: 'Warm Prospect 2 (Prototype Ready)',
  requiresReferrer: false,
  subjectLine: (data: ProspectData) =>
    `The ${data.businessName || '[Business Name]'} rebuild we talked about`,

  generateHtml: (data: ProspectData) => {
    const name = data.firstName || '[First Name]'
    const biz = data.businessName || '[Business Name]'
    const obs = data.observation || '[Reference back to your prior conversation with this prospect.]'
    const bigPicture = data.specificIdea
      ? ` — ${data.specificIdea}`
      : '.'
    const prototypeUrl = data.prototypeUrl || undefined
    const screenshotUrl = data.screenshotUrl || undefined

    return buildEmailHtml({
      greeting: `Hi ${name},`,
      paragraphs: [
        obs,
        `So I took a pass at what ${biz} could look like if the website actually reflected the business, the story, and the personality behind it — and did a lot more than just act like an online brochure.`,
        screenshotUrl ? `I attached a screenshot of the homepage so you can get the feel immediately.` : `I also put together a quick look at the homepage so you can get the feel immediately.`,
      ],
      heroImageUrl: screenshotUrl,
      heroImageAlt: `${biz} homepage preview`,
      primaryCtaUrl: prototypeUrl,
      primaryCtaLabel: `View the ${biz} Prototype`,
      midParagraphs: [
        ...(prototypeUrl ? [`I'll leave the temporary link up for the next few days, so take a look when you have a minute.`] : []),
        `One important note before you open it: this is a concept prototype, so some of the photos, pricing, and other details are placeholders. I used them intentionally to show you what the finished site could look like and what it could do. If you decide to move forward, we would replace all of that with your actual photos, pricing, and details.`,
        `What started as a website refresh turned into something much bigger${bigPicture}`,
      ],
      comparisonRows: parseComparisonRows(data.comparisonRows),
      showBullets: true,
      customBullets: DEFAULT_EMPLOYEE_FUNCTIONS,
      bulletsIntro: `The difference is that I'm not simply rebuilding the website. I'm turning it into a business tool. Think of it as having a team working inside the site — even when you're not:`,
      paragraphsAfterBullets: [
        `If that adds even 10–15% more selling and follow-up capacity without adding payroll, the website starts paying for itself in a very different way.`,
        `${name} still does the part only ${name} can do — the relationships, the story, the work only you can bring. The website handles more of the repeatable work around you.`,
        `It's also built for the way people find businesses now: Google search, mobile, reviews, social media, and increasingly AI search. That means clearer site structure, stronger search optimization, better mobile performance, and fresh content that gives ${biz} a much better foundation to be found.`,
        `In plain English: if someone hears about ${biz}, gets referred by a friend, or searches for a business like yours, the site should help them find you, understand you, and choose you.`,
      ],
      closingParagraph: `And the part I like most is that none of this makes the site feel technical. It still feels personal on the front end. It just works a lot harder behind the scenes. Take a look and tell me what jumps out at you.`,
    })
  },
}
