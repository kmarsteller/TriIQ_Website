import Link from "next/link";
import {
  MapPin,
  Calendar,
  Download,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Route,
  Flag,
  Clock,
} from "lucide-react";

export const metadata = {
  title: "IRONMAN Ohio 70.3 Preview Ride",
  description:
    "Ride the IRONMAN Ohio 70.3 course with Tri IQ on June 20, 2026. Download the TCX/GPX files and preview the 56-mile loop through Sandusky, OH before race day.",
};

export default function ImOhPreviewPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 mb-5">
            <MapPin size={13} className="text-cyan-400" />
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em]">Course Preview</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            IRONMAN Ohio 70.3{" "}
            <span className="text-cyan-400">Preview Ride</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Ride the full 56-mile bike course with the Tri IQ crew — four weeks
            before race day. Know every turn before you pin on your race number.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-10">

          {/* ── Key Dates ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Calendar,
                label: "Preview Ride",
                value: "June 20, 2026",
                sub: "Tri IQ Group Ride",
                accent: "cyan",
              },
              {
                icon: Flag,
                label: "Race Day",
                value: "July 19, 2026",
                sub: "IRONMAN Ohio 70.3",
                accent: "red",
              },
              {
                icon: Route,
                label: "Bike Course",
                value: "56 Miles",
                sub: "Single-loop route",
                accent: "cyan",
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex flex-col items-center text-center p-5 rounded-xl bg-slate-800/50 border ${
                  item.accent === "red"
                    ? "border-red-500/25"
                    : "border-slate-700/40"
                }`}
              >
                <div
                  className={`inline-flex p-3 rounded-xl mb-3 ${
                    item.accent === "red"
                      ? "bg-red-500/10 border border-red-500/25"
                      : "bg-cyan-500/10 border border-cyan-500/25"
                  }`}
                >
                  <item.icon
                    size={20}
                    className={item.accent === "red" ? "text-red-400" : "text-cyan-400"}
                  />
                </div>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p
                  className={`text-base font-black ${
                    item.accent === "red" ? "text-red-400" : "text-white"
                  }`}
                >
                  {item.value}
                </p>
                <p className="text-slate-400 text-xs mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* ── About the Ride ── */}
          <div className="p-6 md:p-8 rounded-2xl border border-slate-700/60 bg-slate-900/60">
            <h2 className="text-xl font-black text-white mb-4">About the Preview Ride</h2>
            <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
              <p>
                Racing IRONMAN Ohio 70.3 without knowing the course is leaving time
                on the table. This group preview ride covers the full 56-mile bike
                leg — the same roads, the same turns, and the same rollers you&apos;ll
                tackle on race day.
              </p>
              <p>
                Coaches Pete and Kendra will be on course to give live feedback on
                pacing, nutrition timing, and race-day strategy. It&apos;s the perfect
                long training day with a purpose.
              </p>
              <p>
                The ride is self-supported — bring everything you&apos;d carry in a
                race. Helmets are required. All fitness levels racing IMOH 70.3
                are welcome.
              </p>
            </div>
          </div>

          {/* ── Location ── */}
          <div className="p-5 rounded-2xl border border-slate-700/60 bg-slate-900/60 flex items-start gap-4">
            <div className="shrink-0 p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25">
              <MapPin size={18} className="text-cyan-400" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-1">Location</h3>
              <p className="text-slate-300 text-sm">Sandusky, Ohio</p>
              <p className="text-slate-500 text-xs mt-0.5">
                Start / finish location and logistics communicated to registered riders via Discord
              </p>
            </div>
          </div>

          {/* ── Course Downloads ── */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Download size={18} className="text-cyan-400" />
              <h2 className="text-xl font-black text-white">Course Files</h2>
            </div>

            <div className="space-y-3">
              {/* RideWithGPS */}
              <div className="p-5 rounded-2xl border border-slate-700/60 bg-slate-900/60 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-white font-bold text-sm mb-1">View on RideWithGPS</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Interactive map, elevation profile, and turn-by-turn cues.
                    Great for scouting the route on any device.
                  </p>
                </div>
                <a
                  href="https://ridewithgps.com/routes/43627172"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full text-sm transition-all hover:shadow-lg hover:shadow-cyan-500/30 active:scale-95"
                >
                  Open Route
                  <ExternalLink size={13} />
                </a>
              </div>

              {/* File downloads row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="/routes/imoh-70-3-bike-course.tcx"
                  download
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/40 hover:border-cyan-500/40 transition-all group"
                >
                  <div className="shrink-0 p-2.5 rounded-lg bg-slate-700/60 group-hover:bg-cyan-500/10 border border-slate-600/40 group-hover:border-cyan-500/25 transition-all">
                    <Download size={15} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Download TCX</p>
                    <p className="text-slate-500 text-xs">Garmin / Wahoo compatible</p>
                  </div>
                </a>

                <a
                  href="/routes/imoh-70-3-bike-course.gpx"
                  download
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/40 hover:border-cyan-500/40 transition-all group"
                >
                  <div className="shrink-0 p-2.5 rounded-lg bg-slate-700/60 group-hover:bg-cyan-500/10 border border-slate-600/40 group-hover:border-cyan-500/25 transition-all">
                    <Download size={15} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Download GPX</p>
                    <p className="text-slate-500 text-xs">Universal GPS format</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* ── What to Bring ── */}
          <div className="p-6 rounded-2xl border border-slate-700/40 bg-slate-900/30">
            <h2 className="text-base font-black text-white mb-4">Ride day checklist</h2>
            <ul className="space-y-2.5">
              {[
                "Helmet (required — no exceptions)",
                "Race or training bike in good mechanical condition",
                "Garmin / GPS loaded with the TCX or GPX file",
                "2–3 water bottles (support is not provided)",
                "Nutrition for a full race-sim effort",
                "Flat kit: tube, CO₂ or pump, tire levers",
                "Sunscreen and race-day kit",
                "Join the Tri IQ Discord for ride-day logistics",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Elevation note ── */}
          <div className="p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-4">
            <div className="shrink-0 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25">
              <Clock size={16} className="text-amber-400" />
            </div>
            <div>
              <p className="text-amber-400 font-bold text-sm mb-1">Plan for race-pace conditions</p>
              <p className="text-slate-400 text-xs leading-relaxed">
                Ohio summer mornings heat up fast. Plan your start time to finish before peak
                afternoon temperatures. Coaches recommend a 7–8 AM roll-out — final time will
                be confirmed in Discord.
              </p>
            </div>
          </div>

          {/* ── Contact / CTA ── */}
          <div className="p-6 md:p-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5">
            <h2 className="text-lg font-black text-white mb-2">Questions?</h2>
            <p className="text-slate-400 text-sm mb-5">
              Drop a message to your coach or use the contact form and we&apos;ll be in touch within 24–48 hours.
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
