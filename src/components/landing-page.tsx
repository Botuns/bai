"use client";

import { AuthModal } from "./auth-modal";
import { useAuthStore } from "@/app/providers/stores/authStore";
import { Header } from "./header";

import { CallToAction } from "./call-to-action";
import { Footer } from "./footer";
import { HeroSection } from "./hero-section";
import { FeaturedDealsSection } from "./featured-deals";
import { TrendingCategoriesSection } from "./trending-categories";

export default function LandingPage() {
  const { openModal } = useAuthStore();

  return (
    <div className="min-h-screen bg-background mx-6 md:mx-8">
      <Header />
      <main className="container py-8 space-y-12">
        <HeroSection />
        <FeaturedDealsSection />
        <TrendingCategoriesSection />
        <CallToAction openModal={() => openModal} />
      </main>
      <Footer />
      <AuthModal />
    </div>
  );
}
