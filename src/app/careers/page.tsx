import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Briefcase, MapPin, Sparkles, ArrowRight, Heart, Rocket } from "lucide-react";

const POSITIONS = [
  {
    id: "eng-1",
    title: "Senior Full Stack Engineer (Next.js / Node)",
    department: "Engineering",
    location: "Bengaluru (Hybrid)",
    type: "Full-Time",
  },
  {
    id: "eng-2",
    title: "Lead Cloud Architect (AWS / Kubernetes)",
    department: "Infrastructure",
    location: "Bengaluru",
    type: "Full-Time",
  },
  {
    id: "prod-1",
    title: "Principal Product Manager - Seller Ecosystem",
    department: "Product Management",
    location: "Bengaluru / Gurugram",
    type: "Full-Time",
  },
  {
    id: "ops-1",
    title: "Supply Chain & Fulfilment Operations Lead",
    department: "Logistics",
    location: "Mumbai / Bengaluru",
    type: "Full-Time",
  },
  {
    id: "des-1",
    title: "Senior Product Designer (Design Systems)",
    department: "UX / UI",
    location: "Remote (India)",
    type: "Full-Time",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider mb-4">
              <Rocket className="w-3.5 h-3.5" /> We are Hiring
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Build the Future of Indian Commerce
            </h1>
            <p className="text-lg text-orange-100 max-w-2xl mx-auto leading-relaxed">
              Join a team of passionate engineers, designers, and operators scaling high-trust marketplace experiences for millions of consumers and MSMEs.
            </p>
          </div>
        </section>

        {/* Culture Highlights */}
        <section className="max-w-6xl mx-auto py-16 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">High Ownership & Autonomy</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Work in fast-moving, autonomous squads solving challenging scale and logistics bottlenecks with minimal red tape.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Holistic Health & Wellness</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Comprehensive medical coverage for you and your dependents, mental wellness days, and generous paternal leaves.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Competitive ESOPs & Perks</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Top-of-market compensation packages with real equity upside in one of India's fastest scaling ecommerce networks.
              </p>
            </div>
          </div>
        </section>

        {/* Open Roles */}
        <section className="max-w-5xl mx-auto pb-20 px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">Current Openings</h2>
            <p className="text-sm text-gray-500 mt-2">Explore active vacancies across our product and technology hubs.</p>
          </div>

          <div className="space-y-3">
            {POSITIONS.map((pos) => (
              <div
                key={pos.id}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-brand-orange/40 hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-50 text-brand-orange">
                      {pos.department}
                    </span>
                    <span className="text-xs text-gray-400">• {pos.type}</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mt-1">{pos.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    {pos.location}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-brand-orange hover:text-white text-gray-800 text-xs font-semibold rounded-xl transition"
                >
                  Apply Now <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
