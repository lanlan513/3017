import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowLeft, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDeductionStore } from '../stores/useDeductionStore';
import type { Case } from '../types';

interface CaseHeaderProps {
  caseData: Case;
}

export const CaseHeader = ({ caseData }: CaseHeaderProps) => {
  const { resetDeduction } = useDeductionStore();

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-800 to-ink-700" />
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 right-0 h-full bg-[radial-gradient(ellipse_at_top,rgba(139,37,0,0.2),transparent_60%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-parchment-300 hover:text-parchment-100 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">返回案件大厅</span>
          </Link>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-blood-500/20 text-blood-300 text-xs font-typewriter rounded-sm border border-blood-500/30">
                  {caseData.id.toUpperCase()}
                </span>
                <span className="text-parchment-400/60 text-sm">
                  待侦破
                </span>
              </div>
              
              <h1 className="font-display text-3xl md:text-4xl font-bold text-parchment-100 mb-4 text-shadow-ink">
                {caseData.title}
              </h1>

              <p className="text-parchment-300/80 text-lg italic max-w-2xl">
                {caseData.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-4 mt-6"
            >
              <div className="flex items-center gap-2 text-parchment-300">
                <div className="w-8 h-8 rounded-full bg-parchment-100/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-blood-400" />
                </div>
                <div>
                  <div className="text-xs text-parchment-400/60 uppercase tracking-wide">案发时间</div>
                  <div className="text-sm font-medium">{caseData.time}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-parchment-300">
                <div className="w-8 h-8 rounded-full bg-parchment-100/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-moss-400" />
                </div>
                <div>
                  <div className="text-xs text-parchment-400/60 uppercase tracking-wide">案发地点</div>
                  <div className="text-sm font-medium">{caseData.location}</div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <button
              onClick={resetDeduction}
              className="flex items-center gap-2 px-4 py-2 bg-parchment-100/10 hover:bg-parchment-100/20 text-parchment-200 rounded-sm border border-parchment-100/20 transition-all duration-300 group"
            >
              <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-sm">重新调查</span>
            </button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blood-500/50 to-transparent" />
    </div>
  );
};
