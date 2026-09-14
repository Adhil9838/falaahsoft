import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Lock,
  Fingerprint,
  Eye,
  FileCheck,
  Users,
  TrendingUp,
  BarChart3,
  Wallet,
  CreditCard,
  PiggyBank,
  Building2,
  ArrowRight,
  ChevronRight,
  Landmark,
  LineChart,
  Activity,
  Globe,
  Server,
  Zap,
  CheckCircle2,
  CircleDollarSign,
  Receipt,
  UserCheck,
  ScanLine,
  Layers,
  GitBranch,
  Repeat,
  ArrowUpRight,
  ArrowDownLeft,
  BadgeCheck,
} from 'lucide-react';

// ─── Video import (adjust path to match your project structure) ──────────────
import heroVideo from '../assets/bank_finance.mp4';

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatItem {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface SolutionCard {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

interface WhyChooseItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface EcosystemNode {
  label: string;
  icon: React.ReactNode;
}

interface SecurityItem {
  label: string;
  icon: React.ReactNode;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats: StatItem[] = [
  {
    value: '99.9%',
    label: 'Platform Availability',
    icon: <Activity className="w-5 h-5" />,
  },
  {
    value: '256-bit',
    label: 'Secure Transactions',
    icon: <Lock className="w-5 h-5" />,
  },
  {
    value: 'Real-Time',
    label: 'Analytics & Insights',
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    value: 'Cloud',
    label: 'Scalable Infrastructure',
    icon: <Server className="w-5 h-5" />,
  },
];

const solutions: SolutionCard[] = [
  {
    title: 'Core Banking',
    description:
      'Modernize banking operations with intelligent account, customer, branch, and transaction management.',
    features: [
      'Customer Accounts',
      'Deposits & Withdrawals',
      'Transaction Management',
      'Branch Operations',
    ],
    icon: <Landmark className="w-6 h-6" />,
  },
  {
    title: 'Loan Management',
    description:
      'Manage the complete lending lifecycle from application and approval to repayment.',
    features: [
      'Loan Applications',
      'Eligibility',
      'Approval Workflow',
      'EMI & Repayment Tracking',
    ],
    icon: <CircleDollarSign className="w-6 h-6" />,
  },
  {
    title: 'Digital Payments',
    description:
      'Deliver fast, secure, and seamless digital payment experiences across channels.',
    features: [
      'Payment Processing',
      'Transaction Monitoring',
      'Digital Wallets',
      'Reconciliation',
    ],
    icon: <CreditCard className="w-6 h-6" />,
  },
  {
    title: 'Financial Accounting',
    description:
      'Streamline financial operations with real-time accounting, reporting, and reconciliation.',
    features: ['General Ledger', 'Invoicing', 'Expenses', 'Financial Reports'],
    icon: <Receipt className="w-6 h-6" />,
  },
  {
    title: 'Wealth Management',
    description:
      'Give financial advisors and customers powerful tools for managing investments and portfolios.',
    features: [
      'Portfolio Management',
      'Investment Tracking',
      'Asset Allocation',
      'Performance Analytics',
    ],
    icon: <PiggyBank className="w-6 h-6" />,
  },
  {
    title: 'Risk & Compliance',
    description:
      'Strengthen financial security with intelligent monitoring, compliance, and fraud prevention.',
    features: ['KYC', 'AML Monitoring', 'Fraud Detection', 'Audit & Compliance'],
    icon: <Shield className="w-6 h-6" />,
  },
];

const whyChooseItems: WhyChooseItem[] = [
  {
    title: 'Enterprise Security',
    description:
      'Bank-grade encryption, multi-factor authentication, and continuous threat monitoring protect every transaction.',
    icon: <Shield className="w-7 h-7" />,
  },
  {
    title: 'Real-Time Intelligence',
    description:
      'Live dashboards and AI-driven analytics deliver actionable insights the moment you need them.',
    icon: <Zap className="w-7 h-7" />,
  },
  {
    title: 'Seamless Integrations',
    description:
      'Pre-built connectors for core systems, payment rails, ERPs, and third-party financial services.',
    icon: <GitBranch className="w-7 h-7" />,
  },
  {
    title: 'Scalable Architecture',
    description:
      'Cloud-native infrastructure that grows with your institution — from startup to enterprise scale.',
    icon: <Layers className="w-7 h-7" />,
  },
];

const ecosystemNodes: EcosystemNode[] = [
  { label: 'Banks', icon: <Building2 className="w-5 h-5" /> },
  { label: 'Customers', icon: <Users className="w-5 h-5" /> },
  { label: 'Businesses', icon: <Wallet className="w-5 h-5" /> },
  { label: 'Payments', icon: <CreditCard className="w-5 h-5" /> },
  { label: 'Loans', icon: <CircleDollarSign className="w-5 h-5" /> },
  { label: 'Investments', icon: <TrendingUp className="w-5 h-5" /> },
  { label: 'Analytics', icon: <LineChart className="w-5 h-5" /> },
];

const securityItems: SecurityItem[] = [
  { label: 'Secure Authentication', icon: <Fingerprint className="w-5 h-5" /> },
  { label: 'Data Encryption', icon: <Lock className="w-5 h-5" /> },
  { label: 'Fraud Monitoring', icon: <Eye className="w-5 h-5" /> },
  { label: 'KYC / AML', icon: <FileCheck className="w-5 h-5" /> },
  { label: 'Role-Based Access', icon: <UserCheck className="w-5 h-5" /> },
  { label: 'Audit Trails', icon: <ScanLine className="w-5 h-5" /> },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frame: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start]);

  return count;
}

// ─── Reusable Components ──────────────────────────────────────────────────────

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
      {children}
    </span>
  );
}

