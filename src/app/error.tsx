"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <section className="hero" role="alert"><h1>暂时无法加载</h1><p>请稍后重试。</p><button className="button" onClick={reset}>重试</button></section>;
}
