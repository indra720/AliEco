"use client";

import React from "react";
import Link from "next/link";
import { Star, MessageSquare } from "lucide-react";
import { RatingStars } from "@/components/common/RatingStars";
import { REVIEWS } from "@/data/reviews";

export default function MyReviewsPage() {
  const customerReviews = REVIEWS.slice(0, 4);

  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
      <div className="pb-4 mb-6 border-b border-border">
        <h1 className="text-lg font-black text-ink">My Product Reviews</h1>
        <p className="text-xs text-ink-secondary">Feedback and ratings you have shared with the community</p>
      </div>

      <div className="space-y-4">
        {customerReviews.map((rev) => (
          <div key={rev.id} className="p-4 rounded-xl border border-border bg-surface-secondary/40 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-ink">{rev.productTitle}</span>
              <span className="text-[11px] text-ink-tertiary">{rev.createdAt}</span>
            </div>

            <RatingStars rating={rev.rating} showCount={false} />
            <h4 className="font-bold text-xs text-ink mt-2">{rev.title}</h4>
            <p className="text-ink-secondary mt-1 leading-relaxed">{rev.comment}</p>

            {rev.sellerReply && (
              <div className="mt-3 p-3 bg-white rounded-lg border-l-2 border-oranza">
                <span className="font-bold text-oranza block mb-0.5">Seller Response:</span>
                <span className="text-ink-secondary">{rev.sellerReply.comment}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
