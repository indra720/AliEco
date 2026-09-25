import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileCheck, AlertCircle } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Terms of Service</h1>
              <p className="text-xs text-gray-400">Effective Date: September 25, 2026</p>
            </div>
          </div>

          <div className="prose prose-orange max-w-none text-gray-600 text-sm leading-relaxed space-y-6 pt-4 border-t border-gray-100">
            <section>
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">1. Agreement to Terms</h2>
              <p>
                By accessing or registering on ORANZA Marketplace (&quot;Platform&quot;), whether as a shopper, vendor, or browser, you signify your unreserved consent to these Terms of Service. If you do not agree with any provision herein, you must refrain from utilizing our platform services.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">2. Marketplace Intermediary Role</h2>
              <p>
                ORANZA functions as an electronic marketplace platform and intermediary under Section 79 of the Information Technology Act, 2000. Sellers list, market, and sell goods directly to buyers. While ORANZA enforces rigorous merchant authenticity standards and provides logistics coordination, each purchase contract is formed directly between the buyer and the verified seller.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">3. User Account Responsibilities</h2>
              <p>
                You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use or security compromise.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">4. Pricing, Orders, & Cancellations</h2>
              <p>
                All prices are displayed in Indian Rupees (₹) inclusive of applicable taxes (GST) unless explicitly noted. Sellers reserve the right to cancel an unfulfilled order in the rare event of inventory stock discrepancies, pricing technical anomalies, or logistical embargoes, upon which an immediate 100% refund is initiated.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">5. Governing Law & Dispute Resolution</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of the Republic of India. Any legal dispute or claim arising out of your use of ORANZA shall be subject to the exclusive jurisdiction of the competent courts in Bengaluru, Karnataka.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
