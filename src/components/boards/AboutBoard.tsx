"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePortfolio } from "@/context/PortfolioContext";
import { ArrowRight, Download, CheckCircle, GraduationCap, Award, Briefcase } from "lucide-react";
import styles from "./AboutBoard.module.css";

export const AboutBoard: React.FC = () => {
  const router = useRouter();
  const { profile, playTactileClickSound, playPageGlideSound } = usePortfolio();

  const handleNextPage = () => {
    playTactileClickSound();
    playPageGlideSound();
    router.push("/jornalismo");
  };

  const handleDownloadCv = () => {
    playTactileClickSound();
    alert("Currículo de Caroline Gonçalves: Formação em Comunicação Social - Jornalismo, Pós em Marketing Estratégico Digital, Repórter Metrópoles. Arquivo PDF disponível para download sob solicitação.");
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerScroll}>
        <div className={styles.boardGrid}>
          {/* Column 1: Editorial Portrait & Quick Facts */}
          <div className={styles.photoCol}>
            <div className={styles.portraitFrame}>
              <Image
                src="/images/caroline.png"
                alt="Caroline Gonçalves - Retrato Profissional"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 30vw"
                className={styles.portraitImg}
              />
              <div className={styles.portraitCaption}>
                <span className={styles.pNum}>02</span>
                <span className={styles.pRole}>CAROLINE GONÇALVES</span>
              </div>
            </div>

            <div className={styles.credentialsCard}>
              <div className={styles.credItem}>
                <Briefcase size={14} className={styles.credIcon} />
                <div>
                  <span className={styles.credLabel}>CARGO ATUAL</span>
                  <p className={styles.credVal}>{profile.subRole}</p>
                </div>
              </div>
              <div className={styles.credItem}>
                <GraduationCap size={14} className={styles.credIcon} />
                <div>
                  <span className={styles.credLabel}>GRADUAÇÃO</span>
                  <p className={styles.credVal}>{profile.education}</p>
                </div>
              </div>
              <div className={styles.credItem}>
                <Award size={14} className={styles.credIcon} />
                <div>
                  <span className={styles.credLabel}>PÓS-GRADUAÇÃO</span>
                  <p className={styles.credVal}>{profile.postGrad}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Biography, Trajectory & Skills */}
          <div className={styles.bioCol}>
            <div className={styles.sectionHeader}>
              <span className={styles.badge}>02 / SOBRE A PROFISSIONAL</span>
              <h2 className={styles.pageTitle}>TRAJETÓRIA & PROPÓSITO</h2>
            </div>

            <div className={styles.bioParagraphs}>
              {profile.bioFull.map((paragraph, idx) => (
                <p key={idx} className={styles.bioText}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Skills Triple Column */}
            <div className={styles.skillsSection}>
              <span className={styles.skillsTitle}>COMPETÊNCIAS & ÁREAS DE DOMÍNIO</span>
              <div className={styles.skillsGrid}>
                <div className={styles.skillBox}>
                  <h4 className={styles.skillBoxTitle}>JORNALISMO</h4>
                  <ul className={styles.skillList}>
                    {profile.skills.jornalismo.map((sk, i) => (
                      <li key={i}>
                        <CheckCircle size={11} />
                        <span>{sk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.skillBox}>
                  <h4 className={styles.skillBoxTitle}>FOTOGRAFIA</h4>
                  <ul className={styles.skillList}>
                    {profile.skills.fotografia.map((sk, i) => (
                      <li key={i}>
                        <CheckCircle size={11} />
                        <span>{sk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.skillBox}>
                  <h4 className={styles.skillBoxTitle}>ESTRATÉGIA</h4>
                  <ul className={styles.skillList}>
                    {profile.skills.estrategia.map((sk, i) => (
                      <li key={i}>
                        <CheckCircle size={11} />
                        <span>{sk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.actionRow}>
              <button onClick={handleDownloadCv} className={styles.cvButton}>
                <Download size={14} />
                <span>SOLICITAR CURRÍCULO COMPLETO</span>
              </button>

              <button onClick={handleNextPage} className={styles.nextBoardBtn}>
                <span>IR PARA JORNALISMO</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Column 3: Manifesto Triad "OLHAR. ESCUTAR. CONTAR." */}
          <div className={styles.manifestoCol}>
            <div className={styles.manifestoHeader}>
              <span className={styles.manifestoTag}>MANIFESTO EDITORIAL</span>
              <span className={styles.manifestoYear}>2026</span>
            </div>

            <div className={styles.triadContainer}>
              <div className={styles.triadItem}>
                <span className={styles.triadWord}>OLHAR.</span>
                <p className={styles.triadDesc}>
                  Enxergar as camadas sutis além do óbvio. Captar a verdade nas expressões e o impacto no detalhe.
                </p>
              </div>

              <div className={styles.triadItem}>
                <span className={styles.triadWord}>ESCUTAR.</span>
                <p className={styles.triadDesc}>
                  Ouvir o silêncio e a voz de quem constrói a história antes de formular a narrativa.
                </p>
              </div>

              <div className={styles.triadItem}>
                <span className={styles.triadWord}>CONTAR.</span>
                <p className={styles.triadDesc}>
                  Traduzir apuração rigorosa em formatos digitais envolventes, éticos e memoráveis.
                </p>
              </div>
            </div>

            <div className={styles.manifestoQuoteBox}>
              <p className={styles.quoteText}>
                “A comunicação contemporânea não precisa de mais barulho; precisa de mais presença, verdade e apuro estético.”
              </p>
              <span className={styles.quoteAuthor}>— Caroline Gonçalves</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
