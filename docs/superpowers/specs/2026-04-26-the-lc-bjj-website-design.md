# The LC — Website Design Spec

**Status:** Approved (brainstorm phase)
**Date:** 2026-04-26
**Stack:** Astro (static) · Tailwind · TypeScript · Vercel

---

## 1. Purpose

Build a marketing site for **The LC**, a Brazilian Jiu Jitsu and martial arts gym in Walnut Ridge, Arkansas. The site's single job is to convert prospects into walk-ins by making the schedule visible, the location obvious, and the "first class is free" message unmissable.

There are no forms, no online booking, no pricing page, and no login. Prospects either:

1. See the schedule, decide to drop in, and walk through the door, or
2. Click through to Facebook to message the gym.

That is the entire conversion model.

## 2. Audience

Equal weight across four programs, but **Adult BJJ (Gi + NoGi)** and **Kids BJJ** are the lead-gen drivers and get prime homepage real estate. **Kickboxing** and **MMA fight team** are well-represented but supporting.

Primary visitor profiles:

- An adult curious about BJJ who has never grappled before
- A parent searching "kids martial arts Walnut Ridge"
- A current adult martial artist evaluating a new gym
- An aspiring competitor scouting an MMA team to fight out of

## 3. Site facts (single source of truth)

| Field | Value |
|---|---|
| Business name | The LC |
| Domain | `thelcbjj.com` |
| Address | 217 W Elm St (inside K1 Fitness), Walnut Ridge, AR |
| Phone | (870) 886-2691 |
| Hours | Open during class hours only — site displays the schedule grid, not separate "business hours" |
| Facebook | https://www.facebook.com/TheLCFightTeam |
| Other socials | None |

## 4. Class schedule

| Day | Time | Class |
|---|---|---|
| Mon | 5:00 PM | Kids BJJ |
| Mon | 6:00 PM | NoGi BJJ + Kickboxing (combined) |
| Tue | 12:00 PM | Gi BJJ |
| Fri | 5:00 PM | Kids BJJ |
| Fri | 6:00 PM | NoGi BJJ + Kickboxing (combined) |
| Sat | 12:00 PM | Gi BJJ |

The Mon/Fri 6 PM slot is **one combined class** that trains NoGi BJJ and kickboxing together. Both program pages reflect this.

Schedule changes are announced on Facebook. The site shows a typed/styled schedule grid (not the flyer image), and the embedded Facebook feed surfaces any changes the gym posts.

## 5. Visual direction — "Honest Iron"

Cream / off-white base with strong red and black accents. Editorial layout. Real photos of the gym do the heavy lifting. Brand-true (preserves the "abandon modern culture" energy of the existing logo and gym mural) without making the kids/family side feel out of place.

### Palette

| Token | Hex | Use |
|---|---|---|
| Bone | `#F6F3EE` | Page background |
| Paper | `#FFFAF5` | Cards / surfaces |
| Iron | `#131313` | Type, dark "punch" sections (Visit band, footer) |
| Blood Red | `#B3261E` | Primary accent (CTAs, eyebrows, Gi BJJ schedule chips) |
| Oxblood | `#5A0D0A` | Hover / depth |
| Stone | `#8A8378` | Muted borders, Kids BJJ schedule chips |

Rules: one red, never two. No gradients. No pink. Iron handles type and one or two intentionally dark sections.

### Typography

- **Display:** Bebas Neue (condensed, all caps) — section titles, hero headlines
- **Body:** Inter (system fallback) — 15–17 px, generous line height
- **Eyebrows:** 11 px uppercase, Blood Red, .18em letterspacing

Self-hosted via Fontsource. Two families total.

### Schedule chip color logic

| Program | Chip color |
|---|---|
| Gi BJJ | Blood Red |
| NoGi + Kickboxing (combined) | Iron |
| Kids BJJ | Stone |

### Component shapes

- **Buttons:** Primary = solid Blood Red. Secondary = Iron outline. Ghost = Blood Red text only.
- **Program cards:** Real photo with a dark gradient overlay; all-caps program label top-left; title + one-line pitch underneath. Whole card is the link.
- **Schedule grid:** Seven columns (Mon–Sun). Empty days remain visible. Color-coded chips per the rules above. Legend below the grid.
- **"Visit us" dark band:** Iron background, cream and Blood Red type, big phone + Facebook CTAs.

