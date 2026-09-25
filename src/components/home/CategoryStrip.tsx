"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export function CategoryStrip() {
  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-brand-orange uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Marketplace Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Curated Category Collections
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Shop directly from certified manufacturers and brand owners across India
            </p>
          </div>

          <Link
            href="/products"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-orange hover:text-brand-orange-dark transition-colors self-start sm:self-auto"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Refined, Elegant Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative flex flex-col bg-white rounded-2xl border border-gray-150 hover:border-brand-orange hover:shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden p-3"
            >
              {/* Category Image Canvas */}
              <div className="relative w-full aspect-[16/11] rounded-xl overflow-hidden bg-gradient-to-tr from-orange-50/40 via-gray-50 to-amber-50/30 mb-2.5">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                />

                {/* Item count tag badge */}
                <span className="absolute top-2 right-2 bg-white/95 backdrop-blur-md text-gray-800 text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs border border-white">
                  {cat.productCount}+ Items
                </span>
              </div>

              {/* Title & Arrow */}
              <div className="flex items-center justify-between px-1">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-brand-orange transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-gray-400 font-medium">Explore Collection</span>
                </div>

                <div className="w-7 h-7 rounded-full bg-gray-50 group-hover:bg-brand-orange group-hover:text-white text-gray-400 flex items-center justify-center transition-colors shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryStrip;
