import React, { useEffect, useRef, useState } from 'react';
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  Box,
  Building2,
  Cloud,
  Cpu,
  Database,
  Factory,
  Globe,
  HardDrive,
  Layers,
  LineChart,
  Link2,
  Lock,
  MapPin,
  Monitor,
  Network,
  Package,
  Radio,
  RefreshCw,
  Satellite,
  Server,
  Shield,
  Smartphone,
  Thermometer,
  Truck,
  Wifi,
  Workflow,
  Zap,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProcessStep {
  icon: React.ReactNode;
  label: string;
  description: string;
}

interface Capability {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Industry {
  icon: React.ReactNode;
  name: string;
  description: string;
  applications: string[];
}

interface ArchNode {
  icon: React.ReactNode;
  label: string;
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

// ─── Shared Components ────────────────────────────────────────────────────────

const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}> = ({ children, delay = 0, className = '', as: Tag = 'div' }) => {
  const { ref, visible } = useInView();
  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

const SectionHeading: React.FC<{
  badge?: string;
  title: string;
  subtitle?: string;
  gradientWord?: string;
}> = ({ badge, title, subtitle, gradientWord }) => {
  const parts = gradientWord ? title.split(gradientWord) : [title];
  return (
    <FadeIn className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
      {badge && (
        <span className="mb-4 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan-300 uppercase">
          {badge}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {gradientWord ? (
          <>
            {parts[0]}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {gradientWord}
            </span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
          {subtitle}
        </p>
      )}
    </FadeIn>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const heroCapabilities = [
  'Real-Time Monitoring',
  'Device Connectivity',
  'IoT Analytics',
  'Smart Automation',
  'Asset Tracking',
];

const processSteps: ProcessStep[] = [
  {
    icon: <Cpu className="h-6 w-6" />,
    label: 'Device',
    description:
      'Capture data from sensors, machines, vehicles, and equipment.',
  },
  {
    icon: <Wifi className="h-6 w-6" />,
    label: 'Connect',
    description:
      'Securely connect devices through gateways and communication protocols.',
  },
  {
    icon: <Database className="h-6 w-6" />,
    label: 'Collect',
    description:
      'Stream real-time operational data into your software platform.',
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    label: 'Analyze',
    description: 'Transform raw data into meaningful insights and alerts.',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    label: 'Automate',
    description:
      'Trigger actions and workflows based on real-time conditions.',
  },
];

const capabilities: Capability[] = [
  {
    icon: <Monitor className="h-6 w-6" />,
    title: 'Real-Time Monitoring',
    description:
      'Monitor devices, equipment, environments, and operational conditions in real time.',
  },
  {
    icon: <Link2 className="h-6 w-6" />,
    title: 'Device Connectivity',
    description:
      'Connect sensors, machines, gateways, vehicles, and smart equipment.',
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: 'IoT Data Processing',
    description:
      'Collect, process, transform, and organize high-volume device data.',
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    title: 'Predictive Maintenance',
    description:
      'Identify abnormal equipment behavior and support proactive maintenance.',
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: 'Asset Tracking',
    description:
      'Track assets, vehicles, equipment, location, movement, and utilization.',
  },
  {
    icon: <Workflow className="h-6 w-6" />,
    title: 'Smart Automation',
    description:
      'Automatically trigger workflows and actions based on sensor conditions.',
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: 'Alerts & Notifications',
    description:
      'Send real-time alerts when critical thresholds or unusual activity are detected.',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'API & System Integration',
    description:
      'Connect IoT platforms with ERP, CRM, business applications, and third-party systems.',
  },
];

const architectureNodes: ArchNode[] = [
  { icon: <HardDrive className="h-5 w-5" />, label: 'Physical Devices' },
  { icon: <Radio className="h-5 w-5" />, label: 'Sensors' },
  { icon: <Server className="h-5 w-5" />, label: 'IoT Gateway' },
  { icon: <Cloud className="h-5 w-5" />, label: 'Cloud / API' },
  { icon: <Cpu className="h-5 w-5" />, label: 'Data Processing' },
  { icon: <LineChart className="h-5 w-5" />, label: 'Analytics' },
  { icon: <Box className="h-5 w-5" />, label: 'Business Application' },
  { icon: <Zap className="h-5 w-5" />, label: 'Automation' },
];

const industries: Industry[] = [
  {
    icon: <Factory className="h-6 w-6" />,
    name: 'Manufacturing',
    description:
      'Optimize production lines with real-time machine data and predictive insights.',
    applications: [
      'Machine monitoring',
      'Equipment health',
      'Predictive maintenance',
    ],
  },
  {
    icon: <Truck className="h-6 w-6" />,
    name: 'Logistics & Transportation',
    description:
      'Track fleets, monitor shipments, and optimize routes with connected sensors.',
    applications: [
      'Vehicle tracking',
      'Asset monitoring',
      'Shipment conditions',
    ],
  },
  {
    icon: <Globe className="h-6 w-6" />,
    name: 'Agriculture',
    description:
      'Monitor soil, weather, and crop conditions to improve yield and efficiency.',
    applications: [
      'Soil moisture sensing',
      'Weather monitoring',
      'Irrigation control',
    ],
  },
  {
    icon: <Zap className="h-6 w-6" />,
    name: 'Energy & Utilities',
    description:
      'Monitor grid assets, consumption, and renewable energy systems in real time.',
    applications: [
      'Smart metering',
      'Grid monitoring',
      'Renewable tracking',
    ],
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    name: 'Smart Buildings',
    description:
      'Automate HVAC, lighting, and security for efficient, comfortable spaces.',
    applications: [
      'HVAC optimization',
      'Energy management',
      'Occupancy sensing',
    ],
  },
  {
    icon: <Package className="h-6 w-6" />,
    name: 'Retail',
    description:
      'Enhance customer experience and inventory visibility with connected devices.',
    applications: [
      'Inventory tracking',
      'Foot traffic analytics',
      'Cold chain monitoring',
    ],
  },
  {
    icon: <Box className="h-6 w-6" />,
    name: 'Warehousing',
    description:
      'Improve warehouse operations with real-time asset and environment data.',
    applications: [
      'Asset tracking',
      'Environmental monitoring',
      'Automated inventory',
    ],
  },
  {
    icon: <Satellite className="h-6 w-6" />,
    name: 'Fleet Operations',
    description:
      'Manage vehicles, drivers, and routes with comprehensive telematics.',
    applications: [
      'Driver behavior',
      'Fuel management',
      'Route optimization',
    ],
  },
];

const useCaseSteps = [
  { step: '01', text: 'Sensor detects abnormal machine vibration.' },
  { step: '02', text: 'IoT platform receives the data.' },
  { step: '03', text: 'Analytics identifies an unusual pattern.' },
  { step: '04', text: 'System generates an alert.' },
  { step: '05', text: 'Maintenance team receives notification.' },
  { step: '06', text: 'Business workflow is automatically triggered.' },
];

const integrationItems = [
  { icon: <Database className="h-5 w-5" />, label: 'ERP' },
  { icon: <Smartphone className="h-5 w-5" />, label: 'CRM' },
  { icon: <Cloud className="h-5 w-5" />, label: 'Cloud Platforms' },
  { icon: <Box className="h-5 w-5" />, label: 'Business Apps' },
  { icon: <HardDrive className="h-5 w-5" />, label: 'Databases' },
  { icon: <Smartphone className="h-5 w-5" />, label: 'Mobile Apps' },
  { icon: <Link2 className="h-5 w-5" />, label: 'APIs' },
  { icon: <Globe className="h-5 w-5" />, label: 'Third-Party Services' },
];

const securityCards = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Secure Device Communication',
    description:
      'End-to-end encryption, certificate-based authentication, and secure protocols protect every device connection.',
  },
  {
    icon: <Server className="h-6 w-6" />,
    title: 'Scalable Architecture',
    description:
      'Cloud-native infrastructure scales seamlessly from hundreds to millions of connected devices.',
  },
  {
    icon: <Activity className="h-6 w-6" />,
    title: 'Real-Time Data Processing',
    description:
      'High-throughput stream processing ingests and analyzes data with low latency and high reliability.',
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: 'Reliable Monitoring',
    description:
      'Continuous health checks, redundancy, and failover ensure your IoT platform stays online 24/7.',
  },
];

// ─── Section Components ───────────────────────────────────────────────────────

const HeroSection: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden "
      aria-label="Hero"
    >
      {/* Video background */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect width='1920' height='1080' fill='%23020617'/%3E%3C/svg%3E"
      >
        <source src="/Iot.mp4" type="video/mp4" />
      </video>

      

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-950/70" aria-hidden="true" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Animated particles */}
      {!reducedMotion && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-cyan-400/40"
              style={{
                left: `${(i * 17 + 5) % 100}%`,
                top: `${(i * 23 + 10) % 100}%`,
                animation: `float ${6 + (i % 5) * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Hero content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          {/* Badge */}
          <FadeIn>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan-300 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              IoT Solutions
            </span>
          </FadeIn>

          {/* Heading */}
          <FadeIn delay={100}>
            <h1 className="text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Connect the Physical World to{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-600 bg-clip-text text-transparent">
                Intelligent Software
              </span>
            </h1>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={200}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl">
              Connect devices, collect real-time data, monitor operations,
              automate workflows, and turn connected assets into actionable
              business intelligence.
            </p>
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={300}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#capabilities"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Explore IoT Capabilities
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#cta"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Talk to Our Team
              </a>
            </div>
          </FadeIn>

          {/* Capability strip */}
          <FadeIn delay={400}>
            <div className="mt-16 border-t border-white/10 pt-6">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {heroCapabilities.map((cap) => (
                  <li
                    key={cap}
                    className="flex items-center gap-2 text-xs font-medium tracking-wide text-slate-400"
                  >
                    <span className="h-1 w-1 rounded-full bg-cyan-400" />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-slate-950 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
};

const IntroductionSection: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      className="relative bg-slate-950 py-24 sm:py-32"
      aria-label="IoT workflow introduction"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          badge="The IoT Journey"
          title="From Connected Devices to Business Intelligence"
          subtitle="Every IoT solution follows a clear path from physical devices to automated business value."
          gradientWord="Business Intelligence"
        />

        {/* Desktop horizontal process */}
        <div className="hidden lg:block">
          <div className="relative flex items-start justify-between gap-4">
            {/* Connection line */}
            <div
              className="absolute top-10 right-[calc(10%+1rem)] left-[calc(10%+1rem)] h-px"
              aria-hidden="true"
            >
              <div className="h-full w-full bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-cyan-500/40" />
              {!reducedMotion && (
                <div className="absolute top-0 left-0 h-full w-full">
                  <div
                    className="h-full w-16 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    style={{
                      animation: 'dataFlow 3s linear infinite',
                    }}
                  />
                </div>
              )}
            </div>

            {processSteps.map((step, i) => (
              <FadeIn
                key={step.label}
                delay={i * 120}
                className="relative flex flex-1 flex-col items-center text-center"
              >
                <div className="relative z-10 mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 text-cyan-400 shadow-lg shadow-cyan-500/5 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 hover:shadow-cyan-500/15">
                  {step.icon}
                </div>
                <h3 className="mb-2 text-sm font-bold tracking-widest text-white uppercase">
                  {step.label}
                </h3>
                <p className="max-w-[180px] text-xs leading-relaxed text-slate-400">
                  {step.description}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Mobile / tablet vertical process */}
        <div className="space-y-0 lg:hidden">
          {processSteps.map((step, i) => (
            <FadeIn key={step.label} delay={i * 100}>
              <div className="flex gap-5">
                {/* Icon + line column */}
                <div className="flex flex-col items-center">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-900/80 text-cyan-400">
                    {step.icon}
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="my-2 w-px flex-1 bg-gradient-to-b from-cyan-500/40 to-blue-500/20" />
                  )}
                </div>
                {/* Content */}
                <div className="pb-8">
                  <h3 className="mb-1 text-xs font-bold tracking-widest text-white uppercase">
                    {step.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {step.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const CapabilitiesSection: React.FC = () => (
  <section
    id="capabilities"
    className="relative bg-slate-950 py-24 sm:py-32"
    aria-label="IoT capabilities"
  >
    {/* Subtle background glow */}
    <div
      className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[120px]"
      aria-hidden="true"
    />

    <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
      <SectionHeading
        badge="Capabilities"
        title="Everything You Need to Build Connected Operations"
        subtitle="A complete IoT software platform with the tools to connect, monitor, analyze, and automate your physical operations."
        gradientWord="Connected Operations"
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((cap, i) => (
          <FadeIn key={cap.title} delay={i * 80}>
            <article className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-500/25 hover:bg-white/[0.04] hover:shadow-xl hover:shadow-cyan-500/5">
              {/* Gradient border top */}
              <div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/15 bg-cyan-500/10 text-cyan-400 transition-all duration-500 group-hover:scale-110 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/15">
                {cap.icon}
              </div>

              <h3 className="mb-2 text-base font-semibold text-white">
                {cap.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {cap.description}
              </p>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

const ArchitectureSection: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-slate-950 py-24 sm:py-32"
      aria-label="IoT architecture"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          badge="Architecture"
          title="How Your Connected Ecosystem Works"
          subtitle="Your devices generate the data. Our software connects, processes, visualizes, and transforms that data into useful business actions."
          gradientWord="Connected Ecosystem"
        />

        {/* Desktop architecture flow */}
        <div className="hidden md:block">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {architectureNodes.map((node, i) => (
              <React.Fragment key={node.label}>
                <FadeIn delay={i * 80}>
                  <div className="group relative">
                    <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-cyan-500/10">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 transition-colors duration-300 group-hover:bg-cyan-500/20">
                        {node.icon}
                      </div>
                      <span className="text-xs font-semibold whitespace-nowrap text-slate-300">
                        {node.label}
                      </span>
                    </div>
                    {/* Pulsing dot */}
                    {!reducedMotion && (
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                      </span>
                    )}
                  </div>
                </FadeIn>
                {i < architectureNodes.length - 1 && (
                  <FadeIn delay={i * 80 + 40} className="flex-shrink-0">
                    <div className="relative flex items-center">
                      <ArrowRight className="h-4 w-4 text-cyan-500/50" />
                      {!reducedMotion && (
                        <span
                          className="absolute left-0 h-1.5 w-1.5 rounded-full bg-cyan-400"
                          style={{
                            animation: `packetTravel 2s linear infinite`,
                            animationDelay: `${i * 0.3}s`,
                          }}
                        />
                      )}
                    </div>
                  </FadeIn>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Mobile vertical architecture */}
        <div className="space-y-0 md:hidden">
          {architectureNodes.map((node, i) => (
            <FadeIn key={node.label} delay={i * 60}>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-cyan-400">
                  {node.icon}
                </div>
                <span className="text-sm font-semibold text-slate-300">
                  {node.label}
                </span>
              </div>
              {i < architectureNodes.length - 1 && (
                <div className="ml-6 flex h-6 items-center">
                  <div className="h-full w-px bg-gradient-to-b from-cyan-500/40 to-transparent" />
                </div>
              )}
            </FadeIn>
          ))}
        </div>

        {/* Supporting text */}
        <FadeIn delay={400}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
            Your devices generate the data. Our software connects, processes,
            visualizes, and transforms that data into useful business actions.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

const IndustriesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      className="relative bg-slate-950 py-24 sm:py-32"
      aria-label="Industry applications"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          badge="Industries"
          title="IoT Solutions Across Industries"
          subtitle="Purpose-built IoT applications for the sectors that power the global economy."
          gradientWord="Across Industries"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => {
            const isActive = activeIndex === i;
            return (
              <FadeIn key={ind.name} delay={i * 60}>
                <article
                  className={`group relative h-full cursor-pointer overflow-hidden rounded-2xl border p-5 backdrop-blur-sm transition-all duration-500 ${
                    isActive
                      ? 'border-cyan-500/30 bg-white/[0.06] shadow-xl shadow-cyan-500/10'
                      : 'border-white/[0.06] bg-white/[0.02] hover:-translate-y-1 hover:border-cyan-500/20 hover:bg-white/[0.04]'
                  }`}
                  onClick={() => setActiveIndex(isActive ? null : i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveIndex(isActive ? null : i);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isActive}
                  aria-label={`${ind.name} industry details`}
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/15 bg-cyan-500/10 text-cyan-400 transition-all duration-500 group-hover:scale-110">
                    {ind.icon}
                  </div>

                  <h3 className="mb-1.5 text-sm font-semibold text-white">
                    {ind.name}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-400">
                    {ind.description}
                  </p>

                  {/* Expanded applications */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isActive
                        ? 'mt-3 max-h-40 opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <ul className="space-y-1.5 border-t border-white/10 pt-3">
                      {ind.applications.map((app) => (
                        <li
                          key={app}
                          className="flex items-center gap-2 text-xs text-slate-300"
                        >
                          <span className="h-1 w-1 rounded-full bg-cyan-400" />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hover hint */}
                  {!isActive && (
                    <div className="mt-3 flex items-center gap-1 text-[10px] font-medium tracking-wider text-slate-600 uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span>View applications</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  )}
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const MonitoringVisualSection: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();

  const stats = [
    { label: 'Connected Devices', value: '1,248', color: 'text-cyan-400' },
    { label: 'Online Devices', value: '1,192', color: 'text-emerald-400' },
    { label: 'Alerts', value: '18', color: 'text-amber-400' },
    { label: 'Data Events', value: '84.6K', color: 'text-blue-400' },
  ];

  const deviceCards = [
    {
      label: 'Temperature',
      value: '72.4°F',
      icon: <Thermometer className="h-4 w-4" />,
      status: 'normal',
      accent: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
    },
    {
      label: 'Machine Vibration',
      value: 'Normal',
      icon: <Activity className="h-4 w-4" />,
      status: 'normal',
      accent: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      label: 'Energy Usage',
      value: '68.2 kWh',
      icon: <Zap className="h-4 w-4" />,
      status: 'normal',
      accent: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      label: 'Fleet Location',
      value: '124 Active Assets',
      icon: <MapPin className="h-4 w-4" />,
      status: 'normal',
      accent: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20',
    },
  ];

  // Simple SVG line chart data
  const chartPoints = [20, 35, 28, 45, 38, 55, 48, 62, 58, 72, 65, 80];
  const chartWidth = 500;
  const chartHeight = 120;
  const maxVal = Math.max(...chartPoints);
  const points = chartPoints
    .map((v, i) => {
      const x = (i / (chartPoints.length - 1)) * chartWidth;
      const y = chartHeight - (v / maxVal) * (chartHeight - 20) - 10;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <section
      className="relative overflow-hidden bg-slate-950 py-24 sm:py-32"
      aria-label="Real-time monitoring visual"
    >
      {/* Glow */}
      <div
        className="absolute top-1/3 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/[0.04] blur-[150px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          badge="Live Monitoring"
          title="Real-Time Visibility Into Every Connected Asset"
          subtitle="A unified view of your entire connected ecosystem — devices, sensors, and operational data in real time."
          gradientWord="Real-Time Visibility"
        />

        <FadeIn>
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md">
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
                </div>
                <span className="ml-3 text-xs font-medium text-slate-500">
                  IoT Command Center
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  {!reducedMotion && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  )}
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[10px] font-medium tracking-wider text-emerald-400 uppercase">
                  Live
                </span>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-px border-b border-white/[0.06] bg-white/[0.03] sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="px-5 py-4">
                  <p className="text-[10px] font-medium tracking-wider text-slate-500 uppercase">
                    {s.label}
                  </p>
                  <p className={`mt-1 text-xl font-bold ${s.color}`}>
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Device cards */}
            <div className="grid gap-px bg-white/[0.03] sm:grid-cols-2 lg:grid-cols-4">
              {deviceCards.map((card) => (
                <div key={card.label} className="px-5 py-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-medium tracking-wider text-slate-500 uppercase">
                      {card.label}
                    </span>
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-lg ${card.bg} ${card.accent}`}
                    >
                      {card.icon}
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {card.value}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        card.status === 'normal'
                          ? 'bg-emerald-400'
                          : 'bg-amber-400'
                      }`}
                    />
                    <span className="text-[10px] text-slate-500">
                      {card.status === 'normal'
                        ? 'Operating normally'
                        : 'Warning'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart area */}
            <div className="border-t border-white/[0.06] px-5 py-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] font-medium tracking-wider text-slate-500 uppercase">
                  Data Events Over Time
                </span>
                <span className="text-[10px] text-slate-600">Last 12 hours</span>
              </div>
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="h-28 w-full"
                preserveAspectRatio="none"
                aria-label="Data events line chart"
                role="img"
              >
                {/* Grid lines */}
                {[0, 1, 2, 3].map((i) => (
                  <line
                    key={i}
                    x1={0}
                    y1={(i / 3) * chartHeight}
                    x2={chartWidth}
                    y2={(i / 3) * chartHeight}
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth={1}
                  />
                ))}
                {/* Gradient fill */}
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="rgb(34,211,238)"
                      stopOpacity="0.2"
                    />
                    <stop
                      offset="100%"
                      stopColor="rgb(34,211,238)"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>
                <polygon
                  points={`0,${chartHeight} ${points} ${chartWidth},${chartHeight}`}
                  fill="url(#chartGrad)"
                />
                {/* Line */}
                <polyline
                  points={points}
                  fill="none"
                  stroke="rgb(34,211,238)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Animated dot */}
                {!reducedMotion && (
                  <circle r="3" fill="rgb(34,211,238)">
                    <animateMotion
                      dur="4s"
                      repeatCount="indefinite"
                      path={`M${points.replace(/ /g, ' L')}`}
                    />
                  </circle>
                )}
              </svg>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const UseCaseSection: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      className="relative bg-slate-950 py-24 sm:py-32"
      aria-label="Use case scenario"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          badge="Use Case"
          title="Turn Sensor Data Into Real Business Actions"
          subtitle="See how a single sensor reading flows through the entire IoT pipeline to trigger meaningful business outcomes."
          gradientWord="Real Business Actions"
        />

        <div className="relative mx-auto max-w-4xl">
          {/* Vertical connection line */}
          <div
            className="absolute top-0 bottom-0 left-6 w-px bg-gradient-to-b from-cyan-500/40 via-blue-500/30 to-cyan-500/10 md:left-1/2 md:-translate-x-px"
            aria-hidden="true"
          >
            {!reducedMotion && (
              <div
                className="absolute top-0 left-0 h-20 w-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                style={{ animation: 'verticalFlow 4s linear infinite' }}
              />
            )}
          </div>

          <div className="space-y-8">
            {useCaseSteps.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <FadeIn key={item.step} delay={i * 100}>
                  <div
                    className={`relative flex items-start gap-5 md:items-center ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content card */}
                    <div
                      className={`flex-1 pl-16 md:pl-0 ${
                        isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'
                      }`}
                    >
                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/[0.04]">
                        <span className="mb-1 block text-[10px] font-bold tracking-widest text-cyan-400 uppercase">
                          Step {item.step}
                        </span>
                        <p className="text-sm leading-relaxed text-slate-300">
                          {item.text}
                        </p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-6 flex h-5 w-5 -translate-x-1/2 items-center justify-center md:left-1/2 md:-translate-x-1/2">
                      <span className="relative flex h-3 w-3">
                        {!reducedMotion && (
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                        )}
                        <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-cyan-400 bg-slate-950" />
                      </span>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden flex-1 md:block" />
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const IntegrationSection: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-slate-950 py-24 sm:py-32"
      aria-label="Integration capabilities"
    >
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          badge="Integrations"
          title="Connect IoT With Your Existing Technology"
          subtitle="Seamlessly integrate your IoT platform with the business systems and tools you already use."
          gradientWord="Existing Technology"
        />

        {/* Desktop: radial layout */}
        <div className="relative mx-auto hidden h-[520px] max-w-3xl lg:block">
          {/* Connection lines (SVG) */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 800 520"
            fill="none"
            aria-hidden="true"
          >
            {integrationItems.map((_, i) => {
              const angle =
                (i / integrationItems.length) * Math.PI * 2 - Math.PI / 2;
              const cx = 400;
              const cy = 260;
              const r = 200;
              const x = cx + Math.cos(angle) * r;
              const y = cy + Math.sin(angle) * r;
              return (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke="rgba(34,211,238,0.15)"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                >
                  {!reducedMotion && (
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-8"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  )}
                </line>
              );
            })}
          </svg>

          {/* Central hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-blue-600/10 shadow-xl shadow-cyan-500/10 backdrop-blur-md">
              <div className="text-center">
                <Network className="mx-auto mb-1 h-6 w-6 text-cyan-400" />
                <span className="text-xs font-bold tracking-wider text-white uppercase">
                  IoT
                  <br />
                  Platform
                </span>
              </div>
              {!reducedMotion && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-400" />
                </span>
              )}
            </div>
          </div>

          {/* Orbiting items */}
          {integrationItems.map((item, i) => {
            const angle =
              (i / integrationItems.length) * Math.PI * 2 - Math.PI / 2;
            const r = 200;
            const x = 400 + Math.cos(angle) * r;
            const y = 260 + Math.sin(angle) * r;
            return (
              <div
                key={item.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${(x / 800) * 100}%`,
                  top: `${(y / 520) * 100}%`,
                }}
              >
                <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/25 hover:bg-white/[0.06]">
                  <span className="text-cyan-400">{item.icon}</span>
                  <span className="text-xs font-medium whitespace-nowrap text-slate-300">
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: grid layout */}
        <div className="lg:hidden">
          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-blue-600/10 shadow-xl shadow-cyan-500/10">
              <div className="text-center">
                <Network className="mx-auto mb-0.5 h-5 w-5 text-cyan-400" />
                <span className="text-[10px] font-bold tracking-wider text-white uppercase">
                  IoT Platform
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {integrationItems.map((item) => (
              <FadeIn key={item.label}>
                <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 backdrop-blur-sm">
                  <span className="text-cyan-400">{item.icon}</span>
                  <span className="text-xs font-medium text-slate-300">
                    {item.label}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SecuritySection: React.FC = () => (
  <section
    className="relative bg-slate-950 py-24 sm:py-32"
    aria-label="Security and scalability"
  >
    <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
      <SectionHeading
        badge="Security & Scale"
        title="Built for Secure, Scalable Connectivity"
        subtitle="Enterprise-grade security and cloud-native scalability designed for mission-critical IoT deployments."
        gradientWord="Secure, Scalable"
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {securityCards.map((card, i) => (
          <FadeIn key={card.title} delay={i * 80}>
            <div className="group h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-cyan-500/20 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-cyan-500/5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/15 bg-cyan-500/10 text-cyan-400 transition-all duration-500 group-hover:scale-110 group-hover:border-cyan-500/30">
                {card.icon}
              </div>
              <h3 className="mb-2 text-base font-semibold text-white">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {card.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

const FinalCTASection: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-slate-950 py-24 sm:py-32"
      aria-label="Final call to action"
    >
      {/* Animated network background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-cyan-500/[0.07] blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-blue-600/[0.07] blur-[120px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Floating particles */}
        {!reducedMotion &&
          Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-cyan-400/30"
              style={{
                left: `${(i * 13 + 7) % 100}%`,
                top: `${(i * 29 + 15) % 100}%`,
                animation: `float ${8 + (i % 4) * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.6}s`,
              }}
            />
          ))}
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-12">
        <FadeIn>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Connect Your Business?
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={150}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Build smarter operations with connected devices, real-time
            intelligence, automation, and scalable IoT software.
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:w-auto"
            >
              Start Your IoT Project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#capabilities"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:w-auto"
            >
              Explore Our Solutions
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// ─── Global Styles (injected) ─────────────────────────────────────────────────

const GlobalStyles: React.FC = () => (
  <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
      25% { transform: translateY(-12px) translateX(6px); opacity: 0.8; }
      50% { transform: translateY(-6px) translateX(-4px); opacity: 0.5; }
      75% { transform: translateY(-18px) translateX(8px); opacity: 0.7; }
    }

    @keyframes dataFlow {
      0% { transform: translateX(-64px); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateX(100vw); opacity: 0; }
    }

    @keyframes packetTravel {
      0% { transform: translateX(0); opacity: 1; }
      100% { transform: translateX(24px); opacity: 0; }
    }

    @keyframes verticalFlow {
      0% { transform: translateY(-80px); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(100%); opacity: 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      overflow-x: hidden;
      background-color: #020617;
    }
  `}</style>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const IoTSolutions: React.FC = () => {
  return (
    <main className="min-h-screen bg-slate-950 antialiased">
      <GlobalStyles />
      <HeroSection />
      <IntroductionSection />
      <CapabilitiesSection />
      <ArchitectureSection />
      <IndustriesSection />
      <MonitoringVisualSection />
      <UseCaseSection />
      <IntegrationSection />
      <SecuritySection />
      <FinalCTASection />
    </main>
  );
};

export default IoTSolutions;