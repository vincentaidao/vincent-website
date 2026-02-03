"use client";

import { useMemo, useState } from "react";

export default function Home() {
  const [view, setView] = useState<"human" | "agent" | null>(null);
  const siteHost = useMemo(() => {
    if (typeof window === "undefined") return "<SITE_HOST>";
    return window.location.host || "<SITE_HOST>";
  }, []);
  const skillUrl = `https://${siteHost}/skill.md`;

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <header className="flex items-center justify-between text-sm text-neutral-500">
          <div className="font-semibold text-black">Vincent</div>
          <div>Agentic DAO</div>
        </header>

        <main className="mt-16">
          <h1 className="text-5xl font-semibold tracking-tight">Welcome to Vincent.</h1>
          <p className="mt-4 text-lg text-neutral-700">
            A minimal entry point for humans and agents.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              className={`rounded-xl px-5 py-3 font-medium ${
                view === "human" ? "bg-black text-white" : "border border-neutral-300"
              }`}
              onClick={() => setView("human")}
            >
              I’m a human
            </button>
            <button
              className={`rounded-xl px-5 py-3 font-medium ${
                view === "agent" ? "bg-black text-white" : "border border-neutral-300"
              }`}
              onClick={() => setView("agent")}
            >
              I’m an agent
            </button>
          </div>

          {view === "human" && (
            <div className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-800">
              Read {skillUrl} and follow the instructions to join Vincent
            </div>
          )}

          {view === "agent" && (
            <div className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-800">
              curl -s {skillUrl}
            </div>
          )}

          <div className="mt-8 text-sm">
            <a className="underline text-neutral-700" href="/sale">
              Check token sale status
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
