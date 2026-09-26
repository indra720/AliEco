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
  Star,
  Flame,
} from "lucide-react";

export function HeroBanner() {
  return (
    <section className="w-full bg-white py-1 sm:py-1.5">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Canvas with Warm Peach / Linen Tone matching Screenshot 2 */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FAF0E6] via-[#FDF5ED] to-[#FFF8F2] border border-orange-200/60 px-5 py-4 sm:px-8 sm:py-5 lg:px-10 lg:py-5 shadow-sm">
          {/* Subtle Ambient Lighting */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* LEFT COLUMN: HERO HEADLINE & CTAs (CLEAN, PROPER LINE SPACING & NO TOUCHING) */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              {/* Season Pill Badge */}
              <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-orange-200 shadow-xs mb-3.5">
                <Sparkles className="w-4 h-4 text-[#FF6A00] animate-pulse" />
                <span className="text-xs font-black tracking-widest text-[#FF6A00] uppercase">
                  NEW COLLECTION 2026
                </span>
              </div>

              {/* Bold Marketplace Headline - Relaxed line-height so lines never touch */}
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-black text-gray-950 tracking-tight leading-[1.18] mb-3.5">
                Discover The Best<br />
                <span className="text-[#FF6A00]">Products Online.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed max-w-lg mb-5">
                Shop top-quality products at unbeatable prices across fashion, next-gen electronics, footwear, and beauty with lightning-fast delivery.
              </p>

              {/* High-Contrast Action Buttons */}
              <div className="flex items-center gap-3.5 sm:gap-4 flex-wrap mb-5 w-full sm:w-auto">
                {/* Shop Now Primary Button */}
                <Link
                  href="/products"
                  className="bg-[#FF6A00] hover:bg-[#E85D00] text-white font-black text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-orange-500/35 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.03] active:scale-95 group border-2 border-orange-400/40"
                >
                  <span className="text-white font-extrabold tracking-wide">Shop Now</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Secondary Button */}
                <Link
                  href="/products"
                  className="bg-white hover:bg-gray-50 text-gray-900 font-bold text-sm sm:text-base px-8 py-3.5 rounded-full border border-gray-300 shadow-xs transition-all hover:scale-[1.02] active:scale-95 text-center"
                >
                  Explore Collection
                </Link>
              </div>

              {/* Value Perks Strip */}
              <div className="flex items-center gap-5 sm:gap-7 pt-4 border-t border-orange-200/50 text-xs font-bold text-gray-600 flex-wrap">
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

            {/* RIGHT COLUMN: 3D LUXURY PRODUCTS (COMPACT HEIGHT & BALANCED PROPORTIONS) */}
            <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end py-1 sm:py-2">
              {/* Floating Social Proof Badge (Option 2) - Fills center-left gap with high-trust review score */}
              <div className="hidden sm:flex items-center gap-2.5 absolute top-[42%] -left-2 xl:-left-6 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-orange-200/90 shadow-lg shadow-orange-500/10 hover:scale-105 transition-all">
                <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-gray-900">4.9 / 5.0</span>
                    <span className="text-[10px] font-bold text-[#FF6A00] bg-orange-100/70 px-1.5 py-0.5 rounded-full">Top Rated</span>
                  </div>
                  <p className="text-[11px] font-medium text-gray-500">50K+ Happy Shoppers</p>
                </div>
              </div>

              {/* Floating Launch Offer Pill (Option 2) - Adds promotional excitement */}
              <div className="hidden md:flex items-center gap-2 absolute top-0 right-2 sm:right-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-orange-200/90 shadow-md shadow-orange-500/10 hover:scale-105 transition-all">
                <Flame className="w-4 h-4 text-[#FF6A00] fill-[#FF6A00]" />
                <span className="text-xs font-black text-gray-900">Special Offer: <span className="text-[#FF6A00]">Up to 60% OFF</span></span>
              </div>

              {/* Seamless 3D Floating Products Container - Sleek & compact height */}
              <div className="relative w-full max-w-[540px] xl:max-w-[590px] aspect-[4/3] flex items-center justify-center transition-transform duration-700 ease-out hover:scale-[1.02] group">
                <Image
                  src="/images/hero-products-isolated.png"
                  alt="3D Floating Luxury Products: Quilted Handbag, Wireless Headphones, Smartwatch, Ambre Luxe Perfume, and Designer Sneaker"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 590px"
                  className="object-contain drop-shadow-xl"
                />

                {/* Hotspot 1: Luxury Orange Handbag (Top Left) */}
                <Link
                  href="/category/fashion"
                  className="absolute top-[4%] left-[2%] w-[38%] h-[42%] rounded-3xl z-10 cursor-pointer"
                  title="Shop Luxury Quilted Handbags"
                />

                {/* Hotspot 2: Wireless Over-Ear Headphones (Top Center) */}
                <Link
                  href="/category/electronics"
                  className="absolute top-[4%] left-[44%] w-[28%] h-[38%] rounded-3xl z-10 cursor-pointer"
                  title="Shop Premium Wireless Headphones"
                />

                {/* Hotspot 3: Modern Smartwatch (Middle Right) */}
                <Link
                  href="/category/electronics"
                  className="absolute top-[28%] right-[4%] w-[26%] h-[36%] rounded-3xl z-10 cursor-pointer"
                  title="Shop Smartwatches & Wearables"
                />

                {/* Hotspot 4: Ambre Luxe Perfume (Bottom Left) */}
                <Link
                  href="/category/beauty"
                  className="absolute bottom-[4%] left-[16%] w-[26%] h-[42%] rounded-3xl z-10 cursor-pointer"
                  title="Shop Luxury Fragrances & Perfume"
                />

                {/* Hotspot 5: Designer Sneaker (Bottom Right) */}
                <Link
                  href="/category/footwear"
                  className="absolute bottom-[4%] right-[16%] w-[36%] h-[40%] rounded-3xl z-10 cursor-pointer"
                  title="Shop Designer Sneakers & Footwear"
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
