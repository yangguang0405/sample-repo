export const languages = ["zh", "en"] as const;

export type Language = (typeof languages)[number];

export function isLanguage(value: string | null): value is Language {
  return languages.some((language) => language === value);
}

export const messages = {
  zh: {
    pageTitle: "Web应用",
    navLabel: "主导航",
    languageLabel: "语言",
    metaDescription: "支持桌面与移动端浏览器的全栈 Web 应用。",
    skipToContent: "跳转到正文",
    ready: "准备就绪",
    headline: "从一个好用的基础开始。",
    introduction: "一个适合手机与桌面浏览器的 Web 应用起点。",
    learnBasics: "了解应用基础",
    capabilitiesLabel: "应用基础",
    capabilities: [
      {
        title: "自适应布局",
        description: "从手机到桌面，内容随屏幕宽度自然排列。",
      },
      {
        title: "前后端一体",
        description: "页面与服务端接口使用同一个 Next.js 应用。",
      },
      {
        title: "按业务扩展",
        description: "从这里开始，逐步构建你的产品功能。",
      },
    ],
    footer: "为每一块屏幕设计。",
    copyright: "保留所有权利。",
  },
  en: {
    pageTitle: "Web App",
    navLabel: "Main navigation",
    languageLabel: "Language",
    metaDescription: "A full-stack web app for desktop and mobile browsers.",
    skipToContent: "Skip to content",
    ready: "Ready to go",
    headline: "Start with a solid foundation.",
    introduction:
      "A starting point for web apps on mobile and desktop browsers.",
    learnBasics: "Learn application basics",
    capabilitiesLabel: "Application basics",
    capabilities: [
      {
        title: "Responsive Layout",
        description:
          "Content flows naturally from mobile to desktop screen sizes.",
      },
      {
        title: "Front-end & Back-end Integration",
        description:
          "Pages and server endpoints live within one Next.js application.",
      },
      {
        title: "Business-oriented Scaling",
        description:
          "Start here and build your product features step by step.",
      },
    ],
    footer: "Designed for every screen.",
    copyright: "All rights reserved.",
  },
} satisfies Record<Language, object>;

export const languageStorageKey = "web-lang";
export const languageChangeEvent = "web-language-change";
