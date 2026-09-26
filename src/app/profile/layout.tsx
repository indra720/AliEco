"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Heart,
  MapPin,
  Star,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { useAuth } from "@/context/AuthContext";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navLinks = [
    { href: "/profile", label: "Dashboard", icon: LayoutDashboard },
    { href: "/orders", label: "My Orders", icon: Package },
    { href: "/wishlist", label: "My Wishlist", icon: Heart },
    { href: "/profile/addresses", label: "Saved Addresses", icon: MapPin },
    { href: "/profile/reviews", label: "My Reviews", icon: Star },
    { href: "/profile/settings", label: "Account Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 bg-surface-secondary/40 py-6 sm:py-8">
        <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Customer Account Sidebar */}
            <aside className="lg:col-span-3 xl:col-span-3 bg-white p-5 rounded-2xl border border-border shadow-sm">
              {/* Profile card summary */}
              <div className="flex items-center gap-3 pb-5 mb-5 border-b border-border">
                <div className="w-12 h-12 rounded-full bg-oranza-50 text-oranza font-bold text-lg flex items-center justify-center flex-shrink-0">
                  {user ? user.name.charAt(0) : "A"}
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-sm text-ink truncate">{user?.name || "Aarav Sharma"}</h3>
                  <p className="text-xs text-ink-secondary truncate">{user?.email || "aarav.sharma@gmail.com"}</p>
                </div>
              </div>

              {/* Navigation links */}
              <nav className="space-y-1 text-xs font-semibold">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all ${
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

              <div className="pt-4 mt-5 border-t border-border">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </aside>

            {/* Profile Children Content */}
            <div className="lg:col-span-9">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
