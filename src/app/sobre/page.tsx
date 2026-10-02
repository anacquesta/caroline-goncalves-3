import type { Metadata } from "next";
import { AboutBoard } from "@/components/boards/AboutBoard";
import { INITIAL_PROFILE } from "@/data/portfolioData";

export const metadata: Metadata = {
  title: "Sobre Caroline Gonçalves — Jornalista, Fotógrafa & Comunicadora",
  description:
    "Biografia, trajetória no Metrópoles, formação em Jornalismo, pós-graduação em Marketing Estratégico Digital e manifesto editorial de Caroline Gonçalves em Brasília.",
  openGraph: {
    title: "Sobre Caroline Gonçalves — Trajetória & Propósito",
    description: "Manifesto: OLHAR. ESCUTAR. CONTAR. Jornalista e Fotógrafa em Brasília — DF.",
  },
};

export default function SobrePage() {
  return (
    <>
      <div className="sr-only">
        <h1>Sobre Caroline Gonçalves</h1>
        <h2>Trajetória e Propósito Profissional</h2>
        <p>{INITIAL_PROFILE.bioIntro}</p>
        <div>
          <h3>Manifesto</h3>
          {INITIAL_PROFILE.manifesto.map((m, i) => (
            <p key={i}>{m}</p>
          ))}
        </div>
      </div>
      <AboutBoard />
    </>
  );
}
