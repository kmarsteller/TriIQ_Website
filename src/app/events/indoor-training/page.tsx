import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Bike,
  Smile,
  ExternalLink,
  Settings,
  ChevronRight,
} from "lucide-react";
import type { ReactNode } from "react";

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "w-5 h-5"}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.034.057a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

export const metadata = {
  title: "Indoor Training Setup",
  description:
    "Everything you need to join Tri IQ's Discord-based indoor training sessions. Setup guides for Garmin/Tacx and Wahoo smart trainers.",
};

export default function IndoorTrainingPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 mb-5">
            <Bike size={13} className="text-cyan-400" />
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em]">Indoor Training</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Indoor Training{" "}
            <span className="text-cyan-400">Setup Guide</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Welcome to the Tri IQ Indoor Training Session Setup Guide. We look forward
            to a challenging and fun-filled indoor riding season!
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-10">

          {/* ── Minimum Requirements ── */}
          <div className="p-6 md:p-8 rounded-2xl border border-slate-700/60 bg-slate-900/60">
            <h2 className="text-xl font-black text-white mb-6">Minimum Requirements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: <DiscordIcon className="w-5 h-5 text-cyan-400" />,
                  title: "Discord",
                  desc: "Free app + account. Available on any device.",
                  href: "https://discord.com/download",
                },
                {
                  icon: <Bike size={20} className="text-cyan-400" />,
                  title: "Indoor Trainer",
                  desc: "Any type — smart or classic.",
                },
                {
                  icon: <Smile size={20} className="text-cyan-400" />,
                  title: "Positive Attitude",
                  desc: "That's it. We'll handle the rest.",
                },
              ].map((item) => {
                const inner = (
                  <>
                    <div className="inline-flex p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/25 mb-3">
                      {item.icon}
                    </div>
                    <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                  </>
                );
                return item.href ? (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-center p-5 rounded-xl bg-slate-800/50 border border-slate-700/40 hover:border-cyan-500/40 hover:bg-slate-800/80 transition-all"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={item.title}
                    className="flex flex-col items-center text-center p-5 rounded-xl bg-slate-800/50 border border-slate-700/40"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Communication Platform ── */}
          <div className="p-6 md:p-8 rounded-2xl border border-violet-500/25 bg-violet-500/5">
            <div className="flex items-start gap-4">
              <div className="shrink-0 p-2.5 rounded-xl bg-violet-500/15 border border-violet-500/25">
                {/* Discord icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-violet-400">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.034.057a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-black text-white mb-2">We ride on Discord</h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Instructor-led voice and video chat are hosted on the Tri IQ Discord Server.
                  Join from your computer, tablet, or phone. Video and microphone are optional —
                  just hop on and ride.
                </p>
                <a
                  href="https://discord.gg/2k9FGxmFg4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-500 hover:bg-violet-400 text-white font-bold rounded-full text-sm transition-all hover:shadow-lg hover:shadow-violet-500/30 active:scale-95"
                >
                  Join the Tri IQ Discord
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* ── Trainer Setup ── */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Settings size={18} className="text-cyan-400" />
              <h2 className="text-xl font-black text-white">Smart Trainer Setup</h2>
            </div>

            <div className="space-y-5">
              {/* Garmin / Tacx */}
              <div className="p-6 rounded-2xl border border-slate-700/60 bg-slate-900/60">
                <div className="flex items-center gap-4 mb-3">
                  <Image
                    src="/garmin-logo.png"
                    alt="Garmin"
                    width={100}
                    height={32}
                    className="rounded-md"
                  />
                  <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">/ Tacx</span>
                </div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">
                  Slope / Grade Mode
                </p>
                <ol className="space-y-3">
                  {[
                    "Open the Garmin Connect app or use your Tacx device display.",
                    'Select a "Slope" or "Grade Simulation" workout mode.',
                    "Adjust the grade percentage as directed by your coach during the session.",
                    "Your trainer will automatically adjust resistance to match the simulated incline.",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-black mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-slate-300 text-sm leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
                <a
                  href="https://support.garmin.com/en-US/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Garmin support documentation
                  <ExternalLink size={11} />
                </a>
              </div>

              {/* Wahoo */}
              <div className="p-6 rounded-2xl border border-slate-700/60 bg-slate-900/60">
                <div className="mb-3">
                  <Image
                    src="/wahoologo.png"
                    alt="Wahoo"
                    width={100}
                    height={28}
                    className="brightness-0 invert opacity-80"
                  />
                </div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">
                  LEVEL / Resistance Mode — KICKR, CORE, SNAP, BIKE
                </p>
                <ol className="space-y-3">
                  {[
                    "Open the Wahoo Fitness app and connect to your KICKR trainer via Bluetooth.",
                    'Navigate to "Workout" and select "LEVEL" mode from the resistance options.',
                    "Set your resistance level as instructed during the session (0–10 scale).",
                    "Your trainer will hold a fixed resistance regardless of your speed — great for interval work.",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-black mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-slate-300 text-sm leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
                <a
                  href="https://support.wahoofitness.com/hc/en-us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Wahoo support documentation
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>

          {/* ── Coaches ── */}
          <div className="p-6 md:p-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5">
            <h2 className="text-lg font-black text-white mb-2">Your Coaches</h2>
            <p className="text-slate-400 text-sm mb-5">
              Questions about setup? Reach out directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {[
                { name: "Coach Pete", email: "coachpete@triiqcoaching.com" },
                { name: "Coach Kendra", email: "coachkendra@triiqcoaching.com" },
              ].map((coach) => (
                <a
                  key={coach.name}
                  href={`mailto:${coach.email}`}
                  className="flex items-center justify-between gap-3 flex-1 px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700/50 hover:border-cyan-500/40 transition-all group"
                >
                  <div>
                    <p className="text-white font-bold text-sm">{coach.name}</p>
                    <p className="text-slate-500 text-xs">{coach.email}</p>
                  </div>
                  <ChevronRight size={14} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Checklist ── */}
          <div className="p-6 rounded-2xl border border-slate-700/40 bg-slate-900/30">
            <h2 className="text-base font-black text-white mb-4">Pre-session checklist</h2>
            <ul className="space-y-2.5">
              {[
                "Discord installed and logged in",
                "Joined the Tri IQ Discord server",
                "Bike mounted on trainer",
                "Trainer app open and connected",
                "Water bottle filled",
                "Fan ready to go",
                "Towel within reach",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full text-sm transition-all hover:shadow-lg hover:shadow-cyan-500/30 active:scale-95"
            >
              Questions? Contact a Coach
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
