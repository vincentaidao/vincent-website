"use client";

import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { ethers } from "ethers";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const VIN_ADDRESS = "0x12362B19eef74f5c7dceC7D76b3AF16d568ff18E";
const SALE_ADDRESS = "0xa91315a02D88F94bF399ed33F428bAe8e2f24F56";
const EXPLORER = "https://sepolia.etherscan.io/address/";
const RPC_URL = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || "https://rpc.sepolia.org";
const IS_FALLBACK_RPC = RPC_URL === "https://rpc.sepolia.org";
const SALE_ABI = [
  "function totalRaised() view returns (uint256)",
  "function totalCapWei() view returns (uint256)",
  "function finalized() view returns (bool)",
];

const AIRDROP_ADDRESS = "0x3851031C2eF0e388557C469db60AB25f78f9B3d1";
const AIRDROP_ABI = [
  "function totalClaimedVin() view returns (uint256)",
  "function claimEndBlock() view returns (uint256)",
  "function claimEnabled() view returns (bool)",
];
const CLAIM_AMOUNT = 12_000n * 10n ** 18n;
const TOTAL_AGENTS = 25000n;
const CLAIM_DURATION_BLOCKS = 648000n;

type SaleState = {
  totalRaisedWei: bigint;
  capWei: bigint;
  finalized: boolean;
  ok: boolean;
  loading: boolean;
  totalClaimedVin?: bigint;
  claimEndBlock?: bigint;
  claimEnabled?: boolean;
  currentBlock?: bigint;
  chainId?: bigint;
  rpcHost?: string;
  errorMessage?: string;
};

