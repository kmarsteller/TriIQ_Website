"use client";

import { useState } from "react";
import { RaceCountdown } from "@/components/RaceCountdown";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Users,
  Calendar,
  Tag,
  ShoppingBag,
  MapPin,
  Clock,
  ExternalLink,
  Copy,
  Check,
  LogOut,
  Zap,
  Waves,
  Bike,
  Timer,
  Star,
  ChevronRight,
  ShieldCheck,
  Package,
  Lock,
} from "lucide-react";

// ── Partner data ──────────────────────────────────────────────────────────────

interface Partner {
  id: string;
  name: string;
  tagline: string;
  description: string;
  discount: string | null;
  code: string | null;
  url: string;
  domain: string;
  logo?: string;
  logoBg?: string;
  category: string;
  accent: {
    text: string;
    bg: string;
    border: string;
    badge: string;
    badgeText: string;
    glow: string;
  };
}

const partners: Partner[] = [
  {
    id: "zealios",
    name: "Zealios",
    tagline: "Performance lubricants & skin care",
    description:
      "Anti-chafe chamois cream, premium chain lube, and recovery products trusted by triathletes and cyclists worldwide. Kinder on your skin, faster on the road.",
    discount: "25% OFF",
    code: "ZupTRIIQ",
    url: "https://www.zealios.com",
    domain: "zealios.com",
    logo: "/partners/zealios.avif",
    category: "Recovery & Lube",
    accent: {
      text: "text-emerald-400",
      bg: "bg-emerald-500/8",
      border: "border-emerald-500/25",
      badge: "bg-emerald-500",
      badgeText: "text-white",
      glow: "shadow-emerald-500/20",
    },
  },
  {
    id: "orca",
    name: "Orca",
    tagline: "Elite wetsuits & triathlon apparel",
    description:
      "Premium wetsuits, tri suits, and training gear used by Team USA athletes and Ironman champions. Engineered for buoyancy, flexibility, and speed.",
    discount: "20% OFF",
    code: "OF_TRIIQCOACH20",
    url: "https://www.orca.com",
    domain: "orca.com",
    category: "Wetsuits & Apparel",
    accent: {
      text: "text-blue-400",
      bg: "bg-blue-500/8",
      border: "border-blue-500/25",
      badge: "bg-blue-500",
      badgeText: "text-white",
      glow: "shadow-blue-500/20",
    },
  },
  {
    id: "finis",
    name: "FINIS",
    tagline: "Innovative swim training equipment",
    description:
      "Front-mounted snorkels, hand paddles, fins, tempo trainers, and technology-driven tools that help you improve stroke efficiency and speed in the water.",
    discount: "20% OFF",
    code: "TRIIQ",
    url: "https://www.finisswim.com",
    domain: "finisswim.com",
    category: "Swim Gear",
    accent: {
      text: "text-cyan-400",
      bg: "bg-cyan-500/8",
      border: "border-cyan-500/25",
      badge: "bg-cyan-500",
      badgeText: "text-slate-950",
      glow: "shadow-cyan-500/20",
    },
  },
  {
    id: "xterra",
    name: "Xterra Wetsuits",
    tagline: "High-performance wetsuits, incredible value",
    description:
      "Top-tier triathlon wetsuits engineered for speed, buoyancy, and flexibility — at a fraction of the price of legacy brands. Don't pay more than you have to.",
    discount: "Up to 87% OFF",
    code: "C-TRIIQ",
    url: "https://www.xterrawetsuits.com",
    domain: "xterrawetsuits.com",
    logo: "/partners/xterra.png",
    logoBg: "bg-slate-700",
    category: "Wetsuits",
    accent: {
      text: "text-orange-400",
      bg: "bg-orange-500/8",
      border: "border-orange-500/25",
      badge: "bg-orange-500",
      badgeText: "text-white",
      glow: "shadow-orange-500/20",
    },
  },
  {
    id: "zym",
    name: "ZYM",
    tagline: "Electrolyte hydration for endurance",
    description:
      "Zero-calorie, sugar-free electrolyte drink tabs engineered for peak hydration during long training days and race day. Real electrolytes, no junk.",
    discount: "35% OFF",
    code: "Z-TRIIQ",
    url: "https://www.drinkzym.com",
    domain: "drinkzym.com",
    logo: "/partners/zym.avif",
    category: "Hydration",
    accent: {
      text: "text-red-400",
      bg: "bg-red-500/8",
      border: "border-red-500/25",
      badge: "bg-red-500",
      badgeText: "text-white",
      glow: "shadow-red-500/20",
    },
  },
  {
    id: "ncm",
    name: "North Coast Multisports",
    tagline: "Your local Northeast Ohio tri shop",
    description:
      "Expert staff, premium gear selection, and a true community hub for triathletes across Greater Cleveland. Stop in, say hi, and tell them Tri IQ sent you.",
    discount: null,
    code: null,
    url: "https://www.ncmultisports.com",
    domain: "ncmultisports.com",
    logo: "/partners/ncm.png",
    category: "Local Partner",
    accent: {
      text: "text-yellow-400",
      bg: "bg-cyan-500/8",
      border: "border-cyan-500/25",
      badge: "bg-yellow-500",
      badgeText: "text-slate-950",
      glow: "shadow-yellow-500/20",
    },
  },
];

