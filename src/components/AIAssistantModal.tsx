import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, User, Loader2, Lightbulb, Film, HelpCircle } from 'lucide-react';
import { MovieResource } from '../types';

interface AIAssistantModalProps {
  onClose: () => void;
  allMovies: MovieResource[];
}

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

const PRESET_QUESTIONS = [
  '推荐几部站内画质最顶级的4K美剧',
  '解释一下什么是 4K REMUX 和 杜比视界？',
  '有没有评分高于 9.5 的经典神剧合集？',
  '有哪些适合带小孩看的动漫或电影？',
  '老友记和生活大爆炸各自容量有多大？'
];

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  onClose,
  allMovies
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: `你好！我是 **dy.ngy123.com** (电影资源站) 的 **AI 智能影迷与求片助手**。✨\n\n我可以帮你寻找符合胃口的影视作品、解答夸克网盘画质（如 4K REMUX、杜比视界、HDR10）的技术区别，或者根据你的喜好推荐站内优质夸克资源。随时问我吧！`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (questionText?: string) => {
    const query = questionText || input.trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          currentMovies: allMovies.map((m) => ({ title: m.title, quality: m.quality, size: m.size, rating: m.rating }))
        })
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: `抱歉，暂时无法连接到 AI 引擎 (${data.error || '未设置 API Key'})。你可以随时在页面搜索框直接输入影片关键词搜索夸克资源哦！`
          }
        ]);
      }
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `网络请求异常，请检查服务状态。`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-slate-100 flex flex-col h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-indigo-950 via-slate-950 to-cyan-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-600/30 border border-indigo-500/40 rounded-xl text-amber-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                电影资源站 AI 智能找片助手
                <span className="text-[10px] bg-cyan-950 text-cyan-400 font-mono px-2 py-0.5 rounded border border-cyan-800/60">
                  Gemini 2.5
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                专属支持 dy.ngy123.com 的智能搜片与影视推荐
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/60 text-xs sm:text-sm">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-amber-400" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-4 leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-cyan-600 text-white rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-lg'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-slate-400 text-xs pl-11">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              <span>AI 正为您智能分析影视库与解答中...</span>
            </div>
          )}
        </div>

        {/* Preset Prompt Badges */}
        <div className="p-3 bg-slate-950 border-t border-slate-800/80 overflow-x-auto no-scrollbar flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />
          {PRESET_QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              disabled={loading}
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 text-[11px] px-2.5 py-1 rounded-full shrink-0 transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入您想找的影片或任何关于画质规格的提问..."
            className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className={`p-2.5 rounded-xl font-bold transition-all cursor-pointer ${
              loading || !input.trim()
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
