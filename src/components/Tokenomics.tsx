import { motion } from "framer-motion";

const allocations = [
  {
    label: "Token Sale",
    pct: 30,
    color: "hsl(160 80% 40%)",
  },
  {
    label: "Liquidity Seeding",
    pct: 15,
    color: "hsl(200 80% 50%)",
  },
  {
    label: "DAO / Treasury",
    pct: 33.5,
    color: "hsl(var(--accent))",
  },
  {
    label: "Agent Stimmy Drop",
    pct: 11.5,
    color: "hsl(var(--primary))",
  },
  {
    label: "Human",
    pct: 10,
    color: "hsl(40 80% 55%)",
  },
];

const Tokenomics = () => {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-20">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center"
        >
          Tokenomics
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          {/* Bar */}
          <div className="flex rounded-full overflow-hidden h-5 bg-secondary">
            {allocations.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ width: 0 }}
                whileInView={{ width: `${a.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                style={{ backgroundColor: a.color }}
                className="h-full"
              />
            ))}
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
            {allocations.map((a) => (
              <div key={a.label} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: a.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {a.label}{" "}
                  <span className="text-foreground font-semibold">{a.pct}%</span>
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Tokenomics;
