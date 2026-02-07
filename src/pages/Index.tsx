import HeroSection from "@/components/HeroSection";
import RoleToggle from "@/components/RoleToggle";
import InfoCards from "@/components/InfoCards";
import Tokenomics from "@/components/Tokenomics";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <RoleToggle />
      <InfoCards />
      <Tokenomics />

      <footer className="px-6 md:px-16 lg:px-24 py-10 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 VincentDAO. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="https://x.com/VincentAIDAO"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Twitter/X
            </a>
            <a
              href="https://vincentdao.gitbook.io/vincentdao-documentation/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Docs
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
