"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { X, MessageSquare, Mail, Send, Check, Phone, ArrowUpRight } from "lucide-react";
import styles from "./SchedulingModal.module.css";

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUBJECT_OPTIONS = [
  { id: "foto", label: "📸 Ensaio Fotográfico / Cobertura", prompt: "Olá, Caroline! Gostaria de conversar sobre um projeto de fotografia/ensaio fotográfico." },
  { id: "jornalismo", label: "📰 Pauta Jornalística / Reportagem", prompt: "Olá, Caroline! Gostaria de propor uma pauta/reportagem jornalística." },
  { id: "social", label: "📱 Estratégia de Mídias Sociais", prompt: "Olá, Caroline! Tenho interesse em consultoria ou produção de conteúdo para redes sociais." },
  { id: "assessoria", label: "💼 Assessoria de Imprensa / Comunicação", prompt: "Olá, Caroline! Gostaria de falar sobre serviços de assessoria de comunicação e mídia." },
  { id: "outro", label: "☕ Reunião Geral / Parceria", prompt: "Olá, Caroline! Gostaria de agendar uma conversa para explorar uma parceria profissional." }
];

export const SchedulingModal: React.FC<SchedulingModalProps> = ({ isOpen, onClose }) => {
  const { profile, playTactileClickSound } = usePortfolio();
  const [selectedSubject, setSelectedSubject] = useState(SUBJECT_OPTIONS[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [customNotes, setCustomNotes] = useState("");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `${selectedSubject.prompt}\n\nMeu nome: ${name || "Não informado"}\nMeu e-mail: ${email || "Não informado"}\n${customNotes ? `Detalhes: ${customNotes}` : ""}`
    );
    return `https://wa.me/${profile.contact.whatsapp}?text=${text}`;
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClickSound();
    const mailtoSubject = encodeURIComponent(`[Agendamento] ${selectedSubject.label} — ${name || "Contato via Portfólio"}`);
    const mailtoBody = encodeURIComponent(
      `Olá, Caroline Gonçalves,\n\nAssunto: ${selectedSubject.label}\nNome: ${name}\nE-mail: ${email}\n\n${customNotes ? `Mensagem:\n${customNotes}\n\n` : ""}Aguardo seu retorno para alinharmos a melhor data e formato de conversa.\n\nAtenciosamente,\n${name || "Contato"}`
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
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.badge}>AGENDAMENTO DIRETO</span>
            <h2 className={styles.title}>VAMOS CONVERSAR?</h2>
            <p className={styles.subtitle}>
              Selecione o assunto do seu interesse e inicie a conversa diretamente pelo WhatsApp ou por e-mail.
            </p>
          </div>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Fechar janela">
            <X size={20} />
          </button>
        </div>

        <div className={styles.bodyGrid}>
          {/* Subject Filter Selector */}
          <div className={styles.subjectSection}>
            <span className={styles.sectionLabel}>01. SELECIONE O ASSUNTO PRINCIPAL</span>
            <div className={styles.subjectList}>
              {SUBJECT_OPTIONS.map((sub) => {
                const active = selectedSubject.id === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => {
                      playTactileClickSound();
                      setSelectedSubject(sub);
                    }}
                    className={`${styles.subjectOption} ${active ? styles.subjectActive : ""}`}
                  >
                    <span className={styles.subjectText}>{sub.label}</span>
                    {active && <span className={styles.checkIndicator}>•</span>}
                  </button>
                );
              })}
            </div>

            {/* Direct WhatsApp Callout */}
            <div className={styles.whatsappCard}>
              <div className={styles.whatsappMeta}>
                <span className={styles.waTag}>RESPOSTA RÁPIDA</span>
                <h3 className={styles.waTitle}>Conversar via WhatsApp</h3>
                <p className={styles.waDesc}>
                  Abrir mensagem pronta no WhatsApp com o filtro selecionado.
                </p>
              </div>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.waButton}
                onClick={playTactileClickSound}
              >
                <MessageSquare size={16} />
                <span>ENVIAR NO WHATSAPP</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Form & Direct Email */}
          <div className={styles.formSection}>
            <span className={styles.sectionLabel}>02. OU ENVIE UMA PROPOSTA POR E-MAIL</span>

            <form onSubmit={handleEmailSubmit} className={styles.emailForm}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Seu Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Amanda Castro"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Seu E-mail Corporativo ou Pessoal</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@dominio.com"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Detalhes ou Mensagem (Opcional)</label>
                <textarea
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Descreva brevemente sua ideia, prazos ou objetivos..."
                  rows={3}
                  className={styles.textarea}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                <Send size={15} />
                <span>ABRIR CLIENTE DE E-MAIL</span>
              </button>
            </form>

            <div className={styles.directContactBar}>
              <div className={styles.contactItem}>
                <Mail size={14} className={styles.contactIcon} />
                <span className={styles.contactText}>{profile.contact.email}</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={styles.copyBtn}
                  title="Copiar e-mail"
                >
                  {copied ? <Check size={13} className={styles.copiedIcon} /> : "COPIAR"}
                </button>
              </div>

              <div className={styles.contactItem}>
                <Phone size={14} className={styles.contactIcon} />
                <span className={styles.contactText}>{profile.contact.whatsappFormatted}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
