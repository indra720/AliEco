"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ChevronRight } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ProductCard } from "@/components/common/ProductCard";
import { PRODUCTS } from "@/data/products";

export default function NewArrivalsPage() {
  const newArrivals = PRODUCTS.filter(
    (p) => p.isNewArrival || p.createdAt.startsWith("2024-03") || p.createdAt.startsWith("2024-02")
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 bg-surface-secondary/40 py-6 sm:py-8">
        <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-ink-secondary mb-6">
            <Link href="/" className="hover:text-oranza transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-ink-tertiary" />
            <span className="font-semibold text-ink">New Arrivals</span>
          </nav>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-border mb-8 shadow-sm">
            <span className="text-oranza font-black text-xs uppercase tracking-wider block mb-1">
              Fresh Off The Line
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-ink mb-2">
              New Arrivals & Upgrades
            </h1>
            <p className="text-xs sm:text-sm text-ink-secondary">
              Discover the latest tech launches, seasonal apparel drops, and living accessories added this month.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
