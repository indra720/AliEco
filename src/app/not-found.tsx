import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShoppingBag, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-3xl bg-orange-100 text-brand-orange flex items-center justify-center mx-auto mb-6 shadow-sm">
            <ShoppingBag className="w-10 h-10" />
          </div>

          <h1 className="text-6xl font-black text-gray-900 tracking-tight">404</h1>
          <h2 className="text-xl font-bold text-gray-800 mt-2">Page Not Found</h2>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            The page you are looking for may have been moved, renamed, or is temporarily unavailable in our catalog.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white rounded-xl text-sm font-semibold shadow-sm transition flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" /> Go to Homepage
            </Link>
            <Link
              href="/products"
              className="w-full sm:w-auto px-6 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-semibold transition"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
