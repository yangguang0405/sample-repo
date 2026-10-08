"use client";

import { useLanguage } from "@/features/i18n/language-provider";

export function HomeContent() {
  const { messages } = useLanguage();

  return (
    <>
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">{messages.ready}</p>
        <h1 id="page-title">{messages.headline}</h1>
        <p className="lead">{messages.introduction}</p>
        <a className="button" href="#capabilities">
          {messages.learnBasics} <span aria-hidden="true">↓</span>
        </a>
      </section>
      <section
        id="capabilities"
        className="card-grid"
        aria-label={messages.capabilitiesLabel}
      >
        {messages.capabilities.map(({ title, description }) => (
          <article className="card" key={title}>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </section>
    </>
  );
}
