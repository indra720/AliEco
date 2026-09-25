"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, ChevronRight, PackageX, RotateCcw } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ProductCard } from "@/components/common/ProductCard";
import { PRODUCTS } from "@/data/products";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category");

  const [sortBy, setSortBy] = useState<"relevance" | "price_asc" | "price_desc" | "rating">("relevance");

  const searchResults = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.brand.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));

      const matchesCat = !categoryParam || categoryParam === "all" || item.categorySlug === categoryParam;

      return matchesQuery && matchesCat;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [query, categoryParam, sortBy]);

  const popularSearches = [
    "Wireless Headphones",
    "Smartwatch",
    "Running Shoes",
    "Vitamin C Serum",
    "Desk Lamp",
    "Leather Backpack",
    "Dumbbell",
    "Drone 4K",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 bg-surface-secondary/40 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-ink-secondary mb-4">
            <Link href="/" className="hover:text-oranza transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-ink-tertiary" />
            <span className="font-semibold text-ink">Search Results</span>
          </nav>

          {/* Search Header */}
          <div className="bg-white p-6 rounded-2xl border border-border mb-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-ink">
                {query ? (
                  <>
                    Search results for <span className="text-oranza">"{query}"</span>
                  </>
                ) : (
                  "Explore All Products"
                )}
              </h1>
              <p className="text-xs text-ink-secondary mt-0.5">
                Found {searchResults.length} matching products in ORANZA catalog
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-ink-secondary">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-surface-secondary border border-border text-xs font-bold text-ink rounded-lg px-3 py-2 outline-none cursor-pointer"
              >
                <option value="relevance">Relevance</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Popular searches suggestions strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar text-xs">
            <span className="font-bold text-ink-secondary flex-shrink-0">Popular Searches:</span>
            {popularSearches.map((term, i) => (
              <Link
                key={i}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="px-3 py-1 bg-white hover:bg-oranza hover:text-white border border-border rounded-full text-ink transition-colors flex-shrink-0 font-medium shadow-sm"
              >
                {term}
              </Link>
            ))}
          </div>

          {/* Results Grid */}
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-border p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-orange-50 text-oranza flex items-center justify-center mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-ink mb-1">No products found for "{query}"</h3>
              <p className="text-xs text-ink-secondary max-w-sm mb-6">
                Please check the spelling or try searching with generic terms like "audio", "shoes", or "lamp".
              </p>
              <Link
                href="/products"
                className="bg-oranza hover:bg-oranza-600 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-sm transition-all"
              >
                Browse All Products
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-gray-500">Searching products...</div>}>
      <SearchContent />
    </Suspense>
  );
}

