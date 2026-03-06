"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

const clips = [
  {
    src: "https://videos.pexels.com/video-files/34088952/14458313_1920_1080_24fps.mp4",
    label: "Swim",
    icon: "🏊",
  },
  {
    src: "https://videos.pexels.com/video-files/2066560/2066560-hd_1920_1080_30fps.mp4",
    label: "Bike",
    icon: "🚴",
  },
  {
    src: "https://videos.pexels.com/video-files/3125907/3125907-hd_1920_1080_25fps.mp4",
    label: "Run",
    icon: "🏃",
  },
];

export function HeroSection() {
  const [clipIdx, setClipIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.src = clips[clipIdx].src;
    v.load();
    v.play().catch(() => {});
  }, [clipIdx]);

  const handleEnded = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setClipIdx((prev) => (prev + 1) % clips.length);
      setTimeout(() => setFading(false), 300);
    }, 500);
  }, []);

  const jumpTo = useCallback((idx: number) => {
    if (idx === clipIdx) return;
    setFading(true);
    setTimeout(() => {
      setClipIdx(idx);
      setTimeout(() => setFading(false), 300);
    }, 400);
  }, [clipIdx]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950">
      {/* ── Video Background ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Fade-transition overlay (darkens between clips) */}
      <div
        className={`absolute inset-0 bg-black pointer-events-none z-10 transition-opacity duration-500 ${
          fading ? "opacity-70" : "opacity-0"
        }`}
      />

      {/* Permanent dark gradient overlay — keeps text legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/45 to-slate-950/85 z-10" />
      <div className="absolute inset-0 bg-slate-950/30 z-10" />

      {/* ── Content ── */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">

        {/* Logo — prominently featured */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="flex justify-center mb-10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/triiq-logo.png"
            alt="Tri IQ Coaching — Train Smarter"
            className="h-36 md:h-48 lg:h-56 w-auto drop-shadow-2xl"
            style={{ filter: "invert(1) hue-rotate(180deg)" }}
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/35 bg-cyan-500/10 backdrop-blur-sm mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-cyan" />
          <span className="text-cyan-300 text-xs font-bold uppercase tracking-[0.2em]">
            Triathlon and Endurance Training
          </span>
        </motion.div>

        {/* Headline */}
        <div className="mb-6">
          {["TRAIN", "SMARTER."].map((word, i) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, y: 50, skewY: 2 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.35 + i * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="block"
            >
              <span
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] drop-shadow-2xl ${
                  i === 0 ? "text-white" : "text-cyan-400 glow-cyan"
                }`}
              >
                {word}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-slate-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light drop-shadow-lg"
        >
          Personalized triathlon coaching by certified athletes who understand
          the challenge of balancing training with real life.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14"
        >
          <Link
            href="/contact"
            className="group flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-base rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-cyan-500/40 active:scale-95"
          >
            Get Started Today
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            href="/coaches"
            className="flex items-center gap-2 px-8 py-4 border border-white/30 hover:border-cyan-400/60 text-white font-semibold text-base rounded-full transition-all duration-200 hover:bg-white/10 backdrop-blur-sm active:scale-95"
          >
            Meet Our Coaches
          </Link>
        </motion.div>

        {/* Clickable discipline tabs — also controls video */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="flex items-center justify-center gap-4 md:gap-8"
        >
          {clips.map((clip, i) => (
            <div key={clip.label} className="flex items-center gap-3 md:gap-4">
              {i > 0 && (
                <div className="w-px h-5 bg-white/20 hidden sm:block" />
              )}
              <button
                onClick={() => jumpTo(i)}
                className={`flex items-center gap-1.5 transition-all duration-200 rounded-full px-3 py-1 ${
                  clipIdx === i
                    ? "text-cyan-400 font-bold bg-cyan-500/10 border border-cyan-500/30"
                    : "text-slate-300 hover:text-white font-semibold hover:bg-white/10"
                }`}
              >
                <span className="text-xs md:text-sm uppercase tracking-wider">
                  {clip.label}
                </span>
                {clipIdx === i && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-cyan" />
                )}
              </button>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-semibold text-white/35 uppercase tracking-[0.25em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-white/35" />
        </motion.div>
      </motion.div>
    </section>
  );
}
