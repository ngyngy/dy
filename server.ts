import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "dy.ngy123.com Movie Hub" });
  });

  // Server-side Gemini AI Movie Assistant route
  app.post("/api/ai-assistant", async (req, res) => {
    try {
      const { prompt, currentMovies } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({
          error: "API Key Missing",
          message: "Gemini API key is not configured in process.env.GEMINI_API_KEY."
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemPrompt = `你是一个专业的影视资源与找片AI助手，服务于资源分享网站「dy.ngy123.com」(光影资源分享站)。
你的任务是根据用户的提问（如：推荐高分美剧、查找某类型电影、解释画质如4K REMUX与杜比视界区别、求片建议等），提供热情、专业、精准的解答。

站内目前精选热分享的夸克网盘资源包括：
- 老友记 全10季 4K 杜比视界 (830G)
- 蜘蛛侠 10部合集 4K REMUX (359.7G)
- 绝命毒师 全5季 蓝光原盘REMUX
- 黄石 全1-5季 4K高码 (271G)
- 生活大爆炸 全1-12季 1080P REMUX (743G)
- 越狱 全5季 761G REMUX
- 海贼王全集4K高码率
- X战警97 第二季(2026)
- 曼达洛人 4K REMUX, 权力的游戏, 西部世界521G, 兄弟连178G, 花园宝宝等。

回答要求：
1. 态度亲切专业，用排版清晰的Markdown输出（含粗体、列表、建议标签）。
2. 如果用户求片是站内已有的资源，请特别强调“站内已有夸克网盘4K/REMUX高速资源，可一键复制夸克口令或打开夸克APP存盘”。
3. 如果用户询问画质或格式，深入浅出讲解（如 4K REMUX 是蓝光无损原盘抽取、HDR/Dolby Vision色彩等）。
4. 结尾简短提示：“在 dy.ngy123.com 搜索框输入剧名，即可一键复制夸克网盘链接哦！”`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
        }
      });

      res.json({ reply: response.text });
    } catch (err: any) {
      console.error("Gemini Assistant Error:", err);
      res.status(500).json({
        error: "AI Error",
        message: err.message || "Failed to generate AI response."
      });
    }
  });

  // Vite middleware for dev or static serving for prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[dy.ngy123.com] Movie Hub Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
