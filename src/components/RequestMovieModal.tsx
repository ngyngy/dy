import React, { useState } from 'react';
import { X, Send, PlusCircle, CheckCircle2, Link2, HardDrive, Tag } from 'lucide-react';
import { MovieResource } from '../types';

interface RequestMovieModalProps {
  onClose: () => void;
  onAddCustomMovie: (newMovie: MovieResource) => void;
  showToast: (title: string, msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const RequestMovieModal: React.FC<RequestMovieModalProps> = ({
  onClose,
  onAddCustomMovie,
  showToast
}) => {
  const [tab, setTab] = useState<'request' | 'submit'>('submit');

  // Submit form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<MovieResource['category']>('电影');
  const [quality, setQuality] = useState('4K REMUX');
  const [size, setSize] = useState('');
  const [quarkLink, setQuarkLink] = useState('');
  const [quarkShareText, setQuarkShareText] = useState('');
  const [description, setDescription] = useState('');

  // Request form state
  const [requestTitle, setRequestTitle] = useState('');
  const [requestNote, setRequestNote] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const handleSubmitCustomResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !quarkLink.trim()) {
      showToast('请补充信息', '影片名称和夸克网盘链接为必填项！', 'error');
      return;
    }

    const shareTxt = quarkShareText.trim() || 
      `我用夸克网盘给你分享了「${title}」，点击链接或复制整段内容，打开「夸克APP」即可获取。\n链接：${quarkLink}`;

    const newMovie: MovieResource = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      category,
      quality: quality || '1080P HD',
      size: size.trim() || undefined,
      year: new Date().getFullYear().toString(),
      rating: 9.0,
      tags: ['用户投稿', quality],
      posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
      bannerBg: 'from-slate-900 via-zinc-900 to-black',
      quarkLink: quarkLink.trim(),
      quarkShareText: shareTxt,
      description: description.trim() || '用户自投共享影视资源',
      hotScore: 5000,
      addedAt: new Date().toISOString().split('T')[0],
      customSubmitted: true
    };

    onAddCustomMovie(newMovie);
    showToast('投稿成功', `已成功将「${newMovie.title}」添加到分享库中！`, 'success');
    onClose();
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestTitle.trim()) {
      showToast('请输入片名', '请输入您希望上架的影片名称', 'error');
      return;
    }
    setRequestSubmitted(true);
    showToast('求片收到', `管理员与AI助手已记录求片「${requestTitle}」，即将补货！`, 'success');
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">
              影视资源提交 & 智能求片
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 text-xs font-bold">
          <button
            onClick={() => setTab('submit')}
            className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
              tab === 'submit'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            自主投稿夸克链接
          </button>
          <button
            onClick={() => setTab('request')}
            className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
              tab === 'request'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            求片/资源补货需求
          </button>
        </div>

        <div className="p-6">
          {tab === 'submit' ? (
            <form onSubmit={handleSubmitCustomResource} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  影片/剧集名称 <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="如：星际穿越 4K IMAX 蓝光原盘"
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">所属分类</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-emerald-500"
                  >
                    <option value="热门短剧">热门短剧</option>
                    <option value="电影">电影</option>
                    <option value="欧美剧集">欧美剧集</option>
                    <option value="热门动漫">热门动漫</option>
                    <option value="经典高分">经典高分</option>
                    <option value="儿童少儿">儿童少儿</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">画质规格</label>
                  <input
                    type="text"
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    placeholder="如：4K REMUX, 1080P"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  夸克网盘链接 <span className="text-rose-400">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={quarkLink}
                  onChange={(e) => setQuarkLink(e.target.value)}
                  placeholder="https://pan.quark.cn/s/xxxxxxxx"
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-slate-100 font-mono placeholder-slate-500 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  夸克APP完整淘口令 (可选，默认自动生成)
                </label>
                <textarea
                  rows={2}
                  value={quarkShareText}
                  onChange={(e) => setQuarkShareText(e.target.value)}
                  placeholder="粘贴夸克APP分享的完整口令格式..."
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-slate-100 placeholder-slate-500 outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">资源简介/说明</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="简单描述音轨、字幕或推荐理由"
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-slate-100 placeholder-slate-500 outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer mt-2"
              >
                立即加入网站夸克资源库
              </button>
            </form>
          ) : (
            <form onSubmit={handleSendRequest} className="space-y-4 text-xs">
              {requestSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="text-base font-bold text-white">求片信息已接收！</h4>
                  <p className="text-slate-400">资源管理员将会在夸克网盘搜罗并尽快上架本资源。</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      想看的电影/剧集名称 <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={requestTitle}
                      onChange={(e) => setRequestTitle(e.target.value)}
                      placeholder="如：教父三部曲 4K, 肖申克的救赎 REMUX..."
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">需求说明/画质要求</label>
                    <textarea
                      rows={3}
                      value={requestNote}
                      onChange={(e) => setRequestNote(e.target.value)}
                      placeholder="对格式、画质、字幕或音轨的具体要求..."
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
                  >
                    提交求片心愿单
                  </button>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
