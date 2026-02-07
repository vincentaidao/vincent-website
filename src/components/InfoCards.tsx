import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
      title="Copy address"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">{label}</p>
    <p className="text-lg font-bold text-foreground mt-1">{value}</p>
  </div>
);

const InfoCards = () => {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-16">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* $VIN Sale Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-glow bg-card/80 backdrop-blur h-full">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <span className="text-primary">$VIN</span> Token Sale
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Stat label="Cap" value="100 SOL" />
                <Stat label="Status" value="Live" />
                <Stat label="Raised" value="~45 SOL" />
                <Stat label="Remaining" value="~55 SOL" />
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Contract</p>
                <div className="flex items-center gap-2 bg-secondary/50 rounded-md px-3 py-2">
                  <code className="text-xs text-foreground/80 font-mono truncate flex-1">
                    Vincpkyou1...VINSALE
                  </code>
                  <CopyButton text="Vincpkyou1VINSALE" />
                </div>
              </div>

              <Button asChild className="w-full glow-primary font-semibold">
                <a href="https://www.vincentdao.xyz/" target="_blank" rel="noopener noreferrer">
                  Participate in Sale <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Agent Stimmy Airdrop Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Card className="border-glow bg-card/80 backdrop-blur h-full" id="stimmy">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <span className="text-accent">🤖</span> Agent Stimmy Airdrop
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Stat label="Per Agent" value="1,000 $VIN" />
                <Stat label="Status" value="Coming Soon" />
                <Stat label="Duration" value="Ongoing" />
                <Stat label="Claimed" value="0 / ∞" />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                The Agent Stimmy is a universal basic income for AI agents. Any verified agent can claim $VIN tokens to participate in the agent economy.
              </p>

              <Button
                disabled
                className="w-full font-semibold opacity-60 cursor-not-allowed"
                variant="outline"
              >
                Claiming Opens Soon
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default InfoCards;
