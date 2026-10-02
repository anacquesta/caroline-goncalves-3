"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";
import { BlogPostItem } from "@/data/portfolioData";
import { ArrowRight, ArrowLeft, Clock, Calendar, BookOpen, Quote } from "lucide-react";
import styles from "./BlogBoard.module.css";

export const BlogBoard: React.FC = () => {
  const { blogPosts, playTactileClickSound } = usePortfolio();
  const [activePost, setActivePost] = useState<BlogPostItem | null>(null);

  const handleOpenPost = (post: BlogPostItem) => {
    playTactileClickSound();
    setActivePost(post);
  };

  const handleClosePost = () => {
    playTactileClickSound();
    setActivePost(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerScroll}>
        <div className={styles.boardCard}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <span className={styles.badge}>06 / CADERNO DE ENSAIOS & CRÔNICAS</span>
              <h2 className={styles.mainTitle}>CADERNO DE TEXTOS</h2>
            </div>
            <span className={styles.headerNote}>
              ARTIGOS DISPONÍVEIS COM LEITURA VERTICAL CONFORTÁVEL
            </span>
          </div>

          {/* If an article is selected, display vertical reading layout (680-780px) */}
          {activePost ? (
            <div className={styles.articleReader}>
              <div className={styles.readerBar}>
                <button onClick={handleClosePost} className={styles.backBtn}>
                  <ArrowLeft size={16} />
                  <span>VOLTAR AO CADERNO DE TEXTOS</span>
                </button>

                <div className={styles.readerMeta}>
                  <span>{activePost.date}</span>
                  <span>•</span>
                  <span>{activePost.readTime}</span>
                </div>
              </div>

              {/* Centered Editorial Reading Body (680-780px) */}
              <article className={styles.readerContent}>
                <div className={styles.readerHeader}>
                  <div className={styles.readerBadgeRow}>
                    <span className={styles.readerNum}>{activePost.number}</span>
                    <span className={styles.readerCategory}>{activePost.category}</span>
                  </div>
                  <h1 className={styles.readerTitle}>{activePost.title}</h1>
                  <p className={styles.readerSubtitle}>{activePost.subtitle}</p>
                </div>

                <div className={styles.readerHeroImg}>
                  <Image
                    src={activePost.coverImage}
                    alt={activePost.title}
                    fill
                    priority
                    sizes="(max-width: 800px) 100vw, 760px"
                    className={styles.heroImg}
                  />
                </div>

                {activePost.quote && (
                  <blockquote className={styles.readerQuote}>
                    <Quote size={20} className={styles.quoteIcon} />
                    <p>{activePost.quote}</p>
                  </blockquote>
                )}

                <div className={styles.readerProse}>
                  {activePost.content.map((paragraph, idx) => (
                    <p key={idx} className={styles.proseParagraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className={styles.readerFooter}>
                  <span className={styles.authorBadge}>TEXTO POR CAROLINE GONÇALVES</span>
                  <button onClick={handleClosePost} className={styles.bottomBackBtn}>
                    <ArrowLeft size={14} />
                    <span>VOLTAR AO ÍNDICE DE TEXTOS</span>
                  </button>
                </div>
              </article>
            </div>
          ) : (
            /* Magazine Spread Grid of Articles */
            <div className={styles.articlesGrid}>
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className={styles.articleCard}
                  onClick={() => handleOpenPost(post)}
                >
                  <div className={styles.cardTop}>
                    <span className={styles.cardNum}>{post.number}</span>
                    <div className={styles.cardDateCat}>
                      <span className={styles.cardCat}>{post.category}</span>
                      <span className={styles.cardDate}>{post.date}</span>
                    </div>
                  </div>

                  <div className={styles.cardMiddle}>
                    <h3 className={styles.cardTitle}>{post.title}</h3>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>
                  </div>

                  <div className={styles.cardBottom}>
                    <div className={styles.cardTime}>
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </div>

                    <div className={styles.readLink}>
                      <span>LER TEXTO</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