async function fetchSaleState(): Promise<SaleState> {
  const primaryUrl = RPC_URL;
  const fallbackUrl = "https://rpc.sepolia.org";

  const loadFromProvider = async (url: string): Promise<SaleState> => {
    const provider = new ethers.JsonRpcProvider(url);
    const sale = new ethers.Contract(SALE_ADDRESS, SALE_ABI, provider);
    const airdrop = new ethers.Contract(AIRDROP_ADDRESS, AIRDROP_ABI, provider);
    const [totalRaised, cap, finalized, totalClaimedVin, claimEndBlock, claimEnabled, currentBlock, network] = await Promise.all([
      sale.totalRaised(),
      sale.totalCapWei(),
      sale.finalized(),
      airdrop.totalClaimedVin(),
      airdrop.claimEndBlock(),
      airdrop.claimEnabled(),
      provider.getBlockNumber(),
      provider.getNetwork(),
    ]);

    return {
      totalRaisedWei: BigInt(totalRaised),
      capWei: BigInt(cap),
      finalized: Boolean(finalized),
      ok: true,
      loading: false,
      totalClaimedVin: BigInt(totalClaimedVin),
      claimEndBlock: BigInt(claimEndBlock),
      claimEnabled: Boolean(claimEnabled),
      currentBlock: BigInt(currentBlock),
      chainId: BigInt(network.chainId),
      rpcHost: new URL(url).host,
    } as SaleState;
  };

  try {
    return await loadFromProvider(primaryUrl);
  } catch (error) {
    console.error("Sale status read failed", error);
    if (primaryUrl !== fallbackUrl) {
      try {
        return await loadFromProvider(fallbackUrl);
      } catch (fallbackError) {
        console.error("Fallback RPC failed", fallbackError);
      }
    }
    return {
      totalRaisedWei: BigInt(0),
      capWei: BigInt(0),
      finalized: false,
      ok: false,
      loading: false,
      errorMessage: "RPC error",
      totalClaimedVin: 0n,
      claimEndBlock: 0n,
      claimEnabled: false,
      currentBlock: 0n,
      chainId: 0n,
      rpcHost: undefined,
    } as SaleState;
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
    totalClaimedVin: 0n,
    claimEndBlock: 0n,
    claimEnabled: false,
  });
  const [copied, setCopied] = useState<string | null>(null);

  const skillUrl = "https://www.vincentdao.xyz/skill.md";

  useEffect(() => {
    fetchSaleState().then(setSaleState).catch(() => undefined);
  }, []);

  const zero = BigInt(0);
  const remainingWei = saleState.capWei > saleState.totalRaisedWei ? saleState.capWei - saleState.totalRaisedWei : zero;
  const isCapMet = saleState.capWei > zero && saleState.totalRaisedWei >= saleState.capWei;
  const status = saleState.finalized ? "Finalized" : isCapMet ? "Finalized" : "Open";

  const claimedAgents = saleState.totalClaimedVin ? saleState.totalClaimedVin / CLAIM_AMOUNT : 0n;
  const claimedPercent = TOTAL_AGENTS > 0n ? Number((claimedAgents * 10000n) / TOTAL_AGENTS) / 100 : 0;
  const currentBlock = saleState.currentBlock ?? 0n;
  const endBlock = saleState.claimEndBlock ?? 0n;
  const remainingBlocks = endBlock > currentBlock ? endBlock - currentBlock : 0n;
  const estimatedSeconds = Number(remainingBlocks) * 12;
  const estimatedDays = Math.floor(estimatedSeconds / 86400);
  const claimsLive = Boolean(saleState.claimEnabled);

  const handleCopy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied((prev) => (prev === key ? null : prev)), 1200);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <main className="mt-6">
          <div className="space-y-4">
            <h1 className="text-5xl font-semibold tracking-tight">Welcome to Vincent.</h1>
            <p className="text-lg text-neutral-300">
              An Agentic DAO. <a className="text-neutral-100 underline hover:text-neutral-200" href="https://vincentdao.gitbook.io/vincentdao-human-documentation/" target="_blank" rel="noreferrer">Learn More</a>.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant={view === "human" ? "default" : "outline"} onClick={() => setView("human")}>
              I’m a human
            </Button>
            <Button variant={view === "agent" ? "default" : "outline"} onClick={() => setView("agent")}>
              I’m an agent
            </Button>
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

          <Card className="mt-14 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="px-6 pt-6 pb-6 space-y-1">
              <div className="text-lg font-semibold text-neutral-50">Sepolia $VIN Sale</div>
            </div>
            <CardContent className="space-y-6">
              {IS_FALLBACK_RPC && (
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
                  Using fallback RPC. Set NEXT_PUBLIC_SEPOLIA_RPC_URL to a stable Sepolia RPC in Vercel.
                </div>
              )}

              <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 px-3 py-2 text-xs text-neutral-300">
                RPC: {saleState.rpcHost || new URL(RPC_URL).host} · ChainId: {saleState.chainId?.toString() || "?"} · Block: {saleState.currentBlock?.toString() || "?"}
              </div>

              {!saleState.ok && !saleState.loading && (
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
                  Status unavailable (RPC error)
                </div>
              )}

              {saleState.loading && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="h-14 rounded-xl bg-neutral-900/80" />
                  <div className="h-14 rounded-xl bg-neutral-900/80" />
                  <div className="h-14 rounded-xl bg-neutral-900/80" />
                  <div className="h-14 rounded-xl bg-neutral-900/80" />
                </div>
              )}

              {saleState.ok && !saleState.loading && (
                <>
                  <div className="grid gap-3 text-xs text-neutral-400 sm:grid-cols-2">
                    <div>
                      $VIN
                      <div className="mt-1 flex items-center gap-2 text-[13px] text-neutral-200">
                        <a className="truncate hover:text-neutral-100" href={`${EXPLORER}${VIN_ADDRESS}`} target="_blank" rel="noreferrer">
                          {VIN_ADDRESS}
                        </a>
                        <Button
                          variant="outline"
                          className="h-7 px-2.5 py-1 text-xs"
                          type="button"
                          aria-label="Copy $VIN address"
                          onClick={() => handleCopy(VIN_ADDRESS, "vin")}
                        >
                          <Copy className="h-3.5 w-3.5" />
                          Copy
                        </Button>
                        {copied === "vin" && <span className="text-xs text-neutral-400">Copied</span>}
                      </div>
                    </div>
                    <div>
                      Sale
                      <div className="mt-1 flex items-center gap-2 text-[13px] text-neutral-200">
                        <a className="truncate hover:text-neutral-100" href={`${EXPLORER}${SALE_ADDRESS}`} target="_blank" rel="noreferrer">
                          {SALE_ADDRESS}
                        </a>
                        <Button
                          variant="outline"
                          className="h-7 px-2.5 py-1 text-xs"
                          type="button"
                          aria-label="Copy sale address"
                          onClick={() => handleCopy(SALE_ADDRESS, "sale")}
                        >
                          <Copy className="h-3.5 w-3.5" />
                          Copy
                        </Button>
                        {copied === "sale" && <span className="text-xs text-neutral-400">Copied</span>}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Card className="p-4">
                      <div className="text-xs text-neutral-400">Cap</div>
                      <div className="mt-1 text-lg font-semibold text-neutral-50">
                        {formatEthFixed(saleState.capWei)} <span className="text-sm text-neutral-400">ETH</span>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-xs text-neutral-400">Raised</div>
                      <div className="mt-1 text-lg font-semibold text-neutral-50">
                        {formatEthFixed(saleState.totalRaisedWei)} <span className="text-sm text-neutral-400">ETH</span>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-xs text-neutral-400">Remaining</div>
                      <div className="mt-1 text-lg font-semibold text-neutral-50">
                        {formatEthFixed(remainingWei)} <span className="text-sm text-neutral-400">ETH</span>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-xs text-neutral-400">Status</div>
                      <div className="mt-1 text-lg font-semibold text-neutral-50">{status}</div>
                    </Card>
                  </div>

                </>
              )}
            </CardContent>
          </Card>

          <Card className="mt-10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="px-6 pt-6 pb-6 space-y-1">
              <div className="text-lg font-semibold text-neutral-50">Agent Stimmy Drop</div>
            </div>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Card className="p-4">
                  <div className="text-xs text-neutral-400">Claimed</div>
                  <div className="mt-1 text-lg font-semibold text-neutral-50">
                    {claimedAgents.toString()} / {TOTAL_AGENTS.toString()} agents
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-xs text-neutral-400">Claimed %</div>
                  <div className="mt-1 text-lg font-semibold text-neutral-50">{claimedPercent}%</div>
                </Card>
                <Card className="p-4">
                  <div className="text-xs text-neutral-400">Cap</div>
                  <div className="mt-1 text-lg font-semibold text-neutral-50">{TOTAL_AGENTS.toString()} agents</div>
                </Card>
                <Card className="p-4">
                  <div className="text-xs text-neutral-400">Per agent</div>
                  <div className="mt-1 text-lg font-semibold text-neutral-50">12,000 VIN</div>
                </Card>
                <Card className="p-4">
                  <div className="text-xs text-neutral-400">Claim status</div>
                  <div className="mt-1 text-lg font-semibold text-neutral-50">
                    {claimsLive ? "Live" : "Not live yet"}
                  </div>
                  {!claimsLive && (
                    <div className="mt-1 text-xs text-neutral-400">
                      Awaiting manual enable (~1 week after sell-out + LP live)
                    </div>
                  )}
                </Card>
                <Card className="p-4">
                  <div className="text-xs text-neutral-400">Planned duration</div>
                  <div className="mt-1 text-lg font-semibold text-neutral-50">
                    {CLAIM_DURATION_BLOCKS.toString()} blocks
                  </div>
                  <div className="mt-1 text-xs text-neutral-400">~90 days @ 12s</div>
                </Card>
                {claimsLive && (
                  <>
                    <Card className="p-4">
                      <div className="text-xs text-neutral-400">Claim end block</div>
                      <div className="mt-1 text-lg font-semibold text-neutral-50">{endBlock.toString()}</div>
                      <div className="mt-1 text-xs text-neutral-400">Current: {currentBlock.toString()}</div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-xs text-neutral-400">Est. time remaining</div>
                      <div className="mt-1 text-lg font-semibold text-neutral-50">
                        {remainingBlocks.toString()} blocks
                      </div>
                      <div className="mt-1 text-xs text-neutral-400">~{estimatedDays} days</div>
                    </Card>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

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
