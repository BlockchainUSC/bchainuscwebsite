"use client";

import { useEffect, useRef } from "react";

interface GridPoint {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  row: number;
  col: number;
}

export default function WireframeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const gridRef = useRef<GridPoint[]>([]);
  const timeRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;

    const gridRows = isMobile ? 20 : 30;
    const gridCols = isMobile ? 25 : 40;

    function initGrid() {
      if (!canvas) return;
      gridRef.current = [];
      const cellWidth = canvas.width / (gridCols - 1);
      const cellHeight = canvas.height / (gridRows - 1);

      for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
          gridRef.current.push({
            x: col * cellWidth,
            y: row * cellHeight,
            baseX: col * cellWidth,
            baseY: row * cellHeight,
            row,
            col,
          });
        }
      }
    }

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initGrid();
    }

    function updateGrid() {
      const time = timeRef.current;
      const points = gridRef.current;
      const amplitude = 40;

      for (const point of points) {
        const wave1 =
          Math.sin(point.col * 0.3 + time * 0.8) *
          Math.cos(point.row * 0.2 + time * 0.5);
        const wave2 =
          Math.sin(point.row * 0.4 + time * 0.6) *
          Math.cos(point.col * 0.25 + time * 0.4);
        const wave3 =
          Math.sin((point.col + point.row) * 0.15 + time * 0.3) * 0.5;

        point.x =
          point.baseX + (wave1 + wave2 + wave3) * amplitude * 0.3;
        point.y =
          point.baseY + (wave1 * 0.5 + wave2 * 0.8 + wave3) * amplitude;
      }
    }

    function drawGrid() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const points = gridRef.current;

      // Draw horizontal + vertical lines in cardinal red
      ctx.strokeStyle = "rgba(153, 0, 0, 0.2)";
      ctx.lineWidth = 0.8;

      // Horizontal lines
      for (let row = 0; row < gridRows; row++) {
        ctx.beginPath();
        for (let col = 0; col < gridCols; col++) {
          const point = points[row * gridCols + col];
          if (col === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        }
        ctx.stroke();
      }

      // Vertical lines
      for (let col = 0; col < gridCols; col++) {
        ctx.beginPath();
        for (let row = 0; row < gridRows; row++) {
          const point = points[row * gridCols + col];
          if (row === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        }
        ctx.stroke();
      }

      // Diagonal cross-hatching
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.lineWidth = 0.5;

      for (let row = 0; row < gridRows - 1; row++) {
        for (let col = 0; col < gridCols - 1; col++) {
          const p1 = points[row * gridCols + col];
          const p3 = points[(row + 1) * gridCols + col + 1];
          const p2 = points[row * gridCols + col + 1];
          const p4 = points[(row + 1) * gridCols + col];

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(p2.x, p2.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.stroke();
        }
      }
    }

    function animate() {
      // Throttle to ~30fps
      frameRef.current++;
      if (frameRef.current % 2 !== 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      timeRef.current += 0.02;
      updateGrid();
      drawGrid();
      rafRef.current = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener("resize", resize);

    if (prefersReduced) {
      // Draw one static frame
      updateGrid();
      drawGrid();
    } else {
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[1] pointer-events-none"
      aria-hidden="true"
    />
  );
}
