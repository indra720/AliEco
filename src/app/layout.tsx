import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CompareProvider } from "@/context/CompareContext";
import { NotificationProvider } from "@/context/NotificationContext";

export const metadata: Metadata = {
  title: "ORANZA | Discover. Shop. Upgrade.",
  description:
    "Explore thousands of curated products from trusted verified sellers on ORANZA — Electronics, Fashion, Home, Beauty, Fitness, and more.",
  keywords: "ecommerce, marketplace, electronics, fashion, shopping, online store, fast delivery, India",
  openGraph: {
    title: "ORANZA - Premier Marketplace",
    description: "Discover. Shop. Upgrade. Premium multi-vendor online marketplace.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-ink antialiased">
        <AuthProvider>
          <NotificationProvider>
            <CartProvider>
              <WishlistProvider>
                <CompareProvider>{children}</CompareProvider>
              </WishlistProvider>
            </CartProvider>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
