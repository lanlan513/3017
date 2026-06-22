import { create } from 'zustand';
import type { DeductionLog, DeductionResult } from '../types';
import { getCaseById } from '../data/cases';

interface DeductionState {
  caseId: string | null;
  expandedClues: string[];
  selectedSuspectId: string | null;
  logs: DeductionLog[];
  deductionResult: DeductionResult | null;
  showResultModal: boolean;
  activeTreeClueId: string | null;
  
  setCase: (caseId: string) => void;
  toggleClue: (clueId: string, clueTitle: string) => void;
  selectSuspect: (suspectId: string, suspectName: string) => void;
  setActiveTreeClue: (clueId: string | null) => void;
  submitDeduction: () => void;
  closeResultModal: () => void;
  resetDeduction: () => void;
}

export const useDeductionStore = create<DeductionState>((set, get) => ({
  caseId: null,
  expandedClues: [],
  selectedSuspectId: null,
  logs: [],
  deductionResult: null,
  showResultModal: false,
  activeTreeClueId: null,

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
        deductionResult: null,
        showResultModal: false,
        activeTreeClueId: null,
      });
    }
  },

  setActiveTreeClue: (clueId) => {
    set({ activeTreeClueId: clueId });
  },

  submitDeduction: () => {
    const { caseId, selectedSuspectId, logs } = get();
    if (!caseId || !selectedSuspectId) return;

    const caseData = getCaseById(caseId);
    if (!caseData) return;

    const isCorrect = selectedSuspectId === caseData.culpritId;
    const correctSuspect = caseData.suspects.find(s => s.id === caseData.culpritId);
    
    const result: DeductionResult = {
      isCorrect,
      correctSuspectId: caseData.culpritId,
      correctSuspectName: correctSuspect?.name || '',
      explanation: caseData.solution.explanation,
      keyEvidence: caseData.solution.keyEvidence,
    };

    const newLog: DeductionLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date(),
      type: 'note',
      content: isCorrect ? '🎉 推理正确！案件已侦破' : '❌ 推理错误，真凶另有其人',
    };

    set({
      deductionResult: result,
      showResultModal: true,
      logs: [...logs, newLog],
    });
  },

  closeResultModal: () => {
    set({ showResultModal: false });
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
      deductionResult: null,
      showResultModal: false,
      activeTreeClueId: null,
    });
  },
}));
