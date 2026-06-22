import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, GitBranch } from 'lucide-react';
import { useDeductionStore } from '../stores/useDeductionStore';
import { DeductionTree } from './DeductionTree';
import type { Clue } from '../types';

interface ClueCardProps {
  clue: Clue;
  index: number;
  allClues: Clue[];
}

const iconMap: Record<string, string> = {
  watch: '⏱️',
  flame: '🔥',
  key: '🔑',
  mail: '✉️',
  gem: '💎',
  footprints: '👣',
  flower: '🌹',
  book: '📖',
  'door-open': '🚪',
  square: '🪟',
  spade: '🃏',
  briefcase: '🧳',
};

export const ClueCard = ({ clue, index, allClues }: ClueCardProps) => {
  const { expandedClues, toggleClue, activeTreeClueId, setActiveTreeClue } = useDeductionStore();
  const isExpanded = expandedClues.includes(clue.id);
  const isTreeActive = activeTreeClueId === clue.id;

  const handleToggle = () => {
    toggleClue(clue.id, clue.title);
    if (!isExpanded) {
      setActiveTreeClue(clue.id);
    } else {
      setActiveTreeClue(null);
    }
  };

  const handleClueClick = (clueId: string) => {
    const targetClue = allClues.find(c => c.id === clueId);
    if (targetClue) {
      if (!expandedClues.includes(clueId)) {
        toggleClue(clueId, targetClue.title);
      }
      setActiveTreeClue(clueId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.4 }}
      className="relative"
    >
      <div 
        onClick={handleToggle}
        className={`relative bg-parchment-100 border border-parchment-300 rounded-sm cursor-pointer overflow-hidden group transition-all duration-300 ${
          isTreeActive ? 'ring-2 ring-blood-500' : ''
        }`}
      >
        <div className="absolute inset-0 bg-parchment-texture pointer-events-none opacity-40" />
        
        <div className="relative z-10 p-5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${
                isExpanded 
                  ? 'bg-blood-500 text-white shadow-stamp' 
                  : 'bg-parchment-200 group-hover:bg-parchment-300'
              }`}>
                {iconMap[clue.icon] || '🔍'}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-typewriter text-blood-600 uppercase tracking-wider">
                  线索 #{String(index + 1).padStart(2, '0')}
                </span>
                {isExpanded && (
                  <span className="text-xs bg-moss-500 text-parchment-50 px-2 py-0.5 rounded-sm">
                    已查看
                  </span>
                )}
                {clue.relations && clue.relations.length > 0 && (
                  <span className="text-xs bg-blood-500/20 text-blood-600 px-2 py-0.5 rounded-sm flex items-center gap-1">
                    <GitBranch className="w-3 h-3" />
                    关联 {clue.relations.length}
                  </span>
                )}
              </div>
              
              <h4 className="font-display text-lg font-bold text-ink-700 mb-2">
                {clue.title}
              </h4>
              
              <p className="text-ink-500 text-sm">
                {clue.summary}
              </p>
            </div>

            <div className="flex-shrink-0">
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 rounded-full bg-parchment-200 flex items-center justify-center group-hover:bg-parchment-300 transition-colors"
              >
                <ChevronDown className="w-4 h-4 text-ink-500" />
              </motion.div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5">
                <div className="h-px bg-gradient-to-r from-transparent via-parchment-400 to-transparent mb-4" />
                
                <div className="bg-parchment-50/80 border-l-4 border-blood-500 p-4 rounded-r-sm mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Search className="w-4 h-4 text-blood-500" />
                    <span className="text-xs font-typewriter text-ink-600 uppercase">
                      详细调查
                    </span>
                  </div>
                  <p className="font-typewriter text-ink-700 leading-relaxed text-sm">
                    {clue.detail}
                  </p>
                </div>

                {isTreeActive && (
                  <DeductionTree
                    currentClue={clue}
                    allClues={allClues}
                    onClueClick={handleClueClick}
                    activeClueId={activeTreeClueId || ''}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-parchment-100 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>

      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-parchment-400 pointer-events-none" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-parchment-400 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-parchment-400 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-parchment-400 pointer-events-none" />
    </motion.div>
  );
};
