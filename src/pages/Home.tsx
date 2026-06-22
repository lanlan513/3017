import { motion } from 'framer-motion';
import { Search, Filter, Sparkles } from 'lucide-react';
import { CaseCard } from '../components/CaseCard';
import { cases } from '../data/cases';

const Home = () => {
  return (
    <div className="min-h-screen bg-ink-700">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-800 to-ink-700" />
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blood-500 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-moss-500 rounded-full blur-3xl opacity-10" />
        </div>

        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-parchment-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
              animate={{
                opacity: [Math.random() * 0.3, Math.random() * 0.7, Math.random() * 0.3],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blood-500/10 border border-blood-500/30 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-blood-400" />
              <span className="text-blood-300 text-sm font-medium">
                沉浸式推理体验
              </span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-7xl font-bold text-parchment-100 mb-6 text-shadow-ink leading-tight">
              贝克街档案
              <span className="block text-blood-400 text-3xl md:text-4xl mt-2 font-normal italic">
                Baker Street Files
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-parchment-300/80 text-lg md:text-xl max-w-2xl mx-auto italic"
            >
              拨开迷雾，探寻真相。每一个案件都等着你用智慧去破解，
              <br className="hidden md:block" />
              而答案，就藏在那些被忽视的细节之中。
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-12"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-parchment-400" />
              <input
                type="text"
                placeholder="搜索案件..."
                className="w-full pl-12 pr-4 py-3 bg-ink-600/50 border border-ink-500/50 rounded-sm text-parchment-200 placeholder-parchment-400/50 focus:outline-none focus:border-blood-500/50 focus:bg-ink-600/70 transition-all"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-parchment-200 hover:bg-parchment-100 text-ink-700 font-medium rounded-sm transition-colors shadow-leather">
              <Filter className="w-5 h-5" />
              <span>筛选</span>
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ink-700 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="font-display text-2xl font-bold text-parchment-200 mb-1">
              待调查案件
            </h2>
            <p className="text-parchment-400/60 text-sm">
              共 {cases.length} 起案件等待你的智慧
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center gap-2"
          >
            <button className="w-8 h-8 rounded-full bg-parchment-200 text-ink-700 flex items-center justify-center text-sm font-medium">
              全部
            </button>
            <button className="w-8 h-8 rounded-full bg-ink-600/50 text-parchment-400 hover:bg-ink-600 hover:text-parchment-200 flex items-center justify-center text-sm font-medium transition-colors">
              🔥
            </button>
            <button className="w-8 h-8 rounded-full bg-ink-600/50 text-parchment-400 hover:bg-ink-600 hover:text-parchment-200 flex items-center justify-center text-sm font-medium transition-colors">
              🔒
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseData, index) => (
            <CaseCard key={caseData.id} caseData={caseData} index={index} />
          ))}
        </div>
      </div>

      <footer className="border-t border-ink-600/50 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-parchment-400/50 text-sm">
            🔍 真相只有一个，而你，就是那位发现它的人
          </p>
          <p className="text-parchment-400/30 text-xs mt-2 font-typewriter">
            Baker Street Files © 1892
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
