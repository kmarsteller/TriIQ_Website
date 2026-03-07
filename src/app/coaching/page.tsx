import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { TrainingCalendarWidget } from "@/components/coaching/TrainingCalendarWidget";
import { CoachChatWidget } from "@/components/coaching/CoachChatWidget";
import { PerformanceChartWidget } from "@/components/coaching/PerformanceChartWidget";
import { TrainingBalanceWidget } from "@/components/coaching/TrainingBalanceWidget";
import { PricingSection } from "@/components/coaching/PricingSection";
import {
  Calendar,
  MessageSquare,
  TrendingUp,
  Activity,
  CheckCircle2,
  ArrowRight,
  Target,
  BarChart2,
  Utensils,
  Flag,
  Users,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Coaching Services",
  description:
    "Custom triathlon training plans, expert coaching, weekly check-ins, and data-driven feedback. Everything you need to race your best with Tri IQ Coaching.",
};

const features = [
  {
    id: "plan",
    icon: Calendar,
    title: "A Custom Training Plan Designed Specifically For You",
    desc: "Your personal triathlon coach will design a training program that matches your fitness level, is tailored to your race goals, and fits around your busy schedule. No cookie-cutter plans — every workout has a purpose built around your life.",
    accent: "cyan",
    highlights: [
      "Zone-based training built from an athletic evaluation",
      "Detailed daily and weekly workout prescriptions",
      "Periodized planning from base to peak to race",
      "Flexible adjustments as life happens",
    ],
    visual: "📋",
    flip: false,
  },
  {
    id: "contact",
    icon: MessageSquare,
    title: "Frequent Contact With Your Coach",
    desc: "Every week you'll have the chance to talk with your coach about training, nutrition, race strategy, and gear choices so you can show up on race day completely confident in your fitness and plan.",
    accent: "sky",
    highlights: [
      "Weekly check-ins via email, text, or phone",
      "Nutrition guidance for training and racing",
      "Race strategy and gear recommendations",
      "Mental skills and race-day preparation",
    ],
    visual: "💬",
    flip: true,
  },
  {
    id: "feedback",
    icon: TrendingUp,
    title: "Frequent, Data-Driven Feedback",
    desc: "Your coach will analyze your key workouts to make sure you're completing your intervals effectively and provide specific, actionable feedback on what to improve and how your fitness is progressing over time.",
    accent: "teal",
    highlights: [
      "Post-workout analysis and feedback",
      "Power, pace, and heart rate data review",
      "Fitness trend tracking across the season",
      "Post-race debriefs and performance review",
    ],
    visual: "📊",
    flip: false,
  },
  {
    id: "training",
    icon: Activity,
    title: "Consistent, Sustainable, Balanced Training",
    desc: "Whether you're training for your first event or you're a seasoned athlete, the experienced and certified Tri IQ coaches are here to help you reach your goals. Leveraging decades of experience competing and coaching in triathlon, running, ultra-running, and other endurance events, we help you enhance your strengths while identifying and closing skill gaps.",
    accent: "cyan",
    highlights: [
      "Long-term athlete development focus",
      "Swim, bike, and run skill clinics",
      "Group training sessions included",
      "Discounts on partner training camps",
    ],
    visual: "⚡",
    flip: true,
  },
];

const checklistItems = [
  { icon: Target, text: "Athletic evaluation and setup of test-based training zones" },
  { icon: Calendar, text: "Individualized training plan with detailed daily workouts" },
  { icon: BarChart2, text: "Advanced data analysis using your training platform" },
  { icon: MessageSquare, text: "Regular feedback via email, text, and phone contact" },
  { icon: Activity, text: "Ongoing adjustments to your prepared training plan" },
  { icon: Utensils, text: "Nutrition guidance for training and racing" },
  { icon: Flag, text: "Goal development and race selection guidance" },
  { icon: Target, text: "Race planning and strategy sessions" },
  { icon: TrendingUp, text: "Post-race analysis and debrief" },
  { icon: Users, text: "Group training sessions included" },
  { icon: Award, text: "Skills Clinics included" },
  { icon: CheckCircle2, text: "Discounts on partner training camps" },
];

