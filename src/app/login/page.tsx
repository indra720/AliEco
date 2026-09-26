"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  User,
  Store,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, switchRole } = useAuth();
  const { showToast } = useNotification();

  const [role, setRole] = useState<"customer" | "seller" | "admin">("customer");
  const [email, setEmail] = useState("aarav.sharma@gmail.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleRoleSelect = (selectedRole: "customer" | "seller" | "admin") => {
    setRole(selectedRole);
    if (selectedRole === "seller") {
      setEmail("vikram@apexretail.in");
    } else if (selectedRole === "admin") {
      setEmail("operations@oranza.com");
    } else {
      setEmail("aarav.sharma@gmail.com");
    }
  };

  const handleQuickDemoLogin = (targetRole: "customer" | "seller" | "admin") => {
    switchRole(targetRole);
    showToast(`Logged in successfully as ${targetRole.toUpperCase()}!`);
    if (targetRole === "admin") router.push("/admin");
    else if (targetRole === "seller") router.push("/seller");
    else router.push("/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    login(email, role);
    showToast(`Welcome back! Logged in as ${role.toUpperCase()}`);
    if (role === "admin") router.push("/admin");
    else if (role === "seller") router.push("/seller");
    else router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 via-orange-50/20 to-gray-50 px-4 py-8 sm:py-12">
      {/* Back to Home Link */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#FF6A00] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
        </Link>
        <span className="text-[11px] font-semibold text-gray-400">
          256-Bit SSL Secure
        </span>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xl shadow-orange-500/5 relative overflow-hidden">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-[#FF6A00] to-amber-500" />

        {/* Logo & Heading */}
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
            Sign In to ORANZA
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Choose your portal role to access your personalized dashboard
          </p>
        </div>

        {/* PORTAL ROLE SELECTOR BUTTONS (Customer, Seller, Admin) */}
        <div className="mb-5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 text-center">
            Select Portal Role (Temporary Fast-Access)
          </label>
          <div className="grid grid-cols-3 gap-1.5 bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
            {/* Customer Button */}
            <button
              type="button"
              onClick={() => handleRoleSelect("customer")}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                role === "customer"
                  ? "bg-[#FF6A00] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Customer</span>
            </button>

            {/* Seller Button */}
            <button
              type="button"
              onClick={() => handleRoleSelect("seller")}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                role === "seller"
                  ? "bg-[#FF6A00] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Seller</span>
            </button>

            {/* Admin Button */}
            <button
              type="button"
              onClick={() => handleRoleSelect("admin")}
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
              {role === "customer" && "Customer Portal: Track orders, wishlist & shopping"}
              {role === "seller" && "Seller Center: Products, inventory & sales analytics"}
              {role === "admin" && "Admin Hub: Operations, catalog, merchants & platform"}
            </span>
          </div>
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-gray-800 block mb-1">
              {role === "customer" && "Customer Email Address"}
              {role === "seller" && "Seller Business Email"}
              {role === "admin" && "Admin Work Email"}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 outline-none focus:border-[#FF6A00] focus:ring-2 focus:ring-orange-100 text-sm text-gray-900 transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-gray-800">Password</label>
              <Link
                href="/forgot-password"
                className="text-[#FF6A00] font-bold hover:underline text-[11px]"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 outline-none focus:border-[#FF6A00] focus:ring-2 focus:ring-orange-100 text-sm text-gray-900 transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-600 text-xs">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-[#FF6A00] w-4 h-4 rounded cursor-pointer"
              />
              <span>Remember this device</span>
            </label>
          </div>

          {/* Primary Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#FF6A00] hover:bg-[#E85D00] text-white font-bold py-3 rounded-full transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 text-sm active:scale-[0.98] cursor-pointer"
          >
            <span>
              Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-CLICK QUICK DEMO LOGIN SHORTCUTS */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2 text-center">
            ⚡ 1-Click Instant Demo Login (Reviewer Helper)
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

        {/* Footer Link to Register */}
        <div className="mt-5 pt-4 border-t border-gray-100 text-center text-xs text-gray-600">
          Don't have an account yet?{" "}
          <Link
            href="/register"
            className="text-[#FF6A00] font-black hover:underline inline-flex items-center gap-1"
          >
            Join Free / Register
          </Link>
        </div>
      </div>
    </div>
  );
}
