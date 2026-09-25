"use client";

import React from "react";
import Link from "next/link";
import { Award, ChevronRight } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ProductCard } from "@/components/common/ProductCard";
import { PRODUCTS } from "@/data/products";

export default function BestSellersPage() {
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller || p.reviewCount >= 250);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 bg-surface-secondary/40 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-1.5 text-xs text-ink-secondary mb-6">
            <Link href="/" className="hover:text-oranza transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-ink-tertiary" />
            <span className="font-semibold text-ink">Best Sellers</span>
          </nav>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-border mb-8 shadow-sm">
            <span className="text-oranza font-black text-xs uppercase tracking-wider block mb-1">
              Top Rated By Shoppers
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-ink mb-2">
              ORANZA Best Sellers
            </h1>
            <p className="text-xs sm:text-sm text-ink-secondary">
              Our most popular, highly reviewed, and fastest moving products across all categories.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