## 6. Site map

Six pages total. All pages share a common header (logo, nav, "First class is FREE" CTA) and footer (logo, address, phone, hours line, Facebook link, © year).

| Path | Job |
|---|---|
| `/` | Full pitch: hero, programs strip, schedule, coaches preview, about, visit/Facebook. |
| `/bjj-gi` | Gi BJJ detail page. |
| `/bjj-nogi` | NoGi BJJ detail page. Notes the combined Mon/Fri 6 PM slot with Kickboxing. |
| `/kickboxing` | Kickboxing detail page. Same combined-slot note in reverse. |
| `/kids-bjj` | Kids BJJ detail page. Parent-targeted. |
| `/mma-fight-team` | MMA fight team detail page. Includes fighters and recent results sections. |

**Nav:** Home · Programs ▾ (the five program pages) · Coaches *(anchor `/#coaches` for now)* · Visit *(anchor `/#visit`)* · "First class is FREE" button (right-aligned, links to `/#schedule`).

## 7. Homepage anatomy

Top to bottom:

1. **Hero** — Eyebrow with city + "inside K1 Fitness," display headline, subhead naming the four programs, primary CTA "First class is FREE →" (jumps to `#schedule`), secondary "What to expect" link. Background: a real gym photo darkened with a cream overlay.
2. **Programs strip** — Five cards (Gi BJJ, NoGi BJJ, Kickboxing, Kids BJJ, MMA Fight Team). Each links to its detail page.
3. **Schedule** (`#schedule`) — Above the grid: "**Just stop in.** First class is on us. You're also welcome to sit and watch one before you ever step on the mat." Below: "Schedule changes are posted on our Facebook page — check there before driving in if it's been a few weeks."
4. **Coaches preview** (`#coaches`) — 2-up or 3-up grid: photo, name, one-line bio. Bios start as "Bio coming soon" placeholders until copy is supplied.
5. **About / Why The LC** — Two short paragraphs telling the gym's story. Paired with a wide group photo.
6. **Visit / Find us** (`#visit`) — Split layout: left = address + hours line + phone + Google Maps embed; right = "DM us on Facebook" CTA + embedded Facebook Page Plugin (recent posts).
7. **Footer** — Logo, address, phone, hours line, Facebook link, © year.

## 8. Program page template

Each of the five program pages uses one shared template. Sections, in order:

1. Page header — eyebrow ("Program"), name, one-sentence pitch.
2. Hero photo — wide, real, from the photo library; matched to program.
3. **What it is** — 2–3 short paragraphs, no jargon (except on the MMA fight team page where the audience knows the lingo).
4. **Who it's for** — bullet list. Kids page is parent-facing; NoGi page addresses both new grapplers and Gi-only crossover.
5. **What to expect first day** — bring this, wear that, when to arrive. Same shape across all pages so first-timers learn the rhythm.
6. **When it meets** — schedule snippet showing only the program's own time slots. NoGi and Kickboxing pages explicitly state "Combined class with [the other] — Mon/Fri 6 PM."
7. **Coach** — small card: photo, name, one-line bio (placeholder for now).
8. **Bottom CTA** — "First class is FREE — just stop in." Phone number. Address. Link to `/#visit`.

**MMA fight team page** has two extra sections after #5:

- **Fighters** — cards (name, weight class, record). Empty/placeholder until populated.
- **Recent results** — list of dates + match outcomes. Empty until populated.

## 9. Data architecture

Every piece of editable content lives as TypeScript data in `src/data/`. Layout code reads from these objects so updates are one-line edits.

| File | Shape |
|---|---|
| `src/data/site.ts` | Global facts: business name, domain, address, phone, hours line, Facebook URL. Used in header, footer, JSON-LD, default `<title>`. |
| `src/data/programs.ts` | Array of `{ slug, name, tagline, heroImage, whatItIs[], whoItsFor[], firstDayChecklist[], meetTimes[], coachSlug }`. Drives homepage programs strip and program detail pages. |
| `src/data/schedule.ts` | Array of `{ day, startTime, programSlug, coachSlug }`. Drives homepage schedule grid and program-page schedule snippets. |
| `src/data/coaches.ts` | Array of `{ slug, name, photo, bio, credentials[] }`. Drives homepage coaches preview and program-page coach cards. |

**Astro Content Collections** are not used in the initial build but the door is left open for future fight results, gym news, or a blog.

