import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amic Invisible 🎁",
  description: "Descobreix el teu amic invisible!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca">
      <body>{children}</body>
    </html>
  );
}
