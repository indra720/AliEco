"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  SlidersHorizontal,
  LayoutGrid,
  List,
  ChevronRight,
  PackageX,
  RotateCcw,
} from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ProductCard } from "@/components/common/ProductCard";
import { FilterSidebar } from "@/components/product/FilterSidebar";
import { FilterDrawer } from "@/components/product/FilterDrawer";
import { PRODUCTS } from "@/data/products";
import { FilterState } from "@/types";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialBrand = searchParams.get("brand");
  const initialSort = (searchParams.get("sort") as FilterState["sortBy"]) || "relevance";

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    brands: initialBrand ? [initialBrand] : [],
    minPrice: 0,
    maxPrice: 30000,
    rating: undefined,
    discount: undefined,
    inStockOnly: false,
    sortBy: initialSort,
  });

  // Keep filters updated if query params change
  useEffect(() => {
    if (searchParams.get("category")) {
      setFilters((f) => ({ ...f, category: searchParams.get("category") || "all" }));
    }
  }, [searchParams]);

  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      category: "all",
      brands: [],
      minPrice: 0,
      maxPrice: 30000,
      rating: undefined,
      discount: undefined,
      inStockOnly: false,
      sortBy: "relevance",
    });
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category
      if (filters.category && filters.category !== "all" && item.categorySlug !== filters.category) {
        return false;
      }
      // Brands
      if (filters.brands.length > 0 && !filters.brands.includes(item.brand)) {
        return false;
      }
      // Price
      if (item.price < filters.minPrice || item.price > filters.maxPrice) {
        return false;
      }
      // Rating
      if (filters.rating && item.rating < filters.rating) {
        return false;
      }
      // Discount
      if (filters.discount && item.discountPercent < filters.discount) {
        return false;
      }
      // In Stock
      if (filters.inStockOnly && !item.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (filters.sortBy === "price_asc") {
        return a.price - b.price;
      }
      if (filters.sortBy === "price_desc") {
        return b.price - a.price;
      }
      if (filters.sortBy === "rating") {
        return b.rating - a.rating;
      }
      if (filters.sortBy === "popular") {
        return b.reviewCount - a.reviewCount;
      }
      return 0; // relevance
    });
  }, [filters]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 bg-surface-secondary/40 py-6 sm:py-8">
        <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-ink-secondary mb-4">
            <Link href="/" className="hover:text-oranza transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-ink-tertiary" />
            <span className="font-semibold text-ink">Products</span>
            {filters.category && filters.category !== "all" && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-ink-tertiary" />
                <span className="font-bold text-oranza capitalize">{filters.category.replace("-", " ")}</span>
              </>
            )}
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block lg:col-span-1 sticky top-28">
              <FilterSidebar
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
                productCount={filteredProducts.length}
              />
            </div>

            {/* Products Main View */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Top Controls Bar */}
              <div className="bg-white p-4 rounded-card border border-border flex flex-wrap items-center justify-between gap-4 shadow-sm">
                <div>
                  <h1 className="text-lg sm:text-xl font-black text-ink">
                    {filters.category && filters.category !== "all"
                      ? `${filters.category.replace("-", " ").toUpperCase()}`
                      : "All Products"}
                  </h1>
                  <span className="text-xs text-ink-secondary">
                    Showing {filteredProducts.length} results
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setIsFilterDrawerOpen(true)}
                    className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-white text-xs font-bold text-ink hover:border-oranza"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-oranza" />
                    <span>Filters</span>
                  </button>

                  {/* Sort By Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-ink-secondary hidden sm:inline">Sort By:</span>
                    <select
                      value={filters.sortBy}
                      onChange={(e) =>
                        handleFilterChange({ sortBy: e.target.value as FilterState["sortBy"] })
                      }
                      className="bg-surface-secondary border border-border text-xs font-semibold text-ink rounded-lg px-2.5 py-2 outline-none cursor-pointer hover:border-gray-400"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="popular">Most Popular</option>
                      <option value="newest">Newest Arrivals</option>
                      <option value="price_asc">Price: Low to High</option>
                      <option value="price_desc">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>

                  {/* Grid / List View Toggle */}
                  <div className="flex items-center border border-border rounded-lg overflow-hidden bg-surface-secondary">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 transition-colors ${
                        viewMode === "grid" ? "bg-white text-oranza shadow-sm font-bold" : "text-ink-secondary hover:text-ink"
                      }`}
                      title="Grid View"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 transition-colors ${
                        viewMode === "list" ? "bg-white text-oranza shadow-sm font-bold" : "text-ink-secondary hover:text-ink"
                      }`}
                      title="List View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Listing Grid or Empty State */}
              {paginatedProducts.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
                      : "flex flex-col gap-3"
                  }
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} layout={viewMode} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-card border border-border p-12 text-center flex flex-col items-center justify-center my-6">
                  <div className="w-16 h-16 rounded-full bg-orange-50 text-oranza flex items-center justify-center mb-4">
                    <PackageX className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-ink mb-1">No products match your filters</h3>
                  <p className="text-xs text-ink-secondary max-w-sm mb-6">
                    Try loosening your price range or unchecking specific brands to see more items.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="bg-oranza hover:bg-oranza-600 text-white font-bold text-xs px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-sm transition-all"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-border">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold disabled:opacity-40 hover:bg-white transition-colors"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                        currentPage === i + 1
                          ? "bg-oranza text-white shadow-sm"
                          : "border border-border bg-white hover:border-oranza text-ink"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold disabled:opacity-40 hover:bg-white transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <FilterDrawer
          isOpen={isFilterDrawerOpen}
          onClose={() => setIsFilterDrawerOpen(false)}
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
          productCount={filteredProducts.length}
        />
      </main>
      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-gray-500">Loading catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}

