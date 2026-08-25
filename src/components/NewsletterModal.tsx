"use client";

import { useEffect, useState, FormEvent } from "react";

export default function NewsletterModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-newsletter", onOpen);
    return () => window.removeEventListener("open-newsletter", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      onClick={() => setOpen(false)}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fade-in" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[480px] rounded-2xl border border-black/10 bg-[var(--surface)] p-8 animate-modal-in overflow-hidden shadow-[0_20px_60px_-15px_rgba(20,10,30,0.35)]"
      >
        {/* glow */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[400px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(153,0,0,0.25) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-black/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-black/30 transition-colors"
        >
          ✕
        </button>

        <div className="relative">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-cardinal-bright mb-3">
            ● Subscribe
          </div>
          <h3 className="font-display text-2xl font-semibold tracking-tight mb-2">
            Join the mailing list
          </h3>
          <p className="text-[var(--text-secondary)] text-sm mb-6 leading-relaxed">
            For updates on club events, guest speakers, application deadlines, and our
            monthly write up.
          </p>

          {status === "success" ? (
            <div className="rounded-lg border border-emerald-600/30 bg-emerald-600/10 p-4 font-mono text-sm text-emerald-700">
              ✓ You&apos;re in. Check your inbox.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="you@usc.edu"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-lg font-mono text-sm outline-none transition-colors text-[var(--text-primary)] bg-black/[0.03] border border-black/10 focus:border-black/30"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 rounded-lg text-sm font-medium bg-cardinal-bright text-white transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
              >
                {status === "loading" ? "Subscribing…" : "Subscribe →"}
              </button>
              {status === "error" && (
                <p className="text-xs text-rose-600 font-mono">
                  Something went wrong. Try again.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
