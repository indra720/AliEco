import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-xs text-gray-400">Last updated: September 25, 2026</p>
            </div>
          </div>

          <div className="prose prose-orange max-w-none text-gray-600 text-sm leading-relaxed space-y-6 pt-4 border-t border-gray-100">
            <section>
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">1. Introduction</h2>
              <p>
                At ORANZA Technologies India Pvt. Ltd. (&quot;ORANZA&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we respect your personal privacy and are committed to protecting it. This Privacy Policy outlines the types of information we collect when you visit our website, mobile interface, or use our marketplace services, and how we safeguard and utilize that data in compliance with the Digital Personal Data Protection Act (DPDPA) and applicable Indian laws.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">2. Information We Collect</h2>
              <p>We collect information to deliver efficient shopping, fulfillment, and customer experiences:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Personal Identity:</strong> Name, email address, shipping & billing addresses, contact phone numbers.</li>
                <li><strong>Payment Transaction Data:</strong> Encrypted payment token identifiers and billing records. Note: We never store card CVV numbers or netbanking passwords.</li>
                <li><strong>Device & Behavioral Telemetry:</strong> IP addresses, browser types, device fingerprints, operating system versions, and interaction clickstream logs.</li>
                <li><strong>Merchant Verification Documents:</strong> GSTIN, PAN, and banking details collected strictly for seller onboarding verification.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">3. How We Use Your Information</h2>
              <p>Your data enables us to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Process, verify, fulfill, and track your marketplace orders.</li>
                <li>Coordinate logistics with verified third-party parcel carriers (e.g. Delhivery, BlueDart).</li>
                <li>Prevent transactional fraud, spam, unauthorized access, and malicious bots.</li>
                <li>Send transactional dispatch SMS, invoice copies, and customer service updates.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">4. Data Security & Storage</h2>
              <p>
                All sensitive data transmissions are secured using 256-bit Transport Layer Security (TLS/SSL). Personal information is stored on ISO 27001-certified Indian cloud data servers with strict role-based access control and continuous automated vulnerability monitoring.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">5. Your Data Rights</h2>
              <p>
                Under applicable Indian privacy regulations, you have the right to request access to your stored personal information, request corrections, or request deletion of your registered account by writing to our Data Protection Officer at <span className="text-brand-orange font-medium">privacy@oranza.in</span>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
