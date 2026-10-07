# covered.ro — email „−30% la 2 skinuri”

Newsletter HTML email for covered.ro (Shopify, Romanian phone-skin brand): announce the **−30% la 2 skinuri** offer, show **top vânzări iPhone** and **top vânzări Samsung**, and the **skinuri noi**, in the site's own colors, fonts, voice and explanations.

## Status

| Step | State | Where |
|---|---|---|
| Research (brand, offer + voice, top iPhone, top Samsung, new arrivals) | done | `research/bundle.json` |
| 3 design variants | done | `drafts/variant-{a,b,c}.html` + `-640.png` / `-375.png` renders, `drafts/design-summaries.json` |
| Judge panel (brand / engineering / conversion) | done | `research/judgments.json` |
| **Final build** | **TODO** | → `covered-email-30-la-2-skinuri.html` + `preview-desktop.png`, `preview-mobile.png` |
| **Verify** (data vs live site, email engineering + visual, Romanian copy) | **TODO** | |
| **Polish** (apply verified fixes, re-verify once) | **TODO** | |

Judge scores: brand a 8.5 · c 7.5 · b 7 — engineering c 7.5 · a 6.5 · b 5.5 — conversion b 8.5 · a 8 · c 7.5.
Totals: **a 23 · c 22.5 · b 21** → build from **variant A** (Skin Lab / spec sheet), graft the judges' picks (each judge's `grafts` + `must_fix` in `research/judgments.json`), e.g. C's tilted yellow USP band and hero phones, B's yellow offer panel / cart-receipt worked example (only with verified math from `bundle.json` → `offer_and_voice.offer`).

## Offer (verified on the live site)
- Headline: „−30% la 2 skinuri” — subtext: „Combină oricare 2 skinuri, pentru orice telefon. Reducerea se aplică automat în coș.”
- Mechanics, cart tests, exclusions, worked example: `research/bundle.json` → `offer_and_voice.offer`. No end date or code was found — do not invent one.

## Brand tokens
bg `#0A0A0B` · text `#F3F3EF` · muted ~`#B2B2AF` · labels ~`#969693` · accent `#F5B100` (text on it `#0A0A0B`) · cards ~`#121213` with 1px ~`#262625` border, radius 10–12px · buttons radius 5px, 48px, Archivo 700 13px uppercase .04em.
Fonts: Archivo (800 uppercase, tight tracking, wide axis for display) + mono for eyebrows (real family + Google equivalent in `bundle.json` → `brand.fonts`). Full palette, logo, imagery, footer/legal, motifs: `bundle.json` → `brand`.

## Email rules (non-negotiable)
- Romanian, tutoiere, diacritics ș ț with comma-below; reuse the site's phrasing (voice library in `bundle.json` → `offer_and_voice.voice`). No invented prices, stats, deadlines, codes or reviews.
- Sections: preheader · header/logo · hero with the offer + mechanics · TOP VÂNZĂRI iPhone (4–6) · TOP VÂNZĂRI Samsung (4–6) · NOUTĂȚI (3–6) · USP strip + social proof (4,69/5 · 1.278 de recenzii, 37.000+ clienți, 60.000+ skinuri) · closing CTA · footer (covered.ro@gmail.com, 0750 422 122, legal, socials, `{{view_in_browser_url}}`, `{{unsubscribe_url}}`).
- Real product image/title/price (+ struck compare-at) and URL from `bundle.json`; every covered.ro link gets `utm_source=email&utm_medium=newsletter&utm_campaign=30-la-2-skinuri&utm_content=<section>`.
- 600px table layout, role="presentation", inline styles, bgcolor attrs on dark containers, no flex/grid/position/CSS vars/JS/SVG; `<style>` only for media queries, fonts, outline text (with solid inline fallback); MSO conditionals + bulletproof buttons; images absolute https, width attr, display:block, Romanian alt; responsive at ≤620px; **file < 90 KB** (Gmail clips at 102 KB); contrast ≥ 4.5:1.
- Must still look right when Gmail strips `<style>` (judges flagged class-only pills/borders in A — inline them).

## Tools
- `bash research/render.sh <file.html|url> <out.png> [width] [height]` — headless Chrome/Chromium screenshot (Windows or Linux; set `CHROME=` if needed). Render at 640 and 375 and inspect.
- Reference screenshots of the live site: `research/site-home-desktop.png`, `research/site-home-mobile.png`, `research/site-product-desktop.png`.
- Draft generators: `drafts/build-a.js`, `drafts/build-variant-b.mjs`, `drafts/build-c.js` (node) — the variant HTML was generated from these.
