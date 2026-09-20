import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Building2, Home, Store, Landmark, KeyRound, Users, UserPlus, Target,
  TrendingUp, TrendingDown, Search, Filter, ArrowRight, ArrowUpRight,
  ArrowDownRight, MapPin, BedDouble, Ruler, CheckCircle2, AlertTriangle,
  FileText, Calendar, CreditCard, Banknote, Receipt, Layers, Sparkles,
  ChevronRight, ChevronDown, Plus, Eye, Pencil, MoreHorizontal, Menu, X,
  Wallet, ClipboardList, Handshake, FileSignature, LayoutDashboard,
  Bell, Download, Percent, IndianRupee, Building, Briefcase, ShieldCheck,
  Globe, Zap, Heart, RefreshCw, Store as StoreIcon, Box, Truck, Mail,
  MessageSquare, Landmark as LandmarkIcon, Gauge, PackageX,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
interface NavItem { label: string; href: string; }
interface Challenge { icon: React.ReactNode; title: string; description: string; }
interface WorkflowStep { id: string; label: string; icon: React.ReactNode; description: string; }
interface KpiCard { label: string; value: string; change: string; trend: 'up' | 'down'; icon: React.ReactNode; }
interface Property {
  id: string; name: string; location: string; type: 'Apartment' | 'Villa' | 'Commercial' | 'Office' | 'Land';
  price: string; bedrooms: number; areaSqft: number;
  status: 'Available' | 'Reserved' | 'Sold' | 'Rented'; agent: string; image: string;
}
interface LeadStage { label: string; count: number; accent: string; }
interface Booking { id: string; customer: string; property: string; amount: string; paid: string; status: 'Confirmed' | 'Pending' | 'Completed'; }
interface Rental { tenant: string; property: string; monthlyRent: string; deposit: string; leaseEnd: string; status: 'Active' | 'Expiring' | 'Renewed'; }
interface Payment { customer: string; property: string; type: string; amount: string; date: string; method: string; status: 'Paid' | 'Pending' | 'Overdue'; ref: string; }
interface RoleCard { name: string; icon: React.ReactNode; permissions: string[]; color: string; }
interface Activity { icon: React.ReactNode; title: string; meta: string; time: string; tone: 'blue' | 'emerald' | 'amber' | 'rose' | 'violet'; }
interface Upcoming { kind: 'Site Visit' | 'Payment Due' | 'Lease Expiry' | 'Follow-up'; title: string; date: string; status: 'Confirmed' | 'Pending' | 'Overdue' | 'Scheduled'; }
interface Benefit { icon: React.ReactNode; title: string; description: string; }
interface Integration { name: string; icon: React.ReactNode; }

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const NAV_ITEMS: NavItem[] = [
  { label: 'Platform', href: '#platform' },
  { label: 'Properties', href: '#properties' },
  { label: 'Leads', href: '#leads' },
  { label: 'Sales', href: '#sales' },
  { label: 'Rentals', href: '#rentals' },
  { label: 'Reports', href: '#reports' },
];

const CHALLENGES: Challenge[] = [
  { icon: <Layers className="w-6 h-6" />, title: 'Scattered Property Data', description: 'Property info spread across spreadsheets, WhatsApp, and paper files.' },
  { icon: <Users className="w-6 h-6" />, title: 'Missed Follow-ups', description: 'Leads slip through the cracks without a structured pipeline.' },
  { icon: <FileSignature className="w-6 h-6" />, title: 'Slow Booking Process', description: 'Manual paperwork delays bookings and frustrates buyers.' },
  { icon: <Wallet className="w-6 h-6" />, title: 'Payment Tracking Issues', description: 'Hard to know who paid, how much, and what is pending.' },
  { icon: <KeyRound className="w-6 h-6" />, title: 'Rental & Lease Chaos', description: 'Lease renewals, deposits and rent tracking done manually.' },
  { icon: <Gauge className="w-6 h-6" />, title: 'No Business Visibility', description: "Owners can't see real-time sales, inventory, or agent performance." },
];

const WORKFLOW_STEPS: WorkflowStep[] = [
  { id: 'property', label: 'Property', icon: <Building2 className="w-5 h-5" />, description: 'Add and manage residential, commercial, and rental listings.' },
  { id: 'lead', label: 'Lead', icon: <Target className="w-5 h-5" />, description: 'Capture enquiries from every source in one pipeline.' },
  { id: 'customer', label: 'Customer', icon: <Users className="w-5 h-5" />, description: 'Build detailed buyer and tenant profiles.' },
  { id: 'visit', label: 'Site Visit', icon: <Calendar className="w-5 h-5" />, description: 'Schedule visits and log outcomes automatically.' },
  { id: 'negotiation', label: 'Negotiation', icon: <Handshake className="w-5 h-5" />, description: 'Track offers, discounts and counter-offers.' },
  { id: 'booking', label: 'Booking', icon: <ClipboardList className="w-5 h-5" />, description: 'Confirm bookings with digital agreements.' },
  { id: 'payment', label: 'Payment', icon: <CreditCard className="w-5 h-5" />, description: 'Record booking, milestone and rental payments.' },
  { id: 'sale', label: 'Sale / Rental', icon: <CheckCircle2 className="w-5 h-5" />, description: 'Close the deal and hand over the property.' },
  { id: 'reports', label: 'Reports', icon: <TrendingUp className="w-5 h-5" />, description: 'Analyze revenue, agents, and inventory performance.' },
];