// ── Race calendar data ────────────────────────────────────────────────────────

interface Race {
  id: string;
  name: string;
  date: string;     // display string, e.g. "May 31" or "7–9"
  month: string;    // 3-letter all-caps, e.g. "MAY"
  day: string;      // day of week, e.g. "Sun" or "Fri–Sun"
  isoDate: string;  // "YYYY-MM-DD" for date comparison, or "TBD"
  location: string;
  distances: string[];
  url: string;
  featured?: boolean;
}

function isRacePast(isoDate: string): boolean {
  if (isoDate === "TBD") return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(isoDate) < today;
}

const races: Race[] = [
  {
    id: "in-like-a-lion",
    name: "In Like a Lion Run",
    date: "Mar 1",
    month: "MAR",
    day: "Sun",
    isoDate: "2026-03-01",
    location: "Sagamore Hills, OH",
    distances: ["Run"],
    url: "#",
  },
  {
    id: "buckeye",
    name: "Buckeye Triathlon",
    date: "May 31",
    month: "MAY",
    day: "Sun",
    isoDate: "2026-05-31",
    location: "Waynesville, OH",
    distances: ["Sprint", "Olympic"],
    url: "https://hfpracing.com/race/great-buckeye-challenge-triathlon-duathlon-aquabike-at-caesar-creek-state-park/",
  },
  {
    id: "maumee",
    name: "Maumee Bay Triathlon",
    date: "Jun 14",
    month: "JUN",
    day: "Sun",
    isoDate: "2026-06-14",
    location: "Oregon, OH",
    distances: ["Sprint", "Olympic"],
    url: "https://hfpracing.com/race/maumee-bay-triathlon-duathlon-aquabike/",
  },
  {
    id: "rockford",
    name: "IRONMAN 70.3 Rockford",
    date: "Jun 14",
    month: "JUN",
    day: "Sun",
    isoDate: "2026-06-14",
    location: "Rockford, IL",
    distances: ["70.3"],
    url: "https://www.ironman.com/races/im703-rockford-illinois",
  },
  {
    id: "imoh",
    name: "IRONMAN Ohio 70.3",
    date: "Jul 19",
    month: "JUL",
    day: "Sun",
    isoDate: "2026-07-19",
    location: "Sandusky, OH",
    distances: ["70.3"],
    url: "https://www.ironman.com/im703-ohio",
    featured: true,
  },
  {
    id: "lakeplacid",
    name: "IRONMAN Lake Placid",
    date: "Jul 19",
    month: "JUL",
    day: "Sun",
    isoDate: "2026-07-19",
    location: "Lake Placid, NY",
    distances: ["Full"],
    url: "https://www.ironman.com/im-lake-placid",
    featured: true,
  },
  {
    id: "cleveland",
    name: "Tri CLE Rock Roll Run",
    date: "Aug 16",
    month: "AUG",
    day: "Sun",
    isoDate: "2026-08-16",
    location: "Cleveland, OH",
    distances: ["Sprint", "Olympic"],
    url: "https://www.rockrollrun.com",
    featured: true,
  },
  {
    id: "nationals",
    name: "USAT Age Group Nationals",
    date: "7–9",
    month: "AUG",
    day: "Fri–Sun",
    isoDate: "2026-08-07",
    location: "Milwaukee, WI",
    distances: ["Sprint", "Olympic"],
    url: "https://www.usatriathlon.org/2026-usa-triathlon-nationals",
    featured: true,
  },
  {
    id: "rev3",
    name: "REV3 Cedar Point",
    date: "Sep 10",
    month: "SEP",
    day: "Thu",
    isoDate: "2026-09-10",
    location: "Sandusky, OH",
    distances: ["Sprint", "Olympic", "Full"],
    url: "https://www.rev3tri.com",
  },
  {
    id: "kona",
    name: "IRONMAN World Championship",
    date: "Oct 10",
    month: "OCT",
    day: "Sat",
    isoDate: "2026-10-10",
    location: "Kailua-Kona, HI",
    distances: ["Full"],
    url: "https://www.ironman.com/races/im-world-championship-kona",
    featured: true,
  },
];

