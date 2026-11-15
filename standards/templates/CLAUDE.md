# [PROJECT NAME] — instructions for every Claude session

Built by Greytone Digital. Copy this file to the root of every new project
repository at project start and fill in the Project Facts. Claude reads it
automatically in every session.

## Mandatory: Greytone Launch Standard

This project follows the **Greytone Launch Standard** (search, AI
discoverability and lead capture). It is part of the work, not an optional
extra, and the owner does not need to request it.

- Full standard: `standards/GREYTONE-LAUNCH-STANDARD.md` in Greytone's
  website repository (Greytone-wensite). Copy it into this repo under
  `docs/` at kickoff so it travels with the project.
- Build in, as you go: unique titles and descriptions, one H1 per page, clean
  URLs, canonical tags, factual JSON-LD, crawlable internal links, content
  present in the initial HTML (no empty JavaScript shells), sitemap,
  robots.txt, mobile, performance, HTTPS.
- AI search: allow search/answer crawlers; follow the AI-training decision
  below; state who / what / where / how-to-contact plainly on the site.
- Before launch: complete `LAUNCH-CHECKLIST.md` (live-site checks, including
  a real contact-form test) and deliver it to the client.
- Private apps and dashboards: only approved public pages are indexable; app
  routes send `noindex, nofollow` and are not listed in the sitemap.
- Never invent prices, timelines, reviews, testimonials, statistics, results,
  certifications, partnerships or addresses. Mark unknowns `[CONFIRM]`.

## Project facts (fill in at kickoff)

- Client / business name: [ ]
- Type: [public website | private app with public landing page | internal tool]
- Primary domain (canonical, no-www or www): [ ]
- Primary services (customer words): [ ]
- Service area / locations: [ ]
- Contact methods to publish: [email | phone | form | booking link]
- Booking link (use a branded redirect such as /book): [ ]
- Meets customers in person? (Google Business Profile eligibility): [yes / no]
- AI-training crawlers: [block (Greytone default) | allow]
- Personal details approved for public display (in writing): [none | list]
- Search Console / Bing owner (client account): [ ]

## Rules that override redesign or "polish" passes

- Do not remove or weaken anything the Launch Standard requires (headings,
  metadata, schema, crawlable content, robots/sitemap, form error handling)
  during design changes. Re-run the relevant checklist items after edits.
- Do not add personal details beyond those approved above.
- Do not deploy, delete deployments, or change hosting connections without
  the owner's approval.
