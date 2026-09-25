"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronDown, ChevronUp, HelpCircle, Search } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  category: "ordering" | "shipping" | "payments" | "returns" | "sellers";
}

const FAQS: FAQItem[] = [
  {
    category: "ordering",
    q: "How do I place an order on ORANZA?",
    a: "Browse products using our intuitive search or category menus, select your preferred options (size, color, RAM/storage), click 'Add to Cart', and proceed to the multi-step checkout. Enter your shipping address and choose your payment method (Cards, UPI, Netbanking, or COD) to confirm.",
  },
  {
    category: "ordering",
    q: "Can I modify my order after it has been placed?",
    a: "You can update delivery address details or cancel specific items from your 'My Orders' dashboard before the order moves to 'Dispatched' status. Once dispatched with our logistics partner, changes cannot be made directly.",
  },
  {
    category: "shipping",
    q: "What are the shipping charges and delivery timelines?",
    a: "We offer FREE standard express shipping across India on all orders exceeding ₹999. For smaller orders below ₹999, a nominal flat convenience fee of ₹99 applies. Metro deliveries generally arrive within 24–48 hours, while other pincodes take 3–5 working days.",
  },
  {
    category: "shipping",
    q: "How can I track my shipment in real-time?",
    a: "Every shipment comes with an active tracking ID and timeline visible under your Account > 'My Orders' > 'Track Package'. You will also receive instant SMS and email notifications at each milestone.",
  },
  {
    category: "payments",
    q: "Which payment options are supported?",
    a: "We support all major payment modes: Credit/Debit Cards (Visa, Mastercard, RuPay, Amex), UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking across 50+ Indian banks, EMI on popular cards, and Cash on Delivery (COD) for eligible pincodes.",
  },
  {
    category: "payments",
    q: "Is it safe to pay online on ORANZA?",
    a: "Absolutely. All transactions are protected by bank-grade 256-bit SSL encryption and processed through RBI-compliant certified payment gateways (PCI-DSS Level 1 compliant). We do not store sensitive card CVVs or net banking credentials.",
  },
  {
    category: "returns",
    q: "What is the ORANZA return and refund policy?",
    a: "We offer a hassle-free 7-day replacement or refund policy on most eligible categories (electronics, lifestyle, fashion, and home). To initiate a return, visit 'My Orders', select the item, and choose 'Request Return'. Once inspected at pickup, your refund is credited within 24–48 hours.",
  },
  {
    category: "sellers",
    q: "How can I become a verified seller on ORANZA?",
    a: "Selling on ORANZA takes under 5 minutes! Navigate to 'Seller Portal' in the header, click 'Register as Seller', provide your GSTIN, PAN, and active bank account details. Once verified by our onboarding team, you can immediately list products to millions of shoppers.",
  },
];

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]);

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesTab = activeTab === "all" || faq.category === activeTab;
    const matchesSearch =
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="w-12 h-12 bg-orange-100 text-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-3">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h1>
          <p className="text-sm text-gray-500 mt-2">
            Find immediate answers to common questions about orders, payments, logistics, and seller onboarding.
          </p>

          {/* Search Box */}
          <div className="relative mt-6">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions or keywords (e.g. refund, UPI, shipping)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-6">
          {[
            { id: "all", label: "All Questions" },
            { id: "ordering", label: "Ordering" },
            { id: "shipping", label: "Shipping & Delivery" },
            { id: "payments", label: "Payments & Pricing" },
            { id: "returns", label: "Returns & Refunds" },
            { id: "sellers", label: "Selling on Oranza" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeTab === tab.id
                  ? "bg-brand-orange text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
              <p className="text-gray-500 text-sm">No matching questions found for &quot;{searchQuery}&quot;.</p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndices.includes(idx);
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition"
                >
                  <button
                    onClick={() => toggleIndex(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-900 hover:text-brand-orange transition"
                  >
                    <span className="text-base">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-brand-orange shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
