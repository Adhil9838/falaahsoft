import React, { useEffect, useRef, useState } from 'react';
import {
  Database,
  GitBranch,
  RefreshCw,
  Filter,
  BarChart3,
  Cloud,
  Cpu,
  Layers,
  Server,
  Zap,
  CheckCircle,
  Shield,
  TrendingUp,
  Workflow,
  Box,
  LineChart,
  Brain,
  ArrowRight,
  ChevronRight,
  Play,
  Sparkles,
  Globe,
  Lock,
  Gauge,
  CircuitBoard,
  Table2,
  Braces,
  CloudCog,
  MonitorSmartphone,
  Building2,
  ShoppingCart,
  Truck,
  Factory,
  GraduationCap,
  Home,
} from 'lucide-react';

// ----------------------------------------------------------------------
// Animation & scroll reveal hook
// ----------------------------------------------------------------------
const useReveal = (threshold = 0.15) => {
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
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
};

// ----------------------------------------------------------------------
// Reusable components
// ----------------------------------------------------------------------
const Section = ({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <section id={id} className={`relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 ${className}`}>
    <div className="mx-auto max-w-7xl">{children}</div>
  </section>
);

const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`mb-14 transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${center ? 'text-center mx-auto max-w-3xl' : ''}`}
    >
      {eyebrow && (
        <span className="inline-block mb-4 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
};

// ----------------------------------------------------------------------
// Floating data particles (hero + pipeline background)
// ----------------------------------------------------------------------
const DataParticles = ({ count = 24 }: { count?: number }) => {
  const particles = React.useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 10,
        opacity: 0.15 + Math.random() * 0.4,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-cyan-400"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            boxShadow: '0 0 8px rgba(34,211,238,0.8)',
            animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

// ----------------------------------------------------------------------
// HERO SECTION
// ----------------------------------------------------------------------
const Hero = () => {
  const { ref, visible } = useReveal(0.05);
  const videoUrl =
    '/data.mp4';

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster=""
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Dark overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/60 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,211,238,0.12),transparent_60%)]" />

      {/* Animated particles + connection lines */}
      <DataParticles count={30} />

      {/* Floating data nodes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { top: '18%', left: '10%', label: 'Sources' },
          { top: '70%', left: '15%', label: 'Pipelines' },
          { top: '25%', left: '85%', label: 'Warehouse' },
          { top: '78%', left: '80%', label: 'Analytics' },
          { top: '50%', left: '92%', label: 'AI' },
        ].map((node, i) => (
          <div
            key={i}
            className="absolute hidden lg:flex items-center gap-2 rounded-full border border-cyan-400/20 bg-slate-900/60 px-4 py-2 backdrop-blur-sm"
            style={{
              top: node.top,
              left: node.left,
              animation: `floatNode ${7 + i * 1.3}s ease-in-out ${i * 0.8}s infinite`,
            }}
          >
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
            <span className="text-xs font-medium text-slate-300">{node.label}</span>
          </div>
        ))}
      </div>

      {/* Hero content */}
      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-4xl px-6 text-center transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
          <Sparkles className="h-3.5 w-3.5" />
          Data Engineering Solutions
        </span>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
          Build a Smarter{' '}
          <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
            Data Foundation
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl">
          Transform complex, disconnected data into reliable pipelines, scalable platforms,
          analytics-ready datasets, and intelligent business insights.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#capabilities"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.03] hover:shadow-cyan-500/40"
          >
            Explore Data Solutions
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#cta"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:scale-[1.03] hover:border-cyan-400/40 hover:bg-white/10"
          >
            <Play className="h-4 w-4" />
            Talk to Our Experts
          </a>
        </div>

        {/* Data flow mini visual */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] font-medium uppercase tracking-wider text-slate-500 sm:gap-x-4 sm:text-xs">
          {['Sources', 'Pipelines', 'Processing', 'Warehouse', 'Analytics', 'AI'].map(
            (step, i, arr) => (
              <React.Fragment key={step}>
                <span className="text-slate-400">{step}</span>
                {i < arr.length - 1 && (
                  <ChevronRight className="h-3 w-3 text-cyan-500/60" />
                )}
              </React.Fragment>
            )
          )}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-cyan-400" />
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------------
// SECTION 2: INTRODUCTION
// ----------------------------------------------------------------------
const IntroFlow = () => {
  const { ref, visible } = useReveal();
  const steps = [
    { label: 'Raw Data', icon: Database },
    { label: 'Data Collection', icon: Globe },
    { label: 'Data Processing', icon: Cpu },
    { label: 'Data Storage', icon: Server },
    { label: 'Analytics', icon: BarChart3 },
    { label: 'AI & Machine Learning', icon: Brain },
  ];

  return (
    <Section id="intro" className="border-t border-white/5">
      <SectionHeading
        eyebrow="The Journey"
        title="From Raw Data to Business Intelligence"
        subtitle="Every data-driven decision starts with a reliable pipeline. We architect each stage to turn messy, fragmented sources into a trusted foundation for analytics and AI."
        center
      />

      <div
        ref={ref}
        className={`grid grid-cols-2 gap-4 transition-all duration-1000 sm:grid-cols-3 lg:grid-cols-6 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {steps.map((step, i) => (
          <div key={step.label} className="relative">
            <div className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-cyan-500/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-300 ring-1 ring-cyan-400/20 transition-transform group-hover:scale-110">
                <step.icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-semibold text-white">{step.label}</span>
              <span className="text-xs text-slate-500">Stage {i + 1}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="pointer-events-none absolute -bottom-4 left-1/2 hidden -translate-x-1/2 lg:block">
                <ArrowRight className="h-4 w-4 rotate-90 text-cyan-500/40" />
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};

// ----------------------------------------------------------------------
// SECTION 3: CAPABILITIES
// ----------------------------------------------------------------------
const Capabilities = () => {
  const { ref, visible } = useReveal();
  const cards = [
    { icon: GitBranch, title: 'Data Pipeline Development', desc: 'Design and build robust, maintainable pipelines that move data reliably from source to destination.' },
    { icon: RefreshCw, title: 'ETL / ELT Solutions', desc: 'Extract, transform, and load data at scale with batch or streaming architectures tailored to your needs.' },
    { icon: Workflow, title: 'Data Integration', desc: 'Unify data from disparate systems into a single, coherent view for the entire organization.' },
    { icon: Filter, title: 'Data Cleaning & Transformation', desc: 'Standardize, deduplicate, and enrich data to ensure it is accurate and ready for analysis.' },
    { icon: Server, title: 'Data Warehousing', desc: 'Build high-performance warehouses optimized for analytical queries and business reporting.' },
    { icon: Layers, title: 'Data Lakes', desc: 'Store structured, semi-structured, and unstructured data in scalable, cost-effective lakes.' },
    { icon: Zap, title: 'Real-Time Data Processing', desc: 'Capture and process streaming data for instant insights and event-driven applications.' },
    { icon: Globe, title: 'API & Third-Party Integration', desc: 'Seamlessly connect external services, SaaS platforms, and APIs into your data ecosystem.' },
    { icon: CheckCircle, title: 'Data Quality & Validation', desc: 'Implement automated checks, monitoring, and alerting to keep data trustworthy.' },
    { icon: Cloud, title: 'Cloud Data Engineering', desc: 'Leverage cloud-native services for elastic, secure, and cost-efficient data infrastructure.' },
    { icon: Table2, title: 'Analytics Data Preparation', desc: 'Model and shape data into analytics-ready datasets for BI tools and dashboards.' },
    { icon: Brain, title: 'AI/ML Data Pipelines', desc: 'Feed machine learning models with clean, feature-rich data pipelines that scale.' },
  ];

  return (
    <Section id="capabilities" className="border-t border-white/5">
      <SectionHeading
        eyebrow="What We Do"
        title="Data Engineering Capabilities"
        subtitle="A complete toolkit to design, build, and operate the data infrastructure your business depends on."
        center
      />

      <div
        ref={ref}
        className={`grid gap-5 transition-all duration-1000 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-400/30 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-cyan-500/10"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-300 ring-1 ring-cyan-400/20 transition-transform duration-300 group-hover:scale-110">
              <card.icon className="h-5 w-5" />
            </div>
            <h3 className="mb-2 text-base font-semibold text-white">{card.title}</h3>
            <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-400">{card.desc}</p>
            <div className="flex items-center gap-1 text-xs font-medium text-cyan-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
              Learn more
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

// ----------------------------------------------------------------------
// SECTION 4: PIPELINE VISUALIZATION
// ----------------------------------------------------------------------
const PipelineViz = () => {
  const { ref, visible } = useReveal();
  const stages = [
    { label: 'Data Sources', icon: Database },
    { label: 'API / Database', icon: Server },
    { label: 'ETL / ELT', icon: RefreshCw },
    { label: 'Data Processing', icon: Cpu },
    { label: 'Data Warehouse', icon: Box },
    { label: 'Analytics', icon: BarChart3 },
    { label: 'AI', icon: Brain },
  ];

  return (
    <Section id="pipeline" className="border-t border-white/5">
      <SectionHeading
        eyebrow="Architecture"
        title="Data Pipeline Visualization"
        subtitle="Watch data flow through every stage of a modern data platform — from ingestion to intelligence."
        center
      />

      <div
        ref={ref}
        className={`relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-sm transition-all duration-1000 sm:p-10 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <DataParticles count={20} />

        {/* Glow accent */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7 lg:gap-2">
          {stages.map((stage, i) => (
            <div key={stage.label} className="relative flex flex-col items-center">
              {/* Node */}
              <div className="group relative flex h-full w-full flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/[0.08]">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/25 to-blue-600/25 text-cyan-300 ring-1 ring-cyan-400/30">
                  <stage.icon className="h-5 w-5" />
                  <span className="absolute inset-0 animate-ping rounded-full bg-cyan-400/20" style={{ animationDuration: '3s' }} />
                </div>
                <span className="text-[11px] font-semibold leading-tight text-slate-200 sm:text-xs">
                  {stage.label}
                </span>
              </div>

              {/* Connector with moving particle */}
              {i < stages.length - 1 && (
                <>
                  {/* Horizontal connector on large screens */}
                  <div className="pointer-events-none absolute left-full top-1/2 hidden h-px w-full -translate-y-1/2 lg:block">
                    <div className="relative h-px w-full bg-gradient-to-r from-cyan-400/40 to-cyan-400/10">
                      <span
                        className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]"
                        style={{
                          animation: `travelHorizontal 2.4s linear ${i * 0.3}s infinite`,
                        }}
                      />
                    </div>
                  </div>
                  {/* Vertical connector on small screens */}
                  <div className="pointer-events-none absolute left-1/2 top-full hidden h-4 w-px -translate-x-1/2 sm:block lg:hidden" />
                </>
              )}
            </div>
          ))}
        </div>

        {/* Flow summary */}
        <div className="relative mt-10 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
          <CircuitBoard className="h-4 w-4 text-cyan-400" />
          <span>End-to-end orchestration</span>
          <span className="text-slate-600">•</span>
          <span>Automated monitoring</span>
          <span className="text-slate-600">•</span>
          <span>Fault tolerance</span>
          <span className="text-slate-600">•</span>
          <span>Scalable throughput</span>
        </div>
      </div>
    </Section>
  );
};

// ----------------------------------------------------------------------
// SECTION 5: TECHNOLOGY ECOSYSTEM
// ----------------------------------------------------------------------
const TechEcosystem = () => {
  const { ref, visible } = useReveal();
  const categories = [
    { title: 'Programming', icon: Braces, items: ['Python', 'SQL'] },
    { title: 'Databases', icon: Database, items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL Server'] },
    { title: 'Data Processing', icon: Cpu, items: ['Apache Spark', 'Kafka'] },
    { title: 'Pipeline', icon: GitBranch, items: ['Apache Airflow'] },
    { title: 'Cloud', icon: CloudCog, items: ['AWS', 'Azure', 'Google Cloud'] },
    { title: 'Warehouse', icon: Server, items: ['Snowflake', 'BigQuery', 'Redshift', 'Databricks'] },
  ];

  return (
    <Section id="technology" className="border-t border-white/5">
      <SectionHeading
        eyebrow="Our Stack"
        title="Technology Ecosystem"
        subtitle="We work with industry-leading tools and platforms to build modern, future-proof data infrastructure."
        center
      />

      <div
        ref={ref}
        className={`grid gap-5 transition-all duration-1000 sm:grid-cols-2 lg:grid-cols-3 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.06]"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-300 ring-1 ring-cyan-400/20">
                <cat.icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {cat.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-white/10 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors group-hover:border-cyan-400/20 group-hover:text-cyan-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

// ----------------------------------------------------------------------
// SECTION 6: BUSINESS USE CASES
// ----------------------------------------------------------------------
const UseCases = () => {
  const { ref, visible } = useReveal();
  const cases = [
    { icon: ShoppingCart, title: 'Retail', desc: 'Customer behavior, inventory and sales data.' },
    { icon: Building2, title: 'Finance', desc: 'Transaction processing and financial analytics.' },
    { icon: Truck, title: 'Logistics', desc: 'Shipment tracking and operational data.' },
    { icon: Factory, title: 'Manufacturing', desc: 'Production and machine data.' },
    { icon: Home, title: 'Real Estate', desc: 'Property, customer and transaction data.' },
    { icon: GraduationCap, title: 'Education', desc: 'Student and institutional analytics.' },
  ];

  return (
    <Section id="use-cases" className="border-t border-white/5">
      <SectionHeading
        eyebrow="Industries"
        title="Business Use Cases"
        subtitle="Data engineering powers smarter decisions across every sector. Here is how we help."
        center
      />

      <div
        ref={ref}
        className={`grid gap-5 transition-all duration-1000 sm:grid-cols-2 lg:grid-cols-3 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {cases.map((c) => (
          <div
            key={c.title}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.06]"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-500/5 blur-2xl transition-opacity group-hover:opacity-100" />
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-300 ring-1 ring-cyan-400/20 transition-transform group-hover:scale-110">
              <c.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">{c.title}</h3>
            <p className="text-sm leading-relaxed text-slate-400">{c.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

// ----------------------------------------------------------------------
// SECTION 7: DATA QUALITY
// ----------------------------------------------------------------------
const DataQuality = () => {
  const { ref, visible } = useReveal();
  const pillars = [
    { icon: CheckCircle, title: 'Accuracy', desc: 'Every data point is verified and trusted for critical decisions.', color: 'from-cyan-500 to-sky-500' },
    { icon: RefreshCw, title: 'Consistency', desc: 'Uniform formats and definitions across all systems and teams.', color: 'from-blue-500 to-indigo-500' },
    { icon: Lock, title: 'Security', desc: 'Enterprise-grade protection, encryption, and access controls.', color: 'from-indigo-500 to-purple-500' },
    { icon: Gauge, title: 'Scalability', desc: 'Infrastructure that grows seamlessly with your data volume.', color: 'from-sky-500 to-cyan-500' },
  ];

  return (
    <Section id="quality" className="border-t border-white/5">
      <SectionHeading
        eyebrow="Trust"
        title="Reliable Data. Better Decisions."
        subtitle="Four pillars ensure your data foundation is something you can confidently build on."
        center
      />

      <div
        ref={ref}
        className={`grid gap-5 transition-all duration-1000 sm:grid-cols-2 lg:grid-cols-4 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {pillars.map((p) => (
          <div
            key={p.title}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-400/30 hover:bg-white/[0.06]"
          >
            <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center">
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${p.color} opacity-20 blur-xl`} />
              <div className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${p.color} text-white shadow-lg`}>
                <p.icon className="h-6 w-6" />
              </div>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">{p.title}</h3>
            <p className="text-sm leading-relaxed text-slate-400">{p.desc}</p>

            {/* Animated indicator */}
            <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-slate-800">
              <span
                className={`block h-full w-1/3 rounded-full bg-gradient-to-r ${p.color}`}
                style={{ animation: 'qualityPulse 3s ease-in-out infinite' }}
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

// ----------------------------------------------------------------------
// SECTION 8: AI + DATA ENGINEERING
// ----------------------------------------------------------------------
const AISection = () => {
  const { ref, visible } = useReveal();
  const steps = [
    { label: 'Data Engineering', icon: Database },
    { label: 'Clean Data', icon: Filter },
    { label: 'Feature Engineering', icon: Sparkles },
    { label: 'Machine Learning', icon: Cpu },
    { label: 'AI Applications', icon: Brain },
    { label: 'Business Decisions', icon: TrendingUp },
  ];

  return (
    <Section id="ai" className="relative overflow-hidden border-t border-white/5">
      {/* Neural network animated background */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </radialGradient>
          </defs>
          {[...Array(6)].map((_, i) => (
            <line
              key={i}
              x1={`${10 + i * 15}%`}
              y1={`${20 + (i % 3) * 25}%`}
              x2={`${25 + i * 15}%`}
              y2={`${30 + ((i + 1) % 3) * 25}%`}
              stroke="rgba(34,211,238,0.15)"
              strokeWidth="1"
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <circle
              key={i}
              cx={`${10 + i * 11}%`}
              cy={`${25 + (i % 4) * 18}%`}
              r="3"
              fill="url(#nodeGlow)"
              style={{ animation: `neuralPulse ${3 + i * 0.4}s ease-in-out infinite` }}
            />
          ))}
        </svg>
      </div>

      <div className="relative">
        <SectionHeading
          eyebrow="Intelligence"
          title="AI + Data Engineering"
          subtitle="Great AI starts with great data. Our pipelines prepare the clean, feature-rich datasets that machine learning models need to deliver real business value."
          center
        />

        <div
          ref={ref}
          className={`grid gap-4 transition-all duration-1000 sm:grid-cols-3 lg:grid-cols-6 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {steps.map((step, i) => (
            <div key={step.label} className="relative">
              <div className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/50 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:bg-slate-900/70">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-300 ring-1 ring-cyan-400/20 transition-transform group-hover:scale-110">
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold leading-tight text-slate-200">
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-cyan-500/50 lg:block" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {[
            { title: 'Feature Stores', desc: 'Centralized, reusable features for consistent model training and serving.' },
            { title: 'Model Pipelines', desc: 'Automated training, validation, and deployment workflows.' },
            { title: 'MLOps Ready', desc: 'Monitoring, versioning, and governance for production AI.' },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-cyan-400/20"
            >
              <h3 className="mb-2 text-base font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

// ----------------------------------------------------------------------
// SECTION 9: FINAL CTA
// ----------------------------------------------------------------------
const FinalCTA = () => {
  const { ref, visible } = useReveal();
  return (
    <Section id="cta" className="border-t border-white/5">
      <div
        ref={ref}
        className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950 px-6 py-16 text-center transition-all duration-1000 sm:px-12 sm:py-20 ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Glow */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-1/4 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative">
          <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to Unlock the Value of Your Data?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Build reliable data pipelines and transform your organization's data into actionable
            intelligence.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.03] hover:shadow-cyan-500/40"
            >
              Start a Conversation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#capabilities"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:scale-[1.03] hover:border-cyan-400/40 hover:bg-white/10"
            >
              Explore Our Solutions
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

// ----------------------------------------------------------------------
// MAIN PAGE COMPONENT
// ----------------------------------------------------------------------
export default function DataEngineeringShowcase() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 font-sans text-white antialiased selection:bg-cyan-500/30">
      {/* Global keyframe styles injected in a <style> tag (single-file constraint) */}
      <style>{`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
          50% { transform: translateY(-10px) translateX(-8px); opacity: 0.3; }
          75% { transform: translateY(-25px) translateX(6px); opacity: 0.5; }
        }
        @keyframes floatNode {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes travelHorizontal {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes qualityPulse {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(200%); }
        }
        @keyframes neuralPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.4); }
        }
        html { scroll-behavior: smooth; }
      `}</style>

      <Hero />
      <IntroFlow />
      <Capabilities />
      <PipelineViz />
      <TechEcosystem />
      <UseCases />
      <DataQuality />
      <AISection />
      <FinalCTA />
    </div>
  );
}