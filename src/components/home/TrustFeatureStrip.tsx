"use client";

import React from "react";
import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

export function TrustFeatureStrip() {
  return (
    <section className="py-10 bg-white border-b border-gray-100 relative">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="flex items-center gap-4 p-5 rounded-3xl bg-orange-50/40 border border-orange-100/70 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-500/25">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Free Express Delivery</h4>
              <p className="text-xs text-gray-500 mt-0.5">On all orders above ₹999 pan-India</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-3xl bg-emerald-50/40 border border-emerald-100/70 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-500/25">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">100% Escrow Protection</h4>
              <p className="text-xs text-gray-500 mt-0.5">UPI, RuPay, Visa, EMI & NetBanking</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-3xl bg-blue-50/40 border border-blue-100/70 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/25">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">7-Day Easy Returns</h4>
              <p className="text-xs text-gray-500 mt-0.5">Instant refunds with doorstep pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-3xl bg-purple-50/40 border border-purple-100/70 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-500/25">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">24/7 Priority Support</h4>
              <p className="text-xs text-gray-500 mt-0.5">Toll-free helpline & quick ticketing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustFeatureStrip;
