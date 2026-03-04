"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const conversation = [
  {
    from: "athlete",
    text: "Coach, legs are really heavy heading into Saturday's long ride. Should I push through?",
    time: "8:41 AM",
  },
  {
    from: "coach",
    text: "Good call checking in! Drop intensity to Z2 and cut 30 min off the ride. Recovery wins over fatigue right now 💪",
    time: "8:44 AM",
  },
  {
    from: "athlete",
    text: "Got it. What about Sunday's long run?",
    time: "8:46 AM",
  },
  {
    from: "coach",
    text: "Keep it conversational — 45 min easy pace only. We're building fitness, not burning it. You're right on track for race day 🎯",
    time: "8:48 AM",
  },
];

// When each message becomes visible (ms from cycle start)
const REVEAL_TIMES = [500, 2600, 4400, 6800];
const CYCLE_DURATION = 11500;

export function CoachChatWidget() {
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const [showTyping, setShowTyping] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    setVisible(new Set());
    setShowTyping(false);

    REVEAL_TIMES.forEach((t, i) => {
      // Show typing indicator ~1.2s before coach replies
      if (i === 1 || i === 3) {
        timers.push(setTimeout(() => setShowTyping(true), t - 1200));
      }
      timers.push(
        setTimeout(() => {
          setShowTyping(false);
          setVisible((prev) => new Set([...prev, i]));
        }, t)
      );
    });

    // Restart cycle
    timers.push(setTimeout(() => setCycle((c) => c + 1), CYCLE_DURATION));

    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  return (
    <div className="w-full select-none">
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 mb-4 border-b border-slate-700/50">
        <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-sm shrink-0">
          CP
        </div>
        <div>
          <div className="text-white text-sm font-semibold">Coach Pete</div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-green-400 text-xs">Online</span>
          </div>
        </div>
        <div className="ml-auto text-[10px] text-slate-600 uppercase tracking-wider font-medium">
          Weekly Check-In
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-2.5 min-h-[200px]">
        <AnimatePresence>
          {conversation.map(
            (msg, i) =>
              visible.has(i) && (
                <motion.div
                  key={`${cycle}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.from === "coach" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.from === "coach"
                        ? "bg-slate-700/80 text-slate-200 rounded-tl-sm"
                        : "bg-cyan-500/15 border border-cyan-500/25 text-cyan-50 rounded-tr-sm"
                    }`}
                  >
                    {msg.text}
                    <div
                      className={`text-[10px] mt-1 ${
                        msg.from === "coach" ? "text-slate-500" : "text-cyan-500/60"
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {showTyping && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="bg-slate-700/80 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    className="w-1.5 h-1.5 rounded-full bg-slate-400"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      delay: dot * 0.18,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
