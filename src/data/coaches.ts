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
    name: 'Head Coach',
    photoFile: 'coach-placeholder.jpg',
    bio: 'Bio coming soon — stop in and meet the coach in person.',
    credentials: [],
    isHead: true,
  },
];

export function getCoach(slug: string): Coach | undefined {
  return coaches.find((c) => c.slug === slug);
}
