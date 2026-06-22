import { motion } from 'framer-motion';
import { Calendar, MapPin, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Case } from '../types';

interface CaseCardProps {
  caseData: Case;
  index: number;
}

export const CaseCard = ({ caseData, index }: CaseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ 
        y: -8, 
        rotate: 1,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="relative group cursor-pointer"
    >
      <Link to={`/case/${caseData.id}`}>
        <div className="relative bg-parchment-200 rounded-sm p-6 shadow-parchment overflow-hidden">
          <div className="absolute inset-0 bg-parchment-texture pointer-events-none opacity-50" />
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blood-500 to-transparent" />
          
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-ink-700 shadow-md transform -skew-x-3">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-1 bg-parchment-300 opacity-50" />
            </div>
          </div>

          <div className="pt-4 relative z-10">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-ink-700 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-parchment-300" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold text-ink-700 leading-tight group-hover:text-blood-600 transition-colors">
                  {caseData.title}
                </h3>
              </div>
            </div>

            <p className="text-ink-500 text-sm mb-4 line-clamp-2 italic">
              {caseData.description}
            </p>

            <div className="space-y-2 pt-4 border-t border-parchment-400/50">
              <div className="flex items-center gap-2 text-ink-600">
                <Calendar className="w-4 h-4 text-blood-500" />
                <span className="text-sm">{caseData.time}</span>
              </div>
              <div className="flex items-center gap-2 text-ink-600">
                <MapPin className="w-4 h-4 text-moss-500" />
                <span className="text-sm truncate">{caseData.location}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex -space-x-2">
                {caseData.suspects.slice(0, 3).map((suspect, i) => (
                  <div
                    key={suspect.id}
                    className="w-7 h-7 rounded-full bg-parchment-300 border-2 border-parchment-200 flex items-center justify-center text-sm"
                    style={{ zIndex: 3 - i }}
                  >
                    {suspect.avatar}
                  </div>
                ))}
                {caseData.suspects.length > 3 && (
                  <div className="w-7 h-7 rounded-full bg-ink-600 border-2 border-parchment-200 flex items-center justify-center text-xs text-parchment-200">
                    +{caseData.suspects.length - 3}
                  </div>
                )}
              </div>
              <span className="text-xs font-display text-blood-600 font-semibold">
                {caseData.clues.length} 条线索
              </span>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-parchment-400/20 to-transparent rounded-tl-full" />
        </div>

        <div 
          className="absolute inset-0 -z-10 bg-ink-900/30 blur-sm rounded-sm transform translate-y-2 group-hover:translate-y-3 transition-transform"
        />
      </Link>
    </motion.div>
  );
};
