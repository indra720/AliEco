"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime application error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-5">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            An unexpected error occurred while rendering this view. Our engineering team has been notified.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white rounded-xl text-sm font-semibold shadow-sm transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto px-5 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" /> Go Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
