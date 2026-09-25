import React from "react";
import { cn } from "@/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "neutral";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "primary", size = "sm", className }: BadgeProps) {
  const variants = {
    primary: "bg-oranza-50 text-oranza-600 border border-oranza-200",
    secondary: "bg-gray-100 text-gray-700 border border-gray-200",
    success: "bg-green-50 text-green-700 border border-green-200",
    warning: "bg-amber-50 text-amber-700 border border-amber-200",
    danger: "bg-red-50 text-red-700 border border-red-200",
    neutral: "bg-white text-ink-secondary border border-border",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[11px] font-semibold rounded",
    md: "px-2.5 py-1 text-xs font-semibold rounded-md",
  };

  return (
    <span className={cn("inline-flex items-center gap-1", variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
}