const KPIS: KpiCard[] = [
  { label: 'Total Properties',  value: '248',   change: '+6.4%',  trend: 'up', icon: <Building2 className="w-5 h-5" /> },
  { label: 'Available',         value: '142',   change: '+2.1%',  trend: 'up', icon: <Home className="w-5 h-5" /> },
  { label: 'Sold',              value: '64',    change: '+1.2%',  trend: 'up', icon: <CheckCircle2 className="w-5 h-5" /> },
  { label: 'Rented',            value: '42',    change: '-0.6%',  trend: 'down', icon: <KeyRound className="w-5 h-5" /> },
  { label: 'Active Leads',      value: '128',   change: '+9.8%',  trend: 'up', icon: <Users className="w-5 h-5" /> },
  { label: 'Monthly Revenue',   value: '₹4.8Cr',change: '+12.5%', trend: 'up', icon: <IndianRupee className="w-5 h-5" /> },
];

const PROPERTIES: Property[] = [
  { id: 'PRP-1042', name: 'Palm Grove Residency',     location: 'Anna Nagar, Chennai',  type: 'Apartment',  price: '₹95.0 L',  bedrooms: 3, areaSqft: 1450, status: 'Available', agent: 'Arjun Menon',    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=70' },
  { id: 'PRP-1043', name: 'ECR Sea View Villa',       location: 'Injambakkam, Chennai', type: 'Villa',      price: '₹3.20 Cr', bedrooms: 5, areaSqft: 4200, status: 'Reserved',  agent: 'Priya Raghavan', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=70' },
  { id: 'PRP-1044', name: 'OMR Tech Park Office',     location: 'Perungudi, Chennai',   type: 'Office',     price: '₹1.85 Cr', bedrooms: 0, areaSqft: 2600, status: 'Rented',    agent: 'Karthik Iyer',   image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=70' },
  { id: 'PRP-1045', name: 'Velachery Commercial Hub', location: 'Velachery, Chennai',   type: 'Commercial', price: '₹4.50 Cr', bedrooms: 0, areaSqft: 6800, status: 'Available', agent: 'Arjun Menon',    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=70' },
  { id: 'PRP-1046', name: 'Adyar Riverside Apartments',location: 'Adyar, Chennai',      type: 'Apartment',  price: '₹1.28 Cr', bedrooms: 4, areaSqft: 2100, status: 'Sold',      agent: 'Sneha Nair',     image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=70' },
  { id: 'PRP-1047', name: 'Guindy Industrial Plot',   location: 'Guindy, Chennai',      type: 'Land',       price: '₹2.70 Cr', bedrooms: 0, areaSqft: 9000, status: 'Available', agent: 'Karthik Iyer',   image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=70' },
];

const LEADS: LeadStage[] = [
  { label: 'New Lead',    count: 48, accent: 'from-sky-500 to-sky-400' },
  { label: 'Contacted',   count: 32, accent: 'from-blue-500 to-blue-400' },
  { label: 'Site Visit',  count: 21, accent: 'from-violet-500 to-violet-400' },
  { label: 'Negotiation', count: 14, accent: 'from-amber-500 to-amber-400' },
  { label: 'Booking',     count: 8,  accent: 'from-orange-500 to-orange-400' },
  { label: 'Closed',      count: 5,  accent: 'from-emerald-500 to-emerald-400' },
];

const BOOKINGS: Booking[] = [
  { id: 'BK-2201', customer: 'Ramesh Kumar',    property: 'ECR Sea View Villa',       amount: '₹3.20 Cr', paid: '₹32.0 L', status: 'Confirmed' },
  { id: 'BK-2202', customer: 'Meena Enterprises',property: 'Velachery Commercial Hub', amount: '₹4.50 Cr', paid: '₹45.0 L', status: 'Pending'   },
  { id: 'BK-2203', customer: 'Suresh Babu',     property: 'Adyar Riverside Apartments',amount: '₹1.28 Cr', paid: '₹1.28 Cr', status: 'Completed' },
];

const RENTALS: Rental[] = [
  { tenant: 'Deepak Sharma',  property: 'OMR Tech Park Office', monthlyRent: '₹1,45,000', deposit: '₹8,70,000', leaseEnd: '28 Sep 2026', status: 'Active'   },
  { tenant: 'Anita Joseph',   property: 'Palm Grove A-704',      monthlyRent: '₹48,000',   deposit: '₹2,88,000', leaseEnd: '15 Oct 2026', status: 'Expiring' },
  { tenant: 'Meena Enterprises', property: 'Guindy Warehouse',  monthlyRent: '₹92,000',   deposit: '₹5,52,000', leaseEnd: '01 Dec 2026', status: 'Renewed' },
];

const PAYMENTS: Payment[] = [
  { customer: 'Ramesh Kumar',     property: 'ECR Sea View Villa',         type: 'Booking',   amount: '₹32.0 L',  date: '12 Sep 2026', method: 'NEFT',  status: 'Paid',    ref: 'TXN-88291' },
  { customer: 'Meena Enterprises',property: 'Velachery Commercial Hub',   type: 'Booking',   amount: '₹45.0 L',  date: '15 Sep 2026', method: 'RTGS',  status: 'Pending', ref: 'TXN-88292' },
  { customer: 'Deepak Sharma',    property: 'OMR Tech Park Office',       type: 'Rent',      amount: '₹1.45 L',  date: '01 Sep 2026', method: 'UPI',   status: 'Paid',    ref: 'TXN-88155' },
  { customer: 'Suresh Babu',      property: 'Adyar Riverside Apartments', type: 'Milestone', amount: '₹64.0 L',  date: '30 Aug 2026', method: 'NEFT',  status: 'Paid',    ref: 'TXN-88012' },
  { customer: 'Anita Joseph',     property: 'Palm Grove A-704',           type: 'Rent',      amount: '₹48,000',  date: '05 Sep 2026', method: 'UPI',   status: 'Overdue', ref: 'TXN-88250' },
];

const ACTIVITIES: Activity[] = [
  { icon: <Building2 className="w-4 h-4" />,   title: 'New property added — Palm Grove Residency', meta: 'Anna Nagar • by Arjun Menon',       time: '12 min ago', tone: 'blue' },
  { icon: <UserPlus className="w-4 h-4" />,    title: 'New customer registered — Ramesh Kumar',    meta: 'Interested in ECR Sea View Villa',  time: '48 min ago', tone: 'violet' },
  { icon: <Calendar className="w-4 h-4" />,    title: 'Site visit scheduled',                      meta: 'Velachery Commercial Hub • 4:30 PM',time: '2 hrs ago',  tone: 'amber' },
  { icon: <CheckCircle2 className="w-4 h-4" />,title: 'Property booked — Adyar Riverside',         meta: 'Booking amount ₹5,00,000 received', time: '5 hrs ago',  tone: 'emerald' },
  { icon: <Wallet className="w-4 h-4" />,      title: 'Payment received',                          meta: '₹12,50,000 • Invoice #INV-2291',    time: 'Yesterday',  tone: 'emerald' },
  { icon: <Pencil className="w-4 h-4" />,      title: 'Property status updated',                   meta: 'PRP-1043 → Reserved',               time: 'Yesterday',  tone: 'rose' },
];

const UPCOMING: Upcoming[] = [
  { kind: 'Site Visit',   title: 'Ramesh Kumar • ECR Sea View Villa',  date: 'Today, 4:30 PM',     status: 'Confirmed' },
  { kind: 'Payment Due',  title: 'Meena Enterprises • Booking payment',date: 'Tomorrow, 11:00 AM', status: 'Pending'   },
  { kind: 'Lease Expiry', title: 'OMR Tech Park Office • Lease #L-2201',date: '28 Sep 2026',       status: 'Scheduled' },
  { kind: 'Follow-up',    title: 'Suresh Babu • Negotiation callback', date: '30 Sep 2026',        status: 'Pending'   },
  { kind: 'Payment Due',  title: 'Guindy Industrial Plot • Token amount',date: '02 Oct 2026',      status: 'Overdue'   },
];

const ROLES: RoleCard[] = [
  { name: 'Admin',          icon: <ShieldCheck className="w-5 h-5" />, permissions: ['Full Access', 'User Management', 'Settings', 'Billing', 'Reports'],           color: 'from-violet-500 to-purple-600' },
  { name: 'Sales Manager',  icon: <Briefcase className="w-5 h-5" />,   permissions: ['Leads', 'Properties', 'Bookings', 'Reports'],                                   color: 'from-blue-500 to-cyan-600' },
  { name: 'Sales Agent',    icon: <Users className="w-5 h-5" />,       permissions: ['Assigned Leads', 'Site Visits', 'Follow-ups'],                                  color: 'from-emerald-500 to-teal-600' },
  { name: 'Finance',        icon: <CreditCard className="w-5 h-5" />,  permissions: ['Payments', 'Invoices', 'Reconciliation', 'Reports'],                            color: 'from-amber-500 to-orange-600' },
];

const BENEFITS: Benefit[] = [
  { icon: <Zap className="w-5 h-5" />,       title: 'Close Deals Faster',        description: 'Structured pipeline reduces deal cycles and improves follow-ups.' },
  { icon: <Layers className="w-5 h-5" />,    title: 'Single Source of Truth',    description: 'All properties, leads, customers, and payments in one platform.' },
  { icon: <RefreshCw className="w-5 h-5" />, title: 'Automated Follow-ups',      description: 'Never miss a site visit, payment due, or renewal again.' },
  { icon: <Heart className="w-5 h-5" />,     title: 'Better Customer Experience',description: 'Faster responses and cleaner communication at every stage.' },
  { icon: <Eye className="w-5 h-5" />,       title: 'Real-Time Visibility',      description: 'Owners see sales, inventory, and agent performance instantly.' },
  { icon: <Target className="w-5 h-5" />,    title: 'Data-Driven Decisions',     description: 'Reports on locations, agents, and revenue guide strategy.' },
  { icon: <Globe className="w-5 h-5" />,     title: 'Scalable Operations',       description: 'Add projects, agents, and branches without complexity.' },
];

const INTEGRATIONS: Integration[] = [
  { name: 'Payment Gateway', icon: <CreditCard className="w-5 h-5" /> },
  { name: 'Accounting',      icon: <LandmarkIcon className="w-5 h-5" /> },
  { name: 'GST & Compliance',icon: <FileText className="w-5 h-5" /> },
  { name: 'Email',           icon: <Mail className="w-5 h-5" /> },
  { name: 'SMS / WhatsApp',  icon: <MessageSquare className="w-5 h-5" /> },
  { name: 'Maps',            icon: <MapPin className="w-5 h-5" /> },
  { name: 'e-Signature',     icon: <FileSignature className="w-5 h-5" /> },
  { name: 'Analytics',       icon: <TrendingUp className="w-5 h-5" /> },
];

/* ─────────────────────────────────────────────────────────────
   VARIANTS
───────────────────────────────────────────────────────────── */
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
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

/* ─────────────────────────────────────────────────────────────
   REUSABLE
───────────────────────────────────────────────────────────── */
const SectionWrapper: React.FC<{ children: React.ReactNode; id?: string; className?: string }> = ({ children, id, className = '' }) => (
  <section id={id} className={`w-full py-16 md:py-24 lg:py-32 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
  </section>
);

const SectionHeading: React.FC<{ badge?: string; title: string; subtitle?: string; align?: 'left' | 'center' }> = ({ badge, title, subtitle, align = 'center' }) => (
  <motion.div
    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer}
    className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''} mb-12 md:mb-16`}
  >
    {badge && (
      <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-50 text-indigo-600 border border-indigo-100 mb-4">
        <Sparkles className="w-3.5 h-3.5" />{badge}
      </motion.span>
    )}
    <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">{title}</motion.h2>
    {subtitle && <motion.p variants={fadeUp} className="mt-4 text-lg text-slate-500 leading-relaxed">{subtitle}</motion.p>}
  </motion.div>
);

const StatusBadge: React.FC<{ status: Property['status'] | Payment['status'] | Booking['status'] | Rental['status'] | Upcoming['status'] }> = ({ status }) => {
  const styles: Record<string, string> = {
    Available: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Reserved:  'bg-amber-50 text-amber-700 border-amber-200',
    Sold:      'bg-rose-50 text-rose-700 border-rose-200',
    Rented:    'bg-blue-50 text-blue-700 border-blue-200',
    Paid:      'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending:   'bg-amber-50 text-amber-700 border-amber-200',
    Overdue:   'bg-red-50 text-red-700 border-red-200',
    Confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
    Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Active:    'bg-emerald-50 text-emerald-700 border-emerald-200',
    Expiring:  'bg-amber-50 text-amber-700 border-amber-200',
    Renewed:   'bg-violet-50 text-violet-700 border-violet-200',
    Scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
  };
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-slate-50 text-slate-600 border-slate-200'}`}>{status}</span>;
};

/* ─────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────── */
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">Estate<span className="text-indigo-600">OS</span></span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(i => <a key={i.label} href={i.href} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100/80 transition-all">{i.label}</a>)}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900">Sign In</button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
              Book a Demo
            </motion.button>
          </div>
          <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden">
            <div className="px-4 py-4 space-y-1">
              {NAV_ITEMS.map(i => <a key={i.label} href={i.href} onClick={() => setOpen(false)} className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg">{i.label}</a>)}
              <button className="w-full mt-2 px-4 py-3 text-sm font-semibold text-white bg-slate-900 rounded-xl">Book a Demo</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

/* ─────────────────────────────────────────────────────────────
   HERO  ← VIDEO FIX APPLIED HERE
───────────────────────────────────────────────────────────── */
const HeroSection: React.FC = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
    {/* Background video */}
    <div className="absolute inset-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/real-estate.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/60 to-slate-950/80" />
    </div>

    <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
    <motion.div animate={{ x: [0, -30, 0], y: [0, 20, 0] }} transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute bottom-1/4 -right-20 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl" />

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center lg:text-left">
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-medium text-indigo-300">
              <Sparkles className="w-3.5 h-3.5" /> Real Estate Management Platform
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.1]">
            Manage Every Property, Lead & Deal{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">in One Place</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 text-lg md:text-xl text-slate-300/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Properties, leads, customers, site visits, bookings, payments and rentals — from one centralized platform built for modern real estate businesses.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
              className="group w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-900 bg-white rounded-2xl hover:bg-slate-50 transition shadow-2xl shadow-white/10 flex items-center justify-center gap-2">
              Explore Platform <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl hover:bg-white/10 transition flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" /> Book a Demo
            </motion.button>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10 flex items-center gap-6 justify-center lg:justify-start">
            {[{ v: '₹2,400Cr+', l: 'Properties Managed' }, { v: '12,000+', l: 'Leads Handled' }, { v: '850+', l: 'Agents Onboard' }].map(s => (
              <div key={s.l} className="text-center lg:text-left">
                <div className="text-xl font-bold text-white">{s.v}</div>
                <div className="text-xs text-slate-400">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
          className="relative hidden lg:block">
          <div className="relative bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-amber-400/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[{ l: 'Properties', v: '248', c: 'text-indigo-300' }, { l: 'Active Leads', v: '128', c: 'text-emerald-300' }].map(i => (
                  <div key={i.l} className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">{i.l}</div>
                    <div className={`text-lg font-bold ${i.c}`}>{i.v}</div>
                  </div>
                ))}
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">Sales — Last 12 months</div>
                <div className="flex items-end justify-between h-20 gap-1.5">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                    <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }}
                      transition={{ duration: 0.8, delay: 0.5 + i * 0.05, ease: 'easeOut' }}
                      className="flex-1 bg-gradient-to-t from-indigo-500/60 to-violet-400/80 rounded-t-sm" />
                  ))}
                </div>
              </div>
              {['Palm Grove Residency', 'ECR Sea View Villa', 'Velachery Commercial Hub'].map((n, i) => (
                <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                  <span className="text-xs text-slate-300">{n}</span>
                  <span className="text-xs font-medium text-emerald-400">+{12 - i * 3}%</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-2xl border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-emerald-600" /></div>
              <div><div className="text-xs text-slate-500">Monthly Revenue</div><div className="text-sm font-bold text-slate-900">₹4.8 Cr</div></div>
            </div>
          </motion.div>
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-4 -left-8 bg-white rounded-2xl p-4 shadow-2xl border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center"><Target className="w-5 h-5 text-indigo-600" /></div>
              <div><div className="text-xs text-slate-500">Lead Conversion</div><div className="text-sm font-bold text-emerald-600">+18.6%</div></div>
            </div>
          </motion.div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute top-1/3 -left-12 bg-white rounded-2xl p-3 shadow-2xl border border-slate-100">
            <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-amber-500" /><span className="text-xs font-medium text-slate-700">6 Site Visits Today</span></div>
          </motion.div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute bottom-1/3 -right-10 bg-white rounded-2xl p-3 shadow-2xl border border-slate-100">
            <div className="flex items-center gap-2"><Wallet className="w-4 h-4 text-indigo-500" /><span className="text-xs font-medium text-slate-700">₹32L Booking Received</span></div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   CHALLENGES
───────────────────────────────────────────────────────────── */
const ChallengesSection: React.FC = () => (
  <SectionWrapper id="challenges" className="bg-white">
    <SectionHeading badge="Challenges" title="Real Estate Is Complex. Management Doesn't Have to Be."
      subtitle="Here's how we solve the everyday problems real estate teams face." />
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {CHALLENGES.map(c => (
        <motion.div key={c.title} variants={fadeUp} whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="group bg-white rounded-2xl border border-slate-200/80 p-6 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-indigo-50 flex items-center justify-center text-slate-600 group-hover:text-indigo-600 transition-colors mb-4">
            {c.icon}
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-2">{c.title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed">{c.description}</p>
        </motion.div>
      ))}
    </motion.div>
  </SectionWrapper>
);

/* ─────────────────────────────────────────────────────────────
   PLATFORM WORKFLOW
───────────────────────────────────────────────────────────── */
const PlatformOverview: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);
  return (
    <SectionWrapper id="platform" className="bg-slate-50">
      <SectionHeading badge="Platform" title="One Connected Real Estate Workflow"
        subtitle="Property → Lead → Customer → Visit → Negotiation → Booking → Payment → Sale/Rental → Reports." />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}
        className="relative max-w-4xl mx-auto">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-200 via-violet-200 to-indigo-200 hidden lg:block -translate-x-1/2" />
        <div className="space-y-4 lg:space-y-6">
          {WORKFLOW_STEPS.map((step, i) => (
            <motion.div key={step.id} variants={fadeUp} onHoverStart={() => setActive(step.id)} onHoverEnd={() => setActive(null)}
              className={`relative flex items-center gap-4 lg:gap-6 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
              <div className={`flex-1 ${i % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                <motion.div whileHover={{ scale: 1.02 }}
                  className={`inline-block bg-white rounded-2xl border p-5 transition-all duration-300 ${active === step.id ? 'border-indigo-300 shadow-xl shadow-indigo-500/10' : 'border-slate-200 shadow-sm'}`}>
                  <div className={`flex items-center gap-3 ${i % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${active === step.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{step.label}</h3>
                      <AnimatePresence>
                        {active === step.id && (
                          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            className="text-xs text-slate-500 mt-1 max-w-xs">{step.description}</motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="hidden lg:flex items-center justify-center relative z-10">
                <motion.div animate={{ scale: active === step.id ? 1.3 : 1, backgroundColor: active === step.id ? '#4f46e5' : '#e2e8f0' }}
                  transition={{ duration: 0.2 }} className="w-4 h-4 rounded-full border-4 border-slate-50 shadow-sm" />
              </div>
              <div className="flex-1 hidden lg:block" />
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div className="lg:hidden mt-8 flex flex-wrap items-center justify-center gap-2">
        {WORKFLOW_STEPS.map(s => (
          <div key={s.id} className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200 text-xs font-medium text-slate-600">
            {s.icon}{s.label}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

/* ─────────────────────────────────────────────────────────────
   DASHBOARD PREVIEW
───────────────────────────────────────────────────────────── */
const DashboardSection: React.FC = () => (
  <SectionWrapper id="dashboard" className="bg-white">
    <SectionHeading badge="Dashboard" title="Your Entire Real Estate Business. At a Glance."
      subtitle="A powerful dashboard for owners and managers with real-time KPIs." />
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={scaleIn}
      className="bg-slate-50 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center"><LayoutDashboard className="w-4 h-4 text-white" /></div>
          <span className="text-sm font-semibold text-slate-900">EstateOS Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-slate-100"><Search className="w-4 h-4 text-slate-400" /></button>
          <button className="p-2 rounded-lg hover:bg-slate-100 relative"><Bell className="w-4 h-4 text-slate-400" /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" /></button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">A</div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
          {KPIS.map((k, i) => (
            <motion.div key={k.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">{k.icon}</div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${k.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {k.change}
                </span>
              </div>
              <div className="text-xl font-bold text-slate-900">{k.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{k.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-900">Sales & Rental Revenue</h3>
              <div className="flex items-center gap-1 text-xs text-slate-400">Last 12 months <ChevronDown className="w-3.5 h-3.5" /></div>
            </div>
            <div className="flex items-end justify-between h-40 sm:h-48 gap-1 sm:gap-2">
              {[45, 62, 38, 78, 55, 88, 65, 92, 70, 85, 60, 95].map((h, i) => (
                <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.05, ease: 'easeOut' }}
                  className="flex-1 bg-gradient-to-t from-indigo-500/80 to-violet-400/90 rounded-t-md hover:from-indigo-600" />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {['Jan','Mar','May','Jul','Sep','Nov'].map(m => <span key={m} className="text-[10px] text-slate-400">{m}</span>)}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Inventory Status</h3>
            <div className="space-y-4">
              {[
                { l: 'Available', v: 58, c: 'bg-emerald-500' },
                { l: 'Reserved',  v: 17, c: 'bg-amber-500' },
                { l: 'Sold',      v: 26, c: 'bg-rose-500' },
                { l: 'Rented',    v: 18, c: 'bg-blue-500' },
              ].map(i => (
                <div key={i.l}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-slate-600">{i.l}</span>
                    <span className="text-xs font-semibold text-slate-900">{i.v}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${i.v}%` }} viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }} className={`h-full ${i.c} rounded-full`} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35, duration: 0.5 }}
            className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Lead Conversion Funnel</h3>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
              {LEADS.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.05 }} whileHover={{ y: -3 }}
                  className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3 hover:shadow-md transition">
                  <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${s.accent}`} />
                  <div className="text-xl font-bold text-slate-900">{s.count}</div>
                  <div className="text-[10px] font-medium text-slate-500 mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Top Agents</h3>
            <div className="space-y-3">
              {[
                { n: 'Arjun Menon',    v: '18 deals', r: '₹14.2 Cr' },
                { n: 'Priya Raghavan', v: '14 deals', r: '₹11.8 Cr' },
                { n: 'Karthik Iyer',   v: '12 deals', r: '₹9.6 Cr'  },
                { n: 'Sneha Nair',     v: '9 deals',  r: '₹7.2 Cr'  },
              ].map((a, i) => (
                <div key={a.n} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-slate-900 truncate">{a.n}</div>
                    <div className="text-[10px] text-slate-400">{a.v}</div>
                  </div>
                  <span className="text-xs font-semibold text-slate-900">{a.r}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  </SectionWrapper>
);

/* ─────────────────────────────────────────────────────────────
   PROPERTIES
───────────────────────────────────────────────────────────── */
const PropertySection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<'All' | Property['type']>('All');
  const [status, setStatus] = useState<'All' | Property['status']>('All');

  const filtered = PROPERTIES.filter(p =>
    (type === 'All' || p.type === type) &&
    (status === 'All' || p.status === status) &&
    (query === '' || p.name.toLowerCase().includes(query.toLowerCase()) || p.location.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <SectionWrapper id="properties" className="bg-slate-50">
      <SectionHeading badge="Properties" title="Manage Your Entire Property Portfolio"
        subtitle="Search, filter and track residential, commercial, and rental properties." />

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 flex flex-col lg:flex-row gap-3 lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name, location…"
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300" />
        </div>
        <select value={type} onChange={e => setType(e.target.value as typeof type)}
          className="px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:outline-none">
          {(['All','Apartment','Villa','Commercial','Office','Land'] as const).map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>)}
        </select>
        <select value={status} onChange={e => setStatus(e.target.value as typeof status)}
          className="px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:outline-none">
          {(['All','Available','Reserved','Sold','Rented'] as const).map(s => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
        </select>
        <button className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 hover:bg-slate-50">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </motion.div>

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map(p => (
            <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }} whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 left-3"><StatusBadge status={p.status} /></div>
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md rounded-lg px-3 py-1 text-xs font-semibold text-slate-900">{p.price}</div>
              </div>
              <div className="p-4">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">{p.id} • {p.type}</div>
                <h3 className="text-sm font-semibold text-slate-900 mt-0.5">{p.name}</h3>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1"><MapPin className="w-3 h-3" /> {p.location}</div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    {p.bedrooms > 0 && <span className="inline-flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" /> {p.bedrooms} Beds</span>}
                    <span className="inline-flex items-center gap-1"><Ruler className="w-3.5 h-3.5" /> {p.areaSqft.toLocaleString('en-IN')} sqft</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-md text-slate-500 hover:bg-blue-50 hover:text-blue-600"><Eye className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded-md text-slate-500 hover:bg-amber-50 hover:text-amber-600"><Pencil className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="mt-2 text-[10px] text-slate-400">Agent: <span className="text-slate-600 font-medium">{p.agent}</span></div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-3"><Search className="w-5 h-5 text-slate-400" /></div>
          <div className="text-sm font-medium text-slate-700">No properties match your filters</div>
          <div className="text-xs text-slate-500 mt-1">Try changing search or filters.</div>
        </div>
      )}
    </SectionWrapper>
  );
};

/* ─────────────────────────────────────────────────────────────
   LEADS PIPELINE
───────────────────────────────────────────────────────────── */
const LeadsSection: React.FC = () => (
  <SectionWrapper id="leads" className="bg-white">
    <SectionHeading badge="Leads" title="Track Every Lead From Enquiry to Closure"
      subtitle="A clear pipeline so no opportunity slips through." />
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {LEADS.map((s, i) => (
        <motion.div key={s.label} variants={fadeUp} whileHover={{ y: -4 }}
          className="relative overflow-hidden bg-slate-50 rounded-2xl border border-slate-200 p-5 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
          <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.accent}`} />
          <div className="text-3xl font-bold text-slate-900">{s.count}</div>
          <div className="text-xs font-medium text-slate-500 mt-1">{s.label}</div>
          <div className="mt-3 flex items-center gap-1 text-[10px] text-slate-400">
            <ArrowRight className="w-3 h-3" /> Stage {i + 1}
          </div>
        </motion.div>
      ))}
    </motion.div>
  </SectionWrapper>
);

