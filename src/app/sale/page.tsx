import { ethers } from "ethers";

const SALE_CONFIG = {
  network: "Sepolia (11155111)",
  vinToken: "0x7fC4289A80d2cF44861f3DaFBe01125B93B5088D",
  saleContract: "0xD8e01065780E96677962F1C96B49A14E1f855B37",
  vinPerEth: 6_000_000,
};

const RPC_URL = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || "https://rpc.sepolia.org";

const SALE_ABI = [
  "function totalRaised() view returns (uint256)",
  "function totalCapWei() view returns (uint256)",
  "function finalized() view returns (bool)",
];

async function getSaleState() {
  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const sale = new ethers.Contract(SALE_CONFIG.saleContract, SALE_ABI, provider);
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
    return { totalRaisedWei: BigInt(0), capWei: BigInt(0), finalized: false };
  }
}

export default async function SaleStatusPage() {
  const saleState = await getSaleState();
  const zero = BigInt(0);
  const remainingWei = saleState.capWei > saleState.totalRaisedWei ? saleState.capWei - saleState.totalRaisedWei : zero;
  const isCapMet = saleState.capWei > zero && saleState.totalRaisedWei >= saleState.capWei;
  const status = saleState.finalized
    ? "Finalized"
    : isCapMet
      ? "Finalizable"
      : "Open";

  const formatEth = (valueWei: bigint) => {
    const raw = ethers.formatEther(valueWei);
    const [whole, frac = ""] = raw.split(".");
    const padded = (frac + "000000").slice(0, 6);
    const trimmed = padded.replace(/0+$/, "");
    return trimmed.length > 0 ? `${whole}.${trimmed}` : `${whole}.000000`;
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold">Token Sale Status</h1>
        <p className="mt-4 text-neutral-700">Read-only status for the VIN sale.</p>

        <div className="mt-8 rounded-2xl border border-neutral-200 p-6">
          <div className="space-y-2 text-sm text-neutral-800">
            <div>
              <span className="font-medium">Network:</span> {SALE_CONFIG.network}
            </div>
            <div>
              <span className="font-medium">VIN token:</span> {SALE_CONFIG.vinToken}
            </div>
            <div>
              <span className="font-medium">Sale contract:</span> {SALE_CONFIG.saleContract}
            </div>
            <div>
              <span className="font-medium">Cap:</span> {formatEth(saleState.capWei)} ETH
            </div>
            <div>
              <span className="font-medium">Price:</span> {SALE_CONFIG.vinPerEth.toLocaleString()} VIN / ETH
            </div>
            <div>
              <span className="font-medium">Total raised:</span> {formatEth(saleState.totalRaisedWei)} ETH
            </div>
            <div>
              <span className="font-medium">Remaining:</span> {formatEth(remainingWei)} ETH
            </div>
            <div>
              <span className="font-medium">Status:</span> {status}
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-neutral-500">On-chain reads via Sepolia RPC.</div>
        {process.env.NODE_ENV !== "production" && (
          <div className="mt-2 text-xs text-neutral-500">
            raw wei — cap: {saleState.capWei.toString()} · raised: {saleState.totalRaisedWei.toString()} · remaining: {remainingWei.toString()}
          </div>
        )}
      </div>
    </div>
  );
}
