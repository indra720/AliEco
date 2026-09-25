"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck, Sparkles } from "lucide-react";
import { BRANDS } from "@/data/brands";

export function BrandShowcase() {
  return (
    <section className="py-12 bg-gray-50/60 relative border-b border-gray-100">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certified Marketplace Partners</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Featured Official Brand Stores
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Direct factory partnerships with 100% original manufacturer warranties
            </p>
          </div>
          <Link
            href="/brands"
            className="group inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-orange-dark transition-colors self-start sm:self-auto"
          >
            <span>View All Official Brands</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {BRANDS.slice(0, 6).map((brand) => (
            <Link
              key={brand.id}
              href={`/brand/${brand.slug}`}
              className="group bg-white p-5 rounded-3xl border border-gray-100/90 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1.5 transition-all duration-300 text-center flex flex-col items-center justify-between"
            >
              <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-gradient-to-tr from-orange-50 to-amber-50 p-1 mb-3 border border-orange-100/70 group-hover:scale-105 group-hover:border-brand-orange transition-all">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  sizes="80px"
                  className="object-cover rounded-xl"
                />
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-brand-orange transition-colors">
                  {brand.name}
                </h3>
                <div className="flex items-center justify-center gap-1 text-[11px] text-amber-600 font-bold mt-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{brand.rating.toFixed(1)}</span>
                  <span className="text-gray-400 font-medium">({brand.productCount})</span>
                </div>
              </div>

              <span className="mt-3.5 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200/50">
                <ShieldCheck className="w-3 h-3" /> Certified
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandShowcase;
