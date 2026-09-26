"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Check,
  ShoppingCart,
  Heart,
  ArrowLeftRight,
  Star,
  Search,
  ChevronUp,
  ChevronDown,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/utils/formatters";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";
import { useNotification } from "@/context/NotificationContext";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [added, setAdded] = useState(false);
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number } | null>(null);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();
  const { showToast } = useNotification();

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  // Variant swatches
  const colorVariants = product.variants?.filter((v) => v.color) || [];
  const defaultColors =
    colorVariants.length > 0
      ? colorVariants.map((v) => ({ name: v.color || "", image: v.image }))
      : [
          { name: "Magenta", hex: "#e11d48" },
          { name: "Royal Navy", hex: "#1e3a8a" },
          { name: "Emerald", hex: "#059669" },
          { name: "Gold", hex: "#d97706" },
        ];

  const sizeVariants = product.variants?.filter((v) => v.size) || [];
  const defaultSizes =
    sizeVariants.length > 0
      ? sizeVariants.map((v) => v.size || "")
      : product.categorySlug === "fashion"
      ? ["S", "M", "L", "XL"]
      : ["Standard"];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    showToast(`Added ${quantity} x "${product.title.slice(0, 24)}..." to cart!`);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    showToast(isWishlisted ? "Removed from wishlist" : "Added to your wishlist!");
  };

  const handleToggleCompare = () => {
    if (isCompared) {
      removeFromCompare(product.id);
      showToast("Removed from compare");
    } else {
      const res = addToCompare(product);
      showToast(res.message, res.success ? "success" : "info");
    }
  };

  const getColorHex = (name: string, fallbackHex?: string) => {
    if (fallbackHex) return fallbackHex;
    const n = name.toLowerCase();
    if (n.includes("pink") || n.includes("rani") || n.includes("magenta")) return "#e11d48";
    if (n.includes("red") || n.includes("crimson")) return "#dc2626";
    if (n.includes("blue") || n.includes("navy")) return "#1d4ed8";
    if (n.includes("green") || n.includes("emerald")) return "#059669";
    if (n.includes("yellow") || n.includes("gold")) return "#d97706";
    if (n.includes("black")) return "#0f172a";
    if (n.includes("silver") || n.includes("white")) return "#94a3b8";
    return "#ea580c";
  };

  const imagesList = product.images.length > 0 ? product.images : [product.thumbnail];
  const activeImage = imagesList[selectedImage] || product.thumbnail;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-h-[92vh] flex flex-col">
        {/* Top Right Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 overflow-y-auto">
          {/* LEFT: VERTICAL THUMBNAILS + LARGE ACTIVE IMAGE (Matching Screenshot 4) */}
          <div className="md:col-span-6 flex gap-3.5 items-start">
            {/* Vertical Thumbnail Strip */}
            <div className="flex flex-col gap-2.5 flex-shrink-0">
              {imagesList.slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-14 h-18 sm:w-16 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-brand-orange shadow-md ring-2 ring-orange-200 scale-102"
                      : "border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Interactive Zoom Canvas */}
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setZoomPos(null)}
              className="relative aspect-[3/4] flex-1 rounded-2xl overflow-hidden bg-[#f8f9fa] border border-gray-200 cursor-crosshair group"
            >
              <Image
                src={activeImage}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover transition-transform duration-200 ease-out ${
                  zoomPos ? "scale-[1.8]" : "scale-100"
                }`}
                style={
                  zoomPos
                    ? {
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      }
                    : undefined
                }
              />

              {/* Magnifier Lens Icon on Bottom Right matching Screenshot 4 */}
              <div className="absolute bottom-3 right-3 z-10 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md shadow-md border border-gray-200 flex items-center justify-center text-gray-700 pointer-events-none">
                <Search className="w-4 h-4 text-gray-600" />
              </div>

              {/* Floating Discount Tag */}
              {product.discountPercent > 0 && (
                <div className="absolute top-3 left-3 bg-[#ff4d4f] text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-xs">
                  {product.discountPercent}%
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO MATCHING SCREENSHOT 4 */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              {/* Product Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-2">
                {product.title}
              </h2>

              {/* Brands & Review Stars */}
              <div className="flex items-center gap-3 text-xs mb-3 flex-wrap">
                <span className="font-semibold text-gray-600">
                  Brands : <strong className="text-gray-900">{product.brand}</strong>
                </span>
                <span className="text-gray-300">|</span>
                <div className="flex items-center text-[#fa8c16]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-[#fa8c16] text-[#fa8c16]"
                    />
                  ))}
                  <span className="text-gray-500 font-semibold ml-1.5">
                    Review ({product.reviewCount})
                  </span>
                </div>
              </div>

              {/* Price Line + In Stock Status matching Screenshot 4 */}
              <div className="flex items-baseline gap-3 py-3 border-y border-gray-100 mb-4 flex-wrap">
                {product.mrp > product.price && (
                  <span className="text-base text-gray-400 line-through font-medium">
                    {formatPrice(product.mrp)}
                  </span>
                )}
                <span className="text-2xl sm:text-3xl font-black text-[#ff4d4f]">
                  {formatPrice(product.price)}
                </span>
                <span className="ml-auto text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Available In Stock: {product.stockCount || "65432"} Items
                </span>
              </div>

              {/* Description Text */}
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                {product.description || product.shortDescription}
              </p>

              {/* Free Shipping Note */}
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-150 mb-5">
                <Truck className="w-4 h-4 text-brand-orange shrink-0" />
                <span>Free Shipping (Est. Delivery Time 2-3 Days)</span>
              </div>

              {/* Color Options */}
              <div className="mb-4">
                <span className="text-xs font-bold text-gray-700 block mb-2">
                  Select Color: <span className="text-brand-orange">{defaultColors[selectedColor]?.name}</span>
                </span>
                <div className="flex items-center gap-2">
                  {defaultColors.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedColor(idx);
                        if ((c as any).image) {
                          const imgIdx = imagesList.indexOf((c as any).image);
                          if (imgIdx >= 0) setSelectedImage(imgIdx);
                        }
                      }}
                      className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColor === idx
                          ? "ring-2 ring-brand-orange ring-offset-2 scale-110 border-white shadow-sm"
                          : "border-gray-200 hover:scale-105"
                      }`}
                      style={{ backgroundColor: getColorHex(c.name, (c as any).hex) }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Options */}
              {defaultSizes.length > 0 && (
                <div className="mb-5">
                  <span className="text-xs font-bold text-gray-700 block mb-2">
                    Select Size:
                  </span>
                  <div className="flex items-center gap-2">
                    {defaultSizes.map((sz, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSize(idx)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                          selectedSize === idx
                            ? "bg-brand-orange text-white border-brand-orange shadow-sm"
                            : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Selector + Add To Cart CTA matching Screenshot 4 */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                {/* Quantity Box with Up/Down buttons */}
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
                  <span className="w-10 text-center font-bold text-sm text-gray-900">
                    {quantity}
                  </span>
                  <div className="flex flex-col border-l border-gray-200 bg-gray-50">
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-1 hover:bg-gray-200 text-gray-700 transition"
                      aria-label="Increase quantity"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-1 hover:bg-gray-200 text-gray-700 transition border-t border-gray-200"
                      aria-label="Decrease quantity"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Big Vibrant Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm uppercase tracking-wider text-white transition-all shadow-md active:scale-95 ${
                    added
                      ? "bg-emerald-600 shadow-emerald-500/25"
                      : "bg-[#ff4d4f] hover:bg-[#ff7875] shadow-red-500/25"
                  }`}
                >
                  {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                  {added ? "Added to Cart!" : "Add to Cart"}
                </button>
              </div>

              {/* Wishlist & Compare Links matching Screenshot 4 */}
              <div className="flex items-center gap-6 text-xs font-semibold text-gray-600">
                <button
                  onClick={handleToggleWishlist}
                  className={`flex items-center gap-1.5 hover:text-[#ff4d4f] transition-colors ${
                    isWishlisted ? "text-[#ff4d4f] font-bold" : ""
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-[#ff4d4f]" : ""}`} />
                  <span>{isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}</span>
                </button>

                <button
                  onClick={handleToggleCompare}
                  className={`flex items-center gap-1.5 hover:text-brand-orange transition-colors ${
                    isCompared ? "text-brand-orange font-bold" : ""
                  }`}
                >
                  <ArrowLeftRight className="w-4 h-4" />
                  <span>{isCompared ? "In Comparison" : "Add to Compare"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickViewModal;
