import type { Metadata } from "next";
import { JournalismBoard } from "@/components/boards/JournalismBoard";
import { INITIAL_JOURNALISM } from "@/data/portfolioData";

export const metadata: Metadata = {
  title: "Jornalismo & Reportagens — Caroline Gonçalves | Metrópoles",
  description:
    "Reportagens investigativas, cobertura em tempo real nos corredores do poder e matérias sobre direitos humanos e cultura em Brasília.",
  openGraph: {
    title: "Jornalismo & Grandes Reportagens — Caroline Gonçalves",
    description: "Coberturas de política, direitos sociais e cultura no Metrópoles.",
  },
};

export default function JornalismoPage() {
  return (
    <>
      <div className="sr-only">
        <h1>Jornalismo e Grandes Reportagens — Caroline Gonçalves</h1>
        {INITIAL_JOURNALISM.map((item) => (
          <article key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.subtitle}</p>
            <p>{item.summary}</p>
          </article>
        ))}
      </div>
      <JournalismBoard />
    </>
  );
}
