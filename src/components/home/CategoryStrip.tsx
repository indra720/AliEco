"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CategoryStrip() {
  const CIRCULAR_CATEGORIES = [
    {
      id: "cat-fashion",
      name: "Fashion",
      slug: "fashion",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=80",
      href: "/category/fashion",
    },
    {
      id: "cat-electronics",
      name: "Electronics",
      slug: "electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80",
      href: "/category/electronics",
    },
    {
      id: "cat-footwear",
      name: "Footwear",
      slug: "fashion",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80",
      href: "/category/fashion",
    },
    {
      id: "cat-beauty",
      name: "Beauty",
      slug: "beauty",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&auto=format&fit=crop&q=80",
      href: "/category/beauty",
    },
    {
      id: "cat-jewellery",
      name: "Jewellery",
      slug: "jewellery",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&auto=format&fit=crop&q=80",
      href: "/category/jewellery",
    },
    {
      id: "cat-home",
      name: "Home & Living",
      slug: "home-living",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop&q=80",
      href: "/category/home-living",
    },
    {
      id: "cat-sports",
      name: "Sports",
      slug: "sports-fitness",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80",
      href: "/category/sports-fitness",
    },
    {
      id: "cat-watches",
      name: "Watches",
      slug: "jewellery",
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&auto=format&fit=crop&q=80",
      href: "/category/jewellery",
    },
    {
      id: "cat-bags",
      name: "Bags",
      slug: "accessories",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&auto=format&fit=crop&q=80",
      href: "/category/accessories",
    },
    {
      id: "cat-grocery",
      name: "Grocery",
      slug: "grocery",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80",
      href: "/category/grocery",
    },
  ];

  return (
    <section className="py-8 sm:py-10 bg-white border-b border-gray-100">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching Screenshot 2 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Explore our curated selection of high-quality marketplace categories
            </p>
          </div>

          <Link
            href="/products"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-orange hover:text-brand-orange-dark transition-colors self-start sm:self-auto"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Circular Category Avatars Row matching Screenshot 2 */}
        <div className="flex sm:grid sm:grid-cols-5 lg:grid-cols-10 gap-5 sm:gap-6 overflow-x-auto no-scrollbar pb-3 pt-1 justify-start lg:justify-between items-start">
          {CIRCULAR_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group flex flex-col items-center flex-shrink-0 text-center focus:outline-none"
            >
              {/* Perfect Circular Avatar with Border & Subtle Ring */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full p-1 bg-white border-2 border-gray-150 group-hover:border-brand-orange group-hover:shadow-lg group-hover:shadow-orange-500/20 group-hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-50">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 80px, 112px"
                    className="object-cover group-hover:scale-115 transition-transform duration-500 ease-out"
                  />
                </div>
              </div>

              {/* Clean Typography Label */}
              <span className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-brand-orange transition-colors mt-2.5 block truncate max-w-[85px] sm:max-w-[105px]">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryStrip;