// ── Group practices data ──────────────────────────────────────────────────────

const practices = [
  {
    id: "track",
    icon: Timer,
    title: "Track Workouts",
    schedule: "Tuesdays, 6:00 PM",
    location: "Local track — details shared via email",
    description:
      "Structured interval and tempo running sessions. All paces welcome. Great for building run-specific fitness and connecting with your training crew.",
    accent: "cyan",
    bgImage: "/practices/track-workouts.jpg",
    bgPosition: "center 55%",
  },
  {
    id: "ride",
    icon: Bike,
    title: "Group Rides",
    schedule: "Saturdays, 7:30 AM",
    location: "Various Northeast Ohio routes",
    description:
      "Weekend group cycling rides ranging from social recovery spins to harder endurance sets. Route details posted in the weekly email and on Strava.",
    accent: "sky",
    bgImage: "/practices/group-ride.jpg",
    bgPosition: "center 65%",
  },
  {
    id: "ows",
    icon: Waves,
    title: "Open Water Swim",
    schedule: "Thursdays, 6:30 AM (May–Sep)",
    location: "Mentor Lagoons & Lake Erie access points",
    description:
      "Seasonal open water sessions to build confidence and race-specific swim skills. Wetsuits optional. Sighting drills, group drafting practice, and fun.",
    accent: "teal",
    bgImage: "/practices/group-swim.jpg",
  },
  {
    id: "clinics",
    icon: Zap,
    title: "Skills Clinics",
    schedule: "Announced monthly",
    location: "Various — check email",
    description:
      "Focused technique sessions for swim, bike, and run. Past clinics have covered triathlon transitions, open water starts, bike handling, and run form.",
    accent: "cyan",
    bgImage: "/practices/skills-clinics.jpg",
    bgPosition: "center 40%",
  },
];

