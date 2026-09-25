import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShieldCheck, Truck, Users, Award, Sparkles, TrendingUp } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" /> India's Next-Gen Marketplace
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Reinventing How India Discovers & Shops Online
            </h1>
            <p className="text-lg md:text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              ORANZA was born out of a mission to connect authentic artisans, top brands, and millions of Indian shoppers with unprecedented trust, transparency, and lightning-fast delivery.
            </p>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="max-w-6xl mx-auto -mt-10 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border border-gray-100">
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-brand-orange">100K+</div>
              <div className="text-xs uppercase font-bold text-gray-400 mt-1">Curated Products</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-brand-orange">500+</div>
              <div className="text-xs uppercase font-bold text-gray-400 mt-1">Verified Brands</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-brand-orange">28,000+</div>
              <div className="text-xs uppercase font-bold text-gray-400 mt-1">Pincodes Served</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-brand-orange">99.4%</div>
              <div className="text-xs uppercase font-bold text-gray-400 mt-1">Positive Feedback</div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="max-w-6xl mx-auto py-16 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase text-brand-orange tracking-widest">Our Story</span>
              <h2 className="text-3xl font-extrabold text-gray-900 mt-2 mb-4 leading-tight">
                Empowering sellers while delighting shoppers.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded with a visionary commitment to democratize digital commerce in Bharat, ORANZA bridges the gap between premium brand quality and wholesale marketplace efficiency.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                From high-performance electronics and ergonomic work gear to hand-stitched traditional attire and gourmet organic essentials, every item on ORANZA passes our stringent 5-point authenticity audit.
              </p>

              <div className="flex gap-4">
                <Link
                  href="/products"
                  className="px-6 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl shadow-md transition"
                >
                  Explore Catalog
                </Link>
                <Link
                  href="/seller"
                  className="px-6 py-3 border border-gray-300 hover:border-brand-orange text-gray-700 font-semibold rounded-xl transition"
                >
                  Sell with Us
                </Link>
              </div>
            </div>

            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=1200&auto=format&fit=crop"
                alt="ORANZA Marketplace fulfillment hub"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="bg-white py-16 px-4 border-t border-gray-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">Why India Trusts ORANZA</h2>
              <p className="text-gray-500 mt-2">
                Our technology and logistics infrastructure are engineered around four foundational promises.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="p-6 rounded-2xl bg-orange-50/50 border border-orange-100">
                <div className="w-12 h-12 rounded-xl bg-brand-orange text-white flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">100% Genuine Guarantee</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Direct partnership with certified original manufacturers and authorized distributors.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-orange-50/50 border border-orange-100">
                <div className="w-12 h-12 rounded-xl bg-brand-orange text-white flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Express Pan-India Logistics</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Strategic automated sorting nodes ensure 24–48 hour delivery in key metro hubs.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-orange-50/50 border border-orange-100">
                <div className="w-12 h-12 rounded-xl bg-brand-orange text-white flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Best Value Pricing</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Tiered volume discounts and flash promotions straight from verified merchants.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-orange-50/50 border border-orange-100">
                <div className="w-12 h-12 rounded-xl bg-brand-orange text-white flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Customer First Support</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Dedicated 7-days-a-week customer happiness team with effortless 7-day returns.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
