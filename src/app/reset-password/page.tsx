"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, CheckCircle2, ArrowRight } from "lucide-react";
import { useNotification } from "@/context/NotificationContext";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { showToast } = useNotification();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    setDone(true);
    showToast("Password updated successfully!");
    setTimeout(() => router.push("/login"), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-surface-secondary px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-border p-8 shadow-sm">
        <h1 className="text-xl font-bold text-ink mb-1">Set New Password</h1>
        <p className="text-xs text-ink-secondary mb-6">Create a strong password of at least 8 characters</p>

        {done ? (
          <div className="text-center py-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
            <p className="text-xs font-bold text-ink">Redirecting you to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-ink block mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-tertiary"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="font-bold text-ink block mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-oranza hover:bg-oranza-600 text-white font-bold py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm"
            >
              Update Password <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
