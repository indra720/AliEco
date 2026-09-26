"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  CreditCard,
  Download,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ORDERS } from "@/data/orders";
import { formatPrice, formatDate } from "@/utils/formatters";

export default function OrderDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const order = ORDERS.find((o) => o.id === id) || ORDERS[0];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 bg-surface-secondary/40 py-6 sm:py-8">
        <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/orders"
            className="inline-flex items-center gap-1 text-xs font-bold text-ink-secondary hover:text-oranza mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to My Orders
          </Link>

          {/* Top Order Summary Card */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
              <div>
                <span className="text-xs font-bold text-oranza uppercase tracking-wider block mb-1">
                  Order Details
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-ink">
                  {order.orderNumber}
                </h1>
                <p className="text-xs text-ink-secondary mt-1">
                  Placed on {formatDate(order.createdAt)} • Payment via {order.paymentMethod} ({order.paymentStatus})
                </p>
              </div>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-xs font-bold text-ink hover:bg-surface-secondary transition-colors"
              >
                <Download className="w-4 h-4 text-oranza" /> Download Invoice
              </button>
            </div>

            {/* Shipment Timeline */}
            <div className="pt-6">
              <h2 className="text-sm font-bold text-ink uppercase tracking-wider mb-6 flex items-center gap-2">
                <Truck className="w-4 h-4 text-oranza" /> Delivery Status & Timeline
              </h2>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                {order.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] ${
                        step.completed ? "bg-emerald-600 ring-4 ring-emerald-50" : "bg-gray-300"
                      }`}
                    >
                      {step.completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-bold text-ink">{step.title}</span>
                        {step.timestamp && (
                          <span className="text-[11px] text-ink-tertiary">{step.timestamp}</span>
                        )}
                      </div>
                      <p className="text-xs text-ink-secondary mt-0.5">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details Grid: Address, Payment, Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {/* Address */}
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm text-xs">
              <h3 className="font-bold text-ink uppercase tracking-wider mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-oranza" /> Shipping Address
              </h3>
              <p className="font-bold text-ink text-sm mb-1">{order.shippingAddress.fullName}</p>
              <p className="text-ink-secondary">{order.shippingAddress.street}</p>
              <p className="text-ink-secondary">
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
              <p className="text-ink-secondary mt-2">Phone: {order.shippingAddress.phone}</p>
            </div>

            {/* Payment & Charges */}
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm text-xs">
              <h3 className="font-bold text-ink uppercase tracking-wider mb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-oranza" /> Order Breakdown
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-ink-secondary">
                  <span>Subtotal</span>
                  <span className="font-semibold text-ink">{formatPrice(order.subtotal)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({order.couponCode || "Coupon"})</span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-ink-secondary">
                  <span>Shipping</span>
                  <span className="font-semibold text-emerald-600">
                    {order.shippingFee === 0 ? "FREE" : formatPrice(order.shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-ink-secondary">
                  <span>GST (5%)</span>
                  <span className="font-semibold text-ink">{formatPrice(order.tax)}</span>
                </div>
                <div className="pt-2 border-t border-border flex justify-between font-black text-ink text-sm">
                  <span>Total Paid</span>
                  <span className="text-oranza text-base">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Items Purchased */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
            <h3 className="font-bold text-sm text-ink uppercase tracking-wider mb-4 pb-3 border-b border-border">
              Purchased Items
            </h3>
            <div className="divide-y divide-border">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-xl bg-surface-secondary overflow-hidden border border-border flex-shrink-0">
                      <Image src={item.thumbnail} alt="" fill sizes="64px" className="object-contain p-2" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-ink">{item.title}</h4>
                      <p className="text-[11px] text-ink-secondary mt-0.5">
                        Qty: {item.quantity} • Sold by {item.sellerName}
                      </p>
                      {item.variantName && (
                        <span className="text-[10px] text-ink-tertiary">Variant: {item.variantName}</span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-black text-sm text-ink">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
