import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Sparkles, X, AlertCircle } from 'lucide-react';
import { CaseCard } from '../components/CaseCard';
import { cases } from '../data/cases';

type CategoryType = 'all' | 'hot' | 'locked';

const Home = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [showFilter, setShowFilter] = useState(false);

  const filteredCases = useMemo(() => {
    return cases.filter(c => {
      const keyword = searchKeyword.trim().toLowerCase();
      const matchesSearch = keyword === '' || 
        c.title.toLowerCase().includes(keyword) ||
        c.location.toLowerCase().includes(keyword) ||
        c.description.toLowerCase().includes(keyword) ||
        c.clues.some(clue => clue.title.toLowerCase().includes(keyword));

      if (activeCategory === 'all') return matchesSearch;
      if (activeCategory === 'hot') return matchesSearch && c.suspects.length >= 4;
      if (activeCategory === 'locked') return matchesSearch && c.id === 'case-001';
      
      return matchesSearch;
    });
  }, [searchKeyword, activeCategory]);

  const handleCategoryChange = (category: CategoryType) => {
    setActiveCategory(category);
  };

  const clearSearch = () => {
    setSearchKeyword('');
  };

  const getCategoryLabel = (cat: CategoryType) => {
    switch (cat) {
      case 'all': return '全部';
      case 'hot': return '🔥';
      case 'locked': return '🔒';
    }
  };

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
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-ink-600/50 border border-ink-500/50 rounded-sm text-parchment-200 placeholder-parchment-400/50 focus:outline-none focus:border-blood-500/50 focus:bg-ink-600/70 transition-all"
              />
              {searchKeyword && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-parchment-400/20 hover:bg-parchment-400/40 flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3 text-parchment-400" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className={`flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-sm transition-all duration-300 shadow-leather ${
                showFilter
                  ? 'bg-blood-500 text-parchment-100'
                  : 'bg-parchment-200 hover:bg-parchment-100 text-ink-700'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span>筛选</span>
            </button>
          </motion.div>

          <AnimatePresence>
            {showFilter && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto mb-8 overflow-hidden"
              >
                <div className="bg-ink-600/50 border border-ink-500/50 rounded-sm p-5">
                  <h4 className="text-parchment-200 font-display text-sm font-semibold mb-3">筛选条件</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-parchment-400/70 text-xs mb-1 block">案件难度</label>
                      <div className="flex gap-2">
                        {['全部', '简单', '中等', '困难'].map((level, i) => (
                          <button
                            key={level}
                            className={`px-3 py-1.5 text-sm rounded-sm transition-colors ${
                              i === 0
                                ? 'bg-blood-500/20 text-blood-300 border border-blood-500/30'
                                : 'bg-ink-500/50 text-parchment-300/70 border border-transparent hover:bg-ink-500'
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-parchment-400/70 text-xs mb-1 block">案件类型</label>
                      <div className="flex flex-wrap gap-2">
                        {['全部', '密室杀人', '失踪案', '毒杀', '盗窃'].map((type, i) => (
                          <button
                            key={type}
                            className={`px-3 py-1.5 text-sm rounded-sm transition-colors ${
                              i === 0
                                ? 'bg-moss-500/20 text-moss-300 border border-moss-500/30'
                                : 'bg-ink-500/50 text-parchment-300/70 border border-transparent hover:bg-ink-500'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ink-700 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="font-display text-2xl font-bold text-parchment-200 mb-1">
              待调查案件
            </h2>
            <p className="text-parchment-400/60 text-sm">
              {searchKeyword || activeCategory !== 'all' 
                ? `找到 ${filteredCases.length} 个相关案件`
                : `共 ${cases.length} 起案件等待你的智慧`
              }
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center gap-2"
          >
            {(['all', 'hot', 'locked'] as CategoryType[]).map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-parchment-200 text-ink-700 shadow-leather scale-110'
                    : 'bg-ink-600/50 text-parchment-400 hover:bg-ink-600 hover:text-parchment-200'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </motion.div>
        </div>

        {searchKeyword && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 bg-parchment-100/5 border border-parchment-100/10 rounded-sm flex items-center gap-3"
          >
            <Search className="w-4 h-4 text-blood-400 flex-shrink-0" />
            <span className="text-parchment-300 text-sm flex-1">
              正在搜索：<span className="text-blood-300 font-medium">"{searchKeyword}"</span>
            </span>
            <button
              onClick={clearSearch}
              className="text-parchment-400 hover:text-parchment-200 text-sm transition-colors"
            >
              清除
            </button>
          </motion.div>
        )}

        {filteredCases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((caseData, index) => (
              <CaseCard key={caseData.id} caseData={caseData} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 rounded-full bg-ink-600/50 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-parchment-400" />
            </div>
            <h3 className="font-display text-xl text-parchment-200 mb-2">
              没有找到匹配的案件
            </h3>
            <p className="text-parchment-400/70 text-sm mb-4">
              试试其他关键词或筛选条件
            </p>
            <button
              onClick={() => {
                setSearchKeyword('');
                setActiveCategory('all');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blood-500/20 text-blood-300 rounded-sm border border-blood-500/30 hover:bg-blood-500/30 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>清除所有筛选</span>
            </button>
          </motion.div>
        )}
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
