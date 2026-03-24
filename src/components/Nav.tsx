"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Research", href: "#research" },
  { label: "Events", href: "#events" },
  { label: "Team", href: "#team" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-[100] transition-all duration-300"
        style={{
          padding: "var(--space-md) 0",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.05)"
            : "1px solid transparent",
          background: scrolled ? "rgba(3,3,3,0.8)" : "transparent",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-[var(--space-md)] flex justify-between items-center">
          <a
            href="#"
            className="font-display font-bold text-xl tracking-tight text-[var(--text-primary)] no-underline flex items-center gap-3"
          >
            <Image
              src="/logo.png"
              alt="Blockchain@USC logo"
              width={36}
              height={36}
              className="rounded-sm"
            />
            Blockchain<span className="text-cardinal-bright">@</span>USC
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[var(--text-secondary)] no-underline text-sm font-medium transition-colors duration-200 hover:text-[var(--text-primary)]"
              >
                {link.label}
              </a>
            ))}
            <span
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded bg-cardinal text-white opacity-70 cursor-default select-none"
              style={{
                boxShadow: "0 0 20px rgba(153, 0, 0, 0.2)",
              }}
            >
              Fall &apos;26 Cohort Coming Soon
            </span>
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
            <span
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded bg-cardinal text-white opacity-70 cursor-default select-none"
              style={{ boxShadow: "0 0 20px rgba(153, 0, 0, 0.2)" }}
            >
              Fall &apos;26 Cohort Coming Soon
            </span>
          </div>
        </div>
      )}
    </>
  );
}
