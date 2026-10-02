"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePortfolio } from "@/context/PortfolioContext";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import styles from "./HomeBoard.module.css";

export const HomeBoard: React.FC = () => {
  const router = useRouter();
  const { profile, playTactileClickSound, playPageGlideSound } = usePortfolio();

  const handleCtaClick = () => {
    playTactileClickSound();
    playPageGlideSound();
    router.push("/sobre");
  };

  return (
    <div className={styles.container}>
      {/* 12-Column Swiss Modular Grid */}
      <div className={styles.gridContainer}>
        {/* Left Column: Editorial Masthead & Pillars */}
        <div className={styles.leftColumn}>
          <div className={styles.topMeta}>
            <span className={styles.issueTag}>PUBLICAÇÃO DIGITAL</span>
            <span className={styles.editionYear}>{profile.edition}</span>
          </div>

          <div className={styles.headlineBlock}>
            <h1 className={styles.mainTitle}>
              CAROLINE
              <br />
              <span className={styles.titleHighlight}>GONÇALVES</span>
            </h1>

            <div className={styles.rolesRow}>
              <span className={styles.roleItem}>JORNALISTA</span>
              <span className={styles.roleDot}>/</span>
              <span className={styles.roleItem}>FOTÓGRAFA</span>
              <span className={styles.roleDot}>/</span>
              <span className={styles.roleItem}>COMUNICADORA</span>
            </div>

            <p className={styles.leadBio}>{profile.headline}</p>
          </div>

          {/* Pillars List */}
          <div className={styles.pillarsGrid}>
            <div className={styles.pillarItem}>
              <span className={styles.pillarNum}>01</span>
              <span className={styles.pillarLabel}>PESSOAS</span>
            </div>
            <div className={styles.pillarItem}>
              <span className={styles.pillarNum}>02</span>
              <span className={styles.pillarLabel}>HISTÓRIAS</span>
            </div>
            <div className={styles.pillarItem}>
              <span className={styles.pillarNum}>03</span>
              <span className={styles.pillarLabel}>LUGARES</span>
            </div>
            <div className={styles.pillarItem}>
              <span className={styles.pillarNum}>04</span>
              <span className={styles.pillarLabel}>IMPACTO</span>
            </div>
          </div>

          {/* CTA & Coordinates */}
          <div className={styles.ctaRow}>
            <button onClick={handleCtaClick} className={styles.ctaButton}>
              <span>CONHEÇA MEU TRABALHO</span>
              <ArrowRight size={16} />
            </button>

            <div className={styles.locationBlock}>
              <Compass size={14} className={styles.locIcon} />
              <span>BRASÍLIA — DF</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Cover Photo Integrated into Layout */}
        <div className={styles.rightColumn}>
          <div className={styles.photoFrame}>
            <Image
              src="/images/caroline.png"
              alt="Caroline Gonçalves - Fotojornalista e Comunicadora"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className={styles.coverImage}
            />

            <div className={styles.photoOverlayBadge}>
              <Sparkles size={12} />
              <span>APURAÇÃO & COMUNICAÇÃO VISUAL</span>
            </div>

            <div className={styles.photoCaption}>
              <span className={styles.captionTag}>RETRATO EDITORIAL</span>
              <span className={styles.captionTitle}>CAROLINE GONÇALVES</span>
            </div>
          </div>

          {/* Micro Editorial Metadata under photo */}
          <div className={styles.metadataStrip}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>VEÍCULO PRINCIPAL</span>
              <span className={styles.metaVal}>{profile.currentCompany}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>ATUAÇÃO</span>
              <span className={styles.metaVal}>{profile.currentRole}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>DIREÇÃO</span>
              <span className={styles.metaVal}>Jornalismo Visual & Redes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
