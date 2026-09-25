"use client";

import React, { useState } from "react";
import { CUSTOMERS } from "@/data/customers";
import { formatPrice, formatDate } from "@/utils/formatters";
import { useNotification } from "@/context/NotificationContext";

export default function AdminCustomersPage() {
  const { showToast } = useNotification();
  const [customers, setCustomers] = useState(CUSTOMERS);

  const toggleStatus = (id: string, current: string) => {
    const nextStatus = current === "active" ? "blocked" : "active";
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: nextStatus as any } : c))
    );
    showToast(`Customer account set to ${nextStatus}`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
        <h1 className="text-xl sm:text-2xl font-black text-ink">Customer Database</h1>
        <p className="text-xs text-ink-secondary mt-1">
          Registered buyers, customer lifetime value (LTV), and account status control
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-surface-secondary text-ink-tertiary border-b border-border">
              <tr>
                <th className="p-4 font-bold uppercase">Customer</th>
                <th className="p-4 font-bold uppercase">Email</th>
                <th className="p-4 font-bold uppercase">Phone</th>
                <th className="p-4 font-bold uppercase">Orders</th>
                <th className="p-4 font-bold uppercase">Total Spent</th>
                <th className="p-4 font-bold uppercase">Status</th>
                <th className="p-4 font-bold uppercase">Joined</th>
                <th className="p-4 font-bold uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-bold text-ink">{c.name}</td>
                  <td className="p-4 text-ink-secondary">{c.email}</td>
                  <td className="p-4 text-ink-secondary">{c.phone}</td>
                  <td className="p-4 font-semibold text-ink">{c.totalOrders}</td>
                  <td className="p-4 font-black text-oranza">{formatPrice(c.totalSpent)}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        c.status === "active"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-ink-tertiary">{formatDate(c.joinedDate)}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleStatus(c.id, c.status)}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                        c.status === "active"
                          ? "text-red-600 hover:bg-red-50"
                          : "text-green-600 hover:bg-green-50"
                      }`}
                    >
                      {c.status === "active" ? "Block User" : "Activate User"}
                    </button>
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
