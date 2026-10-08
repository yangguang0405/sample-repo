"use client";

import Link from "next/link";
import { useLanguage } from "@/features/i18n/language-provider";

export default function NotFound() {
  const { messages } = useLanguage();

  return (
    <section className="hero">
      <h1>{messages.notFoundTitle}</h1>
      <p>{messages.notFoundDescription}</p>
      <Link className="button" href="/">
        {messages.goHome}
      </Link>
    </section>
  );
}
