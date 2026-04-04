
import Link from "next/link";
import { UtensilsCrossed, Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const features = [
    "AI-powered restaurant discovery",
    "Personalised picks based on your taste",
    "Real-time availability & reservations",
    "Curated local hidden gems",
  ];

  return (
    <div className="min-h-screen flex">

      {/* ── Left branding panel ── */}
      <div
        className="hidden lg:flex flex-col w-[46%] flex-shrink-0"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        {/* Top logo */}
        <div className="px-12 pt-12">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <UtensilsCrossed size={16} className="text-white" />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">FoodieAI</span>
          </Link>
        </div>

        {/* Centre content */}
        <div className="flex-1 flex flex-col justify-center px-12">
          <div className="inline-flex items-center gap-1.5 mb-8 px-3 py-1 rounded-full bg-white/15 border border-white/20 w-fit">
            <Sparkles size={11} className="text-white/80" />
            <span className="text-white/80 text-xs font-medium">AI-Powered</span>
          </div>

          <h1 className="text-[2.6rem] font-bold text-white leading-tight tracking-tight mb-4">
            Discover the best<br />food in your city
          </h1>

          <p className="text-white/60 text-base leading-relaxed mb-10 max-w-xs">
            Smart, instant recommendations tailored to your taste — every single time.
          </p>

          {/* Feature list */}
          <ul className="flex flex-col gap-3">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />
                <span className="text-white/70 text-sm">{f}</span>
              </li>
            ))}
          </ul>

          {/* Stat strip */}
          <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-3 gap-6">
            {[
              { n: "50K+", l: "Users" },
              { n: "200+", l: "Cities" },
              { n: "4.9", l: "Rating" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-white text-xl font-bold">{s.n}</p>
                <p className="text-white/45 text-xs mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="px-12 pb-10">
          <p className="text-white/30 text-xs">© 2025 FoodieAI. All rights reserved.</p>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col bg-[var(--color-warm)] dark:bg-stone-950">

        {/* Mobile header */}
        <div className="lg:hidden px-6 pt-8 pb-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <UtensilsCrossed size={14} className="text-white" />
            </div>
            <span className="font-semibold text-stone-900 dark:text-white text-base">
              Foodie<span style={{ color: "var(--color-primary)" }}>AI</span>
            </span>
          </Link>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
          <div className="w-full max-w-[400px] flex flex-col gap-5">

            {/* Demo credentials */}
            <div className="rounded-xl border border-amber-200 dark:border-amber-800/50 overflow-hidden text-xs">
              <div className="bg-amber-100/80 dark:bg-amber-900/30 px-4 py-2 border-b border-amber-200 dark:border-amber-800/50">
                <span className="font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest text-[10px]">
                  Demo credentials
                </span>
              </div>
              <div className="bg-white/60 dark:bg-stone-900/40 grid grid-cols-2 divide-x divide-amber-100 dark:divide-amber-900/50">
                {[
                  { role: "User", email: "user00@example.com", pass: "User@123409" },
                  { role: "Admin", email: "farialrobama15@gmail.com", pass: "09876@fF" },
                ].map((c) => (
                  <div key={c.role} className="px-4 py-3 space-y-0.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500 mb-1">
                      {c.role}
                    </p>
                    <p className="text-stone-600 dark:text-stone-400 break-all">{c.email}</p>
                    <p className="text-stone-500 dark:text-stone-500 font-mono">{c.pass}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Clerk slot */}
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}