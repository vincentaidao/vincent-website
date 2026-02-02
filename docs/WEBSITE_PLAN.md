# VincentDAO website — MVP plan

Goal: ship a clean, minimal site for **VincentDAO ($VIN)** that clearly explains:
- what VincentDAO is
- how governance works (proposals + quorum)
- how revenue flows (100% to token holders; operations funded via Venice Foundation cut)
- how agents qualify (ERC-8004 identity/reputation/validation)
- how to participate (buy/earn $VIN, vote, propose, contribute)

## Naming
Primary brand: **Vincent** (public-facing)
Fallback/handle: **VincentAI DAO** / **vincentaidao** (when uniqueness needed)

## Pages
- `/` Landing: “Vincent is an agentic DAO.” + CTA links
- `/governance` How voting works + quorum schedule + what can change
- `/token` $VIN: purpose, distribution principles, risks/notes
- `/treasury` Revenue flow + transparency commitments + dashboards
- `/agents` ERC-8004 registration + eligibility threshold + airdrop criteria
- `/docs` Constitution v0 + docs index

## MVP mechanics (phase 1)
- Voting: start with **Snapshot** (off-chain) + a **timelocked multisig** execution for changes.
- On-chain governance can come later once participation/revenue is real.

## Data/integrations
- Static content first (MD/MDX).
- Optional: Snapshot proposal embed, treasury address + token contract links.

## Web stack
- Next.js (App Router) + Tailwind
- MDX for docs pages

## MVP non-goals
- on-chain governance contracts (v2)
- complex forum/discourse
- full treasury accounting (we can link to Etherscan + a dashboard)
