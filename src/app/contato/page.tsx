import type { Metadata } from "next";
import { ContactBoard } from "@/components/boards/ContactBoard";
import { INITIAL_PROFILE } from "@/data/portfolioData";

export const metadata: Metadata = {
  title: "Contato & Agendamento — Caroline Gonçalves | Brasília — DF",
  description:
    "Entre em contato direto com Caroline Gonçalves via WhatsApp ou e-mail para pautas, reportagens, ensaios fotográficos e consultoria de mídias.",
  openGraph: {
    title: "Vamos Conversar? Contato com Caroline Gonçalves",
    description: "WhatsApp, E-mail, Redes Sociais e formulário de proposta.",
  },
};

export default function ContatoPage() {
  return (
    <>
      <div className="sr-only">
        <h1>Vamos Conversar? Contato com Caroline Gonçalves</h1>
        <p>E-mail: {INITIAL_PROFILE.contact.email}</p>
        <p>WhatsApp: {INITIAL_PROFILE.contact.whatsappFormatted}</p>
        <p>Localização: {INITIAL_PROFILE.contact.locationDetailed}</p>
      </div>
      <ContactBoard />
    </>
  );
}
