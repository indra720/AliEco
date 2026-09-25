"use client";

import React, { useState } from "react";
import { MapPin, Plus, Check, Trash2, Edit2 } from "lucide-react";
import { CUSTOMERS } from "@/data/customers";
import { Address } from "@/types";
import { useNotification } from "@/context/NotificationContext";

export default function AddressesPage() {
  const { showToast } = useNotification();
  const [addresses, setAddresses] = useState<Address[]>(CUSTOMERS[0].addresses);
  const [isAdding, setIsAdding] = useState(false);

  const [newAddr, setNewAddr] = useState<Partial<Address>>({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    type: "home",
  });

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    showToast("Default delivery address updated");
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast("Address removed");
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.fullName || !newAddr.street || !newAddr.pincode) return;

    const created: Address = {
      id: `addr-${Date.now()}`,
      fullName: newAddr.fullName || "",
      phone: newAddr.phone || "+91 98199 11223",
      email: "aarav.sharma@gmail.com",
      street: newAddr.street || "",
      city: newAddr.city || "Mumbai",
      state: newAddr.state || "Maharashtra",
      pincode: newAddr.pincode || "400011",
      country: "India",
      type: (newAddr.type as "home" | "work") || "home",
      isDefault: addresses.length === 0,
    };

    setAddresses([...addresses, created]);
    setIsAdding(false);
    setNewAddr({ fullName: "", phone: "", street: "", city: "", state: "", pincode: "", country: "India", type: "home" });
    showToast("New delivery address saved!");
  };

  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-border">
        <div>
          <h1 className="text-lg font-black text-ink">Saved Addresses</h1>
          <p className="text-xs text-ink-secondary">Manage delivery addresses for rapid checkout</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-oranza hover:bg-oranza-600 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Add New Address
        </button>
      </div>

      {/* Add Address Form Modal / Box */}
      {isAdding && (
        <form onSubmit={handleAddSubmit} className="mb-6 p-5 bg-surface-secondary rounded-xl border border-border space-y-4 text-xs">
          <h3 className="font-bold text-ink uppercase tracking-wider">Add Delivery Address</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              placeholder="Full Name"
              value={newAddr.fullName}
              onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
              className="p-2.5 rounded-lg border border-border bg-white outline-none focus:border-oranza"
            />
            <input
              type="text"
              required
              placeholder="Mobile Phone"
              value={newAddr.phone}
              onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
              className="p-2.5 rounded-lg border border-border bg-white outline-none focus:border-oranza"
            />
            <input
              type="text"
              required
              placeholder="Street Address, Flat / Floor"
              value={newAddr.street}
              onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
              className="sm:col-span-2 p-2.5 rounded-lg border border-border bg-white outline-none focus:border-oranza"
            />
            <input
              type="text"
              required
              placeholder="City"
              value={newAddr.city}
              onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
              className="p-2.5 rounded-lg border border-border bg-white outline-none focus:border-oranza"
            />
            <input
              type="text"
              required
              placeholder="State"
              value={newAddr.state}
              onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
              className="p-2.5 rounded-lg border border-border bg-white outline-none focus:border-oranza"
            />
            <input
              type="text"
              required
              placeholder="PIN Code"
              value={newAddr.pincode}
              onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
              className="p-2.5 rounded-lg border border-border bg-white outline-none focus:border-oranza"
            />
            <select
              value={newAddr.type}
              onChange={(e) => setNewAddr({ ...newAddr, type: e.target.value as "home" | "work" })}
              className="p-2.5 rounded-lg border border-border bg-white outline-none cursor-pointer"
            >
              <option value="home">Home</option>
              <option value="work">Work / Office</option>
            </select>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-border rounded-lg text-ink hover:bg-gray-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-oranza text-white rounded-lg font-bold hover:bg-oranza-600"
            >
              Save Address
            </button>
          </div>
        </form>
      )}

      {/* Address cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-5 rounded-xl border relative transition-all text-xs flex flex-col justify-between ${
              addr.isDefault
                ? "border-oranza bg-oranza-50/20 ring-1 ring-oranza/40"
                : "border-border bg-white"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-ink">{addr.fullName}</span>
                <span className="px-2 py-0.5 rounded uppercase text-[10px] font-bold bg-gray-100 text-ink-secondary">
                  {addr.type}
                </span>
              </div>
              <p className="text-ink-secondary leading-relaxed">{addr.street}</p>
              <p className="text-ink-secondary">{addr.city}, {addr.state} - {addr.pincode}</p>
              <p className="text-ink font-semibold mt-2">Mobile: {addr.phone}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-border/80 flex items-center justify-between">
              {addr.isDefault ? (
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Default Address
                </span>
              ) : (
                <button
                  onClick={() => handleSetDefault(addr.id)}
                  className="text-[11px] font-bold text-oranza hover:underline"
                >
                  Set as Default
                </button>
              )}

              <button
                onClick={() => handleDelete(addr.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
