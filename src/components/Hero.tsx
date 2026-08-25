"use client";

import { useEffect, useState } from "react";

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
    "Onchain Systems",
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
        {/* Heading */}
        <h1 className="font-sans font-extrabold leading-[1.05] tracking-tight text-center mb-8 text-[clamp(2.25rem,6vw,5.5rem)] text-[var(--text-primary)]">
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
        <p className="text-[clamp(1.1rem,1.6vw,1.375rem)] text-[var(--text-secondary)] max-w-[700px] mx-auto mb-14 leading-relaxed text-center">
          USC&apos;s premier student-led organization for blockchain research,
          rigorous protocol analysis, and accelerating Web3 founders.
        </p>

        {/* CTAs */}
        <div className="flex gap-4 justify-center items-center flex-wrap">
          <a
            href="https://forms.gle/gWe2483cE4vBqDJM9"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium rounded-full bg-cardinal-bright text-white overflow-hidden no-underline transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10">Apply Fall &apos;26</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-0.5">
              →
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-cardinal to-cardinal-bright opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="https://uscblockchainconf.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium rounded-full border border-black/10 bg-white/60 text-[var(--text-primary)] no-underline backdrop-blur-sm transition-all hover:border-black/20 hover:bg-white"
          >
            <span>Our Conference</span>
            <span className="text-[var(--text-secondary)] group-hover:text-cardinal-bright transition-colors">
              ↗
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