**Images** live in `src/assets/photos/` and are rendered through Astro's `<Image />` component (auto WebP/AVIF, responsive `srcset`, lazy loading below the fold). Brand assets (logo, alchemy mark) live in `src/assets/brand/`. The schedule flyer image is **not** used on the site; it stays in the gym's Facebook flow.

## 10. Facebook feed integration

**Implementation:** Meta's official Facebook Page Plugin (iframe embed). No API keys, no auth, no rate limits, free.

- Wrapped in an Astro component `<FacebookFeed />` at `src/components/FacebookFeed.astro`.
- Used full-size on the homepage `#visit` section (~500 px tall, scrollable, recent posts visible).
- Used compact on each program page in the schedule snippet ("Schedule changes? Check Facebook → [cover photo card]").
- **Cookie/consent posture:** plugin loads by default. The gym is a small US business not running ads, not collecting PII, and not subject to GDPR; click-to-load adds friction without a meaningful benefit here.
- **Fallback:** if the SDK fails (ad blocker, FB outage), the component renders a static card with the Facebook URL and the gym's most recent known cover photo. Phone and address are visible regardless of feed status.

## 11. Tech stack

- **Astro** (latest stable). Static output — every page pre-rendered to HTML at build time. No SSR. Minimal client JS (Facebook plugin, mobile nav toggle).
- **TypeScript** for the data files in `src/data/`.
- **No JS framework.** Astro components only. No React or Vue.
- **Tailwind CSS** via `@astrojs/tailwind`. Palette tokens (`bg-bone`, `bg-blood`, `text-iron`, etc.) defined in `tailwind.config.ts`.
- **Fontsource** for Bebas Neue + Inter (self-hosted, no Google CDN).
- **Astro `<Image />`** for all photos.
- **`@astrojs/sitemap`** for `sitemap.xml`. `robots.txt` checked into `public/`.
- **JSON-LD** `LocalBusiness` schema in the base layout (address, phone, hours, program list).

## 12. Deployment

- **Vercel.** GitHub repo connected; `main` branch auto-deploys to production at `thelcbjj.com`. Other branches get free preview URLs.
- **DNS:** apex `thelcbjj.com` and `www.thelcbjj.com` pointed at Vercel. SSL automatic.
- **Analytics:** Vercel Web Analytics (cookieless, no consent banner needed).

## 13. SEO posture

- Per-page `<title>` and meta description tuned for the program (e.g., "Kids BJJ in Walnut Ridge, AR — The LC").
- Open Graph tags so Facebook link previews look right.
- A single `LocalBusiness` JSON-LD block in the layout.
- `sitemap.xml` and `robots.txt` generated/published.

This is enough for a small local gym. No further SEO work is in scope.

## 14. Out of scope

Explicitly **not** in this build:

- Booking forms, contact forms, lead-capture forms.
- Pricing page (per gym preference: "stop in to ask").
- Blog, news, or article system.
- Member portal, login, gated content.
- E-commerce / merch.
- CMS (Sanity, Contentful, Decap, etc.). Edits are git commits. Decap can be added later if needed.
- Newsletter / email capture.
- A standalone Coaches page (lives as an anchor on the homepage; can be promoted to its own page later).

## 15. Open items

These are not blockers for the implementation plan; they get filled in as content arrives. The implementation should ship with sensible placeholder copy that is honest about being placeholder.

- **Coach bios** — supplied by the gym; placeholder text until then.
- **Per-program copy** — the body text for each program page's "What it is," "Who it's for," and "What to expect first day" sections. The implementation will draft a first pass based on standard BJJ/kickboxing class conventions, marked clearly so the gym can revise.
- **About / Why The LC** copy — homepage section 5. First-pass draft during implementation, tuned to the "abandon modern culture" voice already on the gym wall.
- **Fighter list & recent results** for the MMA fight team page — supplied by the gym; sections render empty placeholders until then.
- **Photo selection** — specific photos from the library for the hero, programs strip, and program detail page heroes are picked during implementation. Spec does not lock specific files.
- **Hero photo treatment** — exact crop and overlay opacity tuned during build for type contrast.
- **Alchemy symbol usage** — the secondary brand mark (the gold/black alchemy symbol that appears on the gym mural and on one logo glove) is available; how aggressively to use it as a watermark, divider, or section marker is decided during implementation.
