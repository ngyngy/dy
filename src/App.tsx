import React, { useState, useEffect, useMemo } from 'react';
import { MovieResource, CategoryFilter, QualityFilter, SortOption, ViewMode, ToastMessage } from './types';
import { INITIAL_RESOURCES } from './data/movies';
import { Navbar } from './components/Navbar';
import { BannerHero } from './components/BannerHero';
import { FilterBar } from './components/FilterBar';
import { MovieCard } from './components/MovieCard';
import { MovieDetailModal } from './components/MovieDetailModal';
import { BatchCopyModal } from './components/BatchCopyModal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { RequestMovieModal } from './components/RequestMovieModal';
import { QuarkHelpGuide } from './components/QuarkHelpGuide';
import { ToastContainer } from './components/Toast';
import { Footer } from './components/Footer';
import { 
  getFavoritesFromStorage, 
  saveFavoritesToStorage, 
  getCustomMoviesFromStorage, 
  saveCustomMoviesToStorage,
  parseSizeGB 
} from './lib/utils';
import { Film, SearchX, Sparkles, PlusCircle, HelpCircle } from 'lucide-react';

export default function App() {
  // All movies combining initial dataset + user submitted custom movies
  const [customMovies, setCustomMovies] = useState<MovieResource[]>(getCustomMoviesFromStorage());
  const allMovies = useMemo(() => [...INITIAL_RESOURCES, ...customMovies], [customMovies]);

  // Favorite IDs
  const [favorites, setFavorites] = useState<string[]>(getFavoritesFromStorage());

  // Batch Selection IDs
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('全部');
  const [selectedQuality, setSelectedQuality] = useState<QualityFilter>('全部');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Modals state
  const [activeMovieModal, setActiveMovieModal] = useState<MovieResource | null>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // Toast system
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle favorite
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      let next: string[];
      if (prev.includes(id)) {
        next = prev.filter((item) => item !== id);
        showToast('取消收藏', '已从我的收藏移除', 'info');
      } else {
        next = [...prev, id];
        showToast('收藏成功', '已添加至我的收藏夹', 'success');
      }
      saveFavoritesToStorage(next);
      return next;
    });
  };

  // Toggle batch selection
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredMovies.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredMovies.map((m) => m.id));
    }
  };

  // Custom movie submission
  const handleAddCustomMovie = (newMovie: MovieResource) => {
    const updated = [newMovie, ...customMovies];
    setCustomMovies(updated);
    saveCustomMoviesToStorage(updated);
  };

  // Featured spotlight movies for Banner
  const featuredMovies = useMemo(() => {
    return allMovies.filter((m) => m.featured);
  }, [allMovies]);

  // Filter & Sort Pipeline
  const filteredMovies = useMemo(() => {
    return allMovies
      .filter((m) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = m.title.toLowerCase().includes(q);
          const matchSub = m.subtitle?.toLowerCase().includes(q);
          const matchDesc = m.description.toLowerCase().includes(q);
          const matchTags = m.tags.some((t) => t.toLowerCase().includes(q));
          const matchQuality = m.quality.toLowerCase().includes(q);
          const matchSize = m.size?.toLowerCase().includes(q);
          if (!matchTitle && !matchSub && !matchDesc && !matchTags && !matchQuality && !matchSize) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory === '我的收藏') {
          if (!favorites.includes(m.id)) return false;
        } else if (selectedCategory !== '全部') {
          if (m.category !== selectedCategory) return false;
        }

        // Quality filter
        if (selectedQuality !== '全部') {
          if (selectedQuality === '大容量合集') {
            const sizeNum = parseSizeGB(m.size);
            if (sizeNum < 200) return false;
          } else {
            if (!m.quality.toLowerCase().includes(selectedQuality.toLowerCase())) return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'hot') return b.hotScore - a.hotScore;
        if (sortBy === 'sizeDesc') return parseSizeGB(b.size) - parseSizeGB(a.size);
        if (sortBy === 'newest') return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
        return 0; // default
      });
  }, [allMovies, searchQuery, selectedCategory, selectedQuality, sortBy, favorites]);

  // Calculate total GB
  const totalSizeGB = useMemo(() => {
    return allMovies.reduce((acc, m) => acc + parseSizeGB(m.size), 0);
  }, [allMovies]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Header Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favoritesCount={favorites.length}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        openAIModal={() => setIsAIModalOpen(true)}
        openRequestModal={() => setIsRequestModalOpen(true)}
        openBatchModal={() => setIsBatchModalOpen(true)}
        openHelpModal={() => setIsHelpModalOpen(true)}
        selectedCount={selectedIds.length}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Banner Hero Spotlight (Shown when no search query and in All/Main category) */}
        {!searchQuery && (selectedCategory === '全部' || selectedCategory === '电影') && (
          <BannerHero
            featuredMovies={featuredMovies}
            onSelectMovie={setActiveMovieModal}
            showToast={showToast}
          />
        )}

        {/* Filter and View Switcher */}
        <FilterBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedQuality={selectedQuality}
          setSelectedQuality={setSelectedQuality}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalCount={filteredMovies.length}
          resetFilters={() => {
            setSelectedCategory('全部');
            setSelectedQuality('全部');
            setSortBy('default');
            setSearchQuery('');
          }}
        />

        {/* Search / Category Results Notice if filtering */}
        {(searchQuery || selectedCategory !== '全部' || selectedQuality !== '全部') && (
          <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800 px-4 py-2.5 rounded-xl mb-6 text-xs text-slate-300">
            <div>
              正在查看{' '}
              {selectedCategory !== '全部' && <span className="font-bold text-cyan-400">[{selectedCategory}]</span>}{' '}
              {selectedQuality !== '全部' && <span className="font-bold text-amber-400">[{selectedQuality}]</span>}{' '}
              {searchQuery && <span>包含“<strong className="text-white">{searchQuery}</strong>”的</span>}{' '}
              夸克资源，共 <strong className="text-cyan-400 font-bold">{filteredMovies.length}</strong> 项
            </div>
            <button
              onClick={() => {
                setSelectedCategory('全部');
                setSelectedQuality('全部');
                setSearchQuery('');
              }}
              className="text-cyan-400 hover:underline font-medium cursor-pointer"
            >
              清除搜索与条件
            </button>
          </div>
        )}

        {/* Movie Grid / List Display */}
        {filteredMovies.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 border-2 border-dashed border-slate-800 rounded-3xl space-y-4">
            <SearchX className="w-16 h-16 text-slate-600 mx-auto animate-pulse" />
            <h3 className="text-lg font-bold text-slate-300">未找到相关夸克影视资源</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              试试更换搜索关键词或筛选类型。也可以点击上方【AI 智能求片】或【提交/求片】，向管理员提需求！
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsAIModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                问问 AI 影迷助手
              </button>
              <button
                onClick={() => setIsRequestModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-emerald-400" />
                提交求片需求
              </button>
            </div>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6'
                : 'space-y-3'
            }
          >
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                viewMode={viewMode}
                isSelected={selectedIds.includes(movie.id)}
                onToggleSelect={handleToggleSelect}
                isFavorite={favorites.includes(movie.id)}
                onToggleFavorite={handleToggleFavorite}
                onSelectMovie={setActiveMovieModal}
                showToast={showToast}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer totalCount={allMovies.length} totalSizeGB={totalSizeGB} />

      {/* Modals & Dialogs */}
      <MovieDetailModal
        movie={activeMovieModal}
        onClose={() => setActiveMovieModal(null)}
        isFavorite={activeMovieModal ? favorites.includes(activeMovieModal.id) : false}
        onToggleFavorite={handleToggleFavorite}
        showToast={showToast}
        allMovies={allMovies}
        onSelectMovie={setActiveMovieModal}
      />

      {isBatchModalOpen && (
        <BatchCopyModal
          selectedIds={selectedIds}
          allMovies={allMovies}
          onClose={() => setIsBatchModalOpen(false)}
          onClearSelection={() => setSelectedIds([])}
          onToggleSelect={handleToggleSelect}
          onSelectAll={handleSelectAll}
          showToast={showToast}
        />
      )}

      {isAIModalOpen && (
        <AIAssistantModal
          onClose={() => setIsAIModalOpen(false)}
          allMovies={allMovies}
        />
      )}

      {isRequestModalOpen && (
        <RequestMovieModal
          onClose={() => setIsRequestModalOpen(false)}
          onAddCustomMovie={handleAddCustomMovie}
          showToast={showToast}
        />
      )}

      {isHelpModalOpen && (
        <QuarkHelpGuide onClose={() => setIsHelpModalOpen(false)} />
      )}

      {/* Toast notifications container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
