"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

const disciplines = [
  { label: "Swim", pct: 18, hrs: 2.1, color: "bg-blue-500",   track: "bg-blue-500/15",   text: "text-blue-400",   dot: "bg-blue-400"   },
  { label: "Bike", pct: 52, hrs: 5.8, color: "bg-cyan-500",   track: "bg-cyan-500/15",   text: "text-cyan-400",   dot: "bg-cyan-400"   },
  { label: "Run",  pct: 30, hrs: 3.4, color: "bg-orange-500", track: "bg-orange-500/15", text: "text-orange-400", dot: "bg-orange-400" },
];

const weeklyTSS = [290, 320, 380, 410, 450, 420, 500, 540, 580, 610, 560, 640];
const maxTSS = 640;
const BAR_INTERVAL = 115; // ms between each TSS bar
const BARS_START   = 2300; // ms delay before TSS bars begin

export function TrainingBalanceWidget() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // ── Discipline bar motion values (one per bar) ───────────────────────────
  const p0 = useMotionValue(0); // Swim
  const p1 = useMotionValue(0); // Bike
  const p2 = useMotionValue(0); // Run

  // Bar widths — animate with motion value
  const w0 = useTransform(p0, [0, 1], ["0%", `${disciplines[0].pct}%`]);
  const w1 = useTransform(p1, [0, 1], ["0%", `${disciplines[1].pct}%`]);
  const w2 = useTransform(p2, [0, 1], ["0%", `${disciplines[2].pct}%`]);

  // Live percentage counters
  const pct0 = useTransform(p0, (v) => `${Math.round(v * disciplines[0].pct)}%`);
  const pct1 = useTransform(p1, (v) => `${Math.round(v * disciplines[1].pct)}%`);
  const pct2 = useTransform(p2, (v) => `${Math.round(v * disciplines[2].pct)}%`);

  // Live hours counters
  const hrs0 = useTransform(p0, (v) => `${(v * disciplines[0].hrs).toFixed(1)} hrs`);
  const hrs1 = useTransform(p1, (v) => `${(v * disciplines[1].hrs).toFixed(1)} hrs`);
  const hrs2 = useTransform(p2, (v) => `${(v * disciplines[2].hrs).toFixed(1)} hrs`);

  // ── Season stats count-up ─────────────────────────────────────────────────
  const sP = useMotionValue(0);
  const hrsText  = useTransform(sP, (v) => (v * 11.3).toFixed(1));
  const tssText  = useTransform(sP, (v) => Math.round(v * 5240).toLocaleString());
  const racesOpa = useTransform(sP, [0.7, 1], [0, 1]);

  // ── TSS bars — sequential reveal ─────────────────────────────────────────
  const [revealedBars, setRevealedBars] = useState(0);

  // Group all derived arrays for clean JSX mapping
  const widths = [w0, w1, w2];
  const pcts   = [pct0, pct1, pct2];
  const hrsList = [hrs0, hrs1, hrs2];

  useEffect(() => {
    if (!isInView) return;

    // Discipline bars: sequential with staggered delay
    animate(p0, 1, { duration: 0.85, ease: "easeOut", delay: 0.2 });
    animate(p1, 1, { duration: 1.05, ease: "easeOut", delay: 0.85 });
    animate(p2, 1, { duration: 0.95, ease: "easeOut", delay: 1.6 });

    // TSS bars: one by one
    setRevealedBars(0);
    const timers = weeklyTSS.map((_, i) =>
      setTimeout(() => setRevealedBars(i + 1), BARS_START + i * BAR_INTERVAL)
    );

    // Season stats: count up after bars finish
    const statsDelay = (BARS_START + weeklyTSS.length * BAR_INTERVAL) / 1000 + 0.15;
    animate(sP, 1, { duration: 1.3, ease: "easeOut", delay: statsDelay });

    return () => timers.forEach(clearTimeout);
  }, [isInView, p0, p1, p2, sP]);

  const currentTSS = weeklyTSS
    .slice(0, revealedBars)
    .reduce((sum, v) => sum + v, 0);

  return (
    <div ref={ref} className="w-full">

      {/* ── Discipline balance bars ─────────────────────────────────────── */}
      <div className="mb-5">
        <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-2.5">
          Weekly Training Balance
        </div>
        <div className="space-y-3">
          {disciplines.map((d, i) => (
            <div key={d.label}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${d.dot}`} />
                  <span className="text-xs font-semibold text-white">{d.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.span className="text-[10px] text-slate-500 tabular-nums">
                    {hrsList[i]}
                  </motion.span>
                  <motion.span className={`text-[10px] font-bold tabular-nums ${d.text}`}>
                    {pcts[i]}
                  </motion.span>
                </div>
              </div>
              <div className={`h-2.5 rounded-full ${d.track}`}>
                <motion.div
                  className={`h-full rounded-full ${d.color}`}
                  style={{ width: widths[i] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Weekly TSS bar chart ─────────────────────────────────────────── */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Weekly Training Load (TSS)
          </span>
          <motion.span
            key={currentTSS}
            initial={{ scale: 1.12, color: "#22d3ee" }}
            animate={{ scale: 1, color: "#22d3ee" }}
            transition={{ duration: 0.18 }}
            className="text-[10px] font-bold tabular-nums"
          >
            {currentTSS > 0 ? `${currentTSS.toLocaleString()} total` : ""}
          </motion.span>
        </div>

        <svg viewBox="0 0 300 60" className="w-full" style={{ height: 52 }}>
          {weeklyTSS.map((tss, i) => {
            const barW  = 18;
            const gap   = (300 - weeklyTSS.length * barW) / (weeklyTSS.length + 1);
            const x     = gap + i * (barW + gap);
            const fullH = (tss / maxTSS) * 46;
            const revealed = i < revealedBars;
            const isLatest = i === revealedBars - 1;

            return (
              <g key={i}>
                <motion.rect
                  x={x}
                  width={barW}
                  rx="2"
                  initial={{ height: 0, y: 50 }}
                  animate={{
                    height: revealed ? fullH : 0,
                    y:      revealed ? 50 - fullH : 50,
                    fill:   isLatest
                      ? "#22d3ee"
                      : tss === maxTSS
                      ? "#06b6d4"
                      : "rgba(6,182,212,0.32)",
                  }}
                  transition={{ duration: 0.26, ease: [0.34, 1.1, 0.64, 1] }}
                />
                <text
                  x={x + barW / 2}
                  y={58}
                  fontSize="6.5"
                  fill="#475569"
                  textAnchor="middle"
                >
                  W{i + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Season stats count-up ────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800">
        <div className="text-center">
          <motion.div className="text-sm font-black text-white tabular-nums">
            {hrsText}
          </motion.div>
          <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">
            Avg hrs/week
          </div>
        </div>
        <div className="text-center">
          <motion.div className="text-sm font-black text-white tabular-nums">
            {tssText}
          </motion.div>
          <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">
            Season TSS
          </div>
        </div>
        <div className="text-center">
          <motion.div
            className="text-sm font-black text-white"
            style={{ opacity: racesOpa }}
          >
            4
          </motion.div>
          <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">
            Races planned
          </div>
        </div>
      </div>
    </div>
  );
}
