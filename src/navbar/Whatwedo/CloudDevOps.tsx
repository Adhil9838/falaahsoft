import React, { useState, useEffect, useRef, } from 'react';
import {
  Cloud,
  Server,
  GitBranch,
  GitMerge,
  Container,
  Box,
  Shield,
  Activity,
  Database,
  RefreshCw,
  Lock,
  BarChart3,
  LineChart,
  Zap,
  Layers,
  Settings,
  Cpu,
  Globe,
  ArrowRight,
  ChevronDown,
  Users,
  HardDrive,
  Key,
  Eye,
  Code2,
  TestTube,
  Rocket,
  Monitor,
} from 'lucide-react';

// ─── Utility Hook: Intersection Observer ────────────────────────────────────
function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.15 },
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

// ─── Utility Hook: Count Up ─────────────────────────────────────────────────
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let raf: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return count;
}

// ─── Shared Components ──────────────────────────────────────────────────────

const SectionLabel: React.FC<{ children: React.ReactNode; light?: boolean }> = ({
  children,
  light,
}) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${
      light
        ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300'
        : 'border-blue-600/20 bg-blue-50 text-blue-700'
    }`}
  >
    {children}
  </span>
);

const GradientText: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <span
    className={`bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-300 bg-clip-text text-transparent ${className}`}
  >
    {children}
  </span>
);

// ─── 1. Hero Section ────────────────────────────────────────────────────────

const HeroSection: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050a14]">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        style={{ filter: 'saturate(0.8) contrast(1.1)' }}
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect width='1920' height='1080' fill='%23050a14'/%3E%3C/svg%3E"
      >
        <source
          src="/Cloud and devops.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a14]/80 via-[#050a14]/60 to-[#050a14]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08),transparent_70%)]" />

      {/* Animated Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* Floating Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { top: '15%', left: '10%', size: 48, delay: 0, dur: 18 },
          { top: '25%', left: '80%', size: 64, delay: 2, dur: 22 },
          { top: '60%', left: '15%', size: 40, delay: 1, dur: 16 },
          { top: '70%', left: '75%', size: 56, delay: 3, dur: 20 },
          { top: '10%', left: '50%', size: 36, delay: 0.5, dur: 24 },
          { top: '80%', left: '45%', size: 44, delay: 2.5, dur: 19 },
        ].map((el, i) => (
          <div
            key={i}
            className="absolute text-cyan-400/20"
            style={{
              top: el.top,
              left: el.left,
              animation: `floatCloud ${el.dur}s ease-in-out ${el.delay}s infinite`,
            }}
          >
            {i % 2 === 0 ? <Cloud size={el.size} /> : <Server size={el.size} />}
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div
          className={`transition-all duration-1000 ${
            loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            Cloud & DevOps Solutions
          </span>
        </div>

        <h1
          className={`mx-auto max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-white transition-all duration-1000 delay-200 sm:text-5xl md:text-6xl lg:text-7xl ${
            loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          Build Faster.{' '}
          <GradientText>Deploy Smarter.</GradientText>
          <br />
          Scale Without Limits.
        </h1>

        <p
          className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-300 transition-all duration-1000 delay-400 sm:text-lg ${
            loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          Modernize your infrastructure with cloud-native architecture, automated DevOps
          workflows, secure deployments, and scalable technology built for continuous growth.
        </p>

        <div
          className={`mt-10 flex flex-col items-center justify-center gap-4 transition-all duration-1000 delay-600 sm:flex-row ${
            loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <a
            href="#solutions"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/40"
          >
            <span className="relative z-10">Explore Our Capabilities</span>
            <ArrowRight
              size={18}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
          <a
            href="#cta"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-cyan-400/40 hover:bg-white/10"
          >
            Talk to Our Experts
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-10 w-5 rounded-full border border-gray-500/40 p-1">
            <div className="h-2 w-full animate-bounce rounded-full bg-cyan-400" />
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes floatCloud {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-15px); }
          75% { transform: translateY(-25px) translateX(5px); }
        }
      `}</style>
    </section>
  );
};

// ─── 2. Capability Strip ─────────────────────────────────────────────────────

const capabilities = [
  { icon: Cloud, label: 'Cloud Infrastructure' },
  { icon: RefreshCw, label: 'Cloud Migration' },
  { icon: GitMerge, label: 'CI/CD Automation' },
  { icon: Container, label: 'Docker' },
  { icon: Box, label: 'Kubernetes' },
  { icon: Shield, label: 'Cloud Security' },
  { icon: Activity, label: 'Monitoring' },
  { icon: Code2, label: 'Infrastructure as Code' },
];

const CapabilityStrip: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-[#070c17] py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#070c17] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#070c17] to-transparent" />

      <div className="flex animate-marquee gap-16 whitespace-nowrap">
        {[...capabilities, ...capabilities].map((cap, i) => (
          <div
            key={i}
            className="group flex flex-shrink-0 items-center gap-3 text-gray-400 transition-colors duration-300 hover:text-cyan-300"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10">
              <cap.icon size={18} />
            </div>
            <span className="text-sm font-medium tracking-wide">{cap.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

// ─── 3. Introduction Section ────────────────────────────────────────────────

const processSteps = [
  { label: 'Code', icon: Code2 },
  { label: 'Build', icon: Settings },
  { label: 'Test', icon: TestTube },
  { label: 'Containerize', icon: Container },
  { label: 'Deploy', icon: Rocket },
  { label: 'Monitor', icon: Monitor },
];

const IntroSection: React.FC = () => {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.04),transparent_50%)]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left: Animated Visual */}
          <div
            className={`transition-all duration-1000 ${
              inView ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
            }`}
          >
            <div className="relative mx-auto max-w-md">
              {/* Central Cloud */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-2xl shadow-blue-500/30">
                  <Cloud size={56} className="text-white" />
                  <div className="absolute -inset-4 animate-ping rounded-full border border-cyan-400/30" />
                </div>

                {/* Orbiting Nodes */}
                {[
                  { icon: Server, angle: 0, color: 'from-blue-500 to-blue-600' },
                  { icon: Database, angle: 72, color: 'from-cyan-500 to-teal-500' },
                  { icon: Shield, angle: 144, color: 'from-indigo-500 to-blue-500' },
                  { icon: Activity, angle: 216, color: 'from-teal-500 to-cyan-500' },
                  { icon: Layers, angle: 288, color: 'from-blue-600 to-indigo-500' },
                ].map((node, i) => {
                  const radius = 110;
                  const rad = (node.angle * Math.PI) / 180;
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;
                  return (
                    <div
                      key={i}
                      className="absolute flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white shadow-lg"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                        animation: `orbitFloat 6s ease-in-out ${i * 0.5}s infinite`,
                      }}
                    >
                      <div
                        className={`flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br ${node.color} text-white`}
                      >
                        <node.icon size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Connection Lines */}
              <svg className="absolute inset-0 h-full w-full" style={{ zIndex: 0 }}>
                <circle
                  cx="50%"
                  cy="50%"
                  r="110"
                  fill="none"
                  stroke="rgba(59,130,246,0.15)"
                  strokeWidth="1"
                  strokeDasharray="6 6"
                />
              </svg>
            </div>
          </div>

          {/* Right: Content */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              inView ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`}
          >
            <SectionLabel>How We Work</SectionLabel>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              From Code to Cloud,{' '}
              <GradientText>We Automate the Journey</GradientText>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
              Our team helps businesses move from development to production seamlessly through
              intelligent automation, reliable infrastructure, secure deployment pipelines, and
              continuous monitoring — so your engineers can focus on building great products.
            </p>

            {/* Process Steps */}
            <div className="mt-10">
              <div className="flex flex-wrap items-center gap-3">
                {processSteps.map((step, i) => (
                  <React.Fragment key={step.label}>
                    <div
                      className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 transition-all duration-500 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
                      style={{
                        transitionDelay: `${i * 100}ms`,
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(12px)',
                      }}
                    >
                      <step.icon size={16} className="text-blue-600" />
                      <span className="text-xs font-semibold text-gray-700">{step.label}</span>
                    </div>
                    {i < processSteps.length - 1 && (
                      <ArrowRight size={14} className="text-gray-300" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes orbitFloat {
          0%, 100% { transform: translate(var(--x, 0), var(--y, 0)) scale(1); }
          50% { transform: translate(var(--x, 0), var(--y, 0)) scale(1.08); }
        }
      `}</style>
    </section>
  );
};

// ─── 4. Cloud Solutions Section ─────────────────────────────────────────────

const solutions = [
  {
    icon: Server,
    title: 'Cloud Infrastructure',
    desc: 'Design secure and scalable cloud environments for modern applications.',
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-500/10',
  },
  {
    icon: RefreshCw,
    title: 'Cloud Migration',
    desc: 'Move existing applications and workloads to the cloud with minimal disruption.',
    color: 'from-cyan-500 to-teal-500',
    bg: 'bg-cyan-500/10',
  },
  {
    icon: Layers,
    title: 'Cloud-Native Applications',
    desc: 'Build applications designed specifically for scalability, resilience, and cloud environments.',
    color: 'from-indigo-500 to-blue-500',
    bg: 'bg-indigo-500/10',
  },
  {
    icon: Database,
    title: 'Cloud Storage & Databases',
    desc: 'Deploy reliable storage and database infrastructure for business-critical applications.',
    color: 'from-teal-500 to-cyan-500',
    bg: 'bg-teal-500/10',
  },
  {
    icon: Zap,
    title: 'Auto Scaling',
    desc: 'Automatically adapt infrastructure resources to changing application demand.',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-500/10',
  },
  {
    icon: Shield,
    title: 'Backup & Disaster Recovery',
    desc: 'Protect critical applications and data with reliable recovery strategies.',
    color: 'from-rose-500 to-pink-500',
    bg: 'bg-rose-500/10',
  },
];

const SolutionsSection: React.FC = () => {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section id="solutions" className="relative overflow-hidden bg-[#050a14] py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.06),transparent_60%)]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel light>Cloud Solutions</SectionLabel>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Cloud Solutions <GradientText>Built for Growth</GradientText>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-400 sm:text-lg">
            Comprehensive cloud services designed to help you build, migrate, and scale with
            confidence.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((sol, i) => (
            <div
              key={sol.title}
              className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-400/25 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-cyan-500/5"
              style={{
                transitionDelay: `${i * 80}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
              }}
            >
              {/* Border glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20" />
              </div>

              <div className="relative">
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${sol.color} text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <sol.icon size={26} />
                </div>
                <h3 className="text-lg font-semibold text-white">{sol.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">{sol.desc}</p>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-cyan-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Learn more <ArrowRight size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── 5. DevOps Automation Section ───────────────────────────────────────────

const pipelineStages = [
  { icon: Users, label: 'Developer', tooltip: 'Developers write and commit code to version control.' },
  { icon: GitBranch, label: 'Git', tooltip: 'Version control triggers automated workflows on every push.' },
  { icon: Settings, label: 'Build', tooltip: 'Code is compiled and dependencies are resolved automatically.' },
  { icon: TestTube, label: 'Test', tooltip: 'Automated tests validate functionality and catch regressions.' },
  { icon: Shield, label: 'Security', tooltip: 'Security scans identify vulnerabilities before deployment.' },
  { icon: Container, label: 'Docker', tooltip: 'Applications are packaged into consistent container images.' },
  { icon: Rocket, label: 'Deploy', tooltip: 'Containers are deployed to production with zero downtime.' },
  { icon: Monitor, label: 'Monitor', tooltip: 'Real-time monitoring ensures performance and reliability.' },
];

const DevOpsSection: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-[#030710] py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_65%)]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel light>DevOps Automation</SectionLabel>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Automate Every Stage <GradientText>of Delivery</GradientText>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-400 sm:text-lg">
            A fully automated CI/CD pipeline that takes your code from commit to production with
            speed and reliability.
          </p>
        </div>

        {/* Pipeline */}
        <div className="mt-20">
          <div className="flex flex-col items-center gap-0 lg:flex-row lg:justify-center lg:gap-0">
            {pipelineStages.map((stage, i) => (
              <React.Fragment key={stage.label}>
                <div
                  className="relative"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div
                    className={`group relative flex h-20 w-20 flex-col items-center justify-center rounded-2xl border transition-all duration-500 ${
                      hovered === i
                        ? 'scale-110 border-cyan-400/50 bg-cyan-400/10 shadow-lg shadow-cyan-500/20'
                        : 'border-white/10 bg-white/[0.04]'
                    }`}
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'scale(1)' : 'scale(0.8)',
                      transitionDelay: `${i * 100}ms`,
                    }}
                  >
                    <stage.icon
                      size={22}
                      className={`transition-colors duration-300 ${
                        hovered === i ? 'text-cyan-400' : 'text-gray-400'
                      }`}
                    />
                    <span
                      className={`mt-1.5 text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300 ${
                        hovered === i ? 'text-cyan-300' : 'text-gray-500'
                      }`}
                    >
                      {stage.label}
                    </span>

                    {/* Tooltip */}
                    {hovered === i && (
                      <div className="absolute -top-14 left-1/2 z-20 w-52 -translate-x-1/2 rounded-lg border border-cyan-400/20 bg-[#0a1220] p-3 text-center shadow-xl">
                        <p className="text-[11px] leading-relaxed text-gray-300">
                          {stage.tooltip}
                        </p>
                        <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-cyan-400/20 bg-[#0a1220]" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Connector */}
                {i < pipelineStages.length - 1 && (
                  <div
                    className="flex items-center justify-center py-2 lg:px-1"
                    style={{
                      opacity: inView ? 1 : 0,
                      transitionDelay: `${i * 100 + 50}ms`,
                    }}
                  >
                    <div className="hidden h-px w-6 bg-gradient-to-r from-cyan-500/40 to-cyan-500/10 lg:block" />
                    <ChevronDown size={14} className="text-cyan-500/40 lg:hidden" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Explanations */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: 'CI/CD',
              desc: 'Automatically build, test, and deploy every code change.',
              icon: GitMerge,
            },
            {
              title: 'Docker',
              desc: 'Package applications consistently across development and production.',
              icon: Container,
            },
            {
              title: 'Kubernetes',
              desc: 'Orchestrate and scale containerized applications.',
              icon: Box,
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/8 bg-white/[0.03] p-6 text-center backdrop-blur-sm transition-all duration-500 hover:border-cyan-400/20 hover:bg-white/[0.06]"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${600 + i * 150}ms`,
              }}
            >
              <item.icon size={22} className="mx-auto text-cyan-400" />
              <h4 className="mt-3 text-sm font-semibold text-white">{item.title}</h4>
              <p className="mt-2 text-xs leading-relaxed text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── 6. Infrastructure as Code Section ──────────────────────────────────────

const codeLines = [
  { text: 'resource "aws_instance" "web" {', indent: 0, color: 'text-purple-400' },
  { text: '  ami           = "ami-0c55b159cbfafe1f0"', indent: 1, color: 'text-cyan-300' },
  { text: '  instance_type = "t3.medium"', indent: 1, color: 'text-cyan-300' },
  { text: '  tags = {', indent: 1, color: 'text-gray-400' },
  { text: '    Name = "production-web"', indent: 2, color: 'text-green-400' },
  { text: '  }', indent: 1, color: 'text-gray-400' },
  { text: '}', indent: 0, color: 'text-purple-400' },
  { text: '', indent: 0, color: '' },
  { text: 'module "vpc" {', indent: 0, color: 'text-purple-400' },
  { text: '  source = "./modules/vpc"', indent: 1, color: 'text-cyan-300' },
  { text: '  cidr   = "10.0.0.0/16"', indent: 1, color: 'text-cyan-300' },
  { text: '}', indent: 0, color: 'text-purple-400' },
];

const IaCSection: React.FC = () => {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.04),transparent_50%)]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Code Block */}
          <div
            className={`transition-all duration-1000 ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-[#0d1117] shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs font-medium text-gray-500">main.tf</span>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed">
                {codeLines.map((line, i) => (
                  <div
                    key={i}
                    className="flex"
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'translateX(0)' : 'translateX(-10px)',
                      transition: `all 0.5s ease ${i * 80}ms`,
                    }}
                  >
                    <span className="mr-4 w-6 select-none text-right text-xs text-gray-600">
                      {i + 1}
                    </span>
                    <span className={line.color} style={{ paddingLeft: `${line.indent * 16}px` }}>
                      {line.text || '\u00A0'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              inView ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`}
          >
            <SectionLabel>Infrastructure as Code</SectionLabel>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Infrastructure <GradientText>as Code</GradientText>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
              Provision and manage infrastructure through version-controlled configuration instead
              of repetitive manual setup.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { label: 'Terraform', icon: Settings },
                { label: 'Infrastructure', icon: Server },
                { label: 'Version Control', icon: GitBranch },
                { label: 'Automated Provisioning', icon: Zap },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(12px)',
                    transitionDelay: `${300 + i * 100}ms`,
                  }}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                    <item.icon size={16} />
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Infrastructure Visual */}
            <div className="mt-8 flex items-center gap-3">
              {[Server, Database, Shield, Activity].map((Icon, i) => (
                <div
                  key={i}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:scale-110 hover:border-blue-300 hover:shadow-md"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'scale(1)' : 'scale(0.8)',
                    transitionDelay: `${600 + i * 120}ms`,
                  }}
                >
                  <Icon size={18} className="text-blue-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── 7. Security & Reliability Section ──────────────────────────────────────

const securityFeatures = [
  { icon: Shield, title: 'Secure Infrastructure', desc: 'End-to-end encryption and access controls.', color: 'from-blue-500 to-blue-600' },
  { icon: Activity, title: 'Continuous Monitoring', desc: 'Real-time visibility across all systems.', color: 'from-cyan-500 to-teal-500' },
  { icon: HardDrive, title: 'Automated Backup', desc: 'Regular, reliable data protection.', color: 'from-indigo-500 to-blue-500' },
  { icon: RefreshCw, title: 'Disaster Recovery', desc: 'Rapid restoration when it matters most.', color: 'from-rose-500 to-pink-500' },
];

const infraNodes = ['Users', 'Load Balancer', 'Application', 'API', 'Database'];

const SecuritySection: React.FC = () => {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-[#050a14] py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(6,182,212,0.06),transparent_55%)]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel light>Security & Reliability</SectionLabel>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Secure. Reliable. <GradientText>Always Ready.</GradientText>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-400 sm:text-lg">
            Your infrastructure is protected at every layer with enterprise-grade security and
            reliability.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {securityFeatures.map((feat, i) => (
            <div
              key={feat.title}
              className="group rounded-2xl border border-white/8 bg-white/[0.03] p-6 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-400/25 hover:bg-white/[0.06]"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <div
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feat.color} text-white shadow-lg transition-transform duration-500 group-hover:scale-110`}
              >
                <feat.icon size={26} className="transition-transform duration-500 group-hover:rotate-6" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-white">{feat.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-400">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Infrastructure Diagram */}
        <div
          className="mt-20 rounded-2xl border border-white/8 bg-white/[0.02] p-8 backdrop-blur-sm sm:p-12"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '500ms',
          }}
        >
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-center lg:gap-4">
            {infraNodes.map((node, i) => (
              <React.Fragment key={node}>
                <div className="relative flex flex-col items-center">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/5 transition-all duration-500 hover:scale-110 hover:border-cyan-400/50">
                    {i === 0 && <Users size={24} className="text-cyan-400" />}
                    {i === 1 && <Globe size={24} className="text-cyan-400" />}
                    {i === 2 && <Server size={24} className="text-cyan-400" />}
                    {i === 3 && <Key size={24} className="text-cyan-400" />}
                    {i === 4 && <Database size={24} className="text-cyan-400" />}

                    {/* Security ring */}
                    <div className="absolute -inset-2 animate-pulse rounded-2xl border border-cyan-400/10" />
                  </div>
                  <span className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                    {node}
                  </span>
                </div>

                {i < infraNodes.length - 1 && (
                  <div className="flex items-center">
                    <div className="hidden h-px w-8 bg-gradient-to-r from-cyan-500/40 to-cyan-500/10 lg:block" />
                    <ChevronDown size={14} className="text-cyan-500/30 lg:hidden" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Security Layers */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {['WAF', 'DDoS Protection', 'SSL/TLS', 'IAM', 'Encryption', 'Firewall'].map(
              (layer, i) => (
                <span
                  key={layer}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-gray-400"
                  style={{
                    opacity: inView ? 1 : 0,
                    transitionDelay: `${800 + i * 80}ms`,
                  }}
                >
                  <Lock size={10} className="text-cyan-400" />
                  {layer}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── 8. Monitoring & Observability Section ──────────────────────────────────

const MonitoringSection: React.FC = () => {
  const [ref, inView] = useInView<HTMLDivElement>();

  // Animated line paths
  const linePath1 = 'M0,80 C40,60 80,90 120,50 C160,10 200,70 240,40 C280,10 320,60 360,30 C400,0 440,50 480,20';
  const linePath2 = 'M0,60 C50,40 100,80 150,45 C200,10 250,65 300,35 C350,5 400,55 450,25 C475,10 490,30 500,20';

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.04),transparent_50%)]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left: Content */}
          <div
            className={`transition-all duration-1000 ${
              inView ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
            }`}
          >
            <SectionLabel>Monitoring & Observability</SectionLabel>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              See Everything. <GradientText>Respond Faster.</GradientText>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
              Gain visibility across applications and infrastructure with continuous monitoring,
              logging, alerts, and performance insights.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { label: 'Application Health', icon: Activity },
                { label: 'Server Status', icon: Server },
                { label: 'Deployment Status', icon: Rocket },
                { label: 'Response Time', icon: BarChart3 },
                { label: 'Error Monitoring', icon: Eye },
                { label: 'Infrastructure Activity', icon: Cpu },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${200 + i * 80}ms`,
                  }}
                >
                  <item.icon size={16} className="text-blue-600" />
                  <span className="text-xs font-semibold text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visualization */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              inView ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`}
          >
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
                  <span className="text-xs font-semibold text-gray-700">System Health</span>
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                  Live
                </span>
              </div>

              {/* Charts */}
              <div className="space-y-6">
                {/* Area Chart */}
                <div className="relative h-32 overflow-hidden rounded-xl bg-gradient-to-b from-blue-50 to-white p-4">
                  <svg
                    viewBox="0 0 500 100"
                    className="h-full w-full"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={`${linePath1} L500,100 L0,100 Z`}
                      fill="url(#areaGrad)"
                      style={{
                        opacity: inView ? 1 : 0,
                        transition: 'opacity 1s ease 0.5s',
                      }}
                    />
                    <path
                      d={linePath1}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{
                        strokeDasharray: 1000,
                        strokeDashoffset: inView ? 0 : 1000,
                        transition: 'stroke-dashoffset 2s ease 0.5s',
                      }}
                    />
                  </svg>
                  <div className="absolute left-4 top-3 text-[10px] font-medium text-blue-600">
                    CPU Usage
                  </div>
                </div>

                {/* Line Chart */}
                <div className="relative h-32 overflow-hidden rounded-xl bg-gradient-to-b from-cyan-50 to-white p-4">
                  <svg
                    viewBox="0 0 500 100"
                    className="h-full w-full"
                    preserveAspectRatio="none"
                  >
                    <path
                      d={linePath2}
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{
                        strokeDasharray: 1000,
                        strokeDashoffset: inView ? 0 : 1000,
                        transition: 'stroke-dashoffset 2s ease 0.8s',
                      }}
                    />
                  </svg>
                  <div className="absolute left-4 top-3 text-[10px] font-medium text-cyan-600">
                    Response Time
                  </div>
                </div>

                {/* Status Bars */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Uptime', value: '99.9%', color: 'bg-green-500' },
                    { label: 'Latency', value: '42ms', color: 'bg-blue-500' },
                    { label: 'Errors', value: '0.02%', color: 'bg-amber-500' },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-center"
                      style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(8px)',
                        transitionDelay: `${600 + i * 100}ms`,
                      }}
                    >
                      <div className={`mx-auto mb-2 h-1 w-8 rounded-full ${stat.color}`} />
                      <div className="text-sm font-bold text-gray-900">{stat.value}</div>
                      <div className="text-[10px] font-medium text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── 9. DevOps Workflow Section ─────────────────────────────────────────────

const workflowSteps = [
  { num: '01', label: 'Plan', icon: Layers },
  { num: '02', label: 'Code', icon: Code2 },
  { num: '03', label: 'Build', icon: Settings },
  { num: '04', label: 'Test', icon: TestTube },
  { num: '05', label: 'Secure', icon: Shield },
  { num: '06', label: 'Containerize', icon: Container },
  { num: '07', label: 'Deploy', icon: Rocket },
  { num: '08', label: 'Monitor', icon: Monitor },
];

const WorkflowSection: React.FC = () => {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-[#050a14] py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.05),transparent_60%)]" />

      <div ref={ref} className="relative mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel light>DevOps Workflow</SectionLabel>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Your Application's <GradientText>Journey to Production</GradientText>
          </h2>
        </div>

        <div className="relative mt-20">
          {/* Animated Line */}
          <div className="absolute left-[27px] top-0 h-full w-px bg-white/10 lg:left-1/2 lg:h-px lg:w-full lg:-translate-x-1/2 lg:translate-y-6">
            <div
              className="h-full w-full bg-gradient-to-b from-cyan-400 to-blue-500 transition-all duration-[2000ms] ease-out lg:bg-gradient-to-r"
              style={{
                width: inView ? '100%' : '0%',
                height: inView ? '100%' : '0%',
              }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-10 lg:grid lg:grid-cols-8 lg:gap-4 lg:space-y-0">
            {workflowSteps.map((step, i) => (
              <div
                key={step.num}
                className="relative flex items-start gap-6 lg:flex-col lg:items-center lg:gap-4 lg:text-center"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView
                    ? 'translateY(0)'
                    : i % 2 === 0
                      ? 'translateY(20px)'
                      : 'translateY(-20px)',
                  transition: `all 0.7s ease ${i * 150}ms`,
                }}
              >
                <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-[#0a1220] shadow-lg transition-all duration-500 hover:scale-110 hover:border-cyan-400/50 hover:shadow-cyan-500/20">
                  <step.icon size={22} className="text-cyan-400" />
                  <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-[9px] font-bold text-white">
                    {i + 1}
                  </div>
                </div>
                <div className="lg:mt-2">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-500/60">
                    {step.num}
                  </div>
                  <div className="text-sm font-semibold text-white">{step.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── 10. Business Benefits Section ──────────────────────────────────────────

const benefits = [
  { icon: Zap, title: 'Faster Releases', desc: 'Ship features in hours, not weeks.', stat: 10, suffix: 'x' },
  { icon: Layers, title: 'Scalable Infrastructure', desc: 'Grow without re-architecting.', stat: 99, suffix: '%' },
  { icon: Settings, title: 'Reduced Manual Work', desc: 'Automate repetitive operations.', stat: 80, suffix: '%' },
  { icon: Shield, title: 'Improved Reliability', desc: 'Resilient systems that stay up.', stat: 99, suffix: '.9%' },
  { icon: Lock, title: 'Better Security', desc: 'Security baked into every layer.', stat: 24, suffix: '/7' },
  { icon: RefreshCw, title: 'Continuous Delivery', desc: 'Always deployable code.', stat: 365, suffix: 'd' },
];

const BenefitsSection: React.FC = () => {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.04),transparent_50%)]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Business Benefits</SectionLabel>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Why Cloud & DevOps?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg">
            Transform your software delivery with measurable business outcomes.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => {
            const count = useCountUp(benefit.stat, 2000, inView);
            return (
              <div
                key={benefit.title}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(24px)',
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div className="absolute right-4 top-4 text-3xl font-bold text-gray-100 transition-colors duration-500 group-hover:text-blue-100">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <benefit.icon size={22} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{benefit.desc}</p>
                <div className="mt-4 text-2xl font-bold text-blue-600">
                  {count}
                  {benefit.suffix}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ─── 11. Technology Ecosystem Section ───────────────────────────────────────

const techCategories = [
  {
    category: 'Cloud',
    items: ['AWS', 'Azure', 'Google Cloud'],
    color: 'from-blue-500 to-blue-600',
  },
  {
    category: 'DevOps',
    items: ['GitHub', 'GitLab', 'Jenkins'],
    color: 'from-cyan-500 to-teal-500',
  },
  {
    category: 'Containers',
    items: ['Docker', 'Kubernetes'],
    color: 'from-indigo-500 to-blue-500',
  },
  {
    category: 'Infrastructure',
    items: ['Terraform'],
    color: 'from-teal-500 to-cyan-500',
  },
  {
    category: 'Monitoring',
    items: ['Prometheus', 'Grafana'],
    color: 'from-amber-500 to-orange-500',
  },
];

const TechSection: React.FC = () => {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-[#050a14] py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05),transparent_65%)]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel light>Technology Ecosystem</SectionLabel>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Powered by <GradientText>Industry Leaders</GradientText>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-400 sm:text-lg">
            We work with the most trusted tools and platforms in cloud and DevOps.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {techCategories.map((cat, i) => (
            <div
              key={cat.category}
              className="group rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-400/25 hover:bg-white/[0.06]"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <div
                className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${cat.color} text-white shadow-md transition-transform duration-500 group-hover:scale-110`}
              >
                {i === 0 && <Cloud size={18} />}
                {i === 1 && <GitMerge size={18} />}
                {i === 2 && <Container size={18} />}
                {i === 3 && <Settings size={18} />}
                {i === 4 && <LineChart size={18} />}
              </div>
              <h3 className="text-sm font-semibold text-white">{cat.category}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="inline-block rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-gray-400 transition-all duration-300 group-hover:border-cyan-400/20 group-hover:text-cyan-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── 12. Final CTA Section ──────────────────────────────────────────────────

const CTASection: React.FC = () => {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section
      id="cta"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-[#050a14] via-[#07112a] to-[#050a14] py-24 lg:py-32"
    >
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-cyan-400/5"
            style={{
              width: `${200 + i * 120}px`,
              height: `${200 + i * 120}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: `pulseRing ${4 + i}s ease-in-out ${i * 0.5}s infinite`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div
          className={`transition-all duration-1000 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <SectionLabel light>Get Started</SectionLabel>
          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to Build a Smarter{' '}
            <GradientText>Cloud Infrastructure?</GradientText>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Transform your software delivery with cloud infrastructure and DevOps automation
            designed around your business.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/40"
            >
              <span className="relative z-10">Start a Conversation</span>
              <ArrowRight
                size={18}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#solutions"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-cyan-400/40 hover:bg-white/10"
            >
              Explore Solutions
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulseRing {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.1; transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </section>
  );
};

// ─── Main App ───────────────────────────────────────────────────────────────

const CloudDevOpsShowcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-white antialiased">
      <HeroSection />
      <CapabilityStrip />
      <IntroSection />
      <SolutionsSection />
      <DevOpsSection />
      <IaCSection />
      <SecuritySection />
      <MonitoringSection />
      <WorkflowSection />
      <BenefitsSection />
      <TechSection />
      <CTASection />
    </div>
  );
};

export default CloudDevOpsShowcase;