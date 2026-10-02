"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";
import { ArrowRight, CheckCircle2, TrendingUp, Layers, Quote } from "lucide-react";
import styles from "./ProjectsBoard.module.css";

export const ProjectsBoard: React.FC = () => {
  const { projects, playTactileClickSound } = usePortfolio();
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  const activeProject = projects[activeProjectIdx] || projects[0];

  return (
    <div className={styles.container}>
      <div className={styles.innerScroll}>
        <div className={styles.boardCard}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <span className={styles.badge}>05 / COMUNICAÇÃO ESTRATÉGICA & REDES</span>
              <h2 className={styles.mainTitle}>PROJETOS ESPECIAIS</h2>
            </div>

            {/* Selector tabs */}
            <div className={styles.projectSelector}>
              {projects.map((proj, idx) => {
                const active = idx === activeProjectIdx;
                return (
                  <button
                    key={proj.id}
                    onClick={() => {
                      playTactileClickSound();
                      setActiveProjectIdx(idx);
                    }}
                    className={`${styles.selectorBtn} ${active ? styles.selectorActive : ""}`}
                  >
                    <span className={styles.selNum}>{String(idx + 1).padStart(2, "0")}</span>
                    <span className={styles.selName}>{proj.category}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Editorial Presentation: 50% / 50% or Full Width Grid */}
          <div className={styles.projectBody}>
            {/* Left Column: Scope, Context and Results */}
            <div className={styles.infoCol}>
              <div className={styles.clientMeta}>
                <span className={styles.clientLabel}>CLIENTE / VEÍCULO</span>
                <h3 className={styles.clientName}>{activeProject.client}</h3>
                <span className={styles.projectYear}>• {activeProject.year}</span>
              </div>

              <h4 className={styles.projectTitle}>{activeProject.title}</h4>
              <p className={styles.projectSummary}>{activeProject.summary}</p>

              {/* Scope Box */}
              <div className={styles.scopeBox}>
                <div className={styles.scopeHeader}>
                  <Layers size={13} />
                  <span>ESCOPO DE ATUAÇÃO</span>
                </div>
                <div className={styles.scopeList}>
                  {activeProject.scope.map((item, i) => (
                    <div key={i} className={styles.scopeItem}>
                      <CheckCircle2 size={12} className={styles.checkIcon} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact / Results Box */}
              <div className={styles.resultsBox}>
                <TrendingUp size={15} className={styles.trendIcon} />
                <div>
                  <span className={styles.resultsLabel}>IMPACTO REGISTRADO</span>
                  <p className={styles.resultsText}>{activeProject.results}</p>
                </div>
              </div>

              {/* Testimonial Quote if available */}
              {activeProject.testimonial && (
                <div className={styles.testimonialBox}>
                  <Quote size={18} className={styles.quoteIcon} />
                  <p className={styles.quoteText}>“{activeProject.testimonial.quote}”</p>
                  <span className={styles.quoteAuthor}>
                    — {activeProject.testimonial.author}, {activeProject.testimonial.role}
                  </span>
                </div>
              )}
            </div>

            {/* Right Column: Visual Case Mockup & Imagery */}
            <div className={styles.visualCol}>
              <div className={styles.mainCoverFrame}>
                <Image
                  src={activeProject.coverImage}
                  alt={activeProject.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={styles.coverImg}
                />
                <div className={styles.caseBadge}>
                  <span>ESTUDO DE CASO • {activeProject.year}</span>
                </div>
              </div>

              {/* Story snippets */}
              <div className={styles.storySection}>
                <span className={styles.storyTitle}>METODOLOGIA & DESENVOLVIMENTO</span>
                {activeProject.fullStory.map((text, i) => (
                  <p key={i} className={styles.storyParagraph}>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
