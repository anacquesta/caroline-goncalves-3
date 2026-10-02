"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAVIGATION_PAGES } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { HomeBoard } from "./boards/HomeBoard";
import { AboutBoard } from "./boards/AboutBoard";
import { JournalismBoard } from "./boards/JournalismBoard";
import { PhotoBoard } from "./boards/PhotoBoard";
import { ProjectsBoard } from "./boards/ProjectsBoard";
import { BlogBoard } from "./boards/BlogBoard";
import { TestimonialsBoard } from "./boards/TestimonialsBoard";
import { ContactBoard } from "./boards/ContactBoard";
import styles from "./HorizontalStage.module.css";

const BOARD_COMPONENTS: Record<string, React.FC> = {
  "/": HomeBoard,
  "/sobre": AboutBoard,
  "/jornalismo": JournalismBoard,
  "/fotografia": PhotoBoard,
  "/projetos": ProjectsBoard,
  "/blog": BlogBoard,
  "/depoimentos": TestimonialsBoard,
  "/contato": ContactBoard,
};

interface HorizontalStageProps {
  children?: React.ReactNode;
}

export const HorizontalStage: React.FC<HorizontalStageProps> = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { playPageGlideSound, playTactileClickSound } = usePortfolio();

  // Determine current page index
  const getIndexFromPath = useCallback((path: string) => {
    const found = NAVIGATION_PAGES.find((p) =>
      p.path === "/" ? path === "/" : path.startsWith(p.path)
    );
    return found ? found.index : 0;
  }, []);

  const [currentIndex, setCurrentIndex] = useState(() => getIndexFromPath(pathname));
  const [direction, setDirection] = useState<number>(0);
  const isFirstRender = useRef(true);
  const isAnimatingRef = useRef(false);
  const lastScrollTime = useRef(0);

  // Sync index and direction on route change
  useEffect(() => {
    const newIndex = getIndexFromPath(pathname);
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setCurrentIndex(newIndex);
      return;
    }

    if (newIndex !== currentIndex) {
      const dir = newIndex > currentIndex ? 1 : -1;
      setDirection(dir);
      setCurrentIndex(newIndex);
      playPageGlideSound();
    }
  }, [pathname, currentIndex, getIndexFromPath, playPageGlideSound]);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in form inputs or textareas
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.tagName === "SELECT" ||
          activeEl.getAttribute("contenteditable") === "true")
      ) {
        return;
      }

      if (e.key === "ArrowRight") {
        if (currentIndex < NAVIGATION_PAGES.length - 1) {
          playTactileClickSound();
          router.push(NAVIGATION_PAGES[currentIndex + 1].path);
        }
      } else if (e.key === "ArrowLeft") {
        if (currentIndex > 0) {
          playTactileClickSound();
          router.push(NAVIGATION_PAGES[currentIndex - 1].path);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, router, playTactileClickSound]);

  // Touch Swipe for mobile with angle tolerance
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Must be predominantly horizontal gesture (|deltaX| > |deltaY| * 1.6) and over 60px
    if (Math.abs(deltaX) > Math.abs(deltaY) * 1.6 && Math.abs(deltaX) > 60) {
      if (deltaX < 0 && currentIndex < NAVIGATION_PAGES.length - 1) {
        // Swipe left -> advance
        playTactileClickSound();
        router.push(NAVIGATION_PAGES[currentIndex + 1].path);
      } else if (deltaX > 0 && currentIndex > 0) {
        // Swipe right -> go back
        playTactileClickSound();
        router.push(NAVIGATION_PAGES[currentIndex - 1].path);
      }
    }
  };

  // Controlled trackpad / horizontal wheel with threshold
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Don't intercept if inside an element with internal vertical scroll
      let target = e.target as HTMLElement | null;
      let hasInternalScroll = false;
      while (target && target !== document.body) {
        if (
          target.scrollHeight > target.clientHeight &&
          (window.getComputedStyle(target).overflowY === "auto" ||
            window.getComputedStyle(target).overflowY === "scroll")
        ) {
          hasInternalScroll = true;
          break;
        }
        target = target.parentElement;
      }

      // If predominantly horizontal deltaX from trackpad swipe
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 40) {
        const now = Date.now();
        if (now - lastScrollTime.current > 800 && !isAnimatingRef.current) {
          lastScrollTime.current = now;
          if (e.deltaX > 0 && currentIndex < NAVIGATION_PAGES.length - 1) {
            router.push(NAVIGATION_PAGES[currentIndex + 1].path);
          } else if (e.deltaX < 0 && currentIndex > 0) {
            router.push(NAVIGATION_PAGES[currentIndex - 1].path);
          }
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentIndex, router]);

  // Framer Motion Animation Variants for Horizontal Slide Camera
  const pageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : dir < 0 ? "-100%" : "0%",
      opacity: 1,
    }),
    center: {
      x: "0%",
      opacity: 1,
      transition: {
        x: { duration: 0.65, ease: [0.76, 0, 0.24, 1] as const },
        opacity: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 1,
      transition: {
        x: { duration: 0.65, ease: [0.76, 0, 0.24, 1] as const },
        opacity: { duration: 0.25 },
      },
    }),
  };


  const ActiveComponent = BOARD_COMPONENTS[pathname] || HomeBoard;

  return (
    <main
      className={styles.stageViewport}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.stageCanvas}>
        <AnimatePresence
          initial={false}
          custom={direction}
          mode="popLayout"
          onExitComplete={() => {
            isAnimatingRef.current = false;
          }}
        >
          <motion.div
            key={pathname}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            onAnimationStart={() => {
              isAnimatingRef.current = true;
            }}
            className={styles.boardMotionWrapper}
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
};
