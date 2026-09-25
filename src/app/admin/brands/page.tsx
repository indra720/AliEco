"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Award, Star } from "lucide-react";
import { BRANDS } from "@/data/brands";
import { useNotification } from "@/context/NotificationContext";

export default function AdminBrandsPage() {
  const { showToast } = useNotification();
  const [brands, setBrands] = useState(BRANDS);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove brand "${name}"?`)) {
      setBrands(brands.filter((b) => b.id !== id));
      showToast("Brand removed");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-ink">Brand Partners</h1>
          <p className="text-xs text-ink-secondary mt-1">
            Manage certified brand stores, official logos, and catalog allocation
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-surface-secondary text-ink-tertiary border-b border-border">
              <tr>
                <th className="p-4 font-bold uppercase">Brand</th>
                <th className="p-4 font-bold uppercase">Slug</th>
                <th className="p-4 font-bold uppercase">Rating</th>
                <th className="p-4 font-bold uppercase">Products</th>
                <th className="p-4 font-bold uppercase">Featured</th>
                <th className="p-4 font-bold uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {brands.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white border border-border flex-shrink-0">
                        <Image src={b.logo} alt="" fill sizes="40px" className="object-cover" />
                      </div>
                      <span className="font-bold text-ink">{b.name}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-ink-secondary">{b.slug}</td>
                  <td className="p-4 text-amber-500 font-bold">★ {b.rating.toFixed(1)}</td>
                  <td className="p-4 font-bold text-ink">{b.productCount}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-green-50 text-green-700">
                      {b.featured ? "Yes" : "Standard"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(b.id, b.name)}
                      className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
