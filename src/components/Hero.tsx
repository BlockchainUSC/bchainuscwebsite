"use client";

import { useEffect, useState } from "react";

const TAGS = ["Protocol Research", "Venture Building", "On-Chain Engineering"];

function useTypewriter(words: string[], speed = 80, hold = 1600) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), hold);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setI((n) => n + 1);
      return;
    }
    const t = setTimeout(
      () =>
        setText((cur) =>
          deleting ? cur.slice(0, -1) : word.slice(0, cur.length + 1),
        ),
      deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(t);
  }, [text, deleting, i, words, speed, hold]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter([
    "On-Chain Systems",
    "Protocol Design",
    "Web3 Founders",
    "Decentralized Finance",
  ]);

  return (
    <header className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 px-[var(--space-md)] overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 hero-grid pointer-events-none" />
      {/* Scanline */}
      <div className="absolute inset-0 hero-scanline pointer-events-none opacity-[0.03]" />

      <div className="relative z-10 max-w-[1280px] w-full mx-auto">
        {/* Status pill */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-sm font-mono text-[11px] tracking-wider uppercase text-[var(--text-secondary)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>Block</span>
            <span className="text-white/80 tabular-nums">#21,847,392</span>
            <span className="w-px h-3 bg-white/10" />
            <span>USC · Spring 2026</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-8 font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)]">
          {TAGS.map((tag) => (
            <span key={tag} className="flex items-center gap-2">
              <span className="text-cardinal-bright">✦</span>
              {tag}
            </span>
          ))}
        </div>

        {/* Heading */}
        <h1 className="font-display font-bold leading-[0.98] tracking-[-0.03em] text-center mb-8 text-[clamp(3rem,8vw,7rem)]">
          <span className="block">Pioneering the</span>
          <span className="block">
            Future of{" "}
            <span className="hero-gradient-text inline-block">
              {typed}
              <span className="hero-caret" />
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-[clamp(1.05rem,1.5vw,1.25rem)] text-[var(--text-secondary)] max-w-[640px] mx-auto mb-12 leading-relaxed text-center">
          USC&apos;s premier student-led organization for blockchain research,
          rigorous protocol analysis, and accelerating Web3 founders.
        </p>

        {/* CTAs */}
        <div className="flex gap-4 justify-center items-center flex-wrap">
          <button
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium rounded-full bg-white text-black overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10">Apply · Fall &apos;26</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-0.5">
              →
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-cardinal-bright to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <a
            href="#research"
            className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium rounded-full border border-white/10 bg-white/[0.02] text-white no-underline backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.05]"
          >
            <span>Read Our Research</span>
            <span className="text-[var(--text-secondary)] group-hover:text-white transition-colors">
              ↗
            </span>
          </a>
        </div>

      </div>
    </header>
  );
}
