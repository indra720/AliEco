"use client";

import React, { useState, useRef } from "react";
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
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [zoomCoords, setZoomCoords] = useState<{ x: number; y: number } | null>(null);

  // Selected variant options
  const colorVariants = product.variants?.filter((v) => v.color) || [];
  const defaultColors =
    colorVariants.length > 0
      ? colorVariants.map((v) => ({ name: v.color || "", image: v.image }))
      : [
          { name: "Default", hex: "#1e293b" },
          { name: "Coral", hex: "#f97316" },
          { name: "Emerald", hex: "#059669" },
        ];

  const sizeVariants = product.variants?.filter((v) => v.size) || [];
  const defaultSizes =
    sizeVariants.length > 0
      ? sizeVariants.map((v) => v.size || "")
      : product.categorySlug === "fashion"
      ? ["S", "M", "L", "XL"]
      : [];

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();
  const { showToast } = useNotification();

  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  // Determine active display image (variant image if available, else primary)
  const variantImage = colorVariants[selectedColor]?.image;
  const primaryImage = variantImage || product.images[0] || product.thumbnail;
  const secondaryImage = product.images[1] || product.images[0] || product.thumbnail;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setZoomCoords(null);
    setIsImageHovered(false);
  };

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

  // Helper color map for swatches
  const getColorHex = (name: string, fallbackHex?: string) => {
    if (fallbackHex) return fallbackHex;
    const n = name.toLowerCase();
    if (n.includes("pink") || n.includes("rani") || n.includes("rose")) return "#e11d48";
    if (n.includes("red") || n.includes("crimson") || n.includes("maroon")) return "#dc2626";
    if (n.includes("blue") || n.includes("navy")) return "#1d4ed8";
    if (n.includes("green") || n.includes("emerald")) return "#059669";
    if (n.includes("yellow") || n.includes("marigold") || n.includes("gold")) return "#d97706";
    if (n.includes("black") || n.includes("midnight")) return "#0f172a";
    if (n.includes("silver") || n.includes("white") || n.includes("grey")) return "#94a3b8";
    return "#ea580c";
  };

  if (layout === "list") {
    return (
      <>
        <div className="group relative flex flex-col sm:flex-row bg-white rounded-2xl border border-gray-200 hover:border-brand-orange hover:shadow-lg transition-all duration-300 overflow-hidden p-4 sm:p-5 gap-5">
          <Link
            href={`/products/${product.slug}`}
            className="relative w-full sm:w-56 aspect-[3/4] sm:aspect-auto flex-shrink-0 bg-gray-50/70 rounded-xl overflow-hidden p-3 flex items-center justify-center"
          >
            <Image
              src={primaryImage}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, 240px"
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            />
            {product.discountPercent > 0 && (
              <span className="absolute top-2.5 left-2.5 bg-[#ff4d4f] text-white text-xs font-black px-2.5 py-1 rounded-full shadow-xs">
                {product.discountPercent}%
              </span>
            )}
          </Link>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
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
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400 font-medium ml-1">({product.rating})</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 flex-wrap gap-3">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-brand-orange">
                  {formatPrice(product.price)}
                </span>
                {product.mrp > product.price && (
                  <span className="text-xs text-gray-400 line-through font-medium">
                    {formatPrice(product.mrp)}
                  </span>
                )}
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
                  className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl border-2 font-bold text-xs uppercase tracking-wider transition-all active:scale-95 ${
                    isAdding
                      ? "border-emerald-600 bg-emerald-600 text-white shadow-emerald-500/20"
                      : "border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
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

  // ULTRA-PREMIUM GRID PRODUCT CARD MATCHING SCREENSHOT 3 (RNN Saree Reference)
  return (
    <>
      <div className="group relative flex flex-col bg-white rounded-2xl border border-gray-200 hover:border-brand-orange hover:shadow-[0_16px_36px_-10px_rgba(255,106,0,0.18)] transition-all duration-300 overflow-hidden">
        {/* Top Product Image Showcase with Cursor Zoom & Hover Flip */}
        <div
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative aspect-[3/4] w-full bg-[#f8f9fa] overflow-hidden cursor-crosshair"
        >
          <Link href={`/products/${product.slug}`} className="block w-full h-full relative">
            {/* Primary Image */}
            <Image
              src={isImageHovered && secondaryImage ? secondaryImage : primaryImage}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
              className={`object-cover transition-transform duration-300 ease-out ${
                zoomCoords ? "scale-[1.65]" : "scale-100 group-hover:scale-105"
              }`}
              style={
                zoomCoords
                  ? {
                      transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`,
                    }
                  : undefined
              }
            />
          </Link>

          {/* Top Left Discount Tag matching Screenshot 3 */}
          {product.discountPercent > 0 && (
            <span className="absolute top-3 left-3 z-20 bg-[#ff4d4f] text-white text-xs font-black px-2.5 py-1 rounded-full shadow-sm tracking-wide">
              {product.discountPercent}%
            </span>
          )}

          {/* Stack of 3 Circular Action Buttons on Top Right matching Screenshot 3 */}
          <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
            {/* 1. Quick View / Maximize Button */}
            <button
              onClick={handleQuickView}
              className="w-8 h-8 rounded-full bg-white shadow-md border border-gray-150 flex items-center justify-center text-gray-700 hover:text-brand-orange hover:border-brand-orange hover:scale-110 active:scale-90 transition-all"
              title="Quick View Modal"
              aria-label="Quick View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>

            {/* 2. Compare Button */}
            <button
              onClick={handleToggleCompare}
              className={`w-8 h-8 rounded-full shadow-md border flex items-center justify-center transition-all hover:scale-110 active:scale-90 ${
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
              className={`w-8 h-8 rounded-full shadow-md border flex items-center justify-center transition-all hover:scale-110 active:scale-90 ${
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

          {/* Zoom hint indicator pill on hover */}
          {zoomCoords && (
            <div className="absolute bottom-2.5 left-3 z-20 bg-black/75 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full pointer-events-none">
              🔍 1.6x Zoom Lens
            </div>
          )}
        </div>

        {/* Clean, Elegant Information Block */}
        <div className="flex-1 flex flex-col p-4">
          {/* Brand Name */}
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
            {product.brand}
          </span>

          {/* Product Title */}
          <Link href={`/products/${product.slug}`} className="mb-2">
            <h3 className="text-sm font-bold text-gray-900 group-hover:text-brand-orange transition-colors line-clamp-1 leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* 5 Solid Golden Stars matching Screenshot 3 */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center text-[#fa8c16]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-[#fa8c16] text-[#fa8c16]"
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-gray-500 ml-1">
              ({product.rating})
            </span>
          </div>

          {/* Price Line (Strikethrough MRP + Bold Sale Price) */}
          <div className="flex items-baseline gap-2 mb-2.5">
            <span className="text-base sm:text-lg font-black text-brand-orange">
              {formatPrice(product.price)}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs text-gray-400 line-through font-medium">
                {formatPrice(product.mrp)}
              </span>
            )}
          </div>

          {/* Color & Size Swatches Option (Requested by user) */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100 my-1">
            {/* Color Swatches */}
            <div className="flex items-center gap-1.5">
              {defaultColors.slice(0, 4).map((c, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColor(idx);
                  }}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    selectedColor === idx
                      ? "ring-2 ring-brand-orange scale-110 border-white"
                      : "border-gray-300 hover:scale-110"
                  }`}
                  style={{
                    backgroundColor: getColorHex(c.name, (c as any).hex),
                  }}
                  title={c.name}
                />
              ))}
            </div>

            {/* Size Pills */}
            {defaultSizes.length > 0 && (
              <div className="flex items-center gap-1">
                {defaultSizes.slice(0, 4).map((sz, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSize(idx);
                    }}
                    className={`px-1.5 py-0.5 text-[10px] font-bold rounded transition-all ${
                      selectedSize === idx
                        ? "bg-brand-orange text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clean Outlined ADD TO CART Button matching Screenshot 3 */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full mt-3 py-2.5 px-3 rounded-xl border-2 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-xs ${
              isAdding
                ? "border-emerald-600 bg-emerald-600 text-white shadow-emerald-500/20"
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
