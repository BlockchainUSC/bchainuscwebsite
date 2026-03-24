export default function BackgroundMesh() {
  return (
    <>
      {/* Ambient light glow */}
      <div
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vh] pointer-events-none z-0 opacity-80 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, var(--glow-color) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* Mesh gradient blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full animate-mesh-float opacity-60"
          style={{
            width: "50vw",
            height: "50vw",
            background: "var(--mesh-color-1)",
            filter: "blur(150px)",
            top: "-15%",
            left: "-10%",
          }}
        />
        <div
          className="absolute rounded-full animate-mesh-float-delay-1 opacity-60"
          style={{
            width: "40vw",
            height: "40vw",
            background: "var(--mesh-color-1)",
            filter: "blur(150px)",
            bottom: "-10%",
            left: "-5%",
          }}
        />
        <div
          className="absolute rounded-full animate-mesh-float-delay-2 opacity-60"
          style={{
            width: "45vw",
            height: "45vw",
            background: "var(--mesh-color-2)",
            filter: "blur(150px)",
            bottom: "-15%",
            right: "-10%",
          }}
        />
        <div
          className="absolute rounded-full animate-mesh-float-delay-3 opacity-60"
          style={{
            width: "35vw",
            height: "35vw",
            background: "var(--mesh-color-2)",
            filter: "blur(150px)",
            top: "40%",
            right: "-5%",
          }}
        />
      </div>
    </>
  );
}
