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
