import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  ShoppingBag,
  BarChart3,
  Package,
  Users,
  CreditCard,
  TrendingUp,
  Store,
  AlertTriangle,
  CheckCircle2,
  Search,
  Scan,
  Plus,
  Minus,
  FileText,
  LayoutDashboard,
  Bell,
  ChevronRight,
  ArrowRight,
  Box,
  Truck,
  Receipt,
  Globe,
  Zap,
  Heart,
  Eye,
  Target,
  RefreshCw,
  Briefcase,
  ShieldCheck,
  Monitor,
  ScanLine,
  Landmark,
  Mail,
  MessageSquare,
  QrCode,
  Banknote,
  Printer,
  Sparkles,
  Calendar,
  Percent,
  Check,
  Info,
  ChevronDown,
  Layers,
  IndianRupee,
  PackageX,
  Gauge,
  Filter,
  Download,
} from 'lucide-react';

// ─── TYPES ────────────────────────────────────────────────────────────────────


interface ChallengeCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface WorkflowStep {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface StatCard {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  image: string;
}

interface PurchaseOrder {
  poNumber: string;
  supplier: string;
  products: number;
  amount: string;
  status: 'Pending' | 'Approved' | 'Received';
  date: string;
}

interface Customer {
  name: string;
  orders: number;
  lifetimeValue: string;
  loyaltyPoints: number;
  membership: string;
  avatar: string;
}

interface StoreData {
  name: string;
  sales: string;
  location: string;
}

interface Role {
  name: string;
  icon: React.ReactNode;
  permissions: string[];
  color: string;
}

interface Notification {
  id: number;
  message: string;
  type: 'warning' | 'success' | 'info';
  time: string;
}

interface Integration {
  name: string;
  icon: React.ReactNode;
}

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────



const CHALLENGES: ChallengeCard[] = [
  {
    icon: <Package className="w-6 h-6" />,
    title: 'Inventory Visibility',
    description: 'Know exactly what is in stock across all locations in real time.',
  },
  {
    icon: <Receipt className="w-6 h-6" />,
    title: 'Manual Billing',
    description: 'Eliminate slow, error-prone manual billing with automated POS.',
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: 'Stock Shortages',
    description: 'Prevent stockouts with smart reorder alerts and demand forecasting.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Customer Management',
    description: 'Track every purchase and build lasting customer relationships.',
  },
  {
    icon: <Store className="w-6 h-6" />,
    title: 'Multiple Store Operations',
    description: 'Manage all your stores from a single centralized platform.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Difficult Reporting',
    description: 'Get instant reports and insights without complex spreadsheets.',
  },
];

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 'products',
    label: 'Products',
    icon: <Package className="w-5 h-5" />,
    description: 'Add and manage your product catalog with SKUs, pricing, and categories.',
  },
  {
    id: 'purchasing',
    label: 'Purchasing',
    icon: <Truck className="w-5 h-5" />,
    description: 'Create purchase orders and receive goods from suppliers seamlessly.',
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: <Box className="w-5 h-5" />,
    description: 'Track stock levels, movements, and get low stock alerts automatically.',
  },
  {
    id: 'pos',
    label: 'POS & Sales',
    icon: <ShoppingBag className="w-5 h-5" />,
    description: 'Process sales quickly with barcode scanning and multiple payment methods.',
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: <Users className="w-5 h-5" />,
    description: 'Build customer profiles, track purchase history, and loyalty points.',
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: <CreditCard className="w-5 h-5" />,
    description: 'Accept cash, card, UPI, and digital payments with automatic reconciliation.',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: <FileText className="w-5 h-5" />,
    description: 'Generate detailed sales, inventory, and tax reports instantly.',
  },
  {
    id: 'insights',
    label: 'Business Insights',
    icon: <TrendingUp className="w-5 h-5" />,
    description: 'Make data-driven decisions with AI-powered analytics and trends.',
  },
];

const STATS: StatCard[] = [
  {
    label: 'Total Sales',
    value: '₹2,84,500',
    change: '+18.6%',
    trend: 'up',
    icon: <IndianRupee className="w-5 h-5" />,
  },
  {
    label: 'Orders',
    value: '1,248',
    change: '+12.4%',
    trend: 'up',
    icon: <ShoppingBag className="w-5 h-5" />,
  },
  {
    label: 'Customers',
    value: '856',
    change: '+8.2%',
    trend: 'up',
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: 'Products',
    value: '4,620',
    change: '+3.1%',
    trend: 'up',
    icon: <Package className="w-5 h-5" />,
  },
];

const PRODUCTS: Product[] = [
  { id: 1, name: 'Wireless Headphones', sku: 'ELEC-001', category: 'Electronics', price: '₹2,499', stock: 145, status: 'In Stock', image: '🎧' },
  { id: 2, name: 'Cotton T-Shirt', sku: 'FASH-042', category: 'Fashion', price: '₹799', stock: 8, status: 'Low Stock', image: '👕' },
  { id: 3, name: 'Organic Honey', sku: 'GROC-108', category: 'Grocery', price: '₹349', stock: 230, status: 'In Stock', image: '🍯' },
  { id: 4, name: 'Table Lamp', sku: 'HOME-015', category: 'Home', price: '₹1,299', stock: 0, status: 'Out of Stock', image: '💡' },
  { id: 5, name: 'Face Serum', sku: 'BEAU-073', category: 'Beauty', price: '₹899', stock: 67, status: 'In Stock', image: '🧴' },
  { id: 6, name: 'Bluetooth Speaker', sku: 'ELEC-089', category: 'Electronics', price: '₹3,999', stock: 12, status: 'Low Stock', image: '🔊' },
  { id: 7, name: 'Denim Jeans', sku: 'FASH-118', category: 'Fashion', price: '₹1,899', stock: 89, status: 'In Stock', image: '👖' },
  { id: 8, name: 'Basmati Rice 5kg', sku: 'GROC-201', category: 'Grocery', price: '₹649', stock: 3, status: 'Low Stock', image: '🍚' },
];

