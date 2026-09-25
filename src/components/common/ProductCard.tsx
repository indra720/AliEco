"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye, ArrowLeftRight, Check, Star, ShieldCheck, Zap, Sparkles } from "lucide-react";
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

  const discountSavings = product.mrp > product.price ? product.mrp - product.price : 0;

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
        <div className="group relative flex flex-col sm:flex-row bg-white rounded-3xl border border-gray-100 hover:border-orange-300 hover:shadow-[0_20px_40px_-15px_rgba(255,106,0,0.18)] transition-all duration-300 overflow-hidden p-4 sm:p-5 gap-5">
          <Link
            href={`/products/${product.slug}`}
            className="relative w-full sm:w-56 aspect-[4/3] sm:aspect-auto flex-shrink-0 bg-gradient-to-br from-orange-50/40 via-white to-gray-50 rounded-2xl overflow-hidden p-3 flex items-center justify-center border border-gray-50"
          >
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, 240px"
              className="object-contain p-2 group-hover:scale-110 transition-transform duration-500 ease-out"
            />
            {product.discountPercent > 0 && (
              <span className="absolute top-2.5 left-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-md shadow-orange-500/30 flex items-center gap-1">
                <Zap className="w-3 h-3 fill-white" /> -{product.discountPercent}%
              </span>
            )}
          </Link>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-600 font-bold text-[10px] uppercase tracking-wider">
                  {product.brand}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" />
                  {product.inStock ? "Verified In Stock" : "Backorder"}
                </span>
              </div>

              <Link href={`/products/${product.slug}`}>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-brand-orange transition-colors line-clamp-2 mb-2 leading-snug">
                  {product.title}
                </h3>
              </Link>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md text-xs font-bold border border-amber-200/60">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs text-gray-400 font-medium">({product.reviewCount} customer reviews)</span>
              </div>

              <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                {product.shortDescription || product.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4 flex-wrap gap-3">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-gray-900 group-hover:text-brand-orange transition-colors">
                    {formatPrice(product.price)}
                  </span>
                  {product.mrp > product.price && (
                    <span className="text-xs text-gray-400 line-through font-medium">
                      {formatPrice(product.mrp)}
                    </span>
                  )}
                </div>
                {discountSavings > 0 && (
                  <span className="text-[11px] font-semibold text-emerald-600">
                    Save {formatPrice(discountSavings)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleQuickView}
                  className="w-9 h-9 rounded-xl border border-gray-200 text-gray-600 hover:text-brand-orange hover:border-brand-orange hover:bg-orange-50 transition flex items-center justify-center"
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
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md active:scale-95 ${
                    isAdding
                      ? "bg-emerald-600 text-white shadow-emerald-500/20"
                      : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/25 hover:shadow-lg"
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

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex flex-col bg-white rounded-3xl border border-gray-100/80 hover:border-orange-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_22px_45px_-12px_rgba(255,106,0,0.18)] transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
      >
        {/* Top Visual Showcase */}
        <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-orange-50/50 via-white to-gray-50/60 p-4 flex items-center justify-center overflow-hidden border-b border-gray-50">
          <Link href={`/products/${product.slug}`} className="block w-full h-full relative">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-2 group-hover:scale-110 transition-transform duration-500 ease-out"
            />
          </Link>

          {/* Floating Discount Badge */}
          {product.discountPercent > 0 && (
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-md shadow-orange-500/30 flex items-center gap-1">
                <Zap className="w-3 h-3 fill-white" /> -{product.discountPercent}%
              </span>
            </div>
          )}

          {/* Floating Quick Action Icons on Right */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
            <button
              onClick={handleToggleWishlist}
              className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-md shadow-sm border border-white transition-all transform hover:scale-110 active:scale-90 ${
                isWishlisted ? "text-red-500 fill-red-500" : "text-gray-500 hover:text-red-500"
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
            </button>

            <button
              onClick={handleQuickView}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-md shadow-sm border border-white text-gray-500 hover:text-brand-orange hover:bg-orange-50 transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 duration-200"
              title="Quick View"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleToggleCompare}
              className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-md shadow-sm border border-white transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 duration-300 ${
                isCompared ? "text-brand-orange border-brand-orange font-bold bg-orange-50" : "text-gray-500 hover:text-brand-orange hover:bg-orange-50"
              }`}
              title="Compare"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Free Shipping pill on bottom left of image */}
          <div className="absolute bottom-2 left-3 z-10">
            <span className="text-[10px] font-semibold text-gray-500 bg-white/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-gray-100 shadow-xs">
              ⚡ Free Express
            </span>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex-1 flex flex-col p-4">
          {/* Brand & Stock Status */}
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50/80 px-2 py-0.5 rounded-md">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/50">
              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/products/${product.slug}`} className="mb-2">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-brand-orange transition-colors line-clamp-2 min-h-[2.5rem] leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* Pricing Row */}
          <div className="flex items-baseline justify-between mt-auto pt-2 mb-3">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-black text-gray-900 group-hover:text-brand-orange transition-colors">
                  {formatPrice(product.price)}
                </span>
                {product.mrp > product.price && (
                  <span className="text-[11px] text-gray-400 line-through font-medium">
                    {formatPrice(product.mrp)}
                  </span>
                )}
              </div>
              {discountSavings > 0 && (
                <span className="text-[10px] font-semibold text-emerald-600">
                  Save {formatPrice(discountSavings)}
                </span>
              )}
            </div>
          </div>

          {/* Modern Add to Cart CTA */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs font-bold transition-all duration-200 shadow-sm active:scale-[0.97] ${
              isAdding
                ? "bg-emerald-600 text-white shadow-emerald-500/20"
                : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/20 hover:shadow-md hover:shadow-orange-500/30"
            }`}
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added to Cart
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
