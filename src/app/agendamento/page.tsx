"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePortfolio } from "@/context/PortfolioContext";
import { ArrowLeft, MessageSquare, Mail, Send, Check, Phone, ArrowUpRight } from "lucide-react";
import styles from "./agendamento.module.css";

const SUBJECTS = [
  { id: "foto", label: "📸 Ensaio Fotográfico / Cobertura", prompt: "Olá, Caroline! Gostaria de falar sobre um projeto de fotografia/ensaio fotográfico." },
  { id: "jornalismo", label: "📰 Pauta Jornalística / Reportagem", prompt: "Olá, Caroline! Gostaria de propor uma pauta ou cobertura jornalística." },
  { id: "social", label: "📱 Estratégia de Mídias Sociais / Redes", prompt: "Olá, Caroline! Tenho interesse em consultoria de conteúdo para redes sociais." },
  { id: "assessoria", label: "💼 Assessoria de Imprensa / Comunicação", prompt: "Olá, Caroline! Gostaria de falar sobre assessoria de imprensa e comunicação." },
  { id: "outro", label: "☕ Reunião / Parceria Profissional", prompt: "Olá, Caroline! Gostaria de agendar uma reunião para alinharmos um projeto." }
];

export default function AgendamentoPage() {
  const router = useRouter();
  const { profile, playTactileClickSound } = usePortfolio();
  const [selectedSub, setSelectedSub] = useState(SUBJECTS[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [copied, setCopied] = useState(false);

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `${selectedSub.prompt}\n\nMeu nome: ${name || "Não informado"}\nMeu e-mail: ${email || "Não informado"}\n${details ? `Detalhes: ${details}` : ""}`
    );
    return `https://wa.me/${profile.contact.whatsapp}?text=${text}`;
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClickSound();
    const mailtoSubject = encodeURIComponent(`[Agendamento] ${selectedSub.label} — ${name}`);
    const mailtoBody = encodeURIComponent(
      `Olá, Caroline Gonçalves,\n\nAssunto: ${selectedSub.label}\nNome: ${name}\nE-mail: ${email}\n\nDetalhes:\n${details}\n\nAguardo seu retorno.\n\nAtenciosamente,\n${name}`
    );
    window.location.href = `mailto:${profile.contact.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  const handleCopyEmail = () => {
    playTactileClickSound();
    navigator.clipboard.writeText(profile.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className={styles.pageWrap}>
      <div className={styles.card}>
        <div className={styles.topNav}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>VOLTAR AO PORTFÓLIO EDITORIAL</span>
          </Link>
          <span className={styles.editionTag}>{profile.edition}</span>
        </div>

        <div className={styles.header}>
          <span className={styles.badge}>CONEXÃO DIRETA</span>
          <h1 className={styles.title}>AGENDAR CONVERSA</h1>
          <p className={styles.subtitle}>
            Selecione o assunto do seu interesse abaixo para abrir uma conversa imediata pelo WhatsApp ou enviar um e-mail estruturado.
          </p>
        </div>

        <div className={styles.grid}>
          {/* WhatsApp Subject selector */}
          <div className={styles.col}>
            <span className={styles.colTitle}>01. ESCOLHA O ASSUNTO (FILTRO)</span>
            <div className={styles.subjects}>
              {SUBJECTS.map((sub) => {
                const active = selectedSub.id === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => {
                      playTactileClickSound();
                      setSelectedSub(sub);
                    }}
                    className={`${styles.subBtn} ${active ? styles.subActive : ""}`}
                  >
                    <span>{sub.label}</span>
                    {active && <span className={styles.dot}>•</span>}
                  </button>
                );
              })}
            </div>

            <div className={styles.waCallout}>
              <span className={styles.waBadge}>MENSAGEM INSTANTÂNEA</span>
              <h3 className={styles.waHeading}>Conversar pelo WhatsApp</h3>
              <p className={styles.waText}>
                O link já inclui a mensagem personalizada com o assunto selecionado.
              </p>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.waButton}
              >
                <MessageSquare size={16} />
                <span>INICIAR CONVERSA NO WHATSAPP</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Email form */}
          <div className={styles.col}>
            <span className={styles.colTitle}>02. OU ENVIE BRIEFING POR E-MAIL</span>
            <form onSubmit={handleEmailSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>SEU NOME COMPLETO</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Beatriz Albuquerque"
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>SEU E-MAIL PROFISSIONAL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="beatriz@empresa.com"
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>MENSAGEM / PRAZOS / DETALHES</label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Conte um pouco sobre suas expectativas..."
                  rows={4}
                  className={styles.textarea}
                />
              </div>

              <button type="submit" className={styles.emailBtn}>
                <Send size={15} />
                <span>ENVIAR PROPOSTA POR E-MAIL</span>
              </button>
            </form>

            <div className={styles.directMeta}>
              <div className={styles.contactRow}>
                <Mail size={14} className={styles.iconGold} />
                <span>{profile.contact.email}</span>
                <button onClick={handleCopyEmail} className={styles.copyBtn}>
                  {copied ? <Check size={12} className={styles.copyCheck} /> : "COPIAR"}
                </button>
              </div>

              <div className={styles.contactRow}>
                <Phone size={14} className={styles.iconGold} />
                <span>{profile.contact.whatsappFormatted}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
