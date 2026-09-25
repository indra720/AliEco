export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "top-flagship-smartphones-india-2026",
    title: "The Ultimate Guide to Flagship Smartphones in India (2026 Edition)",
    excerpt: "From neural AI computational photography to all-day battery architectures, here are the top handheld workhorses worth upgrading to this season.",
    date: "Sep 22, 2026",
    author: "Kavita Rao",
    readTime: "6 min read",
    category: "Gadgets & Tech",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "sustainable-home-decor-trends",
    title: "10 Minimalist & Sustainable Home Decor Trends Taking Over Modern Indian Homes",
    excerpt: "Transform your living spaces with handwoven cane furniture, terracotta accent pieces, and energy-efficient ambient lighting solutions.",
    date: "Sep 18, 2026",
    author: "Aarav Sharma",
    readTime: "4 min read",
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "boost-festive-sales-msme-sellers",
    title: "How Small Merchants & D2C Brands Can 5x Their Festive Sales on ORANZA",
    excerpt: "Actionable playbooks on promotional pricing, regional warehouse inventory dispatch, and winning high-converting product photography.",
    date: "Sep 12, 2026",
    author: "Vikram Singhania",
    readTime: "8 min read",
    category: "Seller Growth",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "mechanical-keyboards-work-productivity",
    title: "Why Mechanical Keyboards Are Revolutionizing Remote Office Productivity",
    excerpt: "Explore the ergonomic benefits of custom mechanical switches, gasket-mounted acoustic damping, and hot-swappable key layouts.",
    date: "Sep 08, 2026",
    author: "Rohan Nair",
    readTime: "5 min read",
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800&auto=format&fit=crop",
  },
];
