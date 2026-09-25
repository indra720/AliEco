import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RotateCcw, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Returns & Refund Policy</h1>
              <p className="text-xs text-gray-400">7-Day Easy Returns & Instant Refunds</p>
            </div>
          </div>

          <div className="prose prose-orange max-w-none text-gray-600 text-sm leading-relaxed space-y-6 pt-4 border-t border-gray-100">
            <section>
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">1. 7-Day Return Window</h2>
              <p>
                We want you to be completely satisfied with your purchase. Most products purchased on ORANZA can be returned or exchanged within <strong>7 days</strong> of physical delivery, provided they meet our eligibility terms.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">2. Return Eligibility Criteria</h2>
              <p>To qualify for a prompt return, items must satisfy the following:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Item must be in its original unused condition, including all original packaging, price tags, and accessories.</li>
                <li>Electronics (smartphones, laptops, audio) must have all serial numbers, warranty cards, and OEM cables intact.</li>
                <li>Items damaged due to misuse, liquid spills, or post-delivery accidents are ineligible.</li>
                <li>Personal hygiene goods, consumables, and customized made-to-order items are non-returnable.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">3. How to Request a Return</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 not-prose">
                <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-100">
                  <div className="w-7 h-7 rounded-lg bg-brand-orange text-white flex items-center justify-center text-xs font-bold mb-2">1</div>
                  <h4 className="font-bold text-gray-900 text-sm">Select Item</h4>
                  <p className="text-xs text-gray-500 mt-1">Go to My Orders, select the delivered order, and click &quot;Return / Replace&quot;.</p>
                </div>

                <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-100">
                  <div className="w-7 h-7 rounded-lg bg-brand-orange text-white flex items-center justify-center text-xs font-bold mb-2">2</div>
                  <h4 className="font-bold text-gray-900 text-sm">Free Doorstep Pickup</h4>
                  <p className="text-xs text-gray-500 mt-1">Our courier will pick up the package from your doorstep within 24–48 hours.</p>
                </div>

                <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-100">
                  <div className="w-7 h-7 rounded-lg bg-brand-orange text-white flex items-center justify-center text-xs font-bold mb-2">3</div>
                  <h4 className="font-bold text-gray-900 text-sm">Instant Refund</h4>
                  <p className="text-xs text-gray-500 mt-1">Refund is processed to your original payment mode within 24 hours of inspection.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">4. Refund Methods & Timelines</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>UPI / Netbanking:</strong> 24–48 business hours after inspection.</li>
                <li><strong>Credit / Debit Cards:</strong> 3–5 business days depending on your issuing bank.</li>
                <li><strong>Cash on Delivery (COD):</strong> Refunded via immediate UPI transfer or NEFT direct bank deposit.</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
