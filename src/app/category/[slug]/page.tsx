"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, Sparkles, Filter, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ProductCard } from "@/components/common/ProductCard";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const category = CATEGORIES.find((c) => c.slug === slug) || CATEGORIES[0];
  const allCategoryProducts = PRODUCTS.filter((p) => p.categorySlug === category.slug);

  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [activeSubSubCategory, setActiveSubSubCategory] = useState("All Products");

  const groups = category.groups || [];
  const currentGroup = groups[activeGroupIndex];

  // Filter products based on selected group & sub-sub-category
  const filteredProducts = allCategoryProducts.filter((product) => {
    if (!currentGroup) return true;

    // Check group match
    const groupName = currentGroup.name.toLowerCase();
    const productSub = (product.subcategory || "").toLowerCase();
    const productTags = product.tags.map((t) => t.toLowerCase());
    const productTitle = product.title.toLowerCase();

    // If "All Fashion" or general
    if (groupName.includes("all")) return true;

    // Level 3 Sub-subcategory filtering
    if (activeSubSubCategory !== "All Products") {
      const term = activeSubSubCategory.toLowerCase();
      if (term.includes("t-shirt") || term.includes("tee")) {
        return productTitle.includes("t-shirt") || productTitle.includes("tee") || productTags.includes("tshirt");
      }
      if (term.includes("shirt")) {
        return (productTitle.includes("shirt") && !productTitle.includes("t-shirt")) || productSub.includes("shirt");
      }
      if (term.includes("jeans") || term.includes("denim")) {
        return productTitle.includes("jeans") || productTitle.includes("denim") || productTags.includes("jeans");
      }
      if (term.includes("saree") || term.includes("ethnic")) {
        return productTitle.includes("saree") || productSub.includes("ethnic") || productTags.includes("saree");
      }
      if (term.includes("shoes") || term.includes("sneaker") || term.includes("footwear")) {
        return productSub.includes("footwear") || productTags.includes("shoes") || productTitle.includes("sneaker") || productTitle.includes("runner");
      }
      if (term.includes("earbuds") || term.includes("headphones")) {
        return productSub.includes("headphones") || productTags.includes("earbuds") || productTitle.includes("airbuds");
      }
      if (term.includes("smartwatch") || term.includes("watch")) {
        return productSub.includes("smartwatches") || productTitle.includes("watch");
      }
      if (term.includes("drone")) {
        return productSub.includes("drones") || productTitle.includes("drone");
      }
      // General term check
      return productTitle.includes(term) || productTags.includes(term) || productSub.includes(term);
    }

    // Default Group level match
    if (groupName.includes("men")) {
      return productSub.includes("men") || productTags.includes("men") || productTitle.includes("men");
    }
    if (groupName.includes("women")) {
      return productSub.includes("women") || productTags.includes("women") || productTitle.includes("women") || productTitle.includes("saree");
    }
    if (groupName.includes("footwear")) {
      return productSub.includes("footwear") || productTags.includes("shoes") || productTitle.includes("sneaker");
    }

    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 bg-surface-secondary/30 py-6 sm:py-8">
        {/* Full max-w-[1580px] container to eliminate extra side margins */}
        <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-brand-orange transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link href="/products" className="hover:text-brand-orange transition-colors">
              Categories
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-semibold text-gray-900">{category.name}</span>
            {currentGroup && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-brand-orange font-bold">{currentGroup.name}</span>
              </>
            )}
            {activeSubSubCategory !== "All Products" && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-900 font-bold">{activeSubSubCategory}</span>
              </>
            )}
          </nav>

          {/* Clean Modern Category Banner */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FAF0E6] via-[#FDF5ED] to-white border border-orange-200/60 p-6 sm:p-10 mb-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative z-10 max-w-2xl text-center md:text-left">
              <span className="bg-brand-orange text-white text-[11px] font-black uppercase px-3 py-1 rounded-full mb-3 inline-flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3 h-3" />
                Category Spotlight
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-gray-950 tracking-tight mb-2">
                {category.name} Collection
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                {category.description}
              </p>
              <span className="text-xs font-bold text-brand-orange">
                {allCategoryProducts.length} Premium Verified Products Available
              </span>
            </div>

            <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-white shadow-lg flex-shrink-0">
              <Image
                src={category.image}
                alt={category.name}
                fill
                priority
                sizes="192px"
                className="object-cover"
              />
            </div>
          </div>

          {/* LEVEL 2: MAJOR SUB-CATEGORY TABS (e.g., Men, Women, Boys & Kids, Footwear) */}
          {groups.length > 0 && (
            <div className="mb-4 bg-white p-3 rounded-2xl border border-gray-200 shadow-xs">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 flex-shrink-0">
                  Department:
                </span>
                {groups.map((grp, idx) => (
                  <button
                    key={grp.id}
                    onClick={() => {
                      setActiveGroupIndex(idx);
                      setActiveSubSubCategory("All Products");
                    }}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 ${
                      activeGroupIndex === idx
                        ? "bg-brand-orange text-white shadow-md shadow-orange-500/25 scale-102"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <span>{grp.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* LEVEL 3: NESTED SUB-SUB-CATEGORIES PILLS (e.g. T-Shirts, Shirts, Jeans, Trousers, Lower, Shoes) */}
          {currentGroup && currentGroup.subcategories.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex-shrink-0 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-brand-orange" />
                  Category Types:
                </span>
                {currentGroup.subcategories.map((sub, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSubSubCategory(sub)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                      activeSubSubCategory === sub
                        ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                        : "bg-white text-gray-700 border-gray-200 hover:border-brand-orange hover:text-brand-orange shadow-xs"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Filter Bar & Results Count */}
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200 flex-wrap gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
              <span>Showing</span>
              <strong className="text-gray-900 font-bold">{filteredProducts.length}</strong>
              <span>products in</span>
              <span className="px-2.5 py-0.5 bg-orange-100/70 text-brand-orange rounded-full font-bold">
                {currentGroup ? currentGroup.name : category.name} • {activeSubSubCategory}
              </span>
            </div>

            <span className="text-xs font-medium text-gray-400">
              ⚡ Instant Doorstep Delivery Available
            </span>
          </div>

          {/* Product Cards Grid: 5 Columns on Desktop */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200">
              <p className="text-base font-bold text-gray-800 mb-1">
                No items found for &quot;{activeSubSubCategory}&quot; in {currentGroup?.name}
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Try switching sub-categories or exploring all products in {category.name}.
              </p>
              <button
                onClick={() => setActiveSubSubCategory("All Products")}
                className="px-5 py-2.5 bg-brand-orange text-white text-xs font-bold rounded-xl shadow-md"
              >
                Show All {currentGroup?.name} Products
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
