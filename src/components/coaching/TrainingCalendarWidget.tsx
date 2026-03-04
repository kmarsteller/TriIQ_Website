"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const week = [
  {
    day: "MON",
    workouts: [{ label: "Swim", sub: "Endurance", dur: "1:00", tss: 55, color: "bg-blue-500/80 border-blue-400/40", dot: "bg-blue-400" }],
  },
  {
    day: "TUE",
    workouts: [{ label: "Bike", sub: "Z2 Ride", dur: "1:30", tss: 72, color: "bg-cyan-500/80 border-cyan-400/40", dot: "bg-cyan-400" }],
  },
  {
    day: "WED",
    workouts: [
      { label: "Run", sub: "Easy Pace", dur: "0:45", tss: 48, color: "bg-orange-500/70 border-orange-400/40", dot: "bg-orange-400" },
      { label: "Swim", sub: "Drills", dur: "0:30", tss: 28, color: "bg-blue-500/80 border-blue-400/40", dot: "bg-blue-400" },
    ],
  },
  { day: "THU", workouts: [] },
  {
    day: "FRI",
    workouts: [{ label: "Bike", sub: "Intervals", dur: "1:15", tss: 88, color: "bg-cyan-500/80 border-cyan-400/40", dot: "bg-cyan-400" }],
  },
  {
    day: "SAT",
    workouts: [
      { label: "Bike", sub: "Long Ride", dur: "3:00", tss: 142, color: "bg-cyan-500/80 border-cyan-400/40", dot: "bg-cyan-400" },
      { label: "Run", sub: "Brick", dur: "0:20", tss: 25, color: "bg-orange-500/70 border-orange-400/40", dot: "bg-orange-400" },
    ],
  },
  {
    day: "SUN",
    workouts: [{ label: "Run", sub: "Long Run", dur: "1:30", tss: 94, color: "bg-orange-500/70 border-orange-400/40", dot: "bg-orange-400" }],
  },
];

// Sequential reveal order: [dayIndex, workoutIndex]
const revealOrder: [number, number][] = [
  [0, 0], // Mon: Swim
  [1, 0], // Tue: Bike
  [2, 0], // Wed: Run
  [2, 1], // Wed: Swim (double)
  [4, 0], // Fri: Bike Intervals
  [5, 0], // Sat: Long Ride
  [5, 1], // Sat: Brick Run
  [6, 0], // Sun: Long Run
];

const INTERVAL_MS = 420;
const totalTSS = week.flatMap((d) => d.workouts).reduce((s, w) => s + w.tss, 0);

export function TrainingCalendarWidget() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [revealedCount, setRevealedCount] = useState(0);
  const [activePulse, setActivePulse] = useState<string | null>(null);

  useEffect(() => {
    if (!isInView) return;
    setRevealedCount(0);

    const timers: ReturnType<typeof setTimeout>[] = [];

    revealOrder.forEach(([di, wi], i) => {
      // Brief pulse on the placeholder just before reveal
      timers.push(setTimeout(() => setActivePulse(`${di}-${wi}`), i * INTERVAL_MS + 100));
      // Reveal the block
      timers.push(setTimeout(() => {
        setActivePulse(null);
        setRevealedCount(i + 1);
      }, i * INTERVAL_MS + 280));
    });

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  const isRevealed = (di: number, wi: number) =>
    revealOrder.findIndex(([d, w]) => d === di && w === wi) < revealedCount;

  const currentTSS = revealOrder
    .slice(0, revealedCount)
    .reduce((sum, [di, wi]) => sum + week[di].workouts[wi].tss, 0);

  return (
    <div ref={ref} className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
          Week 8 of 20 — Build Phase
        </span>
        <div className="flex items-center gap-1.5">
          <motion.span
            className="text-[10px] text-cyan-400 font-bold tabular-nums"
            animate={{ scale: currentTSS > 0 && currentTSS < totalTSS ? [1, 1.15, 1] : 1 }}
            transition={{ duration: 0.2 }}
            key={currentTSS}
          >
            {currentTSS > 0 ? `${currentTSS} TSS` : "– TSS"}
          </motion.span>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {week.map((day, di) => (
          <div key={day.day} className="flex flex-col gap-1">
            {/* Day label */}
            <div className="text-center text-[9px] font-bold text-slate-500 uppercase mb-0.5">
              {day.day}
            </div>

            {/* Cells */}
            <div className="flex flex-col gap-1 min-h-[80px]">
              {day.workouts.length === 0 ? (
                <div className="flex-1 rounded-lg border border-slate-800/60 flex items-center justify-center">
                  <span className="text-[8px] text-slate-700 font-medium">REST</span>
                </div>
              ) : (
                day.workouts.map((w, wi) => {
                  const key = `${di}-${wi}`;
                  const revealed = isRevealed(di, wi);
                  const pulsing = activePulse === key;

                  return revealed ? (
                    <motion.div
                      key={key + "-filled"}
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      transition={{ duration: 0.22, ease: [0.34, 1.26, 0.64, 1] }}
                      style={{ transformOrigin: "top" }}
                      className={`rounded-lg border px-1 py-1.5 ${w.color}`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${w.dot} mb-1`} />
                      <div className="text-[9px] font-black text-white leading-tight">{w.label}</div>
                      <div className="text-[8px] text-white/70 leading-tight">{w.sub}</div>
                      <div className="text-[8px] text-white/90 font-bold mt-0.5">{w.dur}</div>
                      <div className="text-[8px] text-white/60">{w.tss} TSS</div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={key + "-empty"}
                      animate={pulsing ? { borderColor: "rgba(6,182,212,0.5)", backgroundColor: "rgba(6,182,212,0.06)" } : { borderColor: "rgba(51,65,85,0.4)", backgroundColor: "transparent" }}
                      transition={{ duration: 0.15 }}
                      className="rounded-lg border border-dashed min-h-[60px]"
                    />
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-3 pt-3 border-t border-slate-800">
        {[
          { dot: "bg-blue-400", label: "Swim" },
          { dot: "bg-cyan-400", label: "Bike" },
          { dot: "bg-orange-400", label: "Run" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${item.dot}`} />
            <span className="text-[10px] text-slate-500">{item.label}</span>
          </div>
        ))}
        <div className="ml-auto text-[10px] text-slate-500">~8.3 hrs / week</div>
      </div>
    </div>
  );
}
