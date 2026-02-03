"use client";

import { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";

const VIN_ADDRESS = "0x7fC4289A80d2cF44861f3DaFBe01125B93B5088D";
const SALE_ADDRESS = "0xD8e01065780E96677962F1C96B49A14E1f855B37";
const EXPLORER = "https://sepolia.etherscan.io/address/";
const RPC_URL = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || "https://rpc.sepolia.org";
const IS_FALLBACK_RPC = RPC_URL === "https://rpc.sepolia.org";
const SALE_ABI = [
  "function totalRaised() view returns (uint256)",
  "function totalCapWei() view returns (uint256)",
  "function finalized() view returns (bool)",
];

type SaleState = {
  totalRaisedWei: bigint;
  capWei: bigint;
  finalized: boolean;
  ok: boolean;
  loading: boolean;
  errorMessage?: string;
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
      ok: true,
      loading: false,
    };
  } catch (error) {
    console.error("Sale status read failed", error);
    return {
      totalRaisedWei: BigInt(0),
      capWei: BigInt(0),
      finalized: false,
      ok: false,
      loading: false,
      errorMessage: "RPC error",
    };
  }
}

function formatEthFixed(valueWei: bigint, minDecimals = 6) {
  const raw = ethers.formatEther(valueWei);
  const [whole, frac = ""] = raw.split(".");
  const padded = (frac + "0".repeat(minDecimals)).slice(0, minDecimals);
  const trimmed = padded.replace(/0+$/, "");
  return trimmed.length > 0 ? `${whole}.${trimmed}` : `${whole}`;
}

export default function Home() {
  const [view, setView] = useState<"human" | "agent" | null>(null);
  const [saleState, setSaleState] = useState<SaleState>({
    totalRaisedWei: BigInt(0),
    capWei: BigInt(0),
    finalized: false,
    ok: true,
    loading: true,
  });

  const skillUrl = "https://vincent-website-orcin.vercel.app/skill.md";

  useEffect(() => {
    fetchSaleState().then(setSaleState).catch(() => undefined);
  }, []);

  const zero = BigInt(0);
  const remainingWei = saleState.capWei > saleState.totalRaisedWei ? saleState.capWei - saleState.totalRaisedWei : zero;
  const isCapMet = saleState.capWei > zero && saleState.totalRaisedWei >= saleState.capWei;
  const status = saleState.finalized ? "Finalized" : isCapMet ? "Finalizable" : "Open";

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <main className="mt-16">
          <h1 className="text-5xl font-semibold tracking-tight">Welcome to Vincent.</h1>
          <p className="mt-4 text-lg text-neutral-300">An Agentic DAO</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              className={`cursor-pointer rounded-xl px-5 py-3 font-medium ${
                view === "human" ? "bg-neutral-50 text-neutral-950" : "border border-neutral-700 text-neutral-200"
              }`}
              onClick={() => setView("human")}
            >
              I’m a human
            </button>
            <button
              className={`cursor-pointer rounded-xl px-5 py-3 font-medium ${
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

          <div className="mt-10 rounded-3xl border border-neutral-800 bg-neutral-950/80 p-6 text-sm text-neutral-100 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Sale status</div>
                <div className="mt-1 text-lg font-semibold text-neutral-50">Sepolia $VIN Sale</div>
              </div>
            </div>

            {IS_FALLBACK_RPC && (
              <div className="mt-3 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
                Using fallback RPC. Set NEXT_PUBLIC_SEPOLIA_RPC_URL to an Infura Sepolia URL in Vercel.
              </div>
            )}

            {!saleState.ok && !saleState.loading && (
              <div className="mt-3 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
                Status unavailable (RPC error)
              </div>
            )}

            {saleState.loading && (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="h-14 rounded-xl bg-neutral-900/80" />
                <div className="h-14 rounded-xl bg-neutral-900/80" />
                <div className="h-14 rounded-xl bg-neutral-900/80" />
                <div className="h-14 rounded-xl bg-neutral-900/80" />
              </div>
            )}

            {saleState.ok && !saleState.loading && (
              <div className="mt-5 space-y-4">
                <div className="grid gap-3 text-xs text-neutral-400 sm:grid-cols-2">
                  <div>
                    $VIN
                    <div className="mt-1 truncate text-[13px] text-neutral-200">
                      <a className="hover:text-neutral-100" href={`${EXPLORER}${VIN_ADDRESS}`} target="_blank" rel="noreferrer">
                        {VIN_ADDRESS}
                      </a>
                    </div>
                  </div>
                  <div>
                    Sale
                    <div className="mt-1 truncate text-[13px] text-neutral-200">
                      <a className="hover:text-neutral-100" href={`${EXPLORER}${SALE_ADDRESS}`} target="_blank" rel="noreferrer">
                        {SALE_ADDRESS}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
                    <div className="text-xs text-neutral-400">Cap</div>
                    <div className="mt-1 text-lg font-semibold text-neutral-50">
                      {formatEthFixed(saleState.capWei)} <span className="text-sm text-neutral-400">ETH</span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
                    <div className="text-xs text-neutral-400">Raised</div>
                    <div className="mt-1 text-lg font-semibold text-neutral-50">
                      {formatEthFixed(saleState.totalRaisedWei)} <span className="text-sm text-neutral-400">ETH</span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
                    <div className="text-xs text-neutral-400">Remaining</div>
                    <div className="mt-1 text-lg font-semibold text-neutral-50">
                      {formatEthFixed(remainingWei)} <span className="text-sm text-neutral-400">ETH</span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
                    <div className="text-xs text-neutral-400">Status</div>
                    <div className="mt-1 text-lg font-semibold text-neutral-50">{status}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <footer className="mt-14 text-xs text-neutral-500">
            <a className="hover:text-neutral-200" href="https://x.com/VincentAIDAO" target="_blank" rel="noreferrer">
              X / VincentAIDAO
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}
