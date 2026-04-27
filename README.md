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