function SectionHeading({
  title,
  subtitle,
  align = 'center',
}: {
  title: React.ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
}) {
  return (
    <div
      className={`mb-12 lg:mb-16 ${
        align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'
      }`}
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Hero Section (with Video Background) ────────────────────────────────────

function HeroSection() {
  const { ref, inView } = useInView(0.1);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was prevented — poster frame remains visible.
      });
    }
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-900"
    >
      {/* ── Video Background ───────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />

        {/* Dark overlay for readability while keeping video visible */}
        <div className="absolute inset-0 bg-slate-900/70" />

        {/* Soft blue tint gradient */}
        <div className="absolute " />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Foreground Content ─────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div
            className={`transition-all duration-700 delay-100 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-cyan-300 text-sm font-medium mb-6 backdrop-blur-sm">
              <BadgeCheck className="w-4 h-4" />
              <span>Enterprise Fintech Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Powering the Future of{' '}
              <GradientText>Finance &amp; Banking</GradientText>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
              Secure, intelligent, and scalable financial technology solutions
              designed to transform banking, payments, lending, and financial
              operations.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#solutions"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5"
              >
                Explore Solutions
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#cta"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 border border-white/30 text-white font-semibold text-sm backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:-translate-y-0.5"
              >
                Talk to Our Experts
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>SOC 2 Type II</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>PCI DSS Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>ISO 27001</span>
              </div>
            </div>
          </div>

          {/* Right visual — Dashboard */}
          <div
            className={`transition-all duration-700 delay-300 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <HeroDashboard />
          </div>
        </div>
      </div>

      <AnimatedParticles />
    </section>
  );
}

