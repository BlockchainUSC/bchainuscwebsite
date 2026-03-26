import NewsletterForm from "./NewsletterForm";

const INDEX_LINKS = [
  { label: "Research", href: "#research" },
  { label: "Events", href: "#events" },
  { label: "Team", href: "#team" },
];

const CONNECT_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/trojancrypto", external: true },
  { label: "Twitter", href: "https://x.com/0xBlockchainSC", external: true },
  { label: "Instagram", href: "https://www.instagram.com/blockchainatusc/", external: true },
  { label: "GitHub", href: "https://github.com/BlockchainUSC", external: true },
  { label: "YouTube", href: "https://www.youtube.com/@blockchainusc", external: true },
  { label: "Medium", href: "https://medium.com/blockchain-at-usc", external: true },
  { label: "Email Us", href: "mailto:bchain@usc.edu", external: false },
];

export default function Footer() {
  return (
    <footer
      className="z-10 relative"
      style={{
        borderTop: "1px solid var(--border)",
        padding: "var(--space-xl) 0 var(--space-md)",
        background: "var(--bg-base)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-[var(--space-md)]">
        {/* Footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mb-lg">
          {/* Brand */}
          <div>
            <h4 className="font-display text-2xl mb-sm">Blockchain@USC</h4>
            <p className="text-[var(--text-secondary)] text-sm max-w-[300px] mb-md">
              Advancing the frontier of decentralized systems through rigorous
              research and development at the University of Southern California.
            </p>
            <NewsletterForm />
          </div>

          {/* Links */}
          <div className="flex gap-16 md:justify-end">
            <div>
              <h5 className="font-mono text-xs text-[var(--text-secondary)] uppercase tracking-widest mb-4">
                Index
              </h5>
              <ul className="list-none flex flex-col gap-3">
                {INDEX_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[var(--text-primary)] no-underline text-sm transition-colors duration-200 hover:text-cardinal-bright"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-mono text-xs text-[var(--text-secondary)] uppercase tracking-widest mb-4">
                Connect
              </h5>
              <ul className="list-none flex flex-col gap-3">
                {CONNECT_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[var(--text-primary)] no-underline text-sm transition-colors duration-200 hover:text-cardinal-bright"
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center pt-md font-mono text-xs text-[var(--text-secondary)]"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <span>&copy; 2026 Blockchain@USC. All rights reserved.</span>
          <span>FIGHT ON</span>
        </div>
      </div>
    </footer>
  );
}
