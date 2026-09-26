"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Maximize2,
  ArrowLeftRight,
  Check,
  Star,
} from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/utils/formatters";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";
import { useNotification } from "@/context/NotificationContext";
import { QuickViewModal } from "./QuickViewModal";

interface ProductCardProps {
  product: Product;
  layout?: "grid" | "list";
}

export function ProductCard({ product, layout = "grid" }: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();
  const { showToast } = useNotification();

  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const primaryImage = product.images[0] || product.thumbnail;
  const secondaryImage = product.images[1] || product.images[0] || product.thumbnail;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdding(true);
    showToast(`Added "${product.title.slice(0, 24)}..." to cart!`);
    setTimeout(() => setIsAdding(false), 1600);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast(isWishlisted ? "Removed from wishlist" : "Added to your wishlist!");
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCompared) {
      removeFromCompare(product.id);
      showToast("Removed from compare");
    } else {
      const res = addToCompare(product);
      showToast(res.message, res.success ? "success" : "info");
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  if (layout === "list") {
    return (
      <>
        <div className="group relative flex flex-col sm:flex-row bg-white rounded-2xl border border-gray-200 hover:border-brand-orange hover:shadow-lg transition-all duration-300 overflow-hidden p-4 sm:p-5 gap-5">
          <Link
            href={`/products/${product.slug}`}
            className="relative w-full sm:w-56 aspect-[3/4] sm:aspect-auto flex-shrink-0 bg-[#f8f9fa] rounded-xl overflow-hidden p-3 flex items-center justify-center"
          >
            <Image
              src={primaryImage}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, 240px"
              className="object-cover"
            />
            {product.discountPercent > 0 && (
              <span className="absolute top-2.5 left-2.5 bg-[#ff4d4f] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-xs">
                {product.discountPercent}%
              </span>
            )}
          </Link>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 block">
                {product.brand}
              </span>

              <Link href={`/products/${product.slug}`}>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-brand-orange transition-colors line-clamp-1 mb-1.5">
                  {product.title}
                </h3>
              </Link>

              <div className="flex items-center gap-1 mb-3">
                <div className="flex items-center text-[#fa8c16]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-[#fa8c16] text-[#fa8c16]"
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400 font-medium ml-1">({product.rating})</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 flex-wrap gap-3">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-gray-500 line-through">
                  {formatPrice(product.mrp)}
                </span>
                <span className="text-xl font-black text-[#ff4d4f]">
                  {formatPrice(product.price)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleQuickView}
                  className="w-9 h-9 rounded-full border border-gray-200 text-gray-600 hover:text-brand-orange hover:border-brand-orange transition flex items-center justify-center shadow-xs"
                  title="Quick View"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleToggleCompare}
                  className={`w-9 h-9 rounded-full border transition flex items-center justify-center shadow-xs ${
                    isCompared
                      ? "border-brand-orange bg-orange-50 text-brand-orange font-bold"
                      : "border-gray-200 text-gray-600 hover:border-brand-orange hover:text-brand-orange"
                  }`}
                  title="Compare"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className={`w-9 h-9 rounded-full border transition flex items-center justify-center shadow-xs ${
                    isWishlisted
                      ? "border-red-200 bg-red-50 text-red-500"
                      : "border-gray-200 text-gray-600 hover:text-red-500 hover:border-red-200"
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-[#ff4d4f] font-bold text-xs uppercase tracking-wider transition-all active:scale-95 ${
                    isAdding
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "text-[#ff4d4f] hover:bg-[#ff4d4f] hover:text-white"
                  }`}
                >
                  {isAdding ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                  {isAdding ? "Added!" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {isQuickViewOpen && (
          <QuickViewModal product={product} onClose={() => setIsQuickViewOpen(false)} />
        )}
      </>
    );
  }

  // ULTRA-CLEAN PRODUCT CARD MATCHING SCREENSHOT (media_1790414233185.png)
  // Hover effect: Image flips to secondary angle (NO ZOOM), clean 3 stacked buttons, outlined Add to Cart
  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex flex-col bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        {/* Top Product Image: Compact Aspect with Smooth Image Flip on Hover */}
        <div className="relative aspect-[4/4.2] w-full bg-[#f8f9fa] overflow-hidden">
          <Link href={`/products/${product.slug}`} className="block w-full h-full relative">
            {/* Primary Image */}
            <Image
              src={primaryImage}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
              className={`object-cover transition-opacity duration-300 ease-out ${
                isHovered && secondaryImage !== primaryImage ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* Secondary Image */}
            {secondaryImage && secondaryImage !== primaryImage && (
              <Image
                src={secondaryImage}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                className={`object-cover transition-opacity duration-300 ease-out ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </Link>

          {/* Top Left Discount Tag matching Screenshot */}
          {product.discountPercent > 0 && (
            <span className="absolute top-2.5 left-2.5 z-20 bg-[#ff4d4f] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-xs tracking-wide">
              {product.discountPercent}%
            </span>
          )}

          {/* Stack of 3 Circular Action Buttons on Top Right matching Screenshot */}
          <div className="absolute top-2.5 right-2.5 z-20 flex flex-col gap-1.5">
            {/* 1. Quick View / Maximize Button */}
            <button
              onClick={handleQuickView}
              className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full bg-white shadow-md border border-gray-150 flex items-center justify-center text-gray-700 hover:text-brand-orange hover:border-brand-orange hover:scale-110 active:scale-90 transition-all"
              title="Quick View Modal"
              aria-label="Quick View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>

            {/* 2. Compare Button */}
            <button
              onClick={handleToggleCompare}
              className={`w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full shadow-md border flex items-center justify-center transition-all hover:scale-110 active:scale-90 ${
                isCompared
                  ? "bg-brand-orange text-white border-brand-orange"
                  : "bg-white text-gray-700 border-gray-150 hover:text-brand-orange hover:border-brand-orange"
              }`}
              title="Add to Compare"
              aria-label="Compare"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </button>

            {/* 3. Wishlist Heart Button */}
            <button
              onClick={handleToggleWishlist}
              className={`w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full shadow-md border flex items-center justify-center transition-all hover:scale-110 active:scale-90 ${
                isWishlisted
                  ? "bg-white text-[#ff4d4f] border-red-200 fill-[#ff4d4f]"
                  : "bg-white text-gray-700 border-gray-150 hover:text-[#ff4d4f]"
              }`}
              title="Add to Wishlist"
              aria-label="Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-[#ff4d4f] text-[#ff4d4f]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Clean, Elegant Information Block matching Screenshot */}
        <div className="flex-1 flex flex-col p-3 sm:p-3.5">
          {/* Brand Name */}
          <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider mb-1 block">
            {product.brand}
          </span>

          {/* Product Title */}
          <Link href={`/products/${product.slug}`} className="mb-2">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-brand-orange transition-colors line-clamp-1 leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* 5 Solid Golden Stars matching Screenshot */}
          <div className="flex items-center gap-0.5 mb-2.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-[#fa8c16] text-[#fa8c16]"
              />
            ))}
          </div>

          {/* Price Line (Strikethrough MRP on Left, Bold Red/Coral Sale Price on Right) */}
          <div className="flex items-baseline justify-between mt-auto mb-2">
            <span className="text-sm font-semibold text-gray-600 line-through">
              {formatPrice(product.mrp)}
            </span>
            <span className="text-base sm:text-lg font-bold text-[#ff4d4f]">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Clean Outlined ADD TO CART Button matching Screenshot */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full mt-2 py-2.5 px-4 rounded-xl border font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-xs ${
              isAdding
                ? "bg-emerald-600 border-emerald-600 text-white"
                : "border-[#ff4d4f] text-[#ff4d4f] hover:bg-[#ff4d4f] hover:text-white"
            }`}
          >
            {isAdding ? (
              <>
                <Check className="w-4 h-4" /> Added!
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      {isQuickViewOpen && (
        <QuickViewModal product={product} onClose={() => setIsQuickViewOpen(false)} />
      )}
    </>
  );
}

export default ProductCard;
