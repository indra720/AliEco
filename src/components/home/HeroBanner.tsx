"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

export function HeroBanner() {

  return (
    <section className="w-full bg-white py-3 sm:py-6">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Canvas with Warm Peach / Linen Tone matching Screenshot 2 */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FAF0E6] via-[#FDF5ED] to-[#FFF8F2] border border-orange-200/60 p-6 sm:p-10 lg:p-14 shadow-sm">
          {/* Subtle Ambient Lighting */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LEFT COLUMN: HERO HEADLINE & HIGH-CONTRAST CTAs (RESTORED AS REQUESTED) */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              {/* Season Pill Badge */}
              <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-orange-200 shadow-xs mb-5">
                <Sparkles className="w-4 h-4 text-[#FF6A00] animate-pulse" />
                <span className="text-xs font-black tracking-widest text-[#FF6A00] uppercase">
                  NEW COLLECTION 2026
                </span>
              </div>

              {/* Bold Marketplace Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-black text-gray-950 tracking-tight leading-[1.08] mb-4">
                Discover The Best<br />
                <span className="text-[#FF6A00]">Products Online.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed max-w-lg mb-7">
                Shop top-quality products at unbeatable prices across fashion, next-gen electronics, footwear, and beauty with lightning-fast delivery.
              </p>

              {/* High-Contrast Action Buttons */}
              <div className="flex items-center gap-3.5 sm:gap-4 flex-wrap mb-8 w-full sm:w-auto">
                {/* Shop Now Primary Button with Solid Orange & Bold White Text */}
                <Link
                  href="/products"
                  className="bg-[#FF6A00] hover:bg-[#E85D00] text-white font-black text-sm sm:text-base px-8 py-4 rounded-full shadow-lg shadow-orange-500/35 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.03] active:scale-95 group border-2 border-orange-400/40"
                >
                  <span className="text-white font-extrabold tracking-wide">Shop Now</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Secondary Button */}
                <Link
                  href="/products"
                  className="bg-white hover:bg-gray-50 text-gray-900 font-bold text-sm sm:text-base px-8 py-4 rounded-full border border-gray-300 shadow-xs transition-all hover:scale-[1.02] active:scale-95 text-center"
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

            {/* RIGHT COLUMN: 3D PROMOTIONAL FLOATING SMARTPHONE SHOWCASE */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
              {/* Outer 3D Perspective Container */}
              <div className="relative w-full max-w-[580px] group perspective-[1200px]">
                {/* Ambient Golden Glowing Aura matching the 3D Studio lighting */}
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/25 via-amber-300/30 to-orange-500/20 rounded-[2.5rem] blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Main 3D Showcase Card with subtle interactive float & shadow */}
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/80 bg-gradient-to-br from-[#FFF5EC] to-[#FDE8D7] transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-orange-500/20">
                  <Image
                    src="/images/hero-3d-poster.jpg"
                    alt="A premium 3D promotional showcase of a white smartphone floating in the air with glowing orange dress and luxury floating fashion accessories"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 580px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Floating 3D Experience Pill Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-orange-200/80 shadow-md flex items-center gap-2 z-10 pointer-events-none">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF6A00] animate-pulse" />
                    <span className="text-[11px] font-black text-gray-900 tracking-wider uppercase">
                      3D Fashion Studio
                    </span>
                  </div>

                  {/* Top Right "Virtual Boutique" Tag */}
                  <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold text-white tracking-widest uppercase border border-white/20 shadow-xs z-10 pointer-events-none">
                    Luxe Edition
                  </div>

                  {/* Interactive Hotspot 1: Center Phone & Glowing Dress */}
                  <Link
                    href="/category/fashion"
                    className="absolute top-[16%] left-[34%] w-[32%] h-[68%] rounded-3xl cursor-pointer hover:bg-orange-500/10 transition-colors z-10 group/dress"
                    title="Shop Bodycon Dress & App Collection"
                  >
                    <span className="sr-only">Shop Dress</span>
                  </Link>

                  {/* Interactive Hotspot 2: Quilted Orange Handbag */}
                  <Link
                    href="/category/fashion"
                    className="absolute bottom-[22%] left-[8%] w-[26%] h-[35%] rounded-2xl cursor-pointer hover:bg-orange-500/10 transition-colors z-10"
                    title="Shop Quilted Handbags ($120)"
                  >
                    <span className="sr-only">Shop Handbag</span>
                  </Link>

                  {/* Interactive Hotspot 3: Luxury Perfume */}
                  <Link
                    href="/category/beauty"
                    className="absolute top-[32%] left-[12%] w-[16%] h-[24%] rounded-xl cursor-pointer hover:bg-orange-500/10 transition-colors z-10"
                    title="Shop Luxury Fragrances"
                  >
                    <span className="sr-only">Shop Perfume</span>
                  </Link>

                  {/* Interactive Hotspot 4: High Heels */}
                  <Link
                    href="/category/footwear"
                    className="absolute top-[20%] left-[24%] w-[16%] h-[28%] rounded-xl cursor-pointer hover:bg-orange-500/10 transition-colors z-10"
                    title="Shop High-Heel Sandals ($350)"
                  >
                    <span className="sr-only">Shop High Heels</span>
                  </Link>

                  {/* Interactive Hotspot 5: Sunglasses & Makeup */}
                  <Link
                    href="/category/fashion"
                    className="absolute top-[24%] right-[14%] w-[28%] h-[36%] rounded-2xl cursor-pointer hover:bg-orange-500/10 transition-colors z-10"
                    title="Shop Sunglasses & Makeup Palette"
                  >
                    <span className="sr-only">Shop Sunglasses & Makeup</span>
                  </Link>

                  {/* Interactive Hotspot 6: Elegant Loafers */}
                  <Link
                    href="/category/footwear"
                    className="absolute bottom-[16%] right-[18%] w-[24%] h-[24%] rounded-xl cursor-pointer hover:bg-orange-500/10 transition-colors z-10"
                    title="Shop Elegant Loafers ($75)"
                  >
                    <span className="sr-only">Shop Loafers</span>
                  </Link>

                  {/* Floating Action Button on Hover */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 transition-all duration-300">
                    <Link
                      href="/category/fashion"
                      className="bg-[#FF6A00] hover:bg-[#E85D00] text-white font-extrabold text-xs px-5 py-2.5 rounded-full shadow-lg shadow-orange-500/35 flex items-center gap-2 border border-white/30 backdrop-blur-xs transition-transform hover:scale-105 active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Explore 3D Boutique</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
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
