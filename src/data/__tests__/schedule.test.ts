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
    expect(combined).toHaveLength(2);
    for (const entry of combined) {
      expect(entry.programSlugs.sort()).toEqual(['bjj-nogi', 'kickboxing']);
    }
  });

  it('uses correct chip styles per the spec (gi/combined/kids)', () => {
    const styles = new Set(schedule.map((e) => e.chipStyle));
    expect(styles).toEqual(new Set(['gi', 'combined', 'kids']));
  });
});
