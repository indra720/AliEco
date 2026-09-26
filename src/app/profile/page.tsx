"use client";

import React from "react";
import Link from "next/link";
import { Package, Clock, CheckCircle2, Heart, ArrowRight } from "lucide-react";
import { ORDERS } from "@/data/orders";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/common/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice, formatDate } from "@/utils/formatters";

export default function ProfileDashboardPage() {
  const { wishlistCount } = useWishlist();

  const customerOrders = ORDERS.slice(0, 3);
  const totalOrders = ORDERS.length;
  const pendingOrders = ORDERS.filter((o) => o.status !== "delivered" && o.status !== "cancelled").length;
  const deliveredOrders = ORDERS.filter((o) => o.status === "delivered").length;

  const recommendations = PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* 4 Dashboard Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-orange-50 text-oranza flex items-center justify-center mb-3">
            <Package className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-ink-tertiary uppercase tracking-wider block">
            Total Orders
          </span>
          <span className="text-2xl font-black text-ink">{totalOrders}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-ink-tertiary uppercase tracking-wider block">
            In Transit
          </span>
          <span className="text-2xl font-black text-ink">{pendingOrders}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-green-50 text-emerald-600 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-ink-tertiary uppercase tracking-wider block">
            Delivered
          </span>
          <span className="text-2xl font-black text-ink">{deliveredOrders}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center mb-3">
            <Heart className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-ink-tertiary uppercase tracking-wider block">
            Wishlist Items
          </span>
          <span className="text-2xl font-black text-ink">{wishlistCount}</span>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
          <h2 className="text-sm font-bold text-ink uppercase tracking-wider">
            Recent Purchases
          </h2>
          <Link href="/orders" className="text-xs font-bold text-oranza hover:underline flex items-center gap-1">
            View All Orders <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-border">
          {customerOrders.map((order) => (
            <div key={order.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-mono font-bold text-ink block">{order.orderNumber}</span>
                <span className="text-[11px] text-ink-secondary">{formatDate(order.createdAt)} • {order.items.length} item(s)</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-bold text-ink">{formatPrice(order.total)}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {order.status.replace("_", " ")}
                </span>
                <Link href={`/orders/${order.id}`} className="text-oranza font-bold hover:underline">
                  Track
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended for You */}
      <div>
        <h2 className="text-base font-black text-ink mb-4">Recommended For Your Next Upgrade</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendations.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
