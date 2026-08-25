import SectionHeader from "./SectionHeader";

const APPLICATION_STEPS = [
  {
    date: "Wed., August 26th",
    time: "11am – 2pm",
    label: "Involvement Fair",
  },
  {
    date: "Tues., September 1",
    time: "7:00pm – 8:00pm",
    label: "Open Info Session",
  },
  {
    date: "Sun., September 6th",
    time: "11:59pm",
    label: "Application Deadline",
    emphasize: true,
  },
  {
    date: "September 10th–11th",
    time: "TBD",
    label: "Interviews",
    inviteOnly: true,
  },
  {
    date: "September 13th",
    time: "6:00pm – 8:00pm",
    label: "Social Mixer",
    inviteOnly: true,
  },
  {
    date: "September 15th",
    time: null,
    label: "First Member Meeting",
    inviteOnly: true,
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-xl relative max-w-[1280px] mx-auto px-[var(--space-md)] z-10"
    >
      <SectionHeader index="01 / ABOUT" title="Who We Are" tag="README.md" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Left — write-up */}
        <div className="lg:col-span-3 flex flex-col gap-5 text-[var(--text-secondary)] text-base leading-relaxed">
          <p>
            Blockchain@USC is one of the oldest crypto student organizations
            in the country. We are broken down into two main functions:
          </p>

          <div>
            <h3 className="font-display text-[var(--text-primary)] font-semibold mb-2">
              Research and Investments:
            </h3>
            <p>
              Cutting edge research around the digital asset ecosystem for
              bounties, social media, and competitions. We manage a &gt;$100K
              portfolio of digital assets, where every investment is pitched
              and voted on by members.
            </p>
          </div>

          <div>
            <h3 className="font-display text-[var(--text-primary)] font-semibold mb-2">
              Projects:
            </h3>
            <p>
              Our projects team works on grants, hackathons, and with
              consulting clients to take home real prize money and funding.
              There is also opportunity to work on marketing, events, and
              partnership related projects.
            </p>
          </div>

          <div className="border-t border-white/[0.08] my-1" />

          <p>
            Members also get an education program that assumes zero
            background, plus access to professional research platforms and
            premium AI tooling.
          </p>
          <p>
            We provide sponsored travel to conferences like ETHDenver and
            UBC, and help host our own annual conference with VanEck
            alongside partners like Circle and Solana.
          </p>
          <p>
            Our alumni have recently landed at BlackRock, Coinbase, Jump
            Trading, Polychain Capital, and 50T, while founders in the club
            have raised over $7M from investors like Paradigm.
          </p>
          <p className="text-[var(--text-primary)] font-semibold">
            No prior crypto experience required and every major is welcomed.
          </p>
        </div>

        {/* Right — Application Process */}
        <div className="lg:col-span-2 rounded-xl border border-white/[0.08] bg-white/[0.015] backdrop-blur-sm p-lg lg:sticky lg:top-28">
          <h3 className="font-display text-lg font-semibold tracking-tight mb-6">
            Application Process
          </h3>
          <div className="flex flex-col gap-5">
            {APPLICATION_STEPS.map((step) => (
              <div
                key={step.label}
                className={`pl-4 relative ${
                  step.emphasize ? "border-l-2 border-cardinal-bright" : "border-l-2 border-white/[0.08]"
                }`}
              >
                <div className="font-mono text-[11px] tracking-wider text-[var(--text-secondary)]">
                  {step.date}
                  {step.time && <span> · {step.time}</span>}
                </div>
                <div
                  className={`text-sm mt-0.5 ${
                    step.emphasize
                      ? "font-semibold text-cardinal-bright"
                      : "text-[var(--text-primary)]"
                  }`}
                >
                  {step.label}
                  {step.inviteOnly && (
                    <span className="text-[var(--text-secondary)] font-normal"> (Invite Only)</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
