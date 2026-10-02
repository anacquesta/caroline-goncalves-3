"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NAVIGATION_PAGES } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { Calendar, Menu, X, ArrowUpRight } from "lucide-react";
import styles from "./EditorialHeader.module.css";

interface EditorialHeaderProps {
  onOpenSchedule?: () => void;
}

export const EditorialHeader: React.FC<EditorialHeaderProps> = ({ onOpenSchedule }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { profile, playTactileClickSound } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if current route matches or is subroute
  const isPageActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    playTactileClickSound();
    setMobileMenuOpen(false);
    if (pathname !== path) {
      router.push(path);
    }
  };

  return (
    <>
      <header className={styles.header}>
        {/* Left: Brand Identity / Masthead */}
        <div className={styles.brandContainer}>
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className={styles.brandLink}
            aria-label="Ir para página inicial"
          >
            <span className={styles.brandName}>{profile.name.toUpperCase()}</span>
            <div className={styles.brandMeta}>
              <span className={styles.brandRole}>{profile.role}</span>
              <span className={styles.brandDot}>•</span>
              <span className={styles.brandLocation}>{profile.location}</span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation Items */}
        <nav className={styles.navMenu} aria-label="Navegação editorial">
          {NAVIGATION_PAGES.map((page) => {
            const active = isPageActive(page.path);
            return (
              <Link
                key={page.path}
                href={page.path}
                onClick={(e) => handleNavClick(e, page.path)}
                className={`${styles.navItem} ${active ? styles.active : ""}`}
              >
                <span className={styles.navNum}>{page.num}</span>
                <span className={styles.navLabel}>{page.label}</span>
                {active && <span className={styles.activeIndicator} />}
              </Link>
            );
          })}
        </nav>

        {/* Right: CTA & Mobile Toggle */}
        <div className={styles.actionsContainer}>
          <button
            onClick={() => {
              playTactileClickSound();
              if (onOpenSchedule) {
                onOpenSchedule();
              } else {
                router.push("/agendamento");
              }
            }}
            className={styles.ctaButton}
            aria-label="Agendar conversa profissional"
          >
            <Calendar size={14} className={styles.ctaIcon} />
            <span>AGENDAR CONVERSA</span>
            <ArrowUpRight size={14} className={styles.ctaArrow} />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={styles.mobileToggle}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileOverlay}>
          <div className={styles.mobileHeader}>
            <span className={styles.mobileBrand}>{profile.name}</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className={styles.mobileClose}
              aria-label="Fechar menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className={styles.mobileNavList}>
            {NAVIGATION_PAGES.map((page) => {
              const active = isPageActive(page.path);
              return (
                <Link
                  key={page.path}
                  href={page.path}
                  onClick={(e) => handleNavClick(e, page.path)}
                  className={`${styles.mobileNavItem} ${active ? styles.mobileActive : ""}`}
                >
                  <span className={styles.mobileNum}>{page.num}</span>
                  <span className={styles.mobileLabel}>{page.label}</span>
                  <span className={styles.mobileTag}>{page.tag}</span>
                </Link>
              );
            })}
          </div>

          <div className={styles.mobileFooter}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenSchedule) onOpenSchedule();
                else router.push("/agendamento");
              }}
              className={styles.mobileCta}
            >
              <Calendar size={16} />
              AGENDAR UMA CONVERSA
            </button>
            <div className={styles.mobileFooterMeta}>
              <span>{profile.currentRole}</span>
              <span>{profile.edition}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
