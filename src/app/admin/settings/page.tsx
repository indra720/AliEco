"use client";

import React, { useState } from "react";
import {
  Save,
  Globe,
  Shield,
  CreditCard,
  Truck,
  Mail,
  BellRing,
  Database,
  Building,
  CheckCircle,
} from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";

export default function AdminSettingsPage() {
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState<"general" | "payments" | "shipping" | "tax" | "security">("general");

  const [formData, setFormData] = useState({
    marketplaceName: "ORANZA Marketplace",
    tagline: "Discover. Shop. Upgrade.",
    supportEmail: "support@oranza.in",
    adminContact: "+91 98765 43210",
    defaultCurrency: "INR (₹)",
    marketplaceFeePercent: 7.5,
    autoApproveSellers: false,
    enableRazorpay: true,
    enableCashOnDelivery: true,
    enableUPI: true,
    freeShippingThreshold: 999,
    standardShippingFee: 99,
    standardGstRate: 18,
    twoFactorEnforced: true,
    sessionTimeoutMins: 60,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification({
      type: "success",
      title: "Configuration Updated",
      message: "Marketplace parameters and payment rules have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Settings & Configurations</h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure global marketplace policies, gateway credentials, tax rules, and commission schedules.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white rounded-xl font-semibold shadow-sm transition"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-gray-200 pb-2">
        {[
          { id: "general", label: "General & Branding", icon: Globe },
          { id: "payments", label: "Payment Gateways", icon: CreditCard },
          { id: "shipping", label: "Shipping & Logistics", icon: Truck },
          { id: "tax", label: "GST & Commission", icon: Building },
          { id: "security", label: "Security & Access", icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
                activeTab === tab.id
                  ? "bg-brand-orange text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        {activeTab === "general" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-3">Marketplace Brand & Identity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Marketplace Name
                </label>
                <input
                  type="text"
                  value={formData.marketplaceName}
                  onChange={(e) => setFormData({ ...formData, marketplaceName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Customer Support Email
                </label>
                <input
                  type="email"
                  value={formData.supportEmail}
                  onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Admin Helpline Contact
                </label>
                <input
                  type="text"
                  value={formData.adminContact}
                  onChange={(e) => setFormData({ ...formData, adminContact: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Default Platform Currency
                </label>
                <select
                  value={formData.defaultCurrency}
                  onChange={(e) => setFormData({ ...formData, defaultCurrency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                >
                  <option value="INR (₹)">Indian Rupee (INR ₹)</option>
                  <option value="USD ($)">US Dollar (USD $)</option>
                  <option value="EUR (€)">Euro (EUR €)</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="autoApproveSellers"
                  checked={formData.autoApproveSellers}
                  onChange={(e) => setFormData({ ...formData, autoApproveSellers: e.target.checked })}
                  className="w-4 h-4 text-brand-orange rounded border-gray-300 focus:ring-brand-orange"
                />
                <label htmlFor="autoApproveSellers" className="text-sm font-medium text-gray-700">
                  Auto-approve new seller onboarding registrations (Bypass manual KYC check)
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === "payments" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-3">Payment Gateways & Options</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-brand-orange/40 transition">
                <div>
                  <h4 className="font-semibold text-gray-900">Razorpay Payment Gateway</h4>
                  <p className="text-xs text-gray-500">Supports Cards, Netbanking, UPI, and PayLater</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.enableRazorpay}
                  onChange={(e) => setFormData({ ...formData, enableRazorpay: e.target.checked })}
                  className="w-5 h-5 text-brand-orange rounded border-gray-300 focus:ring-brand-orange"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-brand-orange/40 transition">
                <div>
                  <h4 className="font-semibold text-gray-900">Direct UPI / QR Instant Checkout</h4>
                  <p className="text-xs text-gray-500">Zero transaction friction with Google Pay, PhonePe, and Paytm</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.enableUPI}
                  onChange={(e) => setFormData({ ...formData, enableUPI: e.target.checked })}
                  className="w-5 h-5 text-brand-orange rounded border-gray-300 focus:ring-brand-orange"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-brand-orange/40 transition">
                <div>
                  <h4 className="font-semibold text-gray-900">Cash on Delivery (COD)</h4>
                  <p className="text-xs text-gray-500">Allow customers to pay physical cash upon package handover</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.enableCashOnDelivery}
                  onChange={(e) => setFormData({ ...formData, enableCashOnDelivery: e.target.checked })}
                  className="w-5 h-5 text-brand-orange rounded border-gray-300 focus:ring-brand-orange"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-3">Shipping Rates & Thresholds</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Free Shipping Minimum Cart Value (₹)
                </label>
                <input
                  type="number"
                  value={formData.freeShippingThreshold}
                  onChange={(e) => setFormData({ ...formData, freeShippingThreshold: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Standard Flat Shipping Fee (₹)
                </label>
                <input
                  type="number"
                  value={formData.standardShippingFee}
                  onChange={(e) => setFormData({ ...formData, standardShippingFee: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "tax" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-3">Taxation & Marketplace Take Rate</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Marketplace Commission Cut (%)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.marketplaceFeePercent}
                  onChange={(e) => setFormData({ ...formData, marketplaceFeePercent: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
                <span className="text-xs text-gray-400 mt-1 block">Deducted automatically from seller payouts per order.</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Default GST Rate applied (%)
                </label>
                <input
                  type="number"
                  value={formData.standardGstRate}
                  onChange={(e) => setFormData({ ...formData, standardGstRate: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
                <span className="text-xs text-gray-400 mt-1 block">Standard Harmonized Goods & Services Tax rate.</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-3">Administrative Access & Security</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Admin Idle Session Timeout (Minutes)
                </label>
                <input
                  type="number"
                  value={formData.sessionTimeoutMins}
                  onChange={(e) => setFormData({ ...formData, sessionTimeoutMins: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="twoFactorEnforced"
                  checked={formData.twoFactorEnforced}
                  onChange={(e) => setFormData({ ...formData, twoFactorEnforced: e.target.checked })}
                  className="w-4 h-4 text-brand-orange rounded border-gray-300 focus:ring-brand-orange"
                />
                <label htmlFor="twoFactorEnforced" className="text-sm font-medium text-gray-700">
                  Enforce Mandatory 2-Factor Authentication (2FA) for all Super Admin staff
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white rounded-xl font-semibold shadow-sm transition"
          >
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
