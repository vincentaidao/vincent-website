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
      totalRaisedEth: Number(ethers.formatEther(totalRaised)),
      capEth: Number(ethers.formatEther(cap)),
      finalized: Boolean(finalized),
    };
  } catch (error) {
    console.error("Sale status read failed", error);
    return { totalRaisedEth: 0, capEth: 0, finalized: false };
  }
}

export default async function SaleStatusPage() {
  const saleState = await getSaleState();
  const remaining = Math.max(saleState.capEth - saleState.totalRaisedEth, 0);
  const isCapMet = saleState.capEth > 0 && saleState.totalRaisedEth >= saleState.capEth;
  const status = saleState.finalized
    ? "Finalized"
    : isCapMet
      ? "Finalizable"
      : "Open";

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
              <span className="font-medium">Cap:</span> {saleState.capEth} ETH
            </div>
            <div>
              <span className="font-medium">Price:</span> {SALE_CONFIG.vinPerEth.toLocaleString()} VIN / ETH
            </div>
            <div>
              <span className="font-medium">Total raised:</span> {saleState.totalRaisedEth} ETH
            </div>
            <div>
              <span className="font-medium">Remaining:</span> {remaining} ETH
            </div>
            <div>
              <span className="font-medium">Status:</span> {status}
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-neutral-500">On-chain reads via Sepolia RPC.</div>
      </div>
    </div>
  );
}
