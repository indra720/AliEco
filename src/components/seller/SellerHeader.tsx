"use client";

import React from "react";
import Image from "next/image";
import { Bell, Search, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function SellerHeader() {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-border px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-black text-ink uppercase tracking-wider hidden sm:block">
          Merchant Operations
        </h2>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          Store Live & Accepting Orders
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Available Balance Pill */}
        <div className="hidden md:flex items-center gap-2 bg-oranza-50 border border-oranza-200 px-3 py-1.5 rounded-xl text-xs">
          <span className="text-ink-secondary">Net Balance:</span>
          <span className="font-black text-oranza">₹3,42,850</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-ink-secondary hover:text-ink rounded-lg hover:bg-gray-100">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-oranza" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-oranza text-white font-bold text-xs flex items-center justify-center">
            V
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-xs font-bold text-ink block leading-none">
              Vikram Malhotra
            </span>
            <span className="text-[10px] text-ink-secondary">Apex Retail India</span>
          </div>
        </div>
      </div>
    </header>
  );
}
