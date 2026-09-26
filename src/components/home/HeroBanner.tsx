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

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LEFT COLUMN: HERO HEADLINE & CTAs (RESTORED CLEAN & SPACIOUS AS REQUESTED) */}
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
                {/* Shop Now Primary Button */}
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

            {/* RIGHT COLUMN: 3D SMARTPHONE & SEPARATE FLOATING PRODUCTS (MATCHING REFERENCE DESIGN) */}
            <div className="lg:col-span-6 relative flex items-center justify-center py-2 sm:py-4">
              {/* Soft Ambient Golden Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-400/20 via-amber-200/25 to-orange-300/15 rounded-full blur-3xl pointer-events-none" />

              {/* Seamless 3D Floating Showcase Container */}
              <div className="relative w-full max-w-[480px] sm:max-w-[520px] aspect-[896/1200] flex items-center justify-center transition-transform duration-700 ease-out hover:scale-[1.02] group">
                <Image
                  src="/images/hero-3d-mobile-showcase.png"
                  alt="3D Smartphone surrounded by floating products: Luxury Handbag, Headphones, Sneaker, Perfume, Smartwatch, Camera and Sunglasses"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="object-contain drop-shadow-2xl"
                />

                {/* Hotspot: Center Smartphone */}
                <Link
                  href="/products"
                  className="absolute top-[22%] left-[28%] w-[44%] h-[68%] rounded-3xl z-10 cursor-pointer"
                  title="Shop Online Catalog"
                />

                {/* Hotspot: Top Left Luxury Handbag */}
                <Link
                  href="/category/fashion"
                  className="absolute top-[4%] left-[4%] w-[32%] h-[26%] rounded-2xl z-10 cursor-pointer"
                  title="Shop Luxury Handbags ($120)"
                />

                {/* Hotspot: Top Wireless Headphones */}
                <Link
                  href="/category/electronics"
                  className="absolute top-[2%] left-[34%] w-[26%] h-[22%] rounded-2xl z-10 cursor-pointer"
                  title="Shop ANC Wireless Headphones"
                />

                {/* Hotspot: Top Right Special Offer Pill */}
                <Link
                  href="/deals"
                  className="absolute top-[2%] right-[4%] w-[32%] h-[16%] rounded-2xl z-10 cursor-pointer"
                  title="Explore 30% OFF Special Offers"
                />

                {/* Hotspot: Right Floating Sneaker */}
                <Link
                  href="/category/footwear"
                  className="absolute top-[18%] right-[2%] w-[32%] h-[24%] rounded-2xl z-10 cursor-pointer"
                  title="Shop Designer Sneakers"
                />

                {/* Hotspot: Middle Left Perfume */}
                <Link
                  href="/category/beauty"
                  className="absolute top-[32%] left-[0%] w-[30%] h-[26%] rounded-2xl z-10 cursor-pointer"
                  title="Shop Luxury Perfumes & Fragrances"
                />

                {/* Hotspot: Middle Right Smartwatch */}
                <Link
                  href="/category/electronics"
                  className="absolute top-[42%] right-[2%] w-[28%] h-[26%] rounded-2xl z-10 cursor-pointer"
                  title="Shop Smartwatches"
                />

                {/* Hotspot: Bottom Left Up to 50% OFF Card */}
                <Link
                  href="/deals"
                  className="absolute bottom-[14%] left-[2%] w-[32%] h-[16%] rounded-2xl z-10 cursor-pointer"
                  title="Shop Up to 50% OFF Clearance Deals"
                />

                {/* Hotspot: Bottom Right Retro Camera */}
                <Link
                  href="/category/electronics"
                  className="absolute bottom-[10%] right-[4%] w-[30%] h-[24%] rounded-2xl z-10 cursor-pointer"
                  title="Shop Digital Cameras & Tech"
                />

                {/* Hotspot: Bottom Sunglasses */}
                <Link
                  href="/category/fashion"
                  className="absolute bottom-[1%] left-[12%] w-[32%] h-[14%] rounded-2xl z-10 cursor-pointer"
                  title="Shop Designer Sunglasses"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
