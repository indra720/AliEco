"use client";

import React from "react";
import { DollarSign, Download, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { formatPrice } from "@/utils/formatters";

export default function SellerEarningsPage() {
  const payouts = [
    { id: "PAY-901", amount: 485000, date: "2024-03-15", status: "Settled", method: "HDFC Bank (Ending in 5012)" },
    { id: "PAY-900", amount: 620000, date: "2024-03-01", status: "Settled", method: "HDFC Bank (Ending in 5012)" },
    { id: "PAY-899", amount: 540000, date: "2024-02-15", status: "Settled", method: "HDFC Bank (Ending in 5012)" },
    { id: "PAY-898", amount: 390000, date: "2024-02-01", status: "Settled", method: "HDFC Bank (Ending in 5012)" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-ink">Earnings & Payouts</h1>
          <p className="text-xs text-ink-secondary mt-1">
            Track bank settlement history, platform commissions, and payout schedules
          </p>
        </div>
        <button className="bg-oranza text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-2 hover:bg-oranza-600 transition-colors">
          <Download className="w-4 h-4" /> Download Payout Statement
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
          <span className="text-[11px] font-bold text-ink-tertiary uppercase">Available Balance</span>
          <div className="text-2xl font-black text-oranza mt-1">₹3,42,850</div>
          <span className="text-[10px] text-ink-secondary">Scheduled for auto-payout on 31st March</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
          <span className="text-[11px] font-bold text-ink-tertiary uppercase">Total Paid Out</span>
          <div className="text-2xl font-black text-ink mt-1">₹1,18,50,000</div>
          <span className="text-[10px] text-emerald-600 font-bold">100% on-time settlement record</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm">
          <span className="text-[11px] font-bold text-ink-tertiary uppercase">Platform Commission</span>
          <div className="text-2xl font-black text-ink mt-1">8.0%</div>
          <span className="text-[10px] text-ink-secondary">Tier-1 Preferred Partner rate</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border font-black text-xs uppercase tracking-wider text-ink">
          Settlement History
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-surface-secondary text-ink-tertiary">
              <tr>
                <th className="p-4 font-bold uppercase">Payout Reference</th>
                <th className="p-4 font-bold uppercase">Settled Date</th>
                <th className="p-4 font-bold uppercase">Amount</th>
                <th className="p-4 font-bold uppercase">Destination Account</th>
                <th className="p-4 font-bold uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {payouts.map((p) => (
                <tr key={p.id}>
                  <td className="p-4 font-mono font-bold text-ink">{p.id}</td>
                  <td className="p-4 text-ink-secondary">{p.date}</td>
                  <td className="p-4 font-black text-ink">{formatPrice(p.amount)}</td>
                  <td className="p-4 text-ink-secondary">{p.method}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-700">
                      {p.status}
                    </span>
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
