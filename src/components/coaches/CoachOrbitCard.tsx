"use client";

import {
  motion,
  useMotionValue,
  useAnimationFrame,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { orbitData } from "./orbitData";
import type { OrbitItem } from "./orbitData";

interface CoachOrbitCardProps {
  coachId: "pete" | "kendra";
  initials: string;
  name: string;
  accentColor: "cyan" | "sky" | "teal";
  size?: number;
  imageSrc?: string;
}

const accentClasses = {
  cyan: {
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    orbitBg: "bg-cyan-500/10",
    orbitBorder: "border-cyan-500/30",
    ringColor: "#22d3ee",
  },
  sky: {
    text: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/30",
    orbitBg: "bg-sky-500/10",
    orbitBorder: "border-sky-500/30",
    ringColor: "#38bdf8",
  },
  teal: {
    text: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/30",
    orbitBg: "bg-teal-500/10",
    orbitBorder: "border-teal-500/30",
    ringColor: "#2dd4bf",
  },
};

const SPEED = 0.045; // degrees per ms (~8 s/revolution)

export function CoachOrbitCard({
  coachId,
  initials,
  name,
  accentColor,
  size = 320,
  imageSrc,
}: CoachOrbitCardProps) {
  const items = orbitData[coachId];
  const accent = accentClasses[accentColor];

  // Responsive: cap size to available container width
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [renderSize, setRenderSize] = useState(size);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? size;
      setRenderSize(Math.min(size, w));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [size]);

  // Proportional constants based on renderSize
  const center = renderSize / 2;
  const orbitRadius = renderSize * (110 / 320);
  const centerCircleSize = renderSize * (128 / 320);

  // ── Rotation state ──────────────────────────────────────────────────────
  const rotate = useMotionValue(0);
  const negRotate = useMotionValue(0);
  const isPausedRef = useRef(false);
  const lastTimeRef = useRef<number | null>(null);

  // ── Hover state ─────────────────────────────────────────────────────────
  const [hoveredItem, setHoveredItem] = useState<OrbitItem | null>(null);

  // ── Animation frame loop ─────────────────────────────────────────────────
  useAnimationFrame((time) => {
    if (isPausedRef.current) {
      lastTimeRef.current = null;
      return;
    }
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }
    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;
    const next = rotate.get() + SPEED * delta;
    rotate.set(next);
    negRotate.set(-next);
  });

  return (
    // Measurement wrapper — full width so ResizeObserver captures container width
    <div ref={wrapperRef} className="w-full flex justify-center">
      <div
        className="relative aspect-square select-none"
        style={{ width: renderSize }}
        onMouseEnter={() => {
          isPausedRef.current = true;
        }}
        onMouseLeave={() => {
          isPausedRef.current = false;
          setHoveredItem(null);
        }}
      >
        {/* Dashed guide ring */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${renderSize} ${renderSize}`}
        >
          <circle
            cx={center}
            cy={center}
            r={orbitRadius}
            fill="none"
            stroke={accent.ringColor}
            strokeWidth="1"
            strokeDasharray="4 8"
            opacity="0.25"
          />
        </svg>

        {/* ── Orbiting items ──────────────────────────────────────────────── */}
        <motion.div className="absolute inset-0" style={{ rotate }}>
          {items.map((item, i) => {
            const angle = (i / items.length) * 360;
            const rad = (angle * Math.PI) / 180;
            const cx = center + orbitRadius * Math.sin(rad);
            const cy = center - orbitRadius * Math.cos(rad);

            return (
              <motion.div
                key={item.id}
                className="absolute w-12 h-12"
                style={{
                  left: `${(cx - 24).toFixed(1)}px`,
                  top: `${(cy - 24).toFixed(1)}px`,
                  rotate: negRotate,
                }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-full flex flex-col items-center justify-center cursor-pointer border ${accent.orbitBg} ${accent.orbitBorder} backdrop-blur-sm`}
                  whileHover={{ scale: 1.22 }}
                  transition={{ type: "spring", stiffness: 420, damping: 18 }}
                  onMouseEnter={() => setHoveredItem(item)}
                >
                  <item.icon size={14} className={accent.text} strokeWidth={2} />
                  <span
                    className={`text-[6px] font-bold leading-tight text-center px-0.5 mt-0.5 ${accent.text} opacity-80`}
                    style={{ maxWidth: 40 }}
                  >
                    {item.label}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Center circle ───────────────────────────────────────────────── */}
        <div
          className="absolute"
          style={{
            width: centerCircleSize,
            height: centerCircleSize,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <AnimatePresence mode="wait">
            {hoveredItem ? (
              <motion.div
                key={hoveredItem.id}
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.82 }}
                transition={{ duration: 0.18 }}
                className={`w-full h-full rounded-full flex flex-col items-center justify-center text-center bg-slate-900 border-2 ${accent.border} overflow-hidden relative`}
              >
                {hoveredItem.imageSrc && (
                  <>
                    <Image
                      src={hoveredItem.imageSrc}
                      alt={hoveredItem.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 200px"
                      className="object-cover object-top"
                    />
                    {/* Dark gradient overlay so text stays readable */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                  </>
                )}
                <div className="relative z-10 flex flex-col items-center justify-end h-full pb-3 px-2">
                  <hoveredItem.icon
                    size={18}
                    className={`${accent.text} mb-1 shrink-0`}
                  />
                  <div className="text-[9px] font-black text-white leading-tight">
                    {hoveredItem.title}
                  </div>
                  <div className="text-[7px] text-slate-300 leading-tight mt-0.5 line-clamp-2">
                    {hoveredItem.description}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.82 }}
                transition={{ duration: 0.18 }}
                className={`w-full h-full rounded-full bg-slate-900 border-2 ${accent.border} overflow-hidden`}
              >
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={name}
                    width={Math.round(centerCircleSize)}
                    height={Math.round(centerCircleSize)}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-white leading-none">
                      {initials}
                    </span>
                    <span className={`text-[10px] font-bold mt-1.5 ${accent.text}`}>
                      {name.replace("Coach ", "")}
                    </span>
                    <span className="text-[7px] text-slate-500 mt-0.5 font-medium uppercase tracking-wider">
                      hover to explore
                    </span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
