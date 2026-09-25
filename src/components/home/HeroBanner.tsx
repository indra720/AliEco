"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Camera,
  Sparkles,
  ArrowRight,
  Flame,
  ShieldCheck,
  Truck,
  RotateCcw,
  Zap,
  ChevronRight,
  Star,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export function HeroBanner() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"ai" | "products" | "manufacturers" | "worldwide">("products");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const categoryIcons = [
    { bg: "bg-orange-50 text-orange-600" },
    { bg: "bg-blue-50 text-blue-600" },
    { bg: "bg-emerald-50 text-emerald-600" },
    { bg: "bg-pink-50 text-pink-600" },
    { bg: "bg-purple-50 text-purple-600" },
    { bg: "bg-amber-50 text-amber-600" },
    { bg: "bg-teal-50 text-teal-600" },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-orange-50/50 via-white to-gray-50/30 pt-8 pb-12 border-b border-gray-200">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. ALIBABA-INSPIRED CENTER MODE SWITCHER & BIG SEARCH BAR */}
        <div className="flex flex-col items-center justify-center text-center mb-10">
          {/* Big Mode Switcher Tabs */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 mb-5 flex-wrap">
            <button
              onClick={() => setActiveTab("ai")}
              className={`flex items-center gap-2 text-xl sm:text-2xl lg:text-3xl font-black transition-all ${
                activeTab === "ai"
                  ? "text-brand-orange scale-105"
                  : "text-gray-800 hover:text-brand-orange"
              }`}
            >
              <span>AI Mode</span>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-brand-orange animate-pulse" />
            </button>

            <span className="text-gray-300 text-2xl font-light hidden sm:inline">|</span>

            <button
              onClick={() => setActiveTab("products")}
              className={`relative text-xl sm:text-2xl lg:text-3xl font-black transition-all pb-1.5 ${
                activeTab === "products"
                  ? "text-brand-orange after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-brand-orange after:rounded-full"
                  : "text-gray-800 hover:text-brand-orange"
              }`}
            >
              Products
            </button>

            <button
              onClick={() => setActiveTab("manufacturers")}
              className={`relative text-xl sm:text-2xl lg:text-3xl font-black transition-all pb-1.5 ${
                activeTab === "manufacturers"
                  ? "text-brand-orange after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-brand-orange after:rounded-full"
                  : "text-gray-800 hover:text-brand-orange"
              }`}
            >
              Manufacturers
            </button>

            <button
              onClick={() => setActiveTab("worldwide")}
              className={`relative text-xl sm:text-2xl lg:text-3xl font-black transition-all pb-1.5 ${
                activeTab === "worldwide"
                  ? "text-brand-orange after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-brand-orange after:rounded-full"
                  : "text-gray-800 hover:text-brand-orange"
              }`}
            >
              Worldwide
            </button>
          </div>

          {/* Big Wide Rounded-Full Search Bar */}
          <div className="w-full max-w-4xl">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center w-full bg-white rounded-full border-2 border-brand-orange shadow-lg shadow-orange-500/10 focus-within:shadow-xl focus-within:shadow-orange-500/25 p-1.5 sm:p-2 transition-all"
            >
              <div className="pl-4 pr-2 text-gray-400">
                <Search className="w-6 h-6 text-brand-orange" />
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, verified manufacturers, earbuds, watches..."
                className="w-full py-2.5 sm:py-3.5 text-sm sm:text-base text-gray-900 font-medium outline-none placeholder:text-gray-400"
              />

              {/* Image Search Button inside bar */}
              <button
                type="button"
                onClick={() => alert("Image Search activated! Upload a product photo to find instant supplier match.")}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-gray-600 hover:text-brand-orange transition-colors mr-2 shrink-0 border-l border-gray-200"
              >
                <Camera className="w-4 h-4 text-brand-orange" />
                <span>Image Search</span>
              </button>

              {/* Large Orange Gradient Search CTA Button */}
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-500 via-brand-orange to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm sm:text-base px-7 sm:px-10 py-3 sm:py-3.5 rounded-full flex items-center justify-center gap-2 shadow-md shadow-orange-500/30 transition-all shrink-0 active:scale-95"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Search</span>
              </button>
            </form>

            {/* Popular Search Terms */}
            <div className="flex items-center justify-center gap-2 mt-3 flex-wrap text-xs text-gray-500">
              <span className="font-bold text-gray-700">Frequently searched:</span>
              {["iPhone 15 Pro", "Wireless Earbuds", "Running Shoes", "Smartwatches", "Heavyweight Tees", "Air Fryer"].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      router.push(`/search?q=${encodeURIComponent(term)}`);
                    }}
                    className="hover:text-brand-orange hover:underline font-medium text-gray-600"
                  >
                    {term},
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* 2. PREMIUM COMMERCIAL MARKETPLACE SHOWCASE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Sleek Category Navigation Sidebar */}
          <div className="hidden lg:flex lg:col-span-3 bg-white rounded-3xl border border-gray-200/90 p-5 shadow-sm flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-gray-100">
                <span className="text-xs font-black uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                  Top Categories
                </span>
                <span className="text-[11px] font-bold text-brand-orange bg-orange-50 px-2 py-0.5 rounded-full">
                  50k+ Products
                </span>
              </div>

              <div className="space-y-1">
                {CATEGORIES.slice(0, 7).map((cat, i) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="group flex items-center justify-between p-2.5 rounded-2xl hover:bg-orange-50/70 text-gray-800 hover:text-brand-orange transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-xl overflow-hidden shadow-xs border border-gray-100">
                        <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-sm font-bold group-hover:translate-x-0.5 transition-transform">
                        {cat.name}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/products"
              className="mt-4 w-full text-center py-3 bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 text-brand-orange font-bold text-xs rounded-2xl border border-orange-200/60 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Explore All 10 Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Center Column: High-End Festive Hero Banner with Rich Depth */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#26150b] text-white p-8 sm:p-12 flex flex-col justify-between shadow-2xl border border-neutral-800 min-h-[420px] group">
            {/* Ambient Lighting Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/25 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-orange-600/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-lg">
              {/* Top Banner Tag */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/30 to-amber-500/20 backdrop-blur-md text-amber-300 text-xs font-black uppercase px-3.5 py-1.5 rounded-full mb-5 border border-orange-400/30 shadow-sm">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Festive Mega Bonanza • Up to 60% OFF</span>
              </div>

              {/* Bold Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12] mb-4 text-white">
                Next-Gen Shopping. <br />
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-amber-100 bg-clip-text text-transparent">
                  Direct from Verified Sources.
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal mb-8 max-w-md">
                Over 50,000 certified electronics, smart accessories, and lifestyle essentials with wholesale volume discounts and 48-hour express dispatch.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 flex-wrap">
                <Link
                  href="/products"
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow-lg shadow-orange-500/30 transition-all active:scale-95 flex items-center gap-2"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/deals"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-3.5 rounded-2xl border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Super Deals</span>
                </Link>
              </div>
            </div>

            {/* Seamless High-End Featured Cutout Image */}
            <div className="absolute right-2 -bottom-2 w-64 sm:w-80 h-64 sm:h-80 opacity-90 transition-transform duration-500 group-hover:scale-105 pointer-events-none">
              <Image
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
                alt="ORANZA Premium Audio"
                fill
                priority
                className="object-contain drop-shadow-[0_20px_40px_rgba(255,106,0,0.35)]"
              />
            </div>
          </div>

          {/* Right Column: Deal of the Day & Buyer Assurance Cards */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {/* Spotlight Deal Box */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-5 shadow-sm flex flex-col justify-between flex-1 hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-600 px-2.5 py-1 rounded-full">
                    <Flame className="w-3 h-3 fill-red-600" />
                    Deal of the Day
                  </span>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Save 45%
                  </span>
                </div>

                {/* Product Image */}
                <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-gray-50 to-orange-50/30 p-2 mb-3">
                  <Image
                    src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=80"
                    alt="Smartwatch"
                    fill
                    className="object-contain hover:scale-108 transition-transform duration-500"
                  />
                </div>

                <h3 className="font-extrabold text-gray-900 text-sm line-clamp-1">
                  Quantum Ultra 1.96&quot; AMOLED Smartwatch
                </h3>

                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="text-2xl font-black text-brand-orange">₹3,499</span>
                  <span className="text-xs text-gray-400 line-through font-semibold">₹6,999</span>
                </div>

                {/* Stock Left Meter */}
                <div className="mt-3">
                  <div className="flex justify-between text-[11px] font-bold mb-1">
                    <span className="text-gray-500">Stock Status</span>
                    <span className="text-red-500">Only 4 units left!</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-[85%]" />
                  </div>
                </div>
              </div>

              <Link
                href="/products/oranzatech-quantum-ultra-smartwatch"
                className="mt-4 w-full block text-center py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl text-xs font-black shadow-md shadow-orange-500/25 transition-all active:scale-95"
              >
                Claim Deal Now
              </Link>
            </div>

            {/* Buyer Trust Card */}
            <div className="bg-gradient-to-br from-orange-50/80 via-white to-amber-50/50 rounded-3xl border border-orange-200/70 p-4 sm:p-5">
              <h4 className="text-xs font-black uppercase text-gray-900 tracking-wider mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-orange" />
                Why Shop on ORANZA?
              </h4>
              <div className="space-y-2 text-xs text-gray-700 font-semibold">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>100% Genuine Certified Goods</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-brand-orange shrink-0" />
                  <span>Free Express Delivery over ₹999</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>7-Day Easy Doorstep Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
