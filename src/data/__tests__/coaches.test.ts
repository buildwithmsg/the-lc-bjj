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
