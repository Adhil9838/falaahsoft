import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  Users,
  CalendarDays,
  Hospital,
  Pill,
  FlaskConical,
  CreditCard,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  Activity,
  UserCheck,
  Clock,
  TrendingUp,
  Package,
  FileText,
  Menu,
  X,
  Heart,
  Lock,
  Key,
  Eye,
  Database,
  Server,
  LayoutDashboard,
  UserCog,
  ClipboardList,
  Microscope,
  Receipt,
  PieChart,
  LineChart,
  Stethoscope as StethoscopeIcon,
  Building2,
  TestTube,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HealthcareModule {
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

const modules: HealthcareModule[] = [
  {
    title: "Doctor Management",
    description:
      "Manage doctor profiles, specializations, schedules, availability, and consultation workflows from one place.",
    icon: Stethoscope,
  },
  {
    title: "Patient Management",
    description:
      "Maintain complete patient records, medical history, documents, and communication logs securely.",
    icon: Users,
  },
  {
    title: "Appointment Management",
    description:
      "Schedule, reschedule, and track appointments with automated reminders and queue management.",
    icon: CalendarDays,
  },
  {
    title: "Hospital Management",
    description:
      "Oversee departments, beds, resources, staff, and day-to-day hospital operations efficiently.",
    icon: Hospital,
  },
  {
    title: "Pharmacy Management",
    description:
      "Track inventory, manage prescriptions, monitor stock levels, and streamline medicine dispensing.",
    icon: Pill,
  },
  {
    title: "Laboratory Management",
    description:
      "Handle test orders, sample tracking, report generation, and lab result delivery seamlessly.",
    icon: FlaskConical,
  },
  {
    title: "Billing & Payments",
    description:
      "Generate invoices, process payments, manage insurance claims, and track revenue effortlessly.",
    icon: CreditCard,
  },
  {
    title: "Reports & Analytics",
    description:
      "Gain insights into operations, patient trends, revenue, and performance with rich dashboards.",
    icon: BarChart3,
  },
];

const userRoles: UserRole[] = [
  {
    title: "Administrator",
    description:
      "Full control over system configuration, user management, permissions, and operational oversight.",
    icon: UserCog,
  },
  {
    title: "Doctor",
    description:
      "Access patient records, manage consultations, write prescriptions, and review lab reports.",
    icon: Stethoscope,
  },
  {
    title: "Receptionist",
    description:
      "Register patients, schedule appointments, manage queues, and handle front-desk operations.",
    icon: ClipboardList,
  },
  {
    title: "Nurse",
    description:
      "Track patient vitals, assist with care plans, manage ward tasks, and coordinate with doctors.",
    icon: Heart,
  },
  {
    title: "Pharmacist",
    description:
      "Dispense medicines, manage inventory, process prescriptions, and track stock efficiently.",
    icon: Pill,
  },
  {
    title: "Laboratory Staff",
    description:
      "Manage test orders, record results, generate reports, and maintain lab workflows.",
    icon: Microscope,
  },
];

const benefits: Benefit[] = [
  {
    title: "Centralized Healthcare Management",
    description:
      "Bring all departments, records, and workflows into one unified platform for complete visibility.",
    icon: LayoutDashboard,
  },
  {
    title: "Faster Patient Workflows",
    description:
      "Reduce waiting times and streamline patient journeys from registration to follow-up.",
    icon: Activity,
  },
  {
    title: "Better Operational Visibility",
    description:
      "Monitor real-time activity across departments, staff, and resources with rich dashboards.",
    icon: Eye,
  },
  {
    title: "Reduced Administrative Work",
    description:
      "Automate repetitive tasks, reduce paperwork, and free up staff for patient care.",
    icon: Clock,
  },
  {
    title: "Connected Healthcare Teams",
    description:
      "Enable seamless collaboration between doctors, nurses, labs, pharmacy, and billing.",
    icon: Users,
  },
  {
    title: "Data-Driven Decision Making",
    description:
      "Use actionable insights and reports to improve outcomes and operational efficiency.",
    icon: TrendingUp,
  },
];

const securityFeatures: SecurityFeature[] = [
  {
    title: "Role-Based Access",
    description:
      "Control who can see and do what with granular role-based permissions.",
    icon: UserCheck,
  },
  {
    title: "Secure Authentication",
    description:
      "Protect access with strong authentication and session management.",
    icon: Lock,
  },
  {
    title: "Permission Management",
    description:
      "Fine-tune access rights at module, feature, and data levels.",
    icon: Key,
  },
  {
    title: "Audit Logs",
    description:
      "Track every action with comprehensive audit trails for accountability.",
    icon: FileText,
  },
  {
    title: "Data Protection",
    description:
      "Keep sensitive healthcare data encrypted and protected at all times.",
    icon: Database,
  },
  {
    title: "Secure Healthcare Workflows",
    description:
      "Ensure every clinical and administrative workflow follows secure practices.",
    icon: Server,
  },
];

const workflowSteps: WorkflowStep[] = [
  { label: "Patient Registration", icon: UserCheck },
  { label: "Appointment", icon: CalendarDays },
  { label: "Doctor Consultation", icon: Stethoscope },
  { label: "Prescription", icon: FileText },
  { label: "Laboratory", icon: FlaskConical },
  { label: "Pharmacy", icon: Pill },
  { label: "Billing", icon: CreditCard },
  { label: "Follow-up", icon: Activity },
];

const productTabs: TabItem[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Doctors", icon: Stethoscope },
  { label: "Patients", icon: Users },
  { label: "Appointments", icon: CalendarDays },
  { label: "Pharmacy", icon: Pill },
  { label: "Laboratory", icon: FlaskConical },
  { label: "Billing", icon: CreditCard },
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

  return { ref, isVisible };
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
  const patientsCounter = useCounter(12847);
  const appointmentsCounter = useCounter(324);
  const doctorsCounter = useCounter(86);
  const revenueCounter = useCounter(284500);

  const patientGrowthChart = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
  });
  const appointmentChart = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
  });
  const pharmacyInventory = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
  });
  const labReports = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const recentAppointments = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
  });

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 overflow-hidden">
      {/* Dashboard header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <StethoscopeIcon className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-slate-800">
            MedCore Dashboard
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
              ref={patientsCounter.ref}
              className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-blue-100"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Users className="h-3.5 w-3.5 text-blue-500" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  Total Patients
                </span>
              </div>
              <p className="text-lg font-bold text-slate-800">
                {patientsCounter.count.toLocaleString()}
              </p>
              <p className="text-[10px] text-emerald-600 font-medium mt-0.5">
                ↑ 12% this month
              </p>
            </div>
          </Reveal>

          <Reveal delay={80} className="h-full">
            <div
              ref={appointmentsCounter.ref}
              className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-cyan-100"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-cyan-500" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  Today's Appointments
                </span>
              </div>
              <p className="text-lg font-bold text-slate-800">
                {appointmentsCounter.count}
              </p>
              <p className="text-[10px] text-emerald-600 font-medium mt-0.5">
                ↑ 8% vs yesterday
              </p>
            </div>
          </Reveal>

          <Reveal delay={160} className="h-full">
            <div
              ref={doctorsCounter.ref}
              className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-indigo-100"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Stethoscope className="h-3.5 w-3.5 text-indigo-500" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  Doctors
                </span>
              </div>
              <p className="text-lg font-bold text-slate-800">
                {doctorsCounter.count}
              </p>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                Active on duty
              </p>
            </div>
          </Reveal>

          <Reveal delay={240} className="h-full">
            <div
              ref={revenueCounter.ref}
              className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-teal-100"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <CreditCard className="h-3.5 w-3.5 text-teal-500" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  Revenue
                </span>
              </div>
              <p className="text-lg font-bold text-slate-800">
                ${revenueCounter.count.toLocaleString()}
              </p>
              <p className="text-[10px] text-emerald-600 font-medium mt-0.5">
                ↑ 18% this quarter
              </p>
            </div>
          </Reveal>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {/* Patient Growth Chart */}
          <Reveal delay={100} className="h-full">
            <div
              ref={patientGrowthChart.ref}
              className="rounded-xl border border-slate-100 p-4 transition-all duration-300 hover:shadow-md hover:border-blue-100"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-slate-700">
                  Patient Growth
                </h4>
                <span className="text-[10px] text-slate-400">
                  Last 7 months
                </span>
              </div>
              <div className="flex items-end gap-1.5 h-20">
                {[35, 45, 40, 60, 55, 75, 85].map((h, i) => (
                  <ChartBar
                    key={i}
                    height={h}
                    label={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"][i]}
                    colorClass="bg-gradient-to-t from-blue-500 to-cyan-400"
                    delay={i * 80}
                    isVisible={patientGrowthChart.isVisible}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Appointment Chart */}
          <Reveal delay={200} className="h-full">
            <div
              ref={appointmentChart.ref}
              className="rounded-xl border border-slate-100 p-4 transition-all duration-300 hover:shadow-md hover:border-cyan-100"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-slate-700">
                  Appointments
                </h4>
                <span className="text-[10px] text-slate-400">This week</span>
              </div>
              <div className="flex items-end gap-1.5 h-20">
                {[50, 70, 45, 80, 65, 40, 55].map((h, i) => (
                  <ChartBar
                    key={i}
                    height={h}
                    label={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                    colorClass="bg-gradient-to-t from-teal-500 to-cyan-300"
                    delay={i * 80}
                    isVisible={appointmentChart.isVisible}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {/* Recent Appointments */}
          <Reveal delay={100} className="h-full">
            <div
              ref={recentAppointments.ref}
              className="rounded-xl border border-slate-100 p-4 transition-all duration-300 hover:shadow-md hover:border-blue-100"
            >
              <h4 className="text-xs font-semibold text-slate-700 mb-3">
                Recent Appointments
              </h4>
              <div className="space-y-2.5">
                {[
                  { name: "Sarah Johnson", time: "09:30 AM", dept: "Cardiology" },
                  { name: "Michael Chen", time: "10:15 AM", dept: "Neurology" },
                  { name: "Emily Davis", time: "11:00 AM", dept: "Pediatrics" },
                ].map((apt, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-[10px] font-semibold text-blue-600">
                      {apt.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-slate-700 truncate">
                        {apt.name}
                      </p>
                      <p className="text-[9px] text-slate-400">{apt.dept}</p>
                    </div>
                    <span className="text-[9px] text-slate-400 whitespace-nowrap">
                      {apt.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Pharmacy Inventory */}
          <Reveal delay={200} className="h-full">
            <div
              ref={pharmacyInventory.ref}
              className="rounded-xl border border-slate-100 p-4 transition-all duration-300 hover:shadow-md hover:border-amber-100"
            >
              <h4 className="text-xs font-semibold text-slate-700 mb-3">
                Pharmacy Inventory
              </h4>
              <div className="space-y-2.5">
                {[
                  { name: "Amoxicillin", stock: 82, status: "good" },
                  { name: "Paracetamol", stock: 45, status: "low" },
                  { name: "Ibuprofen", stock: 91, status: "good" },
                ].map((med, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-medium text-slate-600">
                        {med.name}
                      </span>
                      <span
                        className={`text-[9px] font-medium ${
                          med.status === "low"
                            ? "text-amber-500"
                            : "text-emerald-500"
                        }`}
                      >
                        {med.stock}%
                      </span>
                    </div>
                    <ProgressBar
                      value={med.stock}
                      colorClass={
                        med.status === "low" ? "bg-amber-400" : "bg-emerald-400"
                      }
                      isVisible={pharmacyInventory.isVisible}
                      delay={i * 100}
                      heightClass="h-1.5"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Lab Reports */}
          <Reveal delay={300} className="h-full">
            <div
              ref={labReports.ref}
              className="rounded-xl border border-slate-100 p-4 transition-all duration-300 hover:shadow-md hover:border-purple-100"
            >
              <h4 className="text-xs font-semibold text-slate-700 mb-3">
                Lab Reports
              </h4>
              <div className="space-y-2">
                {[
                  {
                    test: "Blood Test",
                    status: "Ready",
                    color: "text-emerald-600 bg-emerald-50",
                  },
                  {
                    test: "X-Ray",
                    status: "Pending",
                    color: "text-amber-600 bg-amber-50",
                  },
                  {
                    test: "MRI Scan",
                    status: "Ready",
                    color: "text-emerald-600 bg-emerald-50",
                  },
                ].map((report, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-slate-600">
                      {report.test}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${report.color}`}
                    >
                      {report.status}
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
  const patientGrowth = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const appointmentTrends = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
  });
  const revenueChart = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const deptPerformance = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
  });
  const pharmacyInv = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const labActivity = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {/* Patient Growth */}
      <Reveal delay={0} className="h-full">
        <div
          ref={patientGrowth.ref}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <h4 className="text-sm font-semibold text-slate-700">
              Patient Growth
            </h4>
          </div>
          <div className="flex items-end gap-2 h-28">
            {[30, 45, 38, 55, 70, 65, 80, 90].map((h, i) => (
              <ChartBar
                key={i}
                height={h}
                label={["Q1", "Q2", "Q3", "Q4", "Q1", "Q2", "Q3", "Q4"][i]}
                colorClass="bg-gradient-to-t from-blue-500 to-cyan-400"
                delay={i * 80}
                isVisible={patientGrowth.isVisible}
              />
            ))}
          </div>
        </div>
      </Reveal>

      {/* Appointment Trends */}
      <Reveal delay={80} className="h-full">
        <div
          ref={appointmentTrends.ref}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-cyan-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-4 w-4 text-cyan-500" />
            <h4 className="text-sm font-semibold text-slate-700">
              Appointment Trends
            </h4>
          </div>
          <div className="flex items-end gap-2 h-28">
            {[60, 45, 75, 55, 85, 50, 70].map((h, i) => (
              <ChartBar
                key={i}
                height={h}
                label={["M", "T", "W", "T", "F", "S", "S"][i]}
                colorClass="bg-gradient-to-t from-teal-500 to-cyan-300"
                delay={i * 80}
                isVisible={appointmentTrends.isVisible}
              />
            ))}
          </div>
        </div>
      </Reveal>

      {/* Revenue */}
      <Reveal delay={160} className="h-full">
        <div
          ref={revenueChart.ref}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-teal-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-4 w-4 text-teal-500" />
            <h4 className="text-sm font-semibold text-slate-700">Revenue</h4>
          </div>
          <div className="space-y-3">
            {[
              { label: "Consultations", value: 45, color: "bg-blue-500" },
              { label: "Pharmacy", value: 30, color: "bg-cyan-500" },
              { label: "Laboratory", value: 25, color: "bg-teal-500" },
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
                  isVisible={revenueChart.isVisible}
                  delay={i * 120}
                  heightClass="h-2"
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Department Performance */}
      <Reveal delay={240} className="h-full">
        <div
          ref={deptPerformance.ref}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-4 w-4 text-indigo-500" />
            <h4 className="text-sm font-semibold text-slate-700">
              Department Performance
            </h4>
          </div>
          <div className="space-y-2.5">
            {[
              { dept: "Cardiology", value: 92 },
              { dept: "Neurology", value: 78 },
              { dept: "Pediatrics", value: 85 },
              { dept: "Orthopedics", value: 70 },
            ].map((item, i) => (
              <div key={item.dept} className="flex items-center gap-3">
                <span className="w-20 text-[10px] text-slate-500 truncate">
                  {item.dept}
                </span>
                <div className="flex-1">
                  <ProgressBar
                    value={item.value}
                    colorClass="bg-gradient-to-r from-blue-500 to-cyan-400"
                    isVisible={deptPerformance.isVisible}
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

      {/* Pharmacy Inventory */}
      <Reveal delay={320} className="h-full">
        <div
          ref={pharmacyInv.ref}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-amber-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-4 w-4 text-amber-500" />
            <h4 className="text-sm font-semibold text-slate-700">
              Pharmacy Inventory
            </h4>
          </div>
          <div className="space-y-3">
            {[
              { name: "Amoxicillin", stock: 82, status: "good" },
              { name: "Paracetamol", stock: 45, status: "low" },
              { name: "Ibuprofen", stock: 91, status: "good" },
              { name: "Cetirizine", stock: 30, status: "low" },
            ].map((med, i) => (
              <div key={med.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-600">{med.name}</span>
                  <span
                    className={`text-[10px] font-medium ${
                      med.status === "low"
                        ? "text-amber-500"
                        : "text-emerald-500"
                    }`}
                  >
                    {med.stock}%
                  </span>
                </div>
                <ProgressBar
                  value={med.stock}
                  colorClass={
                    med.status === "low" ? "bg-amber-400" : "bg-emerald-400"
                  }
                  isVisible={pharmacyInv.isVisible}
                  delay={i * 100}
                  heightClass="h-1.5"
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Laboratory Activity */}
      <Reveal delay={400} className="h-full">
        <div
          ref={labActivity.ref}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-purple-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <FlaskConical className="h-4 w-4 text-purple-500" />
            <h4 className="text-sm font-semibold text-slate-700">
              Laboratory Activity
            </h4>
          </div>
          <div className="space-y-2.5">
            {[
              { test: "Blood Tests", count: 142, trend: "+12%" },
              { test: "X-Rays", count: 87, trend: "+5%" },
              { test: "MRI Scans", count: 34, trend: "-3%" },
              { test: "CT Scans", count: 56, trend: "+8%" },
            ].map((item) => (
              <div
                key={item.test}
                className="flex items-center justify-between"
              >
                <span className="text-[11px] text-slate-600">
                  {item.test}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-700">
                    {item.count}
                  </span>
                  <span
                    className={`text-[9px] font-medium ${
                      item.trend.startsWith("+")
                        ? "text-emerald-500"
                        : "text-red-400"
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
              {
                label: "Total Patients",
                value: "12,847",
                icon: Users,
                color: "text-blue-500",
              },
              {
                label: "Appointments",
                value: "324",
                icon: CalendarDays,
                color: "text-cyan-500",
              },
              {
                label: "Doctors",
                value: "86",
                icon: Stethoscope,
                color: "text-indigo-500",
              },
              {
                label: "Revenue",
                value: "$284K",
                icon: CreditCard,
                color: "text-teal-500",
              },
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
                  Patient Growth
                </h4>
                <div className="flex items-end gap-2 h-32">
                  {[35, 45, 40, 60, 55, 75, 85].map((h, i) => (
                    <ChartBar
                      key={i}
                      height={h}
                      label={
                        ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"][i]
                      }
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
                  Recent Appointments
                </h4>
                <div className="space-y-3">
                  {[
                    {
                      name: "Sarah Johnson",
                      time: "09:30 AM",
                      dept: "Cardiology",
                    },
                    {
                      name: "Michael Chen",
                      time: "10:15 AM",
                      dept: "Neurology",
                    },
                    {
                      name: "Emily Davis",
                      time: "11:00 AM",
                      dept: "Pediatrics",
                    },
                    {
                      name: "James Wilson",
                      time: "11:45 AM",
                      dept: "Orthopedics",
                    },
                  ].map((apt, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-[10px] font-semibold text-blue-600">
                        {apt.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-slate-700">
                          {apt.name}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {apt.dept}
                        </p>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {apt.time}
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

  if (activeTab === "Doctors") {
    return (
      <div ref={contentRef} className={wrapperClass}>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 mb-4">
            Doctor Management
          </h4>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              {
                name: "Dr. Sarah Mitchell",
                spec: "Cardiology",
                status: "Available",
              },
              {
                name: "Dr. James Chen",
                spec: "Neurology",
                status: "In Consultation",
              },
              {
                name: "Dr. Emily Brown",
                spec: "Pediatrics",
                status: "Available",
              },
              {
                name: "Dr. Michael Ross",
                spec: "Orthopedics",
                status: "On Leave",
              },
            ].map((doc, i) => (
              <Reveal key={i} delay={i * 80} className="h-full">
                <div className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-blue-200">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600 transition-transform duration-300 group-hover:scale-110">
                    {doc.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-700">
                      {doc.name}
                    </p>
                    <p className="text-[10px] text-slate-400">{doc.spec}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${
                      doc.status === "Available"
                        ? "bg-emerald-50 text-emerald-600"
                        : doc.status === "In Consultation"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "Patients") {
    return (
      <div ref={contentRef} className={wrapperClass}>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 mb-4">
            Patient Records
          </h4>
          <div className="space-y-2">
            {[
              {
                name: "Sarah Johnson",
                age: 34,
                condition: "Hypertension",
                lastVisit: "Jul 15",
              },
              {
                name: "Michael Chen",
                age: 45,
                condition: "Diabetes",
                lastVisit: "Jul 14",
              },
              {
                name: "Emily Davis",
                age: 28,
                condition: "Asthma",
                lastVisit: "Jul 13",
              },
              {
                name: "James Wilson",
                age: 52,
                condition: "Arthritis",
                lastVisit: "Jul 12",
              },
            ].map((patient, i) => (
              <Reveal key={i} delay={i * 80} className="h-full">
                <div className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-cyan-200">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-100 text-xs font-semibold text-cyan-600">
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-xs font-semibold text-slate-700">
                        {patient.name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Age: {patient.age}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-slate-500">Condition</p>
                      <p className="text-[11px] font-medium text-slate-700">
                        {patient.condition}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-500">Last Visit</p>
                      <p className="text-[11px] font-medium text-slate-700">
                        {patient.lastVisit}
                      </p>
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

  if (activeTab === "Appointments") {
    return (
      <div ref={contentRef} className={wrapperClass}>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 mb-4">
            Appointment Schedule
          </h4>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              {
                time: "09:00 AM",
                patient: "Sarah Johnson",
                doctor: "Dr. Mitchell",
                type: "Consultation",
              },
              {
                time: "09:30 AM",
                patient: "Michael Chen",
                doctor: "Dr. Chen",
                type: "Follow-up",
              },
              {
                time: "10:00 AM",
                patient: "Emily Davis",
                doctor: "Dr. Brown",
                type: "Check-up",
              },
              {
                time: "10:30 AM",
                patient: "James Wilson",
                doctor: "Dr. Ross",
                type: "Consultation",
              },
              {
                time: "11:00 AM",
                patient: "Lisa Park",
                doctor: "Dr. Mitchell",
                type: "Follow-up",
              },
              {
                time: "11:30 AM",
                patient: "David Kim",
                doctor: "Dr. Chen",
                type: "Consultation",
              },
            ].map((apt, i) => (
              <Reveal key={i} delay={i * 60} className="h-full">
                <div className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-blue-200">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                    <Clock className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-700">
                      {apt.patient}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {apt.doctor} • {apt.type}
                    </p>
                  </div>
                  <span className="text-[10px] font-medium text-blue-600">
                    {apt.time}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "Pharmacy") {
    return (
      <div ref={contentRef} className={wrapperClass}>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 mb-4">
            Pharmacy Inventory
          </h4>
          <div className="space-y-3">
            {[
              {
                name: "Amoxicillin 500mg",
                stock: 1240,
                status: "In Stock",
                pct: 82,
              },
              {
                name: "Paracetamol 650mg",
                stock: 340,
                status: "Low Stock",
                pct: 22,
              },
              {
                name: "Ibuprofen 400mg",
                stock: 890,
                status: "In Stock",
                pct: 65,
              },
              {
                name: "Cetirizine 10mg",
                stock: 150,
                status: "Critical",
                pct: 10,
              },
              {
                name: "Omeprazole 20mg",
                stock: 670,
                status: "In Stock",
                pct: 55,
              },
            ].map((med, i) => (
              <Reveal key={i} delay={i * 80} className="h-full">
                <div className="flex items-center gap-4 rounded-lg border border-slate-100 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-amber-200">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50">
                    <Pill className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-700">
                      {med.name}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {med.stock} units
                    </p>
                  </div>
                  <div className="w-24">
                    <ProgressBar
                      value={med.pct}
                      colorClass={
                        med.pct > 50
                          ? "bg-emerald-400"
                          : med.pct > 20
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
                      med.status === "In Stock"
                        ? "text-emerald-600"
                        : med.status === "Low Stock"
                        ? "text-amber-600"
                        : "text-red-500"
                    }`}
                  >
                    {med.status}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "Laboratory") {
    return (
      <div ref={contentRef} className={wrapperClass}>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 mb-4">
            Laboratory Reports
          </h4>
          <div className="space-y-3">
            {[
              {
                test: "Complete Blood Count",
                patient: "Sarah Johnson",
                status: "Completed",
                time: "2 hrs ago",
              },
              {
                test: "Chest X-Ray",
                patient: "Michael Chen",
                status: "In Progress",
                time: "45 min ago",
              },
              {
                test: "MRI Brain Scan",
                patient: "Emily Davis",
                status: "Completed",
                time: "3 hrs ago",
              },
              {
                test: "Urinalysis",
                patient: "James Wilson",
                status: "Pending",
                time: "15 min ago",
              },
              {
                test: "Lipid Profile",
                patient: "Lisa Park",
                status: "Completed",
                time: "1 hr ago",
              },
            ].map((report, i) => (
              <Reveal key={i} delay={i * 80} className="h-full">
                <div className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-purple-200">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
                    <TestTube className="h-4 w-4 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-700">
                      {report.test}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {report.patient} • {report.time}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[9px] font-medium ${
                      report.status === "Completed"
                        ? "bg-emerald-50 text-emerald-600"
                        : report.status === "In Progress"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-amber-50 text-amber-600"
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

  if (activeTab === "Billing") {
    return (
      <div ref={contentRef} className={wrapperClass}>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 mb-4">
            Billing & Invoices
          </h4>
          <div className="space-y-3">
            {[
              {
                id: "INV-2024-001",
                patient: "Sarah Johnson",
                amount: "$245.00",
                status: "Paid",
              },
              {
                id: "INV-2024-002",
                patient: "Michael Chen",
                amount: "$180.50",
                status: "Pending",
              },
              {
                id: "INV-2024-003",
                patient: "Emily Davis",
                amount: "$320.00",
                status: "Paid",
              },
              {
                id: "INV-2024-004",
                patient: "James Wilson",
                amount: "$95.00",
                status: "Overdue",
              },
              {
                id: "INV-2024-005",
                patient: "Lisa Park",
                amount: "$410.00",
                status: "Paid",
              },
            ].map((inv, i) => (
              <Reveal key={i} delay={i * 80} className="h-full">
                <div className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-teal-200">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50">
                    <Receipt className="h-4 w-4 text-teal-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-700">
                      {inv.id}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {inv.patient}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-slate-700">
                    {inv.amount}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[9px] font-medium ${
                      inv.status === "Paid"
                        ? "bg-emerald-50 text-emerald-600"
                        : inv.status === "Pending"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-red-50 text-red-500"
                    }`}
                  >
                    {inv.status}
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
            Analytics & Reports
          </h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Reveal delay={0} className="h-full">
              <div className="rounded-lg border border-slate-100 p-4 transition-all duration-300 hover:shadow-md hover:border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <PieChart className="h-4 w-4 text-blue-500" />
                  <span className="text-xs font-semibold text-slate-700">
                    Revenue Distribution
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Consultations", value: 45, color: "bg-blue-500" },
                    { label: "Pharmacy", value: 30, color: "bg-cyan-500" },
                    { label: "Laboratory", value: 25, color: "bg-teal-500" },
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
                    Monthly Trends
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

const HealthcareManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

      <section className="relative flex min-h-screen items-center overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/Healthcare.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40" />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8 lg:pt-32 lg:pb-24">
          <div className="max-w-2xl">
            {/* Badge */}
            <Reveal delay={0} direction="up">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 backdrop-blur-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  Healthcare Technology Platform
                </span>
              </div>
            </Reveal>

            {/* Heading */}
            <Reveal delay={100} direction="up">
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Smarter Healthcare
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Management.
                </span>
                <br />
                Better Patient Experiences.
              </h1>
            </Reveal>

            {/* Description */}
            <Reveal delay={200} direction="up">
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Connect doctors, patients, appointments, pharmacy, laboratory,
                billing, and hospital operations through one intelligent
                platform.
              </p>
            </Reveal>

            {/* Buttons */}
            <Reveal delay={300} direction="up">
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <a
                  href="#platform"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-[0.98]"
                >
                  Explore Platform
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-white/20 active:scale-[0.98]"
                >
                  Request a Demo
                </Link>
              </div>
            </Reveal>

            {/* Trust indicators */}
            <Reveal delay={400} direction="up">
              <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-cyan-400" />
                  <span>Role-Based Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-cyan-400" />
                  <span>Secure Authentication</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-cyan-400" />
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
                  Every Healthcare Workflow.
                </h2>
              </Reveal>
              <Reveal delay={200} direction="up">
                <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600">
                  Bring your healthcare operations together with connected tools
                  designed to simplify everyday workflows, improve visibility,
                  and deliver better patient experiences.
                </p>
              </Reveal>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: Users, label: "Patient Records", value: "12K+" },
                  { icon: Stethoscope, label: "Doctors", value: "86+" },
                  {
                    icon: CalendarDays,
                    label: "Appointments",
                    value: "324/day",
                  },
                  { icon: Building2, label: "Departments", value: "12" },
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
      {/* HEALTHCARE MODULES                                               */}
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
                Everything You Need to Run Healthcare Operations
              </h2>
            </Reveal>
            <Reveal delay={200} direction="up">
              <p className="mt-4 text-base text-slate-600">
                Comprehensive modules designed to cover every aspect of
                healthcare management — from patient registration to analytics.
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
      {/* HEALTHCARE WORKFLOW                                              */}
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
                Connected Patient Journey
              </h2>
            </Reveal>
            <Reveal delay={200} direction="up">
              <p className="mt-4 text-base text-slate-600">
                Every step of the patient journey connected in one seamless
                workflow — from registration to follow-up.
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
                Designed for Every Healthcare Team
              </h2>
            </Reveal>
            <Reveal delay={200} direction="up">
              <p className="mt-4 text-base text-slate-600">
                Purpose-built interfaces and permissions for every role in your
                healthcare organization.
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
                Explore the key screens and workflows that power your healthcare
                operations.
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
                Built to Make Healthcare Operations Simpler
              </h2>
            </Reveal>
            <Reveal delay={200} direction="up">
              <p className="mt-4 text-base text-slate-600">
                Real outcomes that improve efficiency, patient care, and
                operational performance.
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
                Security at the Core of Healthcare
              </h2>
            </Reveal>
            <Reveal delay={200} direction="up">
              <p className="mt-4 text-base text-slate-400">
                Protect sensitive healthcare data with enterprise-grade
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
                Turn Healthcare Data Into Better Decisions
              </h2>
            </Reveal>
            <Reveal delay={200} direction="up">
              <p className="mt-4 text-base text-slate-600">
                Real-time dashboards and reports that give you complete
                visibility into your healthcare operations.
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
              Ready to Transform Healthcare Management?
            </h2>
          </Reveal>
          <Reveal delay={100} direction="up">
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg">
              Bring your healthcare operations, teams, and patient workflows
              together on one intelligent platform.
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
                <StethoscopeIcon className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold text-slate-800">
                MedCore
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
              © {new Date().getFullYear()} MedCore. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HealthcareManagement;