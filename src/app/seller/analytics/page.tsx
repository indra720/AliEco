"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const analyticsData = [
  { day: "Mon", visitors: 2400, pageViews: 6800, sales: 52000 },
  { day: "Tue", visitors: 3100, pageViews: 8900, sales: 74000 },
  { day: "Wed", visitors: 2800, pageViews: 7400, sales: 61000 },
  { day: "Thu", visitors: 3900, pageViews: 11200, sales: 98000 },
  { day: "Fri", visitors: 4600, pageViews: 13500, sales: 125000 },
  { day: "Sat", visitors: 5800, pageViews: 16800, sales: 172000 },
  { day: "Sun", visitors: 6200, pageViews: 18400, sales: 195000 },
];

const categoryShare = [
  { name: "Electronics", value: 65, color: "#FF6A00" },
  { name: "Audio", value: 20, color: "#FF8A00" },
  { name: "Accessories", value: 15, color: "#171717" },
];

export default function SellerAnalyticsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
        <h1 className="text-xl sm:text-2xl font-black text-ink">Store Analytics & Traffic</h1>
        <p className="text-xs text-ink-secondary mt-1">
          Detailed metrics on visitor acquisition, page views, and conversion rates
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visitors vs PageViews */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="font-black text-sm text-ink uppercase tracking-wider mb-4">
            Daily Visitors & Page Views
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#888888" fontSize={11} tickLine={false} />
                <YAxis stroke="#888888" fontSize={11} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="visitors" stroke="#FF6A00" strokeWidth={2.5} name="Unique Visitors" />
                <Line type="monotone" dataKey="pageViews" stroke="#171717" strokeWidth={2.5} name="Page Views" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="font-black text-sm text-ink uppercase tracking-wider mb-4">
            Sales by Sub-Category
          </h3>
          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryShare} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} label>
                  {categoryShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-xs font-semibold mt-2">
            {categoryShare.map((c) => (
              <span key={c.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                {c.name} ({c.value}%)
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
