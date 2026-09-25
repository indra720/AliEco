"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Trash2, Eye, Search, Download, Filter } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/utils/formatters";
import { useNotification } from "@/context/NotificationContext";

export default function AdminProductsPage() {
  const { showToast } = useNotification();
  const [productList, setProductList] = useState(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");

  const filtered = productList.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCat === "all" || p.categorySlug === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
      showToast("Product deleted from marketplace");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-ink">Product Management</h1>
          <p className="text-xs text-ink-secondary mt-1">
            Global catalog inventory, stock alerts, and marketplace listings
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => showToast("Exported catalog CSV!")}
            className="px-4 py-2.5 rounded-xl border border-border bg-white text-ink text-xs font-bold hover:bg-gray-50 flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <Link
            href="/admin/products/new"
            className="bg-oranza hover:bg-oranza-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Product
          </Link>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white p-4 rounded-xl border border-border flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-ink-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, brand, or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-border outline-none focus:border-oranza bg-surface-secondary"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-ink-secondary">Category:</span>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold bg-surface-secondary outline-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home-living">Home & Living</option>
            <option value="beauty">Beauty & Care</option>
            <option value="sports-fitness">Sports & Fitness</option>
          </select>
          <span className="text-xs font-bold text-ink ml-2">({filtered.length} items)</span>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-surface-secondary text-ink-tertiary border-b border-border">
              <tr>
                <th className="p-4 font-bold uppercase">Product Title</th>
                <th className="p-4 font-bold uppercase">SKU</th>
                <th className="p-4 font-bold uppercase">Brand</th>
                <th className="p-4 font-bold uppercase">Category</th>
                <th className="p-4 font-bold uppercase">Price</th>
                <th className="p-4 font-bold uppercase">Stock</th>
                <th className="p-4 font-bold uppercase">Seller</th>
                <th className="p-4 font-bold uppercase">Status</th>
                <th className="p-4 font-bold uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg bg-surface-secondary overflow-hidden border border-border flex-shrink-0">
                        <Image src={product.thumbnail} alt="" fill sizes="48px" className="object-contain p-1" />
                      </div>
                      <Link href={`/products/${product.slug}`} className="font-bold text-ink hover:text-oranza line-clamp-1 max-w-xs">
                        {product.title}
                      </Link>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-bold text-ink-secondary">{product.sku}</td>
                  <td className="p-4 font-semibold text-ink">{product.brand}</td>
                  <td className="p-4 text-ink-secondary">{product.category}</td>
                  <td className="p-4 font-black text-ink">{formatPrice(product.price)}</td>
                  <td className="p-4">
                    <span className={`font-bold ${product.stockCount > 10 ? "text-ink" : "text-amber-600"}`}>
                      {product.stockCount}
                    </span>
                  </td>
                  <td className="p-4 text-ink-secondary">{product.sellerName}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Live
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="p-1.5 hover:bg-gray-100 rounded text-ink-secondary"
                        title="View Live"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id, product.title)}
                        className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-500"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