const PURCHASE_ORDERS: PurchaseOrder[] = [
  { poNumber: 'PO-1024', supplier: 'Tech Distributors Ltd', products: 12, amount: '₹1,45,000', status: 'Received', date: '2024-01-15' },
  { poNumber: 'PO-1025', supplier: 'Fashion Wholesale Co', products: 8, amount: '₹67,200', status: 'Approved', date: '2024-01-16' },
  { poNumber: 'PO-1026', supplier: 'Grocery Supplies Inc', products: 24, amount: '₹89,400', status: 'Pending', date: '2024-01-17' },
  { poNumber: 'PO-1027', supplier: 'Home Essentials Hub', products: 6, amount: '₹34,800', status: 'Approved', date: '2024-01-18' },
];

const CUSTOMERS: Customer[] = [
  {
    name: 'Ahmed Rahman',
    orders: 128,
    lifetimeValue: '₹1,84,500',
    loyaltyPoints: 2450,
    membership: 'Gold',
    avatar: 'AR',
  },
  {
    name: 'Priya Sharma',
    orders: 94,
    lifetimeValue: '₹1,12,300',
    loyaltyPoints: 1830,
    membership: 'Silver',
    avatar: 'PS',
  },
  {
    name: 'Rajesh Kumar',
    orders: 67,
    lifetimeValue: '₹78,900',
    loyaltyPoints: 1240,
    membership: 'Silver',
    avatar: 'RK',
  },
];

const STORES: StoreData[] = [
  { name: 'Chennai Store', sales: '₹8.4L', location: 'T Nagar, Chennai' },
  { name: 'Ambur Store', sales: '₹5.2L', location: 'Main Road, Ambur' },
  { name: 'Bangalore Store', sales: '₹7.8L', location: 'MG Road, Bangalore' },
];

const ROLES: Role[] = [
  {
    name: 'Admin',
    icon: <ShieldCheck className="w-5 h-5" />,
    permissions: ['Full Access', 'User Management', 'Settings', 'Billing', 'Reports'],
    color: 'from-violet-500 to-purple-600',
  },
  {
    name: 'Manager',
    icon: <Briefcase className="w-5 h-5" />,
    permissions: ['Sales', 'Inventory', 'Reports', 'Purchasing'],
    color: 'from-blue-500 to-cyan-600',
  },
  {
    name: 'Cashier',
    icon: <CreditCard className="w-5 h-5" />,
    permissions: ['POS', 'Billing', 'Payment Processing'],
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Inventory Staff',
    icon: <Box className="w-5 h-5" />,
    permissions: ['Stock Management', 'Goods Receipt', 'Stock Transfer'],
    color: 'from-amber-500 to-orange-600',
  },
];

const NOTIFICATIONS: Notification[] = [
  { id: 1, message: '5 products are out of stock.', type: 'warning', time: '2 min ago' },
  { id: 2, message: '12 products are running low.', type: 'warning', time: '15 min ago' },
  { id: 3, message: "Today's sales crossed ₹2L.", type: 'success', time: '1 hour ago' },
  { id: 4, message: 'Purchase Order #PO-1024 received.', type: 'info', time: '2 hours ago' },
  { id: 5, message: 'Monthly revenue increased by 18.6%.', type: 'success', time: '3 hours ago' },
];

const BENEFITS: Benefit[] = [
  { icon: <Zap className="w-5 h-5" />, title: 'Faster Checkout', description: 'Reduce billing time by up to 60% with barcode scanning and quick payment.' },
  { icon: <Box className="w-5 h-5" />, title: 'Better Inventory Control', description: 'Real-time stock visibility across all stores and warehouses.' },
  { icon: <RefreshCw className="w-5 h-5" />, title: 'Reduced Manual Work', description: 'Automate billing, inventory updates, and report generation.' },
  { icon: <Heart className="w-5 h-5" />, title: 'Better Customer Relationships', description: 'Track preferences, purchase history, and loyalty rewards.' },
  { icon: <Eye className="w-5 h-5" />, title: 'Real-time Business Visibility', description: 'See sales, stock, and performance from anywhere, anytime.' },
  { icon: <Target className="w-5 h-5" />, title: 'Smarter Decisions', description: 'Use AI-powered insights to make data-driven business decisions.' },
  { icon: <Globe className="w-5 h-5" />, title: 'Scalable Multi-store', description: 'Add new stores and expand your business without complexity.' },
];