/* ─────────────────────────────────────────────────────────────
   SALES & BOOKINGS
───────────────────────────────────────────────────────────── */
const SalesSection: React.FC = () => (
  <SectionWrapper id="sales" className="bg-slate-50">
    <SectionHeading badge="Sales & Bookings" title="From Booking to Registration, Digitally"
      subtitle="Track customers, agreements, payment milestones and closures." />
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Active Bookings</h3>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg hover:bg-slate-800">
          <Plus className="w-3.5 h-3.5" /> New Booking
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-slate-100">
              {['Booking ID','Customer','Property','Amount','Paid','Status'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BOOKINGS.map((b, i) => (
              <motion.tr key={b.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3 text-xs font-medium text-indigo-600">{b.id}</td>
                <td className="px-4 py-3 text-xs text-slate-900">{b.customer}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{b.property}</td>
                <td className="px-4 py-3 text-xs font-medium text-slate-900">{b.amount}</td>
                <td className="px-4 py-3 text-xs text-emerald-600">{b.paid}</td>
                <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  </SectionWrapper>
);

/* ─────────────────────────────────────────────────────────────
   RENTALS & TENANTS
───────────────────────────────────────────────────────────── */
const RentalsSection: React.FC = () => (
  <SectionWrapper id="rentals" className="bg-white">
    <SectionHeading badge="Rentals & Tenants" title="Manage Leases, Rent and Renewals"
      subtitle="Track tenants, monthly rent, deposits and lease expiries." />
    <div className="grid lg:grid-cols-3 gap-5">
      {RENTALS.map((r, i) => (
        <motion.div key={r.tenant} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }}
          className="bg-slate-50 rounded-2xl border border-slate-200 p-5 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><KeyRound className="w-5 h-5" /></div>
            <StatusBadge status={r.status} />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">{r.tenant}</h3>
          <div className="text-xs text-slate-500 mt-0.5">{r.property}</div>
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-slate-500">Monthly Rent</span><span className="font-semibold text-slate-900">{r.monthlyRent}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Deposit</span><span className="font-semibold text-slate-900">{r.deposit}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Lease Ends</span><span className="font-semibold text-slate-900">{r.leaseEnd}</span></div>
          </div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);

/* ─────────────────────────────────────────────────────────────
   PAYMENTS
───────────────────────────────────────────────────────────── */
const PaymentsSection: React.FC = () => (
  <SectionWrapper id="payments" className="bg-slate-50">
    <SectionHeading badge="Payments" title="Every Rupee Tracked, From Booking to Rent"
      subtitle="Record booking, milestone and rental payments with status at a glance." />
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Recent Payments</h3>
        <button className="p-2 rounded-lg hover:bg-slate-100"><Download className="w-4 h-4 text-slate-400" /></button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px]">
          <thead>
            <tr className="border-b border-slate-100">
              {['Customer','Property','Type','Amount','Date','Method','Status','Ref'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PAYMENTS.map((p, i) => (
              <motion.tr key={p.ref} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3 text-xs text-slate-900">{p.customer}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{p.property}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{p.type}</td>
                <td className="px-4 py-3 text-xs font-medium text-slate-900">{p.amount}</td>
                <td className="px-4 py-3 text-xs text-slate-400">{p.date}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{p.method}</td>
                <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                <td className="px-4 py-3 text-xs font-mono text-slate-400">{p.ref}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  </SectionWrapper>
);

/* ─────────────────────────────────────────────────────────────
   RECENT ACTIVITY + UPCOMING
───────────────────────────────────────────────────────────── */
const ActivitySection: React.FC = () => {
  const toneMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600', emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600', rose: 'bg-rose-50 text-rose-600', violet: 'bg-violet-50 text-violet-600',
  };
  return (
    <SectionWrapper id="activity" className="bg-white">
      <SectionHeading badge="Operations" title="Stay On Top of Every Activity"
        subtitle="Real-time activity feed and upcoming priorities." />
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Recent Activity</h3>
          <ol className="space-y-4">
            {ACTIVITIES.map(a => (
              <motion.li key={a.title} variants={fadeUp} className="flex gap-3">
                <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${toneMap[a.tone]}`}>{a.icon}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-slate-800">{a.title}</div>
                  <div className="text-xs text-slate-500">{a.meta}</div>
                </div>
                <div className="shrink-0 text-xs text-slate-400">{a.time}</div>
              </motion.li>
            ))}
          </ol>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Upcoming Activities</h3>
          <ul className="divide-y divide-slate-200">
            {UPCOMING.map(u => (
              <motion.li key={u.title} variants={fadeUp} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-slate-800">{u.title}</div>
                  <div className="text-xs text-slate-500">{u.kind} • {u.date}</div>
                </div>
                <StatusBadge status={u.status} />
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

/* ─────────────────────────────────────────────────────────────
   ROLES
───────────────────────────────────────────────────────────── */
const RoleSection: React.FC = () => (
  <SectionWrapper id="roles" className="bg-slate-50">
    <SectionHeading badge="Roles & Permissions" title="Secure Access for Every Team Member"
      subtitle="Control what each agent, manager and admin can see and do." />
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}
      className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {ROLES.map(r => (
        <motion.div key={r.name} variants={fadeUp} whileHover={{ y: -4 }}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
          <div className={`h-1.5 bg-gradient-to-r ${r.color}`} />
          <div className="p-5">
            <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 mb-4">{r.icon}</div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">{r.name}</h3>
            <ul className="space-y-2">
              {r.permissions.map(p => (
                <li key={p} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="text-xs text-slate-500">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </SectionWrapper>
);

/* ─────────────────────────────────────────────────────────────
   REPORTS & ANALYTICS
───────────────────────────────────────────────────────────── */
const ReportsSection: React.FC = () => (
  <SectionWrapper id="reports" className="bg-white">
    <SectionHeading badge="Reports & Analytics" title="Turn Real Estate Data Into Better Decisions"
      subtitle="Sales, inventory, agent performance and revenue at your fingertips." />
    <div className="grid lg:grid-cols-2 gap-6">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-slate-900">Monthly Revenue</h3>
          <span className="text-xs text-emerald-600 font-medium">+18.6%</span>
        </div>
        <div className="flex items-end justify-between h-48 gap-2">
          {[40, 55, 35, 70, 50, 80, 60, 85, 65, 90, 75, 95].map((h, i) => (
            <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.05, ease: 'easeOut' }}
              className="flex-1 bg-gradient-to-t from-indigo-500/70 to-violet-400/90 rounded-t-md" />
          ))}
        </div>
        <div className="flex justify-between mt-3">
          {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m =>
            <span key={m} className="text-[9px] text-slate-400 hidden sm:block">{m}</span>)}
        </div>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-5">Sales by Location</h3>
        <div className="space-y-4">
          {[
            { n: 'Anna Nagar',    v: 32, a: '₹18.4 Cr', c: 'bg-indigo-500' },
            { n: 'Adyar',         v: 24, a: '₹14.2 Cr', c: 'bg-violet-500' },
            { n: 'OMR / Perungudi', v: 20, a: '₹11.8 Cr', c: 'bg-blue-500' },
            { n: 'Velachery',     v: 14, a: '₹8.6 Cr',  c: 'bg-cyan-500' },
            { n: 'ECR',           v: 10, a: '₹6.4 Cr',  c: 'bg-teal-500' },
          ].map((l, i) => (
            <div key={l.n}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-slate-600">{l.n}</span>
                <span className="text-xs font-semibold text-slate-900">{l.a}</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${l.v}%` }} viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }} className={`h-full ${l.c} rounded-full`} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </SectionWrapper>
);

/* ─────────────────────────────────────────────────────────────
   BENEFITS
───────────────────────────────────────────────────────────── */
const BenefitsSection: React.FC = () => (
  <SectionWrapper id="benefits" className="bg-slate-50">
    <SectionHeading badge="Benefits" title="Why Real Estate Teams Choose EstateOS"
      subtitle="Everything you need to run a smarter, more profitable real estate business." />
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {BENEFITS.map(b => (
        <motion.div key={b.title} variants={fadeUp} whileHover={{ y: -4 }}
          className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">{b.icon}</div>
          <h3 className="text-sm font-semibold text-slate-900 mb-2">{b.title}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">{b.description}</p>
        </motion.div>
      ))}
    </motion.div>
  </SectionWrapper>
);

/* ─────────────────────────────────────────────────────────────
   INTEGRATIONS
───────────────────────────────────────────────────────────── */
const IntegrationsSection: React.FC = () => (
  <SectionWrapper id="integrations" className="bg-white">
    <SectionHeading badge="Integrations" title="Connects With Your Real Estate Ecosystem"
      subtitle="Payment gateways, accounting, e-signature, maps and communication tools." />
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {INTEGRATIONS.map(i => (
        <motion.div key={i.name} variants={fadeUp} whileHover={{ y: -3, scale: 1.02 }}
          className="flex flex-col items-center gap-3 bg-slate-50 rounded-2xl border border-slate-200 p-5 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500">{i.icon}</div>
          <span className="text-xs font-medium text-slate-600 text-center">{i.name}</span>
        </motion.div>
      ))}
    </motion.div>
  </SectionWrapper>
);

/* ─────────────────────────────────────────────────────────────
   FINAL CTA
───────────────────────────────────────────────────────────── */
const FinalCTASection: React.FC = () => (
  <section className="relative py-24 md:py-32 overflow-hidden bg-slate-950">
    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-3xl" />
    <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-violet-600 rounded-full blur-3xl" />
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
          Ready to Run Your Real Estate Business Smarter?
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-5 text-lg text-slate-300/90 max-w-2xl mx-auto leading-relaxed">
          Bring properties, leads, customers, bookings, payments and rentals together in one powerful platform.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-900 bg-white rounded-2xl hover:bg-slate-50 transition shadow-2xl shadow-white/10 flex items-center justify-center gap-2">
            Book a Demo <ArrowRight className="w-4 h-4" />
          </motion.button>
          <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl hover:bg-white/10 transition flex items-center justify-center gap-2">
            <Layers className="w-4 h-4" /> Explore Platform
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────── */
const Footer: React.FC = () => (
  <footer className="bg-slate-900 py-12 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-white">Estate<span className="text-indigo-400">OS</span></span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {['Privacy','Terms','Security','Contact'].map(i => (
            <a key={i} href="#" className="text-xs text-slate-400 hover:text-white transition-colors">{i}</a>
          ))}
        </div>
        <p className="text-xs text-slate-500">© {new Date().getFullYear()} EstateOS. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────── */
const RealEstateManagement: React.FC = () => (
  <div className="min-h-screen bg-white antialiased">
    <main>
      <HeroSection />
      <ChallengesSection />
      <PlatformOverview />
      <DashboardSection />
      <PropertySection />
      <LeadsSection />
      <SalesSection />
      <RentalsSection />
      <PaymentsSection />
      <ActivitySection />
      <RoleSection />
      <ReportsSection />
      <BenefitsSection />
      <IntegrationsSection />
      <FinalCTASection />
    </main>
  </div>
);

export default RealEstateManagement;