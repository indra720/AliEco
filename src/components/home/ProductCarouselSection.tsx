"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Product } from "@/types";
import { ProductCard } from "@/components/common/ProductCard";

interface ProductCarouselSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  tabs?: { label: string; filterFn: (p: Product) => boolean }[];
}

export function ProductCarouselSection({
  title,
  subtitle,
  products,
  viewAllLink = "/products",
  tabs,
}: ProductCarouselSectionProps) {
  const [activeTab, setActiveTab] = useState(0);

  const displayedProducts = tabs && tabs.length > 0
    ? products.filter(tabs[activeTab].filterFn).slice(0, 10)
    : products.slice(0, 10);

  return (
    <section className="py-12 bg-white relative border-b border-gray-100">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Recommended For You</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Sleek Modern Filter Tabs */}
            {tabs && tabs.length > 0 && (
              <div className="flex items-center gap-1 bg-orange-50/60 p-1.5 rounded-2xl border border-orange-100 overflow-x-auto no-scrollbar">
                {tabs.map((tab, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                      activeTab === idx
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/80"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}

            <Link
              href={viewAllLink}
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-brand-orange hover:text-brand-orange-dark transition-colors self-start md:self-auto shrink-0"
            >
              <span>Explore All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Products Grid: 5 columns on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCarouselSection;
