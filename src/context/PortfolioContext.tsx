"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import {
  PortfolioProfile,
  JournalItem,
  PhotoItem,
  ProjectItem,
  BlogPostItem,
  TestimonialItem,
  INITIAL_PROFILE,
  INITIAL_JOURNALISM,
  INITIAL_PHOTOS,
  INITIAL_PROJECTS,
  INITIAL_BLOG,
  INITIAL_TESTIMONIALS
} from "../data/portfolioData";

interface PortfolioContextType {
  profile: PortfolioProfile;
  updateProfile: (updated: Partial<PortfolioProfile>) => void;
  journalism: JournalItem[];
  addJournalItem: (item: Omit<JournalItem, "id">) => void;
  updateJournalItem: (id: string, item: Partial<JournalItem>) => void;
  deleteJournalItem: (id: string) => void;
  photos: PhotoItem[];
  addPhotoItem: (item: Omit<PhotoItem, "id">) => void;
  updatePhotoItem: (id: string, item: Partial<PhotoItem>) => void;
  deletePhotoItem: (id: string) => void;
  projects: ProjectItem[];
  addProjectItem: (item: Omit<ProjectItem, "id">) => void;
  updateProjectItem: (id: string, item: Partial<ProjectItem>) => void;
  deleteProjectItem: (id: string) => void;
  blogPosts: BlogPostItem[];
  addBlogPost: (post: Omit<BlogPostItem, "id">) => void;
  updateBlogPost: (id: string, post: Partial<BlogPostItem>) => void;
  deleteBlogPost: (id: string) => void;
  testimonials: TestimonialItem[];
  addTestimonial: (item: Omit<TestimonialItem, "id">) => void;
  updateTestimonial: (id: string, item: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  playPageGlideSound: () => void;
  playTactileClickSound: () => void;
  resetAllData: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

const STORAGE_KEYS = {
  PROFILE: "cg_profile_v1",
  JOURNALISM: "cg_journalism_v1",
  PHOTOS: "cg_photos_v1",
  PROJECTS: "cg_projects_v1",
  BLOG: "cg_blog_v1",
  TESTIMONIALS: "cg_testimonials_v1",
  SOUND: "cg_sound_enabled_v1"
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<PortfolioProfile>(INITIAL_PROFILE);
  const [journalism, setJournalism] = useState<JournalItem[]>(INITIAL_JOURNALISM);
  const [photos, setPhotos] = useState<PhotoItem[]>(INITIAL_PHOTOS);
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [blogPosts, setBlogPosts] = useState<BlogPostItem[]>(INITIAL_BLOG);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(INITIAL_TESTIMONIALS);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Audio Context Ref for synthetic Web Audio (no external audio files needed!)
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (savedProfile) setProfile(JSON.parse(savedProfile));

      const savedJourn = localStorage.getItem(STORAGE_KEYS.JOURNALISM);
      if (savedJourn) setJournalism(JSON.parse(savedJourn));

      const savedPhotos = localStorage.getItem(STORAGE_KEYS.PHOTOS);
      if (savedPhotos) setPhotos(JSON.parse(savedPhotos));

      const savedProj = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (savedProj) setProjects(JSON.parse(savedProj));

      const savedBlog = localStorage.getItem(STORAGE_KEYS.BLOG);
      if (savedBlog) setBlogPosts(JSON.parse(savedBlog));

      const savedTestim = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      if (savedTestim) setTestimonials(JSON.parse(savedTestim));

      const savedSound = localStorage.getItem(STORAGE_KEYS.SOUND);
      if (savedSound !== null) setSoundEnabled(savedSound === "true");
    } catch {
      // ignore storage errors in private browsing
    }
  }, []);

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Subtle analog paper glide sound using noise burst + bandpass filter
  const playPageGlideSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const bufferSize = ctx.sampleRate * 0.12; // 120ms
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1100;
      filter.Q.value = 1.4;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.11);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio playback fails silently if browser policy blocks it
    }
  }, [soundEnabled, getAudioContext]);

  // Subtle tactile click sound
  const playTactileClickSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch {
      // silent fail
    }
  }, [soundEnabled, getAudioContext]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEYS.SOUND, String(next));
      return next;
    });
  }, []);

  const updateProfile = useCallback((updated: Partial<PortfolioProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updated };
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(next));
      return next;
    });
  }, []);

  const addJournalItem = useCallback((item: Omit<JournalItem, "id">) => {
    setJournalism((prev) => {
      const newItem: JournalItem = { ...item, id: `jrn-${Date.now()}` };
      const next = [newItem, ...prev];
      localStorage.setItem(STORAGE_KEYS.JOURNALISM, JSON.stringify(next));
      return next;
    });
  }, []);

  const updateJournalItem = useCallback((id: string, updated: Partial<JournalItem>) => {
    setJournalism((prev) => {
      const next = prev.map((item) => (item.id === id ? { ...item, ...updated } : item));
      localStorage.setItem(STORAGE_KEYS.JOURNALISM, JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteJournalItem = useCallback((id: string) => {
    setJournalism((prev) => {
      const next = prev.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.JOURNALISM, JSON.stringify(next));
      return next;
    });
  }, []);

  const addPhotoItem = useCallback((item: Omit<PhotoItem, "id">) => {
    setPhotos((prev) => {
      const newItem: PhotoItem = { ...item, id: `ph-${Date.now()}` };
      const next = [newItem, ...prev];
      localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(next));
      return next;
    });
  }, []);

  const updatePhotoItem = useCallback((id: string, updated: Partial<PhotoItem>) => {
    setPhotos((prev) => {
      const next = prev.map((item) => (item.id === id ? { ...item, ...updated } : item));
      localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(next));
      return next;
    });
  }, []);

  const deletePhotoItem = useCallback((id: string) => {
    setPhotos((prev) => {
      const next = prev.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(next));
      return next;
    });
  }, []);

  const addProjectItem = useCallback((item: Omit<ProjectItem, "id">) => {
    setProjects((prev) => {
      const newItem: ProjectItem = { ...item, id: `prj-${Date.now()}` };
      const next = [newItem, ...prev];
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(next));
      return next;
    });
  }, []);

  const updateProjectItem = useCallback((id: string, updated: Partial<ProjectItem>) => {
    setProjects((prev) => {
      const next = prev.map((item) => (item.id === id ? { ...item, ...updated } : item));
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteProjectItem = useCallback((id: string) => {
    setProjects((prev) => {
      const next = prev.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(next));
      return next;
    });
  }, []);

  const addBlogPost = useCallback((post: Omit<BlogPostItem, "id">) => {
    setBlogPosts((prev) => {
      const nextNumber = String(prev.length + 1).padStart(2, "0");
      const newItem: BlogPostItem = { ...post, id: `blg-${Date.now()}`, number: nextNumber };
      const next = [newItem, ...prev];
      localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(next));
      return next;
    });
  }, []);

  const updateBlogPost = useCallback((id: string, updated: Partial<BlogPostItem>) => {
    setBlogPosts((prev) => {
      const next = prev.map((item) => (item.id === id ? { ...item, ...updated } : item));
      localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteBlogPost = useCallback((id: string) => {
    setBlogPosts((prev) => {
      const next = prev.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(next));
      return next;
    });
  }, []);

  const addTestimonial = useCallback((item: Omit<TestimonialItem, "id">) => {
    setTestimonials((prev) => {
      const newItem: TestimonialItem = { ...item, id: `tst-${Date.now()}` };
      const next = [...prev, newItem];
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(next));
      return next;
    });
  }, []);

  const updateTestimonial = useCallback((id: string, updated: Partial<TestimonialItem>) => {
    setTestimonials((prev) => {
      const next = prev.map((item) => (item.id === id ? { ...item, ...updated } : item));
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteTestimonial = useCallback((id: string) => {
    setTestimonials((prev) => {
      const next = prev.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetAllData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.JOURNALISM);
    localStorage.removeItem(STORAGE_KEYS.PHOTOS);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.BLOG);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    setProfile(INITIAL_PROFILE);
    setJournalism(INITIAL_JOURNALISM);
    setPhotos(INITIAL_PHOTOS);
    setProjects(INITIAL_PROJECTS);
    setBlogPosts(INITIAL_BLOG);
    setTestimonials(INITIAL_TESTIMONIALS);
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        updateProfile,
        journalism,
        addJournalItem,
        updateJournalItem,
        deleteJournalItem,
        photos,
        addPhotoItem,
        updatePhotoItem,
        deletePhotoItem,
        projects,
        addProjectItem,
        updateProjectItem,
        deleteProjectItem,
        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        testimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        soundEnabled,
        toggleSound,
        playPageGlideSound,
        playTactileClickSound,
        resetAllData
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
