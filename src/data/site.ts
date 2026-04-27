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
