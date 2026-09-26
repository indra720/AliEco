"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Flame,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

export function HeroBanner() {
  const [activeHeroView, setActiveHeroView] = useState<"curated" | "3d-fashion">("curated");

  return (
    <section className="w-full bg-white py-3 sm:py-6">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Canvas with Warm Peach / Linen Tone matching Screenshot 2 */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FAF0E6] via-[#FDF5ED] to-[#FFF8F2] border border-orange-200/60 p-6 sm:p-10 lg:p-14 shadow-sm">
          {/* Subtle Ambient Lighting */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LEFT COLUMN: HERO HEADLINE & CTAs MATCHING SCREENSHOT 2 */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              {/* Season Tag matching Screenshot 2 */}
              <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm font-extrabold tracking-widest text-[#FF6A00] uppercase">
                  THE NEW SEASON
                </span>
              </div>

              {/* Bold Marketplace Headline matching Screenshot 2 */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.75rem] font-black text-gray-950 tracking-tight leading-[1.08] mb-4">
                Everything you<br className="hidden sm:inline" />
                {" "}want.{" "}
                <span className="text-[#FF6A00]">
                  All in one<br className="hidden sm:inline" /> place.
                </span>
              </h1>

              {/* Subtitle matching Screenshot 2 */}
              <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed max-w-lg mb-7">
                Discover fashion, electronics, lifestyle products and more from trusted sellers.
              </p>

              {/* High-Contrast Action Buttons matching Screenshot 2 */}
              <div className="flex items-center gap-3.5 sm:gap-4 flex-wrap mb-8 w-full sm:w-auto">
                <Link
                  href="/products"
                  className="bg-[#FF6A00] hover:bg-[#E85D00] text-white font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 group"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/products"
                  className="bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl border border-gray-200 shadow-xs transition-all hover:scale-[1.02] active:scale-95 text-center"
                >
                  Explore Collection
                </Link>
              </div>

              {/* Value Perks Strip */}
              <div className="flex items-center gap-5 sm:gap-7 pt-5 border-t border-orange-200/50 text-xs font-bold text-gray-600 flex-wrap">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#FF6A00] shrink-0" />
                  <span>Free Express Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#FF6A00] shrink-0" />
                  <span>100% Genuine Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#FF6A00] shrink-0" />
                  <span>7-Day Easy Returns</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO VISUAL SHOWCASE MATCHING SCREENSHOT 2 & PINTEREST 3D FASHION */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
              {/* Top View Switcher Tabs */}
              <div className="self-end mb-3 flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-xl border border-orange-200/80 shadow-xs z-20">
                <button
                  onClick={() => setActiveHeroView("curated")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeHeroView === "curated"
                      ? "bg-[#FF6A00] text-white shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Curated Collection</span>
                </button>

                <button
                  onClick={() => setActiveHeroView("3d-fashion")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeHeroView === "3d-fashion"
                      ? "bg-[#FF6A00] text-white shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>3D Fashion Studio</span>
                </button>
              </div>

              {/* View 1: Curated Multi-Product Floating Showcase matching Screenshot 2 */}
              {activeHeroView === "curated" && (
                <div className="relative w-full max-w-[560px] aspect-[584/388] rounded-3xl overflow-hidden shadow-xl border-2 border-white/80 bg-white/40 backdrop-blur-xs transition-all duration-300 hover:shadow-2xl group animate-in fade-in zoom-in-95">
                  <Image
                    src="/images/hero-showcase.png"
                    alt="Curated Collection: Electronics, Handbag, Sneakers"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 560px"
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  />

                  {/* Interactive Hotspot Links */}
                  <Link
                    href="/category/electronics"
                    className="absolute top-[8%] left-[6%] w-[42%] h-[58%] rounded-2xl cursor-pointer hover:bg-orange-500/10 transition-colors"
                    title="Explore Electronics Collection"
                  />
                  <Link
                    href="/category/fashion"
                    className="absolute top-[12%] right-[4%] w-[50%] h-[82%] rounded-2xl cursor-pointer hover:bg-orange-500/10 transition-colors"
                    title="Explore Designer Handbags"
                  />
                  <Link
                    href="/category/fashion"
                    className="absolute bottom-[6%] left-[22%] w-[38%] h-[42%] rounded-2xl cursor-pointer hover:bg-orange-500/10 transition-colors"
                    title="Explore New Arrival Sneakers"
                  />
                </div>
              )}

              {/* View 2: 3D Fashion Mobile Showcase from Pinterest https://pin.it/6wEnJAJvR */}
              {activeHeroView === "3d-fashion" && (
                <div className="relative w-full max-w-[420px] aspect-[9/14] sm:aspect-[9/13] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-b from-[#F5E6DA] via-[#FFF1E6] to-[#FAF0E6] flex items-center justify-center p-4 transition-all duration-300 hover:shadow-2xl animate-in fade-in zoom-in-95 group">
                  <Image
                    src="/images/hero-3d-fashion.jpg"
                    alt="3D Fashion Smartphone Floating Showcase"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Floating 3D Interactive Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-orange-200 shadow-md flex items-center gap-1.5 text-xs font-black text-gray-900 z-10 pointer-events-none">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF6A00] animate-spin" style={{ animationDuration: "6s" }} />
                    <span>3D Fashion Mobile Studio</span>
                  </div>

                  <Link
                    href="/category/fashion"
                    className="absolute bottom-5 bg-[#FF6A00] hover:bg-[#E85D00] text-white font-extrabold text-xs px-5 py-2.5 rounded-full shadow-lg shadow-orange-500/35 flex items-center gap-2 z-10 transition-transform hover:scale-105 active:scale-95"
                  >
                    <span>Shop 3D Fashion Deals</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
