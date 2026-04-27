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
    name: 'Professor Tommy Walker',
    photoFile: 'coach-placeholder.jpg',
    bio: "Owner, head BJJ instructor, and MMA coach at The LC. Tommy started training Brazilian Jiu Jitsu in 2005 and earned his black belt under Professor Brian Davis. He's a national grappling champion in the Expert division (brown and black belts), competes regularly at high-level tournaments around the country, and built the fight team that competes under The LC banner.",
    credentials: ['BJJ Black Belt', 'National Grappling Champion', 'MMA Coach'],
    isHead: true,
  },
];

export function getCoach(slug: string): Coach | undefined {
  return coaches.find((c) => c.slug === slug);
}
