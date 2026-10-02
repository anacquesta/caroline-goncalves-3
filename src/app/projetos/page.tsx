import type { Metadata } from "next";
import { ProjectsBoard } from "@/components/boards/ProjectsBoard";
import { INITIAL_PROJECTS } from "@/data/portfolioData";

export const metadata: Metadata = {
  title: "Projetos de Comunicação & Estratégia Digital — Caroline Gonçalves",
  description:
    "Estratégia de conteúdo transmídia, gestão de mídias sociais no Metrópoles, branding para lideranças e campanhas de cidadania.",
  openGraph: {
    title: "Projetos de Comunicação & Redes — Caroline Gonçalves",
    description: "Estudos de caso em mídias digitais, assessoria e redação em tempo real.",
  },
};

export default function ProjetosPage() {
  return (
    <>
      <div className="sr-only">
        <h1>Projetos Especiais de Comunicação e Redes — Caroline Gonçalves</h1>
        {INITIAL_PROJECTS.map((proj) => (
          <section key={proj.id}>
            <h2>{proj.title}</h2>
            <p>Cliente: {proj.client} ({proj.year})</p>
            <p>{proj.summary}</p>
            <p>Resultados: {proj.results}</p>
          </section>
        ))}
      </div>
      <ProjectsBoard />
    </>
  );
}
