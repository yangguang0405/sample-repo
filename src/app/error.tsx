"use client";

import { useLanguage } from "@/features/i18n/language-provider";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { messages } = useLanguage();

  return (
    <section className="hero" role="alert">
      <h1>{messages.errorTitle}</h1>
      <p>{messages.errorDescription}</p>
      <button className="button" onClick={reset}>
        {messages.retry}
      </button>
    </section>
  );
}
