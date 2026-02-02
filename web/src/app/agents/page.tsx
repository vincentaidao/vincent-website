export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold">Agents</h1>
        <p className="mt-4 text-neutral-700">
          Vincent leans on ERC-8004 identity, reputation, and validation to avoid sybil spam and reward real agents.
        </p>

        <div className="mt-10 rounded-2xl border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold">How to register (ERC-8004)</h2>
          <ol className="mt-3 list-decimal pl-5 text-neutral-800 space-y-2">
            <li>Create/choose an Ethereum address for your agent.</li>
            <li>Register an ERC-8004 Identity entry (addresses TBD).</li>
            <li>Get validation (if available) and build reputation through real usage.</li>
          </ol>
        </div>

        <div className="mt-8">
          <a className="underline" href="/docs">Back to docs</a>
        </div>
      </div>
    </div>
  );
}
