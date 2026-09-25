"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  MapPin,
  Truck,
  CreditCard,
  ShoppingBag,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  Smartphone,
  Building,
  Wallet,
  Banknote,
} from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/utils/formatters";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discount, shippingFee, tax, total, clearCart } = useCart();
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Address Form State
  const [address, setAddress] = useState({
    fullName: user?.name || "Aarav Sharma",
    email: user?.email || "aarav.sharma@gmail.com",
    phone: "+91 98199 11223",
    street: "B-402, Lodha Bellissimo, Apollo Mills Compound, Mahalaxmi",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400011",
    country: "India",
  });

  // Step 2: Delivery Option State
  const [deliveryOption, setDeliveryOption] = useState<"standard" | "express">("standard");

  // Step 3: Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<
    "UPI" | "Credit Card" | "Debit Card" | "Net Banking" | "Wallet" | "Cash on Delivery"
  >("UPI");
  const [upiId, setUpiId] = useState("aarav@okhdfcbank");

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    setTimeout(() => {
      clearCart();
      const generatedOrderId = `ORZ-${Math.floor(10000 + Math.random() * 90000)}`;
      router.push(`/order-success?orderId=${generatedOrderId}&total=${total}`);
    }, 1500);
  };

  const steps = [
    { number: 1, label: "Address", icon: MapPin },
    { number: 2, label: "Delivery", icon: Truck },
    { number: 3, label: "Payment", icon: CreditCard },
    { number: 4, label: "Review", icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 bg-surface-secondary/40 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Checkout Progress Stepper */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 -z-0" />
              {steps.map((step) => {
                const Icon = step.icon;
                const isCompleted = currentStep > step.number;
                const isCurrent = currentStep === step.number;

                return (
                  <button
                    key={step.number}
                    onClick={() => {
                      if (step.number < currentStep) setCurrentStep(step.number as typeof currentStep);
                    }}
                    className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                        isCompleted
                          ? "bg-green-600 text-white ring-4 ring-green-100"
                          : isCurrent
                          ? "bg-oranza text-white ring-4 ring-orange-100 shadow-md scale-110"
                          : "bg-white text-ink-tertiary border border-border"
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span
                      className={`text-xs font-bold mt-2 ${
                        isCurrent ? "text-oranza" : isCompleted ? "text-ink" : "text-ink-tertiary"
                      }`}
                    >
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: Multi-Step Interactive Form */}
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-sm">
              {/* STEP 1: Address */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div>
                      <h2 className="text-lg font-black text-ink">Step 1: Shipping Address</h2>
                      <p className="text-xs text-ink-secondary">Where should we deliver your order?</p>
                    </div>
                    <span className="text-xs font-bold text-oranza bg-oranza-50 px-2 py-1 rounded">
                      Indian Postal System
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-ink uppercase tracking-wider block mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={address.fullName}
                        onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-ink uppercase tracking-wider block mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="text"
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-ink uppercase tracking-wider block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={address.email}
                        onChange={(e) => setAddress({ ...address, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-ink uppercase tracking-wider block mb-1.5">
                        Street Address / Apartment / Landmark *
                      </label>
                      <input
                        type="text"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-ink uppercase tracking-wider block mb-1.5">
                        City *
                      </label>
                      <input
                        type="text"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-ink uppercase tracking-wider block mb-1.5">
                        State *
                      </label>
                      <input
                        type="text"
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-ink uppercase tracking-wider block mb-1.5">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        value={address.pincode}
                        onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-ink uppercase tracking-wider block mb-1.5">
                        Country
                      </label>
                      <input
                        type="text"
                        disabled
                        value={address.country}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm bg-gray-50 text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="bg-oranza hover:bg-oranza-600 text-white font-bold text-sm px-8 py-3 rounded-xl flex items-center gap-2 shadow-sm transition-all"
                    >
                      Continue to Delivery <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Delivery */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div>
                      <h2 className="text-lg font-black text-ink">Step 2: Choose Delivery Speed</h2>
                      <p className="text-xs text-ink-secondary">Select fulfillment speed for this shipment</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label
                      onClick={() => setDeliveryOption("standard")}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        deliveryOption === "standard"
                          ? "border-oranza bg-oranza-50/40 ring-1 ring-oranza"
                          : "border-border hover:border-gray-400 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="delivery"
                          checked={deliveryOption === "standard"}
                          onChange={() => setDeliveryOption("standard")}
                          className="accent-oranza"
                        />
                        <div>
                          <span className="font-bold text-sm text-ink block">Standard Express Delivery</span>
                          <span className="text-xs text-ink-secondary">Estimated arrival in 2 - 3 business days</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600">FREE</span>
                    </label>

                    <label
                      onClick={() => setDeliveryOption("express")}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        deliveryOption === "express"
                          ? "border-oranza bg-oranza-50/40 ring-1 ring-oranza"
                          : "border-border hover:border-gray-400 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="delivery"
                          checked={deliveryOption === "express"}
                          onChange={() => setDeliveryOption("express")}
                          className="accent-oranza"
                        />
                        <div>
                          <span className="font-bold text-sm text-ink block">Priority Express (Next Day By 2 PM)</span>
                          <span className="text-xs text-ink-secondary">Air expedited priority routing</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-ink">₹149</span>
                    </label>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-xs font-bold text-ink-secondary hover:text-ink flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back to Address
                    </button>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="bg-oranza hover:bg-oranza-600 text-white font-bold text-sm px-8 py-3 rounded-xl flex items-center gap-2 shadow-sm transition-all"
                    >
                      Continue to Payment <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Payment */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div>
                      <h2 className="text-lg font-black text-ink">Step 3: Select Payment Option</h2>
                      <p className="text-xs text-ink-secondary">All Indian payment gateways supported with 256-bit encryption</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: "UPI", label: "Instant UPI (GPay, PhonePe, Paytm)", icon: Smartphone },
                      { id: "Credit Card", label: "Credit Card", icon: CreditCard },
                      { id: "Debit Card", label: "Debit Card / RuPay", icon: CreditCard },
                      { id: "Net Banking", label: "Net Banking (All Indian Banks)", icon: Building },
                      { id: "Wallet", label: "Paytm / Amazon Pay Wallet", icon: Wallet },
                      { id: "Cash on Delivery", label: "Cash on Delivery (COD)", icon: Banknote },
                    ].map((pm) => {
                      const Icon = pm.icon;
                      const isSelected = paymentMethod === pm.id;

                      return (
                        <button
                          key={pm.id}
                          type="button"
                          onClick={() => setPaymentMethod(pm.id as typeof paymentMethod)}
                          className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                            isSelected
                              ? "border-oranza bg-oranza-50/40 ring-1 ring-oranza text-ink"
                              : "border-border hover:border-gray-400 bg-white text-ink-secondary"
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${isSelected ? "text-oranza" : "text-ink-tertiary"}`} />
                          <span className="text-xs font-bold">{pm.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {paymentMethod === "UPI" && (
                    <div className="p-4 bg-gray-50 border border-border rounded-xl space-y-2">
                      <label className="text-xs font-bold text-ink uppercase tracking-wider block">
                        Enter UPI ID / VPA
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="username@okhdfcbank"
                        className="w-full px-3.5 py-2 rounded-lg border border-border text-sm outline-none focus:border-oranza bg-white"
                      />
                      <span className="text-[10px] text-ink-tertiary block">
                        A payment request will be sent to your UPI app upon order placement.
                      </span>
                    </div>
                  )}

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="text-xs font-bold text-ink-secondary hover:text-ink flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back to Delivery
                    </button>
                    <button
                      onClick={() => setCurrentStep(4)}
                      className="bg-oranza hover:bg-oranza-600 text-white font-bold text-sm px-8 py-3 rounded-xl flex items-center gap-2 shadow-sm transition-all"
                    >
                      Review Order <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Review & Place Order */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div>
                      <h2 className="text-lg font-black text-ink">Step 4: Final Order Review</h2>
                      <p className="text-xs text-ink-secondary">Please verify all shipment details before confirming</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    {/* Delivery summary */}
                    <div className="p-4 bg-surface-secondary rounded-xl border border-border">
                      <div className="font-bold text-ink uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-oranza" /> Delivery To:
                      </div>
                      <p className="font-bold text-ink">{address.fullName}</p>
                      <p className="text-ink-secondary">{address.street}</p>
                      <p className="text-ink-secondary">{address.city}, {address.state} - {address.pincode}</p>
                      <p className="text-ink-secondary mt-1">Phone: {address.phone}</p>
                    </div>

                    {/* Payment summary */}
                    <div className="p-4 bg-surface-secondary rounded-xl border border-border">
                      <div className="font-bold text-ink uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-oranza" /> Payment Method:
                      </div>
                      <p className="font-bold text-ink">{paymentMethod}</p>
                      {paymentMethod === "UPI" && <p className="text-ink-secondary">VPA: {upiId}</p>}
                      <p className="text-emerald-600 font-semibold mt-1">Verified & Protected</p>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
                    {cart.map((item) => (
                      <div key={item.product.id} className="p-3.5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg bg-surface-secondary overflow-hidden border border-border flex-shrink-0">
                            <Image src={item.product.thumbnail} alt="" fill sizes="48px" className="object-contain p-1" />
                          </div>
                          <div>
                            <p className="font-bold text-xs text-ink line-clamp-1">{item.product.title}</p>
                            <span className="text-[11px] text-ink-secondary">Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-bold text-xs text-ink">{formatPrice(item.product.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="text-xs font-bold text-ink-secondary hover:text-ink flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" /> Edit Payment
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isPlacingOrder}
                      className="bg-oranza hover:bg-oranza-600 text-white font-bold text-sm px-10 py-3.5 rounded-xl flex items-center gap-2 shadow-lg transition-all active:scale-[0.98]"
                    >
                      {isPlacingOrder ? (
                        <>Processing Order...</>
                      ) : (
                        <>Place Order & Pay {formatPrice(total)}</>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Compact Order Summary */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-border shadow-sm sticky top-28">
              <h3 className="font-black text-sm text-ink uppercase tracking-wider mb-4 pb-3 border-b border-border">
                Summary ({cart.length} items)
              </h3>

              <div className="space-y-2.5 text-xs text-ink-secondary">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-ink">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-semibold text-emerald-600">
                    {deliveryOption === "express" ? "₹149" : "FREE"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="font-semibold text-ink">{formatPrice(tax)}</span>
                </div>
                <div className="pt-3 border-t border-border flex justify-between items-baseline text-ink font-black">
                  <span className="text-sm">Total</span>
                  <span className="text-xl text-oranza">
                    {formatPrice(total + (deliveryOption === "express" ? 149 : 0))}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-[11px] text-ink-secondary">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Buyer Protection Guarantee on all items</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
