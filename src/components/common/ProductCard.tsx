"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye, ArrowLeftRight, Check, Star } from "lucide-react";
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

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();
  const { showToast } = useNotification();

  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

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
        <div className="group relative flex flex-col sm:flex-row bg-white rounded-2xl border border-gray-200/90 hover:border-brand-orange hover:shadow-lg transition-all duration-300 overflow-hidden p-4 sm:p-5 gap-5">
          <Link
            href={`/products/${product.slug}`}
            className="relative w-full sm:w-52 aspect-square sm:aspect-auto flex-shrink-0 bg-gray-50/70 rounded-xl overflow-hidden p-3 flex items-center justify-center"
          >
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, 220px"
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            />
            {product.discountPercent > 0 && (
              <span className="absolute top-2.5 left-2.5 bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                -{product.discountPercent}%
              </span>
            )}
          </Link>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1 block">
                {product.brand}
              </span>

              <Link href={`/products/${product.slug}`}>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-brand-orange transition-colors line-clamp-1 mb-1.5">
                  {product.title}
                </h3>
              </Link>

              <div className="flex items-center gap-1 mb-3">
                <div className="flex items-center text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : i < product.rating
                          ? "fill-amber-400/50 text-amber-400"
                          : "text-gray-200 fill-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400 font-medium ml-1">({product.rating})</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 flex-wrap gap-3">
              <div className="flex items-baseline gap-2">
                {product.mrp > product.price && (
                  <span className="text-xs text-gray-400 line-through font-medium">
                    {formatPrice(product.mrp)}
                  </span>
                )}
                <span className="text-xl font-black text-brand-orange">
                  {formatPrice(product.price)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleQuickView}
                  className="w-9 h-9 rounded-xl border border-gray-200 text-gray-600 hover:text-brand-orange hover:border-brand-orange transition flex items-center justify-center"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={handleToggleCompare}
                  className={`w-9 h-9 rounded-xl border transition flex items-center justify-center ${
                    isCompared ? "border-brand-orange bg-orange-50 text-brand-orange font-bold" : "border-gray-200 text-gray-600 hover:border-brand-orange hover:text-brand-orange"
                  }`}
                  title="Compare"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className={`w-9 h-9 rounded-xl border transition flex items-center justify-center ${
                    isWishlisted ? "border-red-200 bg-red-50 text-red-500" : "border-gray-200 text-gray-600 hover:text-red-500 hover:border-red-200"
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex items-center gap-1.5 px-5 py-2 rounded-xl border-2 font-bold text-xs uppercase tracking-wider transition-all active:scale-95 ${
                    isAdding
                      ? "border-emerald-600 bg-emerald-600 text-white shadow-emerald-500/20"
                      : "border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                  }`}
                >
                  {isAdding ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
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

  // ULTRA-CLEAN GRID CARD MATCHING SCREENSHOT 3
  return (
    <>
      <div className="group relative flex flex-col bg-white rounded-2xl border border-gray-200/90 hover:border-orange-300 hover:shadow-[0_12px_30px_-8px_rgba(255,106,0,0.18)] transition-all duration-300 overflow-hidden">
        {/* Product Image Area */}
        <div className="relative aspect-square w-full bg-gray-50/50 p-4 flex items-center justify-center overflow-hidden">
          <Link href={`/products/${product.slug}`} className="block w-full h-full relative">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-300 ease-out"
            />
          </Link>

          {/* Discount Tag on Top Left (Clean Red Pill) */}
          {product.discountPercent > 0 && (
            <span className="absolute top-2.5 left-2.5 z-10 bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              -{product.discountPercent}%
            </span>
          )}

          {/* Wishlist Button on Top Right */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white shadow-xs border border-gray-150 flex items-center justify-center transition-all transform hover:scale-110 active:scale-90 ${
              isWishlisted ? "text-red-500 fill-red-500 border-red-200" : "text-gray-400 hover:text-red-500"
            }`}
            title="Add to Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
          </button>

          {/* Quick View Button (hover reveal) */}
          <button
            onClick={handleQuickView}
            className="absolute bottom-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white/90 shadow-xs border border-gray-150 flex items-center justify-center text-gray-500 hover:text-brand-orange transition-all opacity-0 group-hover:opacity-100 duration-200"
            title="Quick View"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Minimal, Ultra-Clean Card Content (No long description!) */}
        <div className="flex-1 flex flex-col p-3.5 sm:p-4">
          {/* Brand Name */}
          <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">
            {product.brand}
          </span>

          {/* Product Title (1 line clamp) */}
          <Link href={`/products/${product.slug}`} className="mb-1.5">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-brand-orange transition-colors line-clamp-1 leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* 5-Star Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : i < product.rating
                      ? "fill-amber-400/50 text-amber-400"
                      : "text-gray-200 fill-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-medium text-gray-400 ml-1">({product.rating})</span>
          </div>

          {/* Price Line (Strike-through MRP + Sale Price in Brand Orange) */}
          <div className="flex items-baseline gap-2 mt-auto pt-1">
            {product.mrp > product.price && (
              <span className="text-xs text-gray-400 line-through font-medium">
                {formatPrice(product.mrp)}
              </span>
            )}
            <span className="text-base sm:text-lg font-black text-brand-orange">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Outlined Add to Cart CTA Button matching Screenshot 3 */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full mt-3 py-2 px-3 rounded-xl border-2 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 ${
              isAdding
                ? "border-emerald-600 bg-emerald-600 text-white shadow-emerald-500/20"
                : "border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white shadow-xs"
            }`}
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added!
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
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
