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
