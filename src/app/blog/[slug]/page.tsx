"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, User, Clock, ArrowLeft, Share2 } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog";

interface Props {
  params: {
    slug: string;
  };
}

export default function BlogPostDetailPage({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 w-full">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-brand-orange mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>

        {/* Article Container */}
        <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 md:p-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange bg-orange-50 px-3 py-1 rounded-full">
            {post.category}
          </span>

          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pb-6 border-b border-gray-100">
            <span className="flex items-center gap-1.5 font-medium text-gray-800">
              <User className="w-4 h-4 text-brand-orange" /> {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {post.readTime}
            </span>
          </div>

          <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden my-8">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>

          {/* Body Content */}
          <div className="prose prose-orange max-w-none text-gray-700 leading-relaxed space-y-5 text-sm md:text-base">
            <p className="text-lg font-medium text-gray-800 leading-relaxed">
              {post.excerpt}
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-6">1. Engineering Excellence Meets Consumer Needs</h2>
            <p>
              As the digital marketplace landscape matures across India's Tier 1 and Tier 2 cities, shoppers demand products that blend exceptional reliability with high value. Whether you are upgrading your daily driver electronics or revamping your home interior with sustainable craftsmanship, understanding the underlying build standards is paramount.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-6">2. Strategic Quality Assurance</h2>
            <p>
              At ORANZA, every featured vendor undergoes thorough background verification, including GST validation, trademark documentation audits, and consumer sample testing. This ensures that you get genuine certified merchandise backed by official brand warranty cards and prompt support networks.
            </p>

            <div className="bg-orange-50/60 border border-orange-100 rounded-xl p-5 my-6 text-sm text-gray-700">
              <span className="font-bold text-brand-orange block mb-1">Key Takeaway</span>
              Prioritize certified vendors with transparent return policies and verified product ratings. Look for the ORANZA Verified seal for guaranteed express shipping.
            </div>

            <h2 className="text-xl font-bold text-gray-900 mt-6">3. Final Thoughts</h2>
            <p>
              The marketplace continues to evolve with more curated offerings and tailored doorstep logistics. Stay tuned to ORANZA Insights for more teardowns, market intelligence, and smart buyer guides.
            </p>
          </div>

          {/* Social Share Strip */}
          <div className="pt-8 mt-10 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Share this insight:
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Article link copied to clipboard!");
                  }
                }}
                className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Share2 className="w-3.5 h-3.5" /> Copy Link
              </button>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
