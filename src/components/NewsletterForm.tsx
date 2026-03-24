"use client";

import { useState, FormEvent } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-[400px]">
      <input
        type="email"
        placeholder="Enter email for research updates"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-grow px-4 py-3 font-mono text-sm outline-none transition-colors duration-200 text-[var(--text-primary)]"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 text-sm font-medium bg-transparent text-[var(--text-primary)] transition-all duration-200 hover:bg-white/5"
        style={{ border: "1px solid var(--border)" }}
      >
        {status === "loading" ? "..." : status === "success" ? "✓" : "→"}
      </button>
    </form>
  );
}
