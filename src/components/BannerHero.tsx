import React, { useState, useEffect } from 'react';
import { MovieResource } from '../types';
import { Sparkles, Copy, Check, ExternalLink, HardDrive, Star, Award, ShieldAlert, Zap } from 'lucide-react';
import { copyToClipboard } from '../lib/utils';

interface BannerHeroProps {
  featuredMovies: MovieResource[];
  onSelectMovie: (movie: MovieResource) => void;
  showToast: (title: string, msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const BannerHero: React.FC<BannerHeroProps> = ({
  featuredMovies,
  onSelectMovie,
  showToast
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (featuredMovies.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  if (!featuredMovies.length) return null;

  const movie = featuredMovies[currentIndex];

  const handleCopy = async (e: React.MouseEvent, m: MovieResource) => {
    e.stopPropagation();
    const success = await copyToClipboard(m.quarkShareText);
    if (success) {
      setCopiedId(m.id);
      showToast('夸克口令复制成功', `已复制「${m.title}」夸克口令！复制整段打开夸克APP即可保存。`, 'success');
      setTimeout(() => setCopiedId(null), 2500);
    } else {
      showToast('复制失败', '请手动选中并复制链接', 'error');
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl mb-8 group">
      {/* Background Banner Image with Gradient Mask */}
      <div className="absolute inset-0 z-0">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover object-center filter blur-md scale-105 opacity-35 transition-all duration-700"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${movie.bannerBg} mix-blend-multiply opacity-80`} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-3.5 py-4 sm:px-6 sm:py-8 md:py-12 flex flex-row items-center gap-3 sm:gap-6 md:gap-8">
        {/* Left Side: Poster Artwork Card */}
        <div 
          onClick={() => onSelectMovie(movie)}
          className="relative w-24 sm:w-36 md:w-52 aspect-[2/3] shrink-0 rounded-xl overflow-hidden shadow-2xl border-2 border-cyan-500/40 cursor-pointer hover:scale-105 transition-transform duration-300 group/poster"
        >
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-gradient-to-r from-amber-500 to-red-600 text-slate-950 font-extrabold text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded shadow-lg uppercase tracking-wider">
            {movie.quality}
          </div>
          {movie.size && (
            <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 bg-slate-950/90 text-cyan-400 font-mono text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded border border-cyan-500/30 flex items-center gap-1">
              <HardDrive className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-400" />
              {movie.size}
            </div>
          )}
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/poster:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-cyan-500 text-slate-950 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
              查看详情
            </span>
          </div>
        </div>

        {/* Right Side: Details & Actions */}
        <div className="flex-1 text-slate-100 text-left min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
            <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-400" />
              镇盘推荐
            </span>
            <span className="bg-slate-800/80 text-slate-300 text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-mono">
              {movie.category}
            </span>
            <span className="bg-amber-500/20 text-amber-300 text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {movie.rating}
            </span>
          </div>

          <h2 
            onClick={() => onSelectMovie(movie)}
            className="text-base sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight cursor-pointer hover:text-cyan-300 transition-colors mb-1 line-clamp-1"
          >
            {movie.title}
          </h2>

          {movie.subtitle && (
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono mb-1.5 line-clamp-1">
              {movie.subtitle}
            </p>
          )}

          <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 mb-2.5 max-w-2xl leading-relaxed">
            {movie.description}
          </p>

          {/* Tags */}
          <div className="hidden sm:flex flex-wrap items-center gap-1.5 mb-4">
            {movie.tags.map((tag, idx) => (
              <span 
                key={idx}
                className="bg-slate-900/80 text-slate-300 border border-slate-700/60 text-[11px] px-2 py-0.5 rounded-lg"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Direct Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={(e) => handleCopy(e, movie)}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/25 transition-all cursor-pointer"
            >
              {copiedId === movie.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  已复制淘口令
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">一键复制夸克淘口令</span>
                  <span className="sm:hidden">复制夸克口令</span>
                </>
              )}
            </button>

            <a
              href={movie.quarkLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-medium text-xs sm:text-sm transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              夸克直达
            </a>

            <button
              onClick={() => onSelectMovie(movie)}
              className="hidden sm:inline-block px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs sm:text-sm font-medium transition-all cursor-pointer"
            >
              详细
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Dots indicator */}
      {featuredMovies.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-slate-950/60 backdrop-blur px-3 py-1 rounded-full border border-slate-800">
          {featuredMovies.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === currentIndex ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
              title={`切换到推荐 ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
