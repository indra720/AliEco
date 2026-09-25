"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types";

interface CompareContextType {
  compareItems: Product[];
  addToCompare: (product: Product) => { success: boolean; message: string };
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
  compareCount: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareItems, setCompareItems] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("oranza_compare");
      if (saved) {
        setCompareItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("oranza_compare", JSON.stringify(compareItems));
      } catch {
        // ignore
      }
    }
  }, [compareItems, isLoaded]);

  const addToCompare = (product: Product) => {
    if (compareItems.some((p) => p.id === product.id)) {
      return { success: false, message: "Product is already in comparison" };
    }
    if (compareItems.length >= 4) {
      return { success: false, message: "You can compare up to 4 products at a time" };
    }
    setCompareItems((prev) => [...prev, product]);
    return { success: true, message: `Added ${product.title.slice(0, 24)}... to comparison` };
  };

  const removeFromCompare = (productId: string) => {
    setCompareItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const isInCompare = (productId: string) => {
    return compareItems.some((p) => p.id === productId);
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        compareCount: compareItems.length,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
