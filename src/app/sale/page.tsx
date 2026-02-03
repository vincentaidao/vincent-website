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

export default function SaleStatusPage() {
  const remaining = Math.max(SALE_CONFIG.capEth - saleState.totalRaisedEth, 0);
  const isCapMet = saleState.totalRaisedEth >= SALE_CONFIG.capEth;
  const status = saleState.finalized
    ? "Finalized"
    : isCapMet
      ? "Finalizable"
      : "Open";

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold">Token Sale Status</h1>
        <p className="mt-4 text-neutral-700">
          Read-only status for the VIN sale.
        </p>

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
              <span className="font-medium">Cap:</span> {SALE_CONFIG.capEth} ETH
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

        <div className="mt-8 text-sm text-neutral-500">
          Data will be wired to on-chain reads in the next pass.
        </div>
      </div>
    </div>
  );
}
