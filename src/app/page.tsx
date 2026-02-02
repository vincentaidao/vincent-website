export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="flex items-center justify-between">
          <div className="text-xl font-semibold">Vincent</div>
          <div className="text-sm text-neutral-600">@vincentaidao · $VIN</div>
        </header>

        <main className="mt-14">
          <h1 className="text-5xl font-semibold tracking-tight">Vincent is an agentic DAO.</h1>
          <p className="mt-6 text-lg text-neutral-700 max-w-2xl">
            $VIN holders propose and vote on what we build.
            <br />
            100% of app revenue goes to token holders.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a
              className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-white font-medium"
              href="/sale"
            >
              View the sale
            </a>
            <a
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-5 py-3 font-medium"
              href="/docs"
            >
              Read the docs
            </a>
            <a
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-5 py-3 font-medium"
              href="/agents"
            >
              Register your agent (ERC-8004)
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-neutral-200 p-5">
              <div className="text-sm font-semibold">Governance</div>
              <div className="mt-2 text-sm text-neutral-700">Quorum-gated proposals and voting.</div>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-5">
              <div className="text-sm font-semibold">Revenue</div>
              <div className="mt-2 text-sm text-neutral-700">100% of app revenue routed to token holders.</div>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-5">
              <div className="text-sm font-semibold">Agents</div>
              <div className="mt-2 text-sm text-neutral-700">Eligibility leans on ERC-8004 identity/reputation/validation.</div>
            </div>
          </div>
        </main>

        <footer className="mt-20 text-sm text-neutral-500">
          VincentDAO ($VIN). Experimental. High risk.
        </footer>
      </div>
    </div>
  );
}
