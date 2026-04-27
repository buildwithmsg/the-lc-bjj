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
