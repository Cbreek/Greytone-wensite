# Greytone Launch Standard: Search, AI Discoverability & Lead Capture

**Status:** Mandatory. Adopted 2026-11-15 by the owner of Greytone Digital.
**Applies to:** every public-facing website or digital product Greytone builds,
for Greytone itself or for a client. No one has to request it.

> Greytone doesn't just build websites that work. We build websites that are
> ready to be found and generate business.

This standard exists because Greytone's own site launched without it: its
content was invisible to AI crawlers, it had no main heading, its contact form
silently lost enquiries, and a later edit undid a privacy fix. Every rule
below prevents one of those failures from happening on a client project.

---

## How to apply it (for Claude sessions)

1. **At project start:** copy `standards/templates/CLAUDE.md` into the new
   project's repository root and fill in its Project Facts. Copy the matching
   starter files from `templates/public-site/` or `templates/private-app/`.
2. **During the build:** treat sections 1–5 as requirements of the work, not
   extras. Build them in as you go; never leave them for "later".
3. **Before launch:** run every check in `LAUNCH-CHECKLIST.md`. A project is
   not done until every item passes or is explicitly marked as client action.
4. **At handoff:** deliver the completed checklist as the client's launch
   report (section 6).
5. **Never** modify an existing client project to retrofit this standard
   without that project's owner approving it.

**Facts you may not invent:** prices, timelines, reviews, testimonials,
statistics, client results, certifications, partnerships, addresses. If a
page needs one, ask and mark it `[CONFIRM]` until answered.

---

## 1. Technical SEO

- **Page titles:** unique per page, under about 60 characters, in the form
  `Business | Primary service in Primary location`. Lead with what customers
  search for, not internal jargon.
- **Meta descriptions:** unique per page, 140–160 characters, stating the
  benefit and the next step in plain language.
- **Keywords:** chosen from realistic customer searches (service + problem +
  location), used naturally in the title, H1, first paragraph and headings.
  Never keyword-stuff. The `meta keywords` tag is optional and minor.
- **Headings:** exactly one `<h1>` per page stating what the page offers; `h2`
  and `h3` follow the content's real structure. Styling must not replace
  semantic headings.
- **Clean URLs:** lowercase, hyphenated, descriptive (`/lead-capture`), no
  query strings or IDs for content pages, one URL per page.
