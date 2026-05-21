"use client";

import Image from "next/image";
import { useState } from "react";
import { orbitData } from "./orbitData";
import type { OrbitItem } from "./orbitData";

interface CoachFlipCardsProps {
  coachId: "pete" | "kendra";
  name: string;
  role: string;
  accentColor: "cyan" | "sky" | "teal";
  imageSrc?: string;
}

const accentConfig = {
  cyan: {
    text: "text-cyan-400",
    photoBorder: "border-cyan-500/40",
    photoBg: "bg-cyan-500/5",
    backBg: "bg-cyan-950/60",
    backBorder: "border-cyan-500/40",
  },
  sky: {
    text: "text-sky-400",
    photoBorder: "border-sky-500/40",
    photoBg: "bg-sky-500/5",
    backBg: "bg-sky-950/60",
    backBorder: "border-sky-500/40",
  },
  teal: {
    text: "text-teal-400",
    photoBorder: "border-teal-500/40",
    photoBg: "bg-teal-500/5",
    backBg: "bg-teal-950/60",
    backBorder: "border-teal-500/40",
  },
};

// Center cell is 2.2× the size of the surrounding card cells
const GRID_TEMPLATE = {
  gridTemplateColumns: "1fr 2.2fr 1fr",
  gridTemplateRows: "1fr 2.2fr 1fr",
};

interface FlipCardProps {
  item: OrbitItem;
  accent: (typeof accentConfig)[keyof typeof accentConfig];
  isFlipped: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

function FlipCard({ item, accent, isFlipped, onMouseEnter, onMouseLeave, onClick }: FlipCardProps) {
  return (
    <div
      className="[perspective:700px] w-full h-full cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front — icon + label */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-xl bg-slate-800/60 border border-slate-700/50 flex flex-col items-center justify-center gap-1.5 p-2">
          <item.icon size={16} className={accent.text} strokeWidth={2} />
          <span className="text-[8px] font-bold text-slate-300 text-center leading-tight px-0.5">
            {item.label}
          </span>
        </div>

        {/* Back — title + description */}
        <div
          className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl ${accent.backBg} border ${accent.backBorder} overflow-hidden flex flex-col items-center justify-center text-center p-2`}
        >
          {item.imageSrc && (
            <>
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                sizes="100px"
                className="object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
            </>
          )}
          <div className="relative z-10 flex flex-col gap-1">
            <span className={`text-[8px] font-black ${accent.text} leading-tight`}>
              {item.title}
            </span>
            <span className="text-[7px] text-slate-300 leading-tight">
              {item.description}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CoachFlipCards({
  coachId,
  name,
  role,
  accentColor,
  imageSrc,
}: CoachFlipCardsProps) {
  // Remove the "life" card for both coaches (Music & Travel / Life Outside)
  const items = orbitData[coachId].filter((item) => item.id !== "life");
  const accent = accentConfig[accentColor];
  const [flippedId, setFlippedId] = useState<string | null>(null);

  // 8 cards: 4 before center, 4 after — fills a 3×3 grid with photo in position 5
  const before = items.slice(0, 4);
  const after = items.slice(4);

  const makeHandlers = (item: OrbitItem) => ({
    isFlipped: flippedId === item.id,
    onMouseEnter: () => setFlippedId(item.id),
    onMouseLeave: () => setFlippedId(null),
    onClick: () => setFlippedId(flippedId === item.id ? null : item.id),
  });

  return (
    <div className="w-full aspect-square">
      <div className="grid gap-2 w-full h-full" style={GRID_TEMPLATE}>
        {/* Cards 1–4 (top-left, top-center, top-right, middle-left) */}
        {before.map((item) => (
          <FlipCard key={item.id} item={item} accent={accent} {...makeHandlers(item)} />
        ))}

        {/* Center — big coach photo full-bleed with text overlay */}
        <div className={`relative w-full h-full rounded-2xl overflow-hidden border-2 ${accent.photoBorder}`}>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={name}
              fill
              sizes="(max-width: 768px) 40vw, 220px"
              className="object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-800">
              <span className="text-5xl font-black text-white">
                {name.replace("Coach ", "")[0]}
              </span>
            </div>
          )}
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          {/* Name + role pinned to bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
            <p className="text-white font-black text-base leading-tight">{name}</p>
            <p className={`text-[10px] font-semibold ${accent.text} leading-tight mt-0.5`}>{role}</p>
          </div>
        </div>

        {/* Cards 5–8 (middle-right, bottom-left, bottom-center, bottom-right) */}
        {after.map((item) => (
          <FlipCard key={item.id} item={item} accent={accent} {...makeHandlers(item)} />
        ))}
      </div>
    </div>
  );
}
