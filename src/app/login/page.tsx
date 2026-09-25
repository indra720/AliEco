"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useNotification();

  const [email, setEmail] = useState("aarav.sharma@gmail.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"customer" | "seller" | "admin">("customer");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    login(email, role);
    showToast(`Welcome back! Logged in as ${role}`);
    if (role === "admin") router.push("/admin");
    else if (role === "seller") router.push("/seller");
    else router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-surface-secondary px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-border p-8 shadow-sm">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-oranza text-white font-black text-2xl flex items-center justify-center">
              O
            </div>
            <span className="font-black text-2xl tracking-tight text-ink">
              ORAN<span className="text-oranza">ZA</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold text-ink">Sign in to your account</h1>
          <p className="text-xs text-ink-secondary mt-1">Discover, shop, and manage your orders</p>
        </div>

        {/* Role Fast-Selector */}
        <div className="flex bg-surface-secondary p-1 rounded-xl border border-border mb-6 text-xs font-bold text-ink">
          {(["customer", "seller", "admin"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setRole(r);
                if (r === "seller") setEmail("vikram@apexretail.in");
                else if (r === "admin") setEmail("operations@oranza.com");
                else setEmail("aarav.sharma@gmail.com");
              }}
              className={`flex-1 py-1.5 rounded-lg capitalize transition-all ${
                role === r ? "bg-white text-oranza shadow-sm" : "text-ink-secondary hover:text-ink"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-ink block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-ink-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-ink">Password</label>
              <Link href="/forgot-password" className="text-oranza font-semibold hover:underline text-[11px]">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-ink-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-tertiary hover:text-ink"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-ink-secondary">
              <input type="checkbox" defaultChecked className="accent-oranza rounded" />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-oranza hover:bg-oranza-600 text-white font-bold py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm active:scale-[0.98]"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-border text-center text-xs text-ink-secondary">
          Don't have an account?{" "}
          <Link href="/register" className="text-oranza font-bold hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
