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
  const trendingProducts = PRODUCTS.filter((p) => p.isTrending || p.rating >= 4.7);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller || p.reviewCount >= 200);
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival || p.createdAt.startsWith("2024-03") || p.createdAt.startsWith("2024-02"));

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* 1. Hero Promotional Showcase (Matching Screenshot 1) */}
        <HeroBanner />

        {/* 2. Shop by Category Circular Strip (Matching Screenshot 2) */}
        <CategoryStrip />

        {/* 3. Popular Products with Category Tabs (Matching Screenshot 3) */}
        <ProductCarouselSection
          title="Popular Products"
          subtitle="Discover customer favorites and top-rated items with instant dispatch"
          products={PRODUCTS}
          viewAllLink="/products"
          tabs={[
            { label: "ALL", filterFn: () => true },
            { label: "FASHION", filterFn: (p) => p.categorySlug === "fashion" },
            { label: "BAGS", filterFn: (p) => p.categorySlug === "accessories" || (p.subcategory?.toLowerCase().includes("bag") ?? false) || p.tags.includes("bags") },
            { label: "FOOTWEAR", filterFn: (p) => (p.subcategory?.toLowerCase().includes("footwear") ?? false) || p.tags.includes("shoes") || p.tags.includes("footwear") || p.title.toLowerCase().includes("sneaker") },
            { label: "GROCERIES", filterFn: (p) => p.categorySlug === "grocery" },
            { label: "WELLNESS", filterFn: (p) => p.categorySlug === "sports-fitness" || p.categorySlug === "beauty" },
            { label: "JEWELLERY", filterFn: (p) => p.categorySlug === "jewellery" },
            { label: "BEAUTY", filterFn: (p) => p.categorySlug === "beauty" },
            { label: "ELECTRONICS", filterFn: (p) => p.categorySlug === "electronics" },
          ]}
        />

        {/* 4. Flash Deals with Live Countdown */}
        <FlashDealsSection />

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
