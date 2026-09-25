# 🛍️ ORANZA — Modern Multi-Vendor Ecommerce Marketplace

> **"Discover. Shop. Upgrade."**  
> A production-ready, ultra-modern multi-vendor ecommerce web application inspired by high-density commercial marketplace layouts. Built with **Next.js 14 App Router**, **React 18**, **Tailwind CSS**, and **TypeScript**.

---

## 🌟 Key Highlights

- 🎨 **Original Visual Identity:** Modern Electric Orange (`#FF6A00`) and Crisp White theme with subtle glassmorphic elements and high commercial density.
- 🇮🇳 **Indian Ecommerce Localization:** Indian Rupee (**₹**) pricing formatted in Lakhs/Crores, PAN/GSTIN validation, pin-code delivery estimators, and Indian addresses.
- 🏪 **Three Dedicated Portals in One App:**
  1. **Customer Storefront:** Full product discovery, advanced filtering, multi-image product zoom, wishlist, product comparison, persistent cart, 4-step checkout, and real-time shipment tracking.
  2. **Seller / Vendor Portal (`/seller`):** Merchant analytics with Recharts graphs, catalog management, multi-step add product wizard, order fulfillment with AWB tracking, review moderation, and store coupons.
  3. **Super Admin Hub (`/admin`):** Executive GMV metrics, platform revenue graphs, vendor KYC approvals, global order dispatch, category/brand engine, coupon generator, and CMS banner manager.
- ⚡ **Zero-Friction Role Switcher:** One-click instant switcher in the top navigation bar to toggle between **Customer**, **Seller**, and **Admin** personas.
- 📱 **Fully Responsive:** Ultra-wide layout (`max-w-[1580px]`) for wide monitors, alongside sleek tablet and mobile slide-out navigation drawers.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.17.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/indra720/AliEco.git
   cd AliEco
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Or build for production:**
   ```bash
   npm run build
   npm run start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📂 Project Architecture

```
src/
├── app/                        # Next.js 14 App Router Pages (57+ routes)
│   ├── page.tsx                # High-converting Marketplace Homepage
│   ├── products/               # Product Catalog with Multi-Facet Filters
│   │   └── [slug]/             # Product Detail with Zoom & Specifications
│   ├── cart/                   # Shopping Cart with Coupon Engine
│   ├── checkout/               # 4-Step Progressive Accordion Checkout
│   ├── order-success/          # Confirmation & Tracking Entry
│   ├── orders/                 # Order Tracking Timeline & Tax Invoices
│   ├── wishlist/               # Persistent Customer Wishlist
│   ├── compare/                # Side-by-Side Product Comparison
│   ├── seller/                 # Complete Vendor Operations Dashboard
│   ├── admin/                  # Super Admin Executive & Moderation Hub
│   ├── (auth)/                 # Login, Register, Forgot Password
│   └── (policy)/               # About, FAQ, Privacy, Terms, Shipping Policy
├── components/                 # Reusable UI Components
│   ├── common/                 # Header, Footer, ProductCard, QuickViewModal
│   ├── home/                   # HeroBanner, CategoryStrip, FlashDeals, Brands
│   ├── product/                # FilterSidebar, FilterDrawer, RatingStars
│   ├── seller/                 # SellerSidebar, SellerHeader
│   └── admin/                  # AdminSidebar, AdminHeader
├── context/                    # React State Providers (Cart, Wishlist, Compare, Auth, Notifications)
├── data/                       # Realistic Mock Databases (52+ Products, Categories, Brands, Sellers, Orders)
├── types/                      # TypeScript Interface Definitions
└── utils/                      # Formatting & Class Merging Helpers
```

---

## 🛡️ License

This project is licensed under the MIT License - feel free to use it for personal or commercial projects.
