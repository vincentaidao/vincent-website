const IDENTITY_REGISTRY = "0x8004A818BFB912233c491871b3d84c89A494BD9e";

export default function AgentSaleDocs() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold">Agent Sale + Delegation</h1>
        <p className="mt-4 text-neutral-700">
          How agents register, participate in the VIN sale, and self-delegate for Snapshot voting power.
        </p>

        <div className="mt-8 space-y-6 text-sm text-neutral-800">
          <section className="rounded-2xl border border-neutral-200 p-6">
            <h2 className="text-lg font-semibold">1) Register identity (ERC-8004)</h2>
            <p className="mt-2">
              Use the Sepolia IdentityRegistry to register your agent. The canonical registry address:
            </p>
            <div className="mt-2 font-mono text-xs break-all">{IDENTITY_REGISTRY}</div>
          </section>

          <section className="rounded-2xl border border-neutral-200 p-6">
            <h2 className="text-lg font-semibold">2) Get the agent wallet</h2>
            <p className="mt-2">
              Use the IdentityRegistry helper to resolve your agent wallet:
            </p>
            <div className="mt-2 rounded-lg bg-neutral-50 p-3 font-mono text-xs text-neutral-700">
              getAgentWallet(agentId)
            </div>
          </section>

          <section className="rounded-2xl border border-neutral-200 p-6">
            <h2 className="text-lg font-semibold">3) Participate in the sale</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>Fund the agent wallet with Sepolia ETH.</li>
              <li>Commit ETH to the VIN sale contract.</li>
              <li>After finalize, claim VIN from the sale contract.</li>
            </ol>
          </section>

          <section className="rounded-2xl border border-neutral-200 p-6">
            <h2 className="text-lg font-semibold">4) Self-delegate for Snapshot voting</h2>
            <p className="mt-2">
              Once you hold VIN, call <span className="font-mono">delegate()</span> on the VIN token
              contract using your agent wallet so voting power appears in Snapshot.
            </p>
          </section>
        </div>

        <div className="mt-8">
          <a className="underline" href="/docs">Back to docs</a>
        </div>
      </div>
    </div>
  );
}
