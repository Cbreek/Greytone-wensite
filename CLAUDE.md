# Greytone Digital — instructions for every session

## Founder privacy rule (permanent, non-negotiable)

The founder's personal identity must never appear on the public Greytone Digital
website or in its SEO. This rule was set by the owner, was accidentally undone
once on 2026-08-01 by a "polish" pass that "restored" the founder's name, and
was re-applied on 2026-11-13. Do not undo it again.

- Never add the founder's personal name, in any variation (first name, last
  name, maiden or middle name, nicknames, initials or handles built from them),
  to anything served by greytonedigital.com. That includes visible copy, quote
  attributions, alt text, captions, image file names, page titles, meta tags,
  Open Graph / Twitter tags, JSON-LD, sitemap, robots.txt, and link URLs.
- Use neutral references instead: "Founder | Greytone Digital" or
  "Founder, Greytone Digital".
- The founder photo (`photo.jpg`) may stay, with alt text "Founder, Greytone
  Digital" and no name.
- The About section is signed with `founder-signature.png`: the founder's full
  name drawn as a signature IMAGE (owner's decision, 2026-11-13). This is the
  ONLY place the name may appear, and only as pixels. Keep its file name and
  alt text ("Founder's signature") neutral, keep
  `Disallow: /founder-signature.png` in `robots.txt` so search engines never
  fetch it, and never replace it with typed text, SVG `<text>`, or a caption.
- Booking links must use the branded `https://greytonedigital.com/book`, which
  `_redirects` forwards to the scheduling tool. Never link the scheduling
  tool's own URL directly from the site.
- Do not treat the founder's name as "missing" or "restore" it as typed text
  during design or copy passes. Its absence from the text is intentional.

## Search visibility must stay ON

The business must remain discoverable. Do not add `noindex`, do not block
crawlers in `robots.txt`, and keep the sitemap, canonical tags and JSON-LD.
The canonical domain is `https://greytonedigital.com` (no `www`; Netlify
redirects `www` to it).

## Search & AI-crawler setup (owner-approved 2026-11-13)

- `index.html` contains a crawler-readable copy of the homepage inside
  `<div id="root">` (class `gd-static`). AI crawlers don't run JavaScript, so
  this is how they see the content; React replaces it on load. When visible
  copy changes, update it to match. It intentionally omits the About
  paragraphs that name former employers (privacy) and must never contain the
  founder's name.
- The homepage headline "Put your website to work." is the page's only `<h1>`.
- `robots.txt`: search and AI search/answer crawlers allowed; AI model-training
  crawlers (GPTBot, ClaudeBot, CCBot, Applebot-Extended) blocked. Google-Extended
  is intentionally allowed because it also powers Gemini answers (discovery).
- JSON-LD (`@graph`: ProfessionalService + WebSite) must stay factual and match
  visible content: no address, no personal name, no invented reviews or prices.
- Contact form posts to Netlify Forms ("discovery-call", hidden form in
  `index.html`); the site's form detection must stay ON. It shows success only
  on a real 2xx response, and an alert with the email address otherwise.

## Before every deploy

1. Search every file you are about to publish for the founder's name and
   handles; there must be no matches (`_redirects` is processed by Netlify and
   is not served to visitors).
2. Confirm `index.html` still has `<meta name="robots" content="index, follow" />`.

## Where things live

- `main` is the official permanent source. The live site at greytonedigital.com
  is the top-level site files of this repo (everything except `outreach-os/`,
  `README.md` and this file), uploaded to the Netlify site
  "gregarious-pithivier-a7176c".
- `outreach-os/` is a separate private tool, built by Netlify site
  "greytone-outreach-os" from the `claude/greytone-website-9Krl8` branch.
  Its email signature is used in real outgoing emails; change it only with
  the owner's approval.
- Do not delete deploys, branches or files, or change Netlify connections,
  without the owner's explicit, separate approval.
