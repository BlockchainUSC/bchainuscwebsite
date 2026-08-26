type Dot = { x: number; y: number; r: number; o: number };

const V1 = { x: 0.866, y: -0.5 }; // top-right isometric direction
const V2 = { x: -0.866, y: -0.5 }; // top-left isometric direction
const V3 = { x: 0, y: 1 }; // straight down

function scale(v: { x: number; y: number }, s: number) {
  return { x: v.x * s, y: v.y * s };
}
function add(...vs: { x: number; y: number }[]) {
  return vs.reduce((acc, v) => ({ x: acc.x + v.x, y: acc.y + v.y }), { x: 0, y: 0 });
}

function cubeDots(cx: number, cy: number, edge: number, steps: number, opacity: number): Dot[] {
  const dots: Dot[] = [];
  const v1 = scale(V1, edge);
  const v2 = scale(V2, edge);
  const v3 = scale(V3, edge);
  const T = { x: cx, y: cy };
  const R = add(T, v1);
  const L = add(T, v2);
  const B = add(T, v1, v2);

  const faces: [{ x: number; y: number }, { x: number; y: number }, { x: number; y: number }][] = [
    [T, v1, v2], // top face: origin T, edges v1 & v2
    [R, v2, v3], // right face: origin R, edges v2 (to B) & v3 (down)
    [L, v1, v3], // left face: origin L, edges v1 (to B) & v3 (down)
  ];

  for (const [origin, e1, e2] of faces) {
    for (let i = 0; i <= steps; i++) {
      for (let j = 0; j <= steps; j++) {
        const u = i / steps;
        const w = j / steps;
        const p = add(origin, scale(e1, u), scale(e2, w));
        dots.push({ x: p.x, y: p.y, r: 0.9, o: opacity });
      }
    }
  }
  void B;
  return dots;
}

function groundRingDots(cx: number, cy: number, count: number, spacing: number, opacity: number): Dot[] {
  const dots: Dot[] = [];
  for (let ring = 1; ring <= count; ring++) {
    const rx = ring * spacing;
    const ry = rx * 0.32;
    const n = 10 + ring * 6;
    for (let k = 0; k < n; k++) {
      const angle = Math.PI * (0.08 + (k / n) * 0.84);
      dots.push({
        x: cx + Math.cos(angle) * rx,
        y: cy + Math.sin(angle) * ry,
        r: 0.8,
        o: opacity * (1 - ring / (count + 2)),
      });
    }
  }
  return dots;
}

function CubeNetworkThumb() {
  const dots: Dot[] = [
    ...cubeDots(150, 60, 42, 7, 0.9),
    ...cubeDots(60, 30, 16, 3, 0.6),
    ...cubeDots(240, 30, 16, 3, 0.6),
    ...cubeDots(60, 115, 16, 3, 0.6),
    ...cubeDots(240, 115, 16, 3, 0.6),
    ...groundRingDots(150, 150, 5, 14, 0.5),
  ];
  return (
    <>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#f2eef8" opacity={d.o} />
      ))}
    </>
  );
}

function GlobeThumb() {
  const dots: Dot[] = [];
  const cx = 150;
  const cy = 100;
  const R = 68;
  const latSteps = 16;
  const lonSteps = 26;
  for (let i = 0; i <= latSteps; i++) {
    const theta = (Math.PI * i) / latSteps; // 0..pi
    const y = -Math.cos(theta) * R;
    const ringR = Math.sin(theta) * R;
    for (let j = 0; j < lonSteps; j++) {
      const phi = (2 * Math.PI * j) / lonSteps;
      const x = Math.cos(phi) * ringR;
      const z = Math.sin(phi) * ringR;
      if (z < -ringR * 0.15) continue; // only front-facing-ish dots
      dots.push({
        x: cx + x * 1.15,
        y: cy + y,
        r: 0.85,
        o: 0.4 + 0.5 * ((z + ringR) / (2 * ringR || 1)),
      });
    }
  }
  return (
    <>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#f2eef8" opacity={d.o} />
      ))}
      <ellipse
        cx={cx}
        cy={cy}
        rx={R * 1.35}
        ry={R * 0.42}
        fill="none"
        stroke="#f2eef8"
        strokeWidth="0.6"
        strokeDasharray="2 3"
        opacity="0.35"
      />
    </>
  );
}

function CylinderGroupThumb() {
  const cylinders = [
    { x: 60, h: 62, r: 20 },
    { x: 105, h: 48, r: 18 },
    { x: 148, h: 78, r: 20 },
    { x: 193, h: 96, r: 16 },
    { x: 232, h: 96, r: 16 },
    { x: 265, h: 62, r: 14 },
  ];
  const baseY = 150;
  const dots: Dot[] = [];
  for (const c of cylinders) {
    const topY = baseY - c.h;
    const ringSteps = 20;
    for (let j = 0; j < ringSteps; j++) {
      const angle = (2 * Math.PI * j) / ringSteps;
      const ex = Math.cos(angle) * c.r;
      const ey = Math.sin(angle) * c.r * 0.32;
      dots.push({ x: c.x + ex, y: topY + ey, r: 0.8, o: 0.85 });
      dots.push({ x: c.x + ex, y: baseY + ey, r: 0.8, o: 0.55 });
    }
    const vLines = 4;
    for (let v = 0; v < vLines; v++) {
      const angle = (2 * Math.PI * v) / vLines;
      const ex = Math.cos(angle) * c.r;
      const eyTop = Math.sin(angle) * c.r * 0.32;
      const steps = Math.round(c.h / 8);
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        dots.push({
          x: c.x + ex,
          y: topY + eyTop + t * (c.h),
          r: 0.65,
          o: 0.5,
        });
      }
    }
  }
  return (
    <>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#f2eef8" opacity={d.o} />
      ))}
      {groundRingDots(160, 172, 4, 16, 0.4).map((d, i) => (
        <circle key={`gr-${i}`} cx={d.x} cy={d.y} r={d.r} fill="#f2eef8" opacity={d.o} />
      ))}
    </>
  );
}

const MOTIFS = [CubeNetworkThumb, GlobeThumb, CylinderGroupThumb];

function motifForSlug(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return MOTIFS[hash % MOTIFS.length];
}

export default function ResearchThumbnail({ slug }: { slug: string }) {
  const Motif = motifForSlug(slug);
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full" aria-hidden="true">
      <rect width="300" height="200" fill="#4a0d0d" />
      <Motif />
    </svg>
  );
}
