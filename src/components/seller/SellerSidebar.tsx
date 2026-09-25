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
} from "lucide-react";

export function SellerSidebar() {
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
    <aside className="w-64 bg-white border-r border-border min-h-screen flex flex-col flex-shrink-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-border flex items-center justify-between">
        <Link href="/seller" className="flex items-center gap-2">
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
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1 text-xs font-semibold flex-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive
                  ? "bg-oranza text-white font-bold shadow-sm"
                  : "text-ink-secondary hover:bg-gray-50 hover:text-ink"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Store info & Back to Customer Storefront */}
      <div className="p-4 border-t border-border bg-gray-50 text-xs">
        <div className="flex items-center gap-2 mb-3">
          <Store className="w-4 h-4 text-oranza" />
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
