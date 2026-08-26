export default function WireframeCanvas() {
  return (
    <div
      className="fixed inset-0 w-full h-full z-[1] pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage: `
          repeating-linear-gradient(60deg, rgba(122, 13, 13, 0.05) 0px, rgba(122, 13, 13, 0.05) 1px, transparent 1px, transparent 84px),
          repeating-linear-gradient(-60deg, rgba(122, 13, 13, 0.05) 0px, rgba(122, 13, 13, 0.05) 1px, transparent 1px, transparent 84px)
        `,
        filter: "blur(1.5px)",
        opacity: 0.7,
      }}
    />
  );
}
