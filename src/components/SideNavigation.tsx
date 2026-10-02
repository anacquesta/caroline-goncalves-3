"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { NAVIGATION_PAGES } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import styles from "./SideNavigation.module.css";

interface SideNavigationProps {
  currentIndex: number;
}

export const SideNavigation: React.FC<SideNavigationProps> = ({ currentIndex }) => {
  const router = useRouter();
  const { playPageGlideSound, playTactileClickSound } = usePortfolio();

  const totalPages = NAVIGATION_PAGES.length;
  const hasPrev = currentIndex > 0;
  const isLast = currentIndex === totalPages - 1;

  const handlePrev = () => {
    if (!hasPrev) return;
    playTactileClickSound();
    playPageGlideSound();
    const prevPage = NAVIGATION_PAGES[currentIndex - 1];
    if (prevPage) router.push(prevPage.path);
  };

  const handleNext = () => {
    playTactileClickSound();
    playPageGlideSound();
    if (isLast) {
      // Return to cover
      router.push("/");
    } else {
      const nextPage = NAVIGATION_PAGES[currentIndex + 1];
      if (nextPage) router.push(nextPage.path);
    }
  };

  const prevPage = hasPrev ? NAVIGATION_PAGES[currentIndex - 1] : null;
  const nextPage = !isLast ? NAVIGATION_PAGES[currentIndex + 1] : NAVIGATION_PAGES[0];

  return (
    <>
      {/* Left Edge Arrow */}
      {hasPrev && (
        <button
          onClick={handlePrev}
          className={`${styles.sideNavBtn} ${styles.sideNavLeft}`}
          aria-label={`Voltar para ${prevPage?.label}`}
          title={`← ${prevPage?.label}`}
        >
          <div className={styles.circle}>
            <ArrowLeft size={16} className={styles.arrowIcon} />
          </div>
          <span className={styles.btnLabel}>
            <span className={styles.metaNum}>{prevPage?.num}</span>
            <span className={styles.metaText}>{prevPage?.label}</span>
          </span>
        </button>
      )}

      {/* Right Edge Arrow */}
      <button
        onClick={handleNext}
        className={`${styles.sideNavBtn} ${styles.sideNavRight} ${isLast ? styles.isLoopBack : ""}`}
        aria-label={isLast ? "Retornar à Capa" : `Avançar para ${nextPage.label}`}
        title={isLast ? "Retornar à Capa" : `${nextPage.label} →`}
      >
        <span className={styles.btnLabel}>
          <span className={styles.metaText}>{isLast ? "INÍCIO" : nextPage.label}</span>
          <span className={styles.metaNum}>{isLast ? "01" : nextPage.num}</span>
        </span>
        <div className={styles.circle}>
          {isLast ? (
            <RotateCcw size={15} className={styles.rotateIcon} />
          ) : (
            <ArrowRight size={16} className={styles.arrowIcon} />
          )}
        </div>
      </button>
    </>
  );
};
