"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Mail, ArrowRight } from "lucide-react";

export default function VerifyEmailPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [verified, setVerified] = useState(false);

  const handleChange = (val: string, index: number) => {
    const updated = [...code];
    updated[index] = val.slice(-1);
    setCode(updated);

    if (val && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.every((c) => c !== "")) {
      setVerified(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-surface-secondary px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-border p-8 shadow-sm text-center">
        <div className="w-16 h-16 rounded-full bg-oranza-50 text-oranza flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8" />
        </div>

        <h1 className="text-xl font-bold text-ink mb-1">Verify Your Email</h1>
        <p className="text-xs text-ink-secondary mb-6">
          We sent a 6-digit confirmation code to your email address. Enter it below to activate your account.
        </p>

        {verified ? (
          <div className="py-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-ink mb-4">Email verified successfully!</p>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-oranza text-white font-bold text-xs rounded-xl hover:bg-oranza-600"
            >
              Go to Storefront <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center gap-2">
              {code.map((c, i) => (
                <input
                  key={i}
                  id={`code-${i}`}
                  type="text"
                  maxLength={1}
                  value={c}
                  onChange={(e) => handleChange(e.target.value, i)}
                  className="w-11 h-12 text-center text-lg font-black rounded-lg border border-border outline-none focus:border-oranza bg-surface-secondary"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-oranza hover:bg-oranza-600 text-white font-bold py-3 rounded-xl transition-all shadow-sm text-sm"
            >
              Verify Code
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
