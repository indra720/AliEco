"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, Search, Filter } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/utils/formatters";
import { useNotification } from "@/context/NotificationContext";

export default function SellerProductsPage() {
  const { showToast } = useNotification();
  const [productList, setProductList] = useState(
    PRODUCTS.filter((p) => p.sellerId === "seller-1")
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = productList.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove "${title}" from inventory?`)) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
      showToast("Product deleted from store catalog");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-ink">My Products</h1>
          <p className="text-xs text-ink-secondary mt-1">
            Manage your store stock, pricing, and live catalog visibility
          </p>
        </div>

        <Link
          href="/seller/products/new"
          className="bg-oranza hover:bg-oranza-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-border flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-ink-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-border outline-none focus:border-oranza bg-surface-secondary"
          />
        </div>
        <span className="text-xs text-ink-secondary">{filtered.length} products found</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-surface-secondary text-ink-tertiary border-b border-border">
              <tr>
                <th className="p-4 font-bold uppercase">Product</th>
                <th className="p-4 font-bold uppercase">SKU</th>
                <th className="p-4 font-bold uppercase">Price</th>
                <th className="p-4 font-bold uppercase">Stock</th>
                <th className="p-4 font-bold uppercase">Rating</th>
                <th className="p-4 font-bold uppercase">Status</th>
                <th className="p-4 font-bold uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg bg-surface-secondary overflow-hidden border border-border flex-shrink-0">
                        <Image src={product.thumbnail} alt="" fill sizes="48px" className="object-contain p-1" />
                      </div>
                      <div className="max-w-xs">
                        <Link href={`/products/${product.slug}`} className="font-bold text-ink hover:text-oranza line-clamp-1">
                          {product.title}
                        </Link>
                        <span className="text-[10px] text-ink-tertiary">{product.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-ink-secondary">{product.sku}</td>
                  <td className="p-4 font-black text-ink">{formatPrice(product.price)}</td>
                  <td className="p-4">
                    <span className={`font-bold ${product.stockCount > 10 ? "text-ink" : "text-amber-600"}`}>
                      {product.stockCount} units
                    </span>
                  </td>
                  <td className="p-4 text-amber-500 font-bold">★ {product.rating.toFixed(1)}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Published
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="p-1.5 hover:bg-gray-100 rounded text-ink-secondary hover:text-ink"
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
