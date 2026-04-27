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
    slug: 'tommy-walker',
    name: 'Professor Tommy Walker',
    photoFile: 'coach-tommy-walker.jpg',
    bio: "Owner, head BJJ instructor, and MMA coach at The LC. Tommy started training Brazilian Jiu Jitsu in 2005 and earned his black belt under Professor Brian Davis in 2014. He's a national and world grappling champion in the Expert division (brown and black belts), competes regularly at high-level tournaments around the country, and built the fight team that competes under The LC banner.",
    credentials: ['BJJ Black Belt', 'National & World Champion', 'MMA Coach'],
    isHead: true,
  },
  {
    slug: 'chase-mann',
    name: 'Coach Chase Mann',
    photoFile: 'coach-chase-mann.jpg',
    bio: 'Professional MMA fighter currently competing for ONE Championship. An Arkansas native, Chase began training at The LC at age 21 and earned his Brazilian Jiu Jitsu brown belt from Professor Tommy Walker in 2024. As head of the Kids BJJ program, he focuses on helping younger students build confidence and resilience through martial arts — teaching the same mental toughness and discipline that fueled his own journey into professional athletics.',
    credentials: ['Pro MMA Fighter', 'BJJ Brown Belt', 'Kids BJJ Coach'],
    isHead: false,
  },
  {
    slug: 'april-nelms',
    name: 'Coach April Nelms',
    photoFile: 'coach-april-nelms.jpg',
    bio: 'Brazilian Jiu Jitsu black belt under Professor Tommy Walker (2018) and a multiple-time national and world champion in BJJ and submission grappling. April assists with both Gi and NoGi classes at The LC, bringing championship-level technique and a competitive mindset to students at every skill level.',
    credentials: ['BJJ Black Belt', 'World & National Champion'],
    isHead: false,
  },
  {
    slug: 'shayne-goforth',
    name: 'Coach Shayne Goforth',
    photoFile: 'coach-shayne-goforth.jpg',
    bio: "Brazilian Jiu Jitsu black belt under Professor Tommy Walker (2022) and one of the region's most prolific competitors — a national champion and world medalist who has competed and placed at every belt level. Shayne brings his tournament experience to both Gi and NoGi classes, focused on translating technical drills into high-pressure performance.",
    credentials: ['BJJ Black Belt', 'National Champion', 'World Medalist'],
    isHead: false,
  },
];

export function getCoach(slug: string): Coach | undefined {
  return coaches.find((c) => c.slug === slug);
}
