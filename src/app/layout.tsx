import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { EditorialLayoutShell } from "@/components/EditorialLayoutShell";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Caroline Gonçalves — Jornalista, Fotógrafa & Comunicadora | Brasília — DF",
  description:
    "Portfólio editorial digital de Caroline Gonçalves. Repórter de Redes Sociais no Metrópoles, fotógrafa documental e estrategista de comunicação digital em Brasília — DF.",
  keywords: [
    "Caroline Gonçalves",
    "Jornalista Brasília",
    "Metrópoles",
    "Fotógrafa Brasília",
    "Fotojornalismo",
    "Comunicação Estratégica",
    "Mídias Sociais",
    "Reportagem Política",
    "Portfólio Editorial"
  ],
  authors: [{ name: "Caroline Gonçalves" }],
  creator: "Caroline Gonçalves",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://carolinegoncalves.com.br",
    title: "Caroline Gonçalves — Portfólio Editorial Digital",
    description:
      "Navegação horizontal em formato de publicação editorial. Jornalismo, Fotografia e Estratégia de Conteúdo por Caroline Gonçalves.",
    siteName: "Caroline Gonçalves Portfólio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1400&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Caroline Gonçalves — Portfólio Editorial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Caroline Gonçalves — Jornalista & Fotógrafa",
    description:
      "Portfólio digital editorial de Caroline Gonçalves. Repórter no Metrópoles e fotógrafa documental.",
    images: ["https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1400&auto=format&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${jakartaSans.variable} ${spaceGrotesk.variable} ${newsreader.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#F5F3EE" />
      </head>
      <body>
        <PortfolioProvider>
          <EditorialLayoutShell>{children}</EditorialLayoutShell>
        </PortfolioProvider>
      </body>
    </html>
  );
}

