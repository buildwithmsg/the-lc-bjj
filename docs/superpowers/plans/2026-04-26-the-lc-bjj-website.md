# The LC BJJ Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a static Astro marketing site for The LC (Brazilian Jiu Jitsu gym in Walnut Ridge, AR) at `thelcbjj.com`, deployed to Vercel. Single conversion path: prominent schedule + Facebook feed + walk-ins. No forms.

**Architecture:** Astro static site (no SSR). All editable content lives as TypeScript objects in `src/data/`. Six pages: `/` (homepage) plus a dynamic `[slug].astro` route that generates the five program pages from `programs.ts` via `getStaticPaths`. Tailwind for styling with the "Honest Iron" palette as design tokens. Vitest for pure-logic unit tests, Playwright for end-to-end smoke tests, `astro check` for type safety.

**Tech Stack:** Astro 5, TypeScript (strict), Tailwind CSS, Fontsource (Bebas Neue + Inter), Astro `<Image />`, `@astrojs/sitemap`, Vitest, Playwright, Vercel.

**Source spec:** `docs/superpowers/specs/2026-04-26-the-lc-bjj-website-design.md`

---

## File Structure

```
the-lc-bjj/
├── astro.config.mjs                Astro config (Tailwind + sitemap integrations)
├── tailwind.config.ts              Palette tokens, font families
├── tsconfig.json                   Astro strict preset
├── vitest.config.ts                Vitest config
├── playwright.config.ts            Playwright config
├── package.json
├── README.md
├── public/
│   ├── robots.txt
│   └── favicon.svg
├── src/
│   ├── env.d.ts
│   ├── styles/
│   │   └── global.css              Tailwind layers + font imports + base
│   ├── data/
│   │   ├── site.ts                 Business facts (address, phone, FB)
│   │   ├── programs.ts             Five program objects + lookup
│   │   ├── schedule.ts             Six schedule entries + helpers
│   │   ├── coaches.ts              Coach objects (placeholder bios)
│   │   └── __tests__/              Vitest tests for the above
│   ├── lib/
│   │   ├── jsonld.ts               Build LocalBusiness JSON-LD
│   │   ├── schedule-utils.ts       groupByDay, getEntriesForProgram
│   │   └── __tests__/
│   ├── assets/
│   │   ├── brand/                  the-lc-logo.png, alchemy-symbol.png
│   │   └── photos/                 Gym photos (imported at build time)
│   ├── components/
│   │   ├── Layout.astro            Base <html>/<head>, JSON-LD, slots
│   │   ├── Header.astro            Logo, nav, CTA
│   │   ├── Footer.astro
│   │   ├── Hero.astro              Homepage hero
│   │   ├── ProgramCard.astro
│   │   ├── ScheduleGrid.astro      Full 7-column grid (homepage)
│   │   ├── ScheduleSnippet.astro   Compact program-page version
│   │   ├── CoachCard.astro
│   │   ├── FacebookFeed.astro      Page Plugin + fallback
│   │   ├── VisitBand.astro         Dark "find us" section
│   │   └── ProgramDetail.astro     Body of program detail pages
│   └── pages/
│       ├── index.astro             /
│       └── [slug].astro            /bjj-gi, /bjj-nogi, /kickboxing, /kids-bjj, /mma-fight-team
└── tests/
    └── e2e/
        ├── home.spec.ts
        ├── programs.spec.ts
        └── nav.spec.ts
```

---

## Task 1: Scaffold Astro project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/env.d.ts`
- Create: `src/pages/index.astro` (placeholder)

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "the-lc-bjj",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "astro": "astro"
  },
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/tailwind": "^5.1.0",
    "@astrojs/sitemap": "^3.2.0",
    "@astrojs/check": "^0.9.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.6.0",
    "@fontsource/bebas-neue": "^5.1.0",
    "@fontsource-variable/inter": "^5.1.0"
  },
  "devDependencies": {
    "vitest": "^2.1.0",
    "@playwright/test": "^1.48.0"
  }
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://thelcbjj.com',
  integrations: [tailwind(), sitemap()],
  build: { inlineStylesheets: 'auto' },
});
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

- [ ] **Step 4: Create `src/env.d.ts`**

```ts
/// <reference path="../.astro/types.d.ts" />
```

- [ ] **Step 5: Create placeholder `src/pages/index.astro`**

```astro
---
---
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>The LC — coming soon</title>
  </head>
  <body>
    <h1>The LC</h1>
    <p>Site under construction.</p>
  </body>
</html>
```

- [ ] **Step 6: Install dependencies**

Run: `npm install`
Expected: clean install, no peer dependency errors.

- [ ] **Step 7: Verify dev server starts**

Run: `npm run dev` — confirm it serves on `http://localhost:4321` and shows "Site under construction." Stop with Ctrl+C.

- [ ] **Step 8: Verify build succeeds**

Run: `npm run build`
Expected: `dist/` directory created with `index.html`. No errors.

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src/env.d.ts src/pages/index.astro
git commit -m "Scaffold Astro project with TypeScript strict"
```

---

## Task 2: Configure Tailwind palette and fonts

**Files:**
- Create: `tailwind.config.ts`
- Create: `src/styles/global.css`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bone: '#F6F3EE',
        paper: '#FFFAF5',
        iron: '#131313',
        blood: '#B3261E',
        oxblood: '#5A0D0A',
        stone: '#8A8378',
      },
      fontFamily: {
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.18em',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

- [ ] **Step 2: Create `src/styles/global.css`**

```css
@import '@fontsource/bebas-neue/400.css';
@import '@fontsource-variable/inter';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { @apply bg-bone text-iron; }
  body { @apply font-sans antialiased; }
  h1, h2, h3, h4 { @apply font-display tracking-wide; }
  ::selection { @apply bg-blood text-paper; }
}

@layer components {
  .eyebrow {
    @apply text-[11px] uppercase tracking-eyebrow text-blood font-semibold;
  }
  .container-page { @apply mx-auto max-w-6xl px-5 sm:px-8; }
  .btn-primary {
    @apply inline-flex items-center gap-2 bg-blood text-paper font-bold text-sm
           rounded-md px-4 py-3 hover:bg-oxblood transition-colors;
  }
  .btn-secondary {
    @apply inline-flex items-center gap-2 border border-iron text-iron font-bold text-sm
           rounded-md px-4 py-3 hover:bg-iron hover:text-paper transition-colors;
  }
  .btn-ghost {
    @apply inline-flex items-center gap-1 text-blood font-bold text-sm hover:text-oxblood transition-colors;
  }
}
```

- [ ] **Step 3: Update `src/pages/index.astro` to import the global stylesheet and exercise the palette**

```astro
---
import '../styles/global.css';
---
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>The LC — Walnut Ridge BJJ</title>
  </head>
  <body class="min-h-screen">
    <main class="container-page py-20">
      <p class="eyebrow">Walnut Ridge, AR</p>
      <h1 class="text-6xl mt-2 leading-none">REAL TRAINING. REAL PEOPLE.</h1>
      <p class="mt-4 max-w-prose">Tailwind palette and fonts smoke test.</p>
      <div class="mt-6 flex gap-3">
        <a class="btn-primary" href="#">First class is FREE →</a>
        <a class="btn-secondary" href="#">What to expect</a>
      </div>
    </main>
  </body>
</html>
```

- [ ] **Step 4: Verify dev server renders correctly**

Run: `npm run dev` — confirm Bebas Neue heading is visible, blood-red CTA button renders, eyebrow text is uppercase blood red. Stop server.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts src/styles/global.css src/pages/index.astro
git commit -m "Configure Tailwind palette and Honest Iron design tokens"
```

---

## Task 3: Set up Vitest

**Files:**
- Create: `vitest.config.ts`
- Create: `src/lib/__tests__/smoke.test.ts`

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/__tests__/**/*.test.ts'],
    environment: 'node',
    globals: false,
  },
  resolve: {
    alias: { '@': '/src' },
  },
});
```

- [ ] **Step 2: Write a smoke test**

Create `src/lib/__tests__/smoke.test.ts`:

```ts
import { describe, it, expect } from 'vitest';

