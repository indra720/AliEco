"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, ChevronRight, Truck, Clock, Eye, RotateCcw } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ORDERS } from "@/data/orders";
import { formatPrice, formatDate } from "@/utils/formatters";

export default function OrdersPage() {
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredOrders = ORDERS.filter((o) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "in_transit") {
      return o.status === "shipped" || o.status === "out_for_delivery" || o.status === "processing";
    }
    return o.status === filterStatus;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 bg-surface-secondary/40 py-6 sm:py-8">
        <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-black text-ink">My Orders</h1>
              <p className="text-xs text-ink-secondary mt-0.5">
                Track shipments, view invoices and manage returns
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-border shadow-sm overflow-x-auto text-xs font-bold text-ink-secondary">
              {[
                { id: "all", label: "All Orders" },
                { id: "in_transit", label: "In Transit" },
                { id: "delivered", label: "Delivered" },
                { id: "cancelled", label: "Cancelled" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterStatus(tab.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    filterStatus === tab.id ? "bg-oranza text-white shadow-sm" : "hover:text-ink"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const statusColors = {
                delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
                out_for_delivery: "bg-amber-50 text-amber-700 border-amber-200",
                shipped: "bg-blue-50 text-blue-700 border-blue-200",
                processing: "bg-purple-50 text-purple-700 border-purple-200",
                confirmed: "bg-indigo-50 text-indigo-700 border-indigo-200",
                cancelled: "bg-red-50 text-red-700 border-red-200",
                returned: "bg-gray-50 text-gray-700 border-gray-200",
                refunded: "bg-teal-50 text-teal-700 border-teal-200",
                pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
              };

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-border p-5 sm:p-6 shadow-sm hover:border-oranza/40 transition-colors"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border text-xs">
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-ink-tertiary block text-[10px] uppercase font-bold">
                          Order Number
                        </span>
                        <span className="font-mono font-bold text-ink">{order.orderNumber}</span>
                      </div>
                      <span className="text-gray-300">|</span>
                      <div>
                        <span className="text-ink-tertiary block text-[10px] uppercase font-bold">
                          Order Date
                        </span>
                        <span className="font-semibold text-ink">{formatDate(order.createdAt)}</span>
                      </div>
                      <span className="text-gray-300 hidden sm:inline">|</span>
                      <div className="hidden sm:block">
                        <span className="text-ink-tertiary block text-[10px] uppercase font-bold">
                          Total Amount
                        </span>
                        <span className="font-black text-oranza">{formatPrice(order.total)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2.5 py-1 text-xs font-bold uppercase rounded-md border ${
                          statusColors[order.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status.replace("_", " ")}
                      </span>

                      <Link
                        href={`/orders/${order.id}`}
                        className="flex items-center gap-1 text-xs font-bold text-oranza hover:underline"
                      >
                        Details <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Order Items List */}
                  <div className="py-4 divide-y divide-border/60">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-14 rounded-lg bg-surface-secondary overflow-hidden border border-border flex-shrink-0">
                            <Image
                              src={item.thumbnail}
                              alt={item.title}
                              fill
                              sizes="56px"
                              className="object-contain p-1"
                            />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-ink line-clamp-1">{item.title}</p>
                            <p className="text-[11px] text-ink-secondary">
                              Qty: {item.quantity} • Sold by: {item.sellerName}
                            </p>
                          </div>
                        </div>

                        <span className="text-xs font-bold text-ink flex-shrink-0">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Order Bottom Action Bar */}
                  <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-ink-secondary">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-oranza" />
                      {order.status === "delivered" ? "Delivered to resident" : `Courier: ${order.courierName || "Express Courier"}`}
                    </span>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/orders/${order.id}`}
                        className="px-3 py-1.5 rounded-lg border border-border bg-surface-secondary hover:bg-gray-100 text-ink font-semibold text-xs transition-colors"
                      >
                        Track Shipment
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
