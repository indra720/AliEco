"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Check, ShoppingCart, Heart, ExternalLink, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/utils/formatters";
import { RatingStars } from "./RatingStars";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useNotification } from "@/context/NotificationContext";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useNotification();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    showToast(`Added ${quantity} x ${product.title.slice(0, 20)}... to cart!`);
    setTimeout(() => setAdded(false), 2000);
  };

  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden border border-border">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-ink-secondary hover:text-ink bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8 max-h-[90vh] overflow-y-auto">
          {/* Gallery View */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-border bg-surface-secondary">
              <Image
                src={product.images[selectedImage] || product.thumbnail}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-4 hover:scale-105 transition-transform duration-300"
              />
              {product.discountPercent > 0 && (
                <div className="absolute top-3 left-3 bg-red-600 text-white font-bold text-xs px-2.5 py-1 rounded">
                  -{product.discountPercent}%
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-16 h-16 rounded border flex-shrink-0 overflow-hidden bg-surface-secondary transition-all ${
                      selectedImage === idx ? "border-oranza ring-2 ring-oranza/30" : "border-border hover:border-gray-400"
                    }`}
                  >
                    <Image src={img} alt="" fill sizes="64px" className="object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="text-xs font-semibold text-oranza uppercase tracking-wider mb-1">
              {product.brand}
            </div>

            <h2 className="text-lg md:text-xl font-bold text-ink leading-snug mb-3">
              {product.title}
            </h2>

            <div className="flex items-center gap-3 mb-4">
              <RatingStars rating={product.rating} count={product.reviewCount} />
              <span className="text-xs text-ink-tertiary">|</span>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                {product.inStock ? `In Stock (${product.stockCount})` : "Out of Stock"}
              </span>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 p-3 bg-surface-secondary rounded-lg mb-4">
              <span className="text-2xl font-black text-oranza">
                {formatPrice(product.price)}
              </span>
              {product.mrp > product.price && (
                <>
                  <span className="text-sm text-ink-tertiary line-through">
                    MRP {formatPrice(product.mrp)}
                  </span>
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                    Save {product.discountPercent}%
                  </span>
                </>
              )}
            </div>

            <p className="text-sm text-ink-secondary mb-4 line-clamp-3">
              {product.shortDescription || product.description}
            </p>

            {/* Highlights */}
            {product.highlights && product.highlights.length > 0 && (
              <div className="mb-5">
                <div className="text-xs font-bold text-ink uppercase tracking-wider mb-2">Key Highlights:</div>
                <ul className="text-xs text-ink-secondary space-y-1">
                  {product.highlights.slice(0, 3).map((h, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-oranza flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="flex items-center gap-3 mb-5 mt-auto">
              <div className="flex items-center border border-border rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-ink-secondary hover:bg-gray-100 font-bold"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-ink-secondary hover:bg-gray-100 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-bold text-sm transition-all shadow-sm ${
                  added
                    ? "bg-green-600 text-white"
                    : "bg-oranza hover:bg-oranza-600 text-white active:scale-[0.98]"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  toggleWishlist(product);
                  showToast(isWishlisted ? "Removed from wishlist" : "Added to wishlist!");
                }}
                className={`p-2.5 border rounded-lg transition-colors ${
                  isWishlisted
                    ? "border-red-200 bg-red-50 text-red-600"
                    : "border-border text-ink-secondary hover:text-red-500 hover:bg-gray-50"
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border text-[11px] text-ink-secondary text-center">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-oranza" />
                <span>Free Delivery &gt;₹999</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-oranza" />
                <span>100% Authentic</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-4 h-4 text-oranza" />
                <span>7-Day Return</span>
              </div>
            </div>

            <div className="mt-4 text-right">
              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-1 text-xs font-semibold text-oranza hover:underline"
              >
                View Full Product Details <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
