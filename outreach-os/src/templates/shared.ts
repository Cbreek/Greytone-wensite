export const BULLETS = [
  'Refresh and modernize your existing website without starting over.',
  'Improve your visibility on Google and AI search.',
  'Update photos, messaging, and branding.',
  'Add customer reviews, maps, forms, and social links.',
  'Add AI to capture leads and answer questions 24/7.',
  'Turn your website into a business tool, not just an online brochure.',
  'Rebuild or completely rebrand if your business has outgrown your current site.',
  'Add scheduling, lead capture, and automation to save you time.',
  'Build custom AI tools and automations that run your business more efficiently.',
  'Create digital workflows that eliminate repetitive tasks and save you hours every week.',
  'Develop business systems that scale as your company grows.',
]

export const SENDER = {
  name: 'Chrissy Breek',
  title: 'Founder',
  company: 'Greytone Digital',
  website: 'https://www.greytonedigital.com',
  email: 'hello@greytonedigital.com',
  ctaUrl: 'https://www.greytonedigital.com',
  ogImage: 'https://www.greytonedigital.com/og-preview.png',
}

export function buildEmailHtml(params: {
  greeting: string
  paragraphs: string[]
  showBullets: boolean
  closingParagraph?: string
}): string {
  const { greeting, paragraphs, showBullets, closingParagraph } = params

  const bulletItems = BULLETS.map(
    b => `<tr><td style="padding:4px 0;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#4a443c;line-height:1.65;">
            <span style="color:#6e6050;margin-right:10px;">✓</span>${b}
          </td></tr>`
  ).join('\n')

  const paraHtml = paragraphs
    .map(p => `<p style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#4a443c;line-height:1.75;">${p}</p>`)
    .join('\n')

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Greytone Digital</title>
</head>
<body style="margin:0;padding:0;background:#e8e4de;font-family:Georgia,'Times New Roman',serif;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#e8e4de;">
  <tr>
    <td align="center" style="padding:40px 16px 56px;">

      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td style="background:#ddd8d0;border-radius:6px 6px 0 0;padding:28px 40px 24px;border-bottom:1px solid rgba(0,0,0,0.07);">
            <div style="font-family:'Playfair Display',Georgia,serif;font-size:11px;letter-spacing:0.32em;text-transform:uppercase;color:rgba(40,36,30,0.45);margin-bottom:6px;">Greytone Digital</div>
            <div style="width:32px;height:1px;background:rgba(40,36,30,0.2);"></div>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="background:#f5f0e8;padding:64px 48px 40px;">

            <p style="margin:0 0 28px;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#4a443c;line-height:1.75;">${greeting}</p>

            ${paraHtml}

            ${showBullets ? `
            <p style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#4a443c;line-height:1.75;">A few ways I can help:</p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
              ${bulletItems}
            </table>` : ''}

            ${closingParagraph ? `<p style="margin:0 0 32px;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#4a443c;line-height:1.75;">${closingParagraph}</p>` : ''}

            <p style="margin:0 0 36px;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#4a443c;line-height:1.75;">I'd be happy to share a few ideas I already have for your business. Let's chat — I look forward to connecting.</p>

            <!-- CTA -->
            <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:40px;">
              <tr>
                <td style="border:1px solid rgba(110,96,80,0.4);border-radius:3px;">
                  <a href="${SENDER.ctaUrl}" target="_blank"
                     style="display:inline-block;padding:13px 32px;font-family:Georgia,serif;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#38322c;text-decoration:none;white-space:nowrap;">
                    See How It Works
                  </a>
                </td>
              </tr>
            </table>

            <!-- OG CARD -->
            <div style="margin-bottom:40px;">
              <a href="${SENDER.ctaUrl}" target="_blank" style="display:inline-block;line-height:0;">
                <img src="${SENDER.ogImage}" alt="Greytone Digital" width="200"
                     style="width:200px;max-width:100%;height:auto;display:block;border-radius:4px;border:1px solid rgba(110,96,80,0.2);" />
              </a>
            </div>

            <!-- DIVIDER -->
            <div style="border-top:1px solid rgba(110,96,80,0.18);margin-bottom:28px;"></div>

            <!-- SIGNATURE -->
            <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#4a443c;line-height:1.7;">
              Warm regards,<br>
              Chrissy Breek<br>
              Founder | Greytone Digital
            </p>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#ddd8d0;border-radius:0 0 6px 6px;padding:20px 40px;border-top:1px solid rgba(0,0,0,0.07);">
            <p style="margin:0;font-family:Georgia,serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(40,36,30,0.4);text-align:center;">
              Greytone Digital &nbsp;·&nbsp;
              <a href="https://www.greytonedigital.com" style="color:rgba(40,36,30,0.4);text-decoration:none;">greytonedigital.com</a>
              &nbsp;·&nbsp;
              <a href="mailto:${SENDER.email}" style="color:rgba(40,36,30,0.4);text-decoration:none;">${SENDER.email}</a>
            </p>
            <p style="margin:8px 0 0;font-family:Georgia,serif;font-size:10px;color:rgba(40,36,30,0.3);text-align:center;">
              © 2026 Greytone Digital &nbsp;·&nbsp; <a href="#" style="color:rgba(40,36,30,0.3);text-decoration:none;">Unsubscribe</a>
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}
