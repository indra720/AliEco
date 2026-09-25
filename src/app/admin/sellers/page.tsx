"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Store, Check, X, ShieldAlert, Star } from "lucide-react";
import { SELLERS } from "@/data/sellers";
import { formatPrice } from "@/utils/formatters";
import { useNotification } from "@/context/NotificationContext";

export default function AdminSellersPage() {
  const { showToast } = useNotification();
  const [sellers, setSellers] = useState(SELLERS);

  const handleUpdateStatus = (
    id: string,
    newStatus: "pending" | "approved" | "suspended" | "rejected"
  ) => {
    setSellers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    showToast(`Merchant status changed to ${newStatus}`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
        <h1 className="text-xl sm:text-2xl font-black text-ink">Marketplace Merchant Management</h1>
        <p className="text-xs text-ink-secondary mt-1">
          Review onboarding vendor applications, verify KYC, and toggle merchant store statuses
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-surface-secondary text-ink-tertiary border-b border-border">
              <tr>
                <th className="p-4 font-bold uppercase">Store & Merchant</th>
                <th className="p-4 font-bold uppercase">Email & Phone</th>
                <th className="p-4 font-bold uppercase">Products</th>
                <th className="p-4 font-bold uppercase">Orders</th>
                <th className="p-4 font-bold uppercase">Total Revenue</th>
                <th className="p-4 font-bold uppercase">Commission</th>
                <th className="p-4 font-bold uppercase">Status</th>
                <th className="p-4 font-bold uppercase text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sellers.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white border border-border flex-shrink-0">
                        <Image src={s.logo} alt="" fill sizes="40px" className="object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-ink block">{s.storeName}</span>
                        <span className="text-[11px] text-ink-secondary">{s.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-ink-secondary">{s.email}</p>
                    <p className="text-ink-tertiary text-[11px]">{s.phone}</p>
                  </td>
                  <td className="p-4 font-semibold text-ink">{s.productsCount}</td>
                  <td className="p-4 font-semibold text-ink">{s.ordersCount}</td>
                  <td className="p-4 font-black text-oranza">{formatPrice(s.revenue)}</td>
                  <td className="p-4 font-bold text-ink">{s.commissionRate}%</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                        s.status === "approved"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : s.status === "pending"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {s.status !== "approved" && (
                        <button
                          onClick={() => handleUpdateStatus(s.id, "approved")}
                          className="px-2.5 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-[11px] font-bold"
                        >
                          Approve
                        </button>
                      )}
                      {s.status === "approved" && (
                        <button
                          onClick={() => handleUpdateStatus(s.id, "suspended")}
                          className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-[11px] font-bold"
                        >
                          Suspend
                        </button>
                      )}
                      {s.status !== "rejected" && s.status !== "suspended" && (
                        <button
                          onClick={() => handleUpdateStatus(s.id, "rejected")}
                          className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[11px] font-bold"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