const INTEGRATIONS: Integration[] = [
  { name: 'POS Terminals', icon: <Monitor className="w-5 h-5" /> },
  { name: 'Barcode Scanner', icon: <ScanLine className="w-5 h-5" /> },
  { name: 'Payment Gateway', icon: <CreditCard className="w-5 h-5" /> },
  { name: 'Accounting', icon: <Landmark className="w-5 h-5" /> },
  { name: 'GST Compliance', icon: <FileText className="w-5 h-5" /> },
  { name: 'Email', icon: <Mail className="w-5 h-5" /> },
  { name: 'SMS', icon: <MessageSquare className="w-5 h-5" /> },
  { name: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Connect Your Business', description: 'Set up your stores, products, and team in minutes.' },
  { step: '02', title: 'Manage Products & Inventory', description: 'Add products, track stock, and manage suppliers.' },
  { step: '03', title: 'Process Sales & Customers', description: 'Start billing, accept payments, and build customer profiles.' },
  { step: '04', title: 'Analyze & Grow', description: 'Use insights and reports to make smarter business decisions.' },
];

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────
// Note: `ease` must be a valid Framer Motion Easing value ("easeOut" is valid).
// We type these as `Variants` so TypeScript accepts the literal string.

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// ─── REUSABLE COMPONENTS ──────────────────────────────────────────────────────

const SectionWrapper: React.FC<{
  children: React.ReactNode;
  id?: string;
  className?: string;
}> = ({ children, id, className = '' }) => (
  <section id={id} className={`w-full py-16 md:py-24 lg:py-32 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
  </section>
);

const SectionHeading: React.FC<{
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}> = ({ badge, title, subtitle, align = 'center' }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
    variants={staggerContainer}
    className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''} mb-12 md:mb-16`}
  >
    {badge && (
      <motion.span
        variants={fadeUp}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-50 text-indigo-600 border border-indigo-100 mb-4"
      >
        <Sparkles className="w-3.5 h-3.5" />
        {badge}
      </motion.span>
    )}
    <motion.h2
      variants={fadeUp}
      className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p variants={fadeUp} className="mt-4 text-lg text-slate-500 leading-relaxed">
        {subtitle}
      </motion.p>
    )}
  </motion.div>
);

