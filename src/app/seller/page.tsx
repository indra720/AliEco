"use client";

import React from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  Clock,
  ArrowUpRight,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { ORDERS } from "@/data/orders";
import { PRODUCTS } from "@/data/products";
import { formatPrice, formatDate } from "@/utils/formatters";

const revenueData = [
  { month: "Jan", revenue: 420000, orders: 120 },
  { month: "Feb", revenue: 580000, orders: 165 },
  { month: "Mar", revenue: 790000, orders: 210 },
  { month: "Apr", revenue: 640000, orders: 180 },
  { month: "May", revenue: 890000, orders: 250 },
  { month: "Jun", revenue: 1120000, orders: 310 },
  { month: "Jul", revenue: 1248000, orders: 340 },
];

export default function SellerDashboardPage() {
  const sellerOrders = ORDERS.slice(0, 5);
  const sellerProducts = PRODUCTS.filter((p) => p.sellerId === "seller-1").slice(0, 5);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-ink">
            Welcome back, Vikram!
          </h1>
          <p className="text-xs text-ink-secondary mt-1">
            Here's what is happening with Apex Retail India store today.
          </p>
        </div>

        <Link
          href="/seller/products/new"
          className="bg-oranza hover:bg-oranza-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          + Add New Product
        </Link>
      </div>

      {/* 5 Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-ink-tertiary uppercase">Total Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-green-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-ink">₹1.24 Cr</div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
            <TrendingUp className="w-3 h-3" /> +18.4% vs last month
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-ink-tertiary uppercase">Total Orders</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-ink">3,840</div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
            <TrendingUp className="w-3 h-3" /> +12.1% this week
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-ink-tertiary uppercase">Active Products</span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-oranza flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-ink">42</div>
          <div className="text-[11px] text-ink-secondary mt-1">Across 4 categories</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-ink-tertiary uppercase">Pending Orders</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-ink">14</div>
          <div className="text-[11px] text-amber-600 font-bold mt-1">Requires dispatch</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm col-span-2 md:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-ink-tertiary uppercase">Store Rating</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
              ★
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-ink">4.9 / 5.0</div>
          <div className="text-[11px] text-ink-secondary mt-1">From 950+ buyers</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Analytics (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-black text-sm text-ink uppercase tracking-wider">
                Store Revenue Growth
              </h3>
              <p className="text-xs text-ink-secondary">Monthly sales performance in INR</p>
            </div>
            <span className="text-xs font-bold text-oranza bg-oranza-50 px-2.5 py-1 rounded-lg">
              2024 Year-to-Date
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="sellerRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6A00" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#FF6A00" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888888" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `₹${val / 100000}L`}
                />
                <Tooltip
                  formatter={(val: number) => [`₹${val.toLocaleString("en-IN")}`, "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#FF6A00"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#sellerRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders Bar Chart (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-border shadow-sm">
          <div className="mb-6">
            <h3 className="font-black text-sm text-ink uppercase tracking-wider">
              Order Volume
            </h3>
            <p className="text-xs text-ink-secondary">Orders fulfilled per month</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888888" fontSize={11} tickLine={false} />
                <YAxis stroke="#888888" fontSize={11} tickLine={false} />
                <Tooltip />
                <Bar dataKey="orders" fill="#171717" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Store Orders */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
            <h3 className="font-black text-sm text-ink uppercase tracking-wider">
              Recent Store Orders
            </h3>
            <Link href="/seller/orders" className="text-xs font-bold text-oranza hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-ink-tertiary border-b border-border">
                  <th className="pb-3 font-bold uppercase">Order</th>
                  <th className="pb-3 font-bold uppercase">Customer</th>
                  <th className="pb-3 font-bold uppercase">Amount</th>
                  <th className="pb-3 font-bold uppercase">Status</th>
                  <th className="pb-3 font-bold uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sellerOrders.map((ord) => (
                  <tr key={ord.id}>
                    <td className="py-3 font-bold text-ink">{ord.orderNumber}</td>
                    <td className="py-3 text-ink-secondary">{ord.customerName}</td>
                    <td className="py-3 font-bold text-ink">{formatPrice(ord.total)}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {ord.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Link href={`/orders/${ord.id}`} className="text-oranza font-bold hover:underline">
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
            <h3 className="font-black text-sm text-ink uppercase tracking-wider">
              Top Selling Products
            </h3>
            <Link href="/seller/products" className="text-xs font-bold text-oranza hover:underline">
              Inventory
            </Link>
          </div>

          <div className="space-y-3">
            {sellerProducts.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-3 text-xs">
                <div className="overflow-hidden">
                  <p className="font-bold text-ink truncate">{p.title}</p>
                  <span className="text-[11px] text-ink-tertiary">Stock: {p.stockCount} units</span>
                </div>
                <span className="font-black text-oranza flex-shrink-0">{formatPrice(p.price)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
