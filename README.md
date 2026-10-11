# free-router blog

> blog.free-router.com — [free-router.com](https://free-router.com) 的官方博客

基于 [Astro](https://astro.build) 的静态博客，首发文章《如何使用 AI 构建自己的数字资产》。

## 本地开发

```bash
npm install
npm run dev        # 开发服务器 http://localhost:4321
npm run build      # 构建到 dist/
npm run preview    # 预览构建产物
```

## 写新文章

在 `src/content/blog/` 下新建 Markdown 文件即可，frontmatter 示例：

```markdown
---
title: "文章标题"
description: "一句话摘要，用于列表页和 SEO"
pubDate: 2026-10-12
author: Neonity
tags: ["AI", "数字资产"]
draft: false          # true 则不发布
---
```

文件名即 URL slug，例如 `my-post.md` → `/blog/my-post/`。

## 部署到 blog.free-router.com

站点配置已在 `astro.config.mjs` 中固定 `site: 'https://blog.free-router.com'`（影响 canonical、OG 和 RSS 的绝对地址）。

### 方式一：Cloudflare Pages（推荐，免费 + 全球 CDN）

1. 把本仓库推到 GitHub/GitLab。
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git。
3. 构建设置：
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Custom domains → 添加 `blog.free-router.com`。
5. 在 free-router.com 的 DNS 中添加记录：
   - 类型 `CNAME`，名称 `blog`，目标 `<项目名>.pages.dev`（或按 Cloudflare 提示操作，使用 CNAME 锚点）。

### 方式二：Vercel

1. 导入仓库，Framework 选 Astro（自动识别），无需改构建命令。
2. Settings → Domains → 添加 `blog.free-router.com`。
3. 按提示在域名托管商处添加 CNAME：`blog` → `cname.vercel-dns.com`。

### 方式三：自托管 Nginx / Caddy

```bash
npm run build
# 将 dist/ 上传到服务器，例如 /var/www/blog.free-router.com
```

Caddy 示例（自动 HTTPS）：

```
blog.free-router.com {
    root * /var/www/blog.free-router.com
    file_server
    encode gzip
}
```

Nginx 示例：

```nginx
server {
    listen 80;
    server_name blog.free-router.com;
    root /var/www/blog.free-router.com;
    location / { try_files $uri $uri/ /404.html; }
}
```

记得在 DNS 添加 `blog` 的 CNAME/A 记录指向服务器。

## 项目结构

```
├── astro.config.mjs          # 站点配置（site 已设为 blog.free-router.com）
├── public/
│   └── favicon.svg
└── src/
    ├── content.config.ts     # 博客集合 schema
    ├── content/blog/         # Markdown 文章
    ├── layouts/BaseLayout.astro
    ├── pages/
    │   ├── index.astro       # 首页（文章列表）
    │   ├── about.astro       # 关于页
    │   ├── rss.xml.ts        # RSS 订阅
    │   └── blog/[...slug].astro
    └── styles/global.css     # 支持浅色/深色模式
```

## 特性

- 静态生成，零服务端成本
- 中文排版优化，自动适配系统深色模式
- RSS 订阅（`/rss.xml`）
- SEO：canonical、Open Graph 标签
- 代码高亮（Shiki，浅色/深色双主题）
