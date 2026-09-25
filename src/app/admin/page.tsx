"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  Store,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Filter,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { ORDERS } from "@/data/orders";
import { PRODUCTS } from "@/data/products";
import { SELLERS } from "@/data/sellers";
import { CUSTOMERS } from "@/data/customers";
import { formatPrice } from "@/utils/formatters";

const adminRevenueData = [
  { date: "Day 1", revenue: 145000, orders: 42 },
  { date: "Day 5", revenue: 210000, orders: 65 },
  { date: "Day 10", revenue: 380000, orders: 98 },
  { date: "Day 15", revenue: 490000, orders: 135 },
  { date: "Day 20", revenue: 620000, orders: 180 },
  { date: "Day 25", revenue: 780000, orders: 220 },
  { date: "Day 30", revenue: 950000, orders: 280 },
];

const categorySalesData = [
  { name: "Electronics", value: 45, color: "#FF6A00" },
  { name: "Fashion", value: 25, color: "#FF8A00" },
  { name: "Home & Living", value: 15, color: "#171717" },
  { name: "Beauty", value: 10, color: "#16A34A" },
  { name: "Others", value: 5, color: "#9CA3AF" },
];

export default function AdminDashboardPage() {
  const [dateRange, setDateRange] = useState<"today" | "7days" | "30days" | "3months" | "1year">("30days");

  const totalRevenue = 48500000;
  const totalOrders = 12480;
  const totalCustomers = 8940;
  const totalProducts = 52;
  const totalSellers = SELLERS.length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Welcome & Date Filter */}
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-ink">Marketplace Overview</h1>
          <p className="text-xs text-ink-secondary mt-1">
            Real-time multi-vendor performance and ecosystem health metrics
          </p>
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-1 bg-surface-secondary p-1 rounded-xl border border-border text-xs font-bold text-ink">
          {[
            { id: "today", label: "Today" },
            { id: "7days", label: "7 Days" },
            { id: "30days", label: "30 Days" },
            { id: "3months", label: "3 Months" },
            { id: "1year", label: "1 Year" },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setDateRange(d.id as typeof dateRange)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                dateRange === d.id ? "bg-white text-oranza shadow-sm font-black" : "text-ink-secondary hover:text-ink"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5 High Level Key Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-ink-tertiary uppercase">GMV (Revenue)</span>
            <div className="w-8 h-8 rounded-lg bg-green-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-ink">₹4.85 Cr</div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
            <TrendingUp className="w-3 h-3" /> +24.8% vs last month
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-ink-tertiary uppercase">Total Orders</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-ink">12,480</div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
            <TrendingUp className="w-3 h-3" /> +15.3% this month
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-ink-tertiary uppercase">Shoppers</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-ink">8,940</div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
            <TrendingUp className="w-3 h-3" /> +8.9% new signups
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-ink-tertiary uppercase">Catalog SKUs</span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-oranza flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-ink">52</div>
          <div className="text-[11px] text-ink-secondary mt-1">10 categories live</div>
        </div>

        {/* Card 5 */}
        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm col-span-2 md:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-ink-tertiary uppercase">Active Sellers</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-ink">{totalSellers}</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">9 Approved • 1 Pending</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Analytics (AreaChart) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-black text-sm text-ink uppercase tracking-wider">
                Gross Merchandise Volume (GMV)
              </h3>
              <p className="text-xs text-ink-secondary">Platform sales revenue across all merchants</p>
            </div>
            <span className="text-xs font-bold text-oranza bg-oranza-50 px-2.5 py-1 rounded-lg">
              30-Day Trend
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={adminRevenueData}>
                <defs>
                  <linearGradient id="adminRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6A00" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FF6A00" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#888888" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `₹${val / 1000}k`}
                />
                <Tooltip
                  formatter={(val: number) => [`₹${val.toLocaleString("en-IN")}`, "GMV"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#FF6A00"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#adminRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category (PieChart) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="font-black text-sm text-ink uppercase tracking-wider mb-2">
            Sales By Category
          </h3>
          <p className="text-xs text-ink-secondary mb-4">Volume distribution across verticals</p>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySalesData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                >
                  {categorySalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-border text-xs">
            {categorySalesData.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-ink-secondary">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.name}
                </span>
                <span className="font-bold text-ink">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Sellers & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Sellers Table */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
            <h3 className="font-black text-sm text-ink uppercase tracking-wider">
              Top Marketplace Sellers
            </h3>
            <Link href="/admin/sellers" className="text-xs font-bold text-oranza hover:underline flex items-center gap-1">
              All Sellers <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-ink-tertiary border-b border-border">
                  <th className="pb-3 font-bold uppercase">Store Name</th>
                  <th className="pb-3 font-bold uppercase">Owner</th>
                  <th className="pb-3 font-bold uppercase">Orders</th>
                  <th className="pb-3 font-bold uppercase">Revenue</th>
                  <th className="pb-3 font-bold uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {SELLERS.slice(0, 5).map((seller) => (
                  <tr key={seller.id} className="hover:bg-gray-50/50">
                    <td className="py-3 font-bold text-ink">{seller.storeName}</td>
                    <td className="py-3 text-ink-secondary">{seller.name}</td>
                    <td className="py-3 font-semibold text-ink">{seller.ordersCount}</td>
                    <td className="py-3 font-black text-oranza">{formatPrice(seller.revenue)}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-green-50 text-green-700">
                        {seller.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Converting Products */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
            <h3 className="font-black text-sm text-ink uppercase tracking-wider">
              Top Products By Sales
            </h3>
            <Link href="/admin/products" className="text-xs font-bold text-oranza hover:underline">
              Inventory
            </Link>
          </div>

          <div className="space-y-3">
            {PRODUCTS.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-3 text-xs">
                <div className="overflow-hidden">
                  <p className="font-bold text-ink truncate">{p.title}</p>
                  <span className="text-[11px] text-ink-tertiary">SKU: {p.sku} • {p.reviewCount} reviews</span>
                </div>
                <span className="font-black text-ink flex-shrink-0">{formatPrice(p.price)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
