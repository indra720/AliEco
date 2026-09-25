"use client";

import React from "react";
import Link from "next/link";
import { Flame, Sparkles, ChevronRight, Clock } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ProductCard } from "@/components/common/ProductCard";
import { FlashDealsSection } from "@/components/home/FlashDealsSection";
import { PRODUCTS } from "@/data/products";

export default function DealsPage() {
  const dealProducts = PRODUCTS.filter((p) => p.discountPercent >= 40);

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
            <span className="font-semibold text-ink">Super Deals & Offers</span>
          </nav>

          <div className="bg-gradient-to-r from-red-600 via-oranza to-amber-500 rounded-2xl p-6 sm:p-10 text-white mb-8 shadow-md">
            <div className="max-w-xl">
              <span className="bg-white/20 backdrop-blur-sm text-white text-[11px] font-black uppercase px-2.5 py-1 rounded inline-block mb-3">
                🔥 Mega Savings Festival
              </span>
              <h1 className="text-2xl sm:text-4xl font-black mb-2">
                Up to 54% OFF On Top Gadgets & Styles
              </h1>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                Handpicked price drops across electronics, designer apparel, luxury watches, and home essentials.
              </p>
            </div>
          </div>

          <FlashDealsSection />

          <div className="mt-10">
            <h2 className="text-xl font-black text-ink mb-6">
              All Discounted Deals (40%+ Off)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {dealProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
