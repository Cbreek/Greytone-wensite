import { warmTemplate } from './warm'
import { warm2Template } from './warm2'
import { coldTemplate } from './cold'
import { referralTemplate } from './referral'
import type { Template, TemplateId } from '../types'

export const TEMPLATES: Template[] = [
  warmTemplate,
  warm2Template,
  coldTemplate,
  referralTemplate,
  // Add new templates here — no other files need to change
]

export function getTemplate(id: TemplateId): Template {
  const t = TEMPLATES.find(t => t.id === id)
  if (!t) throw new Error(`Unknown template: ${id}`)
  return t
}
