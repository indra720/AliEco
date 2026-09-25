"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Layers, Check } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { Category } from "@/types";
import { useNotification } from "@/context/NotificationContext";

export default function AdminCategoriesPage() {
  const { showToast } = useNotification();
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;

    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name,
      slug: slug.toLowerCase().replace(/\s+/g, "-"),
      description: desc,
      iconName: "Layers",
      image,
      productCount: 0,
      featured: true,
    };

    setCategories([...categories, newCat]);
    setIsModalOpen(false);
    setName("");
    setSlug("");
    setDesc("");
    showToast(`Category "${newCat.name}" created!`);
  };

  const handleDelete = (id: string, catName: string) => {
    if (confirm(`Delete category "${catName}"?`)) {
      setCategories(categories.filter((c) => c.id !== id));
      showToast("Category removed");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-ink">Category Management</h1>
          <p className="text-xs text-ink-secondary mt-1">
            Organize catalog taxonomy, store navigation menus, and banner associations
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-oranza hover:bg-oranza-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-surface-secondary text-ink-tertiary border-b border-border">
              <tr>
                <th className="p-4 font-bold uppercase">Category</th>
                <th className="p-4 font-bold uppercase">Slug</th>
                <th className="p-4 font-bold uppercase">Products</th>
                <th className="p-4 font-bold uppercase">Status</th>
                <th className="p-4 font-bold uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-surface-secondary border border-border flex-shrink-0">
                        <Image src={cat.image} alt="" fill sizes="40px" className="object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-ink block">{cat.name}</span>
                        <span className="text-[11px] text-ink-secondary line-clamp-1">{cat.description}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-ink-secondary">{cat.slug}</td>
                  <td className="p-4 font-bold text-ink">{cat.productCount}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-green-50 text-green-700">
                      Active
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(cat.id, cat.name)}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl border border-border p-6 max-w-md w-full shadow-2xl">
            <h2 className="text-base font-black text-ink mb-4 pb-2 border-b border-border">
              Create New Category
            </h2>
            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-ink block mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!slug) setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                  }}
                  className="w-full p-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
                />
              </div>
              <div>
                <label className="font-bold text-ink block mb-1">Slug URL *</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-border outline-none focus:border-oranza font-mono text-xs"
                />
              </div>
              <div>
                <label className="font-bold text-ink block mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
                />
              </div>
              <div>
                <label className="font-bold text-ink block mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-border outline-none focus:border-oranza"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-oranza text-white font-bold rounded-lg hover:bg-oranza-600"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
