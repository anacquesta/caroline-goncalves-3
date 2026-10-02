"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  Mail,
  MessageSquare,
  MapPin,
  RotateCcw,
  Send,
  CheckCircle,
  ArrowUpRight,
  Calendar
} from "lucide-react";
import styles from "./ContactBoard.module.css";

const InstagramIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


export const ContactBoard: React.FC = () => {
  const router = useRouter();
  const { profile, playTactileClickSound, playPageGlideSound } = usePortfolio();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("Pauta / Jornalismo");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClickSound();
    const mailtoSubject = encodeURIComponent(`[Contato] ${interest} — ${name}`);
    const mailtoBody = encodeURIComponent(
      `Nome: ${name}\nE-mail: ${email}\nInteresse: ${interest}\n\nMensagem:\n${message}`
    );
    window.location.href = `mailto:${profile.contact.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleReturnToStart = () => {
    playTactileClickSound();
    playPageGlideSound();
    router.push("/");
  };

  const whatsAppUrl = `https://wa.me/${profile.contact.whatsapp}?text=${encodeURIComponent(
    "Olá, Caroline! Encontrei seu portfólio digital e gostaria de conversar sobre uma oportunidade/projeto."
  )}`;

  return (
    <div className={styles.container}>
      <div className={styles.innerScroll}>
        <div className={styles.boardCard}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <span className={styles.badge}>08 / CONTATO DIRETO & CONEXÃO</span>
              <span className={styles.metaLoc}>{profile.contact.locationDetailed}</span>
            </div>

            <button onClick={handleReturnToStart} className={styles.loopBackTopBtn}>
              <RotateCcw size={14} />
              <span>VOLTAR AO INÍCIO (CAPA)</span>
            </button>
          </div>

          {/* Main Grid */}
          <div className={styles.contactGrid}>
            {/* Left Col: Giant Title & Direct Channels */}
            <div className={styles.infoCol}>
              <div className={styles.titleBlock}>
                <h1 className={styles.giantTitle}>
                  VAMOS
                  <br />
                  CONVERSAR?
                </h1>
                <p className={styles.titleSub}>
                  Estou disponível para reportagens investigativas, coberturas em tempo real, ensaios fotográficos documentais, consultoria em mídias sociais e projetos de comunicação institucional.
                </p>
              </div>

              {/* Direct Channels */}
              <div className={styles.channelsList}>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.channelCard}
                  onClick={playTactileClickSound}
                >
                  <div className={styles.channelIcon}>
                    <MessageSquare size={18} />
                  </div>
                  <div className={styles.channelMeta}>
                    <span className={styles.channelType}>WHATSAPP DIRETO</span>
                    <span className={styles.channelVal}>{profile.contact.whatsappFormatted}</span>
                  </div>
                  <ArrowUpRight size={15} className={styles.arrowIcon} />
                </a>

                <a
                  href={`mailto:${profile.contact.email}`}
                  className={styles.channelCard}
                  onClick={playTactileClickSound}
                >
                  <div className={styles.channelIcon}>
                    <Mail size={18} />
                  </div>
                  <div className={styles.channelMeta}>
                    <span className={styles.channelType}>E-MAIL PROFISSIONAL</span>
                    <span className={styles.channelVal}>{profile.contact.email}</span>
                  </div>
                  <ArrowUpRight size={15} className={styles.arrowIcon} />
                </a>

                <div className={styles.socialRow}>
                  <a
                    href={`https://instagram.com/${profile.contact.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                    onClick={playTactileClickSound}
                  >
                    <InstagramIcon size={15} />
                    <span>INSTAGRAM</span>
                  </a>

                  <a
                    href={`https://linkedin.com/in/${profile.contact.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                    onClick={playTactileClickSound}
                  >
                    <LinkedinIcon size={15} />
                    <span>LINKEDIN</span>
                  </a>
                </div>

              </div>

              <div className={styles.loopBackBox}>
                <button onClick={handleReturnToStart} className={styles.loopBackBtn}>
                  <RotateCcw size={15} />
                  <span>VOLTAR AO INÍCIO DA PUBLICAÇÃO</span>
                </button>
              </div>
            </div>

            {/* Right Col: Editorial Form */}
            <div className={styles.formCol}>
              <div className={styles.formHeader}>
                <span className={styles.formBadge}>FORMULÁRIO DE BRIEFING</span>
                <h3 className={styles.formTitle}>Envie uma Mensagem</h3>
              </div>

              {submitted ? (
                <div className={styles.successBox}>
                  <CheckCircle size={32} className={styles.successIcon} />
                  <h4 className={styles.successTitle}>Mensagem Encaminhada!</h4>
                  <p className={styles.successDesc}>
                    Seu cliente de e-mail foi aberto com os dados preenchidos. Entrarei em contato o mais breve possível.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>SEU NOME OU ORGANIZAÇÃO</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Amanda Castro / Agência Sol"
                      required
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>SEU E-MAIL PARA RETORNO</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="amanda@exemplo.com.br"
                      required
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>ÁREA DE INTERESSE</label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className={styles.select}
                    >
                      <option value="Pauta / Jornalismo">Pauta / Jornalismo / Reportagem</option>
                      <option value="Ensaio Fotográfico">Ensaio Fotográfico / Cobertura</option>
                      <option value="Estratégia de Redes">Estratégia de Mídias Sociais</option>
                      <option value="Assessoria de Imprensa">Assessoria de Imprensa</option>
                      <option value="Outro Projeto">Outro Projeto / Café Profissional</option>
                    </select>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>MENSAGEM OU DETALHES DA PAUTA</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Descreva brevemente prazos, objetivos ou contexto..."
                      required
                      className={styles.textarea}
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    <Send size={15} />
                    <span>ENVIAR PROPOSTA POR E-MAIL</span>
                  </button>
                </form>
              )}

              <div className={styles.locationFooter}>
                <MapPin size={13} className={styles.pinIcon} />
                <span>Baseada em Brasília — DF • Atendimento Presencial e Remoto para todo o Brasil</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
