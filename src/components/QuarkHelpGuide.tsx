import React from 'react';
import { X, Smartphone, Copy, CheckCircle, ExternalLink, HardDrive, Zap, ShieldCheck } from 'lucide-react';

interface QuarkHelpGuideProps {
  onClose: () => void;
}

export const QuarkHelpGuide: React.FC<QuarkHelpGuideProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">
              夸克网盘资源快速保存指南
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs text-slate-300">
          <div className="bg-cyan-950/50 border border-cyan-800/60 p-3.5 rounded-2xl flex items-start gap-3">
            <Zap className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              本站资源（如老友记 830G 4K HDR、蜘蛛侠 359G REMUX）均存储于<strong>夸克网盘</strong>。采用淘口令技术，无需手动繁琐复制网址，一键即可秒存！
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-black flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <h4 className="font-bold text-slate-100 text-sm mb-1">点击“一键复制淘口令”</h4>
                <p className="text-slate-400 leading-relaxed">
                  在任意电影或剧集卡片上，点击蓝色按钮【一键复制淘口令】，系统会自动将标准淘口令复制到系统剪贴板。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-black flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <h4 className="font-bold text-slate-100 text-sm mb-1">切换打开「夸克 APP」</h4>
                <p className="text-slate-400 leading-relaxed">
                  打开手机上的夸克APP。夸克APP会自动读取剪贴板口令，并在首页弹出【检测到分享链接】卡片。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-black flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <h4 className="font-bold text-slate-100 text-sm mb-1">一键存入并在线看 4K</h4>
                <p className="text-slate-400 leading-relaxed">
                  点击【存入网盘】或【转存】，即可在夸克网盘中极速高清在线播放或下载原盘文件！
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-4 h-4" /> 资源长期有效，失效可提交求片
            </span>
            <span className="font-mono text-cyan-400">dy.ngy123.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};
