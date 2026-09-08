import React from 'react';
import { Search, Film, Sparkles, Heart, PlusCircle, CopyCheck, ExternalLink, HelpCircle, HardDrive } from 'lucide-react';
import { CategoryFilter } from '../types';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  favoritesCount: number;
  selectedCategory: CategoryFilter;
  setSelectedCategory: (cat: CategoryFilter) => void;
  openAIModal: () => void;
  openRequestModal: () => void;
  openBatchModal: () => void;
  openHelpModal: () => void;
  selectedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  favoritesCount,
  selectedCategory,
  setSelectedCategory,
  openAIModal,
  openRequestModal,
  openBatchModal,
  openHelpModal,
  selectedCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
      {/* Top Notice / Domain Announcement Bar */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 border-b border-cyan-500/20 text-slate-300 flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-2 text-cyan-400 font-mono">
          <HardDrive className="w-3.5 h-3.5" />
          <span>官方专属域名：dy.ngy123.com</span>
        </div>
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2">
          <span className="flex items-center gap-1.5 text-amber-300 font-medium truncate">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="truncate">夸克 4K/REMUX 原盘/热门短剧合集，一键复制夸克口令！</span>
          </span>
          <button
            onClick={openHelpModal}
            className="text-cyan-400 hover:text-cyan-300 underline font-medium flex items-center gap-1 cursor-pointer shrink-0 ml-1"
          >
            <HelpCircle className="w-3 h-3" />
            <span className="hidden xs:inline">保存教程</span>
            <span className="xs:hidden">教程</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-6">
          {/* Logo & Site Title */}
          <div 
            onClick={() => { setSelectedCategory('全部'); setSearchQuery(''); }}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Film className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300 tracking-tight">
                  电影资源站
                </h1>
                <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-mono bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 rounded-md">
                  dy.ngy123.com
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                高清夸克网盘影视/短剧免费分享平台
              </p>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="flex-1 max-w-xl relative">
            <div className="relative">
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索电影、美剧、热门短剧、动漫..."
                className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500/80 rounded-xl pl-8 sm:pl-10 pr-8 sm:pr-10 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-400 outline-none transition-all shadow-inner focus:ring-2 focus:ring-cyan-500/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs bg-slate-800 hover:bg-slate-700 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Action Header Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* AI Assistant Button */}
            <button
              onClick={openAIModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-cyan-600/30 hover:from-indigo-600/50 hover:to-cyan-600/50 border border-indigo-500/40 text-indigo-200 text-xs sm:text-sm font-medium transition-all shadow-sm hover:shadow-indigo-500/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="hidden sm:inline">AI 智能求片</span>
            </button>

            {/* Batch Select / Copy Button */}
            <button
              onClick={openBatchModal}
              className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                selectedCount > 0
                  ? 'bg-cyan-600 text-white border border-cyan-400 shadow-lg shadow-cyan-600/30 animate-bounce'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              <CopyCheck className="w-4 h-4 text-cyan-400" />
              <span className="hidden md:inline">批量复制</span>
              {selectedCount > 0 && (
                <span className="bg-amber-400 text-slate-950 font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                  {selectedCount}
                </span>
              )}
            </button>

            {/* Request Movie / Submit Share Link */}
            <button
              onClick={openRequestModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs sm:text-sm font-medium transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>提交/求片</span>
            </button>

            {/* Favorites Tab Button */}
            <button
              onClick={() => setSelectedCategory(selectedCategory === '我的收藏' ? '全部' : '我的收藏')}
              className={`relative p-2 sm:px-3 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === '我的收藏'
                  ? 'bg-rose-600 text-white border border-rose-400 shadow-lg shadow-rose-600/30'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
              title="查看我的收藏"
            >
              <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'text-rose-400 fill-rose-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">收藏</span>
              {favoritesCount > 0 && (
                <span className="ml-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
