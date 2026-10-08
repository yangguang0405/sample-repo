"use client";

import { useLanguage } from "@/features/i18n/language-provider";

export default function Loading() {
  const { messages } = useLanguage();

  return <p role="status">{messages.loading}</p>;
}
