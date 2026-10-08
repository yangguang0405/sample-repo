"use client";

import { useLanguage } from "./language-provider";

export function LanguageSwitcher() {
  const { language, messages, setLanguage } = useLanguage();

  return (
    <div className="language-switch" role="group" aria-label={messages.languageLabel}>
      <button
        className="language-button"
        type="button"
        aria-pressed={language === "zh"}
        onClick={() => setLanguage("zh")}
      >
        中文
      </button>
      <button
        className="language-button"
        type="button"
        aria-pressed={language === "en"}
        onClick={() => setLanguage("en")}
      >
        English
      </button>
    </div>
  );
}
