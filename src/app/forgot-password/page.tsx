"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, ChevronLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-surface-secondary px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-border p-8 shadow-sm">
        <Link
          href="/login"
          className="inline-flex items-center gap-1 text-xs font-bold text-ink-secondary hover:text-oranza mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Login
        </Link>

        {submitted ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-green-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-ink mb-1">Recovery Link Sent</h2>
            <p className="text-xs text-ink-secondary mb-6 leading-relaxed">
              We have emailed a password reset link to <strong>{email}</strong>. Please check your inbox and spam folder.
            </p>
            <Link
              href="/reset-password"
              className="text-xs font-bold text-oranza hover:underline"
            >
              Continue to Reset Password Form →
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-xl font-bold text-ink mb-1">Forgot your password?</h1>
            <p className="text-xs text-ink-secondary mb-6">
              Enter your registered email address and we'll send you instructions to reset your password.
            </p>

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
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-oranza hover:bg-oranza-600 text-white font-bold py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm"
              >
                Send Reset Link <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
