
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
        url: "/christmas-village.png?v=3",
        width: 1536,
        height: 1024,
        alt: "Poble nadalenc de l'Amic Invisible 2026",
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
