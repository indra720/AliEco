"use client";

import React, { useState, useRef } from "react";
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
  const [isRotating, setIsRotating] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

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

  // 3D Mouse Tilt Calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isRotating) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Max tilt: 15deg
    const tiltX = -(y / (rect.height / 2)) * 12;
    const tiltY = (x / (rect.width / 2)) * 12;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    if (!isRotating) {
      setTilt({ x: 0, y: 0 });
    }
  };

  // 360-Degree 3D Rotation Animation Trigger
  const handleTrigger360Spin = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRotating(true);
    setRotationAngle((prev) => prev + 360);
    setTimeout(() => {
      setIsRotating(false);
      setTilt({ x: 0, y: 0 });
    }, 1200);
  };

  return (
    <section className="w-full bg-white py-4 sm:py-6">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Canvas with Warm Linen / Peach Tone matching Screenshot 5 */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FAF0E6] via-[#FDF5ED] to-[#FFF8F2] border border-orange-200/60 p-6 sm:p-10 lg:p-14 shadow-sm">
          {/* Ambient Lighting Accents */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-300/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* LEFT COLUMN: HERO HEADLINE & HIGH-CONTRAST CTAs */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              {/* Season Pill Badge */}
              <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-orange-200 shadow-xs mb-5">
                <Sparkles className="w-4 h-4 text-brand-orange animate-pulse" />
                <span className="text-xs font-black tracking-widest text-brand-orange uppercase">
                  NEW COLLECTION 2026
                </span>
              </div>

              {/* Bold Marketplace Headline matching Screenshot 5 */}
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

              {/* 3D Product Switcher Pills */}
              <div className="w-full pt-2 mb-6">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5 block flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-brand-orange" />
                  Interactive 3D Stage Selection:
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {FEATURED_HERO_PRODUCTS.map((prod, idx) => (
                    <button
                      key={prod.id}
                      onClick={() => {
                        setActiveProductIndex(idx);
                        setRotationAngle((prev) => prev + 360);
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

            {/* RIGHT COLUMN: 3D INTERACTIVE PODIUM & 360° ROTATING SHOWCASE */}
            <div className="lg:col-span-6 relative min-h-[440px] sm:min-h-[480px] flex items-center justify-center">
              {/* 3D Circular Pedestal / Podium Background (Inspired by Screenshot 5) */}
              <div className="absolute bottom-6 sm:bottom-8 w-72 sm:w-96 h-28 sm:h-36 bg-gradient-to-b from-gray-200 via-white to-gray-300 rounded-[50%] shadow-2xl border-4 border-white/80 pointer-events-none transform -rotate-x-12 flex items-center justify-center">
                <div className="w-[85%] h-[80%] rounded-[50%] bg-gradient-to-t from-gray-100 to-white shadow-inner border border-gray-200" />
                <div className="absolute inset-0 rounded-[50%] bg-orange-400/10 blur-xl" />
              </div>

              {/* Floating Top Badge */}
              <div className={`absolute top-2 right-2 sm:right-6 ${currentProduct.badgeColor} px-4 py-2 rounded-full font-black text-xs sm:text-sm tracking-wider shadow-xl flex items-center gap-1.5 z-30 animate-pulse`}>
                <Flame className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span>{currentProduct.badge}</span>
              </div>

              {/* Interactive 360° Spin Trigger Button */}
              <button
                onClick={handleTrigger360Spin}
                className="absolute top-2 left-2 sm:left-6 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gray-200 shadow-md text-xs font-black text-gray-800 hover:text-brand-orange hover:border-brand-orange flex items-center gap-1.5 z-30 transition-all hover:scale-105 active:scale-95"
                title="Click to spin card in 3D 360 degrees"
              >
                <RotateCw className={`w-3.5 h-3.5 text-brand-orange ${isRotating ? "animate-spin" : ""}`} />
                <span>360° 3D Spin</span>
              </button>

              {/* THE 3D PRODUCT CARD with Real-Time Perspective Tilt & 360° Rotation */}
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative z-20 w-72 sm:w-84 bg-white rounded-3xl p-5 shadow-2xl border-4 border-white cursor-pointer transition-transform duration-300 ease-out select-none group"
                style={{
                  perspective: "1200px",
                  transformStyle: "preserve-3d",
                  transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y + rotationAngle}deg) scale3d(1, 1, 1)`,
                  transition: isRotating ? "transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)" : "transform 0.15s ease-out",
                }}
              >
                {/* Product Image Canvas */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-gray-50 via-white to-orange-50/40 p-4 mb-4 flex items-center justify-center border border-gray-100">
                  <Image
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    fill
                    sizes="(max-width: 640px) 280px, 340px"
                    className="object-contain p-2 group-hover:scale-108 transition-transform duration-500 ease-out drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)]"
                    priority
                  />
                  {/* Floating Micro Tag */}
                  <span className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                    3D PREVIEW
                  </span>
                </div>

                {/* Card Information */}
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 font-bold mb-1">
                    <span>{currentProduct.category}</span>
                    <div className="flex items-center gap-1 text-amber-500 font-black">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{currentProduct.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-black text-gray-900 group-hover:text-brand-orange transition-colors line-clamp-1 mb-2">
                    {currentProduct.name}
                  </h3>

                  {/* Feature Highlights Pills */}
                  <div className="flex items-center gap-1.5 mb-4 flex-wrap">
                    {currentProduct.specs.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Price Row & Action */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-black text-brand-orange">
                          {currentProduct.price}
                        </span>
                        <span className="text-xs text-gray-400 line-through font-semibold">
                          {currentProduct.mrp}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600">
                        {currentProduct.discount}
                      </span>
                    </div>

                    <Link
                      href={currentProduct.href}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl text-xs font-black shadow-md shadow-orange-500/30 transition-all flex items-center gap-1.5 active:scale-95"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating Customer Social Proof Badge */}
              <div className="absolute bottom-2 left-2 sm:left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2.5 z-30">
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
