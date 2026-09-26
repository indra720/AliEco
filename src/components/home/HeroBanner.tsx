"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Flame,
  ShieldCheck,
  Truck,
  RotateCcw,
  RotateCw,
  Star,
  Zap,
} from "lucide-react";

export function HeroBanner() {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [isFastSpinning, setIsFastSpinning] = useState(false);
  const [isAutoSpin, setIsAutoSpin] = useState(true);

  const FEATURED_HERO_PRODUCTS = [
    {
      id: "hero-watch",
      name: "Quantum Ultra AMOLED Smartwatch",
      category: "Wearables & Tech",
      price: "₹3,499",
      mrp: "₹6,999",
      discount: "Save 50%",
      badge: "Save 50%",
      badgeColor: "bg-gray-950 text-white",
      rating: "4.9",
      reviews: "2.4k",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      specs: ["1.96\" HD AMOLED", "Bluetooth Calling", "7-Day Battery"],
      href: "/category/electronics",
    },
    {
      id: "hero-saree",
      name: "RNN Saree New Pakhi Lata Silk",
      category: "Ethnic Luxury",
      price: "₹1,250",
      mrp: "₹1,999",
      discount: "Save 37%",
      badge: "NEW ARRIVAL",
      badgeColor: "bg-gradient-to-r from-orange-500 to-amber-500 text-white",
      rating: "5.0",
      reviews: "65k+ in stock",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
      specs: ["Cotton Silk Jamdani", "Rich Zari Pallu", "Unstitched Blouse"],
      href: "/products/rnn-saree-new-pakhi-lata-cotton-silk",
    },
    {
      id: "hero-sneaker",
      name: "Nike Air Max Crimson Runner",
      category: "Performance Footwear",
      price: "₹2,499",
      mrp: "₹4,999",
      discount: "Save 50%",
      badge: "BEST SELLER",
      badgeColor: "bg-red-600 text-white",
      rating: "4.9",
      reviews: "1.8k",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
      specs: ["Nitrogen Foam Midsole", "FlyKnit Breathable", "Anti-Abrasion Grip"],
      href: "/category/fashion",
    },
    {
      id: "hero-headphone",
      name: "SoundPro 40dB Hybrid ANC",
      category: "Audiophile Sound",
      price: "₹3,999",
      mrp: "₹5,999",
      discount: "Save 33%",
      badge: "Save 33%",
      badgeColor: "bg-blue-600 text-white",
      rating: "4.8",
      reviews: "3.4k",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      specs: ["40mm Titanium Drivers", "50 Hours Playtime", "Dual ENC Mics"],
      href: "/category/electronics",
    },
  ];

  const currentProduct = FEATURED_HERO_PRODUCTS[activeProductIndex];

  // Trigger quick manual 360 burst
  const handleFastSpinBurst = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFastSpinning(true);
    setTimeout(() => {
      setIsFastSpinning(false);
    }, 1200);
  };

  return (
    <section className="w-full bg-white py-4 sm:py-6">
      {/* Embedded 360-Degree Continuous 3D Product Spin CSS */}
      <style jsx global>{`
        @keyframes autoSpin3DProduct {
          0% {
            transform: perspective(1200px) rotateY(0deg) translateY(0px);
          }
          50% {
            transform: perspective(1200px) rotateY(180deg) translateY(-10px);
          }
          100% {
            transform: perspective(1200px) rotateY(360deg) translateY(0px);
          }
        }
        @keyframes fastSpin3DBurst {
          0% {
            transform: perspective(1200px) rotateY(0deg) scale(1.05);
          }
          100% {
            transform: perspective(1200px) rotateY(720deg) scale(1);
          }
        }
        .product-360-spin {
          animation: autoSpin3DProduct 14s linear infinite;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .product-360-fast-spin {
          animation: fastSpin3DBurst 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .product-360-paused {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Canvas with Warm Linen / Peach Tone */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FAF0E6] via-[#FDF5ED] to-[#FFF8F2] border border-orange-200/60 p-6 sm:p-10 lg:p-14 shadow-sm">
          {/* Ambient Lighting Accents */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-300/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LEFT COLUMN: HERO HEADLINE & HIGH-CONTRAST CTAs */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              {/* Season Pill Badge */}
              <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-orange-200 shadow-xs mb-5">
                <Sparkles className="w-4 h-4 text-brand-orange animate-pulse" />
                <span className="text-xs font-black tracking-widest text-brand-orange uppercase">
                  NEW COLLECTION 2026
                </span>
              </div>

              {/* Bold Marketplace Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-black text-gray-950 tracking-tight leading-[1.08] mb-4">
                Discover The Best<br />
                <span className="text-brand-orange">Products Online.</span>
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
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white font-black text-sm sm:text-base px-8 py-4 rounded-full shadow-lg shadow-orange-500/35 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.03] active:scale-95 group border-2 border-orange-400/40"
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

              {/* 3D Product Stage Switcher */}
              <div className="w-full pt-2 mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-brand-orange" />
                    Select 3D Rotating Product:
                  </span>
                  <button
                    onClick={() => setIsAutoSpin(!isAutoSpin)}
                    className="text-[11px] font-bold text-brand-orange hover:underline flex items-center gap-1"
                  >
                    <RotateCw className="w-3 h-3" />
                    <span>{isAutoSpin ? "Auto-Spin: ON" : "Auto-Spin: PAUSED"}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {FEATURED_HERO_PRODUCTS.map((prod, idx) => (
                    <button
                      key={prod.id}
                      onClick={() => {
                        setActiveProductIndex(idx);
                        setIsFastSpinning(true);
                        setTimeout(() => setIsFastSpinning(false), 900);
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        activeProductIndex === idx
                          ? "bg-brand-orange text-white shadow-md shadow-orange-500/25 scale-105"
                          : "bg-white/90 text-gray-700 hover:bg-white border border-gray-200"
                      }`}
                    >
                      <span>{prod.name.split(" ")[0]}</span>
                      <span className="text-[10px] opacity-80">({prod.price})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Value Perks Strip */}
              <div className="flex items-center gap-5 sm:gap-7 pt-5 border-t border-orange-200/50 text-xs font-bold text-gray-600 flex-wrap">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-brand-orange shrink-0" />
                  <span>Free Express Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-orange shrink-0" />
                  <span>100% Genuine Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-brand-orange shrink-0" />
                  <span>7-Day Easy Returns</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: 3D LUXURY PODIUM & PRODUCT ITSELF ROTATING 360 DEGREES AUTOMATICALLY */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
              {/* Floating Top Badge */}
              <div className={`absolute top-0 right-2 sm:right-6 ${currentProduct.badgeColor} px-4 py-2 rounded-full font-black text-xs sm:text-sm tracking-wider shadow-xl flex items-center gap-1.5 z-30 animate-pulse`}>
                <Flame className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span>{currentProduct.badge}</span>
              </div>

              {/* Interactive 360° Fast Spin Button */}
              <button
                onClick={handleFastSpinBurst}
                className="absolute top-0 left-2 sm:left-6 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gray-200 shadow-md text-xs font-black text-gray-800 hover:text-brand-orange hover:border-brand-orange flex items-center gap-1.5 z-30 transition-all hover:scale-105 active:scale-95"
                title="Click to spin product 360 degrees"
              >
                <RotateCw className={`w-3.5 h-3.5 text-brand-orange ${isFastSpinning ? "animate-spin" : ""}`} />
                <span>360° Spin Burst</span>
              </button>

              {/* 3D PRODUCT SHOWCASE STAGE */}
              <div className="relative w-full max-w-md flex flex-col items-center pt-8 pb-4">
                {/* 3D Floating & 360° Auto-Rotating Product Cutout Container */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center z-20">
                  <div
                    className={`relative w-full h-full flex items-center justify-center cursor-pointer ${
                      isFastSpinning
                        ? "product-360-fast-spin"
                        : isAutoSpin
                        ? "product-360-spin"
                        : "product-360-paused"
                    }`}
                  >
                    <Image
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      fill
                      sizes="(max-width: 640px) 260px, 340px"
                      className="object-contain p-3 drop-shadow-[0_25px_35px_rgba(0,0,0,0.22)]"
                      priority
                    />
                  </div>
                </div>

                {/* 3D Circular Podium / Pedestal (Directly beneath the rotating product) */}
                <div className="relative -mt-16 w-72 sm:w-88 h-24 bg-gradient-to-b from-gray-200 via-white to-gray-300 rounded-[50%] shadow-2xl border-4 border-white/90 flex items-center justify-center z-10 pointer-events-none">
                  {/* Inner podium bevel ring */}
                  <div className="w-[88%] h-[82%] rounded-[50%] bg-gradient-to-t from-gray-100 via-white to-gray-50 shadow-inner border border-gray-200 flex items-center justify-center">
                    {/* Glowing ambient center light reflection */}
                    <div className="w-[60%] h-[50%] rounded-[50%] bg-gradient-to-r from-orange-400/20 via-amber-300/30 to-orange-400/20 blur-md" />
                  </div>
                  {/* Podium Base Contact Shadow */}
                  <div className="absolute -bottom-3 w-[92%] h-6 bg-black/15 blur-lg rounded-[50%]" />
                </div>

                {/* Clean, Fixed Stationary Product Info Card Beneath the Podium */}
                <div className="w-full mt-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xl z-20">
                  <div className="flex items-center justify-between text-xs text-gray-500 font-bold mb-1">
                    <span className="uppercase tracking-wider text-brand-orange">{currentProduct.category}</span>
                    <div className="flex items-center gap-1 text-amber-500 font-black">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{currentProduct.rating}</span>
                      <span className="text-gray-400 font-normal">({currentProduct.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-gray-900 line-clamp-1">
                        {currentProduct.name}
                      </h3>
                      {/* Specs pills */}
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        {currentProduct.specs.map((spec, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="flex items-baseline gap-1.5 justify-end">
                        <span className="text-xs text-gray-400 line-through font-semibold">
                          {currentProduct.mrp}
                        </span>
                        <span className="text-lg sm:text-xl font-black text-brand-orange">
                          {currentProduct.price}
                        </span>
                      </div>
                      <Link
                        href={currentProduct.href}
                        className="inline-flex items-center gap-1 text-xs font-black text-brand-orange hover:underline mt-0.5"
                      >
                        <span>View Product</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Customer Social Proof Badge */}
              <div className="absolute -bottom-2 left-2 sm:left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2.5 z-30">
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
                  <span className="text-[10px] text-gray-400 font-medium">12k+ Verified Shoppers</span>
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
