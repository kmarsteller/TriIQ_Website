import Link from "next/link";
import {
  Waves,
  Download,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Users,
  Clock,
  MapPin,
} from "lucide-react";

export const metadata = {
  title: "TriCLE Swim Clinic",
  description:
    "Join Tri IQ's CTC & TriCLE Swim Clinic. Improve your open-water and pool technique with expert coaching. Download our Beginner Swim Drills PDF.",
};

const drills = [
  { name: "Catch-up Drill", focus: "Timing & distance per stroke" },
  { name: "Fingertip Drag", focus: "High-elbow recovery" },
  { name: "Fist Drill", focus: "Forearm feel + early vertical forearm" },
  { name: "Side-Kick Drill", focus: "Body rotation & balance" },
  { name: "Single-Arm Freestyle", focus: "Catch mechanics & pull path" },
  { name: "Bilateral Breathing", focus: "Even stroke & breathing control" },
];

export default function SwimClinicPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 mb-5">
            <Waves size={13} className="text-cyan-400" />
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em]">Swim Events</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            CTC &amp; TriCLE{" "}
            <span className="text-cyan-400">Swim Clinic</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Technique-focused swim sessions designed for triathletes of all
            levels. Build efficiency, confidence, and speed in the water.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-10">

          {/* ── Quick Info ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Users, title: "All Levels Welcome", desc: "Beginner through advanced triathletes." },
              { icon: Clock, title: "Technique Focus", desc: "Drills, video analysis, and coached feedback." },
              { icon: MapPin, title: "Pool & Open Water", desc: "Sessions held at local partner facilities." },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center text-center p-5 rounded-xl bg-slate-800/50 border border-slate-700/40"
              >
                <div className="inline-flex p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/25 mb-3">
                  <item.icon size={20} className="text-cyan-400" />
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* ── About ── */}
          <div className="p-6 md:p-8 rounded-2xl border border-slate-700/60 bg-slate-900/60">
            <h2 className="text-xl font-black text-white mb-4">About the Clinic</h2>
            <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
              <p>
                The CTC &amp; TriCLE Swim Clinic is a collaboration between Tri IQ Coaching
                and local triathlon clubs, bringing together athletes who want to become
                stronger, more efficient swimmers.
              </p>
              <p>
                Whether you&apos;re learning to breathe bilaterally or dialing in your open-water
                sighting, our coaches break down the fundamentals and give you the drills
                to take your swimming to the next level — one length at a time.
              </p>
              <p>
                Sessions include warm-up, focused drill sets, technique video review
                (where available), and a coached main set. Questions are encouraged.
              </p>
            </div>
          </div>

          {/* ── Drill PDF Download ── */}
          <div className="p-6 md:p-8 rounded-2xl border border-cyan-500/25 bg-cyan-500/5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="flex-1">
                <h2 className="text-lg font-black text-white mb-2">
                  Beginner Swim Drills PDF
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Download our free reference guide covering six foundational drills
                  used in every clinic. Includes diagrams, coaching cues, and suggested
                  sets you can practice on your own.
                </p>
              </div>
              <a
                href="/resources/swim-drills.pdf"
                download
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full text-sm transition-all hover:shadow-lg hover:shadow-cyan-500/30 active:scale-95"
              >
                <Download size={14} />
                Download PDF
              </a>
            </div>
          </div>

          {/* ── Drill List ── */}
          <div>
            <h2 className="text-xl font-black text-white mb-6">
              Clinic Drill Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {drills.map((drill, i) => (
                <div
                  key={drill.name}
                  className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/40"
                >
                  <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-black mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-white font-bold text-sm">{drill.name}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{drill.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── What to Bring ── */}
          <div className="p-6 rounded-2xl border border-slate-700/40 bg-slate-900/30">
            <h2 className="text-base font-black text-white mb-4">What to bring</h2>
            <ul className="space-y-2.5">
              {[
                "Swimsuit and goggles",
                "Pull buoy (recommended)",
                "Kick board (usually provided at the pool)",
                "Fins (optional — short blade preferred)",
                "Water bottle",
                "Notebook or phone for taking notes",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div className="p-6 md:p-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5">
            <h2 className="text-lg font-black text-white mb-2">Questions or Registration</h2>
            <p className="text-slate-400 text-sm mb-5">
              Reach out directly or use the contact form and we&apos;ll get back to you within 24–48 hours.
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

          <div className="text-center pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full text-sm transition-all hover:shadow-lg hover:shadow-cyan-500/30 active:scale-95"
            >
              Contact a Coach
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
