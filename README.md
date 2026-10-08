# 全栈 Web 应用

基于 Next.js App Router、React、TypeScript，使用 npm 管理依赖。

## 本地开发

```bash
npm ci
cp .env.example .env.local
npm run dev
```

访问 http://localhost:3000 。健康检查接口：`GET /api/health`。
使用 Node.js 20.19.0 或更高版本（当前锁定的 ESLint 工具链依赖该下限）。
部署时优先使用受支持的 LTS。

## 检查与生产运行

```bash
npm run check
npm run build
npm start
```

这是包含动态服务端接口的应用，部署目标需要 Node.js 或支持 Next.js
服务端运行时的平台。生产环境使用 HTTPS。

## 目录结构

```text
src/
  app/                 页面、布局、加载/错误状态与 HTTP 路由
    api/health/        服务存活检查（不检查数据库等外部依赖）
  components/layout/   跨页面布局组件
  features/            按业务组织的模块
  lib/                 浏览器和服务端共享的纯工具
  server/              服务端专用逻辑，使用 server-only 防止进入客户端
public/                静态资源
docs/agents/           已配置的任务跟踪与领域文档规则
```

默认使用 Server Components。需要交互或浏览器 API 的小范围组件才添加
`"use client"`。Route Handlers 负责 HTTP 输入和响应，业务逻辑放入对应模块。
未来的写入接口需在服务端校验输入、身份和权限。

密钥放在 `.env.local` 或部署平台环境变量中；`NEXT_PUBLIC_` 变量会暴露到
浏览器。`.env.example` 仅记录变量名和不敏感示例。

## 移动端基线

目标为 Chrome 111+、Safari 16.4+（含 iOS Safari），详见
[Next.js 浏览器支持](https://nextjs.org/docs/app/getting-started/installation#supported-browsers)。
布局从窄屏开始：单列卡片在 768px 以上变为三列；使用安全区域内边距、
动态视口高度（含 vh 回退）、至少 48px 的主要操作按钮，允许页面缩放。
使用系统字体，无构建时远程字体依赖。

发布前检查 320px/390px/768px/桌面宽度、横屏、缩放、键盘导航和真实手机
软键盘。WebKit 自动化可作为回归检查，不能替代真实 iOS Safari 测试。

数据库、认证、文件存储和具体业务尚未接入；按产品需求添加。

## 工具链维护

TypeScript 固定在 6.0 系列，ESLint 使用 9 系列，以匹配当前
eslint-config-next 及其插件的兼容范围。ESLint 9 已被上游标记为停止支持；
待相关插件支持 ESLint 10 后一并升级。

初始化时 npm audit 报告 5 条开发依赖高危告警，来自
eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces
依赖链（GHSA-vfj7-8cjw-p6xm）。当前自动修复方案会降级 Next.js lint 配置，
因此未执行强制修复；升级工具链时重新检查。生产依赖审计单独使用
`npm audit --omit=dev`。
