import React, { useState } from 'react';
import { MovieResource } from '../types';
import { X, Copy, Check, Trash2, CheckSquare, Square, Layers, ListFilter } from 'lucide-react';
import { copyToClipboard } from '../lib/utils';

interface BatchCopyModalProps {
  selectedIds: string[];
  allMovies: MovieResource[];
  onClose: () => void;
  onClearSelection: () => void;
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  showToast: (title: string, msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const BatchCopyModal: React.FC<BatchCopyModalProps> = ({
  selectedIds,
  allMovies,
  onClose,
  onClearSelection,
  onToggleSelect,
  onSelectAll,
  showToast
}) => {
  const [copyFormat, setCopyFormat] = useState<'full' | 'titleLink' | 'linkOnly'>('full');
  const [copied, setCopied] = useState(false);

  const selectedMovies = allMovies.filter((m) => selectedIds.includes(m.id));

  const generateBatchText = (): string => {
    if (selectedMovies.length === 0) return '';

    if (copyFormat === 'full') {
      return selectedMovies.map((m) => m.quarkShareText).join('\n\n--------------------\n\n');
    } else if (copyFormat === 'titleLink') {
      return selectedMovies
        .map((m, i) => `${i + 1}. 【${m.title}】(${m.quality})\n链接：${m.quarkLink}`)
        .join('\n\n');
    } else {
      return selectedMovies.map((m) => m.quarkLink).join('\n');
    }
  };

  const handleCopyBatch = async () => {
    const text = generateBatchText();
    if (!text) {
      showToast('未选择资源', '请先勾选需要批量复制的电影资源', 'error');
      return;
    }

    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      showToast('批量复制成功', `已成功复制 ${selectedMovies.length} 个夸克网盘资源！`, 'success');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">
              批量资源导出与复制 ({selectedMovies.length} 项)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={onSelectAll}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium cursor-pointer"
              >
                {selectedIds.length === allMovies.length ? '取消全选' : '选择全部资源'}
              </button>
              {selectedIds.length > 0 && (
                <button
                  onClick={onClearSelection}
                  className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/60 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  清空已选
                </button>
              )}
            </div>

            {/* Format Option selector */}
            <div className="flex items-center gap-1">
              <span className="text-slate-400 mr-1">导出格式:</span>
              <button
                onClick={() => setCopyFormat('full')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  copyFormat === 'full' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                全套口令
              </button>
              <button
                onClick={() => setCopyFormat('titleLink')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  copyFormat === 'titleLink' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                片名+链接
              </button>
              <button
                onClick={() => setCopyFormat('linkOnly')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  copyFormat === 'linkOnly' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                纯链接
              </button>
            </div>
          </div>

          {/* Selected Movies List */}
          {selectedMovies.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm border-2 border-dashed border-slate-800 rounded-2xl">
              暂未勾选任何资源，请在主页列表勾选需要批量复制的影片。
            </div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {selectedMovies.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <button
                      onClick={() => onToggleSelect(m.id)}
                      className="text-cyan-400 shrink-0 cursor-pointer"
                    >
                      <CheckSquare className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-slate-200 truncate">{m.title}</span>
                    <span className="text-[10px] bg-slate-800 text-cyan-400 px-1.5 py-0.5 rounded font-mono shrink-0">
                      {m.quality}
                    </span>
                  </div>
                  <button
                    onClick={() => onToggleSelect(m.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Text Preview Area */}
          {selectedMovies.length > 0 && (
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">批量复制预览内容：</label>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 max-h-36 overflow-y-auto whitespace-pre-wrap select-all">
                {generateBatchText()}
              </div>
            </div>
          )}
        </div>

        {/* Footer Button */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
          >
            关闭
          </button>
          <button
            onClick={handleCopyBatch}
            disabled={selectedMovies.length === 0}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all cursor-pointer ${
              selectedMovies.length === 0
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : copied
                ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/25'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            一键复制 {selectedMovies.length} 个资源口令
          </button>
        </div>
      </div>
    </div>
  );
};
