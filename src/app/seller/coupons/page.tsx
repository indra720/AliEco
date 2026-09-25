"use client";

import React, { useState } from "react";
import { Tag, Plus, Check } from "lucide-react";
import { COUPONS } from "@/data/coupons";
import { useNotification } from "@/context/NotificationContext";

export default function SellerCouponsPage() {
  const { showToast } = useNotification();
  const [coupons, setCoupons] = useState(COUPONS);
  const [isCreating, setIsCreating] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [minOrder, setMinOrder] = useState("");

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode || !discountValue) return;

    const created = {
      id: `coup-${Date.now()}`,
      code: newCode.toUpperCase(),
      description: `Special merchant discount of ${discountValue}% off`,
      discountType: "percentage" as const,
      discountValue: Number(discountValue),
      minOrderValue: Number(minOrder) || 999,
      startDate: "2024-01-01",
      endDate: "2026-12-31",
      usageLimit: 1000,
      usedCount: 0,
      isActive: true,
    };

    setCoupons([created, ...coupons]);
    setIsCreating(false);
    setNewCode("");
    setDiscountValue("");
    showToast(`Coupon ${created.code} activated!`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-ink">Store Coupons & Discounts</h1>
          <p className="text-xs text-ink-secondary mt-1">
            Create promotional discount codes to boost conversions
          </p>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="bg-oranza hover:bg-oranza-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreateCoupon} className="p-6 bg-white rounded-2xl border border-border shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-ink uppercase tracking-wider">New Store Discount Code</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-ink block mb-1">Coupon Code *</label>
              <input
                type="text"
                required
                placeholder="e.g. SUMMER20"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="w-full uppercase font-mono p-2.5 rounded-lg border border-border outline-none focus:border-oranza"
              />
            </div>
            <div>
              <label className="font-bold text-ink block mb-1">Discount (%) *</label>
              <input
                type="number"
                required
                placeholder="20"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-border outline-none focus:border-oranza"
              />
            </div>
            <div>
              <label className="font-bold text-ink block mb-1">Min Order Value (₹)</label>
              <input
                type="number"
                placeholder="1499"
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-border outline-none focus:border-oranza"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-oranza text-white font-bold rounded-lg hover:bg-oranza-600"
            >
              Publish Coupon
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((c) => (
          <div key={c.id} className="p-5 bg-white rounded-2xl border border-border shadow-sm text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-black text-base text-oranza bg-oranza-50 px-2 py-0.5 rounded">
                {c.code}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${c.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {c.isActive ? "Active" : "Expired"}
              </span>
            </div>
            <p className="text-ink-secondary">{c.description}</p>
            <div className="pt-2 border-t border-border flex justify-between text-[11px] text-ink-tertiary">
              <span>Used: {c.usedCount} times</span>
              <span>Min Order: ₹{c.minOrderValue}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
