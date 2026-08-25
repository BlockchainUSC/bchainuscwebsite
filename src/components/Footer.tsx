const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/trojancrypto", icon: "/logos/linkedin.png" },
  { label: "X", href: "https://x.com/0xBlockchainSC", icon: "/logos/x.svg" },
  { label: "Instagram", href: "https://www.instagram.com/blockchainatusc/", icon: "/logos/instagram.svg" },
  { label: "GitHub", href: "https://github.com/BlockchainUSC", icon: "/logos/github.svg" },
  { label: "YouTube", href: "https://www.youtube.com/@blockchainusc", icon: "/logos/youtube.svg" },
  { label: "Medium", href: "https://medium.com/blockchain-at-usc", icon: "/logos/medium.svg" },
];

export default function Footer() {
  return (
    <footer
      className="z-10 relative"
      style={{
        borderTop: "1px solid var(--border)",
        padding: "var(--space-md) 0",
        background: "var(--bg-base)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-[var(--space-md)]">
        {/* Footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg items-center mb-md">
          {/* Description */}
          <div>
            <p className="text-[var(--text-secondary)] text-sm max-w-[340px]">
              Join us on our journey of advancing decentralized systems
              through rigorous research and development at the University of
              Southern California.
            </p>
          </div>

          {/* Socials + Email */}
          <div className="flex flex-col md:items-end gap-4">
            <h5 className="font-mono text-xs text-[var(--text-secondary)] uppercase tracking-widest">
              Socials
            </h5>
            <div className="flex items-center gap-5">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="opacity-60 transition-opacity duration-200 hover:opacity-100"
                >
                  <img src={link.icon} alt={link.label} className="h-5 w-5" />
                </a>
              ))}
            </div>
            <p className="text-sm">
              <span className="text-[var(--text-secondary)]">email: </span>
              <a
                href="mailto:bchain@usc.edu"
                className="text-[var(--text-primary)] no-underline font-medium transition-colors duration-200 hover:text-cardinal-bright"
              >
                bchain@usc.edu
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center pt-4 font-mono text-xs text-[var(--text-secondary)]"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <span>&copy; 2026 Blockchain@USC. All rights reserved.</span>
          <span>FIGHT ON</span>
        </div>
      </div>
    </footer>
  );
}
