"use client";
import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="section-pad bg-white dark:bg-stone-950">
      <div className="container-pad">
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: "#FAECE7" }}
          >
            <Mail size={24} style={{ color: "var(--color-primary)" }} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mb-3">
            Get Weekly Food Picks
          </h2>
          <p className="text-stone-500 dark:text-stone-400 mb-8">
            Join 12,000+ food lovers getting curated restaurant picks, exclusive deals, and foodie tips every week.
          </p>

          {status === "success" ? (
            <div className="flex items-center justify-center gap-2 text-[var(--color-secondary)] font-medium">
              <CheckCircle2 size={20} />
              <span>You're subscribed! Check your inbox.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white text-sm outline-none focus:border-[var(--color-primary)] transition-colors"
              />
              <Button type="submit" variant="primary" size="md" loading={status === "loading"}>
                Subscribe
              </Button>
            </form>
          )}

          <p className="text-xs text-stone-400 mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}