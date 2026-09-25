"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";

export default function ContactPage() {
  const { addNotification } = useNotifications();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Order Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      addNotification({
        type: "success",
        title: "Ticket Raised Successfully",
        message: "Our support specialist will review your ticket within 2 hours.",
      });
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">Get in Touch</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
            We’re Here to Help You
          </h1>
          <p className="text-sm text-gray-600">
            Have questions about an order, seller registration, or platform partnership? Reach out to our 24/7 dedicated support team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details Card */}
          <div className="bg-gradient-to-br from-brand-orange to-brand-orange-dark text-white rounded-2xl p-8 shadow-lg flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-orange-100 text-sm mb-8 leading-relaxed">
                Connect with our customer support, merchant alliance division, or visit our central corporate office in Bengaluru.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-medium text-orange-200">Customer Helpline</div>
                    <div className="text-sm font-semibold">+91 1800 200 4567</div>
                    <div className="text-[11px] text-orange-200">Mon-Sun: 8:00 AM - 10:00 PM IST</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-medium text-orange-200">Direct Email</div>
                    <div className="text-sm font-semibold">support@oranza.in</div>
                    <div className="text-[11px] text-orange-200">sellers@oranza.in for merchant inquiries</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-medium text-orange-200">Corporate HQ</div>
                    <div className="text-sm font-semibold">
                      ORANZA Technologies India Pvt. Ltd.
                    </div>
                    <div className="text-xs text-orange-200 mt-1">
                      Tower B, 7th Floor, Outer Ring Road, Bellandur, Bengaluru, Karnataka - 560103
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/20 flex items-center gap-3">
              <Clock className="w-4 h-4 text-orange-200" />
              <span className="text-xs text-orange-100">Average response time: &lt; 15 mins</span>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Message Received!</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Thank you for reaching out, {formData.name}. We have registered ticket <span className="font-semibold text-gray-800">#TK-8942</span> and sent an acknowledgment to {formData.email}.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", subject: "Order Inquiry", message: "" });
                  }}
                  className="px-6 py-2.5 bg-brand-orange text-white rounded-xl font-semibold text-sm hover:bg-brand-orange-dark transition"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    >
                      <option value="Order Inquiry">Order Status & Tracking</option>
                      <option value="Return / Refund">Returns, Replacements & Refunds</option>
                      <option value="Seller Onboarding">Become a Verified Seller</option>
                      <option value="Payment Issue">Payment & Billing Query</option>
                      <option value="Technical Bug">Report a Bug / Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Please include relevant order numbers or describe your query in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl shadow-md transition flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Ticket
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
