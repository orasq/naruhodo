import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

import { cookies } from "next/headers";
import { BookFontSize, ThemeMode } from "@/lib/types/types";
import {
  BOOK_FONT_SIZE_COOKIE_VALUE,
  THEME_COOKIE_KEY,
} from "@/lib/utils/constants";

declare global {
  interface Window {
    kuromojin: any;
  }
}

export const metadata: Metadata = {
  title: { template: "%s | なるほど", default: "なるほど" },
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // get initial theme
  const savedTheme = cookies().get(THEME_COOKIE_KEY);
  const initialTheme = (savedTheme?.value as ThemeMode) ?? "light";

  // get initial font size
  const savedFontSize = cookies().get(BOOK_FONT_SIZE_COOKIE_VALUE);
  const initialFontSize = (savedFontSize?.value as BookFontSize) || "sm";

  return (
    <html
      lang="en"
      data-color-mode={initialTheme}
      data-font-size={initialFontSize}
      className="max-w-full-screen overflow-x-clip"
    >
      <body className="max-w-full-screen bg-background text-copy transition-background relative overflow-x-clip px-6 duration-200">
        <Header initialTheme={initialTheme} />
        <main>{children}</main>
      </body>
    </html>
  );
}
