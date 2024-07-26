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
    <html lang="en">
      <body style={{ padding: "0 16px" }}>{children}</body>
    </html>
  );
}
