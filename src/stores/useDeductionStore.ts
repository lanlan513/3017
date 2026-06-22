import { create } from 'zustand';
import type { DeductionLog } from '../types';

interface DeductionState {
  caseId: string | null;
  expandedClues: string[];
  selectedSuspectId: string | null;
  logs: DeductionLog[];
  
  setCase: (caseId: string) => void;
  toggleClue: (clueId: string, clueTitle: string) => void;
  selectSuspect: (suspectId: string, suspectName: string) => void;
  resetDeduction: () => void;
}

export const useDeductionStore = create<DeductionState>((set, get) => ({
  caseId: null,
  expandedClues: [],
  selectedSuspectId: null,
  logs: [],

  setCase: (caseId) => {
    if (get().caseId !== caseId) {
      set({
        caseId,
        expandedClues: [],
        selectedSuspectId: null,
        logs: [{
          id: `log-${Date.now()}`,
          timestamp: new Date(),
          type: 'note',
          content: '开始调查新案件...',
        }],
      });
    }
  },

  toggleClue: (clueId, clueTitle) => {
    const { expandedClues, logs } = get();
    const isExpanded = expandedClues.includes(clueId);
    
    if (!isExpanded) {
      const newLog: DeductionLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date(),
        type: 'clue_view',
        content: `查看了线索「${clueTitle}」`,
        clueId,
      };
      set({
        expandedClues: [...expandedClues, clueId],
        logs: [...logs, newLog],
      });
    } else {
      set({
        expandedClues: expandedClues.filter(id => id !== clueId),
      });
    }
  },

  selectSuspect: (suspectId, suspectName) => {
    const { selectedSuspectId, logs } = get();
    
    if (selectedSuspectId === suspectId) {
      const newLog: DeductionLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date(),
        type: 'note',
        content: `取消对嫌疑人「${suspectName}」的锁定`,
        suspectId,
      };
      set({
        selectedSuspectId: null,
        logs: [...logs, newLog],
      });
    } else {
      const newLog: DeductionLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date(),
        type: 'suspect_select',
        content: `将嫌疑人锁定为「${suspectName}」`,
        suspectId,
      };
      set({
        selectedSuspectId: suspectId,
        logs: [...logs, newLog],
      });
    }
  },

  resetDeduction: () => {
    set({
      expandedClues: [],
      selectedSuspectId: null,
      logs: [{
        id: `log-${Date.now()}`,
        timestamp: new Date(),
        type: 'note',
        content: '重新开始调查...',
      }],
    });
  },
}));
