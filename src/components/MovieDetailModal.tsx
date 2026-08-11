import React, { useState } from 'react';
import { MovieResource } from '../types';
import { X, Copy, Check, ExternalLink, HardDrive, Star, Heart, Share2, Film, Sparkles, Smartphone, CheckCircle2 } from 'lucide-react';
import { copyToClipboard } from '../lib/utils';

interface MovieDetailModalProps {
  movie: MovieResource | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  showToast: (title: string, msg: string, type?: 'success' | 'info' | 'error') => void;
  allMovies: MovieResource[];
  onSelectMovie: (movie: MovieResource) => void;
}

export const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
  movie,
  onClose,
  isFavorite,
  onToggleFavorite,
  showToast,
  allMovies,
  onSelectMovie
}) => {
  if (!movie) return null;

  const [copiedText, setCopiedText] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleCopyShareText = async () => {
    const success = await copyToClipboard(movie.quarkShareText);
    if (success) {
      setCopiedText(true);
      showToast('复制成功', '夸克淘口令已复制！打开夸克APP即可自动识别保存。', 'success');
      setTimeout(() => setCopiedText(false), 2500);
    }
  };

  const handleCopyLinkOnly = async () => {
    const success = await copyToClipboard(movie.quarkLink);
    if (success) {
      setCopiedUrl(true);
      showToast('链接复制成功', '夸克网盘链接已复制到剪贴板', 'info');
      setTimeout(() => setCopiedUrl(false), 2500);
    }
  };

  const relatedMovies = allMovies
    .filter((m) => m.id !== movie.id && (m.category === movie.category || m.quality === movie.quality))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/80 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-6">
          {/* Top Banner & Info Grid */}
          <div className="flex flex-row sm:flex-row gap-3 sm:gap-6 items-start">
            {/* Poster Card */}
            <div className="relative w-28 sm:w-48 aspect-[2/3] shrink-0 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-gradient-to-r from-amber-500 to-red-600 text-slate-950 font-black text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded shadow">
                {movie.quality}
              </div>
              {movie.size && (
                <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 bg-slate-950/90 text-cyan-400 font-mono text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded border border-cyan-500/30 flex items-center gap-1">
                  <HardDrive className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-400" />
                  {movie.size}
                </div>
              )}
            </div>

            {/* Movie Info Details */}
            <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold">
                  {movie.category}
                </span>
                <span className="bg-slate-800 text-slate-300 text-[10px] sm:text-xs px-2 py-0.5 rounded-full">
                  {movie.year}
                </span>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {movie.rating}
                </span>
              </div>

              <h2 className="text-base sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                {movie.title}
              </h2>

              {movie.subtitle && (
                <p className="text-[11px] sm:text-sm text-slate-400 font-mono">
                  {movie.subtitle}
                </p>
              )}

              {/* Episode & Audio / Subtitle specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] sm:text-xs bg-slate-950/80 p-2.5 sm:p-3 rounded-xl border border-slate-800 text-slate-300">
                {movie.episodes && (
                  <div>
                    <span className="text-slate-500">集数说明：</span>
                    <span className="font-semibold text-slate-200 ml-1">{movie.episodes}</span>
                  </div>
                )}
                {movie.audioSubtitle && (
                  <div>
                    <span className="text-slate-500">音轨字幕：</span>
                    <span className="font-semibold text-slate-200 ml-1">{movie.audioSubtitle}</span>
                  </div>
                )}
                {movie.size && (
                  <div>
                    <span className="text-slate-500">资源容量：</span>
                    <span className="font-bold text-amber-400 ml-1">{movie.size}</span>
                  </div>
                )}
                <div>
                  <span className="text-slate-500">添加时间：</span>
                  <span className="text-slate-300 ml-1">{movie.addedAt}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {movie.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1">
                {movie.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-950 text-slate-400 text-[10px] sm:text-xs px-2 py-0.5 rounded-lg border border-slate-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quark Share Box (High Focus) */}
          <div className="bg-gradient-to-br from-slate-950 via-cyan-950/30 to-slate-950 p-5 rounded-2xl border-2 border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-cyan-300">
                  夸克网盘口令分享包
                </h3>
              </div>
              <span className="text-[11px] text-amber-400 font-mono">
                ⚡ 支持夸克APP自动弹窗保存
              </span>
            </div>

            {/* Raw share text display area */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 font-mono text-xs text-slate-300 whitespace-pre-wrap select-all select-none">
              {movie.quarkShareText}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={handleCopyShareText}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                  copiedText
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-xl shadow-cyan-500/25'
                }`}
              >
                {copiedText ? (
                  <>
                    <Check className="w-4 h-4" />
                    已复制全套口令
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    一键复制夸克口令
                  </>
                )}
              </button>

              <button
                onClick={handleCopyLinkOnly}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs transition-colors cursor-pointer"
              >
                {copiedUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                复制纯链接
              </button>

              <a
                href={movie.quarkLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 font-medium text-xs transition-colors cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                网页打开
              </a>

              <button
                onClick={() => onToggleFavorite(movie.id)}
                className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                  isFavorite
                    ? 'bg-rose-600 text-white border-rose-400'
                    : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                }`}
                title="收藏"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

          {/* Easy Steps to Save Guide */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="font-bold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              夸克转存三步说明：
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
              <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                <strong className="text-cyan-400 font-mono">1. 点击复制：</strong>
                <span>点击上面的“一键复制夸克口令”按钮。</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                <strong className="text-cyan-400 font-mono">2. 打开APP：</strong>
                <span>切换打开手机「夸克网盘 APP」。</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                <strong className="text-cyan-400 font-mono">3. 自动存盘：</strong>
                <span>夸克APP将自动弹出口令识别卡片，点击存入网盘！</span>
              </div>
            </div>
          </div>

          {/* Related Recommendations */}
          {relatedMovies.length > 0 && (
            <div className="pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                同类/推荐资源
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedMovies.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectMovie(rel)}
                    className="flex items-center gap-3 bg-slate-950/80 hover:bg-slate-800/80 p-2 rounded-xl border border-slate-800 hover:border-slate-700 cursor-pointer transition-all"
                  >
                    <img
                      src={rel.posterUrl}
                      alt={rel.title}
                      className="w-10 h-14 object-cover rounded-md shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-200 truncate">
                        {rel.title}
                      </div>
                      <div className="text-[10px] text-cyan-400 font-mono mt-0.5">
                        {rel.quality} {rel.size ? `• ${rel.size}` : ''}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
