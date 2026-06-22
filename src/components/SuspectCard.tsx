import { motion } from 'framer-motion';
import { useDeductionStore } from '../stores/useDeductionStore';
import type { Suspect } from '../types';

interface SuspectCardProps {
  suspect: Suspect;
  index: number;
}

export const SuspectCard = ({ suspect, index }: SuspectCardProps) => {
  const { selectedSuspectId, selectSuspect } = useDeductionStore();
  const isSelected = selectedSuspectId === suspect.id;

  const handleSelect = () => {
    selectSuspect(suspect.id, suspect.name);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={handleSelect}
      className={`relative cursor-pointer rounded-sm overflow-hidden transition-all duration-300 ${
        isSelected ? 'ring-2 ring-blood-500' : ''
      }`}
    >
      <div className={`relative bg-parchment-100 border border-parchment-300 p-5 transition-colors ${
        isSelected ? 'bg-parchment-200' : 'hover:bg-parchment-150'
      }`}>
        <div className="absolute inset-0 bg-parchment-texture pointer-events-none opacity-30" />
        
        <div className="relative z-10">
          <div className="flex items-start gap-4">
            <div className="relative flex-shrink-0">
              <div className={`w-16 h-16 rounded-full bg-parchment-200 border-2 ${
                isSelected ? 'border-blood-500' : 'border-parchment-400'
              } flex items-center justify-center text-3xl shadow-md transition-colors`}>
                {suspect.avatar}
              </div>
              
              {isSelected && (
                <motion.div
                  initial={{ scale: 0, rotate: -45, opacity: 0 }}
                  animate={{ scale: 1, rotate: -12, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="absolute -top-1 -right-1 w-8 h-8 bg-blood-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-stamp"
                >
                  ✓
                </motion.div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-display text-lg font-bold text-ink-700 mb-1">
                {suspect.name}
              </h4>
              <p className="text-blood-600 text-sm font-medium mb-2">
                {suspect.title}
              </p>
              <p className="text-ink-500 text-sm line-clamp-3">
                {suspect.description}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-parchment-300/50">
            <button
              className={`w-full py-2 text-sm font-medium rounded-sm transition-all duration-300 ${
                isSelected
                  ? 'bg-blood-500 text-white shadow-leather'
                  : 'bg-ink-700 text-parchment-100 hover:bg-ink-600'
              }`}
            >
              {isSelected ? '🔴 已锁定为嫌疑人' + '—' + '点击取消' : '🎯 锁定为嫌疑人'}
            </button>
          </div>
        </div>

        {isSelected && (
          <motion.div
            initial={{ scale: 3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute top-2 right-2 pointer-events-none"
          >
            <div className="w-20 h-20 rounded-full border-4 border-blood-500 opacity-20 animate-pulse" />
          </motion.div>
        )}
      </div>

      <div className={`absolute bottom-0 left-0 right-0 h-1 transition-colors ${
        isSelected ? 'bg-blood-500' : 'bg-parchment-400'
      }`} />
    </motion.div>
  );
};
