"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Save, Plus, Trash2, Globe } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { BRANDS } from "@/data/brands";
import { SELLERS } from "@/data/sellers";
import { useNotification } from "@/context/NotificationContext";

export default function AdminNewProductPage() {
  const router = useRouter();
  const { showToast } = useNotification();

  const [title, setTitle] = useState("");
  const [sku, setSku] = useState("");
  const [brand, setBrand] = useState(BRANDS[0].name);
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [sellerId, setSellerId] = useState(SELLERS[0].id);
  const [price, setPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [taxRate, setTaxRate] = useState("5");
  const [stock, setStock] = useState("");
  const [lowStockLimit, setLowStockLimit] = useState("10");
  const [weight, setWeight] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80");
  const [tags, setTags] = useState("premium, electronics, audio");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [status, setStatus] = useState<"published" | "draft" | "out_of_stock">("published");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !stock) {
      showToast("Please provide required fields", "error");
      return;
    }
    showToast(`Product "${title.slice(0, 20)}..." created successfully!`);
    router.push("/admin/products");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1 text-xs font-bold text-ink-secondary hover:text-oranza mb-2"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Products
        </Link>
        <h1 className="text-xl sm:text-2xl font-black text-ink">Add Master Product</h1>
        <p className="text-xs text-ink-secondary">Create a verified catalog item with complete SEO and logistics metadata</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Basic Details */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
          <h3 className="font-bold text-ink uppercase tracking-wider text-xs pb-3 border-b border-border">
            1. Master Product Identity
          </h3>

          <div>
            <label className="font-bold text-ink block mb-1">Product Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. OranzaTech Pro ANC Wireless Studio Headphones"
              className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="font-bold text-ink block mb-1">Master SKU *</label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="MST-ORZ-901"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-ink block mb-1">Brand *</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none bg-white cursor-pointer"
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
                className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none bg-white cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold text-ink block mb-1">Primary Seller *</label>
              <select
                value={sellerId}
                onChange={(e) => setSellerId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none bg-white cursor-pointer"
              >
                {SELLERS.map((s) => (
                  <option key={s.id} value={s.id}>{s.storeName}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Commercial & Pricing */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
          <h3 className="font-bold text-ink uppercase tracking-wider text-xs pb-3 border-b border-border">
            2. Commercial Pricing & Tax
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="font-bold text-ink block mb-1">Selling Price (₹) *</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="3999"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
              />
            </div>
            <div>
              <label className="font-bold text-ink block mb-1">Maximum Retail Price (MRP)</label>
              <input
                type="number"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
                placeholder="5999"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
              />
            </div>
            <div>
              <label className="font-bold text-ink block mb-1">Cost Price (COGS)</label>
              <input
                type="number"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                placeholder="2100"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
              />
            </div>
            <div>
              <label className="font-bold text-ink block mb-1">GST Tax Rate (%)</label>
              <select
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none bg-white cursor-pointer"
              >
                <option value="0">0% (Nil)</option>
                <option value="5">5% (Standard)</option>
                <option value="12">12%</option>
                <option value="18">18% (Consumer Tech)</option>
                <option value="28">28% (Luxury)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Logistics & Stock */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
          <h3 className="font-bold text-ink uppercase tracking-wider text-xs pb-3 border-b border-border">
            3. Logistics & Stock Allocation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="font-bold text-ink block mb-1">Total Stock *</label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="100"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
              />
            </div>
            <div>
              <label className="font-bold text-ink block mb-1">Low Stock Threshold</label>
              <input
                type="number"
                value={lowStockLimit}
                onChange={(e) => setLowStockLimit(e.target.value)}
                placeholder="10"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
              />
            </div>
            <div>
              <label className="font-bold text-ink block mb-1">Weight (grams)</label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="350g"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
              />
            </div>
            <div>
              <label className="font-bold text-ink block mb-1">Dimensions (LxWxH cm)</label>
              <input
                type="text"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                placeholder="20 x 18 x 8 cm"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
              />
            </div>
          </div>
        </div>

        {/* SEO & Meta */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
          <h3 className="font-bold text-ink uppercase tracking-wider text-xs pb-3 border-b border-border flex items-center gap-2">
            <Globe className="w-4 h-4 text-oranza" /> 4. Search Engine Optimization (SEO)
          </h3>

          <div>
            <label className="font-bold text-ink block mb-1">SEO Meta Title</label>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="OranzaTech SoundPro Wireless Headphones | Buy Online India"
              className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
            />
          </div>

          <div>
            <label className="font-bold text-ink block mb-1">SEO Meta Description</label>
            <textarea
              rows={2}
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder="Shop OranzaTech SoundPro with 50H battery, 40dB ANC, and 1-year warranty on ORANZA..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm outline-none focus:border-oranza"
            />
          </div>
        </div>

        {/* Publication Actions */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 font-bold text-ink cursor-pointer">
              <input
                type="radio"
                name="status"
                checked={status === "published"}
                onChange={() => setStatus("published")}
                className="accent-oranza"
              />
              <span>Publish Immediately</span>
            </label>
            <label className="flex items-center gap-2 font-bold text-ink cursor-pointer">
              <input
                type="radio"
                name="status"
                checked={status === "draft"}
                onChange={() => setStatus("draft")}
                className="accent-oranza"
              />
              <span>Save as Draft</span>
            </label>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push("/admin/products")}
              className="px-6 py-3 border border-border rounded-xl font-bold text-xs hover:bg-gray-100 text-ink"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-oranza hover:bg-oranza-600 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Save & Publish Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
