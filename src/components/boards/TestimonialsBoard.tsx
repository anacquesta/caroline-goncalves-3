"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { ArrowLeft, ArrowRight, Quote, Sparkles } from "lucide-react";
import styles from "./TestimonialsBoard.module.css";

export const TestimonialsBoard: React.FC = () => {
  const { testimonials, playTactileClickSound } = usePortfolio();
  const [currentIdx, setCurrentIdx] = useState(0);

  const activeTestimonial = testimonials[currentIdx] || testimonials[0];

  const handlePrev = () => {
    playTactileClickSound();
    setCurrentIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    playTactileClickSound();
    setCurrentIdx((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerScroll}>
        <div className={styles.boardCard}>
          {/* Top Bar */}
          <div className={styles.topBar}>
            <div className={styles.topBarLeft}>
              <span className={styles.badge}>07 / AVALIAÇÕES EDITORIAIS & RECOMENDAÇÕES</span>
              <h2 className={styles.mainTitle}>O QUE AS PESSOAS DIZEM</h2>
            </div>

            <div className={styles.topBarRight}>
              <span className={styles.counter}>
                {String(currentIdx + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
              <div className={styles.navBtns}>
                <button onClick={handlePrev} className={styles.navBtn} aria-label="Depoimento anterior">
                  <ArrowLeft size={16} />
                </button>
                <button onClick={handleNext} className={styles.navBtn} aria-label="Próximo depoimento">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Editorial Quote Stage */}
          <div className={styles.quoteStage}>
            <div className={styles.quoteHeader}>
              <div className={styles.bigNumber}>07</div>
              <Quote size={42} className={styles.bigQuoteIcon} />
            </div>

            <div className={styles.quoteBody}>
              <p className={styles.quoteText}>“{activeTestimonial.quote}”</p>
            </div>

            <div className={styles.authorMeta}>
              <div className={styles.authorIdentity}>
                <h3 className={styles.authorName}>{activeTestimonial.author}</h3>
                <span className={styles.authorRole}>{activeTestimonial.role}</span>
                <span className={styles.authorOrg}>{activeTestimonial.organization} • {activeTestimonial.year}</span>
              </div>

              {/* Dots indicator */}
              <div className={styles.dotsRow}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      playTactileClickSound();
                      setCurrentIdx(i);
                    }}
                    className={`${styles.dot} ${i === currentIdx ? styles.dotActive : ""}`}
                    aria-label={`Ir para depoimento ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Editorial Bottom Bar */}
          <div className={styles.bottomBar}>
            <div className={styles.bottomBadge}>
              <Sparkles size={13} className={styles.starIcon} />
              <span>COLABORAÇÕES EM GRANDES REDAÇÕES, AGÊNCIAS E PROJETOS CULTURAIS</span>
            </div>
            <span className={styles.bottomCoord}>BRASÍLIA — DF</span>
          </div>
        </div>
      </div>
    </div>
  );
};
