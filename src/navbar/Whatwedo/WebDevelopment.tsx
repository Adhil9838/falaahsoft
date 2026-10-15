import React, { useEffect, useRef, useState } from 'react';
import {
  Globe,
  ShoppingCart,
  Users,
  Building2,
  Truck,
  Cpu,
  ChevronRight,
  Layers,
  Database,
  CreditCard,
  Cloud,
  BarChart3,
  Plug,
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  Heart,
  Store,
  Landmark,
  GraduationCap,
  Factory,
  Briefcase,
  ArrowRight,
  Mail,
  MessageSquare,
  MapPin,
  Phone,
  Search,
  Bell,
  Settings,
  TrendingUp,
  DollarSign,
  Package,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Activity,
  FileText,
  Box,
  Lock,

  Headphones,
  Wrench,
  Gauge,
  Smartphone as SmartphoneIcon,
  Layout,
  Server,
  Code2,
  GitBranch,
  Workflow,
  Blocks,
  Fingerprint,
  Wallet,
  CloudCog,
  Rocket,

} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FeatureCard {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface BuildCard {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface WorkflowStep {
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface IntegrationItem {
  label: string;
  icon: React.ReactNode;
}

interface CapabilityItem {
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface IndustryItem {
  label: string;
  icon: React.ReactNode;
  color: string;
}

// ---------------------------------------------------------------------------
// Utility: Intersection Observer Hook for scroll animations
// ---------------------------------------------------------------------------

function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement|null>, boolean] {
  const ref = useRef<HTMLDivElement|null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
}

// ---------------------------------------------------------------------------
// Utility: Smooth scroll helper
// ---------------------------------------------------------------------------

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ---------------------------------------------------------------------------
// Utility: Staggered animation style helper
// ---------------------------------------------------------------------------



// ---------------------------------------------------------------------------
// Animated Section Wrapper
// ---------------------------------------------------------------------------

const AnimatedSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}> = ({ children, className = '', id, delay = 0 }) => {
  const [ref, isInView] = useInView();
  return (
    <div
      ref={ref}
      id={id}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// ===========================================================================
// MAIN COMPONENT
// ===========================================================================

const WebDevelopment: React.FC = () => {
  // -----------------------------------------------------------------------
  // Hero animation state
  // -----------------------------------------------------------------------
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // -----------------------------------------------------------------------
  // Browser mockup animation
  // -----------------------------------------------------------------------
  const [browserRef, browserInView] = useInView(0.2);

  // -----------------------------------------------------------------------
  // Workflow animation
  // -----------------------------------------------------------------------
  const [workflowRef, workflowInView] = useInView(0.15);

  // -----------------------------------------------------------------------
  // Integrations hover
  // -----------------------------------------------------------------------
  const [hoveredIntegration, setHoveredIntegration] = useState<number | null>(null);

  // -----------------------------------------------------------------------
  // Build cards hover
  // -----------------------------------------------------------------------
  const [hoveredBuildCard, setHoveredBuildCard] = useState<number | null>(null);

  // -----------------------------------------------------------------------
  // Data
  // -----------------------------------------------------------------------

  const featureCards: FeatureCard[] = [
    {
      number: '01',
      title: 'Custom Experiences',
      description: 'Interfaces designed around your users and business requirements.',
      icon: <Layout className="h-6 w-6" />,
    },
    {
      number: '02',
      title: 'Scalable Applications',
      description: 'Reliable web applications built to grow with your business.',
      icon: <Rocket className="h-6 w-6" />,
    },
    {
      number: '03',
      title: 'Connected Systems',
      description:
        'Seamless integration with APIs, payment systems, communication tools, and third-party platforms.',
      icon: <GitBranch className="h-6 w-6" />,
    },
  ];

  const buildCards: BuildCard[] = [
    {
      number: '01',
      title: 'Business Websites',
      description: 'Modern corporate, service, product, and landing websites.',
      icon: <Globe className="h-6 w-6" />,
    },
    {
      number: '02',
      title: 'E-Commerce Platforms',
      description:
        'Complete shopping experiences with products, cart, checkout, payments, and orders.',
      icon: <ShoppingCart className="h-6 w-6" />,
    },
    {
      number: '03',
      title: 'CRM Applications',
      description:
        'Customer, lead, communication, workflow, and business-process platforms.',
      icon: <Users className="h-6 w-6" />,
    },
    {
      number: '04',
      title: 'Real Estate Platforms',
      description:
        'Property listings, enquiries, lead workflows, agents, and customer experiences.',
      icon: <Building2 className="h-6 w-6" />,
    },
    {
      number: '05',
      title: 'Logistics Platforms',
      description:
        'Shipment, delivery, tracking, operations, and workflow applications.',
      icon: <Truck className="h-6 w-6" />,
    },
    {
      number: '06',
      title: 'Custom Business Applications',
      description:
        'Purpose-built software designed around unique business processes.',
      icon: <Cpu className="h-6 w-6" />,
    },
  ];

  const workflowSteps: WorkflowStep[] = [
    {
      label: 'Customer',
      icon: <Users className="h-5 w-5" />,
      description: 'End user interaction',
    },
    {
      label: 'Website / App',
      icon: <Globe className="h-5 w-5" />,
      description: 'Frontend experience',
    },
    {
      label: 'API',
      icon: <Plug className="h-5 w-5" />,
      description: 'Communication layer',
    },
    {
      label: 'Business Logic',
      icon: <Cpu className="h-5 w-5" />,
      description: 'Core processing',
    },
    {
      label: 'Database',
      icon: <Database className="h-5 w-5" />,
      description: 'Data storage',
    },
    {
      label: 'External Services',
      icon: <Cloud className="h-5 w-5" />,
      description: 'Third-party tools',
    },
  ];

  const integrations: IntegrationItem[] = [
    { label: 'Payment Gateway', icon: <CreditCard className="h-5 w-5" /> },
    { label: 'Email', icon: <Mail className="h-5 w-5" /> },
    { label: 'SMS', icon: <MessageSquare className="h-5 w-5" /> },
    { label: 'WhatsApp', icon: <Phone className="h-5 w-5" /> },
    { label: 'Maps', icon: <MapPin className="h-5 w-5" /> },
    { label: 'Cloud Services', icon: <Cloud className="h-5 w-5" /> },
    { label: 'Analytics', icon: <BarChart3 className="h-5 w-5" /> },
    { label: 'Third-Party APIs', icon: <Plug className="h-5 w-5" /> },
  ];

  const capabilities: CapabilityItem[] = [
    {
      label: 'Frontend Development',
      icon: <Layout className="h-5 w-5" />,
      description: 'Beautiful, responsive user interfaces',
    },
    {
      label: 'Backend Development',
      icon: <Server className="h-5 w-5" />,
      description: 'Robust server-side systems',
    },
    {
      label: 'API Development',
      icon: <Code2 className="h-5 w-5" />,
      description: 'Clean, documented endpoints',
    },
    {
      label: 'Database Integration',
      icon: <Database className="h-5 w-5" />,
      description: 'Efficient data management',
    },
    {
      label: 'Authentication',
      icon: <Fingerprint className="h-5 w-5" />,
      description: 'Secure user access control',
    },
    {
      label: 'Payment Integration',
      icon: <Wallet className="h-5 w-5" />,
      description: 'Seamless transaction flows',
    },
    {
      label: 'Cloud Integration',
      icon: <CloudCog className="h-5 w-5" />,
      description: 'Scalable cloud infrastructure',
    },
    {
      label: 'Performance Optimization',
      icon: <Gauge className="h-5 w-5" />,
      description: 'Fast, efficient experiences',
    },
    {
      label: 'Responsive Design',
      icon: <SmartphoneIcon className="h-5 w-5" />,
      description: 'Every screen, every device',
    },
    {
      label: 'Third-Party Integrations',
      icon: <Blocks className="h-5 w-5" />,
      description: 'Connect your favorite tools',
    },
    {
      label: 'Business Automation',
      icon: <Workflow className="h-5 w-5" />,
      description: 'Streamline your operations',
    },
    {
      label: 'Maintenance & Support',
      icon: <Wrench className="h-5 w-5" />,
      description: 'Ongoing reliability & care',
    },
  ];

  const industries: IndustryItem[] = [
    { label: 'Healthcare', icon: <Heart className="h-5 w-5" />, color: 'from-rose-500/20 to-pink-500/20' },
    { label: 'Retail', icon: <Store className="h-5 w-5" />, color: 'from-amber-500/20 to-orange-500/20' },
    { label: 'Real Estate', icon: <Building2 className="h-5 w-5" />, color: 'from-emerald-500/20 to-teal-500/20' },
    { label: 'Logistics', icon: <Truck className="h-5 w-5" />, color: 'from-blue-500/20 to-indigo-500/20' },
    { label: 'Finance', icon: <Landmark className="h-5 w-5" />, color: 'from-violet-500/20 to-purple-500/20' },
    { label: 'Education', icon: <GraduationCap className="h-5 w-5" />, color: 'from-cyan-500/20 to-sky-500/20' },
    { label: 'Manufacturing', icon: <Factory className="h-5 w-5" />, color: 'from-slate-500/20 to-gray-500/20' },
    { label: 'Professional Services', icon: <Briefcase className="h-5 w-5" />, color: 'from-yellow-500/20 to-amber-500/20' },
  ];

  const heroCapabilities = [
    'Websites',
    'Web Applications',
    'E-Commerce',
    'CRM',
    'Business Platforms',
    'API Integrations',
  ];

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-[#05070d] text-white overflow-x-hidden">
      {/* ================================================================= */}
      {/* 1. HERO SECTION                                                   */}
      {/* ================================================================= */}
      <section
        id="hero"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      >
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80"
        >
          <source
            src=""
            type="video/mp4"
          />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070d]/80 via-[#05070d]/70 to-[#05070d]" />

        {/* Subtle gradient orbs */}
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px]" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center sm:px-8">
          {/* Badge */}
          <div
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-300 backdrop-blur-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            Web Development
          </div>

          {/* Heading */}
          <h1
            className="mx-auto max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.9s ease 0.35s, transform 0.9s ease 0.35s',
            }}
          >
            Digital Experiences{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Built Around
            </span>{' '}
            Your Business
          </h1>

          {/* Supporting text */}
          <p
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.9s ease 0.5s, transform 0.9s ease 0.5s',
            }}
          >
            We design and develop modern websites and powerful web applications that help
            businesses connect, automate, and scale.
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.9s ease 0.65s, transform 0.9s ease 0.65s',
            }}
          >
            <button
              onClick={() => scrollToSection('what-we-build')}
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/40 hover:brightness-110 sm:w-auto"
            >
              Explore Our Solutions
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToSection('capabilities')}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 sm:w-auto"
            >
              View Capabilities
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Capability strip */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-gradient-to-t from-[#05070d] to-transparent"
          style={{
            opacity: heroVisible ? 1 : 0,
            transition: 'opacity 1s ease 0.9s',
          }}
        >
          <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-6 py-5 sm:justify-center sm:gap-8 sm:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {heroCapabilities.map((cap) => (
              <span
                key={cap}
                className="whitespace-nowrap text-xs font-medium uppercase tracking-wider text-gray-400 transition-colors duration-300 hover:text-blue-300"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. INTRODUCTION SECTION                                           */}
      {/* ================================================================= */}
      <section id="introduction" className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/5 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              From Business Ideas to{' '}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Digital Products
              </span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-gray-400 sm:text-lg">
              Whether you need a high-converting business website, a customer-facing platform,
              or a custom business application, we build digital solutions around your
              workflows, customers, and goals.
            </p>
          </AnimatedSection>

          {/* Feature cards */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((card, i) => (
              <AnimatedSection key={card.number} delay={0.1 + i * 0.12}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-blue-600/10">
                  {/* Glow */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-600/0 blur-[80px] transition-all duration-700 group-hover:bg-blue-600/20" />

                  <div className="relative">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 text-blue-400 transition-all duration-500 group-hover:scale-110 group-hover:from-blue-600/30 group-hover:to-indigo-600/30 group-hover:text-blue-300">
                        {card.icon}
                      </div>
                      <span className="text-4xl font-bold text-white/10 transition-colors duration-500 group-hover:text-blue-500/20">
                        {card.number}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-blue-300">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-400">
                      {card.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. WHAT WE BUILD                                                  */}
      {/* ================================================================= */}
      <section id="what-we-build" className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute right-0 top-1/4 h-[600px] w-[600px] rounded-full bg-indigo-600/5 blur-[180px]" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              What We Build
            </h2>
            <p className="mt-4 text-base text-gray-400 sm:text-lg">
              Digital products designed for real business needs.
            </p>
          </AnimatedSection>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {buildCards.map((card, i) => (
              <AnimatedSection key={card.number} delay={0.08 + i * 0.08}>
                <div
                  onMouseEnter={() => setHoveredBuildCard(i)}
                  onMouseLeave={() => setHoveredBuildCard(null)}
                  className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.03] to-transparent p-7 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-600/10"
                >
                  {/* Animated border glow */}
                  <div
                    className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                      hoveredBuildCard === i ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      background:
                        'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59,130,246,0.08), transparent 40%)',
                    }}
                  />

                  {/* Background glow */}
                  <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-blue-600/0 blur-[90px] transition-all duration-700 group-hover:bg-blue-600/15" />

                  <div className="relative">
                    <div className="mb-5 flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-blue-400 transition-all duration-500 group-hover:bg-blue-600/20 group-hover:text-blue-300">
                        {card.icon}
                      </div>
                      <span className="text-3xl font-bold text-white/8 transition-colors duration-500 group-hover:text-blue-500/15">
                        {card.number}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-white transition-colors duration-300 group-hover:text-blue-300">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-400">
                      {card.description}
                    </p>

                    <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-blue-400 opacity-0 transition-all duration-500 group-hover:opacity-100">
                      <span>Explore</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. WEB APPLICATION EXPERIENCE                                     */}
      {/* ================================================================= */}
      <section id="application" className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/5 blur-[200px]" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-300">
              <Monitor className="h-3.5 w-3.5" />
              Application Showcase
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              A Modern Web Application
            </h2>
            <p className="mt-4 text-base text-gray-400 sm:text-lg">
              Purpose-built interfaces that put your business data and workflows at your
              fingertips.
            </p>
          </AnimatedSection>

          {/* Browser mockup */}
          <div
            ref={browserRef}
            className="relative mx-auto mt-16 max-w-5xl"
            style={{
              opacity: browserInView ? 1 : 0,
              transform: browserInView ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.96)',
              transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {/* Floating labels */}
            <div className="pointer-events-none absolute -left-4 top-16 z-20 hidden lg:block">
              <div className="animate-float rounded-lg border border-blue-500/30 bg-blue-600/10 px-3 py-1.5 text-xs font-medium text-blue-300 backdrop-blur-md">
                Responsive UI
              </div>
            </div>
            <div className="pointer-events-none absolute -right-4 top-32 z-20 hidden lg:block">
              <div className="animate-float-delayed rounded-lg border border-emerald-500/30 bg-emerald-600/10 px-3 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-md">
                Secure Authentication
              </div>
            </div>
            <div className="pointer-events-none absolute -left-8 bottom-40 z-20 hidden lg:block">
              <div className="animate-float-delayed-2 rounded-lg border border-violet-500/30 bg-violet-600/10 px-3 py-1.5 text-xs font-medium text-violet-300 backdrop-blur-md">
                Real-time Data
              </div>
            </div>
            <div className="pointer-events-none absolute -right-8 bottom-56 z-20 hidden lg:block">
              <div className="animate-float rounded-lg border border-amber-500/30 bg-amber-600/10 px-3 py-1.5 text-xs font-medium text-amber-300 backdrop-blur-md">
                API Integration
              </div>
            </div>
            <div className="pointer-events-none absolute -right-2 top-2 z-20 hidden lg:block">
              <div className="animate-float-delayed rounded-lg border border-pink-500/30 bg-pink-600/10 px-3 py-1.5 text-xs font-medium text-pink-300 backdrop-blur-md">
                Business Automation
              </div>
            </div>

            {/* Browser frame */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0e17] shadow-2xl shadow-black/50">
              {/* Browser top bar */}
              <div className="flex items-center gap-3 border-b border-white/5 bg-white/[0.02] px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/70" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                  <div className="h-3 w-3 rounded-full bg-green-500/70" />
                </div>
                <div className="ml-4 flex flex-1 items-center gap-2 rounded-md bg-white/5 px-3 py-1.5">
                  <Lock className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-500">app.yourcompany.com/dashboard</span>
                </div>
                <div className="flex gap-2">
                  <div className="h-5 w-5 rounded bg-white/5" />
                  <div className="h-5 w-5 rounded bg-white/5" />
                </div>
              </div>

              {/* App interface */}
              <div className="flex min-h-[400px] sm:min-h-[480px]">
                {/* Sidebar */}
                <div className="hidden w-48 shrink-0 flex-col border-r border-white/5 bg-white/[0.01] p-4 sm:flex">
                  <div className="mb-6 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
                      <Box className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-white">Platform</span>
                  </div>
                  <nav className="space-y-1">
                    {[
                      { icon: <Layout className="h-3.5 w-3.5" />, label: 'Dashboard', active: true },
                      { icon: <Users className="h-3.5 w-3.5" />, label: 'Customers' },
                      { icon: <Package className="h-3.5 w-3.5" />, label: 'Products' },
                      { icon: <FileText className="h-3.5 w-3.5" />, label: 'Orders' },
                      { icon: <BarChart3 className="h-3.5 w-3.5" />, label: 'Analytics' },
                      { icon: <Settings className="h-3.5 w-3.5" />, label: 'Settings' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-colors ${
                          item.active
                            ? 'bg-blue-600/15 text-blue-300'
                            : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Main content */}
                <div className="flex-1 p-4 sm:p-6">
                  {/* Top bar */}
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 sm:max-w-xs">
                      <Search className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-xs text-gray-500">Search...</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Bell className="h-4 w-4 text-gray-500" />
                        <div className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-blue-500" />
                      </div>
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500" />
                    </div>
                  </div>

                  {/* Data cards */}
                  <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {[
                      { label: 'Revenue', value: '$48.2K', change: '+12.5%', icon: <DollarSign className="h-3.5 w-3.5" />, color: 'text-emerald-400' },
                      { label: 'Orders', value: '1,284', change: '+8.2%', icon: <Package className="h-3.5 w-3.5" />, color: 'text-blue-400' },
                      { label: 'Customers', value: '3,847', change: '+5.1%', icon: <Users className="h-3.5 w-3.5" />, color: 'text-violet-400' },
                      { label: 'Conversion', value: '3.24%', change: '+0.8%', icon: <TrendingUp className="h-3.5 w-3.5" />, color: 'text-amber-400' },
                    ].map((card) => (
                      <div
                        key={card.label}
                        className="rounded-xl border border-white/5 bg-white/[0.02] p-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                            {card.label}
                          </span>
                          <span className={card.color}>{card.icon}</span>
                        </div>
                        <div className="mt-1.5 text-sm font-bold text-white">{card.value}</div>
                        <div className="mt-0.5 text-[10px] font-medium text-emerald-400">
                          {card.change}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Charts + Activity row */}
                  <div className="mb-5 grid gap-3 lg:grid-cols-5">
                    {/* Chart area */}
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 lg:col-span-3">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">Revenue Overview</span>
                        <div className="flex gap-1">
                          <div className="rounded bg-blue-600/20 px-2 py-0.5 text-[9px] text-blue-300">Week</div>
                          <div className="rounded px-2 py-0.5 text-[9px] text-gray-500">Month</div>
                        </div>
                      </div>
                      {/* Animated bar chart */}
                      <div className="flex h-24 items-end gap-2">
                        {[45, 62, 38, 75, 55, 82, 48, 68, 42, 78, 58, 88].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t bg-gradient-to-t from-blue-600/40 to-blue-400/80 transition-all duration-1000"
                            style={{
                              height: browserInView ? `${h}%` : '0%',
                              transitionDelay: `${0.5 + i * 0.05}s`,
                            }}
                          />
                        ))}
                      </div>
                      <div className="mt-2 flex justify-between text-[9px] text-gray-600">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                      </div>
                    </div>

                    {/* Activity timeline */}
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 lg:col-span-2">
                      <span className="text-xs font-semibold text-white">Recent Activity</span>
                      <div className="mt-3 space-y-3">
                        {[
                          { icon: <CheckCircle2 className="h-3 w-3" />, text: 'Order #2847 confirmed', time: '2m ago', color: 'text-emerald-400' },
                          { icon: <UserCheck className="h-3 w-3" />, text: 'New customer registered', time: '15m ago', color: 'text-blue-400' },
                          { icon: <AlertCircle className="h-3 w-3" />, text: 'Payment pending review', time: '1h ago', color: 'text-amber-400' },
                          { icon: <Activity className="h-3 w-3" />, text: 'Inventory updated', time: '2h ago', color: 'text-violet-400' },
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <div className={`mt-0.5 ${item.color}`}>{item.icon}</div>
                            <div className="flex-1">
                              <div className="text-[11px] text-gray-300">{item.text}</div>
                              <div className="text-[9px] text-gray-600">{item.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recent transactions table */}
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">Recent Transactions</span>
                      <div className="flex items-center gap-1 text-[10px] font-medium text-blue-400">
                        View All <ChevronRight className="h-3 w-3" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[
                        { id: '#TXN-8421', customer: 'Acme Corp', amount: '$1,240.00', status: 'Completed', color: 'bg-emerald-500/15 text-emerald-400' },
                        { id: '#TXN-8420', customer: 'Globex Inc', amount: '$3,580.00', status: 'Processing', color: 'bg-blue-500/15 text-blue-400' },
                        { id: '#TXN-8419', customer: 'Initech LLC', amount: '$890.00', status: 'Completed', color: 'bg-emerald-500/15 text-emerald-400' },
                        { id: '#TXN-8418', customer: 'Umbrella Co', amount: '$2,150.00', status: 'Pending', color: 'bg-amber-500/15 text-amber-400' },
                      ].map((tx) => (
                        <div
                          key={tx.id}
                          className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3 py-2"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono text-gray-500">{tx.id}</span>
                            <span className="text-[11px] text-gray-300">{tx.customer}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] font-medium text-white">{tx.amount}</span>
                            <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${tx.color}`}>
                              {tx.status}
                            </span>
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

      {/* ================================================================= */}
      {/* 5. BUSINESS WORKFLOW                                              */}
      {/* ================================================================= */}
      <section id="workflow" className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute right-1/4 top-0 h-[500px] w-[500px] rounded-full bg-violet-600/5 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-300">
              <Workflow className="h-3.5 w-3.5" />
              Connected Ecosystem
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Connect Every Part of Your Business
            </h2>
            <p className="mt-4 text-base text-gray-400 sm:text-lg">
              Bring your customer experience, business processes, data, and third-party
              services together in one connected digital ecosystem.
            </p>
          </AnimatedSection>

          {/* Workflow steps */}
          <div ref={workflowRef} className="relative mt-16">
            {/* Connection line - desktop */}
            <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 lg:block">
              <div
                className="h-full bg-gradient-to-r from-blue-600/0 via-blue-500/50 to-blue-600/0 transition-all duration-2000"
                style={{
                  transform: workflowInView ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 1.5s cubic-bezier(0.16,1,0.3,1) 0.3s',
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-3">
              {workflowSteps.map((step, i) => (
                <div
                  key={step.label}
                  className="relative"
                  style={{
                    opacity: workflowInView ? 1 : 0,
                    transform: workflowInView ? 'translateY(0)' : 'translateY(30px)',
                    transition: `opacity 0.7s ease ${0.2 + i * 0.12}s, transform 0.7s ease ${0.2 + i * 0.12}s`,
                  }}
                >
                  <div className="group flex flex-col items-center rounded-2xl border border-white/8 bg-white/[0.02] p-5 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30 hover:bg-white/[0.04] hover:shadow-xl hover:shadow-blue-600/10">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 text-blue-400 transition-all duration-500 group-hover:scale-110 group-hover:from-blue-600/30 group-hover:to-indigo-600/30 group-hover:text-blue-300">
                      {step.icon}
                    </div>
                    <span className="text-xs font-semibold text-white sm:text-sm">
                      {step.label}
                    </span>
                    <span className="mt-1 text-[10px] text-gray-500">{step.description}</span>
                  </div>

                  {/* Arrow between steps - mobile */}
                  {i < workflowSteps.length - 1 && (
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-blue-500/40 lg:hidden">
                      <ChevronRight className="h-3 w-3 rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 6. THIRD-PARTY INTEGRATIONS                                       */}
      {/* ================================================================= */}
      <section id="integrations" className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute left-0 top-1/3 h-[500px] w-[500px] rounded-full bg-cyan-600/5 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
              <Plug className="h-3.5 w-3.5" />
              Integrations
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Integrate With the Tools You Already Use
            </h2>
            <p className="mt-4 text-base text-gray-400 sm:text-lg">
              Connect your web platform with the services that power your business.
            </p>
          </AnimatedSection>

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {integrations.map((item, i) => (
              <AnimatedSection key={item.label} delay={0.06 + i * 0.06}>
                <div
                  onMouseEnter={() => setHoveredIntegration(i)}
                  onMouseLeave={() => setHoveredIntegration(null)}
                  className="group relative flex flex-col items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-6 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/30 hover:bg-white/[0.04] hover:shadow-xl hover:shadow-cyan-600/10"
                >
                  {/* Connection dot animation */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2">
                    <div
                      className={`h-3 w-3 rounded-full bg-cyan-400/60 transition-all duration-500 ${
                        hoveredIntegration === i ? 'scale-150 opacity-100' : 'scale-100 opacity-30'
                      }`}
                    />
                    <div
                      className={`absolute inset-0 h-3 w-3 rounded-full bg-cyan-400/30 transition-all duration-700 ${
                        hoveredIntegration === i ? 'scale-[2.5] opacity-0' : 'scale-0 opacity-0'
                      }`}
                    />
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-cyan-400 transition-all duration-500 group-hover:bg-cyan-600/20 group-hover:text-cyan-300">
                    {item.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-300 transition-colors duration-300 group-hover:text-white">
                    {item.label}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 7. RESPONSIVE DEVELOPMENT                                         */}
      {/* ================================================================= */}
      <section id="responsive" className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute right-1/3 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-blue-600/5 blur-[180px]" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-300">
              <Monitor className="h-3.5 w-3.5" />
              Responsive Development
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              One Experience. Every Screen.
            </h2>
            <p className="mt-4 text-base text-gray-400 sm:text-lg">
              Responsive interfaces that provide a consistent experience across desktops,
              tablets, and mobile devices.
            </p>
          </AnimatedSection>

          <div className="mt-16 flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-end lg:gap-6">
            {/* Desktop */}
            <AnimatedSection delay={0.1} className="w-full max-w-sm lg:max-w-md">
              <div className="group">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0e17] shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:border-blue-500/30">
                  <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-3 py-2">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-red-500/60" />
                      <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
                      <div className="h-2 w-2 rounded-full bg-green-500/60" />
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex gap-2">
                      <div className="h-16 w-12 rounded bg-white/5" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3 w-3/4 rounded bg-white/10" />
                        <div className="h-2 w-1/2 rounded bg-white/5" />
                        <div className="flex gap-1 pt-1">
                          <div className="h-8 flex-1 rounded bg-blue-600/20" />
                          <div className="h-8 flex-1 rounded bg-white/5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Monitor className="h-3.5 w-3.5" />
                  Desktop
                </div>
              </div>
            </AnimatedSection>

            {/* Laptop */}
            <AnimatedSection delay={0.2} className="w-full max-w-xs lg:max-w-sm">
              <div className="group">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0e17] shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:border-blue-500/30">
                  <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-3 py-2">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-red-500/60" />
                      <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex gap-2">
                      <div className="h-12 w-10 rounded bg-white/5" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-2.5 w-3/4 rounded bg-white/10" />
                        <div className="h-2 w-1/2 rounded bg-white/5" />
                        <div className="h-6 rounded bg-blue-600/20" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Laptop className="h-3.5 w-3.5" />
                  Laptop
                </div>
              </div>
            </AnimatedSection>

            {/* Tablet */}
            <AnimatedSection delay={0.3} className="w-full max-w-[200px]">
              <div className="group">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0e17] shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:border-blue-500/30">
                  <div className="p-3">
                    <div className="space-y-2">
                      <div className="h-2.5 w-3/4 rounded bg-white/10" />
                      <div className="h-2 w-1/2 rounded bg-white/5" />
                      <div className="flex gap-1.5">
                        <div className="h-6 flex-1 rounded bg-blue-600/20" />
                        <div className="h-6 flex-1 rounded bg-white/5" />
                      </div>
                      <div className="h-2 w-full rounded bg-white/5" />
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Tablet className="h-3.5 w-3.5" />
                  Tablet
                </div>
              </div>
            </AnimatedSection>

            {/* Mobile */}
            <AnimatedSection delay={0.4} className="w-full max-w-[140px]">
              <div className="group">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0e17] shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:border-blue-500/30">
                  <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-white/10" />
                  <div className="p-3">
                    <div className="space-y-2">
                      <div className="h-2 w-3/4 rounded bg-white/10" />
                      <div className="h-5 rounded bg-blue-600/20" />
                      <div className="h-2 w-1/2 rounded bg-white/5" />
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Smartphone className="h-3.5 w-3.5" />
                  Mobile
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 8. DEVELOPMENT CAPABILITIES                                       */}
      {/* ================================================================= */}
      <section id="capabilities" className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-indigo-600/5 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-300">
              <Layers className="h-3.5 w-3.5" />
              Capabilities
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Development Capabilities
            </h2>
            <p className="mt-4 text-base text-gray-400 sm:text-lg">
              Everything you need to bring your digital product to life.
            </p>
          </AnimatedSection>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {capabilities.map((cap, i) => (
              <AnimatedSection key={cap.label} delay={0.04 + i * 0.04}>
                <div className="group flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-indigo-600/10">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600/20 to-violet-600/20 text-indigo-400 transition-all duration-500 group-hover:scale-110 group-hover:text-indigo-300">
                    {cap.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white transition-colors duration-300 group-hover:text-indigo-300">
                      {cap.label}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">{cap.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 9. INDUSTRY FLEXIBILITY                                           */}
      {/* ================================================================= */}
      <section id="industries" className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-emerald-600/5 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-300">
              <Briefcase className="h-3.5 w-3.5" />
              Industry Flexibility
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Built for Different Business Models
            </h2>
            <p className="mt-4 text-base text-gray-400 sm:text-lg">
              From customer-facing websites to complex business platforms, our development
              approach adapts to your industry and workflow.
            </p>
          </AnimatedSection>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {industries.map((industry, i) => (
              <AnimatedSection key={industry.label} delay={0.06 + i * 0.06}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-6 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-white/15 hover:bg-white/[0.04] hover:shadow-xl">
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${industry.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />
                  <div className="relative">
                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition-all duration-500 group-hover:scale-110 group-hover:bg-white/10 group-hover:text-white">
                      {industry.icon}
                    </div>
                    <span className="text-xs font-medium text-gray-300 transition-colors duration-300 group-hover:text-white">
                      {industry.label}
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 10. FINAL CTA                                                     */}
      {/* ================================================================= */}
      <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
        {/* Animated background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse-slow rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse-slow-delayed rounded-full bg-indigo-600/10 blur-[120px]" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse-slower rounded-full bg-violet-600/8 blur-[100px]" />
        </div>

        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8">
          <AnimatedSection>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-300 backdrop-blur-sm">
              <Rocket className="h-3.5 w-3.5" />
              Let's Build Together
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Have a Business Idea?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base text-gray-400 sm:text-lg">
              Let's turn your requirements into a powerful digital experience.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={() => scrollToSection('contact')}
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/40 hover:brightness-110 sm:w-auto"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-700 group-hover:translate-x-full" />
                Start a Project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 sm:w-auto"
              >
                <Headphones className="h-4 w-4" />
                Talk to Our Team
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================= */}
      {/* FOOTER (minimal, inline)                                          */}
      {/* ================================================================= */}
      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row sm:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
              <Box className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold text-white">Web Development Solutions</span>
          </div>
          <p className="text-xs text-gray-600">
            Digital products built around your business.
          </p>
        </div>
      </footer>

      {/* ================================================================= */}
      {/* GLOBAL STYLES (inline)                                            */}
      {/* ================================================================= */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed-2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        @keyframes pulse-slow-delayed {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.15); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite 0.5s;
        }
        .animate-float-delayed-2 {
          animation: float-delayed-2 4.5s ease-in-out infinite 1s;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-pulse-slow-delayed {
          animation: pulse-slow-delayed 10s ease-in-out infinite 2s;
        }
        .animate-pulse-slower {
          animation: pulse-slower 12s ease-in-out infinite 1s;
        }
        html {
          scroll-behavior: smooth;
        }
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default WebDevelopment;