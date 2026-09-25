"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, Search, Eye, Filter } from "lucide-react";
import { ORDERS } from "@/data/orders";
import { formatPrice, formatDate } from "@/utils/formatters";
import { useNotification } from "@/context/NotificationContext";
import { OrderStatus } from "@/types";

export default function AdminOrdersPage() {
  const { showToast } = useNotification();
  const [orders, setOrders] = useState(ORDERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (id: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    showToast(`Order status updated to ${newStatus.replace("_", " ")}`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-ink">Master Order Registry</h1>
          <p className="text-xs text-ink-secondary mt-1">
            Track all transactions, fulfillment timelines, customer payments, and logistics
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-border flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-ink-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order # or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-border outline-none focus:border-oranza bg-surface-secondary"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-ink-secondary">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold bg-surface-secondary outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="delivered">Delivered</option>
            <option value="shipped">Shipped</option>
            <option value="processing">Processing</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <span className="text-xs font-bold text-ink ml-2">({filtered.length} orders)</span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-surface-secondary text-ink-tertiary border-b border-border">
              <tr>
                <th className="p-4 font-bold uppercase">Order Number</th>
                <th className="p-4 font-bold uppercase">Customer</th>
                <th className="p-4 font-bold uppercase">Items</th>
                <th className="p-4 font-bold uppercase">Amount</th>
                <th className="p-4 font-bold uppercase">Payment</th>
                <th className="p-4 font-bold uppercase">Date</th>
                <th className="p-4 font-bold uppercase">Current Status</th>
                <th className="p-4 font-bold uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-mono font-bold text-ink">{ord.orderNumber}</td>
                  <td className="p-4">
                    <p className="font-bold text-ink">{ord.customerName}</p>
                    <span className="text-[11px] text-ink-tertiary">{ord.shippingAddress.city}, {ord.shippingAddress.state}</span>
                  </td>
                  <td className="p-4 text-ink-secondary">{ord.items.length} item(s)</td>
                  <td className="p-4 font-black text-ink">{formatPrice(ord.total)}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-700">
                      {ord.paymentMethod}
                    </span>
                  </td>
                  <td className="p-4 text-ink-secondary">{formatDate(ord.createdAt)}</td>
                  <td className="p-4">
                    <select
                      value={ord.status}
                      onChange={(e) => handleUpdateStatus(ord.id, e.target.value as OrderStatus)}
                      className="px-2 py-1 rounded border border-border bg-white text-xs font-semibold outline-none cursor-pointer"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/orders/${ord.id}`}
                      className="inline-flex items-center gap-1 text-oranza font-bold hover:underline"
                    >
                      <Eye className="w-3.5 h-3.5" /> Details
                    </Link>
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
