"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";
import { LightboxModal } from "@/components/LightboxModal";
import { Camera, Maximize2, MapPin, Calendar, Sparkles } from "lucide-react";
import styles from "./PhotoBoard.module.css";

export const PhotoBoard: React.FC = () => {
  const { photos, playTactileClickSound } = usePortfolio();
  const [selectedAlbum, setSelectedAlbum] = useState<string>("Todos");
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState<number>(0);

  const albums = ["Todos", ...Array.from(new Set(photos.map((p) => p.album)))];

  const filteredPhotos =
    selectedAlbum === "Todos"
      ? photos
      : photos.filter((p) => p.album === selectedAlbum);

  const handleOpenLightbox = (index: number) => {
    playTactileClickSound();
    setCurrentPhotoIdx(index);
    setLightboxOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerScroll}>
        <div className={styles.boardCard}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <span className={styles.badge}>04 / ENSAIOS & FOTOJORNALISMO</span>
              <h2 className={styles.mainTitle}>GALERIA AUTORAL & DOCUMENTAL</h2>
            </div>

            {/* Album Filters */}
            <div className={styles.albumFilters}>
              {albums.map((album) => {
                const active = selectedAlbum === album;
                return (
                  <button
                    key={album}
                    onClick={() => {
                      playTactileClickSound();
                      setSelectedAlbum(album);
                    }}
                    className={`${styles.filterBtn} ${active ? styles.filterActive : ""}`}
                  >
                    <span>{album.toUpperCase()}</span>
                    {active && <span className={styles.filterDot}>•</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Asymmetric Editorial Photo Gallery Grid */}
          <div className={styles.photoGrid}>
            {filteredPhotos.map((photo, idx) => (
              <div
                key={photo.id}
                className={`${styles.photoTile} ${photo.featured ? styles.tileFeatured : ""}`}
                onClick={() => handleOpenLightbox(idx)}
              >
                <div className={styles.imageContainer}>
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.image}
                  />

                  <div className={styles.overlay}>
                    <div className={styles.overlayTop}>
                      <span className={styles.photoIndex}>{String(idx + 1).padStart(2, "0")}</span>
                      <div className={styles.expandHint}>
                        <Maximize2 size={14} />
                      </div>
                    </div>

                    <div className={styles.overlayBottom}>
                      <span className={styles.photoAlbumTag}>{photo.album}</span>
                      <h3 className={styles.photoTitle}>{photo.title}</h3>
                      <div className={styles.overlayMeta}>
                        <span><MapPin size={11} /> {photo.location}</span>
                        <span><Calendar size={11} /> {photo.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gallery Footer Note */}
          <div className={styles.galleryFooter}>
            <div className={styles.footerNote}>
              <Camera size={14} className={styles.camIcon} />
              <span>CLIQUE EM QUALQUER FOTOGRAFIA PARA EXPANDIR EM TELA CHEIA (#0B0B0B) COM DADOS TÉCNICOS.</span>
            </div>
            <div className={styles.counterBadge}>
              <span>{filteredPhotos.length} REGISTROS EM EXPOSIÇÃO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Lightbox */}
      <LightboxModal
        photos={filteredPhotos}
        currentIndex={currentPhotoIdx}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setCurrentPhotoIdx(newIdx)}
      />
    </div>
  );
};
