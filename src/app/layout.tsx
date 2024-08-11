import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

import { cookies } from "next/headers";
import { ThemeMode } from "@/lib/utils/types";
import { THEME_COOKIE_KEY } from "@/lib/utils/variants";

export const metadata: Metadata = {
  title: "なるほど",
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const savedTheme = cookies().get(THEME_COOKIE_KEY);
  const theme = (savedTheme?.value as ThemeMode) ?? "light";

  return (
    <html
      lang="en"
      data-color-mode={theme}
      className="max-w-full-screen overflow-x-clip"
    >
      <body className="bg-background text-copy max-w-full-screen overflow-x-clip px-4">
        <Header initialTheme={theme} />
        {children}
      </body>
    </html>
  );
}
