"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  isLanguage,
  languageChangeEvent,
  languageStorageKey,
  messages,
  type Language,
} from "./language";

const LanguageContext = createContext<Language>("zh");
let inMemoryLanguage: Language = "zh";

function getLanguageSnapshot(): Language {
  try {
    const storedLanguage = window.localStorage.getItem(languageStorageKey);
    if (isLanguage(storedLanguage)) {
      inMemoryLanguage = storedLanguage;
    } else {
      inMemoryLanguage = "zh";
    }
  } catch {
    return inMemoryLanguage;
  }

  return inMemoryLanguage;
}

function getServerLanguageSnapshot(): Language {
  return "zh";
}

function subscribeToLanguageChange(onChange: () => void) {
  window.addEventListener(languageChangeEvent, onChange);
  window.addEventListener("storage", onChange);

  return () => {
    window.removeEventListener(languageChangeEvent, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function LanguageProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const language = useSyncExternalStore(
    subscribeToLanguageChange,
    getLanguageSnapshot,
    getServerLanguageSnapshot,
  );

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = messages[language].pageTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", messages[language].metaDescription);
  }, [language]);

  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const language = useContext(LanguageContext);
  const setLanguage = useCallback((nextLanguage: Language) => {
    inMemoryLanguage = nextLanguage;
    try {
      window.localStorage.setItem(languageStorageKey, nextLanguage);
    } catch {
      // Keep the selection active for this page when storage is unavailable.
    }

    window.dispatchEvent(new Event(languageChangeEvent));
  }, []);

  return useMemo(
    () => ({ language, messages: messages[language], setLanguage }),
    [language, setLanguage],
  );
}
