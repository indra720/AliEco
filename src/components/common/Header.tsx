"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  MapPin,
  ChevronDown,
  Menu,
  X,
  ArrowLeftRight,
  ShieldCheck,
  Store,
  Layers,
  Sparkles,
  Flame,
  LogOut,
  Package,
  Globe,
  ArrowRight,
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const accountDropdownRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { compareCount } = useCompare();
  const { user, role, switchRole, logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
      {/* 1. TOP PROMOTIONAL BANNER */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-500 text-white text-xs sm:text-sm py-2 px-4 font-semibold">
        <div className="max-w-[1580px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-white text-red-600 text-[11px] font-black uppercase px-2.5 py-0.5 rounded shadow-xs tracking-wider">
              Super September
            </span>
            <span className="hidden sm:inline">
              Limited-time only: up to <strong>60% OFF</strong> across 50,000+ certified products
            </span>
          </div>

          <Link
            href="/deals"
            className="flex items-center gap-1.5 hover:underline text-xs sm:text-sm font-bold bg-white/20 hover:bg-white/30 px-3 py-0.5 rounded-full transition-all"
          >
            <span>Get now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Mobile Trigger & Brand Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-gray-800 hover:text-brand-orange focus:outline-none"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-orange-600 via-brand-orange to-amber-500 flex items-center justify-center text-white font-black text-2xl shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform">
              O
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl sm:text-3xl tracking-tight text-gray-900 leading-none">
                ORAN<span className="text-brand-orange">ZA</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">
                Discover. Shop. Upgrade.
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Sleek Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!searchQuery.trim()) return;
              router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            }}
            className="relative flex items-center w-full"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands, categories..."
              className="w-full bg-gray-50 hover:bg-gray-100 focus:bg-white text-gray-900 text-xs sm:text-sm pl-4 pr-12 py-2.5 rounded-full border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-gray-400 font-medium"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3.5 bg-brand-orange hover:bg-brand-orange-dark text-white rounded-full flex items-center justify-center transition-colors shadow-xs"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Center-Right: Delivery Pincode, Language/Currency & Portal Switcher */}
        <div className="hidden xl:flex items-center gap-5 text-xs text-gray-700 font-medium">
          {/* Deliver to India */}
          <div className="flex items-center gap-2 cursor-pointer hover:text-brand-orange transition-colors">
            <span className="text-base">🇮🇳</span>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[10px] text-gray-400 uppercase font-semibold">Deliver to:</span>
              <span className="font-bold text-gray-900">India, 400011</span>
            </div>
          </div>

          {/* Quick Portal Switcher (Customer / Seller / Admin) */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200">
            <span className="text-gray-400 text-[10px] font-bold px-1.5 uppercase">Portal:</span>
            <button
              onClick={() => switchRole("customer")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                role === "customer"
                  ? "bg-brand-orange text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Customer
            </button>
            <button
              onClick={() => {
                switchRole("seller");
                router.push("/seller");
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                role === "seller"
                  ? "bg-brand-orange text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Seller
            </button>
            <button
              onClick={() => {
                switchRole("admin");
                router.push("/admin");
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                role === "admin"
                  ? "bg-brand-orange text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Right: Cart, Wishlist, Sign in & Join Free */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative p-2 text-gray-700 hover:text-brand-orange transition-colors hidden sm:flex items-center gap-1 font-semibold text-xs"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            <span className="hidden xl:inline">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2 text-gray-700 hover:text-brand-orange transition-colors flex items-center gap-1.5 font-semibold text-xs"
            title="Shopping Cart"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-800" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-brand-orange text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-bold text-gray-900">Cart</span>
          </Link>

          {/* User Account / Sign In */}
          <div ref={accountDropdownRef} className="relative">
            {user ? (
              <button
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                className="flex items-center gap-2 p-1 sm:px-3 sm:py-1.5 rounded-xl border border-gray-200 hover:border-brand-orange transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-[10px] text-gray-400 uppercase font-bold leading-tight">
                    {user.role}
                  </span>
                  <span className="text-xs font-bold text-gray-900 leading-tight truncate max-w-[90px]">
                    {user.name.split(" ")[0]}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden lg:block" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-gray-700 hover:text-brand-orange px-3 py-2"
                >
                  <User className="w-4 h-4" /> Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md shadow-orange-500/20 transition-all active:scale-95"
                >
                  Join Free
                </Link>
              </div>
            )}

            {/* Dropdown Menu */}
            {isAccountDropdownOpen && user && (
              <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2.5 border-b border-gray-100">
                  <p className="text-xs font-bold text-gray-900">{user.name}</p>
                  <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-orange-50 text-brand-orange text-[10px] font-black uppercase rounded-full">
                    Role: {user.role}
                  </span>
                </div>

                <div className="py-1.5 text-xs font-semibold">
                  <Link
                    href="/profile"
                    onClick={() => setIsAccountDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-orange-50/50 text-gray-700 hover:text-brand-orange transition-colors"
                  >
                    <User className="w-4 h-4 text-gray-400" /> My Profile
                  </Link>
                  <Link
                    href="/orders"
                    onClick={() => setIsAccountDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-orange-50/50 text-gray-700 hover:text-brand-orange transition-colors"
                  >
                    <Package className="w-4 h-4 text-gray-400" /> My Orders
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={() => setIsAccountDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-orange-50/50 text-gray-700 hover:text-brand-orange transition-colors"
                  >
                    <Heart className="w-4 h-4 text-gray-400" /> Wishlist
                  </Link>
                  <Link
                    href="/seller"
                    onClick={() => {
                      switchRole("seller");
                      setIsAccountDropdownOpen(false);
                    }}
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-orange-50/50 text-gray-700 hover:text-brand-orange transition-colors"
                  >
                    <Store className="w-4 h-4 text-brand-orange" /> Seller Dashboard
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => {
                      switchRole("admin");
                      setIsAccountDropdownOpen(false);
                    }}
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-orange-50/50 text-gray-700 hover:text-brand-orange transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-blue-600" /> Admin Hub
                  </Link>
                </div>

                <div className="pt-1.5 border-t border-gray-100">
                  <button
                    onClick={() => {
                      logout();
                      setIsAccountDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 text-left font-semibold transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. SECONDARY CATEGORY / SUB-NAV STRIP */}
      <div className="bg-gray-50 border-t border-gray-200 text-xs sm:text-sm hidden lg:block">
        <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* All Categories Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-2 text-gray-900 font-bold px-3 py-3 hover:text-brand-orange transition-colors"
              >
                <Menu className="w-4 h-4" />
                <span>All categories</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isCategoryMenuOpen && (
                <div
                  onMouseLeave={() => setIsCategoryMenuOpen(false)}
                  className="absolute left-0 top-full w-64 bg-white border border-gray-100 shadow-2xl rounded-b-2xl py-2 z-50 animate-in fade-in duration-150"
                >
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      onClick={() => setIsCategoryMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 text-xs text-gray-700 hover:bg-orange-50/70 hover:text-brand-orange transition-colors font-medium"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-gray-400 font-semibold">({cat.productCount})</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <span className="text-gray-300">|</span>

            {/* Quick Links */}
            <nav className="flex items-center gap-1 font-semibold text-gray-700">
              <Link href="/deals" className="px-3 py-3 text-brand-orange flex items-center gap-1 hover:text-brand-orange-dark transition-colors font-bold">
                <Flame className="w-3.5 h-3.5" /> Super Deals
              </Link>
              <Link href="/products" className="px-3 py-3 hover:text-brand-orange transition-colors">
                All Products
              </Link>
              <Link href="/brands" className="px-3 py-3 hover:text-brand-orange transition-colors">
                Verified Brands
              </Link>
              <Link href="/new-arrivals" className="px-3 py-3 hover:text-brand-orange transition-colors">
                New Arrivals
              </Link>
              <Link href="/best-sellers" className="px-3 py-3 hover:text-brand-orange transition-colors">
                Best Sellers
              </Link>
              <Link href="/category/electronics" className="px-3 py-3 hover:text-brand-orange transition-colors">
                Electronics
              </Link>
              <Link href="/category/fashion" className="px-3 py-3 hover:text-brand-orange transition-colors">
                Fashion
              </Link>
              <Link href="/category/home-living" className="px-3 py-3 hover:text-brand-orange transition-colors">
                Home & Living
              </Link>
            </nav>
          </div>

          {/* Right Sub-nav links */}
          <div className="flex items-center gap-4 text-xs font-semibold text-gray-600">
            <Link href="/about" className="hover:text-brand-orange transition-colors">About ORANZA</Link>
            <Link href="/faq" className="hover:text-brand-orange transition-colors">Help Center</Link>
            <Link href="/seller" className="text-brand-orange font-bold hover:underline">Sell on ORANZA</Link>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-200">
          <div className="w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col overflow-y-auto">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-500 to-amber-500 text-white">
              <div className="font-black text-lg">ORANZA Menu</div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 hover:bg-white/20 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 border-b border-gray-100 bg-gray-50 text-xs">
              <p className="font-bold text-gray-900">{user?.name || "Welcome Guest"}</p>
              <p className="text-gray-500">{user?.email || "Sign in for orders & deals"}</p>
              <div className="mt-2.5 flex gap-1">
                <button
                  onClick={() => switchRole("customer")}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold ${role === "customer" ? "bg-brand-orange text-white" : "bg-white border"}`}
                >
                  Customer
                </button>
                <button
                  onClick={() => {
                    switchRole("seller");
                    router.push("/seller");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold ${role === "seller" ? "bg-brand-orange text-white" : "bg-white border"}`}
                >
                  Seller
                </button>
                <button
                  onClick={() => {
                    switchRole("admin");
                    router.push("/admin");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold ${role === "admin" ? "bg-brand-orange text-white" : "bg-white border"}`}
                >
                  Admin
                </button>
              </div>
            </div>

            <div className="p-4 flex flex-col gap-3 text-sm font-bold text-gray-800">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-orange">
                Home
              </Link>
              <Link href="/deals" onClick={() => setIsMobileMenuOpen(false)} className="text-brand-orange font-bold">
                🔥 Super Deals
              </Link>
              <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-orange">
                All Products
              </Link>
              <Link href="/brands" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-orange">
                Verified Brands
              </Link>
              <Link href="/seller" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-orange">
                Sell on ORANZA
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
