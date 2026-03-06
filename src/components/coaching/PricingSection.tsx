"use client";

import Link from "next/link";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Zap,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  Award,
} from "lucide-react";

const plans = [
  {
    id: "tri",
    name: "Triathlon Coaching",
    price: 175,
    unit: "month",
    badge: "Most Popular",
    badgeIcon: Star,
    color: "cyan",
    border: "border-cyan-500/50",
    glow: "shadow-cyan-500/20",
    highlight: "bg-cyan-500",
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    ring: "ring-cyan-500/30",
    desc: "Full triathlon coaching — swim, bike, and run — with everything you need to race your best.",
    cta: "/contact",
  },
  {
    id: "run",
    name: "Run Coaching",
    price: 125,
    unit: "month",
    badge: "Focused Training",
    badgeIcon: TrendingUp,
    color: "teal",
    border: "border-teal-500/40",
    glow: "shadow-teal-500/10",
    highlight: "bg-teal-500",
    text: "text-teal-400",
    bg: "bg-teal-500/10",
    ring: "ring-teal-500/30",
    desc: "Expert run coaching for marathons, ultras, and endurance events with full athlete support.",
    cta: "/contact",
  },
];

const features = [
  { label: "Athletic evaluation + test-based training zones", icon: Award },
  { label: "Individualized training plan with daily workouts", icon: CheckCircle2 },
  { label: "Advanced data analysis (power, pace, HR)", icon: TrendingUp },
  { label: "Weekly check-ins via email, text & phone", icon: CheckCircle2 },
  { label: "Group training sessions", icon: Users },
  { label: "Swim, bike & run skills clinics", icon: CheckCircle2 },
  { label: "35% off private sessions & training camps", icon: CheckCircle2 },
  { label: "Nutrition guidance — CISSN, MS, RDN on staff", icon: CheckCircle2 },
  { label: "Race planning, strategy & post-race debrief", icon: CheckCircle2 },
  { label: "No surcharges. Ever.", icon: CheckCircle2 },
];

const compRows = [
  { label: "Monthly cost",       triiq: "$175–$125/mo",    comp: "$217–$325/mo",  saved: "Save $150/mo" },
  { label: "Setup fee",          triiq: "Waived",           comp: "$75–$150",       saved: "Save $150" },
  { label: "Group training",     triiq: "Included",         comp: "Extra fee",      saved: "Always included" },
  { label: "Skills clinics",     triiq: "Included",         comp: "Extra fee",      saved: "Always included" },
  { label: "Training camps",     triiq: "35% off",          comp: "Full price",     saved: "Big savings" },
  { label: "Nutrition coaching", triiq: "CISSN + RDN staff",comp: "One-time eval", saved: "Ongoing support" },
  { label: "Surcharges",         triiq: "None",             comp: "Additional fees", saved: "No surprises" },
];

