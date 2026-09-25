"use client";

import React, { useState } from "react";
import { Check, X, Trash2, Star } from "lucide-react";
import { REVIEWS } from "@/data/reviews";
import { RatingStars } from "@/components/common/RatingStars";
import { useNotification } from "@/context/NotificationContext";

export default function AdminReviewsPage() {
  const { showToast } = useNotification();
  const [reviews, setReviews] = useState(REVIEWS);

  const handleModerate = (id: string, status: "approved" | "rejected") => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    showToast(`Review status set to ${status}`);
  };

  const handleDelete = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast("Review deleted");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
        <h1 className="text-xl sm:text-2xl font-black text-ink">Customer Reviews & Moderation</h1>
        <p className="text-xs text-ink-secondary mt-1">
          Review community submissions, flag abusive content, and maintain review authenticity
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-white p-6 rounded-2xl border border-border shadow-sm text-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-sm text-ink">{rev.userName}</span>
                <span className="text-ink-tertiary ml-2">on product: <strong>{rev.productTitle}</strong></span>
              </div>
              <span className="text-ink-tertiary">{rev.createdAt}</span>
            </div>

            <RatingStars rating={rev.rating} showCount={false} />
            <h4 className="font-bold text-xs text-ink">{rev.title}</h4>
            <p className="text-ink-secondary leading-relaxed">{rev.comment}</p>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Verified Purchase
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleModerate(rev.id, "approved")}
                  className="px-3 py-1 bg-green-50 text-green-700 hover:bg-green-100 font-bold rounded flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" /> Approve
                </button>
                <button
                  onClick={() => handleModerate(rev.id, "rejected")}
                  className="px-3 py-1 bg-red-50 text-red-700 hover:bg-red-100 font-bold rounded flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Reject
                </button>
                <button
                  onClick={() => handleDelete(rev.id)}
                  className="p-1 text-gray-400 hover:text-red-500 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
