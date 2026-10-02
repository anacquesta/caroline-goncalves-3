import type { Metadata } from "next";
import { TestimonialsBoard } from "@/components/boards/TestimonialsBoard";
import { INITIAL_TESTIMONIALS } from "@/data/portfolioData";

export const metadata: Metadata = {
  title: "Depoimentos & Recomendações — Caroline Gonçalves",
  description:
    "Avaliações e recomendações editoriais de editores do Metrópoles, coordenadores de comunicação e curadores sobre o trabalho de Caroline Gonçalves.",
  openGraph: {
    title: "Depoimentos sobre Caroline Gonçalves — O que as pessoas dizem",
    description: "Recomendações e depoimentos de editores e colegas de profissão.",
  },
};

export default function DepoimentosPage() {
  return (
    <>
      <div className="sr-only">
        <h1>Depoimentos e Recomendações Profissionais — Caroline Gonçalves</h1>
        {INITIAL_TESTIMONIALS.map((t) => (
          <blockquote key={t.id}>
            <p>“{t.quote}”</p>
            <cite>— {t.author}, {t.role} ({t.organization})</cite>
          </blockquote>
        ))}
      </div>
      <TestimonialsBoard />
    </>
  );
}
