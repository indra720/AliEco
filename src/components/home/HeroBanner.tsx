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
    <section className="w-full bg-white py-1 sm:py-1.5">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Canvas with Warm Peach / Linen Tone matching Screenshot 2 */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FAF0E6] via-[#FDF5ED] to-[#FFF8F2] border border-orange-200/60 px-5 pt-5 pb-5 sm:px-8 sm:pt-6 sm:pb-6 lg:px-10 lg:pt-6 lg:pb-7 shadow-sm">
          {/* Subtle Ambient Lighting */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* LEFT COLUMN: HERO HEADLINE, CTAs & SEPARATE PRODUCTS DISPLAY */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              {/* Season Pill Badge */}
              <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full border border-orange-200 shadow-xs mb-3.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6A00] animate-pulse" />
                <span className="text-[11px] font-black tracking-widest text-[#FF6A00] uppercase">
                  NEW COLLECTION 2026
                </span>
              </div>

              {/* Bold Marketplace Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-black text-gray-950 tracking-tight leading-[1.08] mb-3">
                Discover The Best<br />
                <span className="text-[#FF6A00]">Products Online.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed max-w-lg mb-5">
                Shop top-quality products at unbeatable prices across fashion, next-gen electronics, footwear, and beauty with lightning-fast delivery.
              </p>

              {/* High-Contrast Action Buttons */}
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap mb-5 w-full sm:w-auto">
                {/* Shop Now Primary Button */}
                <Link
                  href="/products"
                  className="bg-[#FF6A00] hover:bg-[#E85D00] text-white font-black text-xs sm:text-sm px-7 py-3 rounded-full shadow-md shadow-orange-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.03] active:scale-95 group border-2 border-orange-400/40"
                >
                  <span className="text-white font-extrabold tracking-wide">Shop Now</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Secondary Button */}
                <Link
                  href="/products"
                  className="bg-white hover:bg-gray-50 text-gray-900 font-bold text-xs sm:text-sm px-7 py-3 rounded-full border border-gray-300 shadow-2xs transition-all hover:scale-[1.02] active:scale-95 text-center"
                >
                  Explore Collection
                </Link>
              </div>

              {/* PRODUCTS FROM THE CARD DISPLAYED SEPARATELY ON THE LEFT */}
              <div className="w-full pt-3.5 border-t border-orange-200/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-ping" />
                    Featured In This Look
                  </span>
                  <Link
                    href="/category/fashion"
                    className="text-[11px] font-extrabold text-[#FF6A00] hover:underline flex items-center gap-0.5"
                  >
                    <span>View Range</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* 5 Separate Product Micro-Showcases on the Left */}
                <div className="grid grid-cols-5 gap-2 w-full">
                  {[
                    { title: "Quilted Bag", price: "$120", img: "/images/handbag-3d.png", href: "/category/fashion" },
                    { title: "Stilettos", price: "$350", img: "/images/heels-3d.png", href: "/category/footwear" },
                    { title: "Perfume", price: "$95", img: "/images/perfume-3d.png", href: "/category/beauty" },
                    { title: "Sunglasses", price: "$75", img: "/images/makeup-3d.png", href: "/category/fashion" },
                    { title: "Loafers", price: "$75", img: "/images/loafers-3d.png", href: "/category/footwear" },
                  ].map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="flex flex-col items-center p-1.5 rounded-xl bg-white/80 hover:bg-white border border-orange-200/70 shadow-2xs hover:shadow-xs transition-all hover:scale-105 text-center group"
                    >
                      <div className="relative w-9 h-9 sm:w-11 sm:h-11 mb-1">
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          sizes="44px"
                          className="object-contain group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <span className="text-[10px] font-extrabold text-gray-800 group-hover:text-[#FF6A00] truncate max-w-full">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-black text-[#FF6A00]">
                        {item.price}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Value Perks Strip */}
              <div className="flex items-center gap-4 sm:gap-6 pt-3 mt-3 border-t border-orange-200/40 text-[11px] font-bold text-gray-600 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#FF6A00] shrink-0" />
                  <span>Free Express Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF6A00] shrink-0" />
                  <span>100% Genuine Certified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-[#FF6A00] shrink-0" />
                  <span>7-Day Easy Returns</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: MULTI-ELEMENT FLOATING 3D COMPOSITION (100% CARDLESS & BORDERLESS) */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[440px]">
              {/* Natural Ambient Aura blending into canvas */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-400/20 via-amber-200/25 to-orange-300/15 rounded-full blur-3xl pointer-events-none" />

              {/* Floating Canvas with Zero Card Enclosure */}
              <div className="relative w-full max-w-[540px] h-[360px] sm:h-[420px] flex items-center justify-center">
                {/* 1. Center Floating Smartphone with glowing dress */}
                <div className="relative z-20 w-[220px] sm:w-[260px] h-[350px] sm:h-[410px] transition-transform duration-500 hover:scale-105">
                  <Image
                    src="/images/phone-3d.png"
                    alt="Floating Smartphone with Glowing Orange Bodycon Dress"
                    fill
                    priority
                    sizes="260px"
                    className="object-contain drop-shadow-2xl"
                  />
                  <Link
                    href="/category/fashion"
                    className="absolute inset-0 z-30"
                    title="Shop Glowing Bodycon Dress ($180)"
                  />
                </div>

                {/* 2. Floating Quilted Handbag (Left of Phone) */}
                <Link
                  href="/category/fashion"
                  className="absolute left-[-2%] sm:left-[2%] bottom-[10%] z-25 w-[140px] sm:w-[170px] h-[120px] sm:h-[150px] transition-all duration-500 hover:scale-110 hover:-translate-y-2 group"
                  title="Quilted Leather Handbag ($120)"
                >
                  <Image
                    src="/images/handbag-3d.png"
                    alt="Quilted Orange Leather Handbag"
                    fill
                    sizes="170px"
                    className="object-contain drop-shadow-xl"
                  />
                </Link>

                {/* 3. Floating High Heels (Left of Phone) */}
                <Link
                  href="/category/footwear"
                  className="absolute left-[8%] top-[12%] z-15 w-[90px] sm:w-[120px] h-[120px] sm:h-[150px] transition-all duration-500 hover:scale-110 hover:-translate-y-2 group"
                  title="Strappy Stiletto Sandals ($350)"
                >
                  <Image
                    src="/images/heels-3d.png"
                    alt="Strappy High-Heel Sandals"
                    fill
                    sizes="120px"
                    className="object-contain drop-shadow-xl"
                  />
                </Link>

                {/* 4. Floating Luxury Perfume (Top Left) */}
                <Link
                  href="/category/beauty"
                  className="absolute left-[-2%] top-[4%] z-10 w-[80px] sm:w-[100px] h-[80px] sm:h-[100px] transition-all duration-500 hover:scale-110 hover:-translate-y-1"
                  title="Luna Signature Perfume ($95)"
                >
                  <Image
                    src="/images/perfume-3d.png"
                    alt="Luna Luxury Perfume"
                    fill
                    sizes="100px"
                    className="object-contain drop-shadow-lg"
                  />
                </Link>

                {/* 5. Floating Sunglasses & Makeup Palette (Top Right) */}
                <Link
                  href="/category/fashion"
                  className="absolute right-[-2%] top-[6%] z-25 w-[140px] sm:w-[170px] h-[110px] sm:h-[140px] transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                  title="Designer Sunglasses & Makeup Palette ($75)"
                >
                  <Image
                    src="/images/makeup-3d.png"
                    alt="Designer Sunglasses & Makeup Palette"
                    fill
                    sizes="170px"
                    className="object-contain drop-shadow-xl"
                  />
                </Link>

                {/* 6. Floating Elegant Loafers (Bottom Right) */}
                <Link
                  href="/category/footwear"
                  className="absolute right-[2%] bottom-[6%] z-20 w-[130px] sm:w-[160px] h-[100px] sm:h-[120px] transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                  title="Classic Leather Loafers ($75)"
                >
                  <Image
                    src="/images/loafers-3d.png"
                    alt="Classic Orange Leather Loafers"
                    fill
                    sizes="160px"
                    className="object-contain drop-shadow-xl"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
