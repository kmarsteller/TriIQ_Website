"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { orbitData } from "./orbitData";
import type { OrbitItem } from "./orbitData";

interface CoachFlipCardsProps {
  coachId: "pete" | "kendra";
  name: string;
  role: string;
  accentColor: "cyan" | "sky" | "teal";
  imageSrc?: string;
  photoScale?: number;
  photoPosition?: string;
}

const accentConfig = {
  cyan: {
    text: "text-cyan-400",
    photoBorder: "border-cyan-500/40",
    bg: "bg-cyan-500/10",
    backBg: "bg-slate-900/95",
    backBorder: "border-cyan-500/40",
    iconBg: "bg-cyan-500/15",
  },
  sky: {
    text: "text-sky-400",
    photoBorder: "border-sky-500/40",
    bg: "bg-sky-500/10",
    backBg: "bg-slate-900/95",
    backBorder: "border-sky-500/40",
    iconBg: "bg-sky-500/15",
  },
  teal: {
    text: "text-teal-400",
    photoBorder: "border-teal-500/40",
    bg: "bg-teal-500/10",
    backBg: "bg-slate-900/95",
    backBorder: "border-teal-500/40",
    iconBg: "bg-teal-500/15",
  },
};

const GRID_TEMPLATE = {
  gridTemplateColumns: "1fr 2.2fr 1fr",
  gridTemplateRows: "1fr 2.2fr 1fr",
};

const CENTER_ID = "__center__";

interface SmallCardProps {
  item: OrbitItem;
  accentText: string;
  onActivate: () => void;
}

function SmallCard({ item, accentText, onActivate }: SmallCardProps) {
  return (
    <div
      className="w-full h-full cursor-pointer rounded-xl bg-slate-800/60 border border-slate-700/50 flex flex-col items-center justify-center gap-1.5 p-1.5 hover:bg-slate-700/60 hover:border-slate-600/60 transition-colors"
      onClick={onActivate}
    >
      <item.icon size={16} className={accentText} strokeWidth={2} />
      <span className="text-[9px] font-bold text-slate-300 text-center leading-tight">
        {item.label}
      </span>
    </div>
  );
}

export function CoachFlipCards({
  coachId,
  name,
  role,
  accentColor,
  imageSrc,
  photoScale = 1,
  photoPosition = "center",
}: CoachFlipCardsProps) {
  const items = orbitData[coachId].filter((item) => item.id !== "life");
  const accent = accentConfig[accentColor];
  const [activeId, setActiveId] = useState<string | null>(null);

  const before = items.slice(0, 4);
  const after = items.slice(4);
  const activeItem = items.find((i) => i.id === activeId) ?? null;
  const showCenter = activeId === CENTER_ID;

  return (
    <div className="w-full aspect-square relative">
      <div className="grid gap-2 w-full h-full" style={GRID_TEMPLATE}>
        {/* Cards 1–4 */}
        {before.map((item) => (
          <SmallCard
            key={item.id}
            item={item}
            accentText={accent.text}
            onActivate={() => setActiveId(item.id)}
          />
        ))}

        {/* Center — coach photo */}
        <div
          className={`relative w-full h-full rounded-2xl overflow-hidden border-2 ${accent.photoBorder} cursor-pointer`}
          onClick={() => setActiveId(activeId === CENTER_ID ? null : CENTER_ID)}
        >
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={name}
              fill
              sizes="(max-width: 768px) 40vw, 220px"
              className="object-cover"
              style={{
                objectPosition: photoPosition,
                transform: `scale(${photoScale})`,
                transformOrigin: photoPosition,
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
            <p className="text-white font-black text-base leading-tight">{name}</p>
            <p className={`text-[10px] font-semibold ${accent.text} leading-tight mt-0.5`}>{role}</p>
          </div>
        </div>

        {/* Cards 5–8 */}
        {after.map((item) => (
          <SmallCard
            key={item.id}
            item={item}
            accentText={accent.text}
            onActivate={() => setActiveId(item.id)}
          />
        ))}
      </div>

      {/* ── Full-grid overlay ── */}
      <AnimatePresence>
        {activeId && (
          <motion.div
            key={activeId}
            className={`absolute inset-0 z-20 rounded-2xl overflow-hidden border-2 ${accent.backBorder} bg-slate-950 cursor-pointer`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => setActiveId(null)}
          >
            {showCenter ? (
              /* ── Center expanded: full photo ── */
              <>
                {imageSrc && (
                  <Image
                    src={imageSrc}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 80vw, 400px"
                    className="object-cover"
                    style={{ objectPosition: photoPosition }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                  <p className="text-white font-black text-2xl leading-tight">{name}</p>
                  <p className={`text-sm font-semibold ${accent.text} leading-tight mt-1`}>{role}</p>
                </div>
              </>
            ) : activeItem ? (
              /* ── Card expanded: back content ── */
              <>
                {activeItem.imageSrc && (
                  <>
                    <Image
                      src={activeItem.imageSrc}
                      alt={activeItem.title}
                      fill
                      sizes="(max-width: 768px) 80vw, 400px"
                      className="object-cover opacity-65"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-950/40" />
                  </>
                )}
                {!activeItem.imageSrc && (
                  <div className={`absolute inset-0 ${accent.backBg}`} />
                )}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6 gap-4">
                  <div className={`p-4 rounded-2xl ${accent.iconBg}`}>
                    <activeItem.icon size={36} className={accent.text} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className={`text-xl font-black ${accent.text} leading-tight mb-2`}>
                      {activeItem.title}
                    </p>
                    <p className="text-slate-200 text-sm leading-relaxed">
                      {activeItem.description}
                    </p>
                  </div>
                  <p className="text-slate-500 text-xs mt-2">tap to close</p>
                </div>
              </>
            ) : null}

            {/* Close hint */}
            <div className="absolute top-3 right-3 z-30">
              <div className="w-7 h-7 rounded-full bg-slate-800/80 flex items-center justify-center">
                <X size={14} className="text-slate-400" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
