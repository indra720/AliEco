export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  color?: string;
  size?: string;
  image?: string;
}

export interface ProductSpecification {
  group?: string;
  name: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  brand: string;
  brandSlug: string;
  category: string;
  categorySlug: string;
  subcategory?: string;
  price: number;
  mrp: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isFlashDeal?: boolean;
  flashDealEndsAt?: string;
  images: string[];
  thumbnail: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  specifications: ProductSpecification[];
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  sku: string;
  createdAt: string;
  tags: string[];
  variants?: ProductVariant[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  image: string;
  productCount: number;
  featured?: boolean;
  subcategories?: string[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  banner: string;
  description: string;
  productCount: number;
  rating: number;
  featured?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  productTitle?: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  sellerReply?: {
    comment: string;
    createdAt: string;
  };
  status?: "approved" | "pending" | "rejected";
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault?: boolean;
  type: "home" | "work" | "other";
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "returned"
  | "refunded";

export interface OrderItem {
  productId: string;
  title: string;
  thumbnail: string;
  price: number;
  quantity: number;
  variantName?: string;
  sellerId: string;
  sellerName: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentMethod: "UPI" | "Credit Card" | "Debit Card" | "Net Banking" | "Wallet" | "Cash on Delivery";
  paymentStatus: "paid" | "pending" | "refunded" | "failed";
  shippingAddress: Address;
  createdAt: string;
  estimatedDelivery: string;
  timeline: {
    status: OrderStatus;
    title: string;
    description: string;
    timestamp: string;
    completed: boolean;
  }[];
  trackingNumber?: string;
  courierName?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  totalOrders: number;
  totalSpent: number;
  status: "active" | "inactive" | "blocked";
  joinedDate: string;
  addresses: Address[];
}

export interface Seller {
  id: string;
  name: string;
  storeName: string;
  email: string;
  phone: string;
  logo: string;
  banner?: string;
  description: string;
  productsCount: number;
  ordersCount: number;
  revenue: number;
  rating: number;
  status: "pending" | "approved" | "suspended" | "rejected";
  joinedDate: string;
  commissionRate: number;
  bankDetails?: {
    accountNumber: string;
    bankName: string;
    ifsc: string;
  };
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
  sellerId?: string;
}

export interface FilterState {
  category?: string;
  brands: string[];
  minPrice: number;
  maxPrice: number;
  rating?: number;
  discount?: number;
  inStockOnly: boolean;
  sortBy: "relevance" | "newest" | "price_asc" | "price_desc" | "rating" | "popular";
  searchQuery?: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "customer" | "seller" | "admin";
  avatar?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "order" | "offer" | "system" | "price_drop" | "alert";
  timestamp: string;
  read: boolean;
  link?: string;
}