function AnimatedParticles() {
  return (
    <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cyan-400/60"
          style={{
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
            animation: `float ${6 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

function HeroDashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 500);
    return () => clearTimeout(t);
  }, []);

  const balance = useCountUp(2847500, 1800, mounted);
  const revenue = useCountUp(84200, 1800, mounted);

  const transactions = [
    {
      icon: <ArrowDownLeft className="w-3.5 h-3.5" />,
      label: 'Wire Transfer',
      amount: '+$45,200',
      time: '2 min ago',
      positive: true,
    },
    {
      icon: <ArrowUpRight className="w-3.5 h-3.5" />,
      label: 'Loan Disbursement',
      amount: '-$12,800',
      time: '15 min ago',
      positive: false,
    },
    {
      icon: <Repeat className="w-3.5 h-3.5" />,
      label: 'Payment Gateway',
      amount: '+$8,340',
      time: '32 min ago',
      positive: true,
    },
    {
      icon: <CreditCard className="w-3.5 h-3.5" />,
      label: 'Card Settlement',
      amount: '+$3,120',
      time: '1 hr ago',
      positive: true,
    },
  ];

  const bars = [42, 65, 48, 78, 56, 88, 72, 95, 60, 82, 70, 92];

  return (
    <div className="relative">
      <div className="relative rounded-2xl bg-white/95 backdrop-blur-xl border border-white/40 p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Landmark className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-slate-900 text-sm font-semibold">
                Financial Overview
              </p>
              <p className="text-slate-500 text-[10px]">Live Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-700 text-[10px] font-medium">
              Secure
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 p-4">
            <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">
              Total Balance
            </p>
            <p className="text-slate-900 text-xl font-bold tabular-nums">
              ${balance.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 mt-1.5">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              <span className="text-emerald-600 text-[10px] font-medium">
                +12.4%
              </span>
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">
              Monthly Revenue
            </p>
            <p className="text-slate-900 text-xl font-bold tabular-nums">
              ${revenue.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 mt-1.5">
              <TrendingUp className="w-3 h-3 text-cyan-600" />
              <span className="text-cyan-600 text-[10px] font-medium">
                +8.2%
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-900 text-xs font-semibold">
              Revenue Analytics
            </p>
            <span className="text-slate-500 text-[10px]">Last 12 months</span>
          </div>
          <div className="flex items-end gap-1.5 h-16">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end">
                <div
                  className="w-full rounded-sm bg-gradient-to-t from-cyan-500 to-blue-500 transition-all duration-1000 ease-out"
                  style={{
                    height: mounted ? `${h}%` : '0%',
                    transitionDelay: `${i * 80}ms`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-900 text-xs font-semibold">
              Recent Transactions
            </p>
            <span className="text-cyan-700 text-[10px] font-medium cursor-pointer hover:text-cyan-800">
              View All
            </span>
          </div>
          <div className="space-y-2.5">
            {transactions.map((tx, i) => (
              <div
                key={i}
                className="flex items-center justify-between transition-all duration-500"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateX(0)' : 'translateX(-10px)',
                  transitionDelay: `${800 + i * 150}ms`,
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      tx.positive
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-rose-50 text-rose-600'
                    }`}
                  >
                    {tx.icon}
                  </div>
                  <div>
                    <p className="text-slate-900 text-[11px] font-medium">
                      {tx.label}
                    </p>
                    <p className="text-slate-500 text-[9px]">{tx.time}</p>
                  </div>
                </div>
                <span
                  className={`text-[11px] font-semibold tabular-nums ${
                    tx.positive ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Trust Section ────────────────────────────────────────────────────────────

function TrustSection() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="relative py-20 lg:py-28 bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center max-w-3xl mx-auto mb-14 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
            Technology Built for{' '}
            <GradientText>Modern Financial Institutions</GradientText>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
            We help banks, financial institutions, fintech companies, lenders,
            and businesses modernize their operations with secure, intelligent,
            and scalable technology — from core banking to digital payments and
            beyond.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="group relative rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 text-center transition-all duration-500 hover:bg-slate-50 hover:border-cyan-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50"
              style={{
                transitionDelay: `${i * 100}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100 text-cyan-600 mb-3 transition-transform duration-300 group-hover:scale-110">
                {stat.icon}
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {stat.value}
              </p>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Solutions Section ────────────────────────────────────────────────────────

function SolutionsSection() {
  return (
    <section id="solutions" className="relative py-20 lg:py-28 bg-slate-50">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-100/50 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={
            <>
              Finance &amp; Banking <GradientText>Solutions</GradientText>
            </>
          }
          subtitle="A comprehensive suite of financial technology solutions designed to power every aspect of modern banking and finance."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {solutions.map((card, i) => (
            <SolutionCardItem key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionCardItem({
  card,
  index,
}: {
  card: SolutionCard;
  index: number;
}) {
  const { ref, inView } = useInView(0.1);

  return (
    <article
      ref={ref}
      className="group relative rounded-2xl bg-white border border-slate-200 p-6 transition-all duration-500 hover:bg-white hover:border-cyan-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-100/50"
      style={{
        transitionDelay: `${index * 80}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 flex items-center justify-center text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-400">
          {card.icon}
        </div>
        <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed mb-5">
        {card.description}
      </p>

      <ul className="space-y-2.5" role="list">
        {card.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2.5 text-sm text-slate-700"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 pt-4 border-t border-slate-100">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-700 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:gap-2.5">
          Learn more <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </article>
  );
}

// ─── Dashboard Showcase Section ───────────────────────────────────────────────

function DashboardShowcase() {
  const { ref, inView } = useInView(0.1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setMounted(true), 300);
      return () => clearTimeout(t);
    }
  }, [inView]);

  const totalBalance = useCountUp(12450800, 2000, mounted);
  const monthlyRevenue = useCountUp(284500, 2000, mounted);
  const transactionVolume = useCountUp(48200, 2000, mounted);
  const loanPortfolio = useCountUp(8750000, 2000, mounted);

  const recentTransactions = [
    {
      name: 'Corporate Wire',
      type: 'Transfer',
      amount: '$125,000',
      status: 'Completed',
      positive: true,
    },
    {
      name: 'Mortgage Payment',
      type: 'Loan',
      amount: '$3,450',
      status: 'Completed',
      positive: false,
    },
    {
      name: 'Merchant Settlement',
      type: 'Payment',
      amount: '$48,200',
      status: 'Processing',
      positive: true,
    },
    {
      name: 'Investment Dividend',
      type: 'Wealth',
      amount: '$12,800',
      status: 'Completed',
      positive: true,
    },
    {
      name: 'Vendor Payment',
      type: 'AP',
      amount: '$8,900',
      status: 'Pending',
      positive: false,
    },
  ];

  const chartData = [35, 52, 45, 68, 58, 82, 75, 95, 88, 72, 90, 98];

  return (
    <section className="relative py-20 lg:py-28 bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className={`transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium mb-5">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Unified Banking Dashboard</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
              One Dashboard.{' '}
              <GradientText>Complete Financial Control.</GradientText>
            </h2>

            <p className="mt-5 text-base text-slate-600 leading-relaxed">
              Monitor balances, revenue, transactions, loan portfolios, and
              payment activity in real time. Our unified dashboard gives
              financial teams the clarity they need to make faster, smarter
              decisions.
            </p>

            <ul className="mt-7 space-y-3.5" role="list">
              {[
                'Real-time balance and revenue tracking across all accounts',
                'Comprehensive loan portfolio and repayment monitoring',
                'Instant payment activity and transaction reconciliation',
                'Customizable reports and financial analytics',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-700"
                >
                  <div className="w-5 h-5 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-cyan-600" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#cta"
              className="group inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5"
            >
              Request a Demo
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-cyan-200/50 to-blue-200/50 rounded-3xl blur-2xl" />

              <div className="relative rounded-2xl bg-white backdrop-blur-xl border border-slate-200 p-5 sm:p-6 shadow-2xl shadow-slate-300/50">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    {
                      label: 'Total Balance',
                      value: `$${totalBalance.toLocaleString()}`,
                      change: '+14.2%',
                      color: 'cyan',
                    },
                    {
                      label: 'Monthly Revenue',
                      value: `$${monthlyRevenue.toLocaleString()}`,
                      change: '+9.8%',
                      color: 'emerald',
                    },
                    {
                      label: 'Transaction Volume',
                      value: transactionVolume.toLocaleString(),
                      change: '+22.1%',
                      color: 'blue',
                    },
                    {
                      label: 'Loan Portfolio',
                      value: `$${loanPortfolio.toLocaleString()}`,
                      change: '+6.5%',
                      color: 'violet',
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 transition-all duration-500"
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted
                          ? 'translateY(0)'
                          : 'translateY(10px)',
                      }}
                    >
                      <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">
                        {stat.label}
                      </p>
                      <p className="text-slate-900 text-base sm:text-lg font-bold tabular-nums">
                        {stat.value}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600 text-[10px] font-medium">
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-slate-900 text-xs font-semibold">
                      Revenue &amp; Payment Activity
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-cyan-500" />
                        <span className="text-slate-500 text-[9px]">
                          Revenue
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                        <span className="text-slate-500 text-[9px]">
                          Payments
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end gap-1.5 h-20">
                    {chartData.map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 flex flex-col justify-end gap-0.5"
                      >
                        <div
                          className="w-full rounded-t-sm bg-gradient-to-t from-cyan-500 to-cyan-400 transition-all duration-1000 ease-out"
                          style={{
                            height: mounted ? `${h}%` : '0%',
                            transitionDelay: `${i * 70}ms`,
                          }}
                        />
                        <div
                          className="w-full rounded-b-sm bg-gradient-to-t from-blue-600 to-blue-500 transition-all duration-1000 ease-out"
                          style={{
                            height: mounted ? `${h * 0.6}%` : '0%',
                            transitionDelay: `${i * 70 + 100}ms`,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-slate-900 text-xs font-semibold">
                      Recent Transactions
                    </p>
                    <span className="text-cyan-700 text-[10px] font-medium cursor-pointer hover:text-cyan-800">
                      View All
                    </span>
                  </div>
                  <div className="space-y-2">
                    {recentTransactions.map((tx, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-1.5 transition-all duration-500"
                        style={{
                          opacity: mounted ? 1 : 0,
                          transform: mounted
                            ? 'translateX(0)'
                            : 'translateX(-8px)',
                          transitionDelay: `${600 + i * 120}ms`,
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${
                              tx.positive
                                ? 'bg-emerald-50 text-emerald-600'
                                : 'bg-rose-50 text-rose-600'
                            }`}
                          >
                            {tx.positive ? '↓' : '↑'}
                          </div>
                          <div>
                            <p className="text-slate-900 text-[11px] font-medium">
                              {tx.name}
                            </p>
                            <p className="text-slate-500 text-[9px]">
                              {tx.type}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-[11px] font-semibold tabular-nums ${
                              tx.positive
                                ? 'text-emerald-600'
                                : 'text-rose-600'
                            }`}
                          >
                            {tx.amount}
                          </p>
                          <p
                            className={`text-[9px] ${
                              tx.status === 'Completed'
                                ? 'text-emerald-600'
                                : tx.status === 'Processing'
                                ? 'text-amber-600'
                                : 'text-slate-500'
                            }`}
                          >
                            {tx.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us Section ────────────────────────────────────────────────────

function WhyChooseUs() {
  return (
    <section className="relative py-20 lg:py-28 bg-slate-50">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-100/40 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={
            <>
              Built for Trust. <GradientText>Designed for Scale.</GradientText>
            </>
          }
          subtitle="Enterprise-grade infrastructure that financial institutions rely on for security, performance, and growth."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyChooseItems.map((item, i) => (
            <WhyChooseCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseCard({
  item,
  index,
}: {
  item: WhyChooseItem;
  index: number;
}) {
  const { ref, inView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl bg-white border border-slate-200 p-6 transition-all duration-500 hover:bg-white hover:border-cyan-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-100/50"
      style={{
        transitionDelay: `${index * 100}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 flex items-center justify-center text-cyan-600 mb-5 transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-400">
        {item.icon}
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-2.5">
        {item.title}
      </h3>
      <p className="text-sm text-slate-600 leading-relaxed">
        {item.description}
      </p>
    </div>
  );
}

// ─── Ecosystem Section ────────────────────────────────────────────────────────

function EcosystemSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section ref={ref} className="relative py-20 lg:py-28 bg-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-100/40 rounded-full blur-[150px]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={
            <>
              Connected <GradientText>Financial Ecosystem</GradientText>
            </>
          }
          subtitle="Our platform seamlessly connects every participant in the financial value chain."
        />

        <div className="relative flex flex-col items-center">
          {ecosystemNodes.map((node, i) => (
            <React.Fragment key={node.label}>
              <div
                className="group relative z-10 flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white border border-slate-200 transition-all duration-500 hover:bg-slate-50 hover:border-cyan-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-100/50"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView
                    ? 'translateY(0) scale(1)'
                    : 'translateY(20px) scale(0.95)',
                  transitionDelay: `${i * 120}ms`,
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 flex items-center justify-center text-cyan-600 transition-transform duration-300 group-hover:scale-110">
                  {node.icon}
                </div>
                <span className="text-sm sm:text-base font-semibold text-slate-900">
                  {node.label}
                </span>
              </div>

              {i < ecosystemNodes.length - 1 && (
                <div
                  className="relative z-0 flex flex-col items-center transition-all duration-700"
                  style={{
                    opacity: inView ? 1 : 0,
                    transitionDelay: `${i * 120 + 80}ms`,
                  }}
                >
                  <div className="w-px h-6 bg-gradient-to-b from-cyan-400 to-blue-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                  <div className="w-px h-6 bg-gradient-to-b from-blue-400 to-cyan-400" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {ecosystemNodes.map((node, i) => (
            <div
              key={node.label}
              className="text-center transition-all duration-700"
              style={{
                opacity: inView ? 1 : 0,
                transitionDelay: `${i * 100 + 400}ms`,
              }}
            >
              <div className="w-10 h-10 mx-auto rounded-full bg-white border border-slate-200 flex items-center justify-center text-cyan-600 mb-2">
                {node.icon}
              </div>
              <p className="text-[10px] text-slate-600 font-medium">
                {node.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Security Section ─────────────────────────────────────────────────────────

function SecuritySection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-28 bg-slate-50 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-100/50 rounded-full blur-[120px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(15,23,42,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className={`flex justify-center transition-all duration-700 ${
              inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full border border-cyan-300/40 animate-[spin_60s_linear_infinite]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[240px] h-[240px] sm:w-[290px] sm:h-[290px] rounded-full border border-blue-300/40 animate-[spin_45s_linear_infinite_reverse]" />
              </div>

              <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] rounded-full bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 flex items-center justify-center backdrop-blur-sm shadow-xl shadow-cyan-100/50">
                <div className="w-[140px] h-[140px] sm:w-[170px] sm:h-[170px] rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 border border-cyan-200 flex items-center justify-center">
                  <Shield
                    className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-600"
                    strokeWidth={1.2}
                  />
                </div>
              </div>

              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    animation: `orbit ${12 + i * 4}s linear infinite`,
                    animationDelay: `${i * 2}s`,
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-500 translate-y-[-100px] sm:translate-y-[-120px]" />
                </div>
              ))}
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-medium mb-5">
              <Lock className="w-3.5 h-3.5" />
              <span>Bank-Grade Security</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
              Security at <GradientText>Every Transaction</GradientText>
            </h2>

            <p className="mt-5 text-base text-slate-600 leading-relaxed">
              Every transaction, every account, every interaction is protected
              by multiple layers of enterprise security — so your institution
              and your customers can operate with complete confidence.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {securityItems.map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-slate-200 transition-all duration-500 hover:bg-slate-50 hover:border-cyan-300"
                  style={{
                    transitionDelay: `${i * 80}ms`,
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateX(0)' : 'translateX(16px)',
                  }}
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600 flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-900">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

function CTASection() {
  const { ref, inView } = useInView(0.15);

  return (
    <section id="cta" ref={ref} className="relative py-20 lg:py-28 bg-white">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-100/60 to-cyan-100/60 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-10 sm:p-14 lg:p-16 shadow-xl shadow-slate-200/50 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
            Transform Your{' '}
            <GradientText>Financial Operations</GradientText>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Build secure, intelligent, and scalable financial experiences with
            modern technology.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5"
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#solutions"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border border-slate-300 text-slate-900 font-semibold text-sm transition-all duration-300 hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-0.5"
            >
              Explore Solutions
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
              <span>Enterprise deployment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
              <span>24/7 dedicated support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const footerLinks: Record<string, string[]> = {
    Company: ['About Us', 'Careers', 'Leadership', 'Newsroom', 'Partners'],
    'Finance & Banking': [
      'Core Banking',
      'Digital Payments',
      'Lending',
      'Wealth Management',
      'Risk & Compliance',
    ],
    Solutions: [
      'Retail Banking',
      'Corporate Banking',
      'Fintech Platforms',
      'Payment Gateways',
      'Analytics Suite',
    ],
    Services: [
      'Implementation',
      'Integration',
      'Managed Services',
      'Consulting',
      'Support',
    ],
    Contact: ['Sales', 'Support', 'Partnerships', 'Media Inquiries', 'Offices'],
  };

  return (
    <footer className="relative bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Landmark className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                FinCore
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
              Enterprise financial technology solutions powering the future of
              banking and finance.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[Shield, Lock, Globe].map((Icon, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 transition-all duration-300 hover:text-cyan-600 hover:border-cyan-300"
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-600 transition-colors duration-200 hover:text-cyan-700"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} FinCore Technologies. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-slate-600 transition-colors duration-200 hover:text-cyan-700"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-slate-600 transition-colors duration-200 hover:text-cyan-700"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-xs text-slate-600 transition-colors duration-200 hover:text-cyan-700"
            >
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function FinanceBankingPage() {
  return (
    <main className="min-h-screen bg-white font-sans antialiased selection:bg-cyan-200 selection:text-slate-900">
      <HeroSection />
      <TrustSection />
      <SolutionsSection />
      <DashboardShowcase />
      <WhyChooseUs />
      <EcosystemSection />
      <SecuritySection />
      <CTASection />
      <Footer />
    </main>
  );
}