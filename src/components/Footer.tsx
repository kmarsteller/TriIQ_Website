import Link from "next/link";

const footerNav = [
  {
    section: "Services",
    links: [
      { href: "/coaching", label: "Coaching Plans" },
      { href: "/coaching#plan", label: "Custom Training" },
      { href: "/coaching#feedback", label: "Data Analysis" },
      { href: "/coaching#checklist", label: "What's Included" },
    ],
  },
  {
    section: "Team",
    links: [
      { href: "/coaches", label: "Our Coaches" },
      { href: "/coaches#kendra", label: "Coach Kendra" },
      { href: "/coaches#pete", label: "Coach Pete" },
      { href: "/members", label: "Members" },
    ],
  },
  {
    section: "Community",
    links: [
      { href: "/members#practices", label: "Group Practices" },
      { href: "/members#calendar", label: "Race Calendar" },
      { href: "/members#sponsors", label: "Partner Discounts" },
      { href: "/members#gear", label: "Team Gear" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/60 relative overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/triiq-logo.png"
                alt="Tri IQ Coaching"
                className="h-10 w-auto"
                style={{ filter: "invert(1) hue-rotate(180deg)" }}
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Science-based triathlon coaching for every athlete. Personalized plans,
              expert guidance, and a community built to lift you up.
            </p>
            <p className="text-xs text-slate-600 font-medium uppercase tracking-widest mb-3">
              Follow Us
            </p>
            <div className="flex gap-5">
              <a
                href="https://www.facebook.com/triiqcoaching"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-cyan-400 transition-colors text-sm font-semibold"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/triiqcoaching/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-cyan-400 transition-colors text-sm font-semibold"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {footerNav.map((col) => (
            <div key={col.section}>
              <h4 className="text-white font-bold text-xs mb-5 uppercase tracking-[0.15em]">
                {col.section}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-slate-200 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/60 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Tri IQ Coaching, LLC · All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="mailto:coachkendra@triiqcoaching.com"
              className="text-slate-500 hover:text-cyan-400 text-xs font-medium transition-colors"
            >
              coachkendra@triiqcoaching.com
            </a>
            <a
              href="mailto:coachpete@triiqcoaching.com"
              className="text-slate-500 hover:text-cyan-400 text-xs font-medium transition-colors"
            >
              coachpete@triiqcoaching.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
