"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sliders, Save, Plus, Trash2 } from "lucide-react";
import { useNotification } from "@/context/NotificationContext";

export default function AdminCMSPage() {
  const { showToast } = useNotification();

  const [announcementText, setAnnouncementText] = useState(
    "Super Deals — Save up to 40% on selected products"
  );
  const [heroHeading, setHeroHeading] = useState("Everything you need, all in one place.");
  const [heroTagline, setHeroTagline] = useState("Discover. Shop. Upgrade.");
  const [heroSupportText, setHeroSupportText] = useState(
    "Explore thousands of products from trusted sellers."
  );

  const [banners, setBanners] = useState([
    {
      id: "b1",
      title: "Weekend Mega Sale",
      discount: "Up to 50% Off",
      category: "Electronics",
      active: true,
    },
    {
      id: "b2",
      title: "New Season Collection",
      discount: "Fresh Streetwear Drops",
      category: "Fashion",
      active: true,
    },
    {
      id: "b3",
      title: "Nordic Living & Decor",
      discount: "Minimalist Workspaces",
      category: "Home & Living",
      active: true,
    },
  ]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("CMS and promotional copy updated live!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
        <h1 className="text-xl sm:text-2xl font-black text-ink">CMS & Storefront Content Manager</h1>
        <p className="text-xs text-ink-secondary mt-1">
          Customize homepage announcement bars, hero copy, promotional banners, and campaign highlights
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Announcement Bar & Hero Texts */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
          <h3 className="font-bold text-ink uppercase tracking-wider text-xs pb-3 border-b border-border">
            1. Global Announcement & Hero Copy
          </h3>

          <div>
            <label className="font-bold text-ink block mb-1">Top Announcement Ribbon</label>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-ink block mb-1">Brand Tagline</label>
              <input
                type="text"
                value={heroTagline}
                onChange={(e) => setHeroTagline(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
              />
            </div>
            <div>
              <label className="font-bold text-ink block mb-1">Hero Main Heading</label>
              <input
                type="text"
                value={heroHeading}
                onChange={(e) => setHeroHeading(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-ink block mb-1">Hero Subtitle</label>
            <input
              type="text"
              value={heroSupportText}
              onChange={(e) => setHeroSupportText(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-border outline-none focus:border-oranza text-sm"
            />
          </div>
        </div>

        {/* Promotional Campaign Banners */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
          <h3 className="font-bold text-ink uppercase tracking-wider text-xs pb-3 border-b border-border">
            2. Active Commercial Banners
          </h3>

          <div className="space-y-3">
            {banners.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-xl border border-border bg-surface-secondary flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="font-bold text-sm text-ink">{b.title}</h4>
                  <p className="text-xs text-ink-secondary">
                    {b.discount} • Category: {b.category}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded bg-green-50 text-green-700 font-bold uppercase text-[10px]">
                  Displayed
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-oranza hover:bg-oranza-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save CMS Changes
          </button>
        </div>
      </form>
    </div>
  );
}
