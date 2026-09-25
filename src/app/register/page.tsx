"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, User, Phone, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useNotification();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast("Passwords do not match!", "error");
      return;
    }
    login(email, "customer");
    showToast("Registration successful! Welcome to ORANZA.");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-surface-secondary px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-border p-8 shadow-sm">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-oranza text-white font-black text-2xl flex items-center justify-center">
              O
            </div>
            <span className="font-black text-2xl tracking-tight text-ink">
              ORAN<span className="text-oranza">ZA</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold text-ink">Create your ORANZA account</h1>
          <p className="text-xs text-ink-secondary mt-1">Get special member discounts, free shipping and tracking</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-ink block mb-1">First Name *</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Aarav"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
              />
            </div>
            <div>
              <label className="font-bold text-ink block mb-1">Last Name *</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Sharma"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-ink block mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
            />
          </div>

          <div>
            <label className="font-bold text-ink block mb-1">Mobile Phone *</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98000 00000"
              className="w-full px-3.5 py-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
            />
          </div>

          <div>
            <label className="font-bold text-ink block mb-1">Password *</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm pr-10"
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

          <div>
            <label className="font-bold text-ink block mb-1">Confirm Password *</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="w-full px-3.5 py-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-oranza hover:bg-oranza-600 text-white font-bold py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm mt-2"
          >
            Create Account <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-border text-center text-xs text-ink-secondary">
          Already registered?{" "}
          <Link href="/login" className="text-oranza font-bold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
