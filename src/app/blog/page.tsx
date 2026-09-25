import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog";

export default function BlogListingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">ORANZA Insights</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-3">
            Tech Trends, Style Guides & Seller Playbooks
          </h1>
          <p className="text-sm text-gray-500">
            Curated buying guides, lifestyle inspiration, and merchant growth stories from our editorial team.
          </p>
        </div>

        {/* Featured Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-12 grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-full min-h-[280px]">
            <Image
              src={BLOG_POSTS[0].image}
              alt={BLOG_POSTS[0].title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange bg-orange-50 px-2.5 py-1 rounded-full">
                Featured • {BLOG_POSTS[0].category}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mt-3 hover:text-brand-orange transition">
                <Link href={`/blog/${BLOG_POSTS[0].slug}`}>{BLOG_POSTS[0].title}</Link>
              </h2>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">{BLOG_POSTS[0].excerpt}</p>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" /> {BLOG_POSTS[0].author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {BLOG_POSTS[0].readTime}
                </span>
              </div>
              <Link
                href={`/blog/${BLOG_POSTS[0].slug}`}
                className="text-brand-orange font-semibold flex items-center gap-1 hover:underline"
              >
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(1).map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition"
            >
              <div className="relative h-48 w-full">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange bg-orange-50 px-2 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 mt-2 hover:text-brand-orange transition line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
