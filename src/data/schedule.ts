export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export type ChipStyle = 'gi' | 'combined' | 'kids';

export interface ScheduleEntry {
  day: DayOfWeek;
  startTime: string;
  startMinutes: number;
  durationMinutes: number;
  label: string;
  chipStyle: ChipStyle;
  programSlugs: string[];
}

export const dayOrder: DayOfWeek[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export const dayLabel: Record<DayOfWeek, string> = {
  mon: 'Mon',
  tue: 'Tue',
  wed: 'Wed',
  thu: 'Thu',
  fri: 'Fri',
  sat: 'Sat',
  sun: 'Sun',
};

export const schedule: ScheduleEntry[] = [
  { day: 'mon', startTime: '5:00 PM', startMinutes: 17 * 60, durationMinutes: 60, label: 'Kids BJJ',                chipStyle: 'kids',     programSlugs: ['kids-bjj'] },
  { day: 'mon', startTime: '6:00 PM', startMinutes: 18 * 60, durationMinutes: 60, label: 'NoGi BJJ + Kickboxing',   chipStyle: 'combined', programSlugs: ['bjj-nogi', 'kickboxing'] },
  { day: 'tue', startTime: '12:00 PM', startMinutes: 12 * 60, durationMinutes: 60, label: 'Gi BJJ',                  chipStyle: 'gi',       programSlugs: ['bjj-gi'] },
  { day: 'fri', startTime: '5:00 PM', startMinutes: 17 * 60, durationMinutes: 60, label: 'Kids BJJ',                chipStyle: 'kids',     programSlugs: ['kids-bjj'] },
  { day: 'fri', startTime: '6:00 PM', startMinutes: 18 * 60, durationMinutes: 60, label: 'NoGi BJJ + Kickboxing',   chipStyle: 'combined', programSlugs: ['bjj-nogi', 'kickboxing'] },
  { day: 'sat', startTime: '12:00 PM', startMinutes: 12 * 60, durationMinutes: 60, label: 'Gi BJJ',                  chipStyle: 'gi',       programSlugs: ['bjj-gi'] },
];
