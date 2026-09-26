"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { ProductCard } from "@/components/common/ProductCard";

interface TabItem {
  label: string;
  filterFn: (p: Product) => boolean;
}

interface ProductCarouselSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  tabs?: TabItem[];
}

export function ProductCarouselSection({
  title,
  subtitle,
  products,
  viewAllLink = "/products",
  tabs,
}: ProductCarouselSectionProps) {
  const [activeTab, setActiveTab] = useState(0);

  const displayedProducts =
    tabs && tabs.length > 0
      ? products.filter(tabs[activeTab].filterFn).slice(0, 10)
      : products.slice(0, 10);

  return (
    <section className="py-10 sm:py-12 bg-white relative border-b border-gray-100">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Screenshot 3 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {subtitle}
              </p>
            )}
          </div>

          <Link
            href={viewAllLink}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-orange hover:text-brand-orange-dark transition-colors self-start md:self-auto shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Clean Underline Category Tabs matching Screenshot 3 */}
        {tabs && tabs.length > 0 && (
          <div className="flex items-center gap-6 sm:gap-8 border-b border-gray-200 overflow-x-auto no-scrollbar mb-8 pb-px">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`pb-3 text-xs sm:text-sm uppercase tracking-wider font-extrabold whitespace-nowrap transition-all duration-200 relative ${
                  activeTab === idx
                    ? "text-brand-orange border-b-2 border-brand-orange"
                    : "text-gray-500 hover:text-gray-800 border-b-2 border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Ultra-Clean Products Grid: 5 columns on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCarouselSection;
