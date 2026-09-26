"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Heart,
  ShoppingCart,
  Zap,
  ArrowLeftRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ChevronRight,
  Store,
  Share2,
  HelpCircle,
  Clock,
  Sparkles,
  Maximize2,
  X,
} from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { RatingStars } from "@/components/common/RatingStars";
import { ProductCard } from "@/components/common/ProductCard";
import { PRODUCTS } from "@/data/products";
import { REVIEWS } from "@/data/reviews";
import { SELLERS } from "@/data/sellers";
import { formatPrice } from "@/utils/formatters";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";
import { useNotification } from "@/context/NotificationContext";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const seller = SELLERS.find((s) => s.id === product.sellerId) || SELLERS[0];
  const productReviews = REVIEWS.filter((r) => r.productId === product.id);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "details" | "specs" | "reviews" | "shipping" | "seller" | "qa"
  >("details");
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCompare, isInCompare } = useCompare();
  const { showToast } = useNotification();

  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant || undefined);
    setIsAdding(true);
    showToast(`Added ${quantity} x ${product.title.slice(0, 20)}... to your cart!`);
    setTimeout(() => setIsAdding(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant || undefined);
    router.push("/checkout");
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 bg-surface-secondary/30 py-6 sm:py-8">
        <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-ink-secondary mb-6 flex-wrap">
            <Link href="/" className="hover:text-oranza transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-ink-tertiary" />
            <Link href="/products" className="hover:text-oranza transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-ink-tertiary" />
            <Link
              href={`/category/${product.categorySlug}`}
              className="hover:text-oranza transition-colors capitalize"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-ink-tertiary" />
            <span className="font-semibold text-ink truncate max-w-xs">{product.title}</span>
          </nav>

          {/* Main Product Showcase Box (White Card) */}
          <div className="bg-white rounded-2xl border border-border p-5 sm:p-8 shadow-sm mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* LEFT: Product Gallery (Desktop: vertical thumbnails + main image) */}
              <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
                {/* Thumbnails list */}
                <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[500px] no-scrollbar flex-shrink-0">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border bg-surface-secondary flex-shrink-0 transition-all ${
                        selectedImageIndex === idx
                          ? "border-oranza ring-2 ring-oranza/30"
                          : "border-border hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-contain p-1"
                      />
                    </button>
                  ))}
                </div>

                {/* Large Main Image with Zoom Trigger */}
                <div className="relative flex-1 aspect-square rounded-2xl overflow-hidden border border-border bg-[#fcfcfc] flex items-center justify-center group">
                  <Image
                    src={product.images[selectedImageIndex] || product.thumbnail}
                    alt={product.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                    onClick={() => setIsZoomModalOpen(true)}
                  />

                  {/* Zoom button icon */}
                  <button
                    onClick={() => setIsZoomModalOpen(true)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm border border-border text-ink-secondary hover:text-oranza hover:scale-110 shadow-sm transition-all"
                    title="Fullscreen Zoom"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  {product.discountPercent > 0 && (
                    <span className="absolute top-4 left-4 bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded shadow-sm">
                      -{product.discountPercent}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* RIGHT: Product Details & Purchase Configuration */}
              <div className="lg:col-span-5 flex flex-col">
                {/* Brand & SKU */}
                <div className="flex items-center justify-between text-xs mb-2">
                  <Link
                    href={`/brand/${product.brandSlug}`}
                    className="font-bold text-oranza uppercase tracking-wider hover:underline"
                  >
                    Brands: {product.brand}
                  </Link>
                  <span className="text-ink-tertiary">SKU: {product.sku}</span>
                </div>

                {/* Product Title */}
                <h1 className="text-xl sm:text-2xl font-black text-ink leading-snug mb-3">
                  {product.title}
                </h1>

                {/* Rating & Availability */}
                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-border flex-wrap">
                  <RatingStars rating={product.rating} count={product.reviewCount} />
                  <span className="text-ink-tertiary text-xs">|</span>
                  <span className="text-xs font-bold text-emerald-600">
                    Available In Stock: {product.stockCount} Items
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mb-4 p-3 bg-surface-secondary rounded-xl">
                  {product.mrp > currentPrice && (
                    <span className="text-base text-ink-tertiary line-through font-semibold">
                      ₹{product.mrp.toLocaleString("en-IN")}
                    </span>
                  )}
                  <span className="text-3xl font-black text-oranza">
                    ₹{currentPrice.toLocaleString("en-IN")}
                  </span>
                  {product.discountPercent > 0 && (
                    <span className="text-xs font-bold text-red-600 bg-red-100/60 px-2 py-0.5 rounded">
                      {product.discountPercent}% OFF
                    </span>
                  )}
                </div>

                {/* Short description */}
                <p className="text-xs sm:text-sm text-ink-secondary mb-5 leading-relaxed">
                  {product.shortDescription || product.description}
                </p>

                {/* Variants Selection (if present) */}
                {product.variants && product.variants.length > 0 && (
                  <div className="mb-5">
                    <label className="text-xs font-bold text-ink uppercase tracking-wider mb-2 block">
                      Select Variant: <span className="text-oranza">{selectedVariant?.name}</span>
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {product.variants.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                            selectedVariant?.id === v.id
                              ? "border-oranza bg-oranza-50 text-oranza ring-1 ring-oranza"
                              : "border-border bg-white hover:border-gray-400 text-ink"
                          }`}
                        >
                          {v.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shipping prompt like the screenshot */}
                <div className="flex items-center gap-2 text-xs text-ink-secondary mb-5 bg-orange-50/50 p-2.5 rounded-lg border border-orange-100">
                  <Truck className="w-4 h-4 text-oranza flex-shrink-0" />
                  <span>
                    <strong>Free Shipping</strong> (Est. Delivery Time 2-3 Days)
                  </span>
                </div>

                {/* Quantity + Add to Cart + Buy Now */}
                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    {/* Quantity Picker */}
                    <div className="flex items-center border border-border rounded-lg bg-white overflow-hidden shadow-sm">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="px-3.5 py-2.5 text-sm font-bold text-ink-secondary hover:bg-gray-100 disabled:opacity-30"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-bold text-sm text-ink">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-3.5 py-2.5 text-sm font-bold text-ink-secondary hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart button in #FF6A00 */}
                    <button
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className={`flex-1 py-3 px-6 rounded-lg font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-all ${
                        isAdding
                          ? "bg-green-600 text-white"
                          : "bg-oranza hover:bg-oranza-600 text-white active:scale-[0.98]"
                      }`}
                    >
                      {isAdding ? (
                        <>
                          <Check className="w-4 h-4" /> Added to Cart
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" /> ADD TO CART
                        </>
                      )}
                    </button>
                  </div>

                  {/* Buy Now Full-Width Button */}
                  <button
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                    className="w-full py-3 px-6 rounded-lg font-black text-sm bg-neutral-900 hover:bg-black text-white flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Zap className="w-4 h-4 text-oranza" /> BUY NOW
                  </button>
                </div>

                {/* Secondary Actions: Wishlist & Compare */}
                <div className="flex items-center gap-6 pt-4 border-t border-border text-xs font-semibold">
                  <button
                    onClick={() => {
                      toggleWishlist(product);
                      showToast(isWishlisted ? "Removed from wishlist" : "Added to your wishlist!");
                    }}
                    className={`flex items-center gap-1.5 transition-colors ${
                      isWishlisted ? "text-red-500 font-bold" : "text-ink-secondary hover:text-red-500"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500" : ""}`} />
                    <span>{isWishlisted ? "Wishlisted" : "Add to Wishlist"}</span>
                  </button>

                  <button
                    onClick={() => {
                      const res = addToCompare(product);
                      showToast(res.message, res.success ? "success" : "info");
                    }}
                    className={`flex items-center gap-1.5 transition-colors ${
                      isCompared ? "text-oranza font-bold" : "text-ink-secondary hover:text-oranza"
                    }`}
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                    <span>{isCompared ? "In Compare" : "Add to Compare"}</span>
                  </button>
                </div>

                {/* Seller Box */}
                <div className="mt-6 p-4 rounded-xl border border-border bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-oranza font-bold">
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-ink">{seller.storeName}</div>
                      <div className="text-[11px] text-ink-secondary">
                        {seller.rating} ★ Rating • Verified Official Merchant
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/seller`}
                    className="text-xs font-bold text-oranza hover:underline"
                  >
                    Store Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* BELOW: Interactive Tabs for Details, Specs, Reviews, Q&A, Shipping, Seller */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm mb-12">
            {/* Tabs Header */}
            <div className="flex border-b border-border bg-surface-secondary/60 overflow-x-auto no-scrollbar">
              {[
                { id: "details", label: "Product Details" },
                { id: "specs", label: "Specifications" },
                { id: "reviews", label: `Reviews (${productReviews.length || product.reviewCount})` },
                { id: "qa", label: "Questions & Answers" },
                { id: "shipping", label: "Shipping & Returns" },
                { id: "seller", label: "Seller Information" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-6 py-4 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
                    activeTab === tab.id
                      ? "border-oranza text-oranza bg-white"
                      : "border-transparent text-ink-secondary hover:text-ink"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="p-6 sm:p-8">
              {activeTab === "details" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-ink mb-3">Product Overview</h3>
                    <p className="text-sm text-ink-secondary leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {product.highlights && product.highlights.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-3">
                        Highlights & Features
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {product.highlights.map((h, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 p-3 bg-surface-secondary rounded-lg text-xs font-medium text-ink"
                          >
                            <span className="w-2 h-2 rounded-full bg-oranza flex-shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "specs" && (
                <div>
                  <h3 className="text-base font-bold text-ink mb-4">Technical Specifications</h3>
                  <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
                    {product.specifications.map((spec, i) => (
                      <div key={i} className="grid grid-cols-3 p-3.5 text-xs">
                        <span className="font-bold text-ink-secondary">{spec.name}</span>
                        <span className="col-span-2 text-ink font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  {/* Reviews Summary */}
                  <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-surface-secondary rounded-xl gap-6">
                    <div className="text-center sm:text-left">
                      <div className="text-4xl font-black text-ink">{product.rating.toFixed(1)}</div>
                      <RatingStars rating={product.rating} count={product.reviewCount} size="md" />
                      <p className="text-xs text-ink-secondary mt-1">Based on {product.reviewCount} verified ratings</p>
                    </div>

                    <div className="flex flex-col gap-1 w-full max-w-xs text-xs">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="w-6 text-right font-medium">{stars}★</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-400"
                              style={{
                                width:
                                  stars === 5 ? "78%" : stars === 4 ? "15%" : stars === 3 ? "5%" : "2%",
                              }}
                            />
                          </div>
                          <span className="w-8 text-ink-tertiary text-[10px]">
                            {stars === 5 ? "78%" : stars === 4 ? "15%" : "5%"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Reviews List */}
                  <div className="space-y-4 pt-4">
                    {productReviews.length > 0 ? (
                      productReviews.map((rev) => (
                        <div key={rev.id} className="p-4 rounded-xl border border-border bg-white">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-oranza-50 text-oranza font-bold text-xs flex items-center justify-center">
                                {rev.userName.charAt(0)}
                              </div>
                              <div>
                                <span className="font-bold text-xs text-ink">{rev.userName}</span>
                                {rev.verifiedPurchase && (
                                  <span className="ml-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                                    Verified Buyer
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="text-[11px] text-ink-tertiary">{rev.createdAt}</span>
                          </div>

                          <RatingStars rating={rev.rating} showCount={false} />
                          <h5 className="font-bold text-xs text-ink mt-2">{rev.title}</h5>
                          <p className="text-xs text-ink-secondary mt-1 leading-relaxed">
                            {rev.comment}
                          </p>

                          {rev.sellerReply && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg border-l-2 border-oranza text-xs">
                              <span className="font-bold text-oranza block mb-0.5">Seller Response:</span>
                              <span className="text-ink-secondary">{rev.sellerReply.comment}</span>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-ink-secondary">
                        No reviews yet for this product. Be the first to review!
                      </p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "qa" && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-ink mb-2">Questions & Answers</h3>
                  <div className="p-4 rounded-xl border border-border bg-white space-y-2">
                    <p className="font-bold text-xs text-ink">Q: Does this come with official manufacturer warranty in India?</p>
                    <p className="text-xs text-ink-secondary">A: Yes, all products sold on ORANZA carry a 1-year brand warranty with nationwide authorized service center support.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-white space-y-2">
                    <p className="font-bold text-xs text-ink">Q: What is the return window if I am not satisfied?</p>
                    <p className="text-xs text-ink-secondary">A: You have 7 days from the delivery date for a full doorstep replacement or refund.</p>
                  </div>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="space-y-4 text-xs text-ink-secondary leading-relaxed">
                  <h3 className="text-base font-bold text-ink mb-2">Shipping & Return Policies</h3>
                  <p>
                    Orders placed on ORANZA are dispatched directly via certified courier partners (Blue Dart, Delhivery) within 24 hours.
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Free shipping on all orders over ₹999.</li>
                    <li>Doorstep tracking updates sent in real-time via SMS and email.</li>
                    <li>7-day return policy for electronics, apparel, and home appliances.</li>
                  </ul>
                </div>
              )}

              {activeTab === "seller" && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-ink mb-2">Seller Storefront</h3>
                  <div className="p-5 rounded-xl border border-border bg-surface-secondary flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-ink">{seller.storeName}</h4>
                      <p className="text-xs text-ink-secondary mt-1">{seller.description}</p>
                      <span className="inline-block mt-2 text-xs font-semibold text-emerald-600">
                        {seller.ordersCount.toLocaleString("en-IN")}+ Orders Fulfilled
                      </span>
                    </div>
                    <Link
                      href="/seller"
                      className="px-4 py-2 bg-oranza text-white font-bold text-xs rounded-lg hover:bg-oranza-600 transition-colors"
                    >
                      Visit Merchant Hub
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Similar Products Recommendation */}
          {relatedProducts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-black text-ink mb-6">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Fullscreen Image Zoom Modal */}
        {isZoomModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
            <button
              onClick={() => setIsZoomModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full max-w-4xl h-[80vh]">
              <Image
                src={product.images[selectedImageIndex] || product.thumbnail}
                alt={product.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
