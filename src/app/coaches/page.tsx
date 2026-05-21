import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CoachFlipCards } from "@/components/coaches/CoachFlipCards";
import { Mail, CheckCircle2, ArrowRight, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Coaches",
  description:
    "Meet Coach Kendra and Coach Pete — certified triathlon coaches, experienced athletes, and your partners in reaching your race goals.",
};

const coaches = [
  {
    id: "kendra",
    name: "Coach Kendra",
    fullName: "Kendra Kitson",
    role: "USAT Certified Triathlon Coach",
    email: "coachkendra@triiqcoaching.com",
    initials: "KW",
    accentColor: "cyan",
    imageSrc: "/coaches/kendra.jpg",
    bio: [
      "USAT-certified triathlon coach Kendra Kitson started her journey into triathlon while obtaining her BS in Nutrition and Dietetics. She now practices as a Registered Dietitian with her MS in Exercise Science.",
      "She loves coaching all distances, but has a true passion for short-course racing. Short-course triathlon has given her the opportunity to race for Team USA all over the world. Coach Kendra's favorite discipline is cycling — as you can see so much and go so far on a bike.",
      "A big accomplishment for Kendra was completing her own Tour de Cleveland 100-mile adventure. When she is not doing triathlon, Kendra likes to play soccer, sew and craft, and bake!",
    ],
    specialties: ["Short-Course Racing", "Nutrition & Dietetics", "Cycling", "Team USA Racing"],
    credentials: [
      { label: "USA Triathlon Certified Coach", color: "cyan" },
      { label: "Registered Dietitian (RD)", color: "sky" },
      { label: "MS Exercise Science", color: "teal" },
      { label: "CISSN — Certified Sports Nutritionist", color: "cyan" },
      { label: "Team USA Athlete", color: "sky" },
    ],
    stats: [
      { label: "Certified Sports Nutritionist", value: "CISSN" },
      { label: "Exercise Science", value: "MS" },
      { label: "Racing Level", value: "Team USA" },
    ],
    usatUrl: "https://member.usatriathlon.org/coach/1239",
  },
  {
    id: "pete",
    name: "Coach Pete",
    fullName: "Peter Heizer",
    role: "USA Triathlon & Ironman Certified Coach",
    email: "coachpete@triiqcoaching.com",
    initials: "PH",
    accentColor: "sky",
    imageSrc: "/coaches/pete.jpg",
    bio: [
      "Coach Peter Heizer is recognized by the US Olympic National Governing Body as a USAT Level 2 Certified Coach; he is an ESCI Certified Coach, an Ironman U Certified Coach, a Level 2 US Masters Swim Coach, and a TrainingPeaks Certified Coach.",
      "With over 40 years of experience in endurance racing, he has a strong focus on long and ultra-distance competition. As a nine-time Ironman finisher, Coach Pete enjoys drawing on his personal experience to help his athletes achieve their best performance.",
      "Coach Pete takes an athlete-first approach to training. He will work with you to identify your goals, outline priorities, and develop a training plan using training data and athlete feedback to develop evidence-based training that meets the unique goals of the individual.",
      "On recovery days, Coach Pete enjoys spending time creating music, traveling with his wife, and snuggling with his kitties.",
    ],
    specialties: [
      "Long & Ultra-Distance Racing",
      "Ironman Preparation",
      "Masters Swimming",
      "Data-Driven Coaching",
    ],
    credentials: [
      { label: "USAT Level 2 Certified Coach", color: "cyan" },
      { label: "ESCI Certified Coach", color: "sky" },
      { label: "Ironman U Certified Coach", color: "teal" },
      { label: "Level 2 US Masters Swim Coach", color: "cyan" },
      { label: "TrainingPeaks Certified Coach", color: "sky" },
    ],
    stats: [
      { label: "Ironman Finishes", value: "9×" },
      { label: "Years Racing", value: "40+" },
      { label: "Certifications", value: "5" },
    ],
    usatUrl: "https://member.usatriathlon.org/coach/400",
  },
];

const accentClasses: Record<string, { text: string; bg: string; border: string }> = {
  cyan: {
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/25",
  },
  sky: {
    text: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/25",
  },
  teal: {
    text: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/25",
  },
};

