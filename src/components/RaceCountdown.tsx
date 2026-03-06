"use client";

import { useState, useEffect } from "react";
import { MapPin, Zap } from "lucide-react";

interface CountdownRace {
  name: string;
  isoDate: string;
  date: string;
  day: string;
  location: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function RaceCountdown({ races }: { races: CountdownRace[] }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextRace = races
    .filter((r) => r.isoDate !== "TBD" && new Date(r.isoDate) >= today)
    .sort((a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime())[0];

  useEffect(() => {
    setMounted(true);
    if (!nextRace) return;

    const tick = () => {
      const now = Date.now();
      const target = new Date(nextRace.isoDate + "T00:00:00").getTime();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1_000),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [nextRace?.isoDate]);

  if (!mounted || !nextRace || !timeLeft) return null;

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HRS",  value: timeLeft.hours },
    { label: "MIN",  value: timeLeft.minutes },
    { label: "SEC",  value: timeLeft.seconds },
  ];

  return (
    <div className="mb-8 rounded-2xl bg-cyan-500/8 border border-cyan-500/25 relative overflow-hidden">
      {/* background glow */}
      <div className="absolute -top-8 -right-8 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <Zap size={10} className="text-cyan-400" fill="currentColor" />
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                Next Race
              </span>
            </div>
            <p className="text-white font-black text-lg leading-tight truncate">{nextRace.name}</p>
            <div className="flex items-center gap-1 mt-1 flex-wrap">
              <MapPin size={10} className="text-slate-500 shrink-0" />
              <span className="text-slate-400 text-xs">{nextRace.location}</span>
              <span className="text-slate-600 text-xs">·</span>
              <span className="text-slate-400 text-xs">{nextRace.date} · {nextRace.day}</span>
            </div>
          </div>
        </div>

        {/* Countdown grid */}
        <div className="grid grid-cols-4 gap-2">
          {units.map(({ label, value }) => (
            <div
              key={label}
              className="text-center bg-slate-900/70 rounded-xl py-3 px-1 border border-slate-800/60"
            >
              <div className="text-2xl font-black text-white tabular-nums leading-none mb-1">
                {pad(value)}
              </div>
              <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
