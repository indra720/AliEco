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

            {/* RIGHT COLUMN: FLOATING FASHION SHOWCASE (CARDLESS & SEAMLESS STUDIO PRESENTATION) */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
              {/* Natural Ambient Aura blending into canvas */}
              <div className="relative w-full max-w-[620px] aspect-[4/3] flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-400/15 via-amber-200/20 to-orange-300/10 rounded-full blur-3xl pointer-events-none" />

                {/* Seamless Floating Products Visual - No Card Box, No Borders, No Shadows */}
                <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                  <Image
                    src="/images/hero-3d-poster.jpg"
                    alt="Floating Fashion Collection: Dress, Handbag, Stilettos, Fragrance, Sunglasses and Loafers"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 620px"
                    className="object-contain rounded-2xl drop-shadow-lg"
                  />

                  {/* Interactive Hotspot 1: Center Phone & Glowing Dress */}
                  <Link
                    href="/category/fashion"
                    className="absolute top-[16%] left-[34%] w-[32%] h-[68%] rounded-3xl cursor-pointer hover:bg-orange-500/10 transition-colors z-10"
                    title="Glowing Bodycon Dress ($180)"
                  >
                    <span className="sr-only">Shop Dress</span>
                  </Link>

                  {/* Interactive Hotspot 2: Quilted Orange Handbag */}
                  <Link
                    href="/category/fashion"
                    className="absolute bottom-[22%] left-[8%] w-[26%] h-[35%] rounded-2xl cursor-pointer hover:bg-orange-500/10 transition-colors z-10"
                    title="Quilted Leather Handbag ($120)"
                  >
                    <span className="sr-only">Shop Handbag</span>
                  </Link>

                  {/* Interactive Hotspot 3: Luxury Perfume */}
                  <Link
                    href="/category/beauty"
                    className="absolute top-[32%] left-[12%] w-[16%] h-[24%] rounded-xl cursor-pointer hover:bg-orange-500/10 transition-colors z-10"
                    title="Luxe Amber Perfume ($95)"
                  >
                    <span className="sr-only">Shop Perfume</span>
                  </Link>

                  {/* Interactive Hotspot 4: High Heels */}
                  <Link
                    href="/category/footwear"
                    className="absolute top-[20%] left-[24%] w-[16%] h-[28%] rounded-xl cursor-pointer hover:bg-orange-500/10 transition-colors z-10"
                    title="Strappy Stiletto Sandals ($350)"
                  >
                    <span className="sr-only">Shop High Heels</span>
                  </Link>

                  {/* Interactive Hotspot 5: Sunglasses & Makeup */}
                  <Link
                    href="/category/fashion"
                    className="absolute top-[24%] right-[14%] w-[28%] h-[36%] rounded-2xl cursor-pointer hover:bg-orange-500/10 transition-colors z-10"
                    title="Designer Sunglasses & Palette ($75)"
                  >
                    <span className="sr-only">Shop Sunglasses & Makeup</span>
                  </Link>

                  {/* Interactive Hotspot 6: Elegant Loafers */}
                  <Link
                    href="/category/footwear"
                    className="absolute bottom-[16%] right-[18%] w-[24%] h-[24%] rounded-xl cursor-pointer hover:bg-orange-500/10 transition-colors z-10"
                    title="Classic Leather Loafers ($75)"
                  >
                    <span className="sr-only">Shop Loafers</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* SEPARATE FASHION PRODUCTS STRIP (SAME DESIGN, DISPLAYED AS INDIVIDUAL PRODUCTS) */}
          <div className="mt-8 pt-6 border-t border-orange-200/60">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse" />
                <h3 className="text-xs sm:text-sm font-black text-gray-900 uppercase tracking-wider">
                  Featured In This Look
                </h3>
              </div>
              <Link
                href="/category/fashion"
                className="text-xs font-bold text-[#FF6A00] hover:text-[#E85D00] flex items-center gap-1 transition-colors"
              >
                <span>View Full Fashion Range</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Individual Separate Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                {
                  id: "item-1",
                  title: "Glow Bodycon Dress",
                  category: "Fashion",
                  price: "$180",
                  tag: "Trending",
                  image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&auto=format&fit=crop&q=80",
                  href: "/category/fashion",
                },
                {
                  id: "item-2",
                  title: "Quilted Leather Bag",
                  category: "Handbags",
                  price: "$120",
                  tag: "Best Seller",
                  image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop&q=80",
                  href: "/category/fashion",
                },
                {
                  id: "item-3",
                  title: "Strappy Stilettos",
                  category: "Footwear",
                  price: "$350",
                  tag: "Luxe",
                  image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&auto=format&fit=crop&q=80",
                  href: "/category/footwear",
                },
                {
                  id: "item-4",
                  title: "Signature Perfume",
                  category: "Beauty",
                  price: "$95",
                  tag: "Exclusive",
                  image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300&auto=format&fit=crop&q=80",
                  href: "/category/beauty",
                },
                {
                  id: "item-5",
                  title: "Cat-Eye Sunglasses",
                  category: "Accessories",
                  price: "$75",
                  tag: "UV400",
                  image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&auto=format&fit=crop&q=80",
                  href: "/category/fashion",
                },
                {
                  id: "item-6",
                  title: "Classic Loafers",
                  category: "Footwear",
                  price: "$75",
                  tag: "Handcrafted",
                  image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=300&auto=format&fit=crop&q=80",
                  href: "/category/footwear",
                },
              ].map((prod) => (
                <Link
                  key={prod.id}
                  href={prod.href}
                  className="group bg-white/90 hover:bg-white rounded-2xl p-2.5 border border-orange-200/70 shadow-xs hover:shadow-md transition-all flex flex-col items-center text-center hover:scale-[1.03]"
                >
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2 bg-[#FFF8F2]">
                    <Image
                      src={prod.image}
                      alt={prod.title}
                      fill
                      sizes="160px"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="absolute top-1 left-1 bg-black/75 text-[9px] font-bold text-white px-1.5 py-0.5 rounded-md backdrop-blur-xs">
                      {prod.tag}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-gray-800 line-clamp-1 w-full group-hover:text-[#FF6A00] transition-colors">
                    {prod.title}
                  </span>
                  <span className="text-xs font-black text-[#FF6A00] mt-0.5">
                    {prod.price}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
