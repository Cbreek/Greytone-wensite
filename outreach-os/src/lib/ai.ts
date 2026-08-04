import type { ProspectData } from '../types'

export async function generateObservation(data: ProspectData): Promise<string> {
  const response = await fetch('/.netlify/functions/ai-personalize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName: data.firstName,
      businessName: data.businessName,
      industry: data.industry,
      cityArea: data.cityArea,
      websiteUrl: data.websiteUrl,
      templateId: data.templateId,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error((err as any).error || 'AI assist failed. Please try again.')
  }

  const result = await response.json() as { observation: string }
  return result.observation
}

export async function generateSubjectLines(data: ProspectData, currentSubject: string): Promise<string[]> {
  const response = await fetch('/.netlify/functions/generate-subject-lines', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName: data.firstName,
      businessName: data.businessName,
      industry: data.industry,
      cityArea: data.cityArea,
      observation: data.observation,
      templateId: data.templateId,
      currentSubject,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error((err as any).error || 'Subject regeneration failed. Please try again.')
  }

  const result = await response.json() as { subjects: string[] }
  return result.subjects
}
