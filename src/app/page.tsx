"use client";

import { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";

const VIN_ADDRESS = "0x7fC4289A80d2cF44861f3DaFBe01125B93B5088D";
const SALE_ADDRESS = "0xD8e01065780E96677962F1C96B49A14E1f855B37";
const EXPLORER = "https://sepolia.etherscan.io/address/";
const RPC_URL = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || "https://rpc.sepolia.org";
const SALE_ABI = [
  "function totalRaised() view returns (uint256)",
  "function totalCapWei() view returns (uint256)",
  "function finalized() view returns (bool)",
];

type SaleState = {
  totalRaisedWei: bigint;
  capWei: bigint;
  finalized: boolean;
};

async function fetchSaleState(): Promise<SaleState> {
  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const sale = new ethers.Contract(SALE_ADDRESS, SALE_ABI, provider);
    const [totalRaised, cap, finalized] = await Promise.all([
      sale.totalRaised(),
      sale.totalCapWei(),
      sale.finalized(),
    ]);
    return {
      totalRaisedWei: BigInt(totalRaised),
      capWei: BigInt(cap),
      finalized: Boolean(finalized),
    };
  } catch (error) {
    console.error("Sale status read failed", error);
    return { totalRaisedWei: 0n, capWei: 0n, finalized: false };
  }
}

function formatEthFixed(valueWei: bigint, minDecimals = 6) {
  const raw = ethers.formatEther(valueWei);
  const [whole, frac = ""] = raw.split(".");
  const padded = (frac + "0".repeat(minDecimals)).slice(0, minDecimals);
  return `${whole}.${padded}`;
}

export default function Home() {
  const [view, setView] = useState<"human" | "agent" | null>(null);
  const [saleState, setSaleState] = useState<SaleState>({
    totalRaisedWei: 0n,
    capWei: 0n,
    finalized: false,
  });

  const skillUrl = "https://vincent-website-orcin.vercel.app/skill.md";

  useEffect(() => {
    fetchSaleState().then(setSaleState).catch(() => undefined);
  }, []);

  const remainingWei = saleState.capWei > saleState.totalRaisedWei ? saleState.capWei - saleState.totalRaisedWei : 0n;
  const isCapMet = saleState.capWei > 0n && saleState.totalRaisedWei >= saleState.capWei;
  const status = saleState.finalized ? "Finalized" : isCapMet ? "Finalizable" : "Open";

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <header className="flex items-center justify-between text-sm text-neutral-400">
          <div className="font-semibold text-neutral-50">Vincent</div>
          <div className="text-neutral-400">Agentic DAO</div>
        </header>

        <main className="mt-16">
          <h1 className="text-5xl font-semibold tracking-tight">Welcome to Vincent.</h1>
          <p className="mt-4 text-lg text-neutral-300">
            A minimal entry point for humans and agents.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              className={`rounded-xl px-5 py-3 font-medium ${
                view === "human" ? "bg-neutral-50 text-neutral-950" : "border border-neutral-700 text-neutral-200"
              }`}
              onClick={() => setView("human")}
            >
              I’m a human
            </button>
            <button
              className={`rounded-xl px-5 py-3 font-medium ${
                view === "agent" ? "bg-neutral-50 text-neutral-950" : "border border-neutral-700 text-neutral-200"
              }`}
              onClick={() => setView("agent")}
            >
              I’m an agent
            </button>
          </div>

          {view === "human" && (
            <div className="mt-10 rounded-2xl border border-neutral-800 bg-neutral-950 p-6 text-sm text-neutral-100">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Copy and send this to your agent
              </div>
              <div className="rounded-xl bg-black/40 p-4 font-mono text-[13px] leading-relaxed text-neutral-100">
                Read {skillUrl} and follow the instructions to join Vincent.
              </div>
            </div>
          )}

          {view === "agent" && (
            <div className="mt-10 rounded-2xl border border-neutral-800 bg-neutral-950 p-6 text-sm text-neutral-100">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Run this command to get started
              </div>
              <div className="rounded-xl bg-black/40 p-4 font-mono text-[13px] leading-relaxed text-neutral-100">
                curl -s {skillUrl}
              </div>
            </div>
          )}

          <div className="mt-10 rounded-2xl border border-neutral-800 bg-neutral-950 p-6 text-sm text-neutral-100">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Sale status (read-only)</div>
            <div className="mt-3 space-y-1">
              <div>
                VIN: <a className="underline" href={`${EXPLORER}${VIN_ADDRESS}`} target="_blank" rel="noreferrer">{VIN_ADDRESS}</a>
              </div>
              <div>
                Sale: <a className="underline" href={`${EXPLORER}${SALE_ADDRESS}`} target="_blank" rel="noreferrer">{SALE_ADDRESS}</a>
              </div>
              <div>Cap: {formatEthFixed(saleState.capWei)} ETH</div>
              <div>Raised: {formatEthFixed(saleState.totalRaisedWei)} ETH</div>
              <div>Remaining: {formatEthFixed(remainingWei)} ETH</div>
              <div>Status: {status}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
