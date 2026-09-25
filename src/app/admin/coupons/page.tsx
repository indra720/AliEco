"use client";

import React, { useState } from "react";
import { Tag, Plus, Trash2, Power } from "lucide-react";
import { COUPONS } from "@/data/coupons";
import { Coupon } from "@/types";
import { useNotification } from "@/context/NotificationContext";

export default function AdminCouponsPage() {
  const { showToast } = useNotification();
  const [coupons, setCoupons] = useState<Coupon[]>(COUPONS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [code, setCode] = useState("");
  const [type, setType] = useState<"percentage" | "fixed">("percentage");
  const [value, setValue] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [desc, setDesc] = useState("");

  const toggleCouponActive = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
    showToast("Coupon status toggled");
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !value) return;

    const newCoupon: Coupon = {
      id: `coup-${Date.now()}`,
      code: code.toUpperCase(),
      description: desc || `Discount of ${type === "percentage" ? `${value}%` : `₹${value}`}`,
      discountType: type,
      discountValue: Number(value),
      minOrderValue: Number(minOrder) || 999,
      startDate: "2024-01-01",
      endDate: "2026-12-31",
      usageLimit: 5000,
      usedCount: 0,
      isActive: true,
    };

    setCoupons([newCoupon, ...coupons]);
    setIsModalOpen(false);
    setCode("");
    setValue("");
    setMinOrder("");
    setDesc("");
    showToast(`New coupon ${newCoupon.code} created!`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-ink">Marketplace Coupon Engine</h1>
          <p className="text-xs text-ink-secondary mt-1">
            Global promotional vouchers, minimum order thresholds, and usage caps
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-oranza hover:bg-oranza-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Create Voucher
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-surface-secondary text-ink-tertiary border-b border-border">
              <tr>
                <th className="p-4 font-bold uppercase">Code</th>
                <th className="p-4 font-bold uppercase">Discount</th>
                <th className="p-4 font-bold uppercase">Min Order</th>
                <th className="p-4 font-bold uppercase">Description</th>
                <th className="p-4 font-bold uppercase">Used</th>
                <th className="p-4 font-bold uppercase">Status</th>
                <th className="p-4 font-bold uppercase text-right">Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-mono font-black text-sm text-oranza">{c.code}</td>
                  <td className="p-4 font-bold text-ink">
                    {c.discountType === "percentage" ? `${c.discountValue}%` : `₹${c.discountValue}`}
                  </td>
                  <td className="p-4 text-ink-secondary">₹{c.minOrderValue}</td>
                  <td className="p-4 text-ink-secondary max-w-xs">{c.description}</td>
                  <td className="p-4 font-semibold text-ink">{c.usedCount} / {c.usageLimit}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        c.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {c.isActive ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleCouponActive(c.id)}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                        c.isActive ? "text-amber-600 hover:bg-amber-50" : "text-green-600 hover:bg-green-50"
                      }`}
                    >
                      {c.isActive ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl border border-border p-6 max-w-md w-full shadow-2xl">
            <h2 className="text-base font-black text-ink mb-4 pb-2 border-b border-border">
              Create Campaign Voucher
            </h2>
            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-ink block mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FLASH30"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full font-mono uppercase p-2.5 rounded-lg border border-border outline-none focus:border-oranza"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-ink block mb-1">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as "percentage" | "fixed")}
                    className="w-full p-2.5 rounded-lg border border-border outline-none bg-white cursor-pointer"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-ink block mb-1">Discount Value *</label>
                  <input
                    type="number"
                    required
                    placeholder="25"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-border outline-none focus:border-oranza"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-ink block mb-1">Minimum Cart Value (₹)</label>
                <input
                  type="number"
                  placeholder="1999"
                  value={minOrder}
                  onChange={(e) => setMinOrder(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-border outline-none focus:border-oranza"
                />
              </div>

              <div>
                <label className="font-bold text-ink block mb-1">Description</label>
                <input
                  type="text"
                  placeholder="Short voucher description for checkout"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-border outline-none focus:border-oranza"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-oranza text-white font-bold rounded-lg hover:bg-oranza-600"
                >
                  Create Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
