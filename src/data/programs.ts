export interface Program {
  slug: string;
  name: string;
  shortName: string;
  cardLabel: string;
  tagline: string;
  heroPhotoFile: string;
  cardPhotoFile: string;
  whatItIs: string[];
  whoItsFor: string[];
  firstDayChecklist: string[];
  coachSlug: string;
  assistCoachSlugs?: string[];
  combinedWith?: string;
  metaTitle: string;
  metaDescription: string;
}

export const programs: Program[] = [
  {
    slug: 'bjj-gi',
    name: 'Brazilian Jiu Jitsu — Gi',
    shortName: 'Gi BJJ',
    cardLabel: 'GI BJJ',
    tagline: 'The classic art of grips, sweeps, and submissions. Beginners welcome.',
    heroPhotoFile: 'kids-class.jpg',
    cardPhotoFile: 'kids-card.jpg',
    whatItIs: [
      'Brazilian Jiu Jitsu in the gi — the traditional uniform — is the foundation of modern grappling. You learn how to control, sweep, and submit a resisting opponent using leverage and technique, not size or strength.',
      'A typical class is a warm-up, a focused technical lesson, and live rolling (sparring) with partners at your level. New students train at their own pace.',
    ],
    whoItsFor: [
      'Total beginners — no experience needed.',
      'Experienced grapplers looking for honest training partners.',
      'Anyone who has watched UFC and wondered "how do they do that?"',
    ],
    firstDayChecklist: [
      'Wear comfortable athletic clothes — we have loaner gis if you need one.',
      'Show up 10 minutes early so you can meet the coach.',
      'Bring water. Drink it.',
      'Trim your fingernails and toenails — your training partners will thank you.',
    ],
    coachSlug: 'tommy-walker',
    assistCoachSlugs: ['april-nelms', 'shayne-goforth'],
    metaTitle: 'Gi BJJ in Walnut Ridge, AR — The LC',
    metaDescription: 'Traditional Brazilian Jiu Jitsu training in the gi. First class is free. Walnut Ridge, AR.',
  },
  {
    slug: 'bjj-nogi',
    name: 'Brazilian Jiu Jitsu — NoGi',
    shortName: 'NoGi BJJ',
    cardLabel: 'NOGI BJJ',
    tagline: 'Grappling without the gi — faster, sweatier, closer to MMA.',
    heroPhotoFile: 'nogi-class.jpg',
    cardPhotoFile: 'nogi-card.jpg',
    whatItIs: [
      'NoGi BJJ trades the traditional uniform for shorts and a rashguard. Without sleeves and lapels to grip, the pace is faster and the techniques shift toward underhooks, body locks, and leg entanglements.',
      'At The LC, NoGi BJJ trains in the same class as Kickboxing on Monday and Friday at 6:00 PM. You\'ll get exposed to both grappling and striking concepts in one session.',
    ],
    whoItsFor: [
      'Beginners — no grappling experience needed.',
      'Gi BJJ practitioners who want to round out their game.',
      'Anyone interested in MMA or competitive grappling.',
    ],
    firstDayChecklist: [
      'Wear athletic shorts (no pockets or zippers) and a rashguard or fitted t-shirt.',
      'Show up 10 minutes early.',
      'Bring water.',
      'Trim fingernails and toenails.',
    ],
    coachSlug: 'tommy-walker',
    assistCoachSlugs: ['april-nelms', 'shayne-goforth'],
    combinedWith: 'kickboxing',
    metaTitle: 'NoGi BJJ in Walnut Ridge, AR — The LC',
    metaDescription: 'NoGi grappling combined with kickboxing — Mondays and Fridays at 6 PM. First class is free.',
  },
  {
    slug: 'kickboxing',
    name: 'Kickboxing',
    shortName: 'Kickboxing',
    cardLabel: 'KICKBOXING',
    tagline: 'Stand-up striking — punches, kicks, knees, elbows.',
    heroPhotoFile: 'kickboxing-class.jpg',
    cardPhotoFile: 'kickboxing-card.jpg',
    whatItIs: [
      'Kickboxing is the stand-up striking half of mixed martial arts. You learn how to throw punches, kicks, knees, and elbows — and how to defend against them — through pad work, partner drills, and controlled sparring.',
      'At The LC, Kickboxing trains alongside NoGi BJJ on Monday and Friday at 6:00 PM, so a single session covers both grappling and striking.',
    ],
    whoItsFor: [
      'Beginners — no martial arts background required.',
      'People who want a striking workout that\'s actually a martial art.',
      'BJJ practitioners who want stand-up tools.',
    ],
    firstDayChecklist: [
      'Wear athletic shorts and a t-shirt or rashguard.',
      'Bring boxing gloves and shin guards if you have them — we have loaners if not.',
      'Show up 10 minutes early.',
      'Bring water.',
    ],
    coachSlug: 'tommy-walker',
    combinedWith: 'bjj-nogi',
    metaTitle: 'Kickboxing in Walnut Ridge, AR — The LC',
    metaDescription: 'Stand-up striking — punches, kicks, knees, elbows. Combined with NoGi BJJ. First class is free.',
  },
  {
    slug: 'kids-bjj',
    name: 'Kids Brazilian Jiu Jitsu',
    shortName: 'Kids BJJ',
    cardLabel: 'KIDS BJJ',
    tagline: 'Confidence, discipline, and a healthy outlet — for kids who need to move.',
    heroPhotoFile: 'kids-class.jpg',
    cardPhotoFile: 'kids-card.jpg',
    whatItIs: [
      'Kids BJJ at The LC teaches kids how to move, how to fall safely, how to control themselves, and how to control someone else without hurting them. It builds confidence, focus, and respect.',
      'Classes are structured: warm-up games, a technique lesson, and partnered drills. Coaches keep a close eye on every kid, every minute.',
    ],
    whoItsFor: [
      'Kids of all experience levels — no prior experience needed.',
      'Parents looking for a martial arts program that focuses on real skills, not just discipline.',
      'Kids with extra energy who need a healthy place to spend it.',
    ],
    firstDayChecklist: [
      'Athletic clothes — gym shorts and a t-shirt work great.',
      'Water bottle.',
      'Plan to arrive 10 minutes early — parents are welcome to sit and watch the entire class.',
      'No experience expected. We start at the beginning.',
    ],
    coachSlug: 'chase-mann',
    metaTitle: 'Kids BJJ in Walnut Ridge, AR — The LC',
    metaDescription: 'Brazilian Jiu Jitsu for kids. Confidence, discipline, real skills. First class is free.',
  },
  {
    slug: 'mma-fight-team',
    name: 'MMA Fight Team',
    shortName: 'MMA Team',
    cardLabel: 'MMA TEAM',
    tagline: 'Compete out of The LC. By tryout — talk to a coach.',
    heroPhotoFile: 'mma-cage.jpg',
    cardPhotoFile: 'mma-card.jpg',
    whatItIs: [
      'The LC fight team competes in regional MMA promotions. Members train with the head coach on a structured camp schedule and get fight-specific preparation: weight cuts, game-planning, sparring partners.',
      'Membership is by tryout. If you have prior martial arts experience and want to compete, talk to a coach after a regular class.',
    ],
    whoItsFor: [
      'Athletes with prior martial arts experience.',
      'Competitors serious about earning a record, not just training.',
    ],
    firstDayChecklist: [
      'Come to a regular adult class first.',
      'Talk to the head coach about your background and goals.',
      'Be ready to show up consistently — fight camps are six to eight weeks of disciplined training.',
    ],
    coachSlug: 'tommy-walker',
    metaTitle: 'MMA Fight Team — The LC, Walnut Ridge AR',
    metaDescription: 'Regional MMA fight team based in Walnut Ridge, Arkansas. Tryouts available — talk to a coach.',
  },
];

export const programSlugs = programs.map((p) => p.slug);

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}
