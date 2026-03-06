import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { AnimatedSection } from "@/components/AnimatedSection";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import {
  Target,
  BarChart2,
  Users,
  CheckCircle2,
  ArrowRight,
  Calendar,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tri IQ Coaching | Train Smarter",
  description:
    "Individual, personalized, science-based triathlon coaching by certified athletes. Optimize your training time and reach your race goals with Tri IQ Coaching.",
};

const stats = [
  { value: 40, suffix: "+", label: "Years Combined Experience" },
  { value: 37, suffix: "+", label: "Ironman Finishers Coached" },
  { value: 3, suffix: "", label: "Disciplines Mastered" },
  { value: 100, suffix: "%", label: "USAT Certified Coaches" },
];

const pillars = [
  {
    icon: Target,
    title: "Personalized",
    desc: "Training built around your life, schedule, fitness level, and race goals — not a one-size-fits-all template.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    icon: BarChart2,
    title: "Science-Based",
    desc: "Evidence-driven methods using training data, zone-based workouts, and regular analysis to optimize your progress.",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
  },
  {
    icon: Users,
    title: "Inclusive",
    desc: "Coaching for every athlete, every background. We believe diversity, empathy, and representation make us all stronger.",
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
  },
];

const services = [
  {
    icon: Calendar,
    title: "Custom Training Plans",
    desc: "Your coach designs a periodized program matched to your fitness level, target events, and daily schedule.",
    href: "/coaching#plan",
  },
  {
    icon: MessageSquare,
    title: "Expert Coaching & Contact",
    desc: "Weekly communication covering training, nutrition, race strategy, and gear — so you show up confident on race day.",
    href: "/coaching#contact",
  },
  {
    icon: TrendingUp,
    title: "Data-Driven Feedback",
    desc: "Your coach analyzes key workouts, tracks your fitness trends, and adjusts your plan based on how you're actually responding.",
    href: "/coaching#feedback",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Stats Bar */}
      <section className="bg-slate-900 border-y border-slate-800/60 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/3 via-transparent to-cyan-500/3" />
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedSection
                key={stat.label}
                delay={i * 0.08}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  <AnimatedCounter
                    to={stat.value}
                    suffix={stat.suffix}
                    duration={2}
                  />
                </div>
                <div className="text-slate-400 text-sm font-medium">
                  {stat.label}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy — Three Pillars */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
              Our Approach
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
              Coaching Built Around{" "}
              <span className="text-cyan-400">You</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Every Tri IQ coach is also an age-group athlete. They understand
              the real challenge of balancing training with full-time jobs, busy
              families, and life's unpredictability.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 0.1}>
                <div
                  className={`h-full p-8 rounded-2xl border ${p.border} ${p.bg} gradient-border card-glow group cursor-default`}
                >
                  <div
                    className={`inline-flex p-3 rounded-xl ${p.bg} mb-5 border ${p.border}`}
                  >
                    <p.icon size={22} className={p.color} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {p.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 md:py-32 bg-slate-900/50 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
              What We Offer
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
              Everything You Need to{" "}
              <span className="text-cyan-400">Race Your Best</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              From your first sprint triathlon to your next Ironman, Tri IQ
              provides the structure, support, and expertise to get you there.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.1}>
                <Link
                  href={s.href}
                  className="group h-full flex flex-col p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 hover:bg-slate-800/80 transition-all duration-300 card-glow"
                >
                  <div className="inline-flex p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-5 w-fit">
                    <s.icon size={22} className="text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {s.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1">
                    {s.desc}
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 text-cyan-400 text-sm font-semibold group-hover:gap-2.5 transition-all">
                    Learn more
                    <ArrowRight size={15} />
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center">
            <Link
              href="/coaching"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-semibold border border-slate-700 hover:border-slate-500 px-6 py-3 rounded-full transition-all"
            >
              View all services
              <ArrowRight size={15} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Welcome Block */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="right">
              <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
                Who We Are
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Coaches Who{" "}
                <span className="text-cyan-400">Race Too</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                All Tri IQ coaches are also age-group athletes. They understand
                the challenges of balancing training with full-time jobs, busy
                family lives, and changing daily demands.
              </p>
              <p className="text-slate-400 leading-relaxed mb-4">
                They work with their athletes to optimize training time, close
                skill gaps, enhance existing skills, and elevate performance.
                They partner with you on your journey to reach your event goals.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Tri IQ, LLC embraces differences with the belief that broadened
                representation, empathy, and understanding lead to better
                athletic performance. We are committed to empowering athletes to
                achieve sustained competitive excellence and well-being.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "USAT Certified",
                  "Ironman Certified",
                  "US Masters Swimming",
                  "TrainingPeaks Certified",
                  "Team USA Athlete",
                  "MS, Exercise Science",
                  "CISSN Sports Nutritionist",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    <CheckCircle2 size={12} className="text-cyan-400" />
                    {badge}
                  </span>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    label: "Custom Plans",
                    value: "100%",
                    desc: "Tailored to your life",
                  },
                  {
                    label: "Weekly Check-ins",
                    value: "Not a number",
                    desc: "Consistent communication",
                  },
                  {
                    label: "Race Experience",
                    value: "40+",
                    desc: "Years of competing",
                  },
                  {
                    label: "Ironman Finishes",
                    value: "9×",
                    desc: "Earned at the finish line",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/50 gradient-border"
                  >
                    <div className="text-3xl font-black text-cyan-400 mb-1">
                      {item.value}
                    </div>
                    <div className="text-white font-bold text-sm mb-1">
                      {item.label}
                    </div>
                    <div className="text-slate-500 text-xs">{item.desc}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/15 via-slate-900 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] mb-5">
              Ready to Start?
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Your Race Goals{" "}
              <span className="text-cyan-400">Start Here</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Whether you&apos;re tackling your first sprint triathlon or your
              next Ironman, we&apos;ll build you a plan that fits your life and
              gets you to the finish line.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-base rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-cyan-500/30 active:scale-95"
              >
                Contact a Coach
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/coaching"
                className="flex items-center justify-center px-8 py-4 border border-slate-600 hover:border-cyan-500/50 text-slate-300 hover:text-white font-semibold text-base rounded-full transition-all duration-200 hover:bg-slate-800/50"
              >
                View Coaching Services
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
