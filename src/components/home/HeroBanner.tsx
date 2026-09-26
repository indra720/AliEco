"use client";

import React, { useState, useEffect } from "react";
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
  Compass,
} from "lucide-react";

const WATCH_360_ANGLES = [
  {
    degree: "0°",
    title: "Front Display",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    description: "1.96\" AMOLED Always-On Screen",
  },
  {
    degree: "45°",
    title: "Isometric Stand",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80",
    description: "Aerospace Zinc-Alloy Bezel",
  },
  {
    degree: "90°",
    title: "Digital Crown",
    image: "https://images.unsplash.com/photo-1510017803434-a899398421b3?w=800&auto=format&fit=crop&q=80",
    description: "Tactile Haptic Navigation Dial",
  },
  {
    degree: "180°",
    title: "Display Profile",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80",
    description: "BioSensor Heart Rate & SpO2",
  },
  {
    degree: "270°",
    title: "Dynamic Arc",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80",
    description: "Curved Ceramic Glass Shield",
  },
];

export function HeroBanner() {
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);

  // Smooth automatic 360-degree angle change every 2.4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAngleIndex((prev) => (prev + 1) % WATCH_360_ANGLES.length);
    }, 2400);

    return () => clearInterval(timer);
  }, []);

  const currentAngle = WATCH_360_ANGLES[activeAngleIndex];

  return (
    <section className="w-full bg-white py-4 sm:py-6">
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

                {/* Secondary Button with High Contrast */}
                <Link
                  href="/products"
                  className="bg-white hover:bg-gray-100 text-gray-900 font-bold text-sm sm:text-base px-8 py-4 rounded-full border border-gray-300 shadow-xs transition-all hover:scale-[1.02] active:scale-95 text-center"
                >
                  Explore Collection
                </Link>
              </div>

              {/* 360 Turntable Live Status Pill */}
              <div className="inline-flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-orange-200 shadow-xs mb-6">
                <Compass className="w-4 h-4 text-[#FF6A00] animate-spin" style={{ animationDuration: "8s" }} />
                <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                  <span className="text-[#FF6A00] font-black">{currentAngle.degree}</span>
                  <span className="text-gray-300">|</span>
                  <span>{currentAngle.title}</span>
                  <span className="text-gray-400 font-normal hidden sm:inline">({currentAngle.description})</span>
                </div>
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

            {/* RIGHT COLUMN: 3D LUXURY PODIUM WITH SMARTWATCH ROTATING 360° AUTOMATICALLY */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
              {/* Floating Top Badge */}
              <div className="absolute top-0 right-2 sm:right-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-full font-black text-xs sm:text-sm tracking-wider shadow-xl flex items-center gap-1.5 z-30 animate-pulse">
                <Flame className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span>360° TURNTABLE</span>
              </div>

              {/* 3D PRODUCT SHOWCASE STAGE */}
              <div className="relative w-full max-w-md flex flex-col items-center pt-8 pb-4">
                {/* 3D Floating Watch with Smooth Angle Transitions */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center z-20">
                  {WATCH_360_ANGLES.map((angleItem, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                        activeAngleIndex === idx
                          ? "opacity-100 scale-100 rotate-0 pointer-events-auto"
                          : "opacity-0 scale-95 rotate-3 pointer-events-none"
                      }`}
                    >
                      <Image
                        src={angleItem.image}
                        alt={`Smartwatch ${angleItem.degree}`}
                        fill
                        sizes="(max-width: 640px) 260px, 340px"
                        className="object-contain p-2 rounded-2xl drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)] animate-float"
                        priority={idx === 0}
                      />
                    </div>
                  ))}
                </div>

                {/* 3D Circular Podium / Pedestal (Directly beneath the rotating watch) */}
                <div className="relative -mt-16 w-72 sm:w-88 h-24 bg-gradient-to-b from-gray-200 via-white to-gray-300 rounded-[50%] shadow-2xl border-4 border-white/90 flex items-center justify-center z-10 pointer-events-none">
                  {/* Inner podium bevel ring */}
                  <div className="w-[88%] h-[82%] rounded-[50%] bg-gradient-to-t from-gray-100 via-white to-gray-50 shadow-inner border border-gray-200 flex items-center justify-center">
                    {/* Glowing ambient center light reflection */}
                    <div className="w-[60%] h-[50%] rounded-[50%] bg-gradient-to-r from-orange-400/20 via-amber-300/30 to-orange-400/20 blur-md" />
                  </div>
                  {/* Podium Base Contact Shadow */}
                  <div className="absolute -bottom-3 w-[92%] h-6 bg-black/15 blur-lg rounded-[50%]" />
                </div>

                {/* Interactive 360° Angle Degree Indicator Strip */}
                <div className="flex items-center gap-2 mt-4 z-20">
                  {WATCH_360_ANGLES.map((ang, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveAngleIndex(i)}
                      className={`px-3 py-1 rounded-full text-[11px] font-black transition-all ${
                        activeAngleIndex === i
                          ? "bg-[#FF6A00] text-white shadow-md shadow-orange-500/30 scale-105"
                          : "bg-white/80 text-gray-600 hover:bg-white border border-gray-200"
                      }`}
                    >
                      {ang.degree}
                    </button>
                  ))}
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
