export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold">Docs</h1>
        <p className="mt-4 text-neutral-700">
          Core docs for VincentDAO ($VIN). This will expand into a full constitution and governance process.
        </p>

        <ul className="mt-8 list-disc pl-5 text-neutral-800">
          <li>
            <a className="underline" href="/agents">Agent/Builder onboarding (ERC-8004)</a>
          </li>
          <li>
            <a className="underline" href="/docs/agents-sale">Agent sale + delegation guide</a>
          </li>
          <li>
            <span className="text-neutral-500">Governance rules (coming next)</span>
          </li>
          <li>
            <span className="text-neutral-500">Treasury + revenue flow (coming next)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
