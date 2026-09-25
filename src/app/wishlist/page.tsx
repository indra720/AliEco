"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, ShoppingCart, Share2, ArrowRight } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { RatingStars } from "@/components/common/RatingStars";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";
import { formatPrice } from "@/utils/formatters";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useNotification();

  const handleMoveToCart = (product: (typeof wishlist)[0]) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    showToast(`Moved ${product.title.slice(0, 20)} to your cart!`);
  };

  const handleShareWishlist = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Wishlist link copied to clipboard!");
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6 bg-surface-secondary/40">
          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-border shadow-sm text-center max-w-md w-full flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-5">
              <Heart className="w-10 h-10" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-ink mb-2">Your Wishlist is Empty</h1>
            <p className="text-xs sm:text-sm text-ink-secondary mb-6 leading-relaxed">
              Save your favorite gadgets, apparel, and home essentials here so you never lose track of them.
            </p>
            <Link
              href="/products"
              className="w-full bg-oranza hover:bg-oranza-600 text-white font-bold text-sm py-3 px-6 rounded-lg transition-all shadow-sm"
            >
              Explore Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 bg-surface-secondary/40 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-black text-ink">My Wishlist</h1>
              <p className="text-xs text-ink-secondary mt-0.5">
                {wishlist.length} items saved for later
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShareWishlist}
                className="px-3.5 py-2 border border-border rounded-lg text-xs font-bold text-ink hover:bg-white flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5 text-oranza" /> Share Wishlist
              </button>
              <button
                onClick={clearWishlist}
                className="text-xs font-bold text-red-600 hover:underline"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-card border border-border overflow-hidden hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-square w-full bg-[#fbfbfb]">
                  <Link href={`/products/${product.slug}`} className="block w-full h-full">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      sizes="240px"
                      className="object-contain p-4 hover:scale-105 transition-transform"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 shadow-sm border border-border text-gray-400 hover:text-red-500"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-ink-tertiary uppercase tracking-wider block">
                      {product.brand}
                    </span>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="text-xs font-bold text-ink hover:text-oranza transition-colors line-clamp-2 mt-1 mb-2">
                        {product.title}
                      </h3>
                    </Link>
                    <RatingStars rating={product.rating} count={product.reviewCount} />
                  </div>

                  <div className="mt-4 pt-3 border-t border-border">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-base font-black text-oranza">{formatPrice(product.price)}</span>
                      {product.mrp > product.price && (
                        <span className="text-xs text-ink-tertiary line-through">{formatPrice(product.mrp)}</span>
                      )}
                    </div>

                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="w-full bg-oranza hover:bg-oranza-600 text-white font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
