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
    bio: "Owner, head BJJ instructor, and MMA coach at The LC. Tommy earned his black belt in Brazilian Jiu Jitsu under Professor Brian Davis at Gracie Barra Arkansas, where he has trained since 2005. He's a national grappling champion in the Expert division (brown and black belts), competes regularly at high-level tournaments around the country, and built the fight team that competes under The LC banner.",
    credentials: ['BJJ Black Belt', 'Gracie Barra Arkansas', 'National Grappling Champion'],
    isHead: true,
  },
];

export function getCoach(slug: string): Coach | undefined {
  return coaches.find((c) => c.slug === slug);
}
