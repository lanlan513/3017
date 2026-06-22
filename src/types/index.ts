export interface ClueRelation {
  targetClueId: string;
  description: string;
  type: 'leads_to' | 'contradicts' | 'supports' | 'related';
}

export interface TimelineNode {
  time: string;
  event: string;
}

export interface Clue {
  id: string;
  title: string;
  summary: string;
  detail: string;
  icon: string;
  timeline?: TimelineNode;
  relations: ClueRelation[];
}

export interface DeductionResult {
  isCorrect: boolean;
  correctSuspectId: string;
  correctSuspectName: string;
  explanation: string;
  keyEvidence: string[];
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
  culpritId: string;
  solution: {
    explanation: string;
    keyEvidence: string[];
  };
}

export interface DeductionLog {
  id: string;
  timestamp: Date;
  type: 'clue_view' | 'suspect_select' | 'note';
  content: string;
  clueId?: string;
  suspectId?: string;
}
