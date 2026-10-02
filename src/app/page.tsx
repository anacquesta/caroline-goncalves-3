import React from "react";
import { INITIAL_PROFILE } from "@/data/portfolioData";
import { HomeBoard } from "@/components/boards/HomeBoard";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: INITIAL_PROFILE.name,
    jobTitle: INITIAL_PROFILE.role,
    worksFor: {
      "@type": "Organization",
      name: INITIAL_PROFILE.currentCompany,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brasília",
      addressRegion: "DF",
      addressCountry: "BR",
    },
    description: INITIAL_PROFILE.bioIntro,
    sameAs: [
      `https://instagram.com/${INITIAL_PROFILE.contact.instagram}`,
      `https://linkedin.com/in/${INITIAL_PROFILE.contact.linkedin}`,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Semantic server render for search crawlers */}
      <div className="sr-only">
        <h1>{INITIAL_PROFILE.name} — Jornalista, Fotógrafa e Comunicadora em Brasília</h1>
        <p>{INITIAL_PROFILE.headline}</p>
        <p>{INITIAL_PROFILE.bioIntro}</p>
      </div>
      <HomeBoard />
    </>
  );
}
