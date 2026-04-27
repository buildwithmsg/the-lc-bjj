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
