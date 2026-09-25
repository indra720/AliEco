"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Tag, Zap, Sparkles } from "lucide-react";

export function PromotionalGrid() {
  return (
    <section className="py-12 bg-white relative">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Banner 1: Weekend Mega Sale */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 text-white p-7 sm:p-8 flex flex-col justify-between min-h-[240px] shadow-lg shadow-black/5 hover:shadow-2xl transition-all duration-300 group border border-neutral-800">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3 shadow-md shadow-orange-500/25">
                <Zap className="w-3.5 h-3.5" /> Weekend Mega Sale
              </span>
              <h3 className="text-2xl font-black tracking-tight leading-snug">
                Up to 50% Off <br />
                Audio & Tech Gear
              </h3>
              <p className="text-xs text-neutral-300 mt-2 font-medium">
                Noise-cancelling headphones, smartwatches & drones.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <Link
                href="/category/electronics"
                className="group/btn inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-brand-orange hover:text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
              >
                <span>Claim Deals</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Decorative background image */}
            <div className="absolute right-0 bottom-0 w-48 h-48 opacity-40 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
              <Image
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80"
                alt=""
                fill
                sizes="192px"
                className="object-contain"
              />
            </div>
          </div>

          {/* Banner 2: New Season Collection */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 border border-orange-200/60 text-gray-900 p-7 sm:p-8 flex flex-col justify-between min-h-[240px] shadow-lg shadow-orange-500/5 hover:shadow-2xl hover:shadow-orange-500/15 transition-all duration-300 group">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3 shadow-md shadow-orange-500/25">
                <Tag className="w-3.5 h-3.5" /> New Season
              </span>
              <h3 className="text-2xl font-black tracking-tight leading-snug text-gray-900">
                Streetwear & <br />
                Athleisure Trends
              </h3>
              <p className="text-xs text-gray-600 mt-2 font-medium">
                Heavyweight tees, running kicks and breathable linen.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <Link
                href="/category/fashion"
                className="group/btn inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 font-bold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/25 transition-all active:scale-95"
              >
                <span>Explore Styles</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Decorative background image */}
            <div className="absolute right-0 bottom-0 w-44 h-44 opacity-80 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
              <Image
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80"
                alt=""
                fill
                sizes="176px"
                className="object-contain"
              />
            </div>
          </div>

          {/* Banner 3: Nordic Living & Decor */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-stone-900 via-neutral-900 to-neutral-950 text-white p-7 sm:p-8 flex flex-col justify-between min-h-[240px] shadow-lg shadow-black/5 hover:shadow-2xl transition-all duration-300 group md:col-span-2 lg:col-span-1 border border-neutral-800">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-orange-400 text-neutral-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3 shadow-md">
                <Sparkles className="w-3.5 h-3.5" /> Home Makeover
              </span>
              <h3 className="text-2xl font-black tracking-tight leading-snug">
                Minimalist Desk <br />
                & Living Space
              </h3>
              <p className="text-xs text-neutral-300 mt-2 font-medium">
                Lamps, memory foam support, and pour-over carafes.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <Link
                href="/category/home-living"
                className="group/btn inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-brand-orange hover:text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
              >
                <span>Shop Home</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Decorative background image */}
            <div className="absolute right-0 bottom-0 w-44 h-44 opacity-40 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
              <Image
                src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&auto=format&fit=crop&q=80"
                alt=""
                fill
                sizes="176px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromotionalGrid;
