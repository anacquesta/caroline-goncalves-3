import type { Metadata } from "next";
import { PhotoBoard } from "@/components/boards/PhotoBoard";
import { INITIAL_PHOTOS } from "@/data/portfolioData";

export const metadata: Metadata = {
  title: "Fotografia Autoral & Fotojornalismo — Caroline Gonçalves",
  description:
    "Ensaios fotográficos de arquitetura modernista em Brasília, retratos documentais e cobertura de manifestações sociais e cultura no cerrado.",
  openGraph: {
    title: "Fotografia Autoral & Documental — Caroline Gonçalves",
    description: "Galeria de fotografia de Brasília, retratos e fotojornalismo.",
  },
};

export default function FotografiaPage() {
  return (
    <>
      <div className="sr-only">
        <h1>Fotografia Autoral e Documental — Caroline Gonçalves</h1>
        {INITIAL_PHOTOS.map((photo) => (
          <figure key={photo.id}>
            <figcaption>
              {photo.title} — {photo.location} ({photo.year})
            </figcaption>
            <p>{photo.description}</p>
          </figure>
        ))}
      </div>
      <PhotoBoard />
    </>
  );
}
