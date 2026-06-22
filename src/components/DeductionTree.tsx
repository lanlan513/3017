import { motion } from 'framer-motion';
import { Clock, ArrowRight, CheckCircle, XCircle, Link, GitBranch } from 'lucide-react';
import type { Clue } from '../types';

interface DeductionTreeProps {
  currentClue: Clue;
  allClues: Clue[];
  onClueClick: (clueId: string) => void;
  activeClueId: string;
}

const relationTypeConfig = {
  leads_to: {
    label: '指向',
    color: 'text-moss-400',
    bgColor: 'bg-moss-500/20',
    borderColor: 'border-moss-500/30',
    icon: ArrowRight,
  },
  supports: {
    label: '佐证',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30',
    icon: CheckCircle,
  },
  contradicts: {
    label: '矛盾',
    color: 'text-blood-400',
    bgColor: 'bg-blood-500/20',
    borderColor: 'border-blood-500/30',
    icon: XCircle,
  },
  related: {
    label: '关联',
    color: 'text-parchment-400',
    bgColor: 'bg-parchment-500/20',
    borderColor: 'border-parchment-500/30',
    icon: Link,
  },
};

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

export const DeductionTree = ({ currentClue, allClues, onClueClick, activeClueId }: DeductionTreeProps) => {
  const getClueById = (id: string) => allClues.find(c => c.id === id);

  const incomingRelations = allClues
    .filter(clue => 
      clue.id !== currentClue.id && 
      clue.relations.some(r => r.targetClueId === currentClue.id)
    )
    .map(clue => {
      const relation = clue.relations.find(r => r.targetClueId === currentClue.id)!;
      return { clue, relation };
    });

  const outgoingRelations = currentClue.relations.map(r => ({
    targetClue: getClueById(r.targetClueId),
    relation: r,
  })).filter(item => item.targetClue !== undefined) as { targetClue: Clue; relation: typeof currentClue.relations[0] }[];

  return (
    <div className="mt-4 p-4 bg-ink-800/60 rounded-sm border border-ink-600/50">
      <div className="flex items-center gap-2 mb-4">
        <GitBranch className="w-5 h-5 text-blood-400" />
        <h5 className="font-display text-lg font-bold text-parchment-200">
          推理链
        </h5>
      </div>

      {currentClue.timeline && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-moss-500/10 border border-moss-500/30 rounded-sm"
        >
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-moss-400" />
            <span className="text-xs font-typewriter text-moss-300 uppercase tracking-wider">
              时间节点
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-display text-xl font-bold text-moss-300">
              {currentClue.timeline.time}
            </span>
            <span className="text-parchment-300 text-sm">
              {currentClue.timeline.event}
            </span>
          </div>
        </motion.div>
      )}

      {incomingRelations.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-xs text-parchment-400 uppercase tracking-wider font-medium">
              指向本条线索
            </span>
          </div>
          <div className="space-y-2">
            {incomingRelations.map(({ clue, relation }, idx) => {
              const config = relationTypeConfig[relation.type];
              const Icon = config.icon;
              return (
                <motion.div
                  key={clue.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => onClueClick(clue.id)}
                  className={`group p-3 rounded-sm border cursor-pointer transition-all duration-300 ${
                    activeClueId === clue.id
                      ? 'bg-blood-500/20 border-blood-500/40'
                      : `${config.bgColor} ${config.borderColor} hover:bg-opacity-40`
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className={`w-8 h-8 rounded-full bg-ink-700 flex items-center justify-center text-lg`}>
                        {iconMap[clue.icon] || '🔍'}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${config.bgColor} ${config.color}`}>
                          <Icon className="w-3 h-3" />
                          {config.label}
                        </div>
                      </div>
                      <h6 className="font-display font-semibold text-parchment-200 mb-1 group-hover:text-blood-300 transition-colors">
                        {clue.title}
                      </h6>
                      <p className="text-parchment-400/70 text-sm line-clamp-2">
                        {relation.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-parchment-500 flex-shrink-0 mt-2 group-hover:text-blood-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      <div className="relative py-2">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-blood-500/30 to-transparent" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`relative z-10 p-4 rounded-sm border-2 ${
            activeClueId === currentClue.id
              ? 'bg-blood-500/20 border-blood-500'
              : 'bg-parchment-100/5 border-parchment-500/30'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-blood-500 text-white flex items-center justify-center text-2xl shadow-stamp">
                {iconMap[currentClue.icon] || '🔍'}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-blood-500 text-white px-2 py-0.5 rounded-sm">
                  当前线索
                </span>
              </div>
              <h6 className="font-display text-lg font-bold text-parchment-100 mb-1">
                {currentClue.title}
              </h6>
              <p className="text-parchment-300/80 text-sm">
                {currentClue.summary}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {outgoingRelations.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-moss-400" />
            <span className="text-xs text-parchment-400 uppercase tracking-wider font-medium">
              本条线索指向
            </span>
          </div>
          <div className="space-y-2">
            {outgoingRelations.map(({ targetClue, relation }, idx) => {
              const config = relationTypeConfig[relation.type];
              const Icon = config.icon;
              return (
                <motion.div
                  key={targetClue.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => onClueClick(targetClue.id)}
                  className={`group p-3 rounded-sm border cursor-pointer transition-all duration-300 ${
                    activeClueId === targetClue.id
                      ? 'bg-blood-500/20 border-blood-500/40'
                      : `${config.bgColor} ${config.borderColor} hover:bg-opacity-40`
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-parchment-500 flex-shrink-0 mt-2 group-hover:text-blood-400 group-hover:-translate-x-1 transition-all" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${config.bgColor} ${config.color}`}>
                          <Icon className="w-3 h-3" />
                          {config.label}
                        </div>
                      </div>
                      <h6 className="font-display font-semibold text-parchment-200 mb-1 group-hover:text-blood-300 transition-colors">
                        {targetClue.title}
                      </h6>
                      <p className="text-parchment-400/70 text-sm line-clamp-2">
                        {relation.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 mt-0.5">
                      <div className={`w-8 h-8 rounded-full bg-ink-700 flex items-center justify-center text-lg`}>
                        {iconMap[targetClue.icon] || '🔍'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {incomingRelations.length === 0 && outgoingRelations.length === 0 && (
        <div className="text-center py-6">
          <div className="w-12 h-12 rounded-full bg-ink-700/50 flex items-center justify-center mx-auto mb-3">
            <Link className="w-6 h-6 text-parchment-500" />
          </div>
          <p className="text-parchment-400/60 text-sm">
            这条线索目前还没有关联其他线索
          </p>
        </div>
      )}
    </div>
  );
};
