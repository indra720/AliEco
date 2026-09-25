"use client";

import React from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { HeroBanner } from "@/components/home/HeroBanner";
import { CategoryStrip } from "@/components/home/CategoryStrip";
import { FlashDealsSection } from "@/components/home/FlashDealsSection";
import { PromotionalGrid } from "@/components/home/PromotionalGrid";
import { ProductCarouselSection } from "@/components/home/ProductCarouselSection";
import { BrandShowcase } from "@/components/home/BrandShowcase";
import { TrustFeatureStrip } from "@/components/home/TrustFeatureStrip";
import { PRODUCTS } from "@/data/products";

export default function HomePage() {
  const trendingProducts = PRODUCTS.filter((p) => p.isTrending || p.rating >= 4.8);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller || p.reviewCount >= 250);
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival || p.createdAt.startsWith("2024-03") || p.createdAt.startsWith("2024-02"));

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* 1. Hero Promotional Showcase */}
        <HeroBanner />

        {/* 2. Shop by Category Strip */}
        <CategoryStrip />

        {/* 3. Flash Deals with Live Countdown */}
        <FlashDealsSection />

        {/* 4. Trending Products with Category Filter Tabs */}
        <ProductCarouselSection
          title="Trending Products"
          subtitle="Top picks that shoppers across the nation are buying right now"
          products={trendingProducts}
          viewAllLink="/products?sort=popular"
          tabs={[
            { label: "All Trending", filterFn: () => true },
            { label: "Electronics", filterFn: (p) => p.categorySlug === "electronics" },
            { label: "Fashion", filterFn: (p) => p.categorySlug === "fashion" },
            { label: "Home", filterFn: (p) => p.categorySlug === "home-living" },
          ]}
        />

        {/* 5. Commercial Promotional Banners */}
        <PromotionalGrid />

        {/* 6. Best Sellers Section */}
        <ProductCarouselSection
          title="Best Sellers"
          subtitle="Most loved and highest-rated products on ORANZA"
          products={bestSellers}
          viewAllLink="/best-sellers"
        />

        {/* 7. Featured Official Brands */}
        <BrandShowcase />

        {/* 8. New Arrivals Section */}
        <ProductCarouselSection
          title="New Arrivals & Upgrades"
          subtitle="Just launched from premier electronics, fashion, and lifestyle creators"
          products={newArrivals}
          viewAllLink="/new-arrivals"
        />

        {/* 9. Value & Trust Badges Strip */}
        <TrustFeatureStrip />
      </main>
      <Footer />
    </div>
  );
}
