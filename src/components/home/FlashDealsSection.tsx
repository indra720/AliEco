"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, Clock, ArrowRight, Zap, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/common/ProductCard";
import { PRODUCTS } from "@/data/products";

export function FlashDealsSection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashProducts = PRODUCTS.filter((p) => p.isFlashDeal || p.discountPercent >= 40).slice(0, 5);

  return (
    <section className="py-12 bg-gradient-to-b from-white via-orange-50/30 to-white relative border-b border-gray-100">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Showcase Banner Header */}
        <div className="bg-gradient-to-r from-orange-600 via-brand-orange to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-orange-500/15 mb-8 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-inner">
                <Flame className="w-8 h-8 fill-amber-300 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-black/30 backdrop-blur-md text-amber-300 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-amber-300/30">
                    ⚡ Super Lightning Sale
                  </span>
                  <span className="bg-white text-orange-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-sm">
                    Up to 60% OFF
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
                  Flash Mega Deals
                </h2>
                <p className="text-xs sm:text-sm text-orange-100 font-medium">
                  Verified authentic electronics, watches, and smart gear at limited-time floor prices.
                </p>
              </div>
            </div>

            {/* Countdown Clock & CTA */}
            <div className="flex items-center gap-4 self-start md:self-auto flex-wrap">
              <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-4 py-2.5 flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-amber-300" />
                  <span>Ends in:</span>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-sm sm:text-base font-black">
                  <span className="bg-black/40 text-white px-2.5 py-1 rounded-lg shadow-inner">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-amber-300 font-bold">:</span>
                  <span className="bg-black/40 text-white px-2.5 py-1 rounded-lg shadow-inner">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-amber-300 font-bold">:</span>
                  <span className="bg-black/40 text-amber-300 px-2.5 py-1 rounded-lg shadow-inner">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <Link
                href="/deals"
                className="group inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-orange-50 font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-md transition-all active:scale-95"
              >
                <span>View All Deals</span>
                <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Product Cards Grid: 5 columns on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {flashProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FlashDealsSection;
