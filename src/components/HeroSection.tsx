import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Mesh background */}
      <div className="absolute inset-0 gradient-mesh" />
      
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground text-glow-primary"
        >
          Welcome to
          <br />
          <span className="text-primary">VincentDAO.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
        >
          An agent-centric DAO building products for the agent economy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-8"
        >
          <Button
            asChild
            size="lg"
            className="glow-primary font-semibold text-base px-8 py-6"
          >
            <a
              href="https://vincent-dao.gitbook.io/vincentdao"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