export default function CoachesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-6 md:pt-40 md:pb-8 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
              The Team
            </p>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Meet Your{" "}
              <span className="text-cyan-400">Coaches</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Certified professionals. Experienced athletes. Coaches who
              understand the real demands of balancing training with life.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Coach Profiles */}
      <section className="pt-2 pb-10 md:pt-2 md:pb-16">
        <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {coaches.map((coach) => {
            const accent = accentClasses[coach.accentColor];

            return (
              <div key={coach.id} id={coach.id}>
                {/* Header above cards */}
                <AnimatedSection>
                  <p className={`text-xs font-bold uppercase tracking-[0.3em] mb-3 text-center ${accent.text}`}>
                    About
                  </p>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight text-center">
                    {coach.name}
                  </h3>
                  <p className="text-slate-500 font-medium mb-5 text-center">{coach.role}</p>
                </AnimatedSection>

                {/* Flip cards */}
                <AnimatedSection>
                  <CoachFlipCards
                    coachId={coach.id as "pete" | "kendra"}
                    name={coach.name}
                    role={coach.role}
                    accentColor={coach.accentColor as "cyan" | "sky" | "teal"}
                    imageSrc={coach.imageSrc}
                  />
                </AnimatedSection>

                {/* Bio + info below */}
                <AnimatedSection direction="up" delay={0.1}>
                  <div className="space-y-4 mb-10">
                    {coach.bio.map((paragraph, pi) => (
                      <p key={pi} className="text-slate-300 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Quick stats */}
                  <div className="grid grid-cols-3 gap-4 mb-10">
                    {coach.stats.map((st) => (
                      <div
                        key={st.label}
                        className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 text-center"
                      >
                        <div className={`text-2xl font-black mb-1 ${accent.text}`}>
                          {st.value}
                        </div>
                        <div className="text-slate-500 text-xs font-medium">
                          {st.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Credentials */}
                  <div
                    className={`p-5 rounded-2xl border ${accent.border} ${accent.bg} gradient-border mb-8`}
                  >
                    <div className="space-y-1.5 mb-4">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
                        <Award size={10} />
                        Certifications
                      </p>
                      {coach.credentials.map((cred) => {
                        const ca = accentClasses[cred.color];
                        return (
                          <div
                            key={cred.label}
                            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg ${ca.bg} border ${ca.border} text-[11px] font-semibold ${ca.text}`}
                          >
                            <CheckCircle2 size={10} className="shrink-0" />
                            {cred.label}
                          </div>
                        );
                      })}
                    </div>

                    {/* Specialties */}
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">
                        Specialties
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {coach.specialties.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded-full bg-slate-700/60 border border-slate-600/50 text-slate-300 text-[10px] font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-2">
                    <a
                      href={`mailto:${coach.email}`}
                      className={`group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-slate-950 transition-all duration-200 hover:shadow-lg active:scale-95 ${
                        coach.accentColor === "cyan"
                          ? "bg-cyan-500 hover:bg-cyan-400 hover:shadow-cyan-500/30"
                          : "bg-sky-500 hover:bg-sky-400 hover:shadow-sky-500/30"
                      }`}
                    >
                      Train with {coach.name}
                      <ArrowRight
                        size={15}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </a>
                    <a
                      href={`mailto:${coach.email}`}
                      className={`flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-xs ${accent.bg} border ${accent.border} ${accent.text} hover:opacity-80 transition-opacity`}
                    >
                      <Mail size={13} />
                      {coach.email}
                    </a>
                    {"usatUrl" in coach && coach.usatUrl && (
                      <a
                        href={coach.usatUrl as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-slate-800/60 border border-slate-700/50 hover:border-cyan-500/40 transition-all"
                      >
                        <span className="text-slate-300 font-bold text-xs">View on</span>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/usat-main-logo.svg" alt="USA Triathlon" className="h-3.5 w-auto" />
                      </a>
                    )}
                  </div>
                </AnimatedSection>
              </div>
            );
          })}
        </div>
        </div>
      </section>

      {/* Team Philosophy */}
      <section className="py-24 md:py-32 bg-slate-900/40 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
              Our Philosophy
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Athletes Who Coach.{" "}
              <span className="text-cyan-400">Coaches Who Race.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
              Tri IQ, LLC embraces differences with the belief that broadened
              representation, empathy, and understanding lead to better athletic
              performance and better business outcomes.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
              We are committed to empowering athletes to achieve sustained
              competitive excellence and well-being. To fulfill this mission, we
              prioritize diversity and maintain an inclusive and equitable culture
              that represents all athletes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/coaching"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-cyan-500/30 active:scale-95"
              >
                View Coaching Services
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <a
                href="mailto:coachpete@triiqcoaching.com"
                className="inline-flex items-center justify-center px-8 py-4 border border-slate-600 hover:border-cyan-500/50 text-slate-300 hover:text-white font-semibold rounded-full transition-all duration-200 hover:bg-slate-800/50"
              >
                Get in Touch
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
