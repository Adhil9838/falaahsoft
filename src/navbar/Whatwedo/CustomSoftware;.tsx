// CustomSoftware.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  Play,
  AlertCircle,
  Users,
  Globe,
  CreditCard,
  Mail,
  Database,
  BarChart3,
  MessageSquare,
  Lock,
  Cpu,
  Workflow,
  Zap,
  Code2,
  Server,
  Shield,
  GitBranch,
  RefreshCw,
  FileText,
  Building2,
  Layout,
  Settings,
  CheckCircle2,
  ChevronRight,
  Search,
  Bell,
  Filter,
  Plus,
  TrendingUp,
  Boxes,
  Network,
  LineChart,
  Puzzle,
  Rocket,
  ClipboardList,
  Palette,
  TestTube,
  Upload,
} from 'lucide-react';

/* ============================================================
   SHARED HOOKS
   ============================================================ */

const useInView = (options: IntersectionObserverInit = { threshold: 0.15 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
};

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
};

/* ============================================================
   1. HERO SECTION
   ============================================================ */

const HeroSection: React.FC = () => {
  const [videoFailed, setVideoFailed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const anim = (delay: number) =>
    prefersReduced
      ? {}
      : {
          transition: `opacity 800ms cubic-bezier(0.2,0.9,0.3,1) ${delay}ms, transform 800ms cubic-bezier(0.2,0.9,0.3,1) ${delay}ms`,
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(32px)',
        };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#0a0f1c]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        {!videoFailed ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setVideoFailed(true)}
            className="h-full w-full object-cover"
          >
            <source src="/what-we-do section/Custom-software.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1c] via-[#0f1a33] to-[#0a0f1c]">
            <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[140px]" />
            <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[140px]" />
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
          </div>
        )}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1c]/80 via-[#0a0f1c]/70 to-[#0a0f1c]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1c]/70 via-transparent to-transparent" />
      </div>

      {/* Floating tech particles */}
      {!prefersReduced && (
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-blue-400/50"
              style={{
                top: `${(i * 37) % 100}%`,
                left: `${(i * 53) % 100}%`,
                animation: `csFloat ${6 + (i % 5)}s ease-in-out ${i * 0.4}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes csFloat {
          0%, 100% { transform: translate3d(0,0,0); opacity: 0.3; }
          50% { transform: translate3d(10px,-24px,0); opacity: 0.8; }
        }
        @keyframes csDash {
          to { stroke-dashoffset: -32; }
        }
        @keyframes csPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes csFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes csDashLine {
          0% { transform: translateX(-50px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(50px); opacity: 0; }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 py-24 lg:px-8">
        <div className="max-w-3xl">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-200 backdrop-blur-sm sm:text-sm"
            style={anim(0)}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Custom Software Solutions</span>
          </div>

          <h1
            className="mb-6 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            style={anim(120)}
          >
            Software That Fits
            <br />
            <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              the Way You Work.
            </span>
          </h1>

          <p
            className="mb-10 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl"
            style={anim(240)}
          >
            Connect your existing platforms, integrate third-party services,
            customize your workflows, and build software around the way your
            business actually works.
          </p>

          <div
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
            style={anim(360)}
          >
            <button className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/40 sm:px-8 sm:py-4 sm:text-base">
              <span className="relative z-10">Start Your Project</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>

            <button className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 sm:px-8 sm:py-4 sm:text-base">
              <Play className="h-4 w-4 fill-white" />
              Explore Our Approach
            </button>
          </div>

          <div
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-slate-400 sm:text-sm"
            style={anim(480)}
          >
            {[
              { color: 'bg-emerald-400', label: 'Enterprise-grade' },
              { color: 'bg-blue-400', label: 'API-first' },
              { color: 'bg-indigo-400', label: 'Fully customizable' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${item.color}`} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 sm:block">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   2. PROBLEM SECTION
   ============================================================ */

interface SystemNode {
  id: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const problemSystems: SystemNode[] = [
  { id: 'crm', label: 'CRM', Icon: Users },
  { id: 'website', label: 'Website', Icon: Globe },
  { id: 'payment', label: 'Payment', Icon: CreditCard },
  { id: 'email', label: 'Email', Icon: Mail },
  { id: 'database', label: 'Database', Icon: Database },
  { id: 'analytics', label: 'Analytics', Icon: BarChart3 },
];

const problemList = [
  'Manually move data between systems',
  'Switch between multiple platforms',
  'Duplicate information across tools',
  'Repeat the same tasks daily',
  'Work around software limitations',
];

const ProblemSection: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section ref={ref} className="relative bg-[#0a0f1c] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div
          className="mx-auto max-w-3xl text-center transition-all duration-1000"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-200 sm:text-sm">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>The Problem</span>
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Your Software Should Work Together.
          </h2>
          <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
            Businesses often use multiple platforms for CRM, websites, payments,
            communication, databases, analytics, and internal operations. When
            these systems don't communicate properly, teams have to manually
            move information between them.
          </p>
        </div>

        {/* Disconnected -> Connected visual */}
        <div className="relative mt-16">
          {/* SVG Connection lines (behind cards, desktop only) */}
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="brokenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#ef4444" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            {[8.33, 25, 41.67, 58.33, 75, 91.67].map((x, i) => (
              <line
                key={i}
                x1={x}
                y1="35"
                x2={50}
                y2="50"
                stroke="url(#brokenGradient)"
                strokeWidth="0.3"
                strokeDasharray="1.5 2"
                style={{
                  opacity: inView ? 1 : 0,
                  transition: `opacity 800ms ease ${600 + i * 100}ms`,
                }}
              />
            ))}
          </svg>

          {/* Cards row — fixed height, never stretched */}
          <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
            {problemSystems.map((sys, idx) => {
              const { Icon } = sys;
              return (
                <div
                  key={sys.id}
                  className="group flex h-32 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-all duration-700 ease-out hover:border-red-400/30 hover:bg-red-500/[0.03] sm:h-36"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView
                      ? 'translateY(0) scale(1)'
                      : 'translateY(40px) scale(0.9)',
                    transitionDelay: `${idx * 100}ms`,
                  }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blue-300 transition-all duration-300 group-hover:border-red-400/30 group-hover:text-red-300 sm:h-14 sm:w-14">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <span className="text-xs font-medium text-slate-300 sm:text-sm">
                    {sys.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center "CUSTOM SOFTWARE" badge — below the cards */}
          <div className="mt-8 flex justify-center lg:mt-10">
            <div
              className="relative inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-[#0a0f1c] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-blue-200 shadow-lg shadow-blue-500/10 backdrop-blur-md sm:text-sm"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView
                  ? 'translateY(0) scale(1)'
                  : 'translateY(20px) scale(0.9)',
                transition: 'all 900ms cubic-bezier(0.2,0.9,0.3,1) 700ms',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
              </span>
              Custom Software
            </div>
          </div>
        </div>

        {/* Problem list */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {problemList.map((problem, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-500 hover:border-red-400/30 hover:bg-red-500/[0.04]"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${800 + idx * 80}ms`,
              }}
            >
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-[10px] text-red-300">
                ✕
              </div>
              <span className="text-sm leading-relaxed text-slate-300">
                {problem}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   3. API INTEGRATION SECTION
   ============================================================ */

interface IntegrationNode {
  id: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  angle: number;
}

const integrationNodes: IntegrationNode[] = [
  { id: 'crm', label: 'CRM', Icon: Users, angle: 0 },
  { id: 'website', label: 'Website', Icon: Globe, angle: 45 },
  { id: 'payment', label: 'Payment', Icon: CreditCard, angle: 90 },
  { id: 'email', label: 'Email', Icon: Mail, angle: 135 },
  { id: 'sms', label: 'SMS', Icon: MessageSquare, angle: 180 },
  { id: 'database', label: 'Database', Icon: Database, angle: 225 },
  { id: 'analytics', label: 'Analytics', Icon: BarChart3, angle: 270 },
  { id: 'auth', label: 'Auth', Icon: Lock, angle: 315 },
];

const ApiIntegrationSection: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-[#0a0f1c] via-[#0d1528] to-[#0a0f1c] py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mx-auto max-w-3xl text-center transition-all duration-1000"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-200 sm:text-sm">
            <Cpu className="h-3.5 w-3.5" />
            <span>API Integration</span>
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Connect the Software
            <br />
            <span className="bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">
              You Already Use.
            </span>
          </h2>
          <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
            We bridge the gap between your existing platforms through robust API
            integrations and custom middleware.
          </p>
        </div>

        {/* Integration diagram */}
        <div className="relative mx-auto mt-16 h-[420px] w-full max-w-3xl sm:h-[520px] lg:h-[600px]">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="activeLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            {integrationNodes.map((node) => {
              const rad = (node.angle * Math.PI) / 180;
              const r = 32;
              const x = 50 + r * Math.cos(rad);
              const y = 50 + r * Math.sin(rad);
              const isActive = hovered === node.id;
              return (
                <line
                  key={node.id}
                  x1="50"
                  y1="50"
                  x2={x}
                  y2={y}
                  stroke={isActive ? 'url(#activeLine)' : '#475569'}
                  strokeWidth={isActive ? 0.6 : 0.25}
                  strokeOpacity={isActive ? 1 : 0.35}
                  strokeDasharray="1.5 1.5"
                  style={{
                    animation: 'csDash 2s linear infinite',
                    transition: 'stroke-width 300ms, stroke-opacity 300ms',
                  }}
                />
              );
            })}
          </svg>

          {/* Center node */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className="flex flex-col items-center gap-2 rounded-2xl border border-blue-400/40 bg-[#0d1528]/90 px-5 py-4 text-center shadow-2xl shadow-blue-500/20 backdrop-blur-md transition-all duration-500"
              style={{
                transform: inView ? 'scale(1)' : 'scale(0.85)',
                opacity: inView ? 1 : 0,
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/40">
                <Cpu className="h-5 w-5 text-white" />
              </div>
              <div className="text-xs font-semibold tracking-wide text-white sm:text-sm">
                Custom
                <br />
                Software
              </div>
            </div>
          </div>

          {/* Orbit nodes */}
          {integrationNodes.map((node, idx) => {
            const rad = (node.angle * Math.PI) / 180;
            const r = 32;
            const xPct = 50 + r * Math.cos(rad);
            const yPct = 50 + r * Math.sin(rad);
            const { Icon } = node;
            const isActive = hovered === node.id;
            return (
              <div
                key={node.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${xPct}%`,
                  top: `${yPct}%`,
                  opacity: inView ? 1 : 0,
                  transition: `opacity 700ms ease ${idx * 80}ms, transform 400ms ease`,
                  transform: `translate(-50%, -50%) scale(${isActive ? 1.08 : 1})`,
                }}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className={`group relative flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border px-2.5 py-2 backdrop-blur-sm transition-all duration-300 sm:gap-2 sm:px-3 sm:py-2.5 ${
                    isActive
                      ? 'border-blue-400/60 bg-blue-500/15 shadow-lg shadow-blue-500/30'
                      : 'border-white/10 bg-white/[0.04] hover:border-blue-400/40 hover:bg-blue-500/10'
                  }`}
                >
                  <div
                    className="flex h-7 w-7 items-center justify-center text-blue-300 transition-transform duration-300 sm:h-8 sm:w-8"
                    style={{ transform: isActive ? 'scale(1.2)' : 'scale(1)' }}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className="text-[9px] font-medium text-slate-200 sm:text-[10px]">
                    {node.label}
                  </span>

                  <div
                    className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-blue-400/30 bg-[#0d1528]/95 px-2.5 py-1 text-[9px] font-medium text-blue-200 shadow-lg backdrop-blur-sm transition-all duration-300 sm:text-[10px]"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: `translate(-50%, ${isActive ? '0' : '-4px'})`,
                    }}
                  >
                    Connected through API
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   4. CUSTOM CRM SHOWCASE
   ============================================================ */

type CrmTab = 'Leads' | 'Customers' | 'Workflow' | 'Automation' | 'Reports' | 'Integrations';

const crmTabs: CrmTab[] = [
  'Leads',
  'Customers',
  'Workflow',
  'Automation',
  'Reports',
  'Integrations',
];

const CrmShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CrmTab>('Leads');
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <section ref={ref} className="relative bg-[#0a0f1c] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mx-auto max-w-3xl text-center transition-all duration-1000"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-200 sm:text-sm">
            <Layout className="h-3.5 w-3.5" />
            <span>Custom CRM Experience</span>
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Build Around Your Workflow.
          </h2>
          <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
            A CRM shaped by your processes — not the other way around. Explore
            how your business data, tasks, and automation come together.
          </p>
        </div>

        <div
          className="mx-auto mt-14 max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#0d1528] to-[#0a0f1c] shadow-2xl shadow-black/50 transition-all duration-1000"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/60" />
              <span className="h-3 w-3 rounded-full bg-amber-500/60" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/60" />
            </div>
            <div className="ml-3 flex-1 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] text-slate-400 sm:text-xs">
              app.yourcustomsoftware.com / dashboard
            </div>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-white/10 bg-white/[0.02] no-scrollbar">
            {crmTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative shrink-0 px-4 py-3 text-xs font-medium transition-colors sm:px-6 sm:text-sm ${
                  activeTab === tab
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-blue-400 to-cyan-400" />
                )}
              </button>
            ))}
          </div>

          {/* Content area */}
          <div className="relative min-h-[420px] p-4 sm:p-6 lg:p-8">
            <CrmTabContent tab={activeTab} />
          </div>
        </div>
      </div>
    </section>
  );
};

const CrmTabContent: React.FC<{ tab: CrmTab }> = ({ tab }) => {
  return (
    <div style={{ animation: 'csFadeIn 400ms ease' }}>
      {tab === 'Leads' && <CrmLeads />}
      {tab === 'Customers' && <CrmCustomers />}
      {tab === 'Workflow' && <CrmWorkflow />}
      {tab === 'Automation' && <CrmAutomation />}
      {tab === 'Reports' && <CrmReports />}
      {tab === 'Integrations' && <CrmIntegrations />}
    </div>
  );
};

const CrmLeads: React.FC = () => {
  const leads = [
    { name: 'Northwind Group', status: 'Qualified', owner: 'Alex R.', follow: 'Today' },
    { name: 'Vertex Labs', status: 'Contacted', owner: 'Priya S.', follow: 'Tomorrow' },
    { name: 'Aster Holdings', status: 'New', owner: 'Maya K.', follow: 'Thu' },
    { name: 'Brightline Co.', status: 'Proposal', owner: 'Tom H.', follow: 'Fri' },
  ];
  const statusColor: Record<string, string> = {
    Qualified: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
    Contacted: 'bg-blue-500/15 text-blue-300 border-blue-400/30',
    New: 'bg-slate-500/15 text-slate-300 border-slate-400/30',
    Proposal: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
  };
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white sm:text-base">Leads Pipeline</h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300 hover:bg-white/[0.06]">
            <Filter className="h-3 w-3" /> Filter
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-blue-500/90 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-500">
            <Plus className="h-3 w-3" /> New Lead
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[520px] text-left text-xs sm:text-sm">
          <thead className="bg-white/[0.03] text-slate-400">
            <tr>
              <th className="px-4 py-3 font-medium">Lead</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Owner</th>
              <th className="px-4 py-3 font-medium">Follow-up</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, i) => (
              <tr
                key={i}
                className="border-t border-white/5 transition-colors hover:bg-white/[0.02]"
              >
                <td className="px-4 py-3 font-medium text-white">{lead.name}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${statusColor[lead.status]}`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-300">{lead.owner}</td>
                <td className="px-4 py-3 text-slate-400">{lead.follow}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { label: 'Active Leads', value: '128', trend: '+12%' },
          { label: 'Conversion', value: '34%', trend: '+4.2%' },
          { label: 'Avg. Cycle', value: '6.4 days', trend: '-1.1' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="text-[10px] uppercase tracking-wide text-slate-400 sm:text-xs">
              {stat.label}
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-lg font-semibold text-white sm:text-xl">
                {stat.value}
              </span>
              <span className="text-[10px] text-emerald-400">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CrmCustomers: React.FC = () => {
  const customers = [
    { name: 'Northwind Group', since: '2022', value: '$48K', health: 'Excellent' },
    { name: 'Vertex Labs', since: '2023', value: '$22K', health: 'Good' },
    { name: 'Aster Holdings', since: '2024', value: '$9K', health: 'New' },
    { name: 'Brightline Co.', since: '2021', value: '$84K', health: 'Excellent' },
  ];
  const healthColor: Record<string, string> = {
    Excellent: 'text-emerald-300',
    Good: 'text-blue-300',
    New: 'text-slate-300',
  };
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white sm:text-base">Customer Accounts</h3>
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5">
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <input
            placeholder="Search customers..."
            className="w-32 bg-transparent text-xs text-slate-200 outline-none placeholder:text-slate-500 sm:w-44"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {customers.map((c) => (
          <div
            key={c.name}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-blue-400/30 hover:bg-blue-500/[0.04]"
          >
            <div>
              <div className="text-sm font-semibold text-white">{c.name}</div>
              <div className="mt-0.5 text-[10px] text-slate-400 sm:text-xs">
                Customer since {c.since}
              </div>
              <div className={`mt-1 text-[10px] font-medium sm:text-xs ${healthColor[c.health]}`}>
                ● {c.health}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-white sm:text-base">{c.value}</div>
              <div className="text-[10px] text-slate-400 sm:text-xs">Lifetime value</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CrmWorkflow: React.FC = () => {
  const steps = [
    { label: 'New Lead', Icon: Users, color: 'from-blue-500 to-blue-400' },
    { label: 'Qualify', Icon: CheckCircle2, color: 'from-indigo-500 to-indigo-400' },
    { label: 'Proposal', Icon: FileText, color: 'from-violet-500 to-violet-400' },
    { label: 'Negotiation', Icon: TrendingUp, color: 'from-fuchsia-500 to-fuchsia-400' },
    { label: 'Won', Icon: Zap, color: 'from-emerald-500 to-emerald-400' },
  ];
  return (
    <div>
      <h3 className="mb-5 text-sm font-semibold text-white sm:text-base">
        Custom Sales Workflow
      </h3>
      <div className="relative">
        <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-emerald-500/40 sm:block" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5 sm:gap-3">
          {steps.map((s, i) => {
            const { Icon } = s;
            return (
              <div key={s.label} className="relative flex items-center gap-3 sm:flex-col sm:gap-3">
                <div
                  className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} shadow-lg`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="sm:text-center">
                  <div className="text-xs font-semibold text-white sm:text-sm">
                    {s.label}
                  </div>
                  <div className="text-[10px] text-slate-400 sm:text-xs">
                    Step {i + 1}
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight className="ml-auto h-4 w-4 text-slate-500 sm:hidden" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { label: 'Active Deals', value: '46' },
          { label: 'Pipeline Value', value: '$284K' },
          { label: 'Win Rate', value: '62%' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="text-[10px] uppercase tracking-wide text-slate-400 sm:text-xs">
              {s.label}
            </div>
            <div className="mt-1 text-lg font-semibold text-white sm:text-xl">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CrmAutomation: React.FC = () => {
  const flow = [
    { label: 'Trigger', desc: 'New lead created', Icon: Zap },
    { label: 'Business Rule', desc: 'Score > 80', Icon: GitBranch },
    { label: 'Action', desc: 'Assign to senior rep', Icon: Settings },
    { label: 'Notification', desc: 'Send Slack + Email', Icon: Bell },
  ];
  return (
    <div>
      <h3 className="mb-5 text-sm font-semibold text-white sm:text-base">
        Automation Builder
      </h3>
      <div className="space-y-3">
        {flow.map((step, i) => {
          const { Icon } = step;
          return (
            <React.Fragment key={step.label}>
              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-blue-400/30 hover:bg-blue-500/[0.04]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/30 to-cyan-500/30 text-blue-200">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white sm:text-sm">
                    {step.label}
                  </div>
                  <div className="truncate text-[11px] text-slate-400 sm:text-xs">
                    {step.desc}
                  </div>
                </div>
                <div className="ml-auto text-[10px] text-slate-500 sm:text-xs">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
              {i < flow.length - 1 && (
                <div className="flex justify-center">
                  <div className="h-4 w-px bg-gradient-to-b from-blue-400/60 to-cyan-400/60" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const CrmReports: React.FC = () => {
  const bars = [42, 65, 38, 78, 55, 90, 62, 84, 47, 71, 58, 88];
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white sm:text-base">
          Performance Reports
        </h3>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300">
            This Year
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300">
            <Upload className="h-3 w-3" /> Export
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Revenue', value: '$1.28M', change: '+18%' },
          { label: 'New Customers', value: '342', change: '+24%' },
          { label: 'Avg. Deal Size', value: '$4.2K', change: '+6%' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="text-[10px] uppercase tracking-wide text-slate-400 sm:text-xs">
              {s.label}
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-lg font-semibold text-white sm:text-xl">{s.value}</span>
              <span className="text-[10px] text-emerald-400 sm:text-xs">{s.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-xs font-semibold text-white sm:text-sm">
            Monthly Performance
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 sm:text-xs">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-blue-400" /> 2024
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-slate-600" /> 2023
            </span>
          </div>
        </div>
        <div className="flex h-32 items-end gap-1.5 sm:gap-2">
          {bars.map((h, i) => (
            <div key={i} className="flex-1">
              <div
                className="w-full rounded-t bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-700"
                style={{ height: `${h}%` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[9px] text-slate-500 sm:text-[10px]">
          {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((m, i) => (
            <span key={i} className="flex-1 text-center">
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const CrmIntegrations: React.FC = () => {
  const chain = [
    { label: 'CRM', Icon: Users },
    { label: 'API', Icon: Network },
    { label: 'External Platform', Icon: Server },
    { label: 'Data Sync', Icon: RefreshCw },
  ];
  const partners = [
    { label: 'Payment Gateway', Icon: CreditCard },
    { label: 'Email Service', Icon: Mail },
    { label: 'SMS Provider', Icon: MessageSquare },
    { label: 'Analytics', Icon: BarChart3 },
    { label: 'Database', Icon: Database },
    { label: 'Auth Provider', Icon: Lock },
  ];
  return (
    <div>
      <h3 className="mb-5 text-sm font-semibold text-white sm:text-base">
        Integration Pipeline
      </h3>

      <div className="mb-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        {chain.map((step, i) => {
          const { Icon } = step;
          return (
            <React.Fragment key={step.label}>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 sm:flex-col sm:gap-2 sm:px-4 sm:py-3 sm:text-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-200">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium text-white sm:text-xs">
                  {step.label}
                </span>
              </div>
              {i < chain.length - 1 && (
                <>
                  <ChevronRight className="mx-auto h-4 w-4 text-slate-500 sm:hidden" />
                  <ArrowRight className="hidden h-4 w-4 shrink-0 text-slate-500 sm:block" />
                </>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {partners.map((p) => {
          const { Icon } = p;
          return (
            <div
              key={p.label}
              className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] p-3 transition-all hover:border-blue-400/30 hover:bg-blue-500/[0.04]"
            >
              <Icon className="h-4 w-4 shrink-0 text-blue-300" />
              <span className="truncate text-[11px] text-slate-200 sm:text-xs">
                {p.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ============================================================
   5. WORKFLOW SECTION
   ============================================================ */

interface WorkflowStep {
  id: string;
  label: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 'requirements',
    label: 'Requirements',
    description:
      'We start by understanding your business, existing tools, and the gaps that slow your teams down.',
    Icon: ClipboardList,
  },
  {
    id: 'workflow',
    label: 'Workflow',
    description:
      'Define exactly how information moves through your organization — from first touch to final delivery.',
    Icon: Workflow,
  },
  {
    id: 'design',
    label: 'Design',
    description:
      'Create interfaces based on how your team actually works, not on rigid templates.',
    Icon: Palette,
  },
  {
    id: 'integration',
    label: 'Integration',
    description:
      'Connect your existing platforms through APIs and synchronized data flows.',
    Icon: Network,
  },
  {
    id: 'automation',
    label: 'Automation',
    description:
      'Turn repetitive processes into automated workflows that run reliably in the background.',
    Icon: Zap,
  },
  {
    id: 'software',
    label: 'Software',
    description:
      'Everything comes together into one connected experience — built, tested, and deployed.',
    Icon: Rocket,
  },
];

const WorkflowSection: React.FC = () => {
  const [active, setActive] = useState(workflowSteps[0].id);
  const { ref, inView } = useInView({ threshold: 0.15 });
  const current = workflowSteps.find((s) => s.id === active) ?? workflowSteps[0];

  return (
    <section ref={ref} className="relative bg-[#0a0f1c] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mx-auto max-w-3xl text-center transition-all duration-1000"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-200 sm:text-sm">
            <Workflow className="h-3.5 w-3.5" />
            <span>Custom Workflow</span>
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Your Workflow. Your Rules.
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Your Software.
            </span>
          </h2>
          <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
            Click through each stage to see how we shape software around your
            organization.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
          {/* Steps list */}
          <div className="space-y-2">
            {workflowSteps.map((step, idx) => {
              const isActive = step.id === active;
              const { Icon } = step;
              return (
                <button
                  key={step.id}
                  onClick={() => setActive(step.id)}
                  className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                    isActive
                      ? 'border-cyan-400/40 bg-cyan-500/[0.08] shadow-lg shadow-cyan-500/10'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                    transitionDelay: `${idx * 60}ms`,
                  }}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all ${
                      isActive
                        ? 'border-cyan-400/40 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 text-cyan-100'
                        : 'border-white/10 bg-white/[0.04] text-slate-300 group-hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500 sm:text-xs">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`text-sm font-semibold sm:text-base ${
                          isActive ? 'text-white' : 'text-slate-200'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    <div className="mt-0.5 truncate text-[11px] text-slate-400 sm:text-xs">
                      {step.description}
                    </div>
                  </div>
                  <ChevronRight
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isActive ? 'translate-x-0 text-cyan-300' : '-translate-x-1 text-slate-500'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d1528] to-[#0a0f1c] p-6 transition-all duration-1000 sm:p-8"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '200ms',
            }}
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]" />

            <div className="relative">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 text-cyan-100">
                  <current.Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 sm:text-xs">
                    Step
                  </div>
                  <h3 className="text-lg font-semibold text-white sm:text-xl">
                    {current.label}
                  </h3>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                {current.description}
              </p>

              <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-3">
                  {workflowSteps.map((s, i) => {
                    const isActive = s.id === active;
                    return (
                      <React.Fragment key={s.id}>
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all ${
                            isActive
                              ? 'border-cyan-400/50 bg-cyan-500/20 text-cyan-200'
                              : 'border-white/10 bg-white/[0.03] text-slate-400'
                          }`}
                        >
                          <s.Icon className="h-4 w-4" />
                        </div>
                        {i < workflowSteps.length - 1 && (
                          <div
                            className={`h-px flex-1 transition-colors ${
                              workflowSteps.findIndex((x) => x.id === active) > i
                                ? 'bg-gradient-to-r from-cyan-400/60 to-blue-400/60'
                                : 'bg-white/10'
                            }`}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {['Industry-neutral', 'API-first', 'Modular', 'Scalable'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] text-slate-300 sm:text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   6. INTEGRATE / CUSTOMIZE / BUILD
   ============================================================ */

interface IcbCard {
  id: string;
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: string;
  items: string[];
}

const icbCards: IcbCard[] = [
  {
    id: 'integrate',
    title: 'Integrate',
    description: 'Connect the tools you already use.',
    Icon: Network,
    accent: 'from-blue-500 to-cyan-500',
    items: ['CRM & ERP systems', 'Payment providers', 'Email & SMS', 'Databases & APIs'],
  },
  {
    id: 'customize',
    title: 'Customize',
    description: 'Adapt software around your workflow.',
    Icon: Settings,
    accent: 'from-indigo-500 to-violet-500',
    items: ['Custom fields & views', 'Roles & permissions', 'Business rules', 'Branded interfaces'],
  },
  {
    id: 'build',
    title: 'Build',
    description: "Create new software where existing solutions aren't enough.",
    Icon: Code2,
    accent: 'from-fuchsia-500 to-pink-500',
    items: ['Custom apps', 'Internal portals', 'Automation engines', 'Reporting tools'],
  },
];

const IcbSection: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section ref={ref} className="relative bg-[#0a0f1c] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mx-auto max-w-3xl text-center transition-all duration-1000"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-200 sm:text-sm">
            <Puzzle className="h-3.5 w-3.5" />
            <span>Flexible Approach</span>
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            You Don't Have to Start From Scratch.
          </h2>
          <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
            If your existing software already works for part of your business,
            keep it. We can connect it, customize it, and extend it.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {icbCards.map((card, idx) => {
            const isHover = hovered === card.id;
            const { Icon } = card;
            return (
              <div
                key={card.id}
                onMouseEnter={() => setHovered(card.id)}
                onMouseLeave={() => setHovered(null)}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] sm:p-7"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${idx * 120}ms`,
                }}
              >
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${card.accent} opacity-0 blur-[80px] transition-opacity duration-500 ${
                    isHover ? 'opacity-30' : 'opacity-0'
                  }`}
                />

                <div className="relative">
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} shadow-lg transition-transform duration-500`}
                    style={{ transform: isHover ? 'scale(1.1) rotate(-3deg)' : 'scale(1)' }}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="mb-2 text-xl font-semibold text-white sm:text-2xl">
                    {card.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-slate-300 sm:text-base">
                    {card.description}
                  </p>

                  <ul className="space-y-2">
                    {card.items.map((item) => (
                      <li
                        key={item}
                        className={`flex items-center gap-2 text-xs transition-all duration-500 sm:text-sm ${
                          isHover ? 'text-slate-200' : 'text-slate-400'
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center gap-2 text-xs font-medium text-blue-300 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <span>Learn more</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   7. BEFORE / AFTER SECTION
   ============================================================ */

const beforeItems = [
  { label: 'CRM', Icon: Users },
  { label: 'Website', Icon: Globe },
  { label: 'Email', Icon: Mail },
  { label: 'Payment', Icon: CreditCard },
  { label: 'Database', Icon: Database },
  { label: 'Manual Reports', Icon: FileText },
];

const afterNodes = [
  { label: 'CRM', Icon: Users, sub: 'Automation', subIcon: Zap },
  { label: 'APIs', Icon: Network, sub: 'Sync', subIcon: RefreshCw },
  { label: 'Database', Icon: Database, sub: 'Reporting', subIcon: LineChart },
];

const BeforeAfterSection: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-[#0a0f1c] via-[#0d1528] to-[#0a0f1c] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mx-auto max-w-3xl text-center transition-all duration-1000"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-200 sm:text-sm">
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Transformation</span>
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            From Disconnected Tools
            <br />
            <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              to One Connected Workflow.
            </span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8">
          {/* BEFORE */}
          <div
            className="rounded-2xl border border-red-400/20 bg-red-500/[0.03] p-6 transition-all duration-1000"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            <div className="mb-5 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-red-300 sm:text-sm">
                Before
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {beforeItems.map((item, idx) => {
                const { Icon } = item;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5"
                    style={{
                      transform: inView
                        ? 'translateY(0) rotate(0)'
                        : `translateY(${20 + idx * 5}px) rotate(${idx % 2 ? 3 : -3}deg)`,
                      opacity: inView ? 0.85 : 0,
                      transition: `all 900ms cubic-bezier(0.2,0.9,0.3,1) ${idx * 80}ms`,
                    }}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-slate-400" />
                    <span className="truncate text-[11px] text-slate-300 sm:text-xs">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-lg border border-dashed border-red-400/30 bg-red-500/[0.04] p-3 text-center">
              <span className="text-[10px] font-medium uppercase tracking-wider text-red-300 sm:text-xs">
                Disconnected systems
              </span>
            </div>
          </div>

          {/* Arrow */}
          <div
            className="flex items-center justify-center transition-all duration-1000 delay-500"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'scale(1)' : 'scale(0.6)',
            }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-emerald-200 shadow-lg shadow-emerald-500/20">
              <ArrowRight className="h-6 w-6" />
            </div>
          </div>

          {/* AFTER */}
          <div
            className="rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.03] p-6 transition-all duration-1000 delay-300"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            <div className="mb-5 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300 sm:text-sm">
                After
              </span>
            </div>

            <div className="mb-4 flex justify-center">
              <div className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-200 sm:text-xs">
                Custom Platform
              </div>
            </div>

            <div className="mb-4 flex justify-center">
              <div className="h-4 w-px bg-gradient-to-b from-emerald-400/60 to-cyan-400/40" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {afterNodes.map((node, idx) => {
                const { Icon, subIcon: SubIcon } = node;
                return (
                  <div
                    key={node.label}
                    className="flex flex-col items-center gap-2"
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 800ms cubic-bezier(0.2,0.9,0.3,1) ${
                        700 + idx * 120
                      }ms`,
                    }}
                  >
                    <div className="flex w-full flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
                      <Icon className="h-4 w-4 text-emerald-200" />
                      <span className="text-[10px] font-medium text-slate-200 sm:text-xs">
                        {node.label}
                      </span>
                    </div>
                    <div className="h-3 w-px bg-gradient-to-b from-emerald-400/50 to-transparent" />
                    <div className="flex w-full items-center justify-center gap-1 rounded-lg border border-emerald-400/20 bg-emerald-500/[0.06] px-2 py-1.5">
                      <SubIcon className="h-3 w-3 text-emerald-300" />
                      <span className="truncate text-[9px] text-emerald-200 sm:text-[10px]">
                        {node.sub}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex justify-center">
              <div className="h-4 w-px bg-gradient-to-b from-cyan-400/40 to-emerald-400/60" />
            </div>
            <div className="mt-2 flex justify-center">
              <div className="rounded-full border border-emerald-400/40 bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-100 sm:text-xs">
                One Workflow
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   8. CAPABILITIES
   ============================================================ */

interface Capability {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const capabilities: Capability[] = [
  { title: 'Custom Applications', description: 'Purpose-built software tailored to your exact operations.', Icon: Code2 },
  { title: 'CRM Development', description: 'CRMs shaped around your sales and support processes.', Icon: Users },
  { title: 'API Integration', description: 'Robust APIs connecting your existing platforms.', Icon: Network },
  { title: 'Third-Party Integration', description: 'Plug into the external services you already rely on.', Icon: Puzzle },
  { title: 'Workflow Automation', description: 'Turn repetitive processes into reliable automation.', Icon: Workflow },
  { title: 'Database Integration', description: 'Unify data across multiple sources into one source of truth.', Icon: Database },
  { title: 'Business Portals', description: 'Secure portals for customers, partners, and staff.', Icon: Building2 },
  { title: 'Custom Reporting', description: 'Live dashboards and reports that reflect your KPIs.', Icon: BarChart3 },
  { title: 'Data Synchronization', description: 'Keep records in sync across every connected system.', Icon: RefreshCw },
  { title: 'Process Automation', description: 'Automated rules that eliminate manual busywork.', Icon: Zap },
  { title: 'Authentication', description: 'Secure SSO, roles, and permissions for your teams.', Icon: Shield },
  { title: 'Enterprise Software', description: 'Scalable systems built for mission-critical operations.', Icon: Server },
];

const CapabilitiesSection: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="relative bg-[#0a0f1c] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mx-auto max-w-3xl text-center transition-all duration-1000"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-200 sm:text-sm">
            <Boxes className="h-3.5 w-3.5" />
            <span>Capabilities</span>
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            What We Can Build
          </h2>
          <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
            From integrations to full custom applications — here's what our
            software engineering team delivers.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {capabilities.map((cap, idx) => {
            const { Icon } = cap;
            return (
              <div
                key={cap.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-blue-500/[0.05] hover:shadow-lg hover:shadow-blue-500/10"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(24px)',
                  transitionDelay: `${idx * 50}ms`,
                }}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-blue-300 transition-all duration-500 group-hover:scale-110 group-hover:border-blue-400/40 group-hover:bg-blue-500/15 group-hover:text-blue-200">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-white sm:text-base">
                  {cap.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-400 transition-colors duration-500 group-hover:text-slate-300 sm:text-sm">
                  {cap.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   9. INTERACTIVE REQUIREMENT SELECTOR
   ============================================================ */

interface BuildOption {
  id: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  description: string;
  steps: { label: string; Icon: React.ComponentType<{ className?: string }> }[];
  cta: string;
}

const buildOptions: BuildOption[] = [
  {
    id: 'crm',
    label: 'Custom CRM',
    Icon: Users,
    description: 'A CRM that reflects your sales process, not the other way around.',
    steps: [
      { label: 'Contacts', Icon: Users },
      { label: 'Pipeline', Icon: TrendingUp },
      { label: 'Automation', Icon: Zap },
      { label: 'Reporting', Icon: BarChart3 },
    ],
    cta: 'Build Your CRM',
  },
  {
    id: 'app',
    label: 'Business Application',
    Icon: Layout,
    description: 'A tailored application that matches how your team actually operates.',
    steps: [
      { label: 'Requirements', Icon: ClipboardList },
      { label: 'Design', Icon: Palette },
      { label: 'Build', Icon: Code2 },
      { label: 'Deploy', Icon: Rocket },
    ],
    cta: 'Discuss Your Application',
  },
  {
    id: 'api',
    label: 'API Integration',
    Icon: Network,
    description: 'Connect your existing platforms with reliable, secure APIs.',
    steps: [
      { label: 'Existing Platform', Icon: Server },
      { label: 'API', Icon: Network },
      { label: 'Custom Software', Icon: Cpu },
      { label: 'CRM / Database', Icon: Database },
    ],
    cta: 'Discuss Your Integration',
  },
  {
    id: 'automation',
    label: 'Automation',
    Icon: Zap,
    description: 'Eliminate repetitive tasks with automation across your tools.',
    steps: [
      { label: 'Trigger', Icon: Zap },
      { label: 'Rule', Icon: GitBranch },
      { label: 'Action', Icon: Settings },
      { label: 'Notify', Icon: Bell },
    ],
    cta: 'Automate My Workflow',
  },
  {
    id: 'portal',
    label: 'Customer Portal',
    Icon: Building2,
    description: 'Secure self-service portals for customers, partners, and staff.',
    steps: [
      { label: 'Login', Icon: Lock },
      { label: 'Dashboard', Icon: Layout },
      { label: 'Data', Icon: Database },
      { label: 'Support', Icon: MessageSquare },
    ],
    cta: 'Build a Portal',
  },
  {
    id: 'internal',
    label: 'Internal Software',
    Icon: Server,
    description: 'Internal tools that streamline your operations end to end.',
    steps: [
      { label: 'Teams', Icon: Users },
      { label: 'Processes', Icon: Workflow },
      { label: 'Data', Icon: Database },
      { label: 'Reporting', Icon: LineChart },
    ],
    cta: 'Discuss Internal Tools',
  },
];

const RequirementSelector: React.FC = () => {
  const [selected, setSelected] = useState<string>('crm');
  const { ref, inView } = useInView({ threshold: 0.15 });
  const current = buildOptions.find((o) => o.id === selected) ?? buildOptions[0];

  return (
    <section ref={ref} className="relative bg-[#0a0f1c] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mx-auto max-w-3xl text-center transition-all duration-1000"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-medium text-fuchsia-200 sm:text-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Get Started</span>
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            What Are You Trying to Build?
          </h2>
          <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
            Pick a direction and we'll show you how we'd approach it.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {buildOptions.map((opt, idx) => {
            const isActive = opt.id === selected;
            const { Icon } = opt;
            return (
              <button
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className={`group flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all duration-300 ${
                  isActive
                    ? 'border-fuchsia-400/50 bg-fuchsia-500/[0.08] shadow-lg shadow-fuchsia-500/10'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                }`}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${idx * 60}ms`,
                }}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-br from-fuchsia-500/30 to-violet-500/30 text-fuchsia-100'
                      : 'border border-white/10 bg-white/[0.04] text-slate-300 group-hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={`text-[11px] font-medium leading-tight sm:text-xs ${
                    isActive ? 'text-white' : 'text-slate-300'
                  }`}
                >
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>

        <div
          className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d1528] to-[#0a0f1c] p-6 transition-all duration-1000 sm:p-8 lg:p-10"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '300ms',
          }}
        >
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500/30 to-violet-500/30 text-fuchsia-100">
                  <current.Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-fuchsia-300 sm:text-xs">
                    Selected
                  </div>
                  <h3 className="text-lg font-semibold text-white sm:text-xl">
                    {current.label}
                  </h3>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                {current.description}
              </p>

              <button className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-fuchsia-500/40">
                {current.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <div className="mb-4 text-[10px] font-mono uppercase tracking-widest text-slate-400 sm:text-xs">
                Suggested Workflow
              </div>
              <div className="space-y-2">
                {current.steps.map((step, idx) => {
                  const { Icon } = step;
                  return (
                    <React.Fragment key={step.label}>
                      <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-500/15 text-blue-200">
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-xs font-medium text-slate-200 sm:text-sm">
                          {step.label}
                        </span>
                        <span className="ml-auto text-[10px] font-mono text-slate-500">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                      {idx < current.steps.length - 1 && (
                        <div className="flex justify-center">
                          <div className="h-3 w-px bg-gradient-to-b from-blue-400/60 to-transparent" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   10. DEVELOPMENT PROCESS
   ============================================================ */

interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const processSteps: ProcessStep[] = [
  { id: 'discover', number: '01', title: 'Discover', description: 'We dive into your business, tools, and pain points to understand the full picture.', Icon: Search },
  { id: 'plan', number: '02', title: 'Plan', description: 'We map out architecture, integrations, milestones, and delivery timeline.', Icon: ClipboardList },
  { id: 'design', number: '03', title: 'Design', description: 'We craft interfaces that reflect how your teams actually work.', Icon: Palette },
  { id: 'develop', number: '04', title: 'Develop', description: 'We build the software using modern, maintainable tech stacks.', Icon: Code2 },
  { id: 'integrate', number: '05', title: 'Integrate', description: 'We connect your existing platforms through reliable APIs.', Icon: Network },
  { id: 'test', number: '06', title: 'Test', description: 'We validate functionality, performance, and security before launch.', Icon: TestTube },
  { id: 'launch', number: '07', title: 'Launch', description: 'We deploy, monitor, and support your software as it goes live.', Icon: Rocket },
];

const DevelopmentProcess: React.FC = () => {
  const [active, setActive] = useState(processSteps[0].id);
  const { ref, inView } = useInView({ threshold: 0.15 });
  const current = processSteps.find((s) => s.id === active) ?? processSteps[0];

  return (
    <section ref={ref} className="relative bg-[#0a0f1c] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mx-auto max-w-3xl text-center transition-all duration-1000"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-200 sm:text-sm">
            <GitBranch className="h-3.5 w-3.5" />
            <span>Our Process</span>
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            From Idea to Working Software.
          </h2>
          <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
            A clear, proven process that keeps you informed from kickoff to launch.
          </p>
        </div>

        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-[26px] hidden h-0.5 bg-white/10 lg:block" />
          <div
            className="absolute left-0 top-[26px] hidden h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-1000 lg:block"
            style={{
              width: inView
                ? `${((processSteps.findIndex((s) => s.id === active) + 1) / processSteps.length) * 100}%`
                : '0%',
            }}
          />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7 lg:gap-2">
            {processSteps.map((step, idx) => {
              const isActive = step.id === active;
              const isPast = processSteps.findIndex((s) => s.id === active) >= idx;
              const { Icon } = step;
              return (
                <button
                  key={step.id}
                  onClick={() => setActive(step.id)}
                  className="group flex flex-col items-center gap-3 text-center"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${idx * 70}ms`,
                  }}
                >
                  <div
                    className={`relative z-10 flex items-center justify-center rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? 'border-blue-400/60 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 text-blue-100 shadow-lg shadow-blue-500/30'
                        : isPast
                        ? 'border-blue-400/30 bg-blue-500/10 text-blue-200'
                        : 'border-white/10 bg-white/[0.03] text-slate-400 group-hover:text-slate-200'
                    }`}
                    style={{ height: '52px', width: '52px' }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 sm:text-xs">
                      {step.number}
                    </div>
                    <div
                      className={`text-xs font-semibold sm:text-sm ${
                        isActive ? 'text-white' : 'text-slate-300'
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d1528] to-[#0a0f1c] p-6 transition-all duration-700 sm:p-8"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '500ms',
          }}
        >
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 text-blue-100">
              <current.Icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="font-mono text-xs text-blue-300">
                  {current.number}
                </span>
                <h3 className="text-lg font-semibold text-white sm:text-xl">
                  {current.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                {current.description}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {processSteps.map((s) => (
                <div
                  key={s.id}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    s.id === active
                      ? 'w-6 bg-gradient-to-r from-blue-400 to-cyan-400'
                      : 'w-1.5 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   11. FINAL CTA
   ============================================================ */

const FinalCTA: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-[#0a0f1c] via-[#0d1528] to-[#0a0f1c] py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-[130px]" />
        <div className="absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-[100px]" />
      </div>

      {!prefersReduced && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px w-24 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
              style={{
                top: `${15 + i * 10}%`,
                left: `${(i * 17) % 80}%`,
                animation: `csDashLine ${5 + (i % 4)}s linear ${i * 0.4}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <div
          className="transition-all duration-1000"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-200 backdrop-blur-sm sm:text-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Let's Build Together</span>
          </div>

          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Have a Software Challenge?
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Tell us what you're currently using, what isn't working, and what you
            want to achieve. We'll help turn it into a connected software
            solution.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/40 sm:w-auto sm:text-base">
              <span className="relative z-10">Start Your Project</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>

            <button className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 sm:w-auto sm:text-base">
              <MessageSquare className="h-4 w-4" />
              Talk to Our Team
            </button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-400 sm:text-sm">
            {['Industry-neutral', 'API-first', 'Enterprise-ready'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   MAIN PAGE
   ============================================================ */

const CustomSoftware: React.FC = () => {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#0a0f1c] text-white antialiased">
      <HeroSection />
      <ProblemSection />
      <ApiIntegrationSection />
      <CrmShowcase />
      <WorkflowSection />
      <IcbSection />
      <BeforeAfterSection />
      <CapabilitiesSection />
      <RequirementSelector />
      <DevelopmentProcess />
      <FinalCTA />

      <footer className="border-t border-white/10 bg-[#0a0f1c] py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs text-slate-500 sm:flex-row lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-cyan-500">
              <Cpu className="h-3 w-3 text-white" />
            </div>
            <span>Custom Software Solutions</span>
          </div>
          <div>© {new Date().getFullYear()} — All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
};

export default CustomSoftware;