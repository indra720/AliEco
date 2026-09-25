"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Save, UploadCloud, Plus, Trash2 } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { BRANDS } from "@/data/brands";
import { useNotification } from "@/context/NotificationContext";

export default function SellerAddProductPage() {
  const router = useRouter();
  const { showToast } = useNotification();

  const [title, setTitle] = useState("");
  const [sku, setSku] = useState("");
  const [brand, setBrand] = useState(BRANDS[0].name);
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [stock, setStock] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80");
  const [highlights, setHighlights] = useState(["Premium build quality", "Official brand warranty"]);
  const [newHighlight, setNewHighlight] = useState("");
  const [status, setStatus] = useState<"published" | "draft">("published");

  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      setHighlights([...highlights, newHighlight.trim()]);
      setNewHighlight("");
    }
  };

  const handleRemoveHighlight = (idx: number) => {
    setHighlights(highlights.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !stock) {
      showToast("Please fill in required fields", "error");
      return;
    }

    showToast(`Product "${title.slice(0, 20)}..." created and published!`);
    router.push("/seller/products");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/seller/products"
            className="inline-flex items-center gap-1 text-xs font-bold text-ink-secondary hover:text-oranza mb-2"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Products
          </Link>
          <h1 className="text-xl sm:text-2xl font-black text-ink">Add New Product</h1>
          <p className="text-xs text-ink-secondary">Fill in product details to publish to ORANZA marketplace</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Basic Info Box */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
          <h3 className="font-bold text-ink uppercase tracking-wider text-xs pb-3 border-b border-border">
            1. Basic Information
          </h3>

          <div>
            <label className="font-bold text-ink block mb-1">Product Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Wireless Noise-Cancelling Over-Ear Headphones"
              className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-ink block mb-1">SKU Code *</label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="ORZ-TECH-01"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-ink block mb-1">Brand *</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none cursor-pointer bg-white"
              >
                {BRANDS.map((b) => (
                  <option key={b.id} value={b.name}>{b.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold text-ink block mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none cursor-pointer bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Pricing & Inventory Box */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
          <h3 className="font-bold text-ink uppercase tracking-wider text-xs pb-3 border-b border-border">
            2. Pricing & Inventory
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-ink block mb-1">Selling Price (₹) *</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="2499"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
              />
            </div>
            <div>
              <label className="font-bold text-ink block mb-1">Original MRP (₹)</label>
              <input
                type="number"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
                placeholder="4999"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
              />
            </div>
            <div>
              <label className="font-bold text-ink block mb-1">Stock Quantity *</label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="50"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
              />
            </div>
          </div>
        </div>

        {/* Descriptions & Highlights */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
          <h3 className="font-bold text-ink uppercase tracking-wider text-xs pb-3 border-b border-border">
            3. Product Description & Bullet Points
          </h3>

          <div>
            <label className="font-bold text-ink block mb-1">Short Summary</label>
            <input
              type="text"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="Crisp 1-sentence product summary"
              className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
            />
          </div>

          <div>
            <label className="font-bold text-ink block mb-1">Full Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe materials, warranty, battery life, design nuances..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
            />
          </div>

          <div>
            <label className="font-bold text-ink block mb-1">Key Feature Highlights</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                placeholder="Add bullet highlight..."
                className="flex-1 px-3.5 py-2 rounded-lg border border-border text-xs outline-none focus:border-oranza"
              />
              <button
                type="button"
                onClick={handleAddHighlight}
                className="px-4 py-2 bg-neutral-900 text-white font-bold rounded-lg hover:bg-black"
              >
                Add
              </button>
            </div>

            <div className="space-y-1.5">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-surface-secondary text-xs">
                  <span>• {h}</span>
                  <button type="button" onClick={() => handleRemoveHighlight(i)} className="text-gray-400 hover:text-red-500">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Media Box */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
          <h3 className="font-bold text-ink uppercase tracking-wider text-xs pb-3 border-b border-border">
            4. Image URL
          </h3>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.push("/seller/products")}
            className="px-6 py-3 border border-border rounded-xl font-bold text-xs hover:bg-gray-100 text-ink"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-oranza hover:bg-oranza-600 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            Publish Product
          </button>
        </div>
      </form>
    </div>
  );
}
