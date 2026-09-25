"use client";

import React, { useState } from "react";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  Trash2,
  CheckCheck,
  Send,
  Filter,
} from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";

interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: "order" | "seller" | "inventory" | "system" | "security";
  severity: "info" | "warning" | "success" | "critical";
  timestamp: string;
  read: boolean;
  target: "all" | "sellers" | "customers" | "admins";
}

const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: "notif-1",
    title: "New Vendor KYC Application Received",
    message: "Artisan Leather Crafts submitted GST and PAN documents for verification.",
    type: "seller",
    severity: "warning",
    timestamp: "10 mins ago",
    read: false,
    target: "admins",
  },
  {
    id: "notif-2",
    title: "High Value Order Placed: ₹1,29,900",
    message: "Customer Arjun Verma completed order #ORZ-9021 for Apple MacBook Air M2.",
    type: "order",
    severity: "success",
    timestamp: "28 mins ago",
    read: false,
    target: "admins",
  },
  {
    id: "notif-3",
    title: "Low Inventory Alert: Sony WH-1000XM5",
    message: "Current stock level has dropped below the threshold (only 2 units remaining).",
    type: "inventory",
    severity: "critical",
    timestamp: "1 hour ago",
    read: true,
    target: "sellers",
  },
  {
    id: "notif-4",
    title: "Scheduled System Maintenance",
    message: "Platform database indexing and CDN cache refresh scheduled for tonight at 02:00 AM IST.",
    type: "system",
    severity: "info",
    timestamp: "3 hours ago",
    read: true,
    target: "all",
  },
  {
    id: "notif-5",
    title: "Suspicious Login Attempt Detected",
    message: "Failed multi-factor attempt flagged from IP 185.220.101.5 for admin operator account.",
    type: "security",
    severity: "critical",
    timestamp: "5 hours ago",
    read: true,
    target: "admins",
  },
];

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);
  const [filterType, setFilterType] = useState<string>("all");
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [broadcastData, setBroadcastData] = useState({
    title: "",
    message: "",
    target: "all" as "all" | "sellers" | "customers",
    severity: "info" as "info" | "warning" | "success" | "critical",
  });

  const { addNotification } = useNotifications();

  const filtered = notifications.filter((n) => {
    if (filterType === "all") return true;
    if (filterType === "unread") return !n.read;
    return n.type === filterType;
  });

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addNotification({
      type: "success",
      title: "All Notifications Marked Read",
      message: "You have reviewed all pending administrative alerts.",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastData.title || !broadcastData.message) return;

    const newBroadcast: SystemNotification = {
      id: `notif-${Date.now()}`,
      title: broadcastData.title,
      message: broadcastData.message,
      type: "system",
      severity: broadcastData.severity,
      timestamp: "Just now",
      read: false,
      target: broadcastData.target,
    };

    setNotifications([newBroadcast, ...notifications]);
    setIsBroadcastModalOpen(false);
    setBroadcastData({ title: "", message: "", target: "all", severity: "info" });
    addNotification({
      type: "success",
      title: "Broadcast Published",
      message: `System notification pushed to ${broadcastData.target} user group successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="w-6 h-6 text-brand-orange" />
            System Notifications & Broadcasts
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time administrative security alerts, platform events, and broadcast announcements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition"
          >
            <CheckCheck className="w-4 h-4 text-emerald-600" />
            Mark all read
          </button>
          <button
            onClick={() => setIsBroadcastModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold rounded-xl shadow-sm transition"
          >
            <Send className="w-4 h-4" />
            New Broadcast
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {["all", "unread", "order", "seller", "inventory", "security", "system"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
              filterType === type
                ? "bg-brand-orange text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-100"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-gray-700">No notifications</h3>
            <p className="text-sm text-gray-400 mt-1">There are no alerts matching this filter.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`p-5 flex items-start gap-4 transition hover:bg-gray-50/80 ${
                !item.read ? "bg-orange-50/30" : ""
              }`}
            >
              <div className="mt-1">
                {item.severity === "critical" && (
                  <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                )}
                {item.severity === "warning" && (
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                )}
                {item.severity === "success" && (
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}
                {item.severity === "info" && (
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Info className="w-5 h-5" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className={`text-sm font-semibold ${!item.read ? "text-gray-900 font-bold" : "text-gray-800"}`}>
                    {item.title}
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {item.type}
                  </span>
                  <span className="text-[10px] font-medium text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.timestamp}
                  </span>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-brand-orange inline-block" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.message}</p>
              </div>

              <button
                onClick={() => deleteNotification(item.id)}
                className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-gray-100 transition"
                title="Dismiss"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Broadcast Modal */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Create System Broadcast</h2>
            <p className="text-xs text-gray-500 mb-5">
              Send an administrative notification to marketplace customers, sellers, or all users.
            </p>

            <form onSubmit={handleSendBroadcast} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Recipient Audience
                </label>
                <select
                  value={broadcastData.target}
                  onChange={(e) => setBroadcastData({ ...broadcastData, target: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                >
                  <option value="all">Everyone (Marketplace-wide)</option>
                  <option value="sellers">Verified Sellers Only</option>
                  <option value="customers">Registered Customers Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Alert Severity
                </label>
                <select
                  value={broadcastData.severity}
                  onChange={(e) => setBroadcastData({ ...broadcastData, severity: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                >
                  <option value="info">Informational (Blue)</option>
                  <option value="success">Success / Promotion (Green)</option>
                  <option value="warning">Notice / Maintenance (Amber)</option>
                  <option value="critical">Critical / Action Required (Red)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Notification Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scheduled Diwali Festive Sale Window"
                  value={broadcastData.title}
                  onChange={(e) => setBroadcastData({ ...broadcastData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Message Body
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detailed announcement details..."
                  value={broadcastData.message}
                  onChange={(e) => setBroadcastData({ ...broadcastData, message: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsBroadcastModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-orange hover:bg-brand-orange-dark text-white rounded-xl text-sm font-semibold shadow-sm transition"
                >
                  Dispatch Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