const practiceAccent: Record<string, { text: string; bg: string; border: string }> = {
  cyan: { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/25" },
  sky: { text: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/25" },
  teal: { text: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/25" },
};

const distanceBadge: Record<string, string> = {
  Sprint: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  Olympic: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
  "70.3": "bg-sky-500/15 text-sky-400 border-sky-500/25",
  Full: "bg-violet-500/15 text-violet-400 border-violet-500/25",
};

// ── Tab config ────────────────────────────────────────────────────────────────

const tabs = [
  { id: "practices", label: "Group Practices", icon: Users },
  { id: "calendar", label: "Race Calendar", icon: Calendar },
  { id: "partners", label: "Partnerships", icon: Tag },
  { id: "gear", label: "Gear Store", icon: ShoppingBag },
];

// ── Main component ────────────────────────────────────────────────────────────

export default function MembersPage() {
  const [activeTab, setActiveTab] = useState("practices");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/members-logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  function copyCode(code: string) {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-32 pb-8 md:pt-40 md:pb-12 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] mb-3">
                Members Only
              </p>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-3 leading-tight">
                Tri IQ{" "}
                <span className="text-cyan-400">Squad Hub</span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed">
                Your exclusive access to group practices, the race calendar,
                partner discounts, and team gear.
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-700/60 text-slate-400 hover:text-white hover:border-slate-600 text-xs font-semibold transition-all mt-2"
            >
              <LogOut size={13} />
              Sign out
            </button>
          </div>
        </div>
      </section>

      {/* ── Tab Nav ── */}
      <div className="sticky top-16 md:top-20 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/60">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex gap-1 py-2 overflow-x-auto scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-slate-950 bg-cyan-500"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Content ── */}
      <section className="py-12 md:py-16 min-h-[60vh]">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {/* ── GROUP PRACTICES ── */}
              {activeTab === "practices" && (
                <div>
                  <div className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                      Group Training Sessions
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                      Train alongside your teammates. All group sessions are included in your
                      coaching package — just show up. Details and any changes are always
                      sent via the weekly email.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {practices.map((p, i) => {
                      const a = practiceAccent[p.accent];
                      return (
                        <motion.div
                          key={p.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.07 }}
                          className={`relative p-6 rounded-2xl border ${a.border} overflow-hidden transition-colors`}
                          style={p.bgImage ? {} : undefined}
                        >
                          {/* Optional background photo */}
                          {p.bgImage && (
                            <>
                              <div
                                className="absolute inset-0 bg-cover"
                                style={{ backgroundImage: `url(${p.bgImage})`, backgroundPosition: p.bgPosition ?? "center" }}
                              />
                              <div className="absolute inset-0 bg-slate-950/70" />
                            </>
                          )}
                          {/* Default tinted bg (no photo) */}
                          {!p.bgImage && <div className={`absolute inset-0 ${a.bg} bg-slate-900/50`} />}
                          <div className="relative">
                          <div className={`inline-flex p-2.5 rounded-xl border ${a.border} ${a.bg} mb-4`}>
                            <p.icon size={20} className={a.text} />
                          </div>
                          <h3 className="text-lg font-black text-white mb-1">{p.title}</h3>
                          <div className="flex items-center gap-1.5 mb-1">
                            <Clock size={11} className="text-slate-300 shrink-0" />
                            <span className={`text-xs font-bold ${a.text}`}>{p.schedule}</span>
                          </div>
                          <div className="flex items-center gap-1.5 mb-4">
                            <MapPin size={11} className="text-slate-300 shrink-0" />
                            <span className="text-xs text-slate-300">{p.location}</span>
                          </div>
                          <p className="text-slate-200 text-sm leading-relaxed">{p.description}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <p className="mt-8 text-xs text-slate-600 text-center">
                    Schedules subject to change — always check your weekly email for the latest details.
                  </p>
                </div>
              )}

              {/* ── RACE CALENDAR ── */}
              {activeTab === "calendar" && (
                <div>
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                      2026 Race Calendar
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                      Key races on the Tri IQ radar for the 2026 season. Check each race&apos;s
                      official site for current registration status and date confirmation.
                    </p>
                  </div>

                  {/* Countdown to next race */}
                  <RaceCountdown races={races} />

                  <div className="space-y-3">
                    {races.map((race, i) => {
                      const past = isRacePast(race.isoDate);
                      return (
                      <motion.a
                        key={race.id}
                        href={race.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`group flex items-center gap-4 p-4 md:p-5 rounded-2xl border transition-all duration-200 relative overflow-hidden ${
                          past
                            ? "border-slate-700/30 bg-slate-950/40 opacity-60 hover:opacity-80"
                            : race.featured
                            ? "border-cyan-500/30 bg-slate-900/60 hover:bg-slate-800/60"
                            : "border-slate-800/60 bg-slate-900/30 hover:bg-slate-800/60"
                        }`}
                        style={past ? {
                          backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 6px, rgba(255,255,255,0.07) 6px, rgba(255,255,255,0.07) 7px), repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.07) 6px, rgba(255,255,255,0.07) 7px)",
                        } : undefined}
                      >
                        {/* Month badge */}
                        <div className={`shrink-0 w-14 h-16 rounded-xl flex flex-col items-center justify-center text-center gap-0.5 ${
                          past
                            ? "bg-slate-800/40 border border-slate-700/30"
                            : race.featured
                            ? "bg-cyan-500/15 border border-cyan-500/30"
                            : "bg-slate-800/60 border border-slate-700/50"
                        }`}>
                          <span className={`text-[9px] font-black uppercase tracking-wider leading-none ${past ? "text-slate-600" : race.featured ? "text-cyan-400" : "text-slate-500"}`}>
                            {race.month}
                          </span>
                          <span className={`text-sm font-black leading-none ${past ? "text-slate-500" : "text-white"}`}>
                            {race.date.includes("–") ? race.date.split("–")[0] : race.date.replace(/[A-Za-z\s]/g, "")}
                          </span>
                          <span className={`text-[9px] font-semibold leading-none ${past ? "text-slate-600" : race.featured ? "text-cyan-400/70" : "text-slate-500"}`}>
                            {race.day}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`font-bold text-sm truncate ${past ? "text-slate-500 line-through decoration-slate-600" : "text-white"}`}>{race.name}</span>
                            {past && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-bold uppercase tracking-wider">
                                ✓ Done
                              </span>
                            )}
                            {!past && race.featured && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-500/25 text-cyan-400 text-[9px] font-bold uppercase tracking-wider">
                                <Star size={7} fill="currentColor" />
                                Key Race
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <MapPin size={10} className="text-slate-500 shrink-0" />
                            <span className="text-slate-500 text-xs">{race.location}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {race.distances.map((d) => (
                              <span
                                key={d}
                                className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${past ? "bg-slate-800/40 text-slate-600 border-slate-700/30" : distanceBadge[d] ?? "bg-slate-700/60 text-slate-300 border-slate-600/50"}`}
                              >
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Arrow */}
                        <ChevronRight
                          size={16}
                          className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0"
                        />
                      </motion.a>
                    );
                    })}
                  </div>

                  <p className="mt-6 text-xs text-slate-600 text-center">
                    Dates subject to change. Always verify on the official race website before registering.
                  </p>
                </div>
              )}

              {/* ── PARTNERSHIPS ── */}
              {activeTab === "partners" && (
                <div>
                  <div className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                      Partner Discounts
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                      Exclusive deals on the gear, nutrition, and tech you actually train in. Click any
                      code to copy it, then paste at checkout.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {partners.map((partner, i) => (
                      <motion.div
                        key={partner.id}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className={`relative flex flex-col p-6 rounded-2xl border ${partner.accent.border} ${partner.accent.bg} bg-slate-900/60 hover:bg-slate-900/80 transition-all duration-200 hover:shadow-xl ${partner.accent.glow} group`}
                      >
                        {/* Top row: category + discount badge */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] pt-0.5">
                            {partner.category}
                          </span>
                          {partner.discount && (
                            <span className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-black ${partner.accent.badge} ${partner.accent.badgeText} shadow-md`}>
                              {partner.discount}
                            </span>
                          )}
                        </div>

                        {/* Logo + brand name */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-xl border ${partner.accent.border} ${partner.logoBg ?? "bg-white/90"} overflow-hidden`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={partner.logo ?? `https://www.google.com/s2/favicons?domain=${partner.domain}&sz=128`}
                              alt={`${partner.name} logo`}
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <h3 className={`text-xl font-black leading-tight ${partner.accent.text}`}>
                              {partner.name}
                            </h3>
                            <p className="text-slate-400 text-xs font-medium">{partner.tagline}</p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-300 text-sm leading-relaxed mb-5 flex-1">
                          {partner.description}
                        </p>

                        {/* Discount code chip */}
                        {partner.code ? (
                          <button
                            onClick={() => copyCode(partner.code!)}
                            className={`group/code w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border ${partner.accent.border} bg-slate-950/60 hover:bg-slate-950/80 transition-all mb-4 cursor-pointer`}
                            title="Click to copy discount code"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <Tag size={12} className={`${partner.accent.text} shrink-0`} />
                              <span className={`font-mono text-sm font-bold tracking-wider ${partner.accent.text} truncate`}>
                                {partner.code}
                              </span>
                            </div>
                            <AnimatePresence mode="wait">
                              {copiedCode === partner.code ? (
                                <motion.div
                                  key="check"
                                  initial={{ scale: 0.6, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.6, opacity: 0 }}
                                  transition={{ duration: 0.15 }}
                                  className="shrink-0 flex items-center gap-1 text-emerald-400"
                                >
                                  <Check size={14} />
                                  <span className="text-xs font-bold">Copied!</span>
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="copy"
                                  initial={{ scale: 0.6, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.6, opacity: 0 }}
                                  transition={{ duration: 0.15 }}
                                  className="shrink-0 text-slate-500 group-hover/code:text-slate-300 transition-colors"
                                >
                                  <Copy size={14} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </button>
                        ) : (
                          <div className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl border ${partner.accent.border} bg-slate-950/40 mb-4`}>
                            <ShieldCheck size={13} className={partner.accent.text} />
                            <span className="text-sm text-slate-400 font-medium">
                              Mention Tri IQ for member pricing
                            </span>
                          </div>
                        )}

                        {/* Visit site button */}
                        <a
                          href={partner.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold border ${partner.accent.border} ${partner.accent.text} hover:opacity-80 transition-opacity`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Visit {partner.name}
                          <ExternalLink size={13} />
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── GEAR STORE ── */}
              {activeTab === "gear" && (
                <div>
                  <div className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                      Team Gear Store
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                      Look like a Tri IQ athlete on race day. Two ways to order: our online
                      team store for stocked items, or custom kit through Jakroo.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Squad Locker */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0 }}
                      className="flex flex-col p-7 rounded-2xl border border-cyan-500/25 bg-cyan-500/5 bg-slate-900/60 hover:bg-slate-900/80 transition-all hover:shadow-xl hover:shadow-cyan-500/10"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-white overflow-hidden mb-5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/partners/squadlocker.png" alt="Squad Locker" width={56} height={56} className="object-contain" />
                      </div>
                      <h3 className="text-xl font-black text-white mb-1">Squad Locker</h3>
                      <p className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
                        Online Team Store
                      </p>
                      <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-1">
                        Our always-open team store for Tri IQ branded apparel and accessories.
                        Ships directly to you — no minimum order, no deadlines.
                      </p>
                      <a
                        href="https://www.squadlocker.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-cyan-500/30 active:scale-[0.98]"
                      >
                        Shop Squad Locker
                        <ExternalLink size={14} />
                      </a>
                    </motion.div>

                    {/* Jakroo */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex flex-col p-7 rounded-2xl border border-sky-500/25 bg-sky-500/5 bg-slate-900/60 hover:bg-slate-900/80 transition-all hover:shadow-xl hover:shadow-sky-500/10"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-white overflow-hidden mb-5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/partners/jakroo.svg" alt="Jakroo" width={48} height={48} className="object-contain" />
                      </div>
                      <h3 className="text-xl font-black text-white mb-1">Jakroo</h3>
                      <p className="text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
                        Custom Team Kit
                      </p>
                      <p className="text-slate-300 text-sm leading-relaxed mb-4 flex-1">
                        Order custom Tri IQ tri suits, jerseys, and cycling kits through
                        Jakroo. Access the team store with the password below — orders
                        are collected each season.
                      </p>
                      {/* Password chip */}
                      <button
                        onClick={() => copyCode("triiq")}
                        className="group/code w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border border-sky-500/25 bg-slate-950/50 hover:bg-slate-950/80 transition-all mb-4 cursor-pointer"
                        title="Click to copy store password"
                      >
                        <div className="flex items-center gap-2">
                          <Lock size={12} className="text-sky-400 shrink-0" />
                          <span className="text-xs text-slate-400 font-medium">Store password:</span>
                          <span className="font-mono text-sm font-bold text-sky-400">triiq</span>
                        </div>
                        <AnimatePresence mode="wait">
                          {copiedCode === "triiq" ? (
                            <motion.div
                              key="check"
                              initial={{ scale: 0.6, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.6, opacity: 0 }}
                              className="shrink-0 flex items-center gap-1 text-emerald-400"
                            >
                              <Check size={14} />
                              <span className="text-xs font-bold">Copied!</span>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="copy"
                              initial={{ scale: 0.6, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.6, opacity: 0 }}
                              className="shrink-0 text-slate-500 group-hover/code:text-slate-300 transition-colors"
                            >
                              <Copy size={14} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                      <a
                        href="https://www.jakroo.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-sky-500/40 text-sky-400 hover:bg-sky-500/10 font-bold rounded-xl text-sm transition-all"
                      >
                        Open Jakroo Store
                        <ExternalLink size={14} />
                      </a>
                    </motion.div>
                  </div>

                  <p className="mt-8 text-xs text-slate-600 text-center">
                    Questions about sizing or ordering?{" "}
                    <a href="mailto:coachpete@triiqcoaching.com" className="text-slate-500 hover:text-cyan-400 transition-colors">
                      Email your coach
                    </a>
                    .
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
