"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="w-full bg-[#111111] text-gray-400 text-xs border-t border-neutral-800 mt-auto">
      {/* Upper Newsletter Bar */}
      <div className="border-b border-neutral-800 bg-[#171717] py-8">
        <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col text-center md:text-left">
            <span className="text-white text-base md:text-lg font-bold">
              Join the ORANZA Privilege Club
            </span>
            <span className="text-gray-400 text-xs mt-0.5">
              Subscribe to unlock secret coupons, flash sale previews, and product updates.
            </span>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md items-center gap-2">
            <div className="relative flex-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full bg-neutral-900 border border-neutral-700 text-white rounded-lg px-4 py-2.5 text-xs outline-none focus:border-oranza"
              />
            </div>
            <button
              type="submit"
              className="bg-oranza hover:bg-oranza-600 text-white font-bold px-5 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors flex-shrink-0"
            >
              {subscribed ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Subscribed!
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" /> Subscribe
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main 5-Column Content */}
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Column 1: Brand Info */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-oranza text-white font-black text-xl flex items-center justify-center">
                O
              </div>
              <span className="text-white text-xl font-black tracking-tight">
                ORAN<span className="text-oranza">ZA</span>
              </span>
            </Link>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Discover. Shop. Upgrade. India's trusted modern multi-vendor marketplace connecting verified sellers with discerning shoppers.
            </p>
            <div className="flex flex-col gap-2 pt-2 text-[11px]">
              <span className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-oranza flex-shrink-0" />
                BKC, Mumbai, Maharashtra 400051
              </span>
              <span className="flex items-center gap-2 text-gray-300">
                <Phone className="w-3.5 h-3.5 text-oranza flex-shrink-0" />
                1800-419-ORANZA (Toll Free)
              </span>
              <span className="flex items-center gap-2 text-gray-300">
                <Mail className="w-3.5 h-3.5 text-oranza flex-shrink-0" />
                care@oranza.com
              </span>
            </div>
          </div>

          {/* Column 2: Shop Links */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1">
              Shop Categories
            </h4>
            <Link href="/category/electronics" className="hover:text-white transition-colors">Electronics & Audio</Link>
            <Link href="/category/fashion" className="hover:text-white transition-colors">Fashion & Apparel</Link>
            <Link href="/category/home-living" className="hover:text-white transition-colors">Home & Living</Link>
            <Link href="/category/beauty" className="hover:text-white transition-colors">Beauty & Personal Care</Link>
            <Link href="/category/sports-fitness" className="hover:text-white transition-colors">Sports & Fitness</Link>
            <Link href="/deals" className="text-oranza hover:underline font-semibold">Today's Deals</Link>
            <Link href="/best-sellers" className="hover:text-white transition-colors">Best Sellers</Link>
          </div>

          {/* Column 3: Customer Service */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1">
              Customer Care
            </h4>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link>
            <Link href="/faq" className="hover:text-white transition-colors">Help Center & FAQ</Link>
            <Link href="/shipping-policy" className="hover:text-white transition-colors">Shipping & Delivery</Link>
            <Link href="/return-policy" className="hover:text-white transition-colors">Returns & Refunds</Link>
            <Link href="/orders" className="hover:text-white transition-colors">Track Your Order</Link>
            <Link href="/compare" className="hover:text-white transition-colors">Product Comparison</Link>
          </div>

          {/* Column 4: About ORANZA */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1">
              About ORANZA
            </h4>
            <Link href="/about" className="hover:text-white transition-colors">Our Story & Mission</Link>
            <Link href="/careers" className="hover:text-white transition-colors">Careers (We're Hiring!)</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Marketplace Insights Blog</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/seller" className="text-oranza hover:underline font-semibold">Sell on ORANZA</Link>
          </div>

          {/* Column 5: Portals & Trust */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1">
              Partner Hub
            </h4>
            <p className="text-[11px] text-gray-400">
              Grow your ecommerce business with ORANZA's nationwide logistics and seller support.
            </p>
            <Link
              href="/seller"
              className="mt-1 inline-flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-2 px-3 rounded-lg border border-neutral-700 transition-colors"
            >
              Seller Dashboard
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-2 px-3 rounded-lg border border-neutral-700 transition-colors"
            >
              Admin Operations
            </Link>
            <div className="pt-2 text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              100% Secure 256-Bit SSL Checkout
            </div>
          </div>
        </div>

        {/* Bottom Bar: Payments & Copyright */}
        <div className="border-t border-neutral-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} ORANZA Marketplace India Ltd. All rights reserved. Fictional brand prototype.
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-gray-500 text-[10px] uppercase font-bold mr-1">Accepted Payments:</span>
            <span className="px-2 py-0.5 bg-neutral-800 rounded text-gray-300 font-bold text-[10px]">UPI</span>
            <span className="px-2 py-0.5 bg-neutral-800 rounded text-gray-300 font-bold text-[10px]">VISA</span>
            <span className="px-2 py-0.5 bg-neutral-800 rounded text-gray-300 font-bold text-[10px]">Mastercard</span>
            <span className="px-2 py-0.5 bg-neutral-800 rounded text-gray-300 font-bold text-[10px]">RuPay</span>
            <span className="px-2 py-0.5 bg-neutral-800 rounded text-gray-300 font-bold text-[10px]">NetBanking</span>
            <span className="px-2 py-0.5 bg-neutral-800 rounded text-gray-300 font-bold text-[10px]">Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

