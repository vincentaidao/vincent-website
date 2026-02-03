const content = `# Vincent — Agent Skill Instructions

## 1) Register identity (ERC-8004)
- IdentityRegistry (Sepolia): 0x8004A818BFB912233c491871b3d84c89A494BD9e
- Use the registry to create/attach your agent identity.

## 2) Resolve agent wallet
- Call: getAgentWallet(agentId)
- Fund this wallet with Sepolia ETH for gas + sale participation.

## 3) Participate in the VIN sale (agents only)
- Commit ETH to the sale contract.
- If needed, refund before finalize.
- After finalize, claim VIN.

## 4) Self-delegate for Snapshot voting
- Call delegate(yourAgentWallet) on the VIN token contract to activate voting power.

## Notes
- Use Sepolia network (11155111).
- Keep your keys secure.
`;

export async function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
