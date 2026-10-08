"use client";

import Link from "next/link";
import { LanguageSwitcher } from "@/features/i18n/language-switcher";
import { useLanguage } from "@/features/i18n/language-provider";

export function LanguageHeader() {
  const { messages } = useLanguage();

  return (
    <>
      <a className="skip-link" href="#main-content">
        {messages.skipToContent}
      </a>
      <header className="site-header">
        <div className="container header-content">
          <nav aria-label={messages.navLabel}>
            <Link className="brand" href="/">
              {messages.pageTitle}
            </Link>
          </nav>
          <LanguageSwitcher />
        </div>
      </header>
    </>
  );
}

export function LanguageFooter() {
  const { messages } = useLanguage();

  return (
    <footer className="container site-footer">
      <span>{messages.footer}</span>
      <span>© 2026 Web App. {messages.copyright}</span>
    </footer>
  );
}
