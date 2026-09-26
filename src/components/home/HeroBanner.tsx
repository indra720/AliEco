"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Flame,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
} from "lucide-react";

export function HeroBanner() {
  return (
    <section className="w-full bg-white py-4 sm:py-6">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Container with Warm Peach / Cream Canvas as in reference screenshot */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FAF0E6] via-[#FDF5ED] to-[#FFF8F2] border border-orange-200/60 p-6 sm:p-10 lg:p-14 shadow-sm">
          {/* Ambient Warm Glow Orbs */}
          <div className="absolute -top-16 -right-16 w-80 h-80 bg-orange-200/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              {/* Top Season Label */}
              <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-orange-200/70 shadow-xs mb-5">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                <span className="text-xs font-black tracking-widest text-brand-orange uppercase">
                  THE NEW SEASON
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-black text-gray-950 tracking-tight leading-[1.08] mb-4">
                Everything you want.<br />
                <span className="text-brand-orange">All in one place.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed max-w-lg mb-8">
                Discover thousands of curated essentials across premium fashion, next-gen electronics, footwear, beauty, and home luxury with lightning-fast doorstep delivery.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex items-center gap-3.5 sm:gap-4 flex-wrap mb-8 w-full sm:w-auto">
                <Link
                  href="/products"
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white font-extrabold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-full shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-95 group"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/products"
                  className="bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-full border border-gray-200 shadow-xs transition-all hover:scale-[1.02] active:scale-95 hover:border-gray-300 text-center"
                >
                  Explore Collection
                </Link>
              </div>

              {/* Value Perks Strip */}
              <div className="flex items-center gap-4 sm:gap-6 pt-6 border-t border-orange-200/50 text-[11px] sm:text-xs font-bold text-gray-600 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-brand-orange shrink-0" />
                  <span>Free Express Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-orange shrink-0" />
                  <span>100% Genuine Certified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-brand-orange shrink-0" />
                  <span>7-Day Easy Returns</span>
                </div>
              </div>
            </div>

            {/* Right Multi-Layered Product Collage (Matching Reference Screenshot) */}
            <div className="lg:col-span-6 relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center">
              {/* Floating Top Badge: UP TO 50% OFF */}
              <div className="absolute top-2 right-2 sm:right-6 bg-gray-950 text-white px-4 py-2 rounded-full font-black text-xs sm:text-sm tracking-wider shadow-xl border border-gray-800 flex items-center gap-1.5 z-30 animate-pulse">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>UP TO 50% OFF</span>
              </div>

              {/* Card 1: Top-Left Card (Audio & Wearables) */}
              <Link
                href="/category/electronics"
                className="absolute top-4 left-2 sm:left-6 w-44 sm:w-56 bg-white p-3.5 rounded-2xl shadow-xl border-4 border-white transform -rotate-3 hover:rotate-0 transition-transform duration-300 z-10 block group"
              >
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-gray-50 mb-2">
                  <Image
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80"
                    alt="Wireless Audio"
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-gray-900 truncate">SoundPro ANC</p>
                    <p className="text-[10px] text-gray-400 font-medium">Electronics</p>
                  </div>
                  <span className="text-xs font-black text-brand-orange">₹3,999</span>
                </div>
              </Link>

              {/* Card 2: Top-Right Card (Designer Handbag & Fashion) */}
              <Link
                href="/category/accessories"
                className="absolute top-16 right-0 sm:right-4 w-44 sm:w-52 bg-white p-3.5 rounded-2xl shadow-xl border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-300 z-10 block group"
              >
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-amber-50/30 mb-2">
                  <Image
                    src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=80"
                    alt="Luxury Bag"
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-gray-900 truncate">Classic Leather Bag</p>
                    <p className="text-[10px] text-gray-400 font-medium">Bags & Luggage</p>
                  </div>
                  <span className="text-xs font-black text-brand-orange">₹2,499</span>
                </div>
              </Link>

              {/* Card 3: Center-Bottom Hero Card (Sport Sneaker with "NEW ARRIVALS" tag) */}
              <Link
                href="/category/fashion"
                className="relative mt-24 sm:mt-28 mx-auto w-60 sm:w-72 bg-white p-4 rounded-3xl shadow-2xl border-4 border-white transform hover:scale-105 transition-all duration-300 z-20 block group"
              >
                <div className="absolute -top-3.5 left-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md shadow-orange-500/30 flex items-center gap-1 tracking-wider">
                  <Flame className="w-3 h-3 fill-white" />
                  <span>NEW ARRIVALS</span>
                </div>
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-orange-50/50 to-gray-50 mb-3 mt-1">
                  <Image
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80"
                    alt="Pro Runner Sneaker"
                    fill
                    className="object-contain p-2 group-hover:scale-108 transition-transform"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-brand-orange transition-colors">
                      Nike Air Max Pro
                    </h4>
                    <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold mt-0.5">
                      <span>★ 4.9</span>
                      <span className="text-gray-400 font-normal">(1,840)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 line-through block">₹5,999</span>
                    <span className="text-sm sm:text-base font-black text-brand-orange">₹3,499</span>
                  </div>
                </div>
              </Link>

              {/* Floating Reviews Badge */}
              <div className="absolute bottom-2 left-2 sm:left-6 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-2.5 z-30">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-orange-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white">
                    A
                  </div>
                  <div className="w-7 h-7 rounded-full bg-blue-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white">
                    R
                  </div>
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white">
                    S
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs font-bold text-gray-900">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>4.9 / 5.0</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">12k+ Happy Shoppers</span>
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
