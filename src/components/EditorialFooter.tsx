"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION_PAGES } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { Volume2, VolumeX, Compass, ShieldCheck } from "lucide-react";
import styles from "./EditorialFooter.module.css";

interface EditorialFooterProps {
  currentIndex: number;
}

export const EditorialFooter: React.FC<EditorialFooterProps> = ({ currentIndex }) => {
  const pathname = usePathname();
  const { soundEnabled, toggleSound, playTactileClickSound } = usePortfolio();

  const totalPages = NAVIGATION_PAGES.length;
  const currentPage = NAVIGATION_PAGES[currentIndex] || NAVIGATION_PAGES[0];
  const progressRatio = totalPages > 1 ? (currentIndex / (totalPages - 1)) * 100 : 0;

  const handleAudioToggle = () => {
    playTactileClickSound();
    toggleSound();
  };

  return (
    <footer className={styles.footer}>
      {/* Left: Current Page indicator */}
      <div className={styles.pageInfo}>
        <span className={styles.pageNumber}>{currentPage.num}</span>
        <span className={styles.divider}>/</span>
        <span className={styles.totalPages}>{String(totalPages).padStart(2, "0")}</span>
        <span className={styles.pageDot}>—</span>
        <span className={styles.pageLabel}>{currentPage.label.toUpperCase()}</span>
        <span className={styles.pageTag}>[{currentPage.tag}]</span>
      </div>

      {/* Center: Thin Editorial Progress Line */}
      <div className={styles.progressContainer} title={`Progresso editorial: ${Math.round(progressRatio)}%`}>
        <span className={styles.progressEndpoint}>01</span>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressBar}
            style={{ width: `${progressRatio}%` }}
          />
        </div>
        <span className={styles.progressEndpoint}>{String(totalPages).padStart(2, "0")}</span>
      </div>

      {/* Right: Sound toggle, Navigation hint, Location, and CMS link */}
      <div className={styles.rightControls}>
        <div className={styles.hints}>
          <span className={styles.hintKey}>←</span>
          <span className={styles.hintKey}>→</span>
          <span className={styles.hintText}>FOLHEAR</span>
        </div>

        <button
          onClick={handleAudioToggle}
          className={`${styles.audioBtn} ${soundEnabled ? styles.audioActive : ""}`}
          title={soundEnabled ? "Desativar áudio analógico" : "Ativar áudio analógico"}
          aria-label="Controle de áudio"
        >
          {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
          <span>{soundEnabled ? "SOM ON" : "MUDO"}</span>
        </button>

        <div className={styles.locationBadge}>
          <Compass size={13} className={styles.compassIcon} />
          <span>BRASÍLIA — DF</span>
        </div>

        <Link
          href="/admin"
          className={styles.adminLink}
          title="Acessar painel CMS"
          aria-label="Painel Administrativo"
        >
          <ShieldCheck size={13} />
          <span>CMS</span>
        </Link>
      </div>
    </footer>
  );
};
