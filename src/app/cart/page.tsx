"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Heart,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  CheckCircle2,
  ShoppingBag,
  RotateCcw,
} from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useNotification } from "@/context/NotificationContext";
import { formatPrice } from "@/utils/formatters";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    subtotal,
    discount,
    shippingFee,
    tax,
    total,
    itemCount,
  } = useCart();

  const { addToWishlist } = useWishlist();
  const { showToast } = useNotification();

  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;

    const res = applyCoupon(couponCodeInput);
    setCouponMessage({ text: res.message, isError: !res.success });
    showToast(res.message, res.success ? "success" : "error");
    if (res.success) {
      setCouponCodeInput("");
    }
  };

  const handleMoveToWishlist = (item: (typeof cart)[0]) => {
    addToWishlist(item.product);
    removeFromCart(item.product.id, item.selectedVariant?.id);
    showToast("Moved item to wishlist");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6 bg-surface-secondary/40">
          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-border shadow-sm text-center max-w-md w-full flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-oranza-50 text-oranza flex items-center justify-center mb-5">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-ink mb-2">Your Cart is Empty</h1>
            <p className="text-xs sm:text-sm text-ink-secondary mb-6 leading-relaxed">
              Looks like you haven't added anything to your cart yet. Explore thousands of super deals and products now!
            </p>
            <Link
              href="/products"
              className="w-full bg-oranza hover:bg-oranza-600 text-white font-bold text-sm py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              Start Shopping <ArrowRight className="w-4 h-4" />
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
          <h1 className="text-2xl font-black text-ink mb-6">
            Shopping Cart <span className="text-sm font-normal text-ink-secondary">({itemCount} items)</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: Items List */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              {/* Free Shipping Alert Banner */}
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800 font-medium">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>
                    {subtotal >= 999
                      ? "You've unlocked FREE Express Delivery on this order!"
                      : `Add items worth ${formatPrice(999 - subtotal)} more for FREE Express Delivery.`}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase bg-emerald-600 text-white px-2 py-0.5 rounded">
                  Eligible
                </span>
              </div>

              {/* Items Card List */}
              <div className="bg-white rounded-2xl border border-border divide-y divide-border overflow-hidden shadow-sm">
                {cart.map((item) => {
                  const unitPrice = item.selectedVariant
                    ? item.selectedVariant.price
                    : item.product.price;
                  const itemSubtotal = unitPrice * item.quantity;

                  return (
                    <div
                      key={`${item.product.id}-${item.selectedVariant?.id || "default"}`}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                    >
                      {/* Thumbnail & Title */}
                      <div className="flex items-center gap-4 flex-1">
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-border bg-surface-secondary flex-shrink-0"
                        >
                          <Image
                            src={item.product.thumbnail}
                            alt={item.product.title}
                            fill
                            sizes="96px"
                            className="object-contain p-2 hover:scale-105 transition-transform"
                          />
                        </Link>

                        <div className="flex-1">
                          <span className="text-[10px] font-bold text-oranza uppercase tracking-wider block">
                            {item.product.brand}
                          </span>
                          <Link href={`/products/${item.product.slug}`}>
                            <h3 className="text-sm font-bold text-ink hover:text-oranza transition-colors line-clamp-2">
                              {item.product.title}
                            </h3>
                          </Link>
                          {item.selectedVariant && (
                            <span className="inline-block mt-1 text-xs text-ink-secondary bg-gray-100 px-2 py-0.5 rounded">
                              Variant: {item.selectedVariant.name}
                            </span>
                          )}
                          <div className="text-xs text-ink-tertiary mt-1">
                            Sold by: <span className="text-ink font-semibold">{item.product.sellerName}</span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity & Price Controls */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-border">
                        {/* Quantity picker */}
                        <div className="flex items-center border border-border rounded-lg bg-surface-secondary overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.selectedVariant?.id
                              )
                            }
                            className="px-2.5 py-1 text-xs font-bold text-ink-secondary hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-ink">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.selectedVariant?.id
                              )
                            }
                            className="px-2.5 py-1 text-xs font-bold text-ink-secondary hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>

                        {/* Price Breakdown */}
                        <div className="text-right">
                          <div className="text-sm sm:text-base font-black text-ink">
                            {formatPrice(itemSubtotal)}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-[10px] text-ink-tertiary">
                              {formatPrice(unitPrice)} each
                            </div>
                          )}
                        </div>

                        {/* Actions: Wishlist and Delete */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleMoveToWishlist(item)}
                            className="p-2 text-ink-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Move to Wishlist"
                          >
                            <Heart className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              removeFromCart(item.product.id, item.selectedVariant?.id)
                            }
                            className="p-2 text-ink-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs text-ink-secondary pt-2">
                <Link
                  href="/products"
                  className="font-bold text-oranza hover:underline flex items-center gap-1"
                >
                  ← Continue Shopping
                </Link>
                <span>Need help with your cart? Call 1800-419-ORANZA</span>
              </div>
            </div>

            {/* RIGHT: Order Summary */}
            <div className="lg:col-span-4 flex flex-col gap-4 sticky top-28">
              {/* Summary Card */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-base font-black text-ink uppercase tracking-wider mb-4 pb-3 border-b border-border">
                  Order Summary
                </h2>

                {/* Pricing Table */}
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-ink-secondary">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-ink">{formatPrice(subtotal)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-ink-secondary">
                    <span>Shipping Fee</span>
                    <span className="font-semibold text-ink">
                      {shippingFee === 0 ? (
                        <span className="text-emerald-600 font-bold">FREE</span>
                      ) : (
                        formatPrice(shippingFee)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-ink-secondary">
                    <span>Estimated GST (5%)</span>
                    <span className="font-semibold text-ink">{formatPrice(tax)}</span>
                  </div>

                  <div className="pt-3 border-t border-border flex justify-between items-baseline">
                    <span className="text-sm font-black text-ink">Total Amount</span>
                    <span className="text-2xl font-black text-oranza">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Coupon Code Section */}
                <div className="mt-6 pt-5 border-t border-border">
                  <label className="text-xs font-bold text-ink uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-oranza" /> Apply Promo Coupon
                  </label>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                      <div>
                        <span className="font-bold">{appliedCoupon.code}</span>
                        <p className="text-[11px]">{appliedCoupon.description}</p>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-red-600 font-bold hover:underline text-[11px]"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponCodeInput}
                        onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                        placeholder="e.g. ORANZA10, SUPERDEAL"
                        className="w-full uppercase text-xs font-mono font-bold px-3 py-2 border border-border rounded-lg outline-none focus:border-oranza bg-surface-secondary"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {couponMessage && (
                    <p
                      className={`text-[11px] mt-1.5 font-medium ${
                        couponMessage.isError ? "text-red-600" : "text-emerald-600"
                      }`}
                    >
                      {couponMessage.text}
                    </p>
                  )}

                  <div className="mt-2 text-[10px] text-ink-tertiary">
                    Try: <span className="font-mono font-bold text-ink">ORANZA10</span> or{" "}
                    <span className="font-mono font-bold text-ink">SUPERDEAL</span>
                  </div>
                </div>

                {/* Proceed to Checkout button */}
                <div className="mt-6">
                  <Link
                    href="/checkout"
                    className="w-full bg-oranza hover:bg-oranza-600 text-white font-bold text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Trust guarantee */}
                <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2 text-[11px] text-ink-secondary">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>256-Bit Bank-grade encrypted checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>7-Day Hassle-free doorstep returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
