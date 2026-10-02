"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";
import { JournalItem } from "@/data/portfolioData";
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, Newspaper, BarChart2 } from "lucide-react";
import styles from "./JournalismBoard.module.css";

export const JournalismBoard: React.FC = () => {
  const { journalism, playTactileClickSound } = usePortfolio();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);

  const activeItem = journalism[selectedIndex] || journalism[0];

  const handleSelect = (index: number) => {
    playTactileClickSound();
    setSelectedIndex(index);
    setDetailOpen(true);
  };

  const handleBackToList = () => {
    playTactileClickSound();
    setDetailOpen(false);
  };

  const handleNextArticle = () => {
    playTactileClickSound();
    setSelectedIndex((prev) => (prev + 1) % journalism.length);
  };

  const handlePrevArticle = () => {
    playTactileClickSound();
    setSelectedIndex((prev) => (prev - 1 + journalism.length) % journalism.length);
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerScroll}>
        <div className={styles.boardCard}>
          {/* Header Bar */}
          <div className={styles.topBar}>
            <div className={styles.topBarLeft}>
              <span className={styles.badge}>03 / GRANDES REPORTAGENS & APURAÇÃO</span>
              <h2 className={styles.mainTitle}>JORNALISMO & INVESTIGAÇÃO</h2>
            </div>

            <div className={styles.topBarRight}>
              <span className={styles.activeCounter}>
                {String(selectedIndex + 1).padStart(2, "0")} / {String(journalism.length).padStart(2, "0")}
              </span>
              <div className={styles.itemNavBtns}>
                <button
                  onClick={handlePrevArticle}
                  className={styles.itemNavBtn}
                  aria-label="Matéria anterior"
                  title="Anterior"
                >
                  <ArrowLeft size={15} />
                </button>
                <button
                  onClick={handleNextArticle}
                  className={styles.itemNavBtn}
                  aria-label="Próxima matéria"
                  title="Próxima"
                >
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Main Editorial Spread Grid */}
          <div className={styles.editorialSpread}>
            {/* Left Block: Title, Context & Excerpt */}
            <div className={styles.contentCol}>
              <div className={styles.metaRow}>
                <span className={styles.categoryBadge}>{activeItem.category}</span>
                <span className={styles.readTime}>{activeItem.readTime}</span>
              </div>

              <h3 className={styles.articleTitle}>{activeItem.title}</h3>
              <p className={styles.articleSubtitle}>{activeItem.subtitle}</p>

              <div className={styles.modularGrid}>
                <div className={styles.modularCell}>
                  <div className={styles.cellHeader}>
                    <Newspaper size={13} />
                    <span>VEÍCULO / PUBLICAÇÃO</span>
                  </div>
                  <p className={styles.cellVal}>{activeItem.vehicle}</p>
                </div>

                <div className={styles.modularCell}>
                  <div className={styles.cellHeader}>
                    <Calendar size={13} />
                    <span>DATA DE COBERTURA</span>
                  </div>
                  <p className={styles.cellVal}>{activeItem.date}</p>
                </div>

                <div className={`${styles.modularCell} ${styles.modularCellSpan}`}>
                  <div className={styles.cellHeader}>
                    <BarChart2 size={13} />
                    <span>IMPACTO & ALCANCE REGISTRADO</span>
                  </div>
                  <p className={styles.cellValHighlight}>{activeItem.impactMetrics}</p>
                </div>
              </div>

              <div className={styles.summaryBlock}>
                <span className={styles.summaryLabel}>CONTEXTO EDITORIAL</span>
                <p className={styles.summaryText}>{activeItem.summary}</p>
              </div>

              {/* Action buttons */}
              <div className={styles.actionsRow}>
                <button
                  onClick={() => handleSelect(selectedIndex)}
                  className={styles.readDetailBtn}
                >
                  <span>{detailOpen ? "OCULTAR LEITURA COMPLETA" : "LER MATÉRIA COMPLETA"}</span>
                  <ArrowRight size={14} />
                </button>

                {activeItem.externalUrl && (
                  <a
                    href={activeItem.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.externalLinkBtn}
                  >
                    <span>VER NO METRÓPOLES</span>
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>

            {/* Right Block: Journalistic Photography */}
            <div className={styles.imageCol}>
              <div className={styles.imageFrame}>
                <Image
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={styles.articleImg}
                />
                <div className={styles.imgTag}>
                  <span>FOTOJORNALISMO • COBERTURA IN LOCO</span>
                </div>
              </div>

              {/* Selector thumbnails underneath */}
              <div className={styles.selectorStrip}>
                {journalism.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      playTactileClickSound();
                      setSelectedIndex(idx);
                    }}
                    className={`${styles.thumbBtn} ${idx === selectedIndex ? styles.thumbActive : ""}`}
                  >
                    <span className={styles.thumbNum}>{String(idx + 1).padStart(2, "0")}</span>
                    <span className={styles.thumbTitle}>{item.category}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Expandable Full Story Drawer if open */}
          {detailOpen && (
            <div className={styles.fullStorySection}>
              <div className={styles.fullStoryHeader}>
                <span className={styles.fsLabel}>TEXTO DA REPORTAGEM & BASTIDORES</span>
                <button onClick={handleBackToList} className={styles.fsCloseBtn}>
                  <ArrowLeft size={14} />
                  <span>RECOLHER MATÉRIA</span>
                </button>
              </div>

              <div className={styles.fullStoryBody}>
                {activeItem.fullContent.map((paragraph, i) => (
                  <p key={i} className={styles.fsParagraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
