import React, { useState } from 'react';
import { MovieResource, ViewMode } from '../types';
import { Copy, Check, ExternalLink, Star, HardDrive, Heart, Info, CheckSquare, Square, Zap } from 'lucide-react';
import { copyToClipboard } from '../lib/utils';

interface MovieCardProps {
  movie: MovieResource;
  viewMode: ViewMode;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectMovie: (movie: MovieResource) => void;
  showToast: (title: string, msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  viewMode,
  isSelected,
  onToggleSelect,
  isFavorite,
  onToggleFavorite,
  onSelectMovie,
  showToast
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyQuark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await copyToClipboard(movie.quarkShareText);
    if (success) {
      setCopied(true);
      showToast('夸克口令已复制', `已复制「${movie.title}」复制完整打开夸克APP`, 'success');
      setTimeout(() => setCopied(false), 2000);
    } else {
      showToast('复制失败', '请手动复制该资源', 'error');
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(movie.id);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSelect(movie.id);
  };

  // List View Rendering
  if (viewMode === 'list') {
    return (
      <div 
        onClick={() => onSelectMovie(movie)}
        className={`group relative bg-slate-900/90 hover:bg-slate-800/90 border transition-all duration-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer shadow-md hover:shadow-cyan-500/10 ${
          isSelected ? 'border-cyan-500 bg-cyan-950/20' : 'border-slate-800 hover:border-slate-700'
        }`}
      >
        <div className="flex items-center gap-3.5 flex-1 min-w-0">
          {/* Select Checkbox */}
          <button
            onClick={handleCheckboxClick}
            className="text-slate-500 hover:text-cyan-400 p-1 cursor-pointer shrink-0"
            title="选择批量复制"
          >
            {isSelected ? (
              <CheckSquare className="w-5 h-5 text-cyan-400" />
            ) : (
              <Square className="w-5 h-5" />
            )}
          </button>

          {/* Small Thumbnail */}
          <div className="relative w-14 h-20 shrink-0 rounded-lg overflow-hidden border border-slate-700 bg-slate-950">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[9px] font-bold px-1 rounded-bl">
              {movie.rating}
            </div>
          </div>

          {/* Main Info */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                {movie.quality}
              </span>
              {movie.size && (
                <span className="bg-slate-950 text-amber-300 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-slate-800 flex items-center gap-1">
                  <HardDrive className="w-2.5 h-2.5" />
                  {movie.size}
                </span>
              )}
              <span className="text-xs text-slate-400 font-mono">
                {movie.category} • {movie.year}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors truncate">
              {movie.title}
            </h3>

            <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
              {movie.description}
            </p>
          </div>
        </div>

        {/* List Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isFavorite
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-700'
            }`}
            title="收藏"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-400' : ''}`} />
          </button>

          <button
            onClick={handleCopyQuark}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/20'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                已复制淘口令
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                一键复制口令
              </>
            )}
          </button>

          <a
            href={movie.quarkLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs transition-colors cursor-pointer"
            title="夸克网盘链接直达"
          >
            <ExternalLink className="w-4 h-4 text-cyan-400" />
          </a>
        </div>
      </div>
    );
  }

  // Grid Card View Rendering
  return (
    <div 
      onClick={() => onSelectMovie(movie)}
      className={`group relative bg-slate-900 border rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer ${
        isSelected ? 'border-cyan-500 ring-2 ring-cyan-500/30' : 'border-slate-800 hover:border-slate-700'
      }`}
    >
      {/* Top Poster Box */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Top Floating Badges */}
        <div className="absolute top-1.5 left-1.5 right-1.5 sm:top-2.5 sm:left-2.5 sm:right-2.5 flex items-center justify-between z-10">
          <div className="flex items-center gap-1 sm:gap-1.5 max-w-[70%] overflow-hidden">
            <span className="bg-slate-950/90 text-cyan-400 border border-cyan-500/40 font-mono text-[9px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded shadow-lg backdrop-blur-md truncate">
              {movie.quality}
            </span>
            {movie.size && (
              <span className="bg-amber-500/90 text-slate-950 font-mono text-[9px] sm:text-[10px] font-black px-1 sm:px-1.5 py-0.5 rounded shadow-lg truncate shrink-0">
                {movie.size}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Batch selection button */}
            <button
              onClick={handleCheckboxClick}
              className="p-1 sm:p-1.5 bg-slate-950/80 hover:bg-slate-900 text-slate-200 rounded-lg backdrop-blur transition-all border border-slate-700/80 cursor-pointer"
              title="勾选批量复制"
            >
              {isSelected ? (
                <CheckSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
              ) : (
                <Square className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
              )}
            </button>

            {/* Favorite button */}
            <button
              onClick={handleFavoriteClick}
              className={`p-1 sm:p-1.5 rounded-lg backdrop-blur transition-all border cursor-pointer ${
                isFavorite
                  ? 'bg-rose-500/80 text-white border-rose-400'
                  : 'bg-slate-950/80 hover:bg-slate-900 text-slate-300 border-slate-700/80'
              }`}
              title="收藏资源"
            >
              <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Bottom Rating Overlay */}
        <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 bg-slate-950/80 backdrop-blur-md px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md border border-slate-800 text-[10px] sm:text-[11px] font-bold text-amber-300 flex items-center gap-1">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{movie.rating}</span>
        </div>

        {/* Hover Quick Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5 sm:p-4">
          <span className="text-[11px] sm:text-xs font-medium text-slate-200 bg-slate-900/90 border border-slate-700 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg flex items-center gap-1 shadow-lg">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            查看完整介绍
          </span>
        </div>
      </div>

      {/* Card Info Content */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-400 font-mono mb-0.5 sm:mb-1">
            <span>{movie.category}</span>
            <span>{movie.year}</span>
          </div>

          <h3 className="text-xs sm:text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1">
            {movie.title}
          </h3>

          <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-1 sm:line-clamp-2 leading-relaxed mb-2 sm:mb-3">
            {movie.description}
          </p>

          {/* Tags */}
          <div className="hidden sm:flex flex-wrap gap-1 mb-3">
            {movie.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="bg-slate-950 text-slate-400 text-[10px] px-2 py-0.5 rounded border border-slate-800"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="pt-1.5 sm:pt-2 border-t border-slate-800/80 flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={handleCopyQuark}
            className={`flex-1 flex items-center justify-center gap-1 py-1.5 sm:py-2 px-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>已复制</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">一键复制夸克口令</span>
                <span className="sm:hidden">复制口令</span>
              </>
            )}
          </button>

          <a
            href={movie.quarkLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 sm:py-2 px-2 rounded-lg sm:rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-slate-700 font-bold text-[11px] sm:text-xs transition-colors cursor-pointer"
            title="直接打开夸克网盘链接"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span>夸克直达</span>
          </a>
        </div>
      </div>
    </div>
  );
};
