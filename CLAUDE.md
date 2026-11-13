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
- Booking links must use the branded `https://greytonedigital.com/book`, which
  `_redirects` forwards to the scheduling tool. Never link the scheduling
  tool's own URL directly from the site.
- Do not treat the founder's name as "missing" or "restore" it during design
  or copy passes. Its absence is intentional.

## Search visibility must stay ON

The business must remain discoverable. Do not add `noindex`, do not block
crawlers in `robots.txt`, and keep the sitemap, canonical tags and JSON-LD.
The canonical domain is `https://greytonedigital.com` (no `www`; Netlify
redirects `www` to it).

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
