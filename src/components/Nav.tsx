"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Investments", href: "#investments" },
  { label: "Research", href: "#research" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
];


export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] pt-4 px-[var(--space-md)]">
        <div
          className="max-w-[1280px] mx-auto rounded-full border border-black/10 flex justify-between items-center px-4 py-2.5 shadow-[0_4px_24px_-8px_rgba(20,10,30,0.15)]"
          style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(16px)",
          }}
        >
          <a
            href="#"
            className="font-display font-bold text-lg tracking-tight text-[var(--text-primary)] no-underline flex items-center gap-0"
          >
            <Image
              src="/logo.png"
              alt="Blockchain@USC logo"
              width={30}
              height={30}
              className="rounded-sm"
            />
            <span>
              Blockchain<span className="text-cardinal-bright">@</span>USC
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[var(--text-secondary)] no-underline text-sm font-medium transition-colors duration-200 hover:text-[var(--text-primary)]"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => window.dispatchEvent(new Event("open-newsletter"))}
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full bg-cardinal-bright text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Subscribe
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[var(--text-secondary)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[99] flex flex-col pt-24 px-6 pb-8"
          style={{ backgroundColor: "var(--bg-base)" }}
        >
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-left py-4 text-2xl font-display font-semibold no-underline transition-colors duration-200 text-[var(--text-primary)] border-b"
                style={{ borderColor: "var(--border)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-8">
            <button
              onClick={() => {
                setMobileOpen(false);
                window.dispatchEvent(new Event("open-newsletter"));
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium rounded-full bg-cardinal-bright text-white"
            >
              Subscribe to Newsletter →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