const accentMap: Record<string, string> = {
  cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  sky: "text-sky-400 bg-sky-500/10 border-sky-500/20",
  teal: "text-teal-400 bg-teal-500/10 border-teal-500/20",
};

export default function CoachingPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-12 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
              Services
            </p>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Coaching That{" "}
              <span className="text-cyan-400">Fits Your Life</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              Consistent, sustainable, and balanced training built around you —
              your schedule, your goals, your race.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-cyan-500/30 active:scale-95"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="pt-12 pb-24 md:pt-16 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 space-y-28 md:space-y-36">
          {features.map((feature, i) => (
            <div
              key={feature.id}
              id={feature.id}
              className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${
                feature.flip ? "md:[direction:rtl]" : ""
              }`}
            >
              {/* Text */}
              <AnimatedSection
                direction={feature.flip ? "left" : "right"}
                className="md:[direction:ltr]"
              >
                <div
                  className={`inline-flex p-3 rounded-xl border mb-6 ${accentMap[feature.accent]}`}
                >
                  <feature.icon size={22} />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                  {feature.title}
                </h2>
                <p className="text-slate-400 leading-relaxed mb-6 text-base">
                  {feature.desc}
                </p>
                <ul className="space-y-3">
                  {feature.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-slate-300 text-sm">
                      <CheckCircle2
                        size={16}
                        className="text-cyan-400 mt-0.5 shrink-0"
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              {/* Visual card */}
              <AnimatedSection
                direction={feature.flip ? "right" : "left"}
                delay={0.15}
                className="md:[direction:ltr]"
              >
                <div
                  className={`relative p-6 md:p-8 rounded-3xl border ${accentMap[feature.accent]} bg-slate-900/60 min-h-[280px] overflow-hidden gradient-border`}
                >
                  {/* Background glow */}
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full blur-3xl opacity-10 pointer-events-none ${
                      feature.accent === "cyan"
                        ? "bg-cyan-400"
                        : feature.accent === "sky"
                        ? "bg-sky-400"
                        : "bg-teal-400"
                    }`}
                  />
                  <div className="relative">
                    {feature.id === "plan" && <TrainingCalendarWidget />}
                    {feature.id === "contact" && <CoachChatWidget />}
                    {feature.id === "feedback" && <PerformanceChartWidget />}
                    {feature.id === "training" && <TrainingBalanceWidget />}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          ))}
        </div>
      </section>

      {/* Engagement Checklist */}
      <section
        id="checklist"
        className="py-24 md:py-32 bg-slate-900/50 relative overflow-hidden"
      >
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-5xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
              What&apos;s Included
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
              Everything in Your{" "}
              <span className="text-cyan-400">Coaching Package</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Every Tri IQ athlete gets the full suite of support, tools, and
              expert guidance needed to race their best.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {checklistItems.map((item, i) => (
              <AnimatedSection key={item.text} delay={i * 0.04}>
                <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-200 group">
                  <div className="shrink-0 p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/15 transition-colors">
                    <item.icon size={16} className="text-cyan-400" />
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed font-medium">
                    {item.text}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection />

      {/* CTA */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-slate-950 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
              Ready to Build Your{" "}
              <span className="text-cyan-400">Race Plan?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Contact us today to get matched with the right coach and start
              your personalized triathlon journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:coachpete@triiqcoaching.com"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-cyan-500/30 active:scale-95"
              >
                Contact Coach Pete
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="mailto:coachkendra@triiqcoaching.com"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-cyan-500/30 active:scale-95"
              >
                Contact Coach Kendra
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <p className="text-slate-600 text-xs mt-6">
              Or{" "}
              <Link
                href="/coaches"
                className="text-slate-500 hover:text-slate-300 underline transition-colors"
              >
                learn more about our coaches
              </Link>{" "}
              before reaching out.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