describe('vitest smoke', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: 1 passed.

- [ ] **Step 4: Commit**

```bash
git add vitest.config.ts src/lib/__tests__/smoke.test.ts
git commit -m "Set up Vitest for unit tests"
```

---

## Task 4: site.ts data file (TDD)

**Files:**
- Create: `src/data/site.ts`
- Create: `src/data/__tests__/site.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/data/__tests__/site.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { site } from '../site';

describe('site data', () => {
  it('has the canonical business name', () => {
    expect(site.name).toBe('The LC');
  });

  it('uses the production domain', () => {
    expect(site.url).toBe('https://thelcbjj.com');
  });

  it('has a tel:-formatted phone for click-to-call', () => {
    expect(site.phoneTel).toMatch(/^\+1\d{10}$/);
  });

  it('has a complete US address', () => {
    expect(site.address.city).toBe('Walnut Ridge');
    expect(site.address.state).toBe('AR');
    expect(site.address.postalCode).toMatch(/^\d{5}$/);
  });

  it('points to the correct Facebook page', () => {
    expect(site.facebook).toBe('https://www.facebook.com/TheLCFightTeam');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: 5 failed (cannot find module `../site`).

- [ ] **Step 3: Implement `src/data/site.ts`**

```ts
export interface SiteAddress {
  street: string;
  venueNote: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface SiteInfo {
  name: string;
  tagline: string;
  domain: string;
  url: string;
  address: SiteAddress;
  phone: string;
  phoneTel: string;
  facebook: string;
  facebookHandle: string;
  hoursLine: string;
}

export const site: SiteInfo = {
  name: 'The LC',
  tagline: 'Brazilian Jiu Jitsu, kickboxing, and an MMA fight team in Walnut Ridge, Arkansas.',
  domain: 'thelcbjj.com',
  url: 'https://thelcbjj.com',
  address: {
    street: '217 W Elm St',
    venueNote: 'Inside K1 Fitness',
    city: 'Walnut Ridge',
    state: 'AR',
    postalCode: '72476',
    country: 'US',
  },
  phone: '(870) 886-2691',
  phoneTel: '+18708862691',
  facebook: 'https://www.facebook.com/TheLCFightTeam',
  facebookHandle: 'TheLCFightTeam',
  hoursLine: 'Open during class hours — see schedule',
};
```

> **Note:** the postal code `72476` is the standard ZIP for Walnut Ridge, AR. The implementer should verify with the gym during review.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/data/site.ts src/data/__tests__/site.test.ts
git commit -m "Add site data with address, phone, Facebook handle"
```

---

## Task 5: programs.ts data file (TDD)

**Files:**
- Create: `src/data/programs.ts`
- Create: `src/data/__tests__/programs.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/data/__tests__/programs.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { programs, getProgram, programSlugs } from '../programs';

describe('programs data', () => {
  it('has the five expected programs', () => {
    expect(programSlugs.sort()).toEqual(
      ['bjj-gi', 'bjj-nogi', 'kickboxing', 'kids-bjj', 'mma-fight-team'].sort()
    );
  });

  it('every program has unique slug, name, tagline, hero image, coach', () => {
    const slugs = new Set<string>();
    for (const p of programs) {
      expect(p.slug).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.tagline).toBeTruthy();
      expect(p.heroPhotoFile).toBeTruthy();
      expect(p.coachSlug).toBeTruthy();
      expect(slugs.has(p.slug)).toBe(false);
      slugs.add(p.slug);
    }
  });

  it('every program has metaTitle and metaDescription for SEO', () => {
    for (const p of programs) {
      expect(p.metaTitle.length).toBeGreaterThan(0);
      expect(p.metaTitle.length).toBeLessThanOrEqual(70);
      expect(p.metaDescription.length).toBeGreaterThan(0);
      expect(p.metaDescription.length).toBeLessThanOrEqual(160);
    }
  });

  it('getProgram returns the program for a known slug', () => {
    expect(getProgram('bjj-gi')?.name).toBe('Brazilian Jiu Jitsu — Gi');
  });

  it('getProgram returns undefined for an unknown slug', () => {
    expect(getProgram('does-not-exist')).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: failures (module not found).

- [ ] **Step 3: Implement `src/data/programs.ts`**

```ts
export interface Program {
  slug: string;
  name: string;
  shortName: string;
  cardLabel: string;
  tagline: string;
  heroPhotoFile: string;
  cardPhotoFile: string;
  whatItIs: string[];
  whoItsFor: string[];
  firstDayChecklist: string[];
  coachSlug: string;
  combinedWith?: string;
  metaTitle: string;
  metaDescription: string;
}

export const programs: Program[] = [
  {
    slug: 'bjj-gi',
    name: 'Brazilian Jiu Jitsu — Gi',
    shortName: 'Gi BJJ',
    cardLabel: 'GI BJJ',
    tagline: 'The classic art of grips, sweeps, and submissions. Beginners welcome.',
    heroPhotoFile: 'gi-class-mat.jpg',
    cardPhotoFile: 'gi-card.jpg',
    whatItIs: [
      'Brazilian Jiu Jitsu in the gi — the traditional uniform — is the foundation of modern grappling. You learn how to control, sweep, and submit a resisting opponent using leverage and technique, not size or strength.',
      'A typical class is a warm-up, a focused technical lesson, and live rolling (sparring) with partners at your level. New students train at their own pace.',
    ],
    whoItsFor: [
      'Total beginners — no experience needed.',
      'Experienced grapplers looking for honest training partners.',
      'Anyone who has watched UFC and wondered "how do they do that?"',
    ],
    firstDayChecklist: [
      'Wear comfortable athletic clothes — we have loaner gis if you need one.',
      'Show up 10 minutes early so you can meet the coach.',
      'Bring water. Drink it.',
      'Trim your fingernails and toenails — your training partners will thank you.',
    ],
    coachSlug: 'head-coach',
    metaTitle: 'Gi BJJ in Walnut Ridge, AR — The LC',
    metaDescription: 'Traditional Brazilian Jiu Jitsu training in the gi. First class is free. Walnut Ridge, AR.',
  },
  {
    slug: 'bjj-nogi',
    name: 'Brazilian Jiu Jitsu — NoGi',
    shortName: 'NoGi BJJ',
    cardLabel: 'NOGI BJJ',
    tagline: 'Grappling without the gi — faster, sweatier, closer to MMA.',
    heroPhotoFile: 'nogi-class.jpg',
    cardPhotoFile: 'nogi-card.jpg',
    whatItIs: [
      'NoGi BJJ trades the traditional uniform for shorts and a rashguard. Without sleeves and lapels to grip, the pace is faster and the techniques shift toward underhooks, body locks, and leg entanglements.',
      'At The LC, NoGi BJJ trains in the same class as Kickboxing on Monday and Friday at 6:00 PM. You\'ll get exposed to both grappling and striking concepts in one session.',
    ],
    whoItsFor: [
      'Beginners — no grappling experience needed.',
      'Gi BJJ practitioners who want to round out their game.',
      'Anyone interested in MMA or competitive grappling.',
    ],
    firstDayChecklist: [
      'Wear athletic shorts (no pockets or zippers) and a rashguard or fitted t-shirt.',
      'Show up 10 minutes early.',
      'Bring water.',
      'Trim fingernails and toenails.',
    ],
    coachSlug: 'head-coach',
    combinedWith: 'kickboxing',
    metaTitle: 'NoGi BJJ in Walnut Ridge, AR — The LC',
    metaDescription: 'NoGi grappling combined with kickboxing — Mondays and Fridays at 6 PM. First class is free.',
  },
  {
    slug: 'kickboxing',
    name: 'Kickboxing',
    shortName: 'Kickboxing',
    cardLabel: 'KICKBOXING',
    tagline: 'Stand-up striking — punches, kicks, knees, elbows.',
    heroPhotoFile: 'kickboxing-class.jpg',
    cardPhotoFile: 'kickboxing-card.jpg',
    whatItIs: [
      'Kickboxing is the stand-up striking half of mixed martial arts. You learn how to throw punches, kicks, knees, and elbows — and how to defend against them — through pad work, partner drills, and controlled sparring.',
      'At The LC, Kickboxing trains alongside NoGi BJJ on Monday and Friday at 6:00 PM, so a single session covers both grappling and striking.',
    ],
    whoItsFor: [
      'Beginners — no martial arts background required.',
      'People who want a striking workout that\'s actually a martial art.',
      'BJJ practitioners who want stand-up tools.',
    ],
    firstDayChecklist: [
      'Wear athletic shorts and a t-shirt or rashguard.',
      'Bring boxing gloves and shin guards if you have them — we have loaners if not.',
      'Show up 10 minutes early.',
      'Bring water.',
    ],
    coachSlug: 'head-coach',
    combinedWith: 'bjj-nogi',
    metaTitle: 'Kickboxing in Walnut Ridge, AR — The LC',
    metaDescription: 'Stand-up striking — punches, kicks, knees, elbows. Combined with NoGi BJJ. First class is free.',
  },
  {
    slug: 'kids-bjj',
    name: 'Kids Brazilian Jiu Jitsu',
    shortName: 'Kids BJJ',
    cardLabel: 'KIDS BJJ',
    tagline: 'Confidence, discipline, and a healthy outlet — for kids who need to move.',
    heroPhotoFile: 'kids-class.jpg',
    cardPhotoFile: 'kids-card.jpg',
    whatItIs: [
      'Kids BJJ at The LC teaches kids how to move, how to fall safely, how to control themselves, and how to control someone else without hurting them. It builds confidence, focus, and respect.',
      'Classes are structured: warm-up games, a technique lesson, and partnered drills. Coaches keep a close eye on every kid, every minute.',
    ],
    whoItsFor: [
      'Kids ages 5 and up — no prior experience needed.',
      'Parents looking for a martial arts program that focuses on real skills, not just discipline.',
      'Kids with extra energy who need a healthy place to spend it.',
    ],
    firstDayChecklist: [
      'Athletic clothes — gym shorts and a t-shirt are fine for the first day.',
      'Water bottle.',
      'Plan to arrive 10 minutes early — parents are welcome to sit and watch the entire class.',
      'No experience expected. We start at the beginning.',
    ],
    coachSlug: 'head-coach',
    metaTitle: 'Kids BJJ in Walnut Ridge, AR — The LC',
    metaDescription: 'Brazilian Jiu Jitsu for kids ages 5+. Confidence, discipline, real skills. First class is free.',
  },
  {
    slug: 'mma-fight-team',
    name: 'MMA Fight Team',
    shortName: 'MMA Team',
    cardLabel: 'MMA TEAM',
    tagline: 'Compete out of The LC. By tryout — talk to a coach.',
    heroPhotoFile: 'mma-cage.jpg',
    cardPhotoFile: 'mma-card.jpg',
    whatItIs: [
      'The LC fight team competes in regional MMA promotions. Members train with the head coach on a structured camp schedule and get fight-specific preparation: weight cuts, game-planning, sparring partners.',
      'Membership is by tryout. If you have prior martial arts experience and want to compete, talk to a coach after a regular class.',
    ],
    whoItsFor: [
      'Athletes with prior martial arts experience.',
      'Competitors serious about earning a record, not just training.',
    ],
    firstDayChecklist: [
      'Come to a regular adult class first.',
      'Talk to the head coach about your background and goals.',
      'Be ready to show up consistently — fight camps are six to eight weeks of disciplined training.',
    ],
    coachSlug: 'head-coach',
    metaTitle: 'MMA Fight Team — The LC, Walnut Ridge AR',
    metaDescription: 'Regional MMA fight team based in Walnut Ridge, Arkansas. Tryouts available — talk to a coach.',
  },
];

export const programSlugs = programs.map((p) => p.slug);

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}
```

> **Photo filenames are placeholders** — Task 9 imports the actual photos and the implementer renames them to match (or updates these references).

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/data/programs.ts src/data/__tests__/programs.test.ts
git commit -m "Add programs data with first-pass copy for all five programs"
```

---

## Task 6: schedule.ts data + utilities (TDD)

**Files:**
- Create: `src/data/schedule.ts`
- Create: `src/data/__tests__/schedule.test.ts`
- Create: `src/lib/schedule-utils.ts`
- Create: `src/lib/__tests__/schedule-utils.test.ts`

- [ ] **Step 1: Write failing tests for schedule data**

Create `src/data/__tests__/schedule.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { schedule } from '../schedule';
import { programSlugs } from '../programs';

describe('schedule data', () => {
  it('has six entries (Mon×2, Tue, Fri×2, Sat)', () => {
    expect(schedule).toHaveLength(6);
  });

  it('every entry references a real program slug', () => {
    for (const entry of schedule) {
      for (const slug of entry.programSlugs) {
        expect(programSlugs).toContain(slug);
      }
    }
  });

  it('combined NoGi+Kickboxing entries reference both program slugs', () => {
    const combined = schedule.filter((e) => e.chipStyle === 'combined');
    expect(combined).toHaveLength(2); // Mon and Fri at 6 PM
    for (const entry of combined) {
      expect(entry.programSlugs.sort()).toEqual(['bjj-nogi', 'kickboxing']);
    }
  });

  it('uses correct chip styles per the spec (gi/combined/kids)', () => {
    const styles = new Set(schedule.map((e) => e.chipStyle));
    expect(styles).toEqual(new Set(['gi', 'combined', 'kids']));
  });
});
```

- [ ] **Step 2: Implement `src/data/schedule.ts`**

```ts
export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export type ChipStyle = 'gi' | 'combined' | 'kids';

export interface ScheduleEntry {
  day: DayOfWeek;
  startTime: string;
  startMinutes: number;
  durationMinutes: number;
  label: string;
  chipStyle: ChipStyle;
  programSlugs: string[];
}

export const dayOrder: DayOfWeek[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export const dayLabel: Record<DayOfWeek, string> = {
  mon: 'Mon',
  tue: 'Tue',
  wed: 'Wed',
  thu: 'Thu',
  fri: 'Fri',
  sat: 'Sat',
  sun: 'Sun',
};

export const schedule: ScheduleEntry[] = [
  { day: 'mon', startTime: '5:00 PM', startMinutes: 17 * 60, durationMinutes: 60, label: 'Kids BJJ',                chipStyle: 'kids',     programSlugs: ['kids-bjj'] },
  { day: 'mon', startTime: '6:00 PM', startMinutes: 18 * 60, durationMinutes: 60, label: 'NoGi BJJ + Kickboxing',   chipStyle: 'combined', programSlugs: ['bjj-nogi', 'kickboxing'] },
  { day: 'tue', startTime: '12:00 PM', startMinutes: 12 * 60, durationMinutes: 60, label: 'Gi BJJ',                  chipStyle: 'gi',       programSlugs: ['bjj-gi'] },
  { day: 'fri', startTime: '5:00 PM', startMinutes: 17 * 60, durationMinutes: 60, label: 'Kids BJJ',                chipStyle: 'kids',     programSlugs: ['kids-bjj'] },
  { day: 'fri', startTime: '6:00 PM', startMinutes: 18 * 60, durationMinutes: 60, label: 'NoGi BJJ + Kickboxing',   chipStyle: 'combined', programSlugs: ['bjj-nogi', 'kickboxing'] },
  { day: 'sat', startTime: '12:00 PM', startMinutes: 12 * 60, durationMinutes: 60, label: 'Gi BJJ',                  chipStyle: 'gi',       programSlugs: ['bjj-gi'] },
];
```

- [ ] **Step 3: Write failing tests for schedule utilities**

Create `src/lib/__tests__/schedule-utils.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { groupByDay, getEntriesForProgram } from '../schedule-utils';
import { schedule } from '@/data/schedule';

describe('groupByDay', () => {
  it('keys every day of the week, even empty ones', () => {
    const grouped = groupByDay(schedule);
    expect(Object.keys(grouped).sort()).toEqual(['fri', 'mon', 'sat', 'sun', 'thu', 'tue', 'wed']);
  });

  it('returns empty arrays for days with no classes', () => {
    const grouped = groupByDay(schedule);
    expect(grouped.wed).toEqual([]);
    expect(grouped.thu).toEqual([]);
    expect(grouped.sun).toEqual([]);
  });

  it('sorts entries within a day by start time', () => {
    const grouped = groupByDay(schedule);
    const monTimes = grouped.mon.map((e) => e.startMinutes);
    expect(monTimes).toEqual([...monTimes].sort((a, b) => a - b));
  });
});

describe('getEntriesForProgram', () => {
  it('returns all entries that include the given program slug', () => {
    expect(getEntriesForProgram('bjj-gi')).toHaveLength(2);
    expect(getEntriesForProgram('kids-bjj')).toHaveLength(2);
    expect(getEntriesForProgram('bjj-nogi')).toHaveLength(2);
    expect(getEntriesForProgram('kickboxing')).toHaveLength(2);
  });

  it('returns empty for an unknown slug', () => {
    expect(getEntriesForProgram('does-not-exist')).toEqual([]);
  });
});
```

- [ ] **Step 4: Implement `src/lib/schedule-utils.ts`**

```ts
import { dayOrder, schedule, type DayOfWeek, type ScheduleEntry } from '@/data/schedule';

export function groupByDay(entries: ScheduleEntry[] = schedule): Record<DayOfWeek, ScheduleEntry[]> {
  const out = {} as Record<DayOfWeek, ScheduleEntry[]>;
  for (const day of dayOrder) out[day] = [];
  for (const entry of entries) out[entry.day].push(entry);
  for (const day of dayOrder) out[day].sort((a, b) => a.startMinutes - b.startMinutes);
  return out;
}

export function getEntriesForProgram(slug: string, entries: ScheduleEntry[] = schedule): ScheduleEntry[] {
  return entries.filter((e) => e.programSlugs.includes(slug));
}
```

- [ ] **Step 5: Run tests**

Run: `npm test`
Expected: all tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/data/schedule.ts src/data/__tests__/schedule.test.ts src/lib/schedule-utils.ts src/lib/__tests__/schedule-utils.test.ts
git commit -m "Add schedule data and groupByDay / getEntriesForProgram utilities"
```

---

## Task 7: coaches.ts data file (TDD)

**Files:**
- Create: `src/data/coaches.ts`
- Create: `src/data/__tests__/coaches.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/data/__tests__/coaches.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { coaches, getCoach } from '../coaches';
import { programs } from '../programs';

describe('coaches data', () => {
  it('has at least one coach', () => {
    expect(coaches.length).toBeGreaterThan(0);
  });

  it('every coach has a unique slug', () => {
    const slugs = coaches.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('every program references a real coach', () => {
    const slugs = new Set(coaches.map((c) => c.slug));
    for (const program of programs) {
      expect(slugs.has(program.coachSlug)).toBe(true);
    }
  });

  it('getCoach returns by slug', () => {
    expect(getCoach('head-coach')?.name).toBeTruthy();
    expect(getCoach('does-not-exist')).toBeUndefined();
  });
});
```

- [ ] **Step 2: Implement `src/data/coaches.ts`**

```ts
export interface Coach {
  slug: string;
  name: string;
  photoFile: string;
  bio: string;
  credentials: string[];
  isHead: boolean;
}

export const coaches: Coach[] = [
  {
    slug: 'head-coach',
    name: 'Head Coach',
    photoFile: 'coach-placeholder.jpg',
    bio: 'Bio coming soon — stop in and meet the coach in person.',
    credentials: [],
    isHead: true,
  },
];

export function getCoach(slug: string): Coach | undefined {
  return coaches.find((c) => c.slug === slug);
}
```

> **Note:** Real coach data is on the Open Items list in the spec. The placeholder coach lets the rest of the site render. When the gym sends bios, replace the placeholder with one entry per coach and wire up `coachSlug` on each program accordingly.

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: all tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/data/coaches.ts src/data/__tests__/coaches.test.ts
git commit -m "Add coaches data with placeholder until bios arrive"
```

---

## Task 8: jsonld.ts builder (TDD)

**Files:**
- Create: `src/lib/jsonld.ts`
- Create: `src/lib/__tests__/jsonld.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/lib/__tests__/jsonld.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { buildLocalBusinessJsonLd } from '../jsonld';

describe('LocalBusiness JSON-LD', () => {
  const ld = buildLocalBusinessJsonLd();

  it('declares schema.org context and SportsActivityLocation type', () => {
    expect(ld['@context']).toBe('https://schema.org');
    expect(ld['@type']).toBe('SportsActivityLocation');
  });

  it('includes name, url, telephone', () => {
    expect(ld.name).toBe('The LC');
    expect(ld.url).toBe('https://thelcbjj.com');
    expect(ld.telephone).toMatch(/^\+1\d{10}$/);
  });

  it('lists Facebook in sameAs', () => {
    expect(ld.sameAs).toContain('https://www.facebook.com/TheLCFightTeam');
  });

  it('embeds a PostalAddress', () => {
    expect(ld.address['@type']).toBe('PostalAddress');
    expect(ld.address.addressLocality).toBe('Walnut Ridge');
    expect(ld.address.addressRegion).toBe('AR');
  });
});
```

- [ ] **Step 2: Implement `src/lib/jsonld.ts`**

```ts
import { site } from '@/data/site';

export function buildLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: site.name,
    url: site.url,
    telephone: site.phoneTel,
    sameAs: [site.facebook],
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
  } as const;
}
```

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: all tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/lib/jsonld.ts src/lib/__tests__/jsonld.test.ts
git commit -m "Add LocalBusiness JSON-LD builder"
```

---

## Task 9: Import brand assets and photos

**Files:**
- Create: `src/assets/brand/the-lc-logo.png`
- Create: `src/assets/brand/alchemy-symbol.png`
- Create: `src/assets/photos/*.jpg` (selected from desktop)

- [ ] **Step 1: Create asset directories**

```bash
mkdir -p src/assets/brand src/assets/photos
```

- [ ] **Step 2: Copy brand assets from the resource folder**

```bash
cp "/c/Users/Roger/OneDrive/Desktop/The LC/the-lc-logo.png" src/assets/brand/the-lc-logo.png
cp "/c/Users/Roger/OneDrive/Desktop/The LC/Gold_Alchemy_Symbol01.png" src/assets/brand/alchemy-symbol.png
```

- [ ] **Step 3: Copy and rename photos for each program**

The implementer chooses photos from `/c/Users/Roger/OneDrive/Desktop/The LC/` matching each program's mood. Suggested mapping (verify visually before committing):

| Target filename | Source (suggested) | Used for |
|---|---|---|
| `gym-hero.jpg` | `645699009_10164038808494106_1406915835903297865_n.jpg` (group photo by red mural) | Homepage hero |
| `gi-class-mat.jpg` | `473743252_946997207526802_2853157887819917443_n.jpg` (gi group photo) | Gi BJJ hero |
| `gi-card.jpg` | same as above, cropped square | Gi BJJ card |
| `nogi-class.jpg` | `301144688_417655917127603_7666367993462229160_n.jpg` (coach instructing) | NoGi BJJ hero |
| `nogi-card.jpg` | same as above, cropped square | NoGi BJJ card |
| `kickboxing-class.jpg` | `477580376_961927082700481_1243131852725875557_n.jpg` (cage moment) | Kickboxing hero |
| `kickboxing-card.jpg` | same | Kickboxing card |
| `kids-class.jpg` | (pick a photo with kids if available; otherwise placeholder + flag for gym) | Kids BJJ hero |
| `kids-card.jpg` | same | Kids BJJ card |
| `mma-cage.jpg` | `477580376_961927082700481_1243131852725875557_n.jpg` (raised arm in cage) | MMA team hero |
| `mma-card.jpg` | same | MMA team card |
| `coach-placeholder.jpg` | any clean coach portrait until real bios arrive | Coach card |
| `about-banner.jpg` | `669688436_10164228811989106_2888001460298591684_n.jpg` (banner team photo) | About section |

Copy each via `cp` (Bash on Windows uses forward-slash paths inside `/c/Users/...`).

- [ ] **Step 4: Verify photo filenames match the references in `programs.ts`**

Run: `npm test`
Expected: still passes (no test asserts file existence). The Astro build in Task 10 will fail loudly if a referenced file is missing.

- [ ] **Step 5: Commit**

```bash
git add src/assets/
git commit -m "Import brand assets and photos for hero and program cards"
```

---

## Task 10: Layout, Header, Footer

**Files:**
- Create: `src/components/Layout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create `src/components/Header.astro`**

```astro
---
import { Image } from 'astro:assets';
import logo from '@/assets/brand/the-lc-logo.png';
import { programs } from '@/data/programs';

interface Props { ctaHref?: string }
const { ctaHref = '/#schedule' } = Astro.props;
---

<header class="bg-bone border-b border-iron/10">
  <div class="container-page flex items-center justify-between gap-4 py-4">
    <a href="/" class="flex items-center gap-3">
      <Image src={logo} alt="The LC logo" width={48} height={48} class="rounded-sm" />
      <span class="font-display text-2xl tracking-wide leading-none">The LC</span>
    </a>

    <nav class="hidden md:flex items-center gap-6 text-sm font-semibold">
      <a href="/" class="hover:text-blood">Home</a>
      <details class="relative group">
        <summary class="cursor-pointer list-none hover:text-blood select-none">Programs ▾</summary>
        <div class="absolute right-0 mt-2 w-56 bg-paper border border-iron/10 rounded-md shadow-lg p-2 z-10">
          {programs.map((p) => (
            <a href={`/${p.slug}`} class="block px-3 py-2 rounded hover:bg-blood/5">{p.shortName}</a>
          ))}
        </div>
      </details>
      <a href="/#coaches" class="hover:text-blood">Coaches</a>
      <a href="/#visit" class="hover:text-blood">Visit</a>
    </nav>

    <a href={ctaHref} class="btn-primary text-xs sm:text-sm">First class is FREE →</a>
  </div>
</header>
```

- [ ] **Step 2: Create `src/components/Footer.astro`**

```astro
---
import { site } from '@/data/site';
const year = new Date().getFullYear();
---

<footer class="bg-iron text-paper">
  <div class="container-page py-12 grid gap-8 md:grid-cols-3">
    <div>
      <p class="eyebrow text-blood">{site.name}</p>
      <p class="mt-2 text-sm opacity-80 max-w-prose">{site.tagline}</p>
    </div>
    <div class="text-sm">
      <p class="font-bold">Find us</p>
      <p class="mt-1 opacity-80">{site.address.street}</p>
      <p class="opacity-80">{site.address.venueNote}</p>
      <p class="opacity-80">{site.address.city}, {site.address.state} {site.address.postalCode}</p>
      <p class="mt-2 opacity-80">{site.hoursLine}</p>
    </div>
    <div class="text-sm">
      <p class="font-bold">Contact</p>
      <a class="block mt-1 hover:text-blood" href={`tel:${site.phoneTel}`}>{site.phone}</a>
      <a class="block mt-1 hover:text-blood" href={site.facebook} target="_blank" rel="noopener">Facebook ↗</a>
    </div>
  </div>
  <div class="border-t border-paper/10">
    <p class="container-page py-4 text-xs opacity-60">© {year} {site.name}. All rights reserved.</p>
  </div>
</footer>
```

- [ ] **Step 3: Create `src/components/Layout.astro`**

```astro
---
import '@/styles/global.css';
import Header from './Header.astro';
import Footer from './Footer.astro';
import { buildLocalBusinessJsonLd } from '@/lib/jsonld';
import { site } from '@/data/site';

interface Props {
  title: string;
  description?: string;
  ogImage?: string;
  canonicalPath?: string;
}
const { title, description = site.tagline, ogImage = '/og-default.jpg', canonicalPath = Astro.url.pathname } = Astro.props;
const canonical = new URL(canonicalPath, site.url).toString();
const ld = buildLocalBusinessJsonLd();
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="canonical" href={canonical} />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:site_name" content={site.name} />
    <meta property="og:image" content={new URL(ogImage, site.url).toString()} />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json" set:html={JSON.stringify(ld)} />
  </head>
  <body class="min-h-screen flex flex-col bg-bone text-iron">
    <Header />
    <main class="flex-1"><slot /></main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 4: Update `src/pages/index.astro` to use the Layout (smoke test)**

```astro
---
import Layout from '@/components/Layout.astro';
import { site } from '@/data/site';
---
<Layout title={`${site.name} — ${site.tagline}`}>
  <section class="container-page py-20">
    <p class="eyebrow">Walnut Ridge, AR · Inside K1 Fitness</p>
    <h1 class="text-6xl mt-2 leading-none">REAL TRAINING. REAL PEOPLE.</h1>
    <p class="mt-4 max-w-prose">Header, footer, and JSON-LD smoke test.</p>
  </section>
</Layout>
```

- [ ] **Step 5: Verify the page renders and JSON-LD is in the head**

Run: `npm run dev` — open `http://localhost:4321`. Confirm header has logo + nav + red CTA, footer has address and Facebook link. Open the page source and confirm `<script type="application/ld+json">` is present with the LocalBusiness payload.

- [ ] **Step 6: Type check and build**

Run: `npm run check && npm run build`
Expected: zero errors, build succeeds.

- [ ] **Step 7: Commit**

```bash
git add src/components/Layout.astro src/components/Header.astro src/components/Footer.astro src/pages/index.astro
git commit -m "Add Layout, Header, Footer with JSON-LD and meta tags"
```

---

## Task 11: Build shared components (ScheduleGrid, ProgramCard, CoachCard, FacebookFeed, VisitBand, Hero)

**Files:**
- Create: `src/components/ScheduleGrid.astro`
- Create: `src/components/ScheduleSnippet.astro`
- Create: `src/components/ProgramCard.astro`
- Create: `src/components/CoachCard.astro`
- Create: `src/components/FacebookFeed.astro`
- Create: `src/components/VisitBand.astro`
- Create: `src/components/Hero.astro`

- [ ] **Step 1: `ScheduleGrid.astro` — homepage 7-column grid**

```astro
---
import { groupByDay } from '@/lib/schedule-utils';
import { dayOrder, dayLabel, type ChipStyle } from '@/data/schedule';

const grouped = groupByDay();

const chipClass: Record<ChipStyle, string> = {
  gi: 'bg-blood text-paper',
  combined: 'bg-iron text-paper',
  kids: 'bg-stone text-paper',
};
---

<section id="schedule" class="container-page py-16">
  <p class="eyebrow">Schedule</p>
  <h2 class="text-4xl mt-2">Just stop in.</h2>
  <p class="mt-3 max-w-prose">First class is on us. You're also welcome to sit and watch a class before you ever step on the mat.</p>

  <div class="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
    {dayOrder.map((day) => (
      <div class="bg-paper border border-iron/10 rounded-lg p-3 min-h-[110px]">
        <p class="text-[11px] uppercase tracking-eyebrow text-iron/55 font-bold">{dayLabel[day]}</p>
        <div class="mt-2 space-y-1.5">
          {grouped[day].length === 0 ? (
            <p class="text-iron/30 italic text-xs">—</p>
          ) : grouped[day].map((entry) => (
            <span class={`block text-xs font-bold rounded px-2 py-1.5 leading-tight ${chipClass[entry.chipStyle]}`}>
              {entry.startTime}<br /><span class="font-semibold opacity-90">{entry.label}</span>
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>

  <p class="mt-6 text-sm text-iron/70 max-w-prose">
    Schedule changes are posted on our <a class="text-blood font-semibold hover:underline" href="https://www.facebook.com/TheLCFightTeam" target="_blank" rel="noopener">Facebook page</a> — check there before driving in if it's been a few weeks.
  </p>

  <div class="mt-4 flex flex-wrap gap-3 text-xs">
    <span class="inline-flex items-center gap-2"><span class="w-3 h-3 rounded bg-blood"></span> Gi BJJ</span>
    <span class="inline-flex items-center gap-2"><span class="w-3 h-3 rounded bg-iron"></span> NoGi + Kickboxing (combined)</span>
    <span class="inline-flex items-center gap-2"><span class="w-3 h-3 rounded bg-stone"></span> Kids BJJ</span>
  </div>
</section>
```

- [ ] **Step 2: `ScheduleSnippet.astro` — compact program-page version**

```astro
---
import { getEntriesForProgram } from '@/lib/schedule-utils';
import { dayLabel } from '@/data/schedule';

interface Props { programSlug: string }
const { programSlug } = Astro.props;
const entries = getEntriesForProgram(programSlug);
---

<div class="bg-paper border border-iron/10 rounded-lg p-5">
  <p class="eyebrow">When it meets</p>
  <ul class="mt-2 space-y-1 text-sm">
    {entries.map((e) => (
      <li><span class="font-bold">{dayLabel[e.day]}</span> · {e.startTime} · {e.label}</li>
    ))}
  </ul>
</div>
```

- [ ] **Step 3: `ProgramCard.astro`**

```astro
---
import { Image } from 'astro:assets';
import type { Program } from '@/data/programs';

interface Props { program: Program; photo: ImageMetadata }
const { program, photo } = Astro.props;
---

<a href={`/${program.slug}`} class="group block bg-paper border border-iron/10 rounded-lg overflow-hidden hover:-translate-y-0.5 hover:shadow-lg transition">
  <div class="relative aspect-[4/3] overflow-hidden">
    <Image src={photo} alt={program.name} class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    <div class="absolute inset-0 bg-gradient-to-t from-iron/70 via-iron/10 to-transparent"></div>
    <span class="absolute top-3 left-3 font-display text-xl text-paper tracking-wider">{program.cardLabel}</span>
  </div>
  <div class="p-4">
    <h3 class="text-base font-bold">{program.name}</h3>
    <p class="mt-1 text-sm text-iron/70 leading-snug">{program.tagline}</p>
    <p class="mt-3 text-blood text-sm font-bold group-hover:translate-x-0.5 transition-transform">Learn more →</p>
  </div>
</a>
```

- [ ] **Step 4: `CoachCard.astro`**

```astro
---
import { Image } from 'astro:assets';
import type { Coach } from '@/data/coaches';

interface Props { coach: Coach; photo: ImageMetadata }
const { coach, photo } = Astro.props;
---

<article class="bg-paper border border-iron/10 rounded-lg overflow-hidden">
  <div class="aspect-[4/5] overflow-hidden">
    <Image src={photo} alt={coach.name} class="w-full h-full object-cover" />
  </div>
  <div class="p-4">
    <h3 class="text-lg font-bold">{coach.name}</h3>
    {coach.credentials.length > 0 && (
      <p class="text-xs text-blood font-semibold uppercase tracking-eyebrow mt-1">{coach.credentials.join(' · ')}</p>
    )}
    <p class="mt-2 text-sm text-iron/70 leading-snug">{coach.bio}</p>
  </div>
</article>
```

- [ ] **Step 5: `FacebookFeed.astro`**

```astro
---
import { site } from '@/data/site';

interface Props {
  variant?: 'full' | 'compact';
  height?: number;
}
const { variant = 'full', height = 500 } = Astro.props;
const pageUrl = site.facebook;
const iframeSrc = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(pageUrl)}&tabs=timeline&width=500&height=${height}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;
const compactSrc = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(pageUrl)}&tabs=&width=320&height=200&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`;
---

<div class="bg-paper border border-iron/10 rounded-lg overflow-hidden">
  <div class="px-4 py-2 border-b border-iron/10 flex items-center justify-between">
    <p class="text-xs uppercase tracking-eyebrow font-bold text-iron/60">Latest from Facebook</p>
    <a href={pageUrl} target="_blank" rel="noopener" class="text-blood text-xs font-bold hover:underline">Open ↗</a>
  </div>
  {variant === 'full' ? (
    <iframe
      src={iframeSrc}
      width="500"
      height={height}
      style="border:none;overflow:hidden"
      scrolling="no"
      frameborder="0"
      allowfullscreen={true}
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      class="w-full"
      loading="lazy"
      title="The LC on Facebook"
    ></iframe>
  ) : (
    <iframe
      src={compactSrc}
      width="320"
      height="200"
      style="border:none;overflow:hidden"
      scrolling="no"
      frameborder="0"
      allowfullscreen={true}
      class="w-full"
      loading="lazy"
      title="The LC on Facebook"
    ></iframe>
  )}
  <noscript>
    <div class="p-4 text-sm">
      Latest posts at <a class="text-blood font-bold" href={pageUrl}>facebook.com/TheLCFightTeam</a>.
    </div>
  </noscript>
</div>
```

- [ ] **Step 6: `VisitBand.astro`**

```astro
---
import { site } from '@/data/site';
import FacebookFeed from './FacebookFeed.astro';
const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(site.address.street + ', ' + site.address.city + ', ' + site.address.state + ' ' + site.address.postalCode)}&output=embed`;
---

<section id="visit" class="bg-iron text-paper">
  <div class="container-page py-16 grid gap-10 lg:grid-cols-2 items-start">
    <div>
      <p class="text-[11px] uppercase tracking-eyebrow text-blood font-bold">Visit</p>
      <h2 class="font-display text-5xl mt-2 leading-none">Stop in.<br/>Watch a class.<br/>Roll with us.</h2>
      <div class="mt-6 space-y-1 text-sm">
        <p class="font-bold">{site.address.street}</p>
        <p class="opacity-80">{site.address.venueNote}</p>
        <p class="opacity-80">{site.address.city}, {site.address.state} {site.address.postalCode}</p>
      </div>
      <div class="mt-6 flex flex-wrap gap-3">
        <a class="btn-primary" href={site.facebook} target="_blank" rel="noopener">DM us on Facebook</a>
        <a class="bg-paper text-iron font-bold text-sm rounded-md px-4 py-3 hover:bg-stone hover:text-paper transition-colors" href={`tel:${site.phoneTel}`}>{site.phone}</a>
      </div>
      <div class="mt-8 rounded-lg overflow-hidden border border-paper/10 aspect-video">
        <iframe src={mapEmbed} class="w-full h-full" loading="lazy" title="Map to The LC"></iframe>
      </div>
    </div>
    <div>
      <FacebookFeed />
    </div>
  </div>
</section>
```

- [ ] **Step 7: `Hero.astro`**

```astro
---
import { Image } from 'astro:assets';
import hero from '@/assets/photos/gym-hero.jpg';
import { site } from '@/data/site';
---

<section class="relative bg-iron text-paper overflow-hidden">
  <div class="absolute inset-0">
    <Image src={hero} alt="The LC gym" class="w-full h-full object-cover opacity-40" />
    <div class="absolute inset-0 bg-gradient-to-r from-iron via-iron/80 to-iron/40"></div>
  </div>
  <div class="relative container-page py-24 md:py-32 max-w-3xl">
    <p class="text-[11px] uppercase tracking-eyebrow text-blood font-bold">Walnut Ridge, AR · Inside K1 Fitness</p>
    <h1 class="font-display text-6xl md:text-7xl mt-3 leading-[0.95]">
      Real training.<br/><span class="text-blood">Real people.</span><br/>The LC.
    </h1>
    <p class="mt-5 max-w-prose text-paper/80 text-base">
      {site.tagline}
    </p>
    <div class="mt-7 flex flex-wrap gap-3">
      <a class="btn-primary text-base" href="#schedule">First class is FREE →</a>
      <a class="border border-paper text-paper font-bold text-sm rounded-md px-4 py-3 hover:bg-paper hover:text-iron transition-colors" href="#programs">What we offer</a>
    </div>
  </div>
</section>
```

- [ ] **Step 8: Type check and build**

Run: `npm run check && npm run build`
Expected: build passes.

- [ ] **Step 9: Commit**

```bash
git add src/components/
git commit -m "Add ScheduleGrid, ScheduleSnippet, ProgramCard, CoachCard, FacebookFeed, VisitBand, Hero components"
```

---

## Task 12: Build the homepage

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace `src/pages/index.astro` with the full homepage**

```astro
---
import { Image } from 'astro:assets';
import Layout from '@/components/Layout.astro';
import Hero from '@/components/Hero.astro';
import ScheduleGrid from '@/components/ScheduleGrid.astro';
import ProgramCard from '@/components/ProgramCard.astro';
import CoachCard from '@/components/CoachCard.astro';
import VisitBand from '@/components/VisitBand.astro';
import { programs } from '@/data/programs';
import { coaches } from '@/data/coaches';
import { site } from '@/data/site';
import aboutBanner from '@/assets/photos/about-banner.jpg';

// Map cardPhotoFile -> imported asset module so Astro <Image /> can transform it.
const cardPhotos = import.meta.glob<{ default: ImageMetadata }>('@/assets/photos/*-card.jpg', { eager: true });
const coachPhotos = import.meta.glob<{ default: ImageMetadata }>('@/assets/photos/coach-*.jpg', { eager: true });

function photoFor(filename: string, map: typeof cardPhotos) {
  const match = Object.entries(map).find(([k]) => k.endsWith('/' + filename));
  if (!match) throw new Error(`Missing photo: ${filename}`);
  return match[1].default;
}
---

<Layout title={`${site.name} — Brazilian Jiu Jitsu in Walnut Ridge, AR`}
        description={site.tagline}>
  <Hero />

  <section id="programs" class="container-page py-16">
    <p class="eyebrow">Programs</p>
    <h2 class="text-4xl mt-2">Find your program</h2>
    <p class="mt-3 max-w-prose">Five paths under one roof. Every adult class is open to first-timers.</p>
    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {programs.map((p) => (
        <ProgramCard program={p} photo={photoFor(p.cardPhotoFile, cardPhotos)} />
      ))}
    </div>
  </section>

  <ScheduleGrid />

  <section id="coaches" class="container-page py-16">
    <p class="eyebrow">Coaches</p>
    <h2 class="text-4xl mt-2">Who you'll train with</h2>
    <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {coaches.map((c) => (
        <CoachCard coach={c} photo={photoFor(c.photoFile, coachPhotos)} />
      ))}
    </div>
  </section>

  <section class="bg-paper border-y border-iron/10">
    <div class="container-page py-16 grid gap-10 lg:grid-cols-2 items-center">
      <div>
        <p class="eyebrow">Why The LC</p>
        <h2 class="text-4xl mt-2">Abandon modern culture.<br/>Pick up something real.</h2>
        <p class="mt-4 max-w-prose">
          The LC is a small gym with a serious mat. We train Brazilian Jiu Jitsu, kickboxing, and an MMA fight team out of a working space inside K1 Fitness — not a polished franchise, not a punch-card wellness lounge. People who train here show up because they want to learn how to fight, how to grapple, and how to fall down and get back up. New students are welcome at any class.
        </p>
        <p class="mt-3 max-w-prose">
          The first class is on us. Bring water and a willingness to learn.
        </p>
      </div>
      <div class="rounded-lg overflow-hidden">
        <Image src={aboutBanner} alt="The LC team" class="w-full h-auto" />
      </div>
    </div>
  </section>

  <VisitBand />
</Layout>
```

- [ ] **Step 2: Run dev server and walk through the page**

Run: `npm run dev`. Open `http://localhost:4321`. Verify:
- Hero renders with photo + headline + CTAs.
- Five program cards in the strip.
- Schedule grid shows 7 columns with correct chip colors.
- Coaches section shows the placeholder coach.
- About section has the wide photo + copy.
- Visit band: dark, with map, FB button, phone, and Facebook feed iframe.

- [ ] **Step 3: Build to confirm asset references**

Run: `npm run build`
Expected: build succeeds. If a referenced photo file is missing (e.g., `kids-card.jpg`), the error names the file. Add the missing file in `src/assets/photos/` and rebuild.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "Build homepage: hero, programs, schedule, coaches, about, visit"
```

---

## Task 13: Build the program detail dynamic route

**Files:**
- Create: `src/components/ProgramDetail.astro`
- Create: `src/pages/[slug].astro`

- [ ] **Step 1: `ProgramDetail.astro` — body of every program page**

```astro
---
import { Image } from 'astro:assets';
import type { Program } from '@/data/programs';
import { getCoach } from '@/data/coaches';
import { getProgram } from '@/data/programs';
import { site } from '@/data/site';
import ScheduleSnippet from './ScheduleSnippet.astro';
import CoachCard from './CoachCard.astro';
import FacebookFeed from './FacebookFeed.astro';

interface Props { program: Program; heroPhoto: ImageMetadata; coachPhoto: ImageMetadata }
const { program, heroPhoto, coachPhoto } = Astro.props;
const coach = getCoach(program.coachSlug)!;
const combined = program.combinedWith ? getProgram(program.combinedWith) : undefined;
---

<section class="bg-iron text-paper">
  <div class="relative">
    <Image src={heroPhoto} alt={program.name} class="w-full h-[40vh] min-h-[280px] object-cover opacity-50" />
    <div class="absolute inset-0 bg-gradient-to-t from-iron via-iron/40 to-transparent"></div>
    <div class="absolute inset-0 container-page flex flex-col justify-end pb-10">
      <p class="text-[11px] uppercase tracking-eyebrow text-blood font-bold">Program</p>
      <h1 class="font-display text-5xl md:text-6xl mt-2 leading-none">{program.name}</h1>
      <p class="mt-3 text-paper/85 max-w-prose">{program.tagline}</p>
    </div>
  </div>
</section>

<section class="container-page py-14 grid gap-10 lg:grid-cols-3">
  <div class="lg:col-span-2 space-y-10">
    <div>
      <p class="eyebrow">What it is</p>
      {program.whatItIs.map((para) => (
        <p class="mt-3 leading-relaxed max-w-prose">{para}</p>
      ))}
    </div>

    <div>
      <p class="eyebrow">Who it's for</p>
      <ul class="mt-3 space-y-2 max-w-prose">
        {program.whoItsFor.map((item) => (
          <li class="flex gap-2"><span class="text-blood font-bold">→</span><span>{item}</span></li>
        ))}
      </ul>
    </div>

    <div>
      <p class="eyebrow">What to expect — first day</p>
      <ul class="mt-3 space-y-2 max-w-prose">
        {program.firstDayChecklist.map((item) => (
          <li class="flex gap-2"><span class="text-blood font-bold">·</span><span>{item}</span></li>
        ))}
      </ul>
    </div>

    {combined && (
      <div class="bg-paper border border-iron/10 rounded-lg p-5">
        <p class="eyebrow">Combined class</p>
        <p class="mt-2 text-sm">{program.shortName} trains in the same session as <a class="text-blood font-bold hover:underline" href={`/${combined.slug}`}>{combined.shortName}</a> on Mondays and Fridays at 6:00 PM.</p>
      </div>
    )}
  </div>

  <aside class="space-y-6">
    <ScheduleSnippet programSlug={program.slug} />

    <div>
      <p class="eyebrow">Coach</p>
      <div class="mt-3"><CoachCard coach={coach} photo={coachPhoto} /></div>
    </div>

    <FacebookFeed variant="compact" />
  </aside>
</section>

<section class="bg-iron text-paper">
  <div class="container-page py-12 flex flex-wrap items-center gap-6 justify-between">
    <div>
      <p class="text-[11px] uppercase tracking-eyebrow text-blood font-bold">First class is FREE</p>
      <p class="font-display text-3xl mt-1">Just stop in.</p>
      <p class="text-paper/80 text-sm mt-1">{site.address.street} · {site.address.venueNote} · {site.address.city}, {site.address.state}</p>
    </div>
    <div class="flex flex-wrap gap-3">
      <a class="btn-primary" href={site.facebook} target="_blank" rel="noopener">DM us on Facebook</a>
      <a class="bg-paper text-iron font-bold text-sm rounded-md px-4 py-3" href={`tel:${site.phoneTel}`}>{site.phone}</a>
      <a class="border border-paper text-paper font-bold text-sm rounded-md px-4 py-3" href="/#visit">Map &amp; directions →</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: `src/pages/[slug].astro`**

```astro
---
import Layout from '@/components/Layout.astro';
import ProgramDetail from '@/components/ProgramDetail.astro';
import { programs, getProgram } from '@/data/programs';
import { getCoach } from '@/data/coaches';

export async function getStaticPaths() {
  return programs.map((program) => ({
    params: { slug: program.slug },
    props: { program },
  }));
}

const { program } = Astro.props;
const coach = getCoach(program.coachSlug)!;

const heroPhotos = import.meta.glob<{ default: ImageMetadata }>('@/assets/photos/*.jpg', { eager: true });
const heroEntry = Object.entries(heroPhotos).find(([k]) => k.endsWith('/' + program.heroPhotoFile));
if (!heroEntry) throw new Error(`Missing hero photo: ${program.heroPhotoFile}`);
const heroPhoto = heroEntry[1].default;

const coachEntry = Object.entries(heroPhotos).find(([k]) => k.endsWith('/' + coach.photoFile));
if (!coachEntry) throw new Error(`Missing coach photo: ${coach.photoFile}`);
const coachPhoto = coachEntry[1].default;
---

<Layout title={program.metaTitle} description={program.metaDescription} canonicalPath={`/${program.slug}`}>
  <ProgramDetail program={program} heroPhoto={heroPhoto} coachPhoto={coachPhoto} />
</Layout>
```

- [ ] **Step 3: Build and verify all five program URLs**

Run: `npm run build && npm run preview`. Visit each:
- http://localhost:4321/bjj-gi
- http://localhost:4321/bjj-nogi
- http://localhost:4321/kickboxing
- http://localhost:4321/kids-bjj
- http://localhost:4321/mma-fight-team

Confirm: hero photo, three body sections, sidebar with schedule + coach + Facebook, bottom CTA band. NoGi and Kickboxing pages each show the "Combined class" callout linking to the other.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProgramDetail.astro src/pages/[slug].astro
git commit -m "Add program detail dynamic route generating five program pages"
```

---

## Task 14: MMA fight team extras (fighters + recent results)

**Files:**
- Create: `src/data/fight-team.ts`
- Create: `src/data/__tests__/fight-team.test.ts`
- Modify: `src/components/ProgramDetail.astro`

- [ ] **Step 1: Tests for fight-team data shape**

Create `src/data/__tests__/fight-team.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { fighters, recentResults } from '../fight-team';

describe('fight team data', () => {
  it('exports a fighters array (may be empty)', () => {
    expect(Array.isArray(fighters)).toBe(true);
  });
  it('exports a recentResults array (may be empty)', () => {
    expect(Array.isArray(recentResults)).toBe(true);
  });
  it('every fighter has name and weightClass', () => {
    for (const f of fighters) {
      expect(f.name).toBeTruthy();
      expect(f.weightClass).toBeTruthy();
    }
  });
  it('every result has date and outcome', () => {
    for (const r of recentResults) {
      expect(r.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(['W', 'L', 'D', 'NC']).toContain(r.outcome);
    }
  });
});
```

- [ ] **Step 2: Implement `src/data/fight-team.ts`**

```ts
export interface Fighter {
  name: string;
  weightClass: string;
  record?: string;
  photoFile?: string;
}

export interface FightResult {
  date: string;          // YYYY-MM-DD
  fighterName: string;
  opponentName: string;
  promotion: string;
  outcome: 'W' | 'L' | 'D' | 'NC';
  method?: string;       // "TKO R2", "Submission (RNC)", "Decision"
}

// Empty until the gym sends data — sections render "coming soon" placeholders.
export const fighters: Fighter[] = [];
export const recentResults: FightResult[] = [];
```

- [ ] **Step 3: Modify `ProgramDetail.astro` to render the extras when slug is `mma-fight-team`**

Add this just before the closing of the body grid (after `<div class="lg:col-span-2 space-y-10">…</div>` block, still inside it). Replace the closing `</div>` of the col-span-2 with the snippet below — i.e., these two new sections render *only* on the MMA page.

```astro
---
// At the top of ProgramDetail.astro, alongside other imports:
import { fighters, recentResults } from '@/data/fight-team';
---
```

Inside the `lg:col-span-2 space-y-10` div, after the `What to expect` block and any combined-class callout, add:

```astro
{program.slug === 'mma-fight-team' && (
  <>
    <div>
      <p class="eyebrow">Fighters</p>
      {fighters.length === 0 ? (
        <p class="mt-3 text-iron/60 italic">Roster updates coming soon — talk to a coach to learn about current and prospective members.</p>
      ) : (
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          {fighters.map((f) => (
            <div class="bg-paper border border-iron/10 rounded p-4">
              <p class="font-bold">{f.name}</p>
              <p class="text-xs uppercase tracking-eyebrow text-blood font-bold mt-1">{f.weightClass}</p>
              {f.record && <p class="text-sm text-iron/70 mt-1">Record: {f.record}</p>}
            </div>
          ))}
        </div>
      )}
    </div>

    <div>
      <p class="eyebrow">Recent results</p>
      {recentResults.length === 0 ? (
        <p class="mt-3 text-iron/60 italic">Results coming soon. Follow our Facebook page for fight night announcements.</p>
      ) : (
        <ul class="mt-4 space-y-2">
          {recentResults.map((r) => (
            <li class="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm border-b border-iron/10 py-2">
              <span class="font-mono text-iron/60">{r.date}</span>
              <span class="font-bold">{r.fighterName}</span>
              <span class="text-iron/60">vs</span>
              <span>{r.opponentName}</span>
              <span class={`ml-auto font-bold ${r.outcome === 'W' ? 'text-blood' : r.outcome === 'L' ? 'text-iron/60' : ''}`}>{r.outcome}</span>
              {r.method && <span class="text-iron/60 text-xs basis-full">{r.promotion} · {r.method}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  </>
)}
```

- [ ] **Step 4: Run all checks**

Run: `npm test && npm run check && npm run build`
Expected: tests pass, types clean, build succeeds.

- [ ] **Step 5: Verify the MMA page shows the placeholders**

Run: `npm run preview`. Visit `http://localhost:4321/mma-fight-team`. Confirm "Fighters" and "Recent results" sections render with the "coming soon" italic copy.

- [ ] **Step 6: Commit**

```bash
git add src/data/fight-team.ts src/data/__tests__/fight-team.test.ts src/components/ProgramDetail.astro
git commit -m "Add fighters and recent results sections to MMA fight team page"
```

---

## Task 15: SEO polish — sitemap, robots, favicon

**Files:**
- Create: `public/robots.txt`
- Create: `public/favicon.svg`
- Verify: `astro.config.mjs` already has `sitemap()` integration

- [ ] **Step 1: `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://thelcbjj.com/sitemap-index.xml
```

- [ ] **Step 2: `public/favicon.svg`**

A minimal red-on-bone "LC" mark. Drop in this file:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#0E0E0E"/>
  <text x="32" y="44" text-anchor="middle"
        font-family="'Bebas Neue',Impact,sans-serif"
        font-size="38" font-weight="900" fill="#B3261E">LC</text>
</svg>
```

> **Note:** The implementer can later replace this with a derivative of the actual logo if the gym wants a richer favicon.

- [ ] **Step 3: Build and verify sitemap output**

Run: `npm run build`. Confirm `dist/sitemap-index.xml` and `dist/sitemap-0.xml` exist and list `/`, `/bjj-gi`, `/bjj-nogi`, `/kickboxing`, `/kids-bjj`, `/mma-fight-team`.

- [ ] **Step 4: Commit**

```bash
git add public/robots.txt public/favicon.svg
git commit -m "Add robots.txt and favicon"
```

---

## Task 16: E2E smoke tests with Playwright

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/e2e/home.spec.ts`
- Create: `tests/e2e/programs.spec.ts`
- Create: `tests/e2e/nav.spec.ts`

- [ ] **Step 1: Install Playwright browsers**

Run: `npx playwright install chromium`
Expected: Chromium browser installed.

- [ ] **Step 2: `playwright.config.ts`**

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

> **Note:** `npm run preview` requires a prior `npm run build`. The implementer should run `npm run build` before `npm run test:e2e` (or wire that up in CI).

- [ ] **Step 3: `tests/e2e/home.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test('homepage loads with hero, schedule, and visit sections', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/The LC/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Real training/i);

  // Five program cards
  await expect(page.locator('#programs a[href^="/"]')).toHaveCount(5);

  // Schedule grid has the six known classes (3 chip styles)
  await expect(page.locator('#schedule')).toBeVisible();
  await expect(page.locator('#schedule .bg-blood')).toHaveCount(2);   // Gi BJJ x2
  await expect(page.locator('#schedule .bg-iron')).toHaveCount(2);    // Combined x2
  await expect(page.locator('#schedule .bg-stone')).toHaveCount(2);   // Kids x2

  // Visit section + Facebook iframe
  await expect(page.locator('#visit')).toBeVisible();
  await expect(page.locator('#visit iframe[title*="Facebook"]')).toBeVisible();

  // JSON-LD present
  const ld = await page.locator('script[type="application/ld+json"]').textContent();
  expect(ld).toContain('SportsActivityLocation');
  expect(ld).toContain('Walnut Ridge');
});
```

- [ ] **Step 4: `tests/e2e/programs.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

const slugs = ['bjj-gi', 'bjj-nogi', 'kickboxing', 'kids-bjj', 'mma-fight-team'];

for (const slug of slugs) {
  test(`/${slug} renders with title, hero, sections, and CTA`, async ({ page }) => {
    const response = await page.goto(`/${slug}`);
    expect(response?.status()).toBe(200);

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText(/What it is/i)).toBeVisible();
    await expect(page.getByText(/Who it.s for/i)).toBeVisible();
    await expect(page.getByText(/First day|first day/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /First class is FREE/i }).first()).toBeVisible();
  });
}

test('NoGi page links to Kickboxing as combined-class partner', async ({ page }) => {
  await page.goto('/bjj-nogi');
  await expect(page.getByText(/Combined class/i)).toBeVisible();
  await expect(page.locator('a[href="/kickboxing"]')).toBeVisible();
});

test('MMA page shows fighters and results placeholders when data is empty', async ({ page }) => {
  await page.goto('/mma-fight-team');
  await expect(page.getByText(/Fighters/i)).toBeVisible();
  await expect(page.getByText(/Recent results/i)).toBeVisible();
});
```

- [ ] **Step 5: `tests/e2e/nav.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test('header CTA scrolls to schedule on homepage', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /First class is FREE/i }).first().click();
  await expect(page).toHaveURL(/#schedule$/);
});

test('clicking the logo from a program page returns to homepage', async ({ page }) => {
  await page.goto('/bjj-gi');
  await page.getByRole('link', { name: /The LC logo/i }).click();
  await expect(page).toHaveURL('http://localhost:4321/');
});

test('footer Facebook link points to the correct page', async ({ page }) => {
  await page.goto('/');
  const link = page.getByRole('link', { name: /^Facebook/i }).first();
  await expect(link).toHaveAttribute('href', 'https://www.facebook.com/TheLCFightTeam');
});
```

- [ ] **Step 6: Build and run E2E**

Run: `npm run build && npm run test:e2e`
Expected: all tests pass.

- [ ] **Step 7: Commit**

```bash
git add playwright.config.ts tests/e2e/
git commit -m "Add Playwright smoke tests for homepage, programs, and nav"
```

---

## Task 17: Vercel deployment + README

**Files:**
- Create: `README.md`
- Create: `vercel.json` (only if needed)

- [ ] **Step 1: `README.md`**

````markdown
# The LC — Website

Static marketing site for The LC, a Brazilian Jiu Jitsu and martial arts gym in Walnut Ridge, Arkansas.

Built with Astro + Tailwind. Deployed to Vercel.

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
```

## Common scripts

```bash
npm run dev        # Astro dev server with HMR
npm run build      # Production build to dist/
npm run preview    # Serve dist/ locally
npm run check      # Astro + TypeScript type check
npm test           # Vitest unit tests
npm run test:e2e   # Playwright smoke tests (requires `npm run build` first)
```

## Editing content

All editable content lives in `src/data/`:

- `site.ts` — address, phone, Facebook URL, business name.
- `programs.ts` — five program objects (BJJ Gi, NoGi, Kickboxing, Kids, MMA Team) with copy, photos, and SEO.
- `schedule.ts` — weekly class schedule. Chip color is set per entry (`gi`, `combined`, `kids`).
- `coaches.ts` — coach bios and credentials. Currently a single placeholder; replace with real data when bios arrive.
- `fight-team.ts` — fighters and recent results for the MMA team page. Both arrays start empty and render placeholder copy until populated.

Photos live in `src/assets/photos/`. Brand assets in `src/assets/brand/`.

## Deployment

Pushes to `main` deploy to production at `thelcbjj.com` via Vercel. All other branches generate preview URLs.

### Initial Vercel setup

1. Push this repository to GitHub.
2. In Vercel, **New Project** → import the repository.
3. Framework preset: **Astro** (auto-detected).
4. Add custom domain `thelcbjj.com` and `www.thelcbjj.com` in Project Settings → Domains. Vercel issues SSL automatically.
5. Update DNS at your registrar:
   - `A` record for `@` (apex) → `76.76.21.21`
   - `CNAME` record for `www` → `cname.vercel-dns.com`
6. Enable **Web Analytics** in the Vercel dashboard (free, cookieless).

## Conversion model

This site has no forms. Prospects either:
1. See the schedule and walk in (first class is free), or
2. Click through to the Facebook page to message the gym.

Schedule changes are posted on Facebook; the embedded Page Plugin on the homepage and program pages surfaces those posts automatically.
````

- [ ] **Step 2: Verify final build is clean**

Run: `npm test && npm run check && npm run build`
Expected: all green.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "Add README with editing guide and Vercel deployment instructions"
```

- [ ] **Step 4: Final smoke check**

Run: `npm run preview` and walk through:
- `/` — hero, programs, schedule with three chip colors, coaches, about, visit (map + Facebook feed)
- `/bjj-gi` — full program detail page
- `/bjj-nogi` — combined-class callout linking to `/kickboxing`
- `/kickboxing` — combined-class callout linking to `/bjj-nogi`
- `/kids-bjj` — parent-targeted copy
- `/mma-fight-team` — fighters + results placeholders visible

Stop the preview server.

---

## Self-Review

**Spec coverage:**
- §1 Purpose → Tasks 12, 13 (homepage + program pages, no forms).
- §3 Site facts → Task 4 (`site.ts`).
- §4 Schedule → Task 6 (`schedule.ts` with all six entries) + Task 11 step 1 (grid).
- §5 Visual direction → Task 2 (Tailwind tokens), Task 11 (components apply tokens).
- §6 Site map → Task 13 (`getStaticPaths` returns the five program slugs).
- §7 Homepage anatomy → Task 12 (sections in spec order).
- §8 Program page template → Task 13 (`ProgramDetail.astro`) + Task 14 (MMA extras).
- §9 Data architecture → Tasks 4–7 + 14 (all data lives in `src/data/`).
- §10 Facebook feed → Task 11 step 5 (`FacebookFeed.astro`, full + compact, with `<noscript>` fallback).
- §11 Tech stack → Task 1 (Astro), Task 2 (Tailwind), Task 9 (Astro `<Image />`), Task 15 (sitemap), Task 10 (JSON-LD wired into Layout).
- §12 Deployment → Task 17 (Vercel instructions in README).
- §13 SEO posture → Task 8 (JSON-LD), Task 10 (per-page meta), Task 15 (sitemap, robots).
- §14 Out of scope — nothing forbidden is built.
- §15 Open items — coach bios, per-program copy, fighter list, recent results, photo selection, hero treatment, alchemy mark usage. All have honest placeholders or are deferrals; the implementation ships in a state that is honest about what's draft.

**Placeholder scan:** No "TBD," no "TODO," no "implement later." Where the spec genuinely has open items (coach bios, fighter list), the data file ships an empty array or single placeholder coach and the UI renders an honest "coming soon" message. The plan flags these as content gaps to fill in, not technical gaps.

**Type/identifier consistency check:** `Program.slug`, `Program.coachSlug`, `ScheduleEntry.programSlugs`, `Coach.slug` — all consistent across Tasks 5–7 and the components in Tasks 11–14. `getProgram(slug)` and `getCoach(slug)` use the same lookup pattern. `chipStyle` uses the same `'gi' | 'combined' | 'kids'` union in `schedule.ts` (Task 6) and `ScheduleGrid.astro` (Task 11). The `combinedWith` field on Program is set on `bjj-nogi` and `kickboxing` (Task 5) and consumed in `ProgramDetail.astro` (Task 13).

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-26-the-lc-bjj-website.md`. Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
