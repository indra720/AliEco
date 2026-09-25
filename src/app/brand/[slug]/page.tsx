"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Star, ChevronRight, ShieldCheck } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ProductCard } from "@/components/common/ProductCard";
import { BRANDS } from "@/data/brands";
import { PRODUCTS } from "@/data/products";

export default function BrandDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const brand = BRANDS.find((b) => b.slug === slug) || BRANDS[0];
  const brandProducts = PRODUCTS.filter((p) => p.brandSlug === brand.slug || p.brand === brand.name);

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
            <Link href="/brands" className="hover:text-oranza transition-colors">
              Brands
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-ink-tertiary" />
            <span className="font-semibold text-ink">{brand.name}</span>
          </nav>

          {/* Brand Header Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-neutral-900 text-white mb-8 border border-neutral-800 shadow-sm">
            <div className="relative h-44 sm:h-56 w-full">
              <Image src={brand.banner} alt="" fill priority sizes="1200px" className="object-cover opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-transparent" />
            </div>

            <div className="relative px-6 pb-6 pt-0 -mt-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex items-end gap-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-white flex-shrink-0">
                  <Image src={brand.logo} alt={brand.name} fill sizes="96px" className="object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-3xl font-black text-white">{brand.name}</h1>
                    <span className="bg-oranza text-white text-[10px] font-black uppercase px-2 py-0.5 rounded flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Official Store
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-bold mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{brand.rating.toFixed(1)} Rating</span>
                    <span className="text-neutral-400 font-normal">
                      • {brandProducts.length} Products Available
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-black text-ink mb-6">
            All Products by {brand.name}
          </h2>

          {brandProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {brandProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <p className="text-xs text-ink-secondary">No products found for this brand store.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
