"use client";

import React from "react";
import { X, Check } from "lucide-react";
import { FilterSidebar } from "./FilterSidebar";
import { FilterState } from "@/types";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  productCount: number;
}

export function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onChange,
  onReset,
  productCount,
}: FilterDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-200">
      <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl flex flex-col overflow-y-auto">
        <div className="p-4 border-b border-border flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="font-black text-sm text-ink uppercase tracking-wider">Filter Products</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-ink-secondary hover:text-ink hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex-1">
          <FilterSidebar
            filters={filters}
            onChange={onChange}
            onReset={onReset}
            productCount={productCount}
          />
        </div>

        <div className="p-4 border-t border-border sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="w-full bg-oranza hover:bg-oranza-600 text-white font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2 shadow-md"
          >
            <Check className="w-4 h-4" /> Apply Filters ({productCount})
          </button>
        </div>
      </div>
    </div>
  );
}
