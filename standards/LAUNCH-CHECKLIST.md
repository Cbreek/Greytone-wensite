# Launch Checklist: Search, AI Discoverability & Lead Capture

Copy this file into the project as `LAUNCH-CHECKLIST.md`, complete it before
launch, and deliver it to the client as their launch report.
Mark every row: **Done (verified)** · **Client action** · **N/A (reason)**.

**Project:** ____________ **Live address:** ____________ **Launch date:** ____________

## Technical SEO
| # | Check | Status | Notes |
|---|---|---|---|
| 1 | Unique title (≤ ~60 chars) on every page | | |
| 2 | Unique meta description (140–160 chars) on every page | | |
| 3 | Keywords chosen from real customer searches, used naturally | | |
| 4 | Exactly one H1 per page; logical H2/H3 | | |
| 5 | Clean, descriptive URLs; one URL per page | | |
| 6 | Canonical tag on primary domain; other variant redirects | | |
| 7 | JSON-LD business entity + WebSite; validated; matches visible content | | |
| 8 | Crawlable internal links (`<a href>`), including navigation | | |
| 9 | Open Graph / Twitter tags + 1200×630 share image | | |
| 10 | Images: alt text, sensible file names, sized, metadata stripped | | |

## Search-engine readiness
| # | Check | Status | Notes |
|---|---|---|---|
| 11 | Main content present with JavaScript disabled | | |
| 12 | Public pages `index, follow`; nothing private indexable | | |
| 13 | `/sitemap.xml` complete, accurate lastmod, referenced in robots.txt | | |
| 14 | `robots.txt` reviewed (live copy checked) | | |
| 15 | 404 for missing pages; 301s for moved pages | | |
| 16 | Mobile layout checked on a phone | | |
| 17 | PageSpeed Insights: no "poor" ratings (mobile + desktop) | | |
| 18 | HTTPS enforced on all addresses | | |

## AI-search readiness
| # | Check | Status | Notes |
|---|---|---|---|
| 19 | Search/answer crawlers allowed (Google, Bing, ChatGPT, Claude, Perplexity, Apple) | | |
| 20 | AI-training decision recorded; robots.txt matches it | | |
| 21 | Who / what / where / how-to-contact stated plainly on the site | | |
| 22 | Business facts consistent across site, schema and listings | | |

## Registration & handoff
| # | Check | Status | Notes |
|---|---|---|---|
| 23 | Google Search Console verified (client-owned), sitemap submitted | | |
| 24 | Bing Webmaster Tools set up (import from Search Console) | | |
| 25 | Home page indexing requested | | |
| 26 | Google Business Profile eligibility assessed; steps given if eligible | | |
| 27 | Analytics installed (if in scope), client-owned | | |

## Lead capture (tested on the live site)
| # | Check | Status | Notes |
|---|---|---|---|
| 28 | Form registered with its handler | | |
| 29 | Real test submission received at client inbox | | |
| 30 | Failed submission shows an error + alternative contact | | |
| 31 | Booking buttons/links and branded redirects work | | |
| 32 | Phone and email links work | | |

## Privacy & security
| # | Check | Status | Notes |
|---|---|---|---|
| 33 | Personal details only where the client approved in writing | | |
| 34 | Repository private; no keys or personal data in code | | |
| 35 | Domain WHOIS privacy on | | |
| 36 | Staging/preview addresses noindexed or protected | | |

## Private apps only (skip for public sites)
| # | Check | Status | Notes |
|---|---|---|---|
| 37 | Public vs private pages decided and recorded | | |
| 38 | App routes send `noindex, nofollow` (header + meta) | | |
| 39 | App routes NOT blocked in robots.txt; app not in sitemap | | |
| 40 | Real authentication on private data | | |

---

## Client action steps (include the ones that apply)

**Google Search Console (about 10 minutes)**
1. Go to search.google.com/search-console and choose **Add property → Domain**.
2. Enter the domain and add the TXT record Google shows at your domain/DNS provider.
3. After it verifies, open **Sitemaps** and submit the full address, e.g. `https://example.com/sitemap.xml`.
4. Open **URL Inspection**, paste the home page address, and click **Request indexing**.

**Bing Webmaster Tools (about 2 minutes)**
1. Go to bing.com/webmasters and sign in with the same Google account.
2. Choose **Import from Google Search Console** and select the site.

**Google Business Profile (if you meet customers in person)**
1. Go to business.google.com and add the business under its exact real-world name.
2. If customers don't visit you, choose **no location customers visit** and list
   your service areas (within about 2 hours' drive). Your address is used only
   for verification and is not shown.
3. Complete verification (often a short video showing your business and proof
   of operation).

**Expectations:** search engines and AI tools usually reflect changes within a
few days to a few weeks. No one can guarantee rankings or AI recommendations.
