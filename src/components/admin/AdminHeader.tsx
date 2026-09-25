"use client";

import React from "react";
import { Bell, Search, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function AdminHeader() {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-border px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-black text-ink uppercase tracking-wider hidden sm:block">
          Marketplace Administration
        </h2>
        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Super Admin Mode
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block w-64">
          <Search className="w-3.5 h-3.5 text-ink-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search orders, SKU, users..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-border text-xs outline-none focus:border-oranza bg-surface-secondary"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-ink-secondary hover:text-ink rounded-lg hover:bg-gray-100">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-oranza" />
        </button>

        {/* Admin profile */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center">
            A
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-xs font-bold text-ink block leading-none">
              Operations Lead
            </span>
            <span className="text-[10px] text-ink-secondary">admin@oranza.com</span>
          </div>
        </div>
      </div>
    </header>
  );
}