const Badge: React.FC<{
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Pending' | 'Approved' | 'Received';
}> = ({ status }) => {
  const styles: Record<string, string> = {
    'In Stock': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Low Stock': 'bg-amber-50 text-amber-700 border-amber-200',
    'Out of Stock': 'bg-red-50 text-red-700 border-red-200',
    Pending: 'bg-slate-50 text-slate-600 border-slate-200',
    Approved: 'bg-blue-50 text-blue-700 border-blue-200',
    Received: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || ''}`}
    >
      {status}
    </span>
  );
};

// ─── NAVBAR ───────────────────────────────────────────────────────────────────


// ─── HERO SECTION ─────────────────────────────────────────────────────────────

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          poster="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80"
        >
          <source
            src="/retail.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-medium text-indigo-300">
                <Sparkles className="w-3.5 h-3.5" />
                Built for modern retail businesses
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.1]"
            >
              Everything You Need to Run{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                Retail Smarter
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg md:text-xl text-slate-300/90 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Manage sales, inventory, customers, purchasing, payments, and business
              performance from one powerful retail management platform.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-900 bg-white rounded-2xl hover:bg-slate-50 transition-all duration-300 shadow-2xl shadow-white/10 flex items-center justify-center gap-2"
              >
                Explore Platform
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book a Demo
              </motion.button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex items-center gap-6 justify-center lg:justify-start"
            >
              {[
                { value: '2,500+', label: 'Retailers' },
                { value: '₹50Cr+', label: 'Processed' },
                { value: '99.9%', label: 'Uptime' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            className="relative hidden lg:block"
          >
            <div className="relative bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Sales', value: '₹2.84L', color: 'text-indigo-300' },
                    { label: 'Orders', value: '1,248', color: 'text-emerald-300' },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">{item.label}</div>
                      <div className={`text-lg font-bold ${item.color}`}>{item.value}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="flex items-end justify-between h-20 gap-1.5">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.8, delay: 0.5 + i * 0.05, ease: 'easeOut' }}
                        className="flex-1 bg-gradient-to-t from-indigo-500/60 to-violet-400/80 rounded-t-sm"
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  {['Wireless Headphones', 'Cotton T-Shirt', 'Organic Honey'].map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                      <span className="text-xs text-slate-300">{item}</span>
                      <span className="text-xs font-medium text-emerald-400">+{12 - i * 3}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-2xl border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Today's Sales</div>
                  <div className="text-sm font-bold text-slate-900">₹2.84L</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -left-8 bg-white rounded-2xl p-4 shadow-2xl border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <Percent className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Revenue</div>
                  <div className="text-sm font-bold text-emerald-600">+18.6%</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-1/3 -left-12 bg-white rounded-2xl p-3 shadow-2xl border border-slate-100"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-medium text-slate-700">24 Low Stock</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="absolute bottom-1/3 -right-10 bg-white rounded-2xl p-3 shadow-2xl border border-slate-100"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-medium text-slate-700">1,248 Orders</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── CHALLENGES SECTION ───────────────────────────────────────────────────────

const ChallengesSection: React.FC = () => {
  return (
    <SectionWrapper id="challenges" className="bg-white">
      <SectionHeading
        badge="Challenges"
        title="Retail Is Complex. Management Doesn't Have to Be."
        subtitle="We understand the daily challenges retailers face. Here's how we solve them."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
      >
        {CHALLENGES.map((challenge) => (
          <motion.div
            key={challenge.title}
            variants={fadeUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group relative bg-white rounded-2xl border border-slate-200/80 p-6 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-indigo-50 flex items-center justify-center text-slate-600 group-hover:text-indigo-600 transition-colors duration-300 mb-4">
              {challenge.icon}
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">{challenge.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{challenge.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

// ─── PLATFORM OVERVIEW / WORKFLOW ─────────────────────────────────────────────

const PlatformOverview: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <SectionWrapper id="platform" className="bg-slate-50">
      <SectionHeading
        badge="Platform"
        title="One Connected Retail Workflow"
        subtitle="From product creation to business insights — everything is connected."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={staggerContainer}
        className="relative max-w-4xl mx-auto"
      >
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-200 via-violet-200 to-indigo-200 hidden lg:block -translate-x-1/2" />

        <div className="space-y-4 lg:space-y-6">
          {WORKFLOW_STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              variants={fadeUp}
              onHoverStart={() => setActiveStep(step.id)}
              onHoverEnd={() => setActiveStep(null)}
              className={`relative flex items-center gap-4 lg:gap-6 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`inline-block bg-white rounded-2xl border p-5 transition-all duration-300 ${
                    activeStep === step.id
                      ? 'border-indigo-300 shadow-xl shadow-indigo-500/10'
                      : 'border-slate-200 shadow-sm'
                  }`}
                >
                  <div
                    className={`flex items-center gap-3 ${
                      index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                        activeStep === step.id
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{step.label}</h3>
                      <AnimatePresence>
                        {activeStep === step.id && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-xs text-slate-500 mt-1 max-w-xs"
                          >
                            {step.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="hidden lg:flex items-center justify-center relative z-10">
                <motion.div
                  animate={{
                    scale: activeStep === step.id ? 1.3 : 1,
                    backgroundColor: activeStep === step.id ? '#4f46e5' : '#e2e8f0',
                  }}
                  transition={{ duration: 0.2 }}
                  className="w-4 h-4 rounded-full border-4 border-slate-50 shadow-sm"
                />
              </div>

              <div className="flex-1 hidden lg:block" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="lg:hidden mt-8 flex flex-wrap items-center justify-center gap-2">
        {WORKFLOW_STEPS.map((step) => (
          <div
            key={step.id}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200 text-xs font-medium text-slate-600"
          >
            {step.icon}
            {step.label}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

// ─── DASHBOARD SECTION ────────────────────────────────────────────────────────

const DashboardSection: React.FC = () => {
  return (
    <SectionWrapper id="dashboard" className="bg-white">
      <SectionHeading
        badge="Dashboard"
        title="Your Entire Retail Business. At a Glance."
        subtitle="A powerful dashboard that gives you complete visibility into your operations."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={scaleIn}
        className="bg-slate-50 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden"
      >
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-900">RetailOS Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <Search className="w-4 h-4 text-slate-400" />
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors relative">
              <Bell className="w-4 h-4 text-slate-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
              A
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
                    {stat.icon}
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      stat.trend === 'up'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-4 sm:p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-900">Sales Overview</h3>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-slate-400">Last 12 months</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
              <div className="flex items-end justify-between h-40 sm:h-48 gap-1 sm:gap-2">
                {[45, 62, 38, 78, 55, 88, 65, 92, 70, 85, 60, 95].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.05, ease: 'easeOut' }}
                    className="flex-1 bg-gradient-to-t from-indigo-500/80 to-violet-400/90 rounded-t-md hover:from-indigo-600 hover:to-violet-500 transition-colors cursor-pointer"
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map((m) => (
                  <span key={m} className="text-[10px] text-slate-400">{m}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5"
            >
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Inventory Status</h3>
              <div className="space-y-4">
                {[
                  { label: 'In Stock', value: 85, color: 'bg-emerald-500' },
                  { label: 'Low Stock', value: 12, color: 'bg-amber-500' },
                  { label: 'Out of Stock', value: 3, color: 'bg-red-500' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-slate-600">{item.label}</span>
                      <span className="text-xs font-semibold text-slate-900">{item.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                        className={`h-full ${item.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-semibold text-slate-900 mb-3">Sales by Category</h4>
                <div className="space-y-2">
                  {[
                    { name: 'Electronics', value: 45, color: 'bg-indigo-500' },
                    { name: 'Fashion', value: 30, color: 'bg-violet-500' },
                    { name: 'Grocery', value: 15, color: 'bg-blue-500' },
                    { name: 'Home', value: 10, color: 'bg-cyan-500' },
                  ].map((cat) => (
                    <div key={cat.name} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${cat.color}`} />
                      <span className="text-xs text-slate-600 flex-1">{cat.name}</span>
                      <span className="text-xs font-medium text-slate-900">{cat.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5"
            >
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Top Selling Products</h3>
              <div className="space-y-3">
                {[
                  { name: 'Wireless Headphones', sales: 342, revenue: '₹8.5L' },
                  { name: 'Cotton T-Shirt', sales: 289, revenue: '₹2.3L' },
                  { name: 'Bluetooth Speaker', sales: 234, revenue: '₹9.4L' },
                  { name: 'Face Serum', sales: 198, revenue: '₹1.8L' },
                ].map((product, i) => (
                  <div key={product.name} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-slate-900 truncate">{product.name}</div>
                      <div className="text-[10px] text-slate-400">{product.sales} units sold</div>
                    </div>
                    <span className="text-xs font-semibold text-slate-900">{product.revenue}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5"
            >
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Recent Orders</h3>
              <div className="space-y-2.5">
                {[
                  { id: '#ORD-4521', customer: 'Ahmed R.', amount: '₹12,450', status: 'Completed' },
                  { id: '#ORD-4520', customer: 'Priya S.', amount: '₹3,200', status: 'Completed' },
                  { id: '#ORD-4519', customer: 'Rajesh K.', amount: '₹8,900', status: 'Processing' },
                  { id: '#ORD-4518', customer: 'Fatima M.', amount: '₹5,670', status: 'Completed' },
                ].map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <div>
                      <div className="text-xs font-medium text-slate-900">{order.id}</div>
                      <div className="text-[10px] text-slate-400">{order.customer}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-slate-900">{order.amount}</div>
                      <div
                        className={`text-[10px] ${
                          order.status === 'Completed' ? 'text-emerald-600' : 'text-amber-600'
                        }`}
                      >
                        {order.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

// ─── POS SECTION ──────────────────────────────────────────────────────────────

const POSSection: React.FC = () => {
  const [cart, setCart] = useState([
    { id: 1, name: 'Wireless Headphones', price: 2499, qty: 1 },
    { id: 2, name: 'Cotton T-Shirt', price: 799, qty: 2 },
  ]);
  const [discount, setDiscount] = useState(5);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountAmount = Math.round(subtotal * (discount / 100));
  const tax = Math.round((subtotal - discountAmount) * 0.18);
  const total = subtotal - discountAmount + tax;

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item))
        .filter((item) => item.qty > 0)
    );
  };

  return (
    <SectionWrapper id="pos" className="bg-slate-50">
      <SectionHeading
        badge="Point of Sale"
        title="Fast Checkout. Simple Billing."
        subtitle="Process sales in seconds with an intuitive POS interface designed for speed."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={staggerContainer}
        className="grid lg:grid-cols-5 gap-6"
      >
        <motion.div
          variants={slideInLeft}
          className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 overflow-hidden"
        >
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products or scan barcode..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all"
                aria-label="Search products"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-slate-200 transition-colors">
                <Scan className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>

          <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PRODUCTS.slice(0, 6).map((product) => (
              <motion.button
                key={product.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-slate-50 rounded-xl p-3 text-left hover:bg-indigo-50 hover:border-indigo-200 border border-transparent transition-all duration-200"
                aria-label={`Add ${product.name} to cart`}
              >
                <div className="text-2xl mb-2">{product.image}</div>
                <div className="text-xs font-medium text-slate-900 truncate">{product.name}</div>
                <div className="text-xs font-semibold text-indigo-600 mt-1">{product.price}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={slideInRight}
          className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col"
        >
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">Current Order</h3>
            <span className="text-xs text-slate-400">{cart.length} items</span>
          </div>

          <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-64">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-slate-900 truncate">{item.name}</div>
                  <div className="text-xs text-slate-400">₹{item.price.toLocaleString('en-IN')}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    <Minus className="w-3 h-3 text-slate-600" />
                  </button>
                  <span className="w-6 text-center text-xs font-medium text-slate-900">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    <Plus className="w-3 h-3 text-slate-600" />
                  </button>
                </div>
                <div className="text-xs font-semibold text-slate-900 w-16 text-right">
                  ₹{(item.price * item.qty).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Discount</span>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-24 h-1 accent-indigo-600"
                  aria-label="Discount percentage"
                />
                <span className="text-xs font-semibold text-indigo-600 w-8">{discount}%</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Discount ({discount}%)</span>
                <span className="text-emerald-600">-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>GST (18%)</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-900">Total</span>
              <span className="text-lg font-bold text-indigo-600">
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: <Banknote className="w-4 h-4" />, label: 'Cash' },
                { icon: <CreditCard className="w-4 h-4" />, label: 'Card' },
                { icon: <QrCode className="w-4 h-4" />, label: 'UPI' },
              ].map((method) => (
                <button
                  key={method.label}
                  className="flex flex-col items-center gap-1 py-2.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200"
                  aria-label={`Pay with ${method.label}`}
                >
                  <span className="text-slate-500">{method.icon}</span>
                  <span className="text-[10px] font-medium text-slate-600">{method.label}</span>
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Generate Invoice
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        {['Scan', 'Add to Cart', 'Apply Discount', 'Payment', 'Invoice'].map((step, i) => (
          <React.Fragment key={step}>
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-slate-200 shadow-sm"
            >
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-xs font-medium text-slate-700">{step}</span>
            </motion.div>
            {i < 4 && (
              <ArrowRight className="w-4 h-4 text-slate-300 hidden sm:block" />
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

// ─── INVENTORY SECTION ────────────────────────────────────────────────────────

const InventorySection: React.FC = () => {
  return (
    <SectionWrapper id="inventory" className="bg-white">
      <SectionHeading
        badge="Inventory"
        title="Know Your Stock Before It Becomes a Problem."
        subtitle="Real-time inventory tracking with automated alerts and smart reordering."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={staggerContainer}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {[
          { label: 'Total Products', value: '4,620', icon: <Package className="w-5 h-5" />, color: 'text-indigo-600 bg-indigo-50' },
          { label: 'In Stock', value: '3,927', icon: <CheckCircle2 className="w-5 h-5" />, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Low Stock', value: '554', icon: <AlertTriangle className="w-5 h-5" />, color: 'text-amber-600 bg-amber-50' },
          { label: 'Out of Stock', value: '139', icon: <PackageX className="w-5 h-5" />, color: 'text-red-600 bg-red-50' },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-5 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
              {stat.icon}
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={fadeUp}
        className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">Product Inventory</h3>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <Filter className="w-4 h-4 text-slate-400" />
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <Download className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Product</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">SKU</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Price</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Stock</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((product, i) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-lg">
                        {product.image}
                      </div>
                      <span className="text-xs font-medium text-slate-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{product.sku}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{product.category}</td>
                  <td className="px-4 py-3 text-xs font-medium text-slate-900">{product.price}</td>
                  <td className="px-4 py-3 text-xs text-slate-900">{product.stock}</td>
                  <td className="px-4 py-3">
                    <Badge status={product.status} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

// ─── PRODUCT MANAGEMENT SECTION ───────────────────────────────────────────────

const ProductManagementSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Electronics', 'Fashion', 'Grocery', 'Home', 'Beauty'];

  const filteredProducts =
    activeFilter === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeFilter);

  return (
    <SectionWrapper id="products" className="bg-slate-50">
      <SectionHeading
        badge="Product Management"
        title="Manage Your Entire Product Catalog"
        subtitle="Organize products by category, track pricing, and monitor stock levels."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="flex flex-wrap items-center justify-center gap-2 mb-8"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
              activeFilter === filter
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      <motion.div
        layout
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
            >
              <div className="aspect-square bg-slate-50 flex items-center justify-center text-5xl">
                {product.image}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{product.name}</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">{product.sku}</p>
                  </div>
                  <Badge status={product.status} />
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                  <div>
                    <div className="text-xs text-slate-400">Price</div>
                    <div className="text-sm font-bold text-slate-900">{product.price}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Stock</div>
                    <div className="text-sm font-bold text-slate-900">{product.stock}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
};

// ─── PURCHASE & SUPPLIER SECTION ──────────────────────────────────────────────

const PurchaseSection: React.FC = () => {
  return (
    <SectionWrapper id="purchasing" className="bg-white">
      <SectionHeading
        badge="Purchasing"
        title="From Supplier to Shelf, Without the Complexity."
        subtitle="Streamline your procurement process from purchase order to goods receipt."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="flex flex-wrap items-center justify-center gap-3 mb-10"
      >
        {['Supplier', 'Purchase Order', 'Goods Received', 'Inventory Updated'].map((step, i) => (
          <React.Fragment key={step}>
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200"
            >
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-xs font-medium text-slate-700">{step}</span>
            </motion.div>
            {i < 3 && <ChevronRight className="w-4 h-4 text-slate-300 hidden sm:block" />}
          </React.Fragment>
        ))}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={fadeUp}
        className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">Purchase Orders</h3>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            New PO
          </motion.button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">PO Number</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Supplier</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Products</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {PURCHASE_ORDERS.map((po, i) => (
                <motion.tr
                  key={po.poNumber}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-4 py-3 text-xs font-medium text-indigo-600">{po.poNumber}</td>
                  <td className="px-4 py-3 text-xs text-slate-900">{po.supplier}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{po.products} items</td>
                  <td className="px-4 py-3 text-xs font-medium text-slate-900">{po.amount}</td>
                  <td className="px-4 py-3">
                    <Badge status={po.status} />
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">{po.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

// ─── CUSTOMER MANAGEMENT SECTION ──────────────────────────────────────────────

const CustomerSection: React.FC = () => {
  return (
    <SectionWrapper id="customers" className="bg-slate-50">
      <SectionHeading
        badge="Customers"
        title="Turn Every Purchase Into a Customer Relationship."
        subtitle="Build detailed customer profiles and reward loyalty with every transaction."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="lg:col-span-2 space-y-4"
        >
          {CUSTOMERS.map((customer) => (
            <motion.div
              key={customer.name}
              variants={fadeUp}
              whileHover={{ y: -2 }}
              className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-sm font-bold text-white">
                  {customer.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-900">{customer.name}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        customer.membership === 'Gold'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {customer.membership}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-2">
                    <span className="text-xs text-slate-500">
                      <span className="font-semibold text-slate-900">{customer.orders}</span> Orders
                    </span>
                    <span className="text-xs text-slate-500">
                      <span className="font-semibold text-slate-900">{customer.lifetimeValue}</span> Lifetime Value
                    </span>
                    <span className="text-xs text-slate-500">
                      <span className="font-semibold text-indigo-600">{customer.loyaltyPoints.toLocaleString('en-IN')}</span> Points
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={slideInRight}
          className="bg-white rounded-2xl border border-slate-200 p-5"
        >
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Customer Growth</h3>
          <div className="flex items-end justify-between h-32 gap-2 mb-4">
            {[35, 45, 40, 55, 60, 58, 72, 68, 85, 80, 92, 100].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.05, ease: 'easeOut' }}
                className="flex-1 bg-gradient-to-t from-indigo-500/80 to-violet-400/90 rounded-t-md"
              />
            ))}
          </div>
          <div className="space-y-3 pt-4 border-t border-slate-100">
            {[
              { label: 'New Customers', value: '124', change: '+12%' },
              { label: 'Repeat Customers', value: '732', change: '+8%' },
              { label: 'Avg. Order Value', value: '₹2,280', change: '+5%' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{item.label}</span>
                <div className="text-right">
                  <div className="text-xs font-semibold text-slate-900">{item.value}</div>
                  <div className="text-[10px] text-emerald-600">{item.change}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

// ─── ANALYTICS SECTION ────────────────────────────────────────────────────────

const AnalyticsSection: React.FC = () => {
  return (
    <SectionWrapper id="analytics" className="bg-white">
      <SectionHeading
        badge="Analytics"
        title="Turn Retail Data Into Better Decisions."
        subtitle="Comprehensive analytics and reporting to understand your business performance."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
          className="bg-slate-50 rounded-2xl border border-slate-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-slate-900">Sales Performance</h3>
            <span className="text-xs text-emerald-600 font-medium">+18.6%</span>
          </div>
          <div className="flex items-end justify-between h-48 gap-2">
            {[40, 55, 35, 70, 50, 80, 60, 85, 65, 90, 75, 95].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.05, ease: 'easeOut' }}
                className="flex-1 bg-gradient-to-t from-indigo-500/70 to-violet-400/90 rounded-t-md hover:from-indigo-600 transition-colors"
              />
            ))}
          </div>
          <div className="flex justify-between mt-3">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
              <span key={m} className="text-[9px] text-slate-400 hidden sm:block">{m}</span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
          className="bg-slate-50 rounded-2xl border border-slate-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-slate-900">Revenue Growth</h3>
            <span className="text-xs text-emerald-600 font-medium">+12.4%</span>
          </div>
          <div className="relative h-48">
            <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                d="M0,180 C50,170 80,140 120,130 C160,120 180,90 220,80 C260,70 280,50 320,40 C360,30 380,20 400,15"
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M0,180 C50,170 80,140 120,130 C160,120 180,90 220,80 C260,70 280,50 320,40 C360,30 380,20 400,15 L400,200 L0,200 Z"
                fill="url(#lineGrad)"
              />
            </svg>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-200">
            {[
              { label: 'Daily', value: '₹2.84L' },
              { label: 'Weekly', value: '₹18.2L' },
              { label: 'Monthly', value: '₹72.4L' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-[10px] text-slate-400 uppercase">{item.label}</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{item.value}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
          className="bg-slate-50 rounded-2xl border border-slate-200 p-6"
        >
          <h3 className="text-sm font-semibold text-slate-900 mb-5">Top Categories</h3>
          <div className="space-y-4">
            {[
              { name: 'Electronics', value: 42, amount: '₹30.4L', color: 'bg-indigo-500' },
              { name: 'Fashion', value: 28, amount: '₹20.2L', color: 'bg-violet-500' },
              { name: 'Grocery', value: 18, amount: '₹13.0L', color: 'bg-blue-500' },
              { name: 'Home', value: 8, amount: '₹5.8L', color: 'bg-cyan-500' },
              { name: 'Beauty', value: 4, amount: '₹2.9L', color: 'bg-teal-500' },
            ].map((cat, i) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-slate-600">{cat.name}</span>
                  <span className="text-xs font-semibold text-slate-900">{cat.amount}</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${cat.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                    className={`h-full ${cat.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
          className="bg-slate-50 rounded-2xl border border-slate-200 p-6"
        >
          <h3 className="text-sm font-semibold text-slate-900 mb-5">Best Selling Products</h3>
          <div className="space-y-3">
            {[
              { name: 'Wireless Headphones', units: 342, revenue: '₹8.5L', trend: '+15%' },
              { name: 'Bluetooth Speaker', units: 234, revenue: '₹9.4L', trend: '+12%' },
              { name: 'Cotton T-Shirt', units: 289, revenue: '₹2.3L', trend: '+8%' },
              { name: 'Face Serum', units: 198, revenue: '₹1.8L', trend: '+6%' },
              { name: 'Denim Jeans', units: 156, revenue: '₹2.9L', trend: '+4%' },
            ].map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                className="flex items-center gap-3 bg-white rounded-xl p-3 border border-slate-100"
              >
                <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-slate-900 truncate">{product.name}</div>
                  <div className="text-[10px] text-slate-400">{product.units} units</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-slate-900">{product.revenue}</div>
                  <div className="text-[10px] text-emerald-600">{product.trend}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

// ─── MULTI-STORE SECTION ──────────────────────────────────────────────────────

const MultiStoreSection: React.FC = () => {
  return (
    <SectionWrapper id="multi-store" className="bg-slate-50">
      <SectionHeading
        badge="Multi-Store"
        title="One Platform. Every Store."
        subtitle="Manage multiple locations from a single centralized dashboard."
      />

      <div className="grid lg:grid-cols-3 gap-6 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="space-y-4"
        >
          {STORES.map((store) => (
            <motion.div
              key={store.name}
              variants={fadeUp}
              whileHover={{ x: 4 }}
              className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-4 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                <Store className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-900">{store.name}</div>
                <div className="text-xs text-slate-400">{store.location}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-indigo-600">{store.sales}</div>
                <div className="text-[10px] text-slate-400">Sales</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={scaleIn}
          className="lg:col-span-2 relative"
        >
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Centralized Dashboard</h3>
                <p className="text-xs text-slate-400">All stores combined</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Sales', value: '₹21.4L' },
                { label: 'Total Orders', value: '3,842' },
                { label: 'Total Customers', value: '2,148' },
                { label: 'Total Products', value: '12,480' },
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-50 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-slate-900">{stat.value}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex items-end justify-between h-32 gap-2">
              {[60, 75, 55, 85, 70, 90, 65, 80, 72, 88, 78, 95].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.05, ease: 'easeOut' }}
                  className="flex-1 bg-gradient-to-t from-indigo-500/70 to-violet-400/90 rounded-t-md"
                />
              ))}
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" aria-hidden="true">
              <motion.line
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
                x1="0"
                y1="30%"
                x2="30%"
                y2="50%"
                stroke="#6366f1"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.3"
              />
              <motion.line
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.7 }}
                x1="0"
                y1="50%"
                x2="30%"
                y2="50%"
                stroke="#6366f1"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.3"
              />
              <motion.line
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.9 }}
                x1="0"
                y1="70%"
                x2="30%"
                y2="50%"
                stroke="#6366f1"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.3"
              />
            </svg>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-10"
      >
        {[
          { icon: <Box className="w-5 h-5" />, label: 'Centralized Inventory' },
          { icon: <BarChart3 className="w-5 h-5" />, label: 'Store-wise Sales' },
          { icon: <RefreshCw className="w-5 h-5" />, label: 'Stock Transfers' },
          { icon: <Gauge className="w-5 h-5" />, label: 'Store Performance' },
          { icon: <FileText className="w-5 h-5" />, label: 'Centralized Reporting' },
        ].map((feature) => (
          <motion.div
            key={feature.label}
            variants={fadeUp}
            className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all duration-300"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              {feature.icon}
            </div>
            <span className="text-xs font-medium text-slate-700">{feature.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

// ─── ROLE MANAGEMENT SECTION ──────────────────────────────────────────────────

const RoleSection: React.FC = () => {
  return (
    <SectionWrapper id="roles" className="bg-white">
      <SectionHeading
        badge="Roles & Permissions"
        title="Secure Access for Every Team Member"
        subtitle="Control what each team member can see and do with role-based permissions."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {ROLES.map((role) => (
          <motion.div
            key={role.name}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
          >
            <div className={`h-1.5 bg-gradient-to-r ${role.color}`} />
            <div className="p-5">
              <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 mb-4">
                {role.icon}
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">{role.name}</h3>
              <ul className="space-y-2">
                {role.permissions.map((permission) => (
                  <li key={permission} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="text-xs text-slate-500">{permission}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

// ─── SMART ALERTS SECTION ─────────────────────────────────────────────────────

const SmartAlertsSection: React.FC = () => {
  return (
    <SectionWrapper id="alerts" className="bg-slate-50">
      <SectionHeading
        badge="Smart Alerts"
        title="Never Miss What Matters"
        subtitle="Real-time notifications keep you informed about your business."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={staggerContainer}
        className="max-w-2xl mx-auto space-y-3"
      >
        {NOTIFICATIONS.map((notification, i) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
            className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-4 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                notification.type === 'warning'
                  ? 'bg-amber-50 text-amber-600'
                  : notification.type === 'success'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-blue-50 text-blue-600'
              }`}
            >
              {notification.type === 'warning' ? (
                <AlertTriangle className="w-5 h-5" />
              ) : notification.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <Info className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-700">{notification.message}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{notification.time}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

// ─── HOW IT WORKS SECTION ─────────────────────────────────────────────────────

const HowItWorksSection: React.FC = () => {
  return (
    <SectionWrapper id="how-it-works" className="bg-white">
      <SectionHeading
        badge="How It Works"
        title="Get Started in Four Simple Steps"
        subtitle="From setup to growth — we make it easy to run your retail business."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {HOW_IT_WORKS.map((item, i) => (
          <motion.div
            key={item.step}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="relative bg-slate-50 rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
          >
            <div className="text-4xl font-bold text-slate-200 mb-4">{item.step}</div>
            <h3 className="text-sm font-semibold text-slate-900 mb-2">{item.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
            {i < 3 && (
              <ArrowRight className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 hidden lg:block" />
            )}
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

// ─── BENEFITS SECTION ─────────────────────────────────────────────────────────

const BenefitsSection: React.FC = () => {
  return (
    <SectionWrapper id="benefits" className="bg-slate-50">
      <SectionHeading
        badge="Benefits"
        title="Why Retailers Choose RetailOS"
        subtitle="Everything you need to run a smarter, more profitable retail business."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {BENEFITS.map((benefit) => (
          <motion.div
            key={benefit.title}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
              {benefit.icon}
            </div>
            <h3 className="text-sm font-semibold text-slate-900 mb-2">{benefit.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{benefit.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

// ─── INTEGRATIONS SECTION ─────────────────────────────────────────────────────

const IntegrationsSection: React.FC = () => {
  return (
    <SectionWrapper id="integrations" className="bg-white">
      <SectionHeading
        badge="Integrations"
        title="Connects With Your Retail Ecosystem"
        subtitle="Platform capabilities designed to work with the tools you already use."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={staggerContainer}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {INTEGRATIONS.map((integration) => (
          <motion.div
            key={integration.name}
            variants={fadeUp}
            whileHover={{ y: -3, scale: 1.02 }}
            className="flex flex-col items-center gap-3 bg-slate-50 rounded-2xl border border-slate-200 p-5 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all duration-300 cursor-default"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500">
              {integration.icon}
            </div>
            <span className="text-xs font-medium text-slate-600 text-center">{integration.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

// ─── FINAL CTA SECTION ────────────────────────────────────────────────────────

const FinalCTASection: React.FC = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-slate-950">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-violet-600 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
          >
            Ready to Run Your Retail Business Smarter?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-lg text-slate-300/90 max-w-2xl mx-auto leading-relaxed"
          >
            Bring sales, inventory, customers, and business insights together in one powerful platform.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-900 bg-white rounded-2xl hover:bg-slate-50 transition-all duration-300 shadow-2xl shadow-white/10 flex items-center justify-center gap-2"
            >
              Book a Demo
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4" />
              Explore Platform
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────


// ─── MAIN PAGE COMPONENT ─────────────────────────────────────────────────────

const RetailManagement: React.FC = () => {
  return (
    <div className="min-h-screen bg-white antialiased">
      <main>
        <HeroSection />
        <ChallengesSection />
        <PlatformOverview />
        <DashboardSection />
        <POSSection />
        <InventorySection />
        <ProductManagementSection />
        <PurchaseSection />
        <CustomerSection />
        <AnalyticsSection />
        <MultiStoreSection />
        <RoleSection />
        <SmartAlertsSection />
        <HowItWorksSection />
        <BenefitsSection />
        <IntegrationsSection />
        <FinalCTASection />
      </main>
    </div>
  );
};

export default RetailManagement;