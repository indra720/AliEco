"use client";

import React, { useState } from "react";
import { Store, Building, Truck, ShieldCheck, Save } from "lucide-react";
import { SELLERS } from "@/data/sellers";
import { useNotification } from "@/context/NotificationContext";

export default function SellerSettingsPage() {
  const { showToast } = useNotification();
  const seller = SELLERS[0];

  const [storeName, setStoreName] = useState(seller.storeName);
  const [description, setDescription] = useState(seller.description);
  const [email, setEmail] = useState(seller.email);
  const [phone, setPhone] = useState(seller.phone);
  const [accountNumber, setAccountNumber] = useState(seller.bankDetails?.accountNumber || "918273645012");
  const [bankName, setBankName] = useState(seller.bankDetails?.bankName || "HDFC Bank, Mumbai");
  const [ifsc, setIfsc] = useState(seller.bankDetails?.ifsc || "HDFC0001234");
  const [gstin, setGstin] = useState("27AABCU9603R1ZM");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Merchant settings and payout details updated!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
        <h1 className="text-xl sm:text-2xl font-black text-ink">Store Settings & Business Profile</h1>
        <p className="text-xs text-ink-secondary mt-1">
          Manage your official marketplace merchant credentials, payout bank, and tax details
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Store Profile */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
          <h3 className="font-bold text-ink uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-border">
            <Store className="w-4 h-4 text-oranza" /> Store Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-ink block mb-1">Store Name *</label>
              <input
                type="text"
                required
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
              />
            </div>
            <div>
              <label className="font-bold text-ink block mb-1">Business GSTIN *</label>
              <input
                type="text"
                required
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-ink block mb-1">Public Store Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-ink block mb-1">Contact Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
              />
            </div>
            <div>
              <label className="font-bold text-ink block mb-1">Support Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
              />
            </div>
          </div>
        </div>

        {/* Bank & Payouts */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
          <h3 className="font-bold text-ink uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-border">
            <Building className="w-4 h-4 text-oranza" /> Bank Account for Direct Payouts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-ink block mb-1">Bank Name & Branch</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
              />
            </div>
            <div>
              <label className="font-bold text-ink block mb-1">Account Number</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-ink block mb-1">IFSC Code</label>
              <input
                type="text"
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm font-mono uppercase"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-oranza hover:bg-oranza-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Store Settings
          </button>
        </div>
      </form>
    </div>
  );
}
