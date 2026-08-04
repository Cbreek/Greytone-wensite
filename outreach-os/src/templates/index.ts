import { warmTemplate } from './warm'
import { coldTemplate } from './cold'
import { referralTemplate } from './referral'
import type { Template, TemplateId } from '../types'

export const TEMPLATES: Template[] = [
  warmTemplate,
  coldTemplate,
  referralTemplate,
  // Add new templates here — no other files need to change
]

export function getTemplate(id: TemplateId): Template {
  const t = TEMPLATES.find(t => t.id === id)
  if (!t) throw new Error(`Unknown template: ${id}`)
  return t
}
