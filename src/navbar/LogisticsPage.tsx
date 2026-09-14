import React, { useState, useEffect, useRef } from 'react';
import {
  Truck,
  Route,
  Warehouse,
  MapPin,
  PackageCheck,
  BarChart3,
  ArrowRight,
  ChevronDown,
  Ship,
  Store,
  Thermometer,
  Building2,
  Layers,
  Globe,
  Activity,
  CheckCircle2,
  TrendingUp,
  Clock,
  Play,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface SolutionCard {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface WorkflowStep {
  number: string;
  title: string;
  description: string;
}

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface Stat {
  value: number;
  suffix: string;
  label: string;
  isSpecial?: boolean;
}

interface Industry {
  icon: React.ElementType;
  label: string;
}

interface DashboardMetric {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
}

interface ShipmentRow {
  id: string;
  origin: string;
  destination: string;
  status: 'In Transit' | 'Delivered' | 'Pending' | 'Delayed';
  eta: string;
  vehicle: string;
}

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function useCountUp(target: number, duration = 1800, start = false): number {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, start]);

  return count;
}

// ─── Reveal Wrapper ──────────────────────────────────────────────────────────

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'scale';
  className?: string;
}

const Reveal: React.FC<RevealProps> = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [ref, inView] = useInView(0.1);
  const base = 'transition-all duration-700 ease-out will-change-transform';
  const hidden: Record<string, string> = {
    up: 'opacity-0 translate-y-10',
    left: 'opacity-0 -translate-x-10',
    right: 'opacity-0 translate-x-10',
    scale: 'opacity-0 scale-95',
  };
  const visible = 'opacity-100 translate-x-0 translate-y-0 scale-100';

  return (
    <div
      ref={ref}
      className={`${base} ${inView ? visible : hidden[direction]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ─── Data ────────────────────────────────────────────────────────────────────

const solutions: SolutionCard[] = [
  { icon: Truck, title: 'Fleet Management', description: 'Manage vehicles, drivers, maintenance, fuel, and trips from one intelligent platform.' },
  { icon: Route, title: 'Transportation Management', description: 'Plan shipments, optimize routes, manage carriers, and reduce transportation costs.' },
  { icon: Warehouse, title: 'Warehouse Management', description: 'Control inventory, receiving, picking, packing, transfers, and warehouse operations.' },
  { icon: MapPin, title: 'Shipment Tracking', description: 'Track shipments in real time and provide complete delivery visibility.' },
  { icon: PackageCheck, title: 'Last-Mile Delivery', description: 'Optimize delivery assignments, driver operations, proof of delivery, and customer experience.' },
  { icon: BarChart3, title: 'Supply Chain Analytics', description: 'Turn logistics data into actionable insights with real-time operational analytics.' },
];

const workflowSteps: WorkflowStep[] = [
  { number: '01', title: 'Plan', description: 'Shipment and route planning' },
  { number: '02', title: 'Manage', description: 'Fleet and warehouse operations' },
  { number: '03', title: 'Track', description: 'Real-time shipment visibility' },
  { number: '04', title: 'Deliver', description: 'Efficient last-mile delivery' },
  { number: '05', title: 'Analyze', description: 'Performance and cost analytics' },
];

const benefits: Benefit[] = [
  { icon: Activity, title: 'Real-Time Visibility', description: 'Track operations across your logistics network with live dashboards and alerts.' },
  { icon: TrendingUp, title: 'Operational Efficiency', description: 'Automate repetitive logistics workflows and eliminate manual bottlenecks.' },
  { icon: Route, title: 'Lower Transportation Costs', description: 'Optimize routes, fleet usage, and resources to cut fuel and labor spend.' },
  { icon: CheckCircle2, title: 'Better Customer Experience', description: 'Provide accurate shipment and delivery visibility your customers can trust.' },
];

const stats: Stat[] = [
  { value: 98, suffix: '%', label: 'On-Time Delivery' },
  { value: 35, suffix: '%', label: 'Faster Operations' },
  { value: 30, suffix: '%', label: 'Lower Logistics Costs' },
  { value: 24, suffix: '/7', label: 'Operational Visibility', isSpecial: true },
];

const industries: Industry[] = [
  { icon: Truck, label: 'Freight & Transportation' },
  { icon: Warehouse, label: 'Warehousing' },
  { icon: PackageCheck, label: 'Courier & Parcel' },
  { icon: Store, label: 'E-commerce Logistics' },
  { icon: Ship, label: 'Fleet Operations' },
  { icon: Layers, label: 'Supply Chain' },
  { icon: Thermometer, label: 'Cold Chain' },
  { icon: Building2, label: '3PL & 4PL' },
];

const dashboardMetrics: DashboardMetric[] = [
  { label: 'Total Deliveries', value: '12,847', change: '+12.5%', positive: true, icon: PackageCheck },
  { label: 'Active Vehicles', value: '342', change: '+8.1%', positive: true, icon: Truck },
  { label: 'Shipments in Transit', value: '1,263', change: '-3.2%', positive: false, icon: MapPin },
  { label: 'On-Time Delivery', value: '98.2%', change: '+2.4%', positive: true, icon: Clock },
];

const recentShipments: ShipmentRow[] = [
  { id: 'SHP-4821', origin: 'Chicago, IL', destination: 'Detroit, MI', status: 'In Transit', eta: '2h 15m', vehicle: 'TRK-208' },
  { id: 'SHP-4822', origin: 'Dallas, TX', destination: 'Austin, TX', status: 'Delivered', eta: '—', vehicle: 'TRK-115' },
  { id: 'SHP-4823', origin: 'Atlanta, GA', destination: 'Miami, FL', status: 'Pending', eta: '6h 40m', vehicle: 'TRK-309' },
  { id: 'SHP-4824', origin: 'Seattle, WA', destination: 'Portland, OR', status: 'In Transit', eta: '1h 05m', vehicle: 'TRK-077' },
  { id: 'SHP-4825', origin: 'Denver, CO', destination: 'Salt Lake City, UT', status: 'Delayed', eta: '4h 30m', vehicle: 'TRK-201' },
];

const statusColors: Record<string, string> = {
  'In Transit': 'bg-blue-100 text-blue-700',
  Delivered: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Delayed: 'bg-red-100 text-red-700',
};

// ─── Sub-Components ──────────────────────────────────────────────────────────

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 mb-3">
    {children}
  </span>
);

const AnimatedCounter: React.FC<{ stat: Stat; start: boolean }> = ({ stat, start }) => {
  const count = useCountUp(stat.value, 2000, start);
  return (
    <span className="text-5xl md:text-6xl font-bold text-white tabular-nums">
      {`${count}${stat.suffix}`}
    </span>
  );
};

// ─── Hero Section ────────────────────────────────────────────────────────────

const HeroSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Ensure video plays on mount (some browsers need this)
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay was prevented; silently ignore
      });
    }
  }, []);

  const anim = (delay: number) => ({ transitionDelay: `${delay}ms` });
  const base = 'transition-all duration-1000 ease-out';
  const hidden = 'opacity-0 translate-y-8';
  const shown = 'opacity-100 translate-y-0';

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80"
        aria-hidden="true"
      >
        <source
          src="/Create_a_premium_cinematic_tec.mp4"
          type="video/mp4"
        />
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>

      {/* Video Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/40" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <span
          className={`${base} ${mounted ? shown : hidden} inline-block text-xs font-semibold tracking-[0.3em] uppercase text-blue-400 mb-6 px-4 py-2 rounded-full border border-blue-400/30 bg-blue-400/5 backdrop-blur-sm`}
          style={anim(200)}
        >
          Logistics & Supply Chain
        </span>

        <h1
          className={`${base} ${mounted ? shown : hidden} text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6`}
          style={anim(400)}
        >
          Connected Logistics.
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Smarter Operations.
          </span>
        </h1>

        <p
          className={`${base} ${mounted ? shown : hidden} text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10`}
          style={anim(600)}
        >
          Transform transportation, warehouse, fleet, and delivery operations with intelligent digital solutions built for modern logistics.
        </p>

        <div
          className={`${base} ${mounted ? shown : hidden} flex flex-col sm:flex-row items-center justify-center gap-4`}
          style={anim(800)}
        >
          <a
            href="#solutions"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Explore Solutions
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#workflow"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:border-white/40 text-white font-semibold text-sm backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <Play className="w-4 h-4" />
            See How It Works
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`${base} ${mounted ? 'opacity-100' : 'opacity-0'} absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2`}
        style={anim(1200)}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">Scroll</span>
        <ChevronDown className="w-5 h-5 text-slate-400 animate-bounce" />
      </div>
    </section>
  );
};

// ─── Industry Intro ──────────────────────────────────────────────────────────

const SupplyChainVisual: React.FC = () => {
  const stages = [
    { label: 'Warehouse', icon: Warehouse },
    { label: 'Distribution', icon: Building2 },
    { label: 'Fleet', icon: Truck },
    { label: 'Customer', icon: PackageCheck },
  ];

  return (
    <div className="relative rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-blue-50/40 p-8 md:p-10 shadow-xl shadow-slate-200/50 overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-cyan-100/40 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-slate-400">Supply Chain Flow</span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>

        <div className="flex flex-col gap-0">
          {stages.map((stage, i) => (
            <React.Fragment key={stage.label}>
              <Reveal delay={i * 150} direction="left">
                <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/60 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
                    <stage.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 text-sm">{stage.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {i === 0 && 'Inventory & storage'}
                      {i === 1 && 'Cross-docking & sorting'}
                      {i === 2 && 'Transport & routing'}
                      {i === 3 && 'Final delivery'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(3)].map((_, j) => (
                      <span
                        key={j}
                        className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse"
                        style={{ animationDelay: `${j * 200}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
              {i < stages.length - 1 && (
                <div className="flex justify-center py-0.5">
                  <div className="flex flex-col items-center gap-0.5">
                    {[...Array(3)].map((_, j) => (
                      <span
                        key={j}
                        className="w-0.5 h-2 rounded-full bg-blue-200 animate-pulse"
                        style={{ animationDelay: `${j * 150}ms` }}
                      />
                    ))}
                    <ChevronDown className="w-3.5 h-3.5 text-blue-300 -mt-0.5" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/60 grid grid-cols-3 gap-4">
          {[
            { label: 'Active Hubs', value: '24' },
            { label: 'Routes', value: '1.2K' },
            { label: 'Fleet', value: '342' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-lg font-bold text-slate-800">{s.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const IndustryIntro: React.FC = () => (
  <section className="relative py-24 md:py-32 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <Reveal direction="left">
          <SectionLabel>Why It Matters</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
            Technology That Keeps Your Supply Chain Moving
          </h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-6">
            Digital technology transforms logistics from a cost center into a competitive advantage. With real-time visibility into every vehicle, warehouse, and shipment, your teams make faster decisions, reduce delays, and deliver a consistently better customer experience.
          </p>
          <p className="text-slate-500 text-base leading-relaxed mb-8">
            Our platform connects your entire operation — from inbound receiving to last-mile delivery — giving you the operational control needed to scale efficiently and profitably.
          </p>
          <div className="flex flex-wrap gap-3">
            {['Real-time tracking', 'Route optimization', 'Warehouse automation', 'Delivery analytics'].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal direction="right" delay={200}>
          <SupplyChainVisual />
        </Reveal>
      </div>
    </div>
  </section>
);

// ─── Solutions Section ───────────────────────────────────────────────────────

const SolutionCardItem: React.FC<{ solution: SolutionCard; index: number }> = ({ solution, index }) => {
  const Icon = solution.icon;

  return (
    <Reveal delay={index * 80} direction="up">
      <article
        className="group relative h-full p-7 rounded-2xl bg-white border border-slate-200/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-100/60 hover:border-blue-200/80 cursor-default overflow-hidden focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2"
        tabIndex={0}
        aria-label={solution.title}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-cyan-50/0 group-hover:from-blue-50/60 group-hover:to-cyan-50/40 transition-all duration-500 pointer-events-none" />

        <div className="relative z-10">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200/60 flex items-center justify-center mb-5 group-hover:from-blue-500 group-hover:to-blue-600 group-hover:border-blue-400 group-hover:shadow-lg group-hover:shadow-blue-200/50 group-hover:scale-110 transition-all duration-500">
            <Icon className="w-7 h-7 text-slate-600 group-hover:text-white transition-colors duration-500" />
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
            {solution.title}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-5">
            {solution.description}
          </p>

          <div className="flex items-center gap-1.5 text-blue-600 text-sm font-semibold">
            <span className="opacity-70 group-hover:opacity-100 transition-opacity">Learn more</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
          </div>
        </div>
      </article>
    </Reveal>
  );
};

const SolutionsSection: React.FC = () => (
  <section id="solutions" className="relative py-24 md:py-32 bg-slate-50/80 overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    <div className="max-w-7xl mx-auto px-6">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Solutions</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-5">
            Solutions Built for Every Stage of Logistics
          </h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed">
            From fleet management to last-mile delivery, our modular platform adapts to the way your logistics operation works.
          </p>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {solutions.map((s, i) => (
          <SolutionCardItem key={s.title} solution={s} index={i} />
        ))}
      </div>
    </div>
  </section>
);

// ─── Workflow Section ────────────────────────────────────────────────────────

const WorkflowSection: React.FC = () => {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="workflow" className="relative py-24 md:py-32 bg-slate-950 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 mb-3">
              Workflow
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
              How It Works
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              A connected workflow that takes you from planning to performance — all on one platform.
            </p>
          </div>
        </Reveal>

        {/* Desktop horizontal */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute top-[52px] left-[10%] right-[10%] h-0.5 bg-slate-800">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 transition-all duration-[2000ms] ease-out"
                style={{ width: inView ? '100%' : '0%' }}
              />
            </div>

            <div className="grid grid-cols-5 gap-4">
              {workflowSteps.map((step, i) => (
                <Reveal key={step.number} delay={i * 150} direction="up">
                  <div className="group flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="w-[104px] h-[104px] rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-slate-800/80 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-500/10">
                        <span className="text-2xl font-bold text-blue-400">{step.number}</span>
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-blue-400 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-[140px]">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden">
          <div className="relative pl-8">
            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-800">
              <div
                className="w-full bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-500 transition-all duration-[2000ms] ease-out"
                style={{ height: inView ? '100%' : '0%' }}
              />
            </div>

            <div className="space-y-8">
              {workflowSteps.map((step, i) => (
                <Reveal key={step.number} delay={i * 120} direction="left">
                  <div className="relative flex items-start gap-5">
                    <div className="absolute -left-8 top-0 w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center z-10">
                      <span className="text-xs font-bold text-blue-400">{step.number}</span>
                    </div>
                    <div className="pl-4">
                      <h3 className="text-base font-bold text-white mb-1">{step.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Dashboard Showcase ──────────────────────────────────────────────────────

const FleetChart: React.FC = () => {
  const bars = [65, 78, 82, 70, 88, 92, 85, 76, 90, 95, 88, 72];
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/80">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h4 className="text-sm font-bold text-slate-800">Fleet Utilization</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">Average across 342 vehicles</p>
        </div>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
          +8.2%
        </span>
      </div>
      <div className="flex items-end gap-1.5 h-28">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-blue-500 to-cyan-400 transition-all duration-700 hover:from-blue-600 hover:to-cyan-300"
              style={{ height: `${h}%` }}
            />
            <span className="text-[9px] text-slate-400 font-medium">{months[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ShipmentStatusChart: React.FC = () => {
  const data = [
    { label: 'Delivered', value: 62, color: '#10b981' },
    { label: 'In Transit', value: 24, color: '#3b82f6' },
    { label: 'Pending', value: 9, color: '#f59e0b' },
    { label: 'Delayed', value: 5, color: '#ef4444' },
  ];

  let offset = 25;

  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/80">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h4 className="text-sm font-bold text-slate-800">Shipment Status</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">Current distribution</p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative w-24 h-24 shrink-0">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            {data.map((d) => {
              const dashArray = `${d.value} ${100 - d.value}`;
              const dashOffset = offset;
              offset -= d.value;
              return (
                <circle
                  key={d.label}
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke={d.color}
                  strokeWidth="4"
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-slate-800">1,263</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-wider">Total</span>
          </div>
        </div>

        <div className="space-y-2.5 flex-1">
          {data.map((d) => (
            <div key={d.label} className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="text-xs text-slate-600 flex-1">{d.label}</span>
              <span className="text-xs font-semibold text-slate-800">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LiveVehicleMap: React.FC = () => (
  <div className="p-5 rounded-2xl bg-white border border-slate-200/80">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h4 className="text-sm font-bold text-slate-800">Live Vehicle Map</h4>
        <p className="text-[11px] text-slate-400 mt-0.5">342 vehicles active</p>
      </div>
      <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Live
      </span>
    </div>

    <div className="relative h-48 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-100 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200">
        {[...Array(7)].map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 33} x2="300" y2={i * 33} stroke="#e2e8f0" strokeWidth="0.5" />
        ))}
        {[...Array(10)].map((_, i) => (
          <line key={`v${i}`} x1={i * 33} y1="0" x2={i * 33} y2="200" stroke="#e2e8f0" strokeWidth="0.5" />
        ))}

        <path d="M40,150 Q90,80 140,120 T250,60" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
        <path d="M60,40 Q120,100 180,70 T270,140" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.4" />

        {[
          { x: 40, y: 150 }, { x: 90, y: 100 }, { x: 140, y: 120 },
          { x: 200, y: 80 }, { x: 250, y: 60 }, { x: 60, y: 40 },
          { x: 120, y: 70 }, { x: 180, y: 100 }, { x: 230, y: 130 },
        ].map((dot, i) => (
          <g key={i}>
            <circle cx={dot.x} cy={dot.y} r="6" fill="#3b82f6" opacity="0.15">
              <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
            </circle>
            <circle cx={dot.x} cy={dot.y} r="3" fill="#3b82f6" />
          </g>
        ))}
      </svg>

      <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-[10px] text-slate-400">
        <MapPin className="w-3 h-3" />
        <span>Real-time GPS tracking</span>
      </div>
    </div>
  </div>
);

const RecentDeliveriesTable: React.FC = () => (
  <div className="p-5 rounded-2xl bg-white border border-slate-200/80">
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-sm font-bold text-slate-800">Recent Deliveries</h4>
      <span className="text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline">View all</span>
    </div>

    <div className="overflow-x-auto -mx-5 px-5">
      <table className="w-full min-w-[500px]">
        <thead>
          <tr className="border-b border-slate-100">
            {['Shipment', 'Route', 'Status', 'ETA', 'Vehicle'].map((h) => (
              <th key={h} className="text-left text-[10px] uppercase tracking-wider text-slate-400 font-semibold pb-2.5 pr-4">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {recentShipments.map((s) => (
            <tr key={s.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
              <td className="py-2.5 pr-4">
                <span className="text-xs font-semibold text-slate-700">{s.id}</span>
              </td>
              <td className="py-2.5 pr-4">
                <span className="text-[11px] text-slate-500">
                  {s.origin} → {s.destination}
                </span>
              </td>
              <td className="py-2.5 pr-4">
                <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[s.status]}`}>
                  {s.status}
                </span>
              </td>
              <td className="py-2.5 pr-4">
                <span className="text-[11px] text-slate-500 font-medium">{s.eta}</span>
              </td>
              <td className="py-2.5">
                <span className="text-[11px] text-slate-500">{s.vehicle}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const DashboardShowcase: React.FC = () => (
  <section className="relative py-24 md:py-32 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Platform Preview</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-5">
            Your Entire Logistics Operation, One Dashboard
          </h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed">
            Monitor deliveries, vehicles, shipments, and performance in real time — from a single command center.
          </p>
        </div>
      </Reveal>

      <Reveal direction="scale" delay={100}>
        <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-b from-slate-50 to-white p-4 md:p-6 shadow-2xl shadow-slate-200/60">
          <div className="flex items-center gap-2 mb-4 md:mb-5 px-1">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <div className="flex-1 ml-3">
              <div className="max-w-md mx-auto bg-white rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] text-slate-400 flex items-center gap-2">
                <Globe className="w-3 h-3" />
                app.logicore.io/dashboard
              </div>
            </div>
          </div>

          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <div className="min-w-[900px] md:min-w-0 space-y-4">
              <div className="flex items-center justify-between px-1 mb-1">
                <div>
                  <h3 className="text-base font-bold text-slate-800">Logistics Overview</h3>
                  <p className="text-[11px] text-slate-400">Monday, March 18, 2025</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    System Operational
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {dashboardMetrics.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label} className="p-4 rounded-xl bg-white border border-slate-200/80 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${m.positive ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
                          {m.change}
                        </span>
                      </div>
                      <p className="text-xl font-bold text-slate-800 mb-0.5">{m.value}</p>
                      <p className="text-[11px] text-slate-400">{m.label}</p>
                    </div>
                  );
                })}
              </div>

              <div className="grid lg:grid-cols-3 gap-3 md:gap-4">
                <div className="lg:col-span-2">
                  <FleetChart />
                </div>
                <ShipmentStatusChart />
              </div>

              <div className="grid lg:grid-cols-2 gap-3 md:gap-4">
                <LiveVehicleMap />
                <RecentDeliveriesTable />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

// ─── Benefits Section ────────────────────────────────────────────────────────

const BenefitsSection: React.FC = () => (
  <section className="relative py-24 md:py-32 bg-slate-50/80 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Benefits</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-5">
            Why Leading Logistics Teams Choose Us
          </h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed">
            Measurable improvements across every dimension of your logistics operation.
          </p>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((b, i) => {
          const Icon = b.icon;
          return (
            <Reveal key={b.title} delay={i * 100} direction="up">
              <div className="group relative h-full p-7 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-200/80 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-blue-50/0 group-hover:bg-blue-50/60 blur-2xl transition-all duration-500 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-5 shadow-md shadow-blue-200 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{b.description}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

// ─── Statistics Section ──────────────────────────────────────────────────────

const StatisticsSection: React.FC = () => {
  const [ref, inView] = useInView(0.2);

  return (
    <section ref={ref} className="relative py-24 md:py-28 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 mb-3">
              Results
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              Numbers That Speak for Themselves
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 150} direction="up">
              <div className="text-center">
                <AnimatedCounter stat={stat} start={inView} />
                <p className="text-sm text-slate-400 mt-3 font-medium">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Industries Section ──────────────────────────────────────────────────────

const IndustriesSection: React.FC = () => (
  <section className="relative py-24 md:py-32 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Coverage</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-5">
            Industries Within Logistics
          </h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed">
            Purpose-built capabilities for every segment of the logistics ecosystem.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {industries.map((ind, i) => {
          const Icon = ind.icon;
          return (
            <Reveal key={ind.label} delay={i * 60} direction="scale">
              <div className="group flex items-center gap-3.5 p-5 rounded-xl bg-slate-50/80 border border-slate-200/60 hover:bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/40 hover:-translate-y-1 transition-all duration-300 cursor-default">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:shadow-md group-hover:shadow-blue-200 transition-all duration-300 shrink-0">
                  <Icon className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                  {ind.label}
                </span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

// ─── Final CTA ───────────────────────────────────────────────────────────────

const FinalCTA: React.FC = () => (
  <section className="relative py-24 md:py-32 bg-slate-50/80 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <Reveal direction="scale">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-10 md:p-20 overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
              Build a Smarter Logistics Operation
            </h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-10">
              Connect your people, vehicles, warehouses, shipments, and customers through one intelligent digital ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Talk to Our Team
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#solutions"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:border-white/40 text-white font-semibold text-sm backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Explore Our Products
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

// ─── App ─────────────────────────────────────────────────────────────────────

const LogisticsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white antialiased">
      <main>
        <HeroSection />
        <IndustryIntro />
        <SolutionsSection />
        <WorkflowSection />
        <div id="platform">
          <DashboardShowcase />
        </div>
        <BenefitsSection />
        <StatisticsSection />
        <div id="industries">
          <IndustriesSection />
        </div>
        <FinalCTA />
      </main>
    </div>
  );
};

export default LogisticsPage;