import Link from "next/link";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">跳转到正文</a>
      <header className="site-header"><div className="container"><Link className="brand" href="/">Web 应用</Link></div></header>
      <main id="main-content" className="container main-content" tabIndex={-1}>{children}</main>
      <footer className="container site-footer">为每一块屏幕设计。</footer>
    </>
  );
}
