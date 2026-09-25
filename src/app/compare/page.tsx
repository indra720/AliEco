"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingCart, ArrowLeftRight, Check, ChevronRight } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { RatingStars } from "@/components/common/RatingStars";
import { useCompare } from "@/context/CompareContext";
import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";
import { formatPrice } from "@/utils/formatters";

export default function ComparePage() {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();
  const { showToast } = useNotification();

  if (compareItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6 bg-surface-secondary/40">
          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-border shadow-sm text-center max-w-md w-full flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-oranza-50 text-oranza flex items-center justify-center mb-5">
              <ArrowLeftRight className="w-10 h-10" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-ink mb-2">No Products in Comparison</h1>
            <p className="text-xs sm:text-sm text-ink-secondary mb-6 leading-relaxed">
              Add up to 4 items from any product card or detail page to compare specifications, ratings, and prices side-by-side.
            </p>
            <Link
              href="/products"
              className="w-full bg-oranza hover:bg-oranza-600 text-white font-bold text-sm py-3 px-6 rounded-lg transition-all shadow-sm"
            >
              Browse Products to Compare
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Collect all unique specification names across compared items
  const allSpecNames = Array.from(
    new Set(
      compareItems.flatMap((p) => p.specifications.map((s) => s.name))
    )
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 bg-surface-secondary/40 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <nav className="flex items-center gap-1.5 text-xs text-ink-secondary mb-2">
                <Link href="/" className="hover:text-oranza transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-ink-tertiary" />
                <span className="font-semibold text-ink">Compare Products</span>
              </nav>
              <h1 className="text-2xl font-black text-ink">
                Product Comparison ({compareItems.length}/4)
              </h1>
            </div>

            <button
              onClick={clearCompare}
              className="text-xs font-bold text-red-600 hover:underline"
            >
              Clear All
            </button>
          </div>

          {/* Comparison Matrix Table */}
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface-secondary/60">
                  <th className="p-4 w-48 font-bold text-ink-secondary uppercase tracking-wider">
                    Feature
                  </th>
                  {compareItems.map((product) => (
                    <th key={product.id} className="p-4 min-w-[220px] max-w-[280px] align-top">
                      <div className="relative">
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          className="absolute -top-2 -right-2 p-1 bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="relative aspect-square w-32 h-32 mx-auto rounded-xl overflow-hidden bg-white border border-border mb-3">
                          <Image src={product.thumbnail} alt="" fill sizes="128px" className="object-contain p-2" />
                        </div>
                        <span className="text-[10px] font-bold text-oranza uppercase tracking-wider block">
                          {product.brand}
                        </span>
                        <Link href={`/products/${product.slug}`}>
                          <h3 className="text-xs font-bold text-ink hover:text-oranza transition-colors line-clamp-2 mt-0.5">
                            {product.title}
                          </h3>
                        </Link>
                        <div className="text-base font-black text-oranza mt-2">
                          {formatPrice(product.price)}
                        </div>
                        <button
                          onClick={() => {
                            addToCart(product);
                            showToast(`Added ${product.title.slice(0, 20)} to cart!`);
                          }}
                          className="mt-3 w-full bg-oranza hover:bg-oranza-600 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {/* Rating */}
                <tr>
                  <td className="p-4 font-bold text-ink-secondary bg-surface-secondary/30">Customer Rating</td>
                  {compareItems.map((p) => (
                    <td key={p.id} className="p-4">
                      <RatingStars rating={p.rating} count={p.reviewCount} />
                    </td>
                  ))}
                </tr>
                {/* Category */}
                <tr>
                  <td className="p-4 font-bold text-ink-secondary bg-surface-secondary/30">Category</td>
                  {compareItems.map((p) => (
                    <td key={p.id} className="p-4 font-semibold text-ink">
                      {p.category}
                    </td>
                  ))}
                </tr>
                {/* Availability */}
                <tr>
                  <td className="p-4 font-bold text-ink-secondary bg-surface-secondary/30">Availability</td>
                  {compareItems.map((p) => (
                    <td key={p.id} className="p-4">
                      <span className={`font-bold ${p.inStock ? "text-emerald-600" : "text-red-500"}`}>
                        {p.inStock ? `In Stock (${p.stockCount})` : "Out of Stock"}
                      </span>
                    </td>
                  ))}
                </tr>
                {/* Seller */}
                <tr>
                  <td className="p-4 font-bold text-ink-secondary bg-surface-secondary/30">Seller</td>
                  {compareItems.map((p) => (
                    <td key={p.id} className="p-4 text-ink">
                      {p.sellerName}
                    </td>
                  ))}
                </tr>
                {/* Dynamic Specifications */}
                {allSpecNames.map((specName) => (
                  <tr key={specName}>
                    <td className="p-4 font-bold text-ink-secondary bg-surface-secondary/30">{specName}</td>
                    {compareItems.map((p) => {
                      const spec = p.specifications.find((s) => s.name === specName);
                      return (
                        <td key={p.id} className="p-4 text-ink">
                          {spec ? spec.value : "—"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
