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

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue>({
  language: "zh",
  setLanguage: () => {},
});
let inMemoryLanguage: Language = "zh";
let hasUnsavedLanguagePreference = false;

function getLanguageSnapshot(): Language {
  if (hasUnsavedLanguagePreference) {
    return inMemoryLanguage;
  }

  try {
    const storedLanguage = window.localStorage.getItem(languageStorageKey);
    inMemoryLanguage = isLanguage(storedLanguage) ? storedLanguage : "zh";
  } catch {
    return inMemoryLanguage;
  }

  return inMemoryLanguage;
}

function getServerLanguageSnapshot(): Language {
  return "zh";
}

function subscribeToLanguageChange(onChange: () => void) {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === languageStorageKey || event.key === null) {
      hasUnsavedLanguagePreference = false;
      onChange();
    }
  };

  window.addEventListener(languageChangeEvent, onChange);
  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener(languageChangeEvent, onChange);
    window.removeEventListener("storage", handleStorageChange);
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
  const setLanguage = useCallback((nextLanguage: Language) => {
    inMemoryLanguage = nextLanguage;
    try {
      window.localStorage.setItem(languageStorageKey, nextLanguage);
      hasUnsavedLanguagePreference = false;
    } catch {
      // Keep the selection active for this page when storage is unavailable.
      hasUnsavedLanguagePreference = true;
    }

    window.dispatchEvent(new Event(languageChangeEvent));
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = messages[language].pageTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", messages[language].metaDescription);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const { language, setLanguage } = useContext(LanguageContext);

  return useMemo(
    () => ({ language, messages: messages[language], setLanguage }),
    [language, setLanguage],
  );
}
