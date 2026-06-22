export interface Clue {
  id: string;
  title: string;
  summary: string;
  detail: string;
  icon: string;
}

export interface Suspect {
  id: string;
  name: string;
  title: string;
  description: string;
  avatar: string;
}

export interface Case {
  id: string;
  title: string;
  time: string;
  location: string;
  description: string;
  clues: Clue[];
  suspects: Suspect[];
}

export interface DeductionLog {
  id: string;
  timestamp: Date;
  type: 'clue_view' | 'suspect_select' | 'note';
  content: string;
  clueId?: string;
  suspectId?: string;
}
