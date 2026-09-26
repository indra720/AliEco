"use client";

import React, { useState } from "react";
import { SellerSidebar } from "@/components/seller/SellerSidebar";
import { SellerHeader } from "@/components/seller/SellerHeader";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-surface-secondary text-ink antialiased">
      {/* Desktop Sticky Sidebar - pinned, no unnecessary scrollbar */}
      <SellerSidebar />

      {/* Mobile Off-Canvas Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative z-10 animate-in slide-in-from-left duration-200">
            <SellerSidebar isMobile onClose={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <SellerHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
