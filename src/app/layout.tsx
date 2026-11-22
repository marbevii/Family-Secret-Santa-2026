
import "./globals.css";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Amic Invisible 2026 🎄",
  description:
    "Un petit secret, una gran il·lusió. Descobreix a qui faràs somriure aquest Nadal! 🎁",

  openGraph: {
    title: "Amic Invisible 2026 🎄",
    description:
      "Un petit secret, una gran il·lusió. Descobreix a qui faràs somriure aquest Nadal! 🎁",
    type: "website",
    images: [
      {
        url: "/whatsapp-preview.png",
        width: 1200,
        height: 630,
        alt: "Amic Invisible 2026 - Poble nadalenc",
      },
    ],
  },
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
