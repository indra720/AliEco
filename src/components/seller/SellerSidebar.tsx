"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  Users,
  Star,
  Tag,
  BarChart3,
  DollarSign,
  Settings,
  ArrowLeft,
  Store,
  X,
} from "lucide-react";

interface SellerSidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export function SellerSidebar({ isMobile, onClose }: SellerSidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: "/seller", label: "Dashboard", icon: LayoutDashboard },
    { href: "/seller/products", label: "Products", icon: Package },
    { href: "/seller/products/new", label: "Add Product", icon: PlusCircle },
    { href: "/seller/orders", label: "Orders", icon: ShoppingBag },
    { href: "/seller/customers", label: "Customers", icon: Users },
    { href: "/seller/reviews", label: "Reviews", icon: Star },
    { href: "/seller/coupons", label: "Coupons", icon: Tag },
    { href: "/seller/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/seller/earnings", label: "Earnings", icon: DollarSign },
    { href: "/seller/settings", label: "Store Settings", icon: Settings },
  ];

  return (
    <aside
      className={`${
        isMobile
          ? "w-72 bg-white border-r border-border h-full flex flex-col shadow-2xl z-50 overflow-hidden"
          : "w-64 bg-white border-r border-border h-screen sticky top-0 hidden md:flex flex-col flex-shrink-0 select-none overflow-hidden"
      }`}
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-border flex items-center justify-between">
        <Link href="/seller" onClick={onClose} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-oranza text-white font-black text-lg flex items-center justify-center">
            O
          </div>
          <div>
            <span className="font-black text-base tracking-tight text-ink block leading-none">
              ORANZA
            </span>
            <span className="text-[10px] font-bold text-oranza uppercase tracking-wider">
              Seller Central
            </span>
          </div>
        </Link>

        {isMobile && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation - no ugly scrollbar when links fit */}
      <nav className="p-3 space-y-1 text-xs font-semibold flex-1 overflow-y-auto no-scrollbar">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive
                  ? "bg-oranza text-white font-bold shadow-sm"
                  : "text-ink-secondary hover:bg-gray-50 hover:text-ink"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Store info & Back to Customer Storefront */}
      <div className="p-4 border-t border-border bg-gray-50 text-xs">
        <div className="flex items-center gap-2 mb-3">
          <Store className="w-4 h-4 text-oranza shrink-0" />
          <span className="font-bold text-ink truncate">Apex Retail India</span>
        </div>
        <Link
          href="/"
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-border bg-white text-ink hover:text-oranza font-bold text-[11px] transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Storefront
        </Link>
      </div>
    </aside>
  );
}

export default SellerSidebar;
