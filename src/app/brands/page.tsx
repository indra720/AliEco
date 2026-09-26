"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronRight, Store, ArrowRight } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { BRANDS } from "@/data/brands";

export default function BrandsPage() {
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
            <span className="font-semibold text-ink">Official Brand Stores</span>
          </nav>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-ink">
              Official Marketplace Brands
            </h1>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Shop directly from certified manufacturer stores and official distributors
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {BRANDS.map((brand) => (
              <div
                key={brand.id}
                className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-card-hover hover:border-oranza/50 transition-all flex flex-col justify-between"
              >
                {/* Banner */}
                <div className="relative h-28 w-full bg-neutral-900 overflow-hidden">
                  <Image src={brand.banner} alt="" fill sizes="400px" className="object-cover opacity-60" />
                  <div className="absolute top-3 right-3 bg-oranza text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                    Verified Store
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 -mt-10 mb-3">
                    <div className="relative w-14 h-14 rounded-full border-2 border-white shadow-md overflow-hidden bg-white flex-shrink-0">
                      <Image src={brand.logo} alt={brand.name} fill sizes="56px" className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-black text-base text-ink">{brand.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{brand.rating.toFixed(1)}</span>
                        <span className="text-ink-tertiary font-normal">({brand.productCount} products)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-ink-secondary line-clamp-2 mb-4 flex-1">
                    {brand.description}
                  </p>

                  <Link
                    href={`/brand/${brand.slug}`}
                    className="w-full bg-surface-secondary hover:bg-oranza hover:text-white border border-border text-ink font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    View Official Store <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
