import type { Handler } from '@netlify/functions'

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'AI service not configured' }) }
  }

  let body: any
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) }
  }

  const { firstName, businessName, industry, cityArea, observation, templateId, currentSubject } = body

  const templateTone = templateId === 'warm'
    ? 'warm/known lead (casual, personal, like emailing someone you already know)'
    : templateId === 'warm2'
      ? 'warm/known lead with a prototype already built (personal, confident, proof-based)'
      : templateId === 'referral'
        ? 'referral introduction (credible, grounded in the referral)'
        : 'cold outreach (professional, observational, not salesy)'

  const prompt = `You are writing email subject lines for Chrissy Breek, founder of Greytone Digital, an AI-powered website and business systems agency, reaching out to a prospect.

Prospect details:
- Name: ${firstName || 'unknown'}
- Business: ${businessName || 'unknown'}
- Industry: ${industry || 'unknown'}
- City/Area: ${cityArea || 'unknown'}
- Template type: ${templateTone}
- Personalized observation already written for the email body: ${observation || 'none yet'}
- Current subject line (for reference, do not repeat verbatim): ${currentSubject || 'none'}

Generate 4 alternative subject lines. Requirements:
- Short (under 60 characters each)
- No quotation marks, no emoji, no clickbait
- Each should take a genuinely different angle (e.g. one observational, one direct, one curiosity-based, one benefit-focused)
- Match the tone of the template type above
- Do not repeat the current subject line

Return ONLY a JSON array of 4 strings, nothing else. Example format: ["Subject one", "Subject two", "Subject three", "Subject four"]`

  let response: Response
  try {
    response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        messages: [{ role: 'user', content: prompt }],
      }),
    })
  } catch (err: any) {
    return { statusCode: 502, body: JSON.stringify({ error: `Network error: ${err.message}` }) }
  }

  if (!response.ok) {
    const errText = await response.text().catch(() => '')
    return { statusCode: 502, body: JSON.stringify({ error: `AI request failed (${response.status}): ${errText}` }) }
  }

  const result = await response.json() as any
  const raw = result.content?.[0]?.text?.trim() || '[]'

  let subjects: string[] = []
  try {
    const match = raw.match(/\[[\s\S]*\]/)
    subjects = JSON.parse(match ? match[0] : raw)
  } catch {
    subjects = raw.split('\n').map((line: string) => line.replace(/^[-*\d.)\s"]+|["\s]+$/g, '')).filter(Boolean)
  }

  subjects = subjects.filter((s) => typeof s === 'string' && s.trim().length > 0).slice(0, 4)

  if (subjects.length === 0) {
    return { statusCode: 502, body: JSON.stringify({ error: 'AI returned no usable subject lines' }) }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ subjects }),
  }
}

export { handler }
