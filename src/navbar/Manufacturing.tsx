// ManufacturingManagement.tsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Factory,
  Boxes,
  BadgeCheck,
  Wrench,
  Truck,
  Layers,
  ArrowRight,
  Activity,
  Clock,
  TrendingUp,
  Package,
  FileText,
  ShieldCheck,
  Lock,
  Key,
  Eye,
  Database,
  Server,
  LayoutDashboard,
  UserCog,
  ClipboardList,
  Gauge,
  Receipt,
  PieChart,
  LineChart,
  Cog,
  PackageCheck,
  BarChart3,
  Users,
  Warehouse,
  ClipboardCheck,
  Drill,
  AlertTriangle,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ManufacturingModule {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface UserRole {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface Benefit {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface SecurityFeature {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface WorkflowStep {
  label: string;
  icon: React.ElementType;
}

interface TabItem {
  label: string;
  icon: React.ElementType;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const modules: ManufacturingModule[] = [
  {
    title: "Production Management",
    description:
      "Plan, schedule, and execute production orders with real-time tracking of work centers, shifts, and output.",
    icon: Factory,
  },
  {
    title: "Inventory & Materials",
    description:
      "Track raw materials, WIP, and finished goods with lot tracing, reorder points, and multi-warehouse support.",
    icon: Boxes,
  },
  {
    title: "Bill of Materials",
    description:
      "Define multi-level BOMs, manage revisions, and calculate material requirements accurately for every product.",
    icon: Layers,
  },
  {
    title: "Quality Control",
    description:
      "Manage inspections, defect tracking, compliance checks, and CAPA workflows across every production batch.",
    icon: BadgeCheck,
  },
  {
    title: "Maintenance Management",
    description:
      "Schedule preventive maintenance, track equipment health, and minimize unplanned downtime across the plant.",
    icon: Wrench,
  },
  {
    title: "Procurement & Suppliers",
    description:
      "Manage purchase orders, supplier performance, lead times, and incoming material quality in one place.",
    icon: Package,
  },
  {
    title: "Warehouse & Logistics",
    description:
      "Optimize storage, picking, packing, and dispatch operations with barcode-driven warehouse workflows.",
    icon: Warehouse,
  },
  {
    title: "Reports & Analytics",
    description:
      "Monitor OEE, throughput, downtime, yield, and cost metrics with rich operational dashboards.",
    icon: BarChart3,
  },
];

const userRoles: UserRole[] = [
  {
    title: "Plant Manager",
    description:
      "Oversee plant-wide operations, production targets, resource allocation, and overall performance.",
    icon: UserCog,
  },
  {
    title: "Production Supervisor",
    description:
      "Manage work orders, shop-floor scheduling, operator assignments, and daily output targets.",
    icon: Factory,
  },
  {
    title: "Quality Inspector",
    description:
      "Perform inspections, log defects, manage non-conformance reports, and enforce quality standards.",
    icon: ClipboardCheck,
  },
  {
    title: "Maintenance Engineer",
    description:
      "Handle preventive maintenance schedules, breakdowns, spare parts, and equipment history.",
    icon: Drill,
  },
  {
    title: "Inventory Controller",
    description:
      "Track stock levels, manage material movements, reconcile inventory, and handle warehouse operations.",
    icon: Boxes,
  },
  {
    title: "Procurement Officer",
    description:
      "Create purchase orders, track supplier deliveries, and manage vendor performance and pricing.",
    icon: Receipt,
  },
];

const benefits: Benefit[] = [
  {
    title: "Unified Manufacturing Operations",
    description:
      "Bring production, materials, quality, and maintenance into one connected operational platform.",
    icon: LayoutDashboard,
  },
  {
    title: "Higher Production Efficiency",
    description:
      "Reduce idle time, optimize scheduling, and improve throughput across every production line.",
    icon: Activity,
  },
  {
    title: "Real-Time Shop-Floor Visibility",
    description:
      "Monitor live machine status, operator activity, and work order progress from any device.",
    icon: Eye,
  },
  {
    title: "Reduced Downtime",
    description:
      "Prevent equipment failures with proactive maintenance and real-time health monitoring.",
    icon: Clock,
  },
  {
    title: "Better Quality & Compliance",
    description:
      "Enforce quality standards, track defects, and maintain audit-ready compliance documentation.",
    icon: BadgeCheck,
  },
  {
    title: "Data-Driven Decisions",
    description:
      "Use OEE, yield, and cost analytics to continuously improve manufacturing performance.",
    icon: TrendingUp,
  },
];

const securityFeatures: SecurityFeature[] = [
  {
    title: "Role-Based Access",
    description:
      "Control access to production, quality, and financial data with granular permissions.",
    icon: ShieldCheck,
  },
  {
    title: "Secure Authentication",
    description:
      "Protect plant systems with strong authentication and session management controls.",
    icon: Lock,
  },
  {
    title: "Permission Management",
    description:
      "Define access rights at module, machine, shift, and warehouse levels.",
    icon: Key,
  },
  {
    title: "Audit Logs",
    description:
      "Track every production change with complete audit trails for compliance.",
    icon: FileText,
  },
  {
    title: "Data Protection",
    description:
      "Keep production data, recipes, and BOMs encrypted and protected at all times.",
    icon: Database,
  },
  {
    title: "Secure Plant Workflows",
    description:
      "Ensure every shop-floor and administrative workflow follows secure practices.",
    icon: Server,
  },
];

const workflowSteps: WorkflowStep[] = [
  { label: "Raw Material", icon: Package },
  { label: "Production", icon: Factory },
  { label: "Quality", icon: BadgeCheck },
  { label: "Finished Goods", icon: PackageCheck },
  { label: "Delivery", icon: Truck },
];

const productTabs: TabItem[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Production", icon: Factory },
  { label: "Materials", icon: Layers },
  { label: "Inventory", icon: Boxes },
  { label: "Quality", icon: BadgeCheck },
  { label: "Maintenance", icon: Wrench },
  { label: "Procurement", icon: Package },
  { label: "Reports", icon: BarChart3 },
];

// ---------------------------------------------------------------------------
// Reduced Motion Hook
// ---------------------------------------------------------------------------

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}

// ---------------------------------------------------------------------------
// Scroll Reveal Hook
// ---------------------------------------------------------------------------

function useScrollReveal<T extends HTMLElement>(
  options: {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
  } = {}
): { ref: React.RefObject<T>; isVisible: boolean } {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -60px 0px",
    triggerOnce = true,
  } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggeredRef = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (prefersReducedMotion) {
      setIsVisible(true);
      hasTriggeredRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasTriggeredRef.current || !triggerOnce) {
            setIsVisible(true);
            hasTriggeredRef.current = true;
          }
        } else {
          if (!triggerOnce) {
            setIsVisible(false);
            hasTriggeredRef.current = false;
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, prefersReducedMotion]);

  return { ref: ref as React.RefObject<T>, isVisible };
}

// ---------------------------------------------------------------------------
// Reveal Component
// ---------------------------------------------------------------------------

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  scale?: boolean;
  as?: React.ElementType;
  threshold?: number;
  triggerOnce?: boolean;
}

const Reveal: React.FC<RevealProps> = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  scale = false,
  as: Component = "div",
  threshold = 0.15,
  triggerOnce = true,
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
    threshold,
    triggerOnce,
  });
  const prefersReducedMotion = usePrefersReducedMotion();

  const baseClasses =
    "transition-all duration-700 ease-out will-change-[transform,opacity]";

  let hiddenClasses = "opacity-0";
  if (!prefersReducedMotion) {
    if (direction === "up") hiddenClasses += " translate-y-[30px]";
    else if (direction === "down") hiddenClasses += " -translate-y-[30px]";
    else if (direction === "left") hiddenClasses += " translate-x-[30px]";
    else if (direction === "right") hiddenClasses += " -translate-x-[30px]";
    if (scale) hiddenClasses += " scale-[0.97]";
  }

  const visibleClasses = prefersReducedMotion
    ? "opacity-100"
    : "opacity-100 translate-y-0 translate-x-0 scale-100";

  return (
    <Component
      ref={ref}
      className={`${baseClasses} ${
        isVisible ? visibleClasses : hiddenClasses
      } ${className}`}
      style={{ transitionDelay: prefersReducedMotion ? "0ms" : `${delay}ms` }}
    >
      {children}
    </Component>
  );
};

