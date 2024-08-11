import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "なるほど",
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-color-mode="dark"
      className="max-w-full-screen overflow-x-clip"
    >
      <body className="bg-background text-copy max-w-full-screen overflow-x-clip px-4">
        {children}
      </body>
    </html>
  );
}
