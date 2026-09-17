import React from 'react';
import { Film, HardDrive, ShieldCheck, Heart, Sparkles, ExternalLink, Globe, Link2, Award } from 'lucide-react';

interface FooterProps {
  totalCount: number;
  totalSizeGB: number;
}

const FRIENDLY_LINKS = [
  {
    domain: 'www.wangpan8.com',
    url: 'https://www.wangpan8.com/',
    title: '网盘吧 (官方主站)',
    desc: '网盘吧官方主站 · 海量夸克与全网优质网盘资源导航总站',
    rankBadge: '官方主站',
    badgeColor: 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-400/50',
    icon: '👑',
    isMain: true
  },
  {
    domain: 'btc.ngy123.com',
    url: 'https://btc.ngy123.com',
    title: '比特币导航站',
    desc: '百度搜索“比特币导航、比特币资源”排名第 1',
    rankBadge: '百度 No.1',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    icon: '₿'
  },
  {
    domain: 'fabi.ngy123.com',
    url: 'https://fabi.ngy123.com',
    title: '全球法币排行榜',
    desc: '百度搜索“法币排行”排名第 4',
    rankBadge: '百度 No.4',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    icon: '💵'
  },
  {
    domain: 'eth.ngy123.com',
    url: 'https://eth.ngy123.com',
    title: '以太坊资源导航',
    desc: '以太坊生态、开发与应用必备资源导航站',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    icon: 'Ξ'
  },
  {
    domain: 'gxs.ngy123.com',
    url: 'https://gxs.ngy123.com',
    title: '高晓松资源下载',
    desc: '晓说、晓松奇谈与高晓松脱口秀节目高清合集',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    icon: '🎙️'
  },
  {
    domain: 'btczy.ngy123.com',
    url: 'https://btczy.ngy123.com',
    title: '比特币资源下载站',
    desc: '白皮书、全节点客户端、电子书与学习工具',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    icon: '⚡'
  },
  {
    domain: 'binance.ngy123.com',
    url: 'https://binance.ngy123.com',
    title: '币安Binance导航/资源',
    desc: '全球第一加密交易所入口与极速下载导航',
    badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    icon: '🟡'
  },
  {
    domain: 'okx.ngy123.com',
    url: 'https://okx.ngy123.com',
    title: '欧易OKX导航/资源',
    desc: '欧易 OKX Web3 钱包与数字资产管理入口',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    icon: '⬛'
  },
  {
    domain: 'tianya.ngy123.com',
    url: 'https://tianya.ngy123.com',
    title: '天涯神贴分享站',
    desc: '收录经典天涯蓬莱神贴、人文历史与爆帖合集',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    icon: '📜'
  },
  {
    domain: 'xuexi.ngy123.com',
    url: 'https://xuexi.ngy123.com',
    title: '中小学学习资料网',
    desc: 'K12 阶段全科课件、试卷、讲义与学习资料下载',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    icon: '📚'
  }
];

export const Footer: React.FC<FooterProps> = ({ totalCount, totalSizeGB }) => {
  return (
    <footer className="mt-16 bg-slate-950 border-t border-slate-800 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-900/60 rounded-2xl border border-slate-800/80 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">{totalCount}+</div>
            <div className="text-xs text-slate-400 mt-1">收录精选影视</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">
              {Math.round(totalSizeGB)}+ GB
            </div>
            <div className="text-xs text-slate-400 mt-1">4K/REMUX总容量</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">100%</div>
            <div className="text-xs text-slate-400 mt-1">夸克网盘极速源</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">24/7</div>
            <div className="text-xs text-slate-400 mt-1">一键淘口令支持</div>
          </div>
        </div>

        {/* Brand Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800/80 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Film className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-white flex flex-wrap items-center gap-2">
                电影资源站
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  dy.ngy123.com
                </span>
                <a
                  href="https://www.wangpan8.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-amber-300 bg-amber-950/80 hover:bg-amber-900/80 px-2 py-0.5 rounded-lg border border-amber-500/50 flex items-center gap-1 transition-colors shadow-sm"
                  title="访问官方主站：网盘吧"
                >
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>官方主站：www.wangpan8.com</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                专为影迷打造的高清夸克网盘电影、剧集、短剧与蓝光原盘免费分享平台（主站：网盘吧）
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              免夸克VIP在线云播
            </span>
            <span className="flex items-center gap-1">
              <HardDrive className="w-4 h-4 text-cyan-400" />
              无损原盘杜比视界
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Gemini AI智能搜片
            </span>
          </div>
        </div>

        {/* Friendly Links & Sister Sites Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Link2 className="w-4 h-4 text-cyan-400" />
              友情链接 / 兄弟站点导航
            </h3>
            <span className="text-xs text-slate-500">网络矩阵 · 优质资源直达</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {FRIENDLY_LINKS.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-3.5 rounded-2xl transition-all duration-200 flex items-start gap-3 shadow-sm cursor-pointer ${
                  (link as any).isMain
                    ? 'bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 hover:from-amber-950/50 hover:to-slate-900 border border-amber-500/50 hover:border-amber-400 ring-1 ring-amber-500/20 shadow-amber-500/5'
                    : 'bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/50 hover:shadow-cyan-500/5'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center text-base shrink-0 transition-colors ${
                    (link as any).isMain
                      ? 'bg-amber-950/60 border-amber-500/40 group-hover:border-amber-400 text-amber-300'
                      : 'bg-slate-950 border-slate-800 group-hover:border-cyan-500/40'
                  }`}
                >
                  {link.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4
                      className={`text-xs font-bold transition-colors truncate flex items-center gap-1 ${
                        (link as any).isMain
                          ? 'text-amber-200 group-hover:text-amber-100'
                          : 'text-slate-100 group-hover:text-cyan-300'
                      }`}
                    >
                      {link.title}
                      <ExternalLink
                        className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ${
                          (link as any).isMain ? 'text-amber-400' : 'text-cyan-400'
                        }`}
                      />
                    </h4>
                    {link.rankBadge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded border font-mono font-bold shrink-0 ${link.badgeColor}`}>
                        {link.rankBadge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug line-clamp-1">
                    {link.desc}
                  </p>
                  <span
                    className={`text-[10px] font-mono mt-1 block ${
                      (link as any).isMain
                        ? 'text-amber-400/90 group-hover:text-amber-300 font-semibold'
                        : 'text-cyan-500/80 group-hover:text-cyan-400'
                    }`}
                  >
                    {link.domain}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 border-t border-slate-800/80 text-xs text-slate-500 leading-relaxed text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="max-w-3xl">
            本站域名为 <strong>dy.ngy123.com</strong> (电影资源分站)，官方主站为{' '}
            <a
              href="https://www.wangpan8.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 underline font-semibold transition-colors"
            >
              www.wangpan8.com (网盘吧)
            </a>
            。本站所有影视资源均采集自互联网个人或夸克网盘用户共享链接，仅供学习交流与个人收藏使用。网站本身不直接存储任何影视视频文件。版权归原电影公司或制片方所有。
          </p>
          <p className="shrink-0 font-mono">
            © {new Date().getFullYear()} dy.ngy123.com All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