- **Canonical:** every indexable page has `<link rel="canonical">` pointing at
  its one preferred address on the primary domain (match the hosting
  provider's primary domain; redirect the other variant, e.g. `www`).
- **Structured data (JSON-LD):** at minimum the business entity
  (`Organization`, or the closest `LocalBusiness` / `ProfessionalService`
  subtype) and `WebSite`. Add `Service`, `OfferCatalog`, `FAQPage` or
  `Product` only when that content is visible on the page. Every claim must
  match visible content and be factual. Template:
  `templates/public-site/schema.jsonld`.
- **Internal links:** real `<a href>` links between related pages; navigation
  that crawlers can follow (buttons that only scroll or run scripts do not
  count); descriptive link text.
- **Social sharing:** Open Graph and Twitter title, description, and a
  1200×630 image.
- **Images:** descriptive file names and alt text; sized to their display
  (about 2× the displayed width at most); metadata stripped.

## 2. Search-engine readiness

- **Content in the initial HTML.** The page's main text, headings, services,
  locations and contact details must be present in the HTML the server sends,
  before JavaScript runs. Use static generation, server rendering or
  pre-rendering. A single-page app that ships an empty `<div id="root">` does
  NOT pass. Most AI crawlers do not run JavaScript.
- **Indexing settings:** public pages carry `index, follow`. Nothing public is
  accidentally `noindex`; nothing private is accidentally indexable.
- **XML sitemap** at `/sitemap.xml` listing every indexable page with accurate
  `lastmod`, referenced from `robots.txt`.
- **robots.txt** from the template, reviewed per project.
- **Correct status codes:** missing pages return a real 404; moved pages
  return a 301 to their new address.
- **Mobile:** responsive layout, viewport tag, readable text and tappable
  targets on a phone.
- **Performance:** compressed and appropriately sized images, no unnecessary
  scripts, fonts with `font-display: swap`. Check with Google PageSpeed
  Insights; fix anything rated poor before launch.
- **HTTPS** enforced on every address.

## 3. AI-search readiness

Goal: public business and service information that Google AI Overviews and
AI Mode, ChatGPT search, Bing and Copilot, Claude and Perplexity can access,
understand and cite, wherever each platform supports it.

- **Allow search and answer crawlers:** Googlebot, Bingbot, OAI-SearchBot,
  ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot,
  Perplexity-User, Applebot. Check each platform's official crawler
  documentation at least yearly, because names and policies change.
- **Separate search from AI training.** Training access is a client decision,
  recorded in the project's `CLAUDE.md`. Default: block training-only
  crawlers (GPTBot, ClaudeBot, CCBot, Applebot-Extended) and the shared
  `__usage_ai-training` token, while explicitly allowing Google-Extended,
  because it also controls appearing in Gemini answers. Blocking training
  never affects search visibility.
- **Say it plainly on the page:** who the business serves, what it does, where
  it operates, and how to contact it, in clear sentences an AI can quote.
  Short question-and-answer text helps when it is genuinely useful to
  customers.
- **Consistent business facts** (name, services, service area, contact) across
  the site, its structured data and its listings.
- **Do not** add experimental files such as `llms.txt` unless a platform
  documents a benefit. Never promise placement or recommendation by any AI
  system.

## 4. Search Console & Bing Webmaster Tools

- Set up **Google Search Console** (Domain property preferred) and **Bing
  Webmaster Tools** (import from Search Console), submit the sitemap, and
  request indexing of the home page.
- These accounts must belong to the **client**, not to Greytone. If Greytone
  cannot complete verification, give the client the step-by-step handoff in
  `LAUNCH-CHECKLIST.md`.
- Assess **Google Business Profile** eligibility: businesses that meet
  customers in person, at their own location or the customer's, are eligible.
  Service-area businesses hide their address. Online-only businesses are not
  eligible. Never create inaccurate locations.

## 5. Pre-launch testing (nothing ships untested)

- **Contact forms:** confirm the form is registered with its handler; send a
  real test submission; confirm it arrives at the client's inbox; confirm a
  failed submission shows an error with an alternative contact method, never
  a false "success". Remove test entries afterwards.
- **Lead capture & booking:** every booking button and link opens the right
  scheduler; branded redirects (e.g. `/book`) work; phone and email links
  work.
- **Search readiness:** view the page with JavaScript disabled and confirm
  the content is there; validate the structured data (Google Rich Results
  Test or Schema.org validator); confirm titles, descriptions, canonical,
  robots meta, `robots.txt` and the sitemap on the live domain.
- **Regression check:** after any later edit, re-run the relevant checks.
  Rules in the project's `CLAUDE.md` override "polish" or redesign passes.

## 6. Final checklist & handoff report

Every launch ends with `LAUNCH-CHECKLIST.md` completed for that project:
each item marked **Done (verified)**, **Client action** (with exact steps) or
**Not applicable** (with the reason). It is delivered to the client as their
launch report, and a copy stays in the project repository.

---

## Private applications, dashboards & internal tools

For any login-based app, dashboard, client portal or internal operating system:

1. **Decide what should be public.** Usually only a marketing or landing page
   (what it is, who it's for, how to get access) is searchable; the
   application itself is not.
2. **Keep private functionality out of search:**
   - `X-Robots-Tag: noindex, nofollow` on every app route (template:
     `templates/private-app/_headers`), plus `<meta name="robots"
     content="noindex, nofollow">` in the app's HTML.
   - Do **not** block app routes in `robots.txt`. A crawler must be able to
     fetch a page to see its `noindex`, and blocked URLs can still be indexed
     from links. Use `robots.txt` only for paths that are never linked.
   - Real authentication protects private data. `noindex` is not security.
   - Keep the app out of the sitemap.
3. **Public landing page** (if any) follows sections 1–6 in full.
4. Preview and staging addresses (e.g. `*.netlify.app`) carry `noindex` or
   password protection, and point canonicals at the production domain.

## Privacy & security baseline (lessons from Greytone)

- **Personal identity is opt-in.** Owners' personal names, home addresses,
  phone numbers and family details appear on a site, in its metadata or in its
  structured data only when the client asks for it in writing. Record the
  decision in the project's `CLAUDE.md` so later sessions keep it.
- Branded redirects (e.g. `/book`) instead of third-party links that contain
  personal handles.
- Project repositories are **private**. No API keys, passwords or personal
  data in code.
- Domain registration privacy (WHOIS privacy) is on.
- Remind clients that fictitious business name (DBA) filings and Google
  Business Profile verification may involve personal details. Explain before
  they file.
