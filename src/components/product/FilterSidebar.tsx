"use client";

import React from "react";
import { Star, RotateCcw, Check } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { BRANDS } from "@/data/brands";
import { FilterState } from "@/types";
import { formatPrice } from "@/utils/formatters";

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  productCount: number;
}

export function FilterSidebar({ filters, onChange, onReset, productCount }: FilterSidebarProps) {
  const toggleBrand = (brandName: string) => {
    const exists = filters.brands.includes(brandName);
    const updated = exists
      ? filters.brands.filter((b) => b !== brandName)
      : [...filters.brands, brandName];
    onChange({ brands: updated });
  };

  return (
    <aside className="w-full flex flex-col gap-6 p-5 bg-white rounded-card border border-border">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div>
          <h3 className="font-black text-sm text-ink uppercase tracking-wider">Filters</h3>
          <span className="text-[11px] text-ink-secondary">{productCount} items found</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-bold text-oranza hover:text-oranza-600 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Clear All
        </button>
      </div>

      {/* 1. Category Filter */}
      <div>
        <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-3">Categories</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          <label className="flex items-center justify-between text-xs text-ink cursor-pointer hover:text-oranza transition-colors">
            <span className="flex items-center gap-2">
              <input
                type="radio"
                name="category"
                checked={!filters.category || filters.category === "all"}
                onChange={() => onChange({ category: "all" })}
                className="accent-oranza"
              />
              <span>All Categories</span>
            </span>
          </label>
          {CATEGORIES.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center justify-between text-xs text-ink cursor-pointer hover:text-oranza transition-colors"
            >
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === cat.slug}
                  onChange={() => onChange({ category: cat.slug })}
                  className="accent-oranza"
                />
                <span>{cat.name}</span>
              </span>
              <span className="text-[10px] text-ink-tertiary">({cat.productCount})</span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. Price Range Slider */}
      <div className="pt-4 border-t border-border">
        <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-3">Price Range</h4>
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={30000}
            step={500}
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
            className="w-full accent-oranza cursor-pointer"
          />
          <div className="flex items-center justify-between text-xs font-semibold text-ink">
            <span>{formatPrice(filters.minPrice)}</span>
            <span className="text-oranza font-bold">{formatPrice(filters.maxPrice)}</span>
          </div>
        </div>
      </div>

      {/* 3. Brands */}
      <div className="pt-4 border-t border-border">
        <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-3">Brands</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {BRANDS.map((brand) => {
            const isChecked = filters.brands.includes(brand.name);
            return (
              <label
                key={brand.id}
                className="flex items-center justify-between text-xs text-ink cursor-pointer hover:text-oranza transition-colors"
              >
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleBrand(brand.name)}
                    className="accent-oranza rounded"
                  />
                  <span>{brand.name}</span>
                </span>
                <span className="text-[10px] text-ink-tertiary">({brand.productCount})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 4. Customer Rating Filter */}
      <div className="pt-4 border-t border-border">
        <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-3">Customer Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2].map((star) => (
            <label
              key={star}
              className="flex items-center gap-2 text-xs text-ink cursor-pointer hover:text-oranza transition-colors"
            >
              <input
                type="radio"
                name="rating"
                checked={filters.rating === star}
                onChange={() => onChange({ rating: star })}
                className="accent-oranza"
              />
              <span className="flex items-center gap-1 font-semibold text-amber-500">
                {star}★ <span className="font-normal text-ink">& Above</span>
              </span>
            </label>
          ))}
          <label className="flex items-center gap-2 text-xs text-ink cursor-pointer hover:text-oranza">
            <input
              type="radio"
              name="rating"
              checked={filters.rating === undefined}
              onChange={() => onChange({ rating: undefined })}
              className="accent-oranza"
            />
            <span>All Ratings</span>
          </label>
        </div>
      </div>

      {/* 5. Discount Percentage */}
      <div className="pt-4 border-t border-border">
        <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-3">Discount</h4>
        <div className="space-y-2">
          {[50, 40, 30, 20].map((disc) => (
            <label
              key={disc}
              className="flex items-center gap-2 text-xs text-ink cursor-pointer hover:text-oranza"
            >
              <input
                type="radio"
                name="discount"
                checked={filters.discount === disc}
                onChange={() => onChange({ discount: disc })}
                className="accent-oranza"
              />
              <span>{disc}% or more</span>
            </label>
          ))}
          <label className="flex items-center gap-2 text-xs text-ink cursor-pointer hover:text-oranza">
            <input
              type="radio"
              name="discount"
              checked={filters.discount === undefined}
              onChange={() => onChange({ discount: undefined })}
              className="accent-oranza"
            />
            <span>All Discounts</span>
          </label>
        </div>
      </div>

      {/* 6. Availability */}
      <div className="pt-4 border-t border-border">
        <label className="flex items-center gap-2 text-xs font-bold text-ink cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ inStockOnly: e.target.checked })}
            className="accent-oranza rounded"
          />
          <span>Exclude Out of Stock</span>
        </label>
      </div>
    </aside>
  );
}
