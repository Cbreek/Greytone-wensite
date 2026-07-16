export type TemplateId = 'warm' | 'cold' | 'referral'

export const INDUSTRIES = [
  'Real Estate',
  'General Contractor',
  'Attorney / Law Firm',
  'Salon & Beauty',
  'Restaurant & Food',
  'Retail',
  'Medical / Dental',
  'Architecture',
  'Financial Services',
  'Construction',
  'Insurance',
  'Home Services',
  'Fitness & Wellness',
  'Other',
] as const

export type Industry = typeof INDUSTRIES[number]

export interface ProspectData {
  firstName: string
  businessName: string
  cityArea: string
  industry: Industry | ''
  websiteUrl: string
  referrerName: string
  observation: string
  templateId: TemplateId
  toEmail: string
}

export interface GeneratedEmail {
  subject: string
  htmlBody: string
  textPreview: string
}

export interface Template {
  id: TemplateId
  label: string
  subjectLine: (data: ProspectData) => string
  requiresReferrer: boolean
  generateHtml: (data: ProspectData) => string
}
