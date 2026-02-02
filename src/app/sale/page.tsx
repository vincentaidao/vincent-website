const SALE_CONFIG = {
  network: "Sepolia (11155111)",
  vinToken: "0xD0372b3d77A17A0aDB9A39A255A996639Dc9a3Ca",
  saleContract: "0xBeaC44C99eCC13736cb9b5eC3F6a073079fc1E7f",
  capEth: 0.001,
  vinPerEth: 6_000_000,
};

const saleState = {
  totalRaisedEth: 0,
  finalized: false,
};

export default function SalePage() {
  const remaining = Math.max(SALE_CONFIG.capEth - saleState.totalRaisedEth, 0);
  const isCapMet = saleState.totalRaisedEth >= SALE_CONFIG.capEth;
  const status = saleState.finalized
    ? "Finalized"
    : isCapMet
      ? "Finalizable"
      : "Open";

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-semibold">VIN Sale (Sepolia)</h1>
        <p className="mt-4 text-neutral-700">
          Fixed price sale for VIN. Delegation works with ERC20Votes once transfers are enabled.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 p-6">
            <h2 className="text-lg font-semibold">Sale Details</h2>
            <div className="mt-4 space-y-2 text-sm text-neutral-800">
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
                <span className="font-medium">Cap:</span> {SALE_CONFIG.capEth} ETH
              </div>
              <div>
                <span className="font-medium">Price:</span> {SALE_CONFIG.vinPerEth.toLocaleString()} VIN / ETH
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h2 className="text-lg font-semibold">Live Status</h2>
            <div className="mt-4 space-y-2 text-sm text-neutral-800">
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
            <div className="mt-6 flex flex-col gap-3">
              <button className="rounded-xl bg-black px-4 py-2 text-white">Commit</button>
              <button className="rounded-xl border border-neutral-300 px-4 py-2">Refund</button>
              <button className="rounded-xl border border-neutral-300 px-4 py-2">Claim</button>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold">Sepolia faucet</h2>
          <p className="mt-2 text-sm text-neutral-700">
            Need test ETH? Use a Sepolia faucet and connect your wallet to Sepolia before committing.
          </p>
          <div className="mt-3 text-sm">
            <a className="underline" href="https://sepoliafaucet.com" target="_blank" rel="noreferrer">
              sepoliafaucet.com
            </a>
          </div>
        </div>

        <div className="mt-8 text-sm text-neutral-500">
          This page shows placeholder values until wired to live on-chain reads.
        </div>
      </div>
    </div>
  );
}
