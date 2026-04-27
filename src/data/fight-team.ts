export interface Fighter {
  name: string;
  weightClass: string;
  record?: string;
  photoFile?: string;
}

export interface FightResult {
  date: string;          // YYYY-MM-DD
  fighterName: string;
  opponentName: string;
  promotion: string;
  outcome: 'W' | 'L' | 'D' | 'NC';
  method?: string;
}

// Empty until the gym sends data — sections render "coming soon" placeholders.
export const fighters: Fighter[] = [];
export const recentResults: FightResult[] = [];
