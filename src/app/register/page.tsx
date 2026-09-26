"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  Store,
  Sparkles,
  ArrowLeft,
  Building,
  FileText,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";

export default function RegisterPage() {
  const router = useRouter();
  const { login, switchRole } = useAuth();
  const { showToast } = useNotification();

  const [role, setRole] = useState<"customer" | "seller" | "admin">("customer");

  // Common / Customer fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Seller specific fields
  const [storeName, setStoreName] = useState("");
  const [gstNumber, setGstNumber] = useState("");

  // Admin specific fields
  const [employeeId, setEmployeeId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedTerms) {
      showToast("Please agree to the Terms of Service & Privacy Policy", "error");
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match!", "error");
      return;
    }

    login(email, role);
    showToast(`Account created successfully as ${role.toUpperCase()}!`);

    if (role === "admin") {
      router.push("/admin");
    } else if (role === "seller") {
      router.push("/seller");
    } else {
      router.push("/");
    }
  };

  const handleQuickDemoLogin = (targetRole: "customer" | "seller" | "admin") => {
    switchRole(targetRole);
    showToast(`Logged in as ${targetRole.toUpperCase()}!`);
    if (targetRole === "admin") router.push("/admin");
    else if (targetRole === "seller") router.push("/seller");
    else router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 via-orange-50/20 to-gray-50 px-4 py-8 sm:py-12">
      {/* Back to Home Link */}
      <div className="w-full max-w-lg mb-4 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#FF6A00] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
        </Link>
        <span className="text-[11px] font-semibold text-gray-400">
          Fast & Secure Registration
        </span>
      </div>

      <div className="w-full max-w-lg bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xl shadow-orange-500/5 relative overflow-hidden">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-[#FF6A00] to-amber-500" />

        {/* Logo & Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-[#FF6A00] text-white font-black text-2xl flex items-center justify-center shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform">
              O
            </div>
            <span className="font-black text-2xl tracking-tight text-gray-900">
              ORAN<span className="text-[#FF6A00]">ZA</span>
            </span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Create Your ORANZA Account
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Join 50,000+ happy shoppers and verified sellers
          </p>
        </div>

        {/* PORTAL ROLE SELECTOR BUTTONS (Customer, Seller, Admin) */}
        <div className="mb-6">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 text-center">
            Select Account Type (Temporary Fast-Access)
          </label>
          <div className="grid grid-cols-3 gap-1.5 bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
            {/* Customer */}
            <button
              type="button"
              onClick={() => {
                setRole("customer");
                setEmail("new.customer@gmail.com");
              }}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                role === "customer"
                  ? "bg-[#FF6A00] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Customer</span>
            </button>

            {/* Seller */}
            <button
              type="button"
              onClick={() => {
                setRole("seller");
                setEmail("merchant@apexretail.in");
              }}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                role === "seller"
                  ? "bg-[#FF6A00] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Seller</span>
            </button>

            {/* Admin */}
            <button
              type="button"
              onClick={() => {
                setRole("admin");
                setEmail("admin.ops@oranza.com");
              }}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                role === "admin"
                  ? "bg-[#FF6A00] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>

          {/* Role Description Badge */}
          <div className="mt-2.5 px-3 py-1.5 rounded-xl bg-orange-50/80 border border-orange-200/60 text-[11px] text-gray-700 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6A00] shrink-0" />
            <span className="truncate">
              {role === "customer" && "Customer: Member discounts, track shipments & fast checkout"}
              {role === "seller" && "Seller: List products, 0% launch fee & national shipping"}
              {role === "admin" && "Admin Hub: System operations, merchant audit & catalog controls"}
            </span>
          </div>
        </div>

        {/* REGISTRATION FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* SELLER SPECIFIC: Store Name */}
          {role === "seller" && (
            <div>
              <label className="font-bold text-gray-800 block mb-1">
                Store / Brand Name *
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="Apex Retail & Brands"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 outline-none focus:border-[#FF6A00] focus:ring-2 focus:ring-orange-100 text-sm text-gray-900 font-medium"
                />
              </div>
            </div>
          )}

          {/* ADMIN SPECIFIC: Employee ID */}
          {role === "admin" && (
            <div>
              <label className="font-bold text-gray-800 block mb-1">
                Admin Employee / Security ID *
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="ADM-8829-HQ"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 outline-none focus:border-[#FF6A00] focus:ring-2 focus:ring-orange-100 text-sm text-gray-900 font-medium"
                />
              </div>
            </div>
          )}

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-gray-800 block mb-1">
                {role === "seller" ? "Owner First Name *" : "First Name *"}
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Aarav"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 outline-none focus:border-[#FF6A00] focus:ring-2 focus:ring-orange-100 text-sm text-gray-900 font-medium"
              />
            </div>
            <div>
              <label className="font-bold text-gray-800 block mb-1">
                {role === "seller" ? "Owner Last Name *" : "Last Name *"}
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 outline-none focus:border-[#FF6A00] focus:ring-2 focus:ring-orange-100 text-sm text-gray-900 font-medium"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="font-bold text-gray-800 block mb-1">
              {role === "seller" && "Business Email *"}
              {role === "admin" && "Official Admin Email *"}
              {role === "customer" && "Email Address *"}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 outline-none focus:border-[#FF6A00] focus:ring-2 focus:ring-orange-100 text-sm text-gray-900 font-medium"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="font-bold text-gray-800 block mb-1">
              Mobile Phone *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98123 45678"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 outline-none focus:border-[#FF6A00] focus:ring-2 focus:ring-orange-100 text-sm text-gray-900 font-medium"
              />
            </div>
          </div>

          {/* SELLER SPECIFIC: GST */}
          {role === "seller" && (
            <div>
              <label className="font-bold text-gray-800 block mb-1">
                GST / Business Tax ID (Optional)
              </label>
              <input
                type="text"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
                placeholder="27AAAAA0000A1Z5"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 outline-none focus:border-[#FF6A00] focus:ring-2 focus:ring-orange-100 text-sm text-gray-900 font-medium"
              />
            </div>
          )}

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-gray-800 block mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-gray-300 outline-none focus:border-[#FF6A00] focus:ring-2 focus:ring-orange-100 text-sm text-gray-900 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="font-bold text-gray-800 block mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 outline-none focus:border-[#FF6A00] focus:ring-2 focus:ring-orange-100 text-sm text-gray-900 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2 cursor-pointer font-medium text-gray-600 text-xs">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="accent-[#FF6A00] w-4 h-4 rounded cursor-pointer mt-0.5"
              />
              <span>
                I agree to the{" "}
                <Link href="/terms" className="text-[#FF6A00] font-bold hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#FF6A00] font-bold hover:underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
          </div>

          {/* Primary Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#FF6A00] hover:bg-[#E85D00] text-white font-bold py-3.5 rounded-full transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 text-sm active:scale-[0.98] cursor-pointer"
          >
            <span>
              {role === "customer" && "Create Customer Account"}
              {role === "seller" && "Register Seller Store"}
              {role === "admin" && "Create Admin Profile"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-CLICK QUICK DEMO LOGIN SHORTCUTS */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2 text-center">
            ⚡ Or Instantly Demo Login (Reviewer Helper)
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("customer")}
              className="py-1.5 px-2 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-lg text-[11px] font-bold text-gray-700 hover:text-[#FF6A00] transition-colors"
            >
              Demo Customer
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("seller")}
              className="py-1.5 px-2 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-lg text-[11px] font-bold text-gray-700 hover:text-[#FF6A00] transition-colors"
            >
              Demo Seller
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("admin")}
              className="py-1.5 px-2 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-lg text-[11px] font-bold text-gray-700 hover:text-[#FF6A00] transition-colors"
            >
              Demo Admin
            </button>
          </div>
        </div>

        {/* Footer Link to Login */}
        <div className="mt-5 pt-4 border-t border-gray-100 text-center text-xs text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#FF6A00] font-black hover:underline inline-flex items-center gap-1"
          >
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
