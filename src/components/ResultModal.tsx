import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Skull, Award, AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDeductionStore } from '../stores/useDeductionStore';

export const ResultModal = () => {
  const { deductionResult, showResultModal, closeResultModal, resetDeduction } = useDeductionStore();

  if (!deductionResult) return null;

  const handleReset = () => {
    closeResultModal();
    resetDeduction();
  };

  return (
    <AnimatePresence>
      {showResultModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-ink-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeResultModal}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-lg mx-auto"
          >
            <div className="relative bg-ink-800 rounded-sm border border-ink-600 overflow-hidden shadow-2xl">
              <div 
                className={`h-2 ${
                  deductionResult.isCorrect ? 'bg-moss-500' : 'bg-blood-500'
                }`}
              />
              
              <button
                onClick={closeResultModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ink-700 hover:bg-ink-600 flex items-center justify-center text-parchment-400 hover:text-parchment-200 transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-6">
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
                    className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                      deductionResult.isCorrect 
                        ? 'bg-moss-500/20 text-moss-400' 
                        : 'bg-blood-500/20 text-blood-400'
                    }`}
                  >
                    {deductionResult.isCorrect ? (
                      <Trophy className="w-10 h-10" />
                    ) : (
                      <Skull className="w-10 h-10" />
                    )}
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`font-display text-3xl font-bold mb-2 ${
                      deductionResult.isCorrect ? 'text-moss-400' : 'text-blood-400'
                    }`}
                  >
                    {deductionResult.isCorrect ? '推理正确！' : '推理错误'}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-parchment-400"
                  >
                    {deductionResult.isCorrect 
                      ? '恭喜你找到了真正的凶手！' 
                      : '很遗憾，真凶另有其人...'}
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-ink-700/50 rounded-sm p-4 mb-4 border border-ink-600"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Award className={`w-4 h-4 ${deductionResult.isCorrect ? 'text-moss-400' : 'text-blood-400'}`} />
                    <span className="text-sm font-medium text-parchment-300">
                      真正的凶手
                    </span>
                  </div>
                  <p className={`font-display text-xl font-bold ${
                    deductionResult.isCorrect ? 'text-moss-300' : 'text-blood-300'
                  }`}>
                    {deductionResult.correctSuspectName}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-parchment-400" />
                    <span className="text-sm font-medium text-parchment-300">
                      案件真相
                    </span>
                  </div>
                  <p className="text-parchment-300/80 text-sm leading-relaxed">
                    {deductionResult.explanation}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mb-6"
                >
                  <div className="text-xs font-medium text-parchment-400 mb-2 uppercase tracking-wider">
                    关键证据
                  </div>
                  <ul className="space-y-2">
                    {deductionResult.keyEvidence.map((evidence, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + idx * 0.1 }}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                          deductionResult.isCorrect 
                            ? 'bg-moss-500/20 text-moss-400' 
                            : 'bg-blood-500/20 text-blood-400'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="text-parchment-300/80">
                          {evidence}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex gap-3"
                >
                  <button
                    onClick={handleReset}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-ink-700 hover:bg-ink-600 text-parchment-200 rounded-sm transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>重新调查</span>
                  </button>
                  <Link
                    to="/"
                    onClick={closeResultModal}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-blood-500 hover:bg-blood-600 text-white rounded-sm transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    <span>返回大厅</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
