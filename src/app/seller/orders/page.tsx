"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ORDERS } from "@/data/orders";
import { formatPrice, formatDate } from "@/utils/formatters";
import { useNotification } from "@/context/NotificationContext";
import { OrderStatus } from "@/types";

export default function SellerOrdersPage() {
  const { showToast } = useNotification();
  const [orders, setOrders] = useState(ORDERS);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Order status updated to ${newStatus.replace("_", " ")}`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-ink">Order Fulfillment</h1>
          <p className="text-xs text-ink-secondary mt-1">
            Review customer orders, update tracking status, and manage courier dispatches
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-surface-secondary text-ink-tertiary border-b border-border">
              <tr>
                <th className="p-4 font-bold uppercase">Order #</th>
                <th className="p-4 font-bold uppercase">Customer</th>
                <th className="p-4 font-bold uppercase">Items</th>
                <th className="p-4 font-bold uppercase">Amount</th>
                <th className="p-4 font-bold uppercase">Payment</th>
                <th className="p-4 font-bold uppercase">Date</th>
                <th className="p-4 font-bold uppercase">Status</th>
                <th className="p-4 font-bold uppercase text-right">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-mono font-bold text-ink">{ord.orderNumber}</td>
                  <td className="p-4">
                    <p className="font-bold text-ink">{ord.customerName}</p>
                    <span className="text-[11px] text-ink-tertiary">{ord.shippingAddress.city}</span>
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
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200">
                      {ord.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                      className="px-2 py-1 rounded border border-border bg-white text-xs font-semibold outline-none cursor-pointer"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
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
