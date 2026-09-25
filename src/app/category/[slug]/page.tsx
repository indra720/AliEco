"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ProductCard } from "@/components/common/ProductCard";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const category = CATEGORIES.find((c) => c.slug === slug) || CATEGORIES[0];
  const categoryProducts = PRODUCTS.filter((p) => p.categorySlug === category.slug);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 bg-surface-secondary/40 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-ink-secondary mb-6">
            <Link href="/" className="hover:text-oranza transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-ink-tertiary" />
            <Link href="/products" className="hover:text-oranza transition-colors">
              Categories
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-ink-tertiary" />
            <span className="font-semibold text-ink">{category.name}</span>
          </nav>

          {/* Category Hero Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-neutral-900 text-white p-6 sm:p-10 mb-8 border border-neutral-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative z-10 max-w-xl text-center md:text-left">
              <span className="bg-oranza text-white text-[11px] font-black uppercase px-2.5 py-1 rounded-md mb-3 inline-block">
                Category Spotlight
              </span>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">
                {category.name}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                {category.description}
              </p>
              <span className="text-xs font-bold text-oranza">
                {categoryProducts.length} Premium Products Available
              </span>
            </div>

            <div className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-xl overflow-hidden border border-neutral-700 flex-shrink-0 shadow-lg">
              <Image
                src={category.image}
                alt={category.name}
                fill
                priority
                sizes="224px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Subcategories pills */}
          {category.subcategories && category.subcategories.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar text-xs">
              <span className="font-bold text-ink-secondary flex-shrink-0">Subcategories:</span>
              {category.subcategories.map((sub, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 bg-white border border-border rounded-full text-ink font-semibold flex-shrink-0 shadow-sm hover:border-oranza cursor-pointer transition-colors"
                >
                  {sub}
                </span>
              ))}
            </div>
          )}

          {/* Product Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
