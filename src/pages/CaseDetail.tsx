import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileSearch, Users } from 'lucide-react';
import { CaseHeader } from '../components/CaseHeader';
import { ClueCard } from '../components/ClueCard';
import { SuspectCard } from '../components/SuspectCard';
import { DeductionLogPanel } from '../components/DeductionLogPanel';
import { getCaseById } from '../data/cases';
import { useDeductionStore } from '../stores/useDeductionStore';

const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const caseData = id ? getCaseById(id) : undefined;
  const { setCase } = useDeductionStore();

  useEffect(() => {
    if (id) {
      setCase(id);
    }
  }, [id, setCase]);

  if (!caseData) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-ink-700">
      <CaseHeader caseData={caseData} />

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-moss-500/20 flex items-center justify-center">
                  <FileSearch className="w-5 h-5 text-moss-400" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-parchment-200">
                    线索调查
                  </h2>
                  <p className="text-parchment-400/60 text-sm">
                    点击线索卡片查看详细信息
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {caseData.clues.map((clue, index) => (
                  <ClueCard key={clue.id} clue={clue} index={index} />
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blood-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blood-400" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-parchment-200">
                    嫌疑人
                  </h2>
                  <p className="text-parchment-400/60 text-sm">
                    仔细斟酌，选择你认为的犯人
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseData.suspects.map((suspect, index) => (
                  <SuspectCard 
                    key={suspect.id} 
                    suspect={suspect} 
                    index={index} 
                  />
                ))}
              </div>
            </motion.section>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="sticky top-8"
            >
              <DeductionLogPanel />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="mt-6 p-5 bg-parchment-100/5 rounded-sm border border-parchment-100/10"
              >
                <h4 className="font-display text-parchment-200 font-semibold mb-3 flex items-center gap-2">
                  <span>📜</span>
                  侦探笔记
                </h4>
                <p className="text-parchment-400/70 text-sm italic leading-relaxed">
                  "当你排除了一切不可能的情况，剩下的，
                  不管多么难以置信，都是真相。"
                </p>
                <p className="text-parchment-400/50 text-xs mt-3 text-right">
                  —— 福尔摩斯
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="h-16" />
    </div>
  );
};

export default CaseDetail;
