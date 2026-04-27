import { describe, it, expect } from 'vitest';
import { groupByDay, getEntriesForProgram } from '../schedule-utils';
import { schedule } from '@/data/schedule';

describe('groupByDay', () => {
  it('keys every day of the week, even empty ones', () => {
    const grouped = groupByDay(schedule);
    expect(Object.keys(grouped).sort()).toEqual(['fri', 'mon', 'sat', 'sun', 'thu', 'tue', 'wed']);
  });

  it('returns empty arrays for days with no classes', () => {
    const grouped = groupByDay(schedule);
    expect(grouped.tue).toEqual([]);
    expect(grouped.wed).toEqual([]);
    expect(grouped.thu).toEqual([]);
    expect(grouped.sun).toEqual([]);
  });

  it('sorts entries within a day by start time', () => {
    const grouped = groupByDay(schedule);
    const monTimes = grouped.mon.map((e) => e.startMinutes);
    expect(monTimes).toEqual([...monTimes].sort((a, b) => a - b));
  });
});

describe('getEntriesForProgram', () => {
  it('returns all entries that include the given program slug', () => {
    expect(getEntriesForProgram('bjj-gi')).toHaveLength(1);
    expect(getEntriesForProgram('kids-bjj')).toHaveLength(2);
    expect(getEntriesForProgram('bjj-nogi')).toHaveLength(2);
    expect(getEntriesForProgram('kickboxing')).toHaveLength(2);
  });

  it('returns empty for an unknown slug', () => {
    expect(getEntriesForProgram('does-not-exist')).toEqual([]);
  });
});
