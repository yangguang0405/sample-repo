import type { Metadata, Viewport } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { LanguageProvider } from "@/features/i18n/language-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Web 应用", template: "%s | Web 应用" },
  description: "支持桌面与移动端浏览器的全栈 Web 应用。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f5f7fb",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <LanguageProvider>
          <AppShell>{children}</AppShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
