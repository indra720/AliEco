"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, PackageCheck, Home, Calendar } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { formatPrice } from "@/utils/formatters";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "ORZ-89101";
  const rawTotal = searchParams.get("total");
  const total = rawTotal ? Number(rawTotal) : 5668;

  return (
    <div className="max-w-xl w-full mx-4 bg-white rounded-2xl border border-border p-6 sm:p-10 shadow-sm text-center">
      {/* Success Icon */}
      <div className="w-20 h-20 rounded-full bg-green-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 ring-8 ring-green-100">
        <CheckCircle2 className="w-12 h-12" />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-1 block">
        Payment Verified
      </span>
      <h1 className="text-2xl sm:text-3xl font-black text-ink mb-2">
        Order Placed Successfully!
      </h1>
      <p className="text-xs sm:text-sm text-ink-secondary mb-6">
        Thank you for shopping on ORANZA. We have received your order and sent a confirmation SMS and email with invoice details.
      </p>

      {/* Order Details Highlight Box */}
      <div className="bg-surface-secondary rounded-xl p-4 sm:p-5 text-xs text-left space-y-3 mb-8 border border-border">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <span className="text-ink-secondary">Order ID:</span>
          <span className="font-mono font-bold text-ink text-sm">{orderId}</span>
        </div>
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <span className="text-ink-secondary flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-oranza" /> Estimated Delivery:
          </span>
          <span className="font-bold text-ink">In 2 - 3 Days (Blue Dart Express)</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-ink-secondary">Total Amount Paid:</span>
          <span className="font-black text-oranza text-base">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Action CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/orders"
          className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-oranza hover:bg-oranza-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <PackageCheck className="w-4 h-4" /> Track My Order
        </Link>
        <Link
          href="/products"
          className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-white hover:bg-gray-50 border border-border text-ink font-bold text-xs flex items-center justify-center gap-2 transition-all hover:border-oranza"
        >
          <Home className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 bg-surface-secondary/40 py-12 flex items-center justify-center">
        <Suspense fallback={<div className="p-8 text-center text-sm text-gray-500">Loading order summary...</div>}>
          <OrderSuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
