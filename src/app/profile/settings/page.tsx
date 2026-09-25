"use client";

import React, { useState } from "react";
import { User, Bell, Shield, Save } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";

export default function AccountSettingsPage() {
  const { user } = useAuth();
  const { showToast } = useNotification();

  const [name, setName] = useState(user?.name || "Aarav Sharma");
  const [email, setEmail] = useState(user?.email || "aarav.sharma@gmail.com");
  const [phone, setPhone] = useState("+91 98199 11223");
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [dealAlerts, setDealAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Profile settings updated successfully!");
  };

  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
      <div className="pb-4 mb-6 border-b border-border">
        <h1 className="text-lg font-black text-ink">Account Settings</h1>
        <p className="text-xs text-ink-secondary">Manage your contact information and communication preferences</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs max-w-xl">
        <div className="space-y-4">
          <h3 className="font-bold text-ink uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-oranza" /> Personal Information
          </h3>

          <div>
            <label className="font-bold text-ink block mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
            />
          </div>

          <div>
            <label className="font-bold text-ink block mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
            />
          </div>

          <div>
            <label className="font-bold text-ink block mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="pt-6 border-t border-border space-y-3">
          <h3 className="font-bold text-ink uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-oranza" /> Notification Preferences
          </h3>

          <label className="flex items-center justify-between p-3 rounded-lg border border-border bg-surface-secondary cursor-pointer">
            <div>
              <span className="font-bold text-ink block">Order Tracking SMS & WhatsApp Alerts</span>
              <span className="text-[11px] text-ink-secondary">Receive dispatch, delivery, and OTP notifications</span>
            </div>
            <input
              type="checkbox"
              checked={orderAlerts}
              onChange={(e) => setOrderAlerts(e.target.checked)}
              className="accent-oranza w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg border border-border bg-surface-secondary cursor-pointer">
            <div>
              <span className="font-bold text-ink block">Promotional & Price Drop Updates</span>
              <span className="text-[11px] text-ink-secondary">Get notified when wishlisted items go on sale</span>
            </div>
            <input
              type="checkbox"
              checked={dealAlerts}
              onChange={(e) => setDealAlerts(e.target.checked)}
              className="accent-oranza w-4 h-4"
            />
          </label>
        </div>

        <button
          type="submit"
          className="bg-oranza hover:bg-oranza-600 text-white font-bold text-xs px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-sm"
        >
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </form>
    </div>
  );
}
