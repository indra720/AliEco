"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Award,
  Users,
  Store,
  Star,
  Tag,
  Sliders,
  Bell,
  Settings,
  ArrowLeft,
  ShieldCheck,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isMobile, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/categories", label: "Categories", icon: Layers },
    { href: "/admin/brands", label: "Brands", icon: Award },
    { href: "/admin/customers", label: "Customers", icon: Users },
    { href: "/admin/sellers", label: "Sellers", icon: Store },
    { href: "/admin/reviews", label: "Reviews", icon: Star },
    { href: "/admin/coupons", label: "Coupons", icon: Tag },
    { href: "/admin/cms", label: "CMS & Banners", icon: Sliders },
    { href: "/admin/notifications", label: "Notifications", icon: Bell },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={`${
        isMobile
          ? "w-72 bg-[#111111] text-neutral-300 h-full flex flex-col shadow-2xl z-50 overflow-hidden"
          : "w-64 bg-[#111111] text-neutral-300 h-screen sticky top-0 hidden md:flex flex-col flex-shrink-0 border-r border-neutral-800 select-none overflow-hidden"
      }`}
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
        <Link href="/admin" onClick={onClose} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-oranza text-white font-black text-lg flex items-center justify-center">
            O
          </div>
          <div>
            <span className="font-black text-base tracking-tight text-white block leading-none">
              ORANZA
            </span>
            <span className="text-[10px] font-bold text-oranza uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Admin Hub
            </span>
          </div>
        </Link>

        {isMobile && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav list - no ugly scrollbar when links fit */}
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
                  ? "bg-oranza text-white font-bold shadow-md"
                  : "text-neutral-400 hover:bg-neutral-800/60 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Storefront return button */}
      <div className="p-4 border-t border-neutral-800 bg-neutral-950 text-xs">
        <Link
          href="/"
          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white hover:border-oranza font-bold text-[11px] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Customer Store
        </Link>
      </div>
    </aside>
  );
}

export default AdminSidebar;
