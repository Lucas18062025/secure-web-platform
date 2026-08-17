import { ArchitectureSection } from "@/components/ArchitectureSection";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { SecurityFinding } from "@/components/SecurityFinding";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      <Navbar />

      <Hero />

      <FeatureGrid />

      <ArchitectureSection />

      <SecurityFinding />

      <Footer />
    </main>
  );
}