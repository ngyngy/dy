import React from 'react';
import { CategoryFilter, QualityFilter, SortOption, ViewMode } from '../types';
import { Filter, Grid, List, ArrowUpDown, Film, Tv, Sparkles, Smile, Heart, HardDrive, Check } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: CategoryFilter;
  setSelectedCategory: (cat: CategoryFilter) => void;
  selectedQuality: QualityFilter;
  setSelectedQuality: (q: QualityFilter) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  viewMode: ViewMode;
  setViewMode: (vm: ViewMode) => void;
  totalCount: number;
  resetFilters: () => void;
}

const CATEGORIES: { name: CategoryFilter; icon: React.ReactNode; color: string }[] = [
  { name: '全部', icon: <Film className="w-4 h-4" />, color: 'cyan' },
  { name: '欧美剧集', icon: <Tv className="w-4 h-4" />, color: 'indigo' },
  { name: '热门动漫', icon: <Sparkles className="w-4 h-4" />, color: 'amber' },
  { name: '经典高分', icon: <Film className="w-4 h-4" />, color: 'rose' },
  { name: '电影', icon: <Film className="w-4 h-4" />, color: 'blue' },
  { name: '儿童少儿', icon: <Smile className="w-4 h-4" />, color: 'emerald' },
  { name: '我的收藏', icon: <Heart className="w-4 h-4" />, color: 'pink' }
];

const QUALITIES: QualityFilter[] = [
  '全部',
  '4K REMUX',
  '4K Dolby Vision',
  '4K HDR',
  '1080P REMUX',
  '大容量合集'
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedQuality,
  setSelectedQuality,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  totalCount,
  resetFilters
}) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 sm:p-5 mb-6 text-slate-200 shadow-xl backdrop-blur-sm">
      {/* Category Pills Header */}
      <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4 border-b border-slate-800/80 pb-3 sm:pb-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 border border-cyan-400/30'
                    : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/50'
                }`}
              >
                {cat.icon}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* View Mode & Total Count */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline-block text-xs text-slate-400 font-mono bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            共 <strong className="text-cyan-400 font-bold">{totalCount}</strong> 项资源
          </span>
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="大图网格视图"
            >
              <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="紧凑列表视图"
            >
              <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quality Tag Filter & Sort Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        {/* Quality pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            画质规格:
          </span>
          {QUALITIES.map((q) => {
            const isActive = selectedQuality === q;
            return (
              <button
                key={q}
                onClick={() => setSelectedQuality(q)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 font-bold'
                    : 'bg-slate-800/40 hover:bg-slate-800 text-slate-400 border border-slate-800'
                }`}
              >
                {q}
              </button>
            );
          })}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <span className="text-slate-400 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            排序:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1 text-slate-200 outline-none focus:border-cyan-500 text-xs cursor-pointer"
          >
            <option value="default">默认推荐</option>
            <option value="rating">评分最高 (9.8 - 8.8)</option>
            <option value="hot">最热推荐</option>
            <option value="sizeDesc">文件体积 (大容量从大到小)</option>
            <option value="newest">最新添加</option>
          </select>
          
          {(selectedCategory !== '全部' || selectedQuality !== '全部' || sortBy !== 'default') && (
            <button
              onClick={resetFilters}
              className="text-slate-400 hover:text-cyan-400 underline text-xs ml-1 cursor-pointer"
            >
              重置筛选
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
