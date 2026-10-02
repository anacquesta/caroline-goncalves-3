"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { PhotoItem } from "@/data/portfolioData";
import { X, ArrowLeft, ArrowRight, Camera, MapPin, Calendar } from "lucide-react";
import styles from "./LightboxModal.module.css";

interface LightboxModalProps {
  photos: PhotoItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate
}) => {
  const currentPhoto = photos[currentIndex];

  const handlePrev = useCallback(() => {
    if (photos.length === 0) return;
    const prev = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    onNavigate(prev);
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (photos.length === 0) return;
    const next = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
    onNavigate(next);
  }, [currentIndex, photos.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      {/* Top Bar with metadata and close button */}
      <div className={styles.topBar} onClick={(e) => e.stopPropagation()}>
        <div className={styles.counter}>
          <span className={styles.activeNum}>{String(currentIndex + 1).padStart(2, "0")}</span>
          <span className={styles.slash}>/</span>
          <span className={styles.totalNum}>{String(photos.length).padStart(2, "0")}</span>
          <span className={styles.albumTag}>[{currentPhoto.album}]</span>
        </div>

        <div className={styles.topActions}>
          <span className={styles.escHint}>ESC PARA FECHAR</span>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Fechar visualização">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className={styles.stage} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handlePrev}
          className={`${styles.navBtn} ${styles.navBtnLeft}`}
          aria-label="Foto anterior"
        >
          <ArrowLeft size={22} />
        </button>

        <div className={styles.imageWrapper}>
          <Image
            src={currentPhoto.imageUrl}
            alt={currentPhoto.title}
            fill
            sizes="(max-width: 1200px) 95vw, 85vw"
            priority
            className={styles.image}
            style={{ objectFit: "contain" }}
          />
        </div>

        <button
          onClick={handleNext}
          className={`${styles.navBtn} ${styles.navBtnRight}`}
          aria-label="Próxima foto"
        >
          <ArrowRight size={22} />
        </button>
      </div>

      {/* Bottom Info Bar */}
      <div className={styles.bottomBar} onClick={(e) => e.stopPropagation()}>
        <div className={styles.metaMain}>
          <h2 className={styles.photoTitle}>{currentPhoto.title}</h2>
          <p className={styles.photoDesc}>{currentPhoto.description}</p>
        </div>

        <div className={styles.specsGrid}>
          <div className={styles.specItem}>
            <MapPin size={13} className={styles.specIcon} />
            <span>{currentPhoto.location}</span>
          </div>
          <div className={styles.specItem}>
            <Calendar size={13} className={styles.specIcon} />
            <span>{currentPhoto.year}</span>
          </div>
          <div className={styles.specItem}>
            <Camera size={13} className={styles.specIcon} />
            <span>{currentPhoto.cameraSpecs}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
