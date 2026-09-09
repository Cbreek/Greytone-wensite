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

  const { firstName, businessName, industry, cityArea, websiteUrl, templateId } = body

  const prompt = `You are writing a personalized outreach email for Chrissy Breek, founder of Greytone Digital, an AI-powered website and business systems agency.

Generate a 2-3 sentence personalized observation for this prospect. It should feel like Chrissy genuinely looked at their business and noticed something specific — not generic. Warm, professional, and specific to their industry.

Prospect details:
- Name: ${firstName || 'unknown'}
- Business: ${businessName || 'unknown'}
- Industry: ${industry || 'unknown'}
- City/Area: ${cityArea || 'unknown'}
- Website: ${websiteUrl || 'not provided'}
- Template type: ${templateId === 'warm' ? 'warm/known lead (casual, personal)' : templateId === 'warm2' ? 'warm/known lead with a prototype already built (personal, confident, proof-based — refers back to a prior conversation)' : templateId === 'referral' ? 'referral introduction (credible, specific)' : 'cold outreach (professional, observational)'}

Write ONLY the observation paragraph — no greeting, no sign-off, no extra commentary. 2-3 sentences max. Start directly with the observation.`

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
        max_tokens: 200,
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
  const observation = result.content?.[0]?.text?.trim() || ''

  return {
    statusCode: 200,
    body: JSON.stringify({ observation }),
  }
}

export { handler }
