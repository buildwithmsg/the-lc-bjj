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
