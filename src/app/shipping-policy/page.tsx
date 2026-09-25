import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Truck, Clock, ShieldCheck, MapPin } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Shipping & Delivery Policy</h1>
              <p className="text-xs text-gray-400">Reliable logistics across 28,000+ Indian postal codes</p>
            </div>
          </div>

          <div className="prose prose-orange max-w-none text-gray-600 text-sm leading-relaxed space-y-6 pt-4 border-t border-gray-100">
            <section>
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">1. Shipping Charges</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Orders above ₹999:</strong> Completely FREE express nationwide delivery.</li>
                <li><strong>Orders below ₹999:</strong> A flat nominal fee of ₹99 is added at checkout to support local courier handling.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">2. Delivery Timeframes</h2>
              <p>Standard delivery timelines across geographical zones:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 not-prose">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-sm">Tier 1 Metros</h4>
                  <p className="text-xs text-brand-orange font-semibold mt-1">24 to 48 Hours</p>
                  <p className="text-[11px] text-gray-500 mt-1">Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Pune.</p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-sm">Tier 2 Cities</h4>
                  <p className="text-xs text-brand-orange font-semibold mt-1">2 to 4 Business Days</p>
                  <p className="text-[11px] text-gray-500 mt-1">State capitals, major manufacturing hubs and urban clusters.</p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-sm">Rest of India</h4>
                  <p className="text-xs text-brand-orange font-semibold mt-1">4 to 6 Business Days</p>
                  <p className="text-[11px] text-gray-500 mt-1">Regional districts and northeastern states.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">3. Real-Time Tracking</h2>
              <p>
                As soon as your shipment is picked up by our logistics partner (e.g. BlueDart, Delhivery, Shadowfax), an SMS with an active Airway Bill (AWB) tracking number and direct live tracking hyperlink is sent to your registered phone number.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">4. Tamper-Evident Packaging</h2>
              <p>
                All ORANZA orders are packaged in tamper-evident security bubble bags or reinforced cartons. Do not accept deliveries if the security seal appears damaged or broken.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
