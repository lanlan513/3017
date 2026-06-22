import { motion } from 'framer-motion';
import { Clock, Search, User, FileText } from 'lucide-react';
import { useDeductionStore } from '../stores/useDeductionStore';

export const DeductionLogPanel = () => {
  const { logs, expandedClues, selectedSuspectId } = useDeductionStore();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'clue_view':
        return <Search className="w-4 h-4" />;
      case 'suspect_select':
        return <User className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'clue_view':
        return 'text-moss-500 bg-moss-500/10';
      case 'suspect_select':
        return 'text-blood-500 bg-blood-500/10';
      default:
        return 'text-ink-500 bg-ink-500/10';
    }
  };

  return (
    <div className="bg-ink-800/50 rounded-sm border border-ink-600/50 overflow-hidden">
      <div className="bg-ink-700 px-5 py-4 border-b border-ink-600/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blood-500/20 flex items-center justify-center">
            <Clock className="w-4 h-4 text-blood-400" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-parchment-200">
              推理记录
            </h3>
            <p className="text-xs text-parchment-400/60">
              你的调查轨迹
            </p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-ink-700/50 rounded-sm p-3 text-center">
            <div className="text-2xl font-display font-bold text-moss-400">
              {expandedClues.length}
            </div>
            <div className="text-xs text-parchment-400/70">
              已查看线索
            </div>
          </div>
          <div className="bg-ink-700/50 rounded-sm p-3 text-center">
            <div className="text-2xl font-display font-bold text-blood-400">
              {selectedSuspectId ? '1' : '0'}
            </div>
            <div className="text-xs text-parchment-400/70">
              锁定嫌疑人
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-ink-600 to-transparent mb-4" />

        <div className="space-y-3 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-ink-600 scrollbar-track-transparent">
          {logs.length === 0 ? (
            <p className="text-center text-parchment-400/50 text-sm py-4 italic">
              开始你的调查吧...
            </p>
          ) : (
            logs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="relative pl-4"
              >
                {index < logs.length - 1 && (
                  <div className="absolute left-[11px] top-6 bottom-0 w-px bg-ink-600/50" />
                )}
                
                <div className="relative">
                  <div className={`absolute -left-4 top-1 w-6 h-6 rounded-full flex items-center justify-center ${getColor(log.type)}`}>
                    {getIcon(log.type)}
                  </div>
                  
                  <div className="ml-4">
                    <p className="text-parchment-200 text-sm leading-relaxed">
                      {log.content}
                    </p>
                    <span className="text-xs text-parchment-400/50 font-typewriter">
                      {formatTime(log.timestamp)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