// ---------------------------------------------------------------------------
// Animated Counter Hook
// ---------------------------------------------------------------------------

function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          if (prefersReducedMotion) {
            setCount(end);
            return;
          }

          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated, prefersReducedMotion]);

  return { count, ref };
}

// ---------------------------------------------------------------------------
// Chart Bar Component
// ---------------------------------------------------------------------------

interface ChartBarProps {
  height: number;
  label: string;
  colorClass: string;
  delay?: number;
  isVisible: boolean;
}

const ChartBar: React.FC<ChartBarProps> = ({
  height,
  label,
  colorClass,
  delay = 0,
  isVisible,
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="flex-1 flex flex-col items-center gap-1">
      <div
        className={`w-full rounded-t-md ${colorClass}`}
        style={{
          height: isVisible || prefersReducedMotion ? `${height}%` : "0%",
          transition: prefersReducedMotion
            ? "none"
            : `height 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        }}
      />
      <span className="text-[8px] text-slate-400">{label}</span>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Progress Bar Component
// ---------------------------------------------------------------------------

interface ProgressBarProps {
  value: number;
  colorClass: string;
  isVisible: boolean;
  delay?: number;
  heightClass?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  colorClass,
  isVisible,
  delay = 0,
  heightClass = "h-1.5",
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className={`w-full rounded-full bg-slate-100 ${heightClass}`}>
      <div
        className={`${heightClass} rounded-full ${colorClass}`}
        style={{
          width: isVisible || prefersReducedMotion ? `${value}%` : "0%",
          transition: prefersReducedMotion
            ? "none"
            : `width 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        }}
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Dashboard Mockup Component
// ---------------------------------------------------------------------------

function DashboardMockup() {
  const productionCounter = useCounter(1842);
  const ordersCounter = useCounter(247);
  const machinesCounter = useCounter(64);
  const oeeCounter = useCounter(87);

  const productionChart = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const oeeChart = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const inventory = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const quality = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const workOrders = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 overflow-hidden">
      {/* Dashboard header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <Factory className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-slate-800">
            ForgeOps Dashboard
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-slate-500">Live</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Reveal delay={0} className="h-full">
            <div
              ref={productionCounter.ref}
              className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-blue-100"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Factory className="h-3.5 w-3.5 text-blue-500" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  Units Produced
                </span>
              </div>
              <p className="text-lg font-bold text-slate-800">
                {productionCounter.count.toLocaleString()}
              </p>
              <p className="text-[10px] text-emerald-600 font-medium mt-0.5">
                ↑ 14% this week
              </p>
            </div>
          </Reveal>

          <Reveal delay={80} className="h-full">
            <div
              ref={ordersCounter.ref}
              className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-cyan-100"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <ClipboardList className="h-3.5 w-3.5 text-cyan-500" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  Active Work Orders
                </span>
              </div>
              <p className="text-lg font-bold text-slate-800">
                {ordersCounter.count}
              </p>
              <p className="text-[10px] text-emerald-600 font-medium mt-0.5">
                ↑ 6% vs last week
              </p>
            </div>
          </Reveal>

          <Reveal delay={160} className="h-full">
            <div
              ref={machinesCounter.ref}
              className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-indigo-100"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Cog className="h-3.5 w-3.5 text-indigo-500" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  Machines Online
                </span>
              </div>
              <p className="text-lg font-bold text-slate-800">
                {machinesCounter.count}
              </p>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                Across 4 production lines
              </p>
            </div>
          </Reveal>

          <Reveal delay={240} className="h-full">
            <div
              ref={oeeCounter.ref}
              className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-teal-100"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Gauge className="h-3.5 w-3.5 text-teal-500" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  OEE
                </span>
              </div>
              <p className="text-lg font-bold text-slate-800">
                {oeeCounter.count}%
              </p>
              <p className="text-[10px] text-emerald-600 font-medium mt-0.5">
                ↑ 3% this month
              </p>
            </div>
          </Reveal>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {/* Production Output */}
          <Reveal delay={100} className="h-full">
            <div
              ref={productionChart.ref}
              className="rounded-xl border border-slate-100 p-4 transition-all duration-300 hover:shadow-md hover:border-blue-100"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-slate-700">
                  Production Output
                </h4>
                <span className="text-[10px] text-slate-400">Last 7 days</span>
              </div>
              <div className="flex items-end gap-1.5 h-20">
                {[45, 62, 58, 74, 68, 82, 91].map((h, i) => (
                  <ChartBar
                    key={i}
                    height={h}
                    label={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                    colorClass="bg-gradient-to-t from-blue-500 to-cyan-400"
                    delay={i * 80}
                    isVisible={productionChart.isVisible}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          {/* OEE Breakdown */}
          <Reveal delay={200} className="h-full">
            <div
              ref={oeeChart.ref}
              className="rounded-xl border border-slate-100 p-4 transition-all duration-300 hover:shadow-md hover:border-teal-100"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-slate-700">
                  OEE Breakdown
                </h4>
                <span className="text-[10px] text-slate-400">This shift</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: "Availability", value: 92, color: "bg-blue-500" },
                  { label: "Performance", value: 88, color: "bg-cyan-500" },
                  { label: "Quality", value: 96, color: "bg-teal-500" },
                ].map((item, i) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-slate-500">
                        {item.label}
                      </span>
                      <span className="text-[10px] font-medium text-slate-700">
                        {item.value}%
                      </span>
                    </div>
                    <ProgressBar
                      value={item.value}
                      colorClass={item.color}
                      isVisible={oeeChart.isVisible}
                      delay={i * 120}
                      heightClass="h-1.5"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {/* Work Orders */}
          <Reveal delay={100} className="h-full">
            <div
              ref={workOrders.ref}
              className="rounded-xl border border-slate-100 p-4 transition-all duration-300 hover:shadow-md hover:border-blue-100"
            >
              <h4 className="text-xs font-semibold text-slate-700 mb-3">
                Active Work Orders
              </h4>
              <div className="space-y-2.5">
                {[
                  { id: "WO-2041", product: "Gear Assembly", status: "Running" },
                  { id: "WO-2042", product: "Hydraulic Valve", status: "Queued" },
                  { id: "WO-2043", product: "Bearing Housing", status: "Running" },
                ].map((wo, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100">
                      <Factory className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-slate-700 truncate">
                        {wo.id}
                      </p>
                      <p className="text-[9px] text-slate-400">{wo.product}</p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${
                        wo.status === "Running"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {wo.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Inventory Levels */}
          <Reveal delay={200} className="h-full">
            <div
              ref={inventory.ref}
              className="rounded-xl border border-slate-100 p-4 transition-all duration-300 hover:shadow-md hover:border-amber-100"
            >
              <h4 className="text-xs font-semibold text-slate-700 mb-3">
                Material Inventory
              </h4>
              <div className="space-y-2.5">
                {[
                  { name: "Steel Plates", stock: 78, status: "good" },
                  { name: "Aluminum Rods", stock: 42, status: "low" },
                  { name: "Bearing Kits", stock: 91, status: "good" },
                ].map((mat, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-medium text-slate-600">
                        {mat.name}
                      </span>
                      <span
                        className={`text-[9px] font-medium ${
                          mat.status === "low"
                            ? "text-amber-500"
                            : "text-emerald-500"
                        }`}
                      >
                        {mat.stock}%
                      </span>
                    </div>
                    <ProgressBar
                      value={mat.stock}
                      colorClass={
                        mat.status === "low" ? "bg-amber-400" : "bg-emerald-400"
                      }
                      isVisible={inventory.isVisible}
                      delay={i * 100}
                      heightClass="h-1.5"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Quality Inspections */}
          <Reveal delay={300} className="h-full">
            <div
              ref={quality.ref}
              className="rounded-xl border border-slate-100 p-4 transition-all duration-300 hover:shadow-md hover:border-emerald-100"
            >
              <h4 className="text-xs font-semibold text-slate-700 mb-3">
                Quality Inspections
              </h4>
              <div className="space-y-2">
                {[
                  { test: "Dimensional Check", status: "Passed", color: "text-emerald-600 bg-emerald-50" },
                  { test: "Surface Finish", status: "In Progress", color: "text-amber-600 bg-amber-50" },
                  { test: "Load Test", status: "Passed", color: "text-emerald-600 bg-emerald-50" },
                ].map((insp, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-slate-600">
                      {insp.test}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${insp.color}`}
                    >
                      {insp.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Analytics Dashboard
// ---------------------------------------------------------------------------

function AnalyticsDashboard() {
  const productionTrend = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const downtime = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const costBreakdown = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const linePerformance = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const materialUsage = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const qualityMetrics = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {/* Production Trend */}
      <Reveal delay={0} className="h-full">
        <div
          ref={productionTrend.ref}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <h4 className="text-sm font-semibold text-slate-700">
              Production Trend
            </h4>
          </div>
          <div className="flex items-end gap-2 h-28">
            {[40, 55, 48, 68, 62, 78, 72, 88].map((h, i) => (
              <ChartBar
                key={i}
                height={h}
                label={["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"][i]}
                colorClass="bg-gradient-to-t from-blue-500 to-cyan-400"
                delay={i * 80}
                isVisible={productionTrend.isVisible}
              />
            ))}
          </div>
        </div>
      </Reveal>

      {/* Downtime Analysis */}
      <Reveal delay={80} className="h-full">
        <div
          ref={downtime.ref}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-red-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <h4 className="text-sm font-semibold text-slate-700">
              Downtime Analysis
            </h4>
          </div>
          <div className="flex items-end gap-2 h-28">
            {[65, 45, 75, 35, 55, 40, 50].map((h, i) => (
              <ChartBar
                key={i}
                height={h}
                label={["M", "T", "W", "T", "F", "S", "S"][i]}
                colorClass="bg-gradient-to-t from-red-500 to-amber-400"
                delay={i * 80}
                isVisible={downtime.isVisible}
              />
            ))}
          </div>
        </div>
      </Reveal>

      {/* Cost Breakdown */}
      <Reveal delay={160} className="h-full">
        <div
          ref={costBreakdown.ref}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-teal-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="h-4 w-4 text-teal-500" />
            <h4 className="text-sm font-semibold text-slate-700">
              Cost Breakdown
            </h4>
          </div>
          <div className="space-y-3">
            {[
              { label: "Materials", value: 45, color: "bg-blue-500" },
              { label: "Labor", value: 30, color: "bg-cyan-500" },
              { label: "Overhead", value: 25, color: "bg-teal-500" },
            ].map((item, i) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-600">{item.label}</span>
                  <span className="text-xs font-semibold text-slate-700">
                    {item.value}%
                  </span>
                </div>
                <ProgressBar
                  value={item.value}
                  colorClass={item.color}
                  isVisible={costBreakdown.isVisible}
                  delay={i * 120}
                  heightClass="h-2"
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Line Performance */}
      <Reveal delay={240} className="h-full">
        <div
          ref={linePerformance.ref}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-4 w-4 text-indigo-500" />
            <h4 className="text-sm font-semibold text-slate-700">
              Line Performance
            </h4>
          </div>
          <div className="space-y-2.5">
            {[
              { line: "Line A", value: 94 },
              { line: "Line B", value: 87 },
              { line: "Line C", value: 79 },
              { line: "Line D", value: 91 },
            ].map((item, i) => (
              <div key={item.line} className="flex items-center gap-3">
                <span className="w-14 text-[10px] text-slate-500 truncate">
                  {item.line}
                </span>
                <div className="flex-1">
                  <ProgressBar
                    value={item.value}
                    colorClass="bg-gradient-to-r from-blue-500 to-cyan-400"
                    isVisible={linePerformance.isVisible}
                    delay={i * 100}
                    heightClass="h-2"
                  />
                </div>
                <span className="text-[10px] font-medium text-slate-600">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Material Usage */}
      <Reveal delay={320} className="h-full">
        <div
          ref={materialUsage.ref}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-amber-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-4 w-4 text-amber-500" />
            <h4 className="text-sm font-semibold text-slate-700">
              Material Usage
            </h4>
          </div>
          <div className="space-y-3">
            {[
              { name: "Steel", used: 82, status: "good" },
              { name: "Aluminum", used: 45, status: "low" },
              { name: "Plastics", used: 91, status: "good" },
              { name: "Composites", used: 30, status: "low" },
            ].map((mat, i) => (
              <div key={mat.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-600">{mat.name}</span>
                  <span
                    className={`text-[10px] font-medium ${
                      mat.status === "low"
                        ? "text-amber-500"
                        : "text-emerald-500"
                    }`}
                  >
                    {mat.used}%
                  </span>
                </div>
                <ProgressBar
                  value={mat.used}
                  colorClass={
                    mat.status === "low" ? "bg-amber-400" : "bg-emerald-400"
                  }
                  isVisible={materialUsage.isVisible}
                  delay={i * 100}
                  heightClass="h-1.5"
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Quality Metrics */}
      <Reveal delay={400} className="h-full">
        <div
          ref={qualityMetrics.ref}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-emerald-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <BadgeCheck className="h-4 w-4 text-emerald-500" />
            <h4 className="text-sm font-semibold text-slate-700">
              Quality Metrics
            </h4>
          </div>
          <div className="space-y-2.5">
            {[
              { metric: "First Pass Yield", value: "96.4%", trend: "+1.2%" },
              { metric: "Defect Rate", value: "0.8%", trend: "-0.3%" },
              { metric: "Rework Rate", value: "2.1%", trend: "-0.5%" },
              { metric: "Scrap Rate", value: "0.6%", trend: "-0.1%" },
            ].map((item) => (
              <div
                key={item.metric}
                className="flex items-center justify-between"
              >
                <span className="text-[11px] text-slate-600">
                  {item.metric}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-700">
                    {item.value}
                  </span>
                  <span
                    className={`text-[9px] font-medium ${
                      item.trend.startsWith("+")
                        ? "text-emerald-500"
                        : "text-emerald-500"
                    }`}
                  >
                    {item.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Product Showcase Tab Content
// ---------------------------------------------------------------------------

function ProductTabContent({ activeTab }: { activeTab: string }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 50);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const wrapperClass = `transition-all duration-500 ease-out ${
    isTransitioning
      ? "opacity-0 translate-y-3"
      : "opacity-100 translate-y-0"
  }`;

  if (activeTab === "Dashboard") {
    return (
      <div ref={contentRef} className={wrapperClass}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { label: "Units Produced", value: "18,420", icon: Factory, color: "text-blue-500" },
              { label: "Active Orders", value: "247", icon: ClipboardList, color: "text-cyan-500" },
              { label: "Machines Online", value: "64", icon: Cog, color: "text-indigo-500" },
              { label: "OEE", value: "87%", icon: Gauge, color: "text-teal-500" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80} className="h-full">
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-blue-200">
                  <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
                  <p className="text-lg font-bold text-slate-800">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Reveal delay={100} className="h-full">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-200">
                <h4 className="text-sm font-semibold text-slate-700 mb-4">
                  Production Output
                </h4>
                <div className="flex items-end gap-2 h-32">
                  {[45, 62, 58, 74, 68, 82, 91].map((h, i) => (
                    <ChartBar
                      key={i}
                      height={h}
                      label={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                      colorClass="bg-gradient-to-t from-blue-500 to-cyan-400"
                      delay={i * 80}
                      isVisible={true}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={200} className="h-full">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-cyan-200">
                <h4 className="text-sm font-semibold text-slate-700 mb-4">
                  Active Work Orders
                </h4>
                <div className="space-y-3">
                  {[
                    { id: "WO-2041", product: "Gear Assembly", status: "Running", progress: 68 },
                    { id: "WO-2042", product: "Hydraulic Valve", status: "Queued", progress: 0 },
                    { id: "WO-2043", product: "Bearing Housing", status: "Running", progress: 45 },
                    { id: "WO-2044", product: "Drive Shaft", status: "Running", progress: 82 },
                  ].map((wo, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-[10px] font-semibold text-blue-600">
                        <Factory className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-medium text-slate-700">
                            {wo.id}
                          </p>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${
                              wo.status === "Running"
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-amber-50 text-amber-600"
                            }`}
                          >
                            {wo.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ProgressBar
                            value={wo.progress}
                            colorClass="bg-blue-500"
                            isVisible={true}
                            delay={i * 100}
                            heightClass="h-1.5"
                          />
                          <span className="text-[9px] text-slate-400 w-8 text-right">
                            {wo.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "Production") {
    return (
      <div ref={contentRef} className={wrapperClass}>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 mb-4">
            Production Schedule
          </h4>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              { order: "WO-2041", product: "Gear Assembly", line: "Line A", qty: 500, due: "Jul 22" },
              { order: "WO-2042", product: "Hydraulic Valve", line: "Line B", qty: 300, due: "Jul 23" },
              { order: "WO-2043", product: "Bearing Housing", line: "Line A", qty: 750, due: "Jul 24" },
              { order: "WO-2044", product: "Drive Shaft", line: "Line C", qty: 420, due: "Jul 25" },
            ].map((order, i) => (
              <Reveal key={i} delay={i * 80} className="h-full">
                <div className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-blue-200">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Factory className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-700">
                      {order.order} — {order.product}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {order.line} • Qty: {order.qty}
                    </p>
                  </div>
                  <span className="text-[10px] font-medium text-blue-600">
                    Due {order.due}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "Materials") {
    return (
      <div ref={contentRef} className={wrapperClass}>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 mb-4">
            Bill of Materials
          </h4>
          <div className="space-y-2">
            {[
              { code: "MAT-001", name: "Steel Plate 5mm", qty: "12 units", status: "Available" },
              { code: "MAT-002", name: "Aluminum Rod 20mm", qty: "8 units", status: "Available" },
              { code: "MAT-003", name: "Bearing Set SKF-6205", qty: "24 units", status: "Low Stock" },
              { code: "MAT-004", name: "Hydraulic Seal Kit", qty: "6 units", status: "Available" },
              { code: "MAT-005", name: "Fastener M8x40", qty: "120 units", status: "Critical" },
            ].map((mat, i) => (
              <Reveal key={i} delay={i * 80} className="h-full">
                <div className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-amber-200">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50">
                    <Layers className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="flex-1 grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-xs font-semibold text-slate-700">
                        {mat.code}
                      </p>
                      <p className="text-[10px] text-slate-400">{mat.name}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-slate-500">Required</p>
                      <p className="text-[11px] font-medium text-slate-700">
                        {mat.qty}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${
                          mat.status === "Available"
                            ? "bg-emerald-50 text-emerald-600"
                            : mat.status === "Low Stock"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-red-50 text-red-500"
                        }`}
                      >
                        {mat.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "Inventory") {
    return (
      <div ref={contentRef} className={wrapperClass}>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 mb-4">
            Inventory Status
          </h4>
          <div className="space-y-3">
            {[
              { name: "Steel Plates", stock: 1240, status: "In Stock", pct: 82 },
              { name: "Aluminum Rods", stock: 340, status: "Low Stock", pct: 22 },
              { name: "Bearing Kits", stock: 890, status: "In Stock", pct: 65 },
              { name: "Hydraulic Seals", stock: 150, status: "Critical", pct: 10 },
              { name: "Fasteners", stock: 670, status: "In Stock", pct: 55 },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80} className="h-full">
                <div className="flex items-center gap-4 rounded-lg border border-slate-100 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-cyan-200">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50">
                    <Boxes className="h-4 w-4 text-cyan-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-700">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {item.stock} units
                    </p>
                  </div>
                  <div className="w-24">
                    <ProgressBar
                      value={item.pct}
                      colorClass={
                        item.pct > 50
                          ? "bg-emerald-400"
                          : item.pct > 20
                          ? "bg-amber-400"
                          : "bg-red-400"
                      }
                      isVisible={true}
                      delay={i * 100}
                      heightClass="h-1.5"
                    />
                  </div>
                  <span
                    className={`text-[9px] font-medium ${
                      item.status === "In Stock"
                        ? "text-emerald-600"
                        : item.status === "Low Stock"
                        ? "text-amber-600"
                        : "text-red-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "Quality") {
    return (
      <div ref={contentRef} className={wrapperClass}>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 mb-4">
            Quality Inspections
          </h4>
          <div className="space-y-3">
            {[
              { test: "Dimensional Check", batch: "B-2041", status: "Passed", time: "2 hrs ago" },
              { test: "Surface Finish", batch: "B-2042", status: "In Progress", time: "45 min ago" },
              { test: "Load Test", batch: "B-2040", status: "Passed", time: "3 hrs ago" },
              { test: "Material Hardness", batch: "B-2039", status: "Failed", time: "5 hrs ago" },
              { test: "Visual Inspection", batch: "B-2043", status: "Passed", time: "1 hr ago" },
            ].map((report, i) => (
              <Reveal key={i} delay={i * 80} className="h-full">
                <div className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                    <BadgeCheck className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-700">
                      {report.test}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Batch {report.batch} • {report.time}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[9px] font-medium ${
                      report.status === "Passed"
                        ? "bg-emerald-50 text-emerald-600"
                        : report.status === "In Progress"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-red-50 text-red-500"
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "Maintenance") {
    return (
      <div ref={contentRef} className={wrapperClass}>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 mb-4">
            Maintenance Schedule
          </h4>
          <div className="space-y-3">
            {[
              { machine: "CNC-01", task: "Spindle Lubrication", due: "Today", status: "Scheduled" },
              { machine: "CNC-04", task: "Belt Replacement", due: "Tomorrow", status: "Scheduled" },
              { machine: "Press-02", task: "Hydraulic Check", due: "Jul 24", status: "Pending" },
              { machine: "Robot-03", task: "Calibration", due: "Jul 26", status: "Pending" },
              { machine: "Conveyor-01", task: "Bearing Inspection", due: "Jul 28", status: "Scheduled" },
            ].map((task, i) => (
              <Reveal key={i} delay={i * 80} className="h-full">
                <div className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-indigo-200">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                    <Wrench className="h-4 w-4 text-indigo-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-700">
                      {task.machine} — {task.task}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Due: {task.due}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[9px] font-medium ${
                      task.status === "Scheduled"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "Procurement") {
    return (
      <div ref={contentRef} className={wrapperClass}>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 mb-4">
            Purchase Orders
          </h4>
          <div className="space-y-3">
            {[
              { id: "PO-1041", supplier: "MetalWorks Ltd", amount: "$24,500", status: "Approved" },
              { id: "PO-1042", supplier: "BearingPro Inc", amount: "$8,200", status: "Pending" },
              { id: "PO-1043", supplier: "SealTech Corp", amount: "$3,400", status: "Approved" },
              { id: "PO-1044", supplier: "FastenerWorld", amount: "$1,850", status: "Overdue" },
              { id: "PO-1045", supplier: "AlloySupply Co", amount: "$12,900", status: "Approved" },
            ].map((po, i) => (
              <Reveal key={i} delay={i * 80} className="h-full">
                <div className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-teal-200">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50">
                    <Receipt className="h-4 w-4 text-teal-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-700">
                      {po.id}
                    </p>
                    <p className="text-[10px] text-slate-400">{po.supplier}</p>
                  </div>
                  <span className="text-xs font-semibold text-slate-700">
                    {po.amount}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[9px] font-medium ${
                      po.status === "Approved"
                        ? "bg-emerald-50 text-emerald-600"
                        : po.status === "Pending"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-red-50 text-red-500"
                    }`}
                  >
                    {po.status}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "Reports") {
    return (
      <div ref={contentRef} className={wrapperClass}>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 mb-4">
            Operational Reports
          </h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Reveal delay={0} className="h-full">
              <div className="rounded-lg border border-slate-100 p-4 transition-all duration-300 hover:shadow-md hover:border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <PieChart className="h-4 w-4 text-blue-500" />
                  <span className="text-xs font-semibold text-slate-700">
                    Production Distribution
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Line A", value: 38, color: "bg-blue-500" },
                    { label: "Line B", value: 27, color: "bg-cyan-500" },
                    { label: "Line C", value: 22, color: "bg-teal-500" },
                    { label: "Line D", value: 13, color: "bg-indigo-500" },
                  ].map((item, i) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-slate-500">
                          {item.label}
                        </span>
                        <span className="text-[10px] font-medium text-slate-700">
                          {item.value}%
                        </span>
                      </div>
                      <ProgressBar
                        value={item.value}
                        colorClass={item.color}
                        isVisible={true}
                        delay={i * 120}
                        heightClass="h-1.5"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={100} className="h-full">
              <div className="rounded-lg border border-slate-100 p-4 transition-all duration-300 hover:shadow-md hover:border-cyan-200">
                <div className="flex items-center gap-2 mb-3">
                  <LineChart className="h-4 w-4 text-cyan-500" />
                  <span className="text-xs font-semibold text-slate-700">
                    Monthly Output
                  </span>
                </div>
                <div className="flex items-end gap-1.5 h-20">
                  {[40, 55, 45, 65, 60, 75, 70, 85].map((h, i) => (
                    <ChartBar
                      key={i}
                      height={h}
                      label=""
                      colorClass="bg-gradient-to-t from-cyan-500 to-blue-400"
                      delay={i * 80}
                      isVisible={true}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

const ManufacturingManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [workflowActiveStep, setWorkflowActiveStep] = useState<number | null>(
    null
  );
  const prefersReducedMotion = usePrefersReducedMotion();

  // Cycle workflow animation
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setWorkflowActiveStep((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % workflowSteps.length;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  // Scroll to top when the page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Global animation styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
          .animate-float {
            animation: none !important;
          }
        }
      `}</style>

      {/* ================================================================ */}
      {/* HERO SECTION                                                     */}
      {/* ================================================================ */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/manfactring.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
    

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8 lg:pt-32 lg:pb-24">
          <div className="max-w-2xl">
            {/* Badge */}
            <Reveal delay={0} direction="up">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-1.5 backdrop-blur-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                  Smart Manufacturing Platform
                </span>
              </div>
            </Reveal>

            {/* Heading */}
            <Reveal delay={100} direction="up">
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Powering Smarter
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Manufacturing.
                </span>
                <br />
                From Floor to Delivery.
              </h1>
            </Reveal>

            {/* Description */}
            <Reveal delay={200} direction="up">
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Connect production, inventory, quality, maintenance,
                procurement, and delivery through one unified digital
                manufacturing platform built for modern factories.
              </p>
            </Reveal>

            {/* Buttons */}
            <Reveal delay={300} direction="up">
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <a
                  href="#platform"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-[0.98]"
                >
                  Explore Manufacturing Solutions
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-white/20 active:scale-[0.98]"
                >
                  View Capabilities
                </Link>
              </div>
            </Reveal>

            {/* Trust indicators */}
            <Reveal delay={400} direction="up">
              <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-blue-400" />
                  <span>Role-Based Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-blue-400" />
                  <span>Real-Time OEE</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-blue-400" />
                  <span>Data Protection</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* PLATFORM OVERVIEW                                                */}
      {/* ================================================================ */}
      <section id="platform" className="relative bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left content */}
            <div>
              <Reveal delay={0} direction="up">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5">
                  <LayoutDashboard className="h-3.5 w-3.5 text-blue-600" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    Platform Overview
                  </span>
                </div>
              </Reveal>
              <Reveal delay={100} direction="up">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  One Platform.
                  <br />
                  Every Manufacturing Workflow.
                </h2>
              </Reveal>
              <Reveal delay={200} direction="up">
                <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600">
                  Bring your factory operations together with connected tools
                  designed to simplify production planning, improve shop-floor
                  visibility, and deliver products on time, every time.
                </p>
              </Reveal>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: Factory, label: "Units / Day", value: "18K+" },
                  { icon: Cog, label: "Machines", value: "64+" },
                  { icon: ClipboardList, label: "Work Orders", value: "247" },
                  { icon: Gauge, label: "Average OEE", value: "87%" },
                ].map((stat, i) => (
                  <Reveal key={stat.label} delay={i * 100} direction="up">
                    <div className="rounded-xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-blue-200">
                      <stat.icon className="h-5 w-5 text-blue-500 mb-2 transition-transform duration-300 group-hover:scale-110" />
                      <p className="text-xl font-bold text-slate-800">
                        {stat.value}
                      </p>
                      <p className="text-xs text-slate-500">{stat.label}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Right dashboard mockup */}
            <Reveal delay={200} direction="up" scale={true}>
              <div className="relative animate-float">
                <DashboardMockup />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* MANUFACTURING MODULES                                            */}
      {/* ================================================================ */}
      <section id="modules" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <Reveal delay={0} direction="up">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5">
                <Package className="h-3.5 w-3.5 text-cyan-600" />
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600">
                  Modules
                </span>
              </div>
            </Reveal>
            <Reveal delay={100} direction="up">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Everything You Need to Run Manufacturing Operations
              </h2>
            </Reveal>
            <Reveal delay={200} direction="up">
              <p className="mt-4 text-base text-slate-600">
                Comprehensive modules designed to cover every aspect of
                manufacturing management — from raw material intake to final
                dispatch.
              </p>
            </Reveal>
          </div>

          {/* Modules grid */}
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((module, i) => (
              <Reveal key={module.title} delay={i * 80} direction="up">
                <div className="group relative h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 ring-1 ring-blue-100 transition-all duration-300 group-hover:from-blue-100 group-hover:to-cyan-100 group-hover:ring-blue-200 group-hover:scale-105">
                    <module.icon className="h-5.5 w-5.5 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-800">
                    {module.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {module.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <span>Learn more</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* MANUFACTURING WORKFLOW                                           */}
      {/* ================================================================ */}
      <section
        id="workflow"
        className="bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <Reveal delay={0} direction="up">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5">
                <Activity className="h-3.5 w-3.5 text-teal-600" />
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                  Workflow
                </span>
              </div>
            </Reveal>
            <Reveal delay={100} direction="up">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Connected Manufacturing Flow
              </h2>
            </Reveal>
            <Reveal delay={200} direction="up">
              <p className="mt-4 text-base text-slate-600">
                Every stage of your production journey connected in one
                seamless workflow — from raw material to final delivery.
              </p>
            </Reveal>
          </div>

          {/* Desktop workflow */}
          <div className="mt-14 hidden lg:block">
            <Reveal delay={100} direction="up">
              <div className="relative flex items-start justify-between">
                {/* Connecting line */}
                <div className="absolute top-8 left-0 right-0 h-0.5 bg-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-1000 ease-out"
                    style={{
                      width: `${
                        ((workflowActiveStep ?? 0) /
                          (workflowSteps.length - 1)) *
                        100
                      }%`,
                    }}
                  />
                </div>

                {workflowSteps.map((step, index) => (
                  <div
                    key={step.label}
                    className="relative flex flex-col items-center"
                    style={{ width: `${100 / workflowSteps.length}%` }}
                  >
                    <div
                      className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-2 transition-all duration-500 ease-out ${
                        index <= (workflowActiveStep ?? 0)
                          ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110"
                          : "border-slate-200 bg-white text-slate-400 scale-100"
                      }`}
                    >
                      <step.icon
                        className={`h-6 w-6 transition-transform duration-500 ${
                          index === workflowActiveStep ? "scale-110" : ""
                        }`}
                      />
                      {index === workflowActiveStep && (
                        <div className="absolute -inset-1.5 rounded-2xl border-2 border-blue-400/50 animate-ping" />
                      )}
                    </div>
                    <span
                      className={`mt-3 text-center text-xs font-medium transition-colors duration-300 ${
                        index <= (workflowActiveStep ?? 0)
                          ? "text-blue-600"
                          : "text-slate-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Mobile workflow */}
          <div className="mt-12 lg:hidden">
            <Reveal delay={100} direction="up">
              <div className="relative space-y-1">
                {workflowSteps.map((step, index) => (
                  <div
                    key={step.label}
                    className="relative flex items-start gap-4"
                  >
                    {/* Vertical line */}
                    {index < workflowSteps.length - 1 && (
                      <div className="absolute left-6 top-14 h-10 w-0.5 bg-slate-200">
                        <div
                          className={`h-full w-full bg-gradient-to-b from-blue-500 to-cyan-400 transition-all duration-500 ${
                            index <= (workflowActiveStep ?? 0)
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />
                      </div>
                    )}
                    <div
                      className={`relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border-2 transition-all duration-500 ${
                        index <= (workflowActiveStep ?? 0)
                          ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-110"
                          : "border-slate-200 bg-white text-slate-400 scale-100"
                      }`}
                    >
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div className="pt-2">
                      <span
                        className={`text-sm font-medium transition-colors duration-300 ${
                          index <= (workflowActiveStep ?? 0)
                            ? "text-blue-600"
                            : "text-slate-400"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* USER ROLES                                                       */}
      {/* ================================================================ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <Reveal delay={0} direction="up">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5">
                <Users className="h-3.5 w-3.5 text-indigo-600" />
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  User Roles
                </span>
              </div>
            </Reveal>
            <Reveal delay={100} direction="up">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Designed for Every Manufacturing Team
              </h2>
            </Reveal>
            <Reveal delay={200} direction="up">
              <p className="mt-4 text-base text-slate-600">
                Purpose-built interfaces and permissions for every role on your
                factory floor and in your back office.
              </p>
            </Reveal>
          </div>

          {/* Roles grid */}
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {userRoles.map((role, i) => (
              <Reveal key={role.title} delay={i * 80} direction="up">
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 ring-1 ring-indigo-100 transition-all duration-300 group-hover:from-indigo-100 group-hover:to-purple-100 group-hover:ring-indigo-200 group-hover:scale-105">
                    <role.icon className="h-5.5 w-5.5 text-indigo-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-800">
                    {role.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {role.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* PRODUCT SHOWCASE                                                 */}
      {/* ================================================================ */}
      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <Reveal delay={0} direction="up">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5">
                <Eye className="h-3.5 w-3.5 text-blue-600" />
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Product Showcase
                </span>
              </div>
            </Reveal>
            <Reveal delay={100} direction="up">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                See the Platform in Action
              </h2>
            </Reveal>
            <Reveal delay={200} direction="up">
              <p className="mt-4 text-base text-slate-600">
                Explore the key screens and workflows that power your
                manufacturing operations.
              </p>
            </Reveal>
          </div>

          {/* Tabs */}
          <Reveal delay={200} direction="up">
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {productTabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 active:scale-[0.97] ${
                    activeTab === tab.label
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-[1.03]"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600 hover:-translate-y-0.5"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Tab content */}
          <div className="mt-10">
            <ProductTabContent activeTab={activeTab} />
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* BENEFITS                                                         */}
      {/* ================================================================ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <Reveal delay={0} direction="up">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-teal-600" />
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                  Benefits
                </span>
              </div>
            </Reveal>
            <Reveal delay={100} direction="up">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Built to Make Manufacturing Operations Simpler
              </h2>
            </Reveal>
            <Reveal delay={200} direction="up">
              <p className="mt-4 text-base text-slate-600">
                Real outcomes that improve efficiency, quality, and operational
                performance across your plant.
              </p>
            </Reveal>
          </div>

          {/* Benefits grid */}
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 80} direction="up">
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:border-teal-200 hover:shadow-xl hover:shadow-teal-100/50">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 ring-1 ring-teal-100 transition-all duration-300 group-hover:from-teal-100 group-hover:to-cyan-100 group-hover:ring-teal-200 group-hover:scale-105">
                    <benefit.icon className="h-5.5 w-5.5 text-teal-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-800">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {benefit.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECURITY                                                         */}
      {/* ================================================================ */}
      <section
        id="security"
        className="relative overflow-hidden bg-slate-950 py-20 lg:py-28"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgb(255,255,255) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <Reveal delay={0} direction="up">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 backdrop-blur-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  Security
                </span>
              </div>
            </Reveal>
            <Reveal delay={100} direction="up">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Security at the Core of Manufacturing
              </h2>
            </Reveal>
            <Reveal delay={200} direction="up">
              <p className="mt-4 text-base text-slate-400">
                Protect production data, recipes, and BOMs with enterprise-grade
                security controls and compliant workflows.
              </p>
            </Reveal>
          </div>

          {/* Security features grid */}
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {securityFeatures.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 80} direction="up">
                <div className="group h-full rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:border-cyan-500/30 hover:bg-slate-900/80">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 ring-1 ring-cyan-400/20 transition-all duration-300 group-hover:bg-cyan-400/20 group-hover:ring-cyan-400/30 group-hover:scale-105">
                    <feature.icon className="h-5.5 w-5.5 text-cyan-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* ANALYTICS                                                        */}
      {/* ================================================================ */}
      <section id="analytics" className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <Reveal delay={0} direction="up">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5">
                <BarChart3 className="h-3.5 w-3.5 text-blue-600" />
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Analytics
                </span>
              </div>
            </Reveal>
            <Reveal delay={100} direction="up">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Turn Manufacturing Data Into Better Decisions
              </h2>
            </Reveal>
            <Reveal delay={200} direction="up">
              <p className="mt-4 text-base text-slate-600">
                Real-time dashboards and reports that give you complete
                visibility into your manufacturing operations.
              </p>
            </Reveal>
          </div>

          {/* Analytics dashboard */}
          <div className="mt-14">
            <AnalyticsDashboard />
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FINAL CTA                                                        */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600 py-20 lg:py-28">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal delay={0} direction="up">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Transform Manufacturing Operations?
            </h2>
          </Reveal>
          <Reveal delay={100} direction="up">
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg">
              Bring your production, materials, quality, and delivery together
              on one intelligent platform.
            </p>
          </Reveal>
          <Reveal delay={200} direction="up">
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-blue-700 shadow-xl shadow-blue-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-blue-900/30 active:scale-[0.98]"
              >
                Request a Demo
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-white/20 active:scale-[0.98]"
              >
                Talk to Our Team
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FOOTER                                                           */}
      {/* ================================================================ */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500">
                <Factory className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold text-slate-800">
                ForgeOps
              </span>
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <a href="#" className="transition-colors hover:text-blue-600">
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-blue-600">
                Terms
              </a>
              <Link
                to="/contact"
                className="transition-colors hover:text-blue-600"
              >
                Contact
              </Link>
            </div>
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} ForgeOps. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ManufacturingManagement;