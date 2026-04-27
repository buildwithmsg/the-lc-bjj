import { dayOrder, schedule, type DayOfWeek, type ScheduleEntry } from '@/data/schedule';

export function groupByDay(entries: ScheduleEntry[] = schedule): Record<DayOfWeek, ScheduleEntry[]> {
  const out = {} as Record<DayOfWeek, ScheduleEntry[]>;
  for (const day of dayOrder) out[day] = [];
  for (const entry of entries) out[entry.day].push(entry);
  for (const day of dayOrder) out[day].sort((a, b) => a.startMinutes - b.startMinutes);
  return out;
}

export function getEntriesForProgram(slug: string, entries: ScheduleEntry[] = schedule): ScheduleEntry[] {
  return entries.filter((e) => e.programSlugs.includes(slug));
}
