"use client";

import React from "react";
import { CUSTOMERS } from "@/data/customers";
import { formatPrice, formatDate } from "@/utils/formatters";

export default function SellerCustomersPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
        <h1 className="text-xl sm:text-2xl font-black text-ink">Store Customers</h1>
        <p className="text-xs text-ink-secondary mt-1">
          Registered shoppers who purchased from your storefront
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-surface-secondary text-ink-tertiary border-b border-border">
              <tr>
                <th className="p-4 font-bold uppercase">Customer Name</th>
                <th className="p-4 font-bold uppercase">Email</th>
                <th className="p-4 font-bold uppercase">Phone</th>
                <th className="p-4 font-bold uppercase">Total Orders</th>
                <th className="p-4 font-bold uppercase">Total Spend</th>
                <th className="p-4 font-bold uppercase">Status</th>
                <th className="p-4 font-bold uppercase">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {CUSTOMERS.map((cust) => (
                <tr key={cust.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-bold text-ink">{cust.name}</td>
                  <td className="p-4 text-ink-secondary">{cust.email}</td>
                  <td className="p-4 text-ink-secondary">{cust.phone}</td>
                  <td className="p-4 font-semibold text-ink">{cust.totalOrders}</td>
                  <td className="p-4 font-black text-oranza">{formatPrice(cust.totalSpent)}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-green-50 text-green-700">
                      {cust.status}
                    </span>
                  </td>
                  <td className="p-4 text-ink-tertiary">{formatDate(cust.joinedDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
