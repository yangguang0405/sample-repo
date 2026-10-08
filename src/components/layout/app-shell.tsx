import { LanguageFooter, LanguageHeader } from "./language-chrome";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LanguageHeader />
      <main id="main-content" className="container main-content" tabIndex={-1}>
        {children}
      </main>
      <LanguageFooter />
    </>
  );
}