function AnimatedPrice({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = value / 40;
    ref.current = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        if (ref.current) clearInterval(ref.current);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 30);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [isInView, value]);

  return <span ref={containerRef}>{display}</span>;
}

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <section ref={ref} id="pricing" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/8 mb-5">
            <Zap size={12} className="text-cyan-400" />
            <span className="text-cyan-300 text-xs font-bold uppercase tracking-[0.2em]">Transparent Pricing</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Invest in Your{" "}
            <span className="text-cyan-400">Best Race</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            No setup fees. No hidden surcharges. No surprise bills.
            Just expert coaching at a price that makes sense.
          </p>
        </motion.div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {plans.map((plan, pi) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 32 }}
              animate={controls}
              variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: pi * 0.15 } } }}
              className={`relative rounded-3xl border ${plan.border} bg-slate-900/80 shadow-2xl ${plan.glow} overflow-hidden`}
            >
              {/* Top glow strip */}
              <div className={`absolute top-0 inset-x-0 h-px ${plan.highlight} opacity-60`} />

              {/* Badge */}
              <div className="absolute top-5 right-5">
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${plan.bg} ring-1 ${plan.ring}`}>
                  <plan.badgeIcon size={11} className={plan.text} />
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${plan.text}`}>{plan.badge}</span>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-6 pr-28">{plan.desc}</p>

                {/* Price */}
                <div className="flex items-end gap-2 mb-2">
                  <div className="flex items-start">
                    <span className={`text-2xl font-black mt-2 ${plan.text}`}>$</span>
                    <span className={`text-7xl font-black leading-none ${plan.text}`}>
                      <AnimatedPrice value={plan.price} />
                    </span>
                  </div>
                  <div className="pb-2">
                    <span className="text-slate-500 text-sm">/{plan.unit}</span>
                  </div>
                </div>

                {/* Waived fee badge */}
                <div className="flex items-center gap-2 mb-7">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle2 size={11} className="text-emerald-400" />
                    <span className="text-emerald-400 text-[11px] font-semibold">Setup fee waived</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700">
                    <span className="text-slate-500 text-[11px]">6-month minimum</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8">
                  {features.map((f, fi) => (
                    <motion.li
                      key={f.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={controls}
                      variants={{ visible: { opacity: 1, x: 0, transition: { delay: 0.4 + pi * 0.1 + fi * 0.04 } } }}
                      className="flex items-start gap-2.5"
                    >
                      <CheckCircle2 size={15} className={`${plan.text} mt-0.5 shrink-0`} />
                      <span className="text-slate-300 text-sm">{f.label}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={plan.cta}
                  className={`group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95 ${
                    pi === 0
                      ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 hover:shadow-lg hover:shadow-cyan-500/30"
                      : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-teal-500/40"
                  }`}
                >
                  Get Started
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{ visible: { opacity: 1, transition: { delay: 0.7 } } }}
          className="text-center mb-6"
        >
          <button
            onClick={() => setShowComparison((v) => !v)}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors font-medium underline underline-offset-4 decoration-slate-700 hover:decoration-cyan-500"
          >
            {showComparison ? "Hide" : "See how we compare to typical coaches"}
          </button>
        </motion.div>

        {/* Comparison table */}
        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/60 backdrop-blur-sm mb-8">
                {/* Table header */}
                <div className="grid grid-cols-3 text-[11px] font-bold uppercase tracking-wider">
                  <div className="px-5 py-3 text-slate-500 border-b border-slate-800">Feature</div>
                  <div className="px-5 py-3 text-cyan-400 bg-cyan-500/5 border-b border-cyan-500/20 text-center">Tri IQ</div>
                  <div className="px-5 py-3 text-slate-500 border-b border-slate-800 text-center">Typical Coach</div>
                </div>
                {compRows.map((row, i) => (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className={`grid grid-cols-3 text-sm border-b border-slate-800/60 last:border-0 ${
                      i % 2 === 0 ? "" : "bg-slate-900/30"
                    }`}
                  >
                    <div className="px-5 py-3.5 text-slate-400 font-medium">{row.label}</div>
                    <div className="px-5 py-3.5 bg-cyan-500/5 text-center">
                      <span className="text-emerald-400 font-semibold">{row.triiq}</span>
                    </div>
                    <div className="px-5 py-3.5 text-center">
                      <span className="text-slate-500">{row.comp}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footnotes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{ visible: { opacity: 1, transition: { delay: 0.9 } } }}
          className="text-center space-y-1"
        >
          <p className="text-slate-600 text-xs">
            ¹ Setup fee waived for new athletes. &nbsp;² Six-month minimum engagement required.
          </p>
          <p className="text-slate-600 text-xs">
            ³ Competitor pricing billed per 4-week cycle (13 payments/year). &nbsp;
            ⁴ CISSN — Certified Sports Nutritionist &nbsp;⁵ MS, Applied Exercise Science &nbsp;⁶ RDN — Registered Dietitian Nutritionist
          </p>
        </motion.div>
      </div>
    </section>
  );
}
