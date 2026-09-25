"use client";

import React, { useState } from "react";
import { MessageSquare, Star, Reply } from "lucide-react";
import { REVIEWS } from "@/data/reviews";
import { RatingStars } from "@/components/common/RatingStars";
import { useNotification } from "@/context/NotificationContext";

export default function SellerReviewsPage() {
  const { showToast } = useNotification();
  const [reviews, setReviews] = useState(REVIEWS);
  const [replyText, setReplyText] = useState<{ [id: string]: string }>({});
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  const handleSendReply = (reviewId: string) => {
    const text = replyText[reviewId];
    if (!text) return;

    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              sellerReply: {
                comment: text,
                createdAt: new Date().toISOString().split("T")[0],
              },
            }
          : r
      )
    );
    setActiveReplyId(null);
    showToast("Response sent to customer review!");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
        <h1 className="text-xl sm:text-2xl font-black text-ink">Customer Reviews</h1>
        <p className="text-xs text-ink-secondary mt-1">
          Monitor product ratings and respond to buyer feedback
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-white p-6 rounded-2xl border border-border shadow-sm text-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-ink">{rev.userName}</span>
                <span className="text-[11px] text-ink-tertiary ml-2">on {rev.productTitle}</span>
              </div>
              <span className="text-[11px] text-ink-tertiary">{rev.createdAt}</span>
            </div>

            <RatingStars rating={rev.rating} showCount={false} />
            <h4 className="font-bold text-xs text-ink">{rev.title}</h4>
            <p className="text-ink-secondary leading-relaxed">{rev.comment}</p>

            {rev.sellerReply ? (
              <div className="p-3 bg-orange-50/50 border-l-2 border-oranza rounded-lg">
                <span className="font-bold text-oranza block mb-0.5">Your Response:</span>
                <p className="text-ink-secondary">{rev.sellerReply.comment}</p>
              </div>
            ) : (
              <div>
                {activeReplyId === rev.id ? (
                  <div className="space-y-2 pt-2">
                    <textarea
                      rows={3}
                      placeholder="Write your polite and helpful response..."
                      value={replyText[rev.id] || ""}
                      onChange={(e) =>
                        setReplyText({ ...replyText, [rev.id]: e.target.value })
                      }
                      className="w-full p-2.5 rounded-lg border border-border outline-none focus:border-oranza"
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setActiveReplyId(null)}
                        className="px-3 py-1.5 border border-border rounded-lg text-ink font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSendReply(rev.id)}
                        className="px-4 py-1.5 bg-oranza text-white rounded-lg font-bold hover:bg-oranza-600"
                      >
                        Submit Response
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveReplyId(rev.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-oranza hover:underline"
                  >
                    <Reply className="w-3.5 h-3.5" /> Reply to Buyer
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
