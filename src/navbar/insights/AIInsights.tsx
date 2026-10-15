import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Brain,
  Sparkles,
  Bot,
  TrendingUp,
  Eye,
  MessageSquare,
  Layers,
  Database,
  Cloud,
  Workflow,
  Code2,
  Search,
  Shield,
  Lock,
  Users,
  Lightbulb,
  Activity,
  FileText,
  ArrowRight,
  ArrowDown,
  Zap,
  BarChart3,
  Building2,
  ShoppingBag,
  HeartPulse,
  Factory,
  Truck,
  Home,
  GraduationCap,
  Headphones,
  Network,
  GitBranch,
  RefreshCw,
  Target,
  Gauge,
  LineChart,
  Boxes,
  Terminal,
  CircleDot,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface AIFeature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface TechItem {
  icon: React.ElementType;
  name: string;
  description: string;
}

interface IndustryItem {
  icon: React.ElementType;
  name: string;
  description: string;
  accent: string;
}

interface ArticleItem {
  category: string;
  title: string;
  description: string;
  meta: string;
}

interface CapabilityItem {
  icon: React.ElementType;
  label: string;
}

interface WorkflowStage {
  label: string;
  icon: React.ElementType;
  description: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const aiLandscape: AIFeature[] = [
  {
    icon: Sparkles,
    title: 'Generative AI',
    description: 'Create and transform text, images, code, and other content with foundation models.',
  },
  {
    icon: Bot,
    title: 'AI Agents',
    description: 'Intelligent systems that reason through multi-step tasks and orchestrate workflows.',
  },
  {
    icon: TrendingUp,
    title: 'Predictive AI',
    description: 'Identify hidden patterns and forecast future business outcomes with confidence.',
  },
  {
    icon: Eye,
    title: 'Computer Vision',
    description: 'Extract meaningful information from images, video, and visual data streams.',
  },
  {
    icon: MessageSquare,
    title: 'Natural Language Processing',
    description: 'Understand, analyze, and process human language at enterprise scale.',
  },
  {
    icon: Layers,
    title: 'Multimodal AI',
    description: 'Work seamlessly across text, images, audio, video, and other data formats.',
  },
];

const businessImpact: CapabilityItem[] = [
  { icon: RefreshCw, label: 'Automate repetitive processes' },
  { icon: Database, label: 'Analyze large datasets' },
  { icon: TrendingUp, label: 'Predict demand and trends' },
  { icon: Users, label: 'Personalize customer experiences' },
  { icon: Activity, label: 'Detect anomalies' },
  { icon: Zap, label: 'Accelerate decision-making' },
  { icon: Gauge, label: 'Improve operational efficiency' },
  { icon: Lightbulb, label: 'Generate intelligent recommendations' },
];

const techStack: TechItem[] = [
  { icon: Brain, name: 'Machine Learning', description: 'Models that learn from data to improve over time.' },
  { icon: Sparkles, name: 'Generative AI', description: 'Create content, code, and creative assets.' },
  { icon: MessageSquare, name: 'Large Language Models', description: 'Deep language understanding and generation.' },
  { icon: Search, name: 'Retrieval-Augmented Generation', description: 'Ground AI responses in your knowledge base.' },
  { icon: Bot, name: 'AI Agents', description: 'Autonomous task execution and orchestration.' },
  { icon: Eye, name: 'Computer Vision', description: 'Visual recognition and image analysis.' },
  { icon: FileText, name: 'NLP', description: 'Text classification, extraction, and sentiment.' },
  { icon: TrendingUp, name: 'Predictive Analytics', description: 'Forecasting and trend detection.' },
  { icon: Database, name: 'Data Engineering', description: 'Pipelines, storage, and data quality.' },
  { icon: Cloud, name: 'Cloud AI', description: 'Scalable AI services on cloud infrastructure.' },
  { icon: Workflow, name: 'Automation', description: 'Intelligent process and workflow automation.' },
  { icon: Code2, name: 'AI APIs', description: 'Integrate AI capabilities into any application.' },
];

const industries: IndustryItem[] = [
  {
    icon: Building2,
    name: 'Finance',
    description: 'Fraud detection, forecasting, document intelligence, customer insights.',
    accent: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    icon: ShoppingBag,
    name: 'Retail',
    description: 'Recommendations, demand forecasting, personalization, inventory intelligence.',
    accent: 'from-violet-500/20 to-fuchsia-500/10',
  },
  {
    icon: HeartPulse,
    name: 'Healthcare',
    description: 'Document processing, intelligent scheduling, patient communication, insights.',
    accent: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    icon: Factory,
    name: 'Manufacturing',
    description: 'Predictive maintenance, quality inspection, production optimization.',
    accent: 'from-orange-500/20 to-amber-500/10',
  },
  {
    icon: Truck,
    name: 'Logistics',
    description: 'Route intelligence, demand prediction, shipment visibility, automation.',
    accent: 'from-sky-500/20 to-indigo-500/10',
  },
  {
    icon: Home,
    name: 'Real Estate',
    description: 'Property insights, lead intelligence, recommendation systems, document analysis.',
    accent: 'from-rose-500/20 to-pink-500/10',
  },
  {
    icon: GraduationCap,
    name: 'Education',
    description: 'Personalized learning, content generation, student insights, automation.',
    accent: 'from-cyan-500/20 to-blue-500/10',
  },
  {
    icon: Headphones,
    name: 'Customer Service',
    description: 'AI assistants, ticket classification, sentiment analysis, automated responses.',
    accent: 'from-purple-500/20 to-violet-500/10',
  },
];

const articles: ArticleItem[] = [
  {
    category: 'AI Agents',
    title: 'The Rise of AI Agents',
    description: 'Explore how intelligent agents are changing software workflows.',
    meta: '8 min read · Mar 2025',
  },
  {
    category: 'Generative AI',
    title: 'Generative AI in Modern Business',
    description: 'Understand practical applications of generative AI across industries.',
    meta: '6 min read · Feb 2025',
  },
  {
    category: 'Automation',
    title: 'From Automation to Intelligent Automation',
    description: 'See how AI can enhance traditional business processes.',
    meta: '7 min read · Feb 2025',
  },
  {
    category: 'Predictive AI',
    title: 'Predictive AI and Better Decisions',
    description: 'Understand how organizations can use data to anticipate outcomes.',
    meta: '5 min read · Jan 2025',
  },
  {
    category: 'Architecture',
    title: 'Building AI-Ready Software',
    description: 'Explore the architecture required for intelligent applications.',
    meta: '9 min read · Jan 2025',
  },
];

const trustPrinciples = [
  { icon: Lock, title: 'Data Privacy', description: 'Your data stays protected and compliant at every step.' },
  { icon: Shield, title: 'Security', description: 'Enterprise-grade security across the entire AI lifecycle.' },
  { icon: Users, title: 'Human Oversight', description: 'Humans stay in control of critical AI-driven decisions.' },
  { icon: Lightbulb, title: 'Explainability', description: 'Understand how and why AI models arrive at outcomes.' },
  { icon: Activity, title: 'Model Monitoring', description: 'Continuous tracking of performance, drift, and quality.' },
  { icon: Target, title: 'Responsible AI', description: 'Ethical, fair, and transparent AI practices by design.' },
];

const agentWorkflow = [
  { label: 'Business Goal', icon: Target },
  { label: 'AI Agent', icon: Bot },
  { label: 'Understand', icon: Brain },
  { label: 'Reason', icon: GitBranch },
  { label: 'Access Data', icon: Database },
  { label: 'Take Action', icon: Zap },
  { label: 'Result', icon: BarChart3 },
];

const dataPipeline: WorkflowStage[] = [
  { label: 'Raw Data', icon: Database, description: 'Collect structured and unstructured data from across your business.' },
  { label: 'Data Processing', icon: Workflow, description: 'Clean, transform, and prepare data for AI models.' },
  { label: 'AI Models', icon: Brain, description: 'Apply machine learning and generative models to uncover patterns.' },
  { label: 'Insights', icon: Lightbulb, description: 'Translate model outputs into clear, actionable intelligence.' },
  { label: 'Automated Actions', icon: Zap, description: 'Trigger workflows and decisions automatically at scale.' },
];

const realWorldApps = [
  { icon: Headphones, title: 'Intelligent Customer Support', description: 'AI assistants that resolve queries and escalate intelligently.' },
  { icon: FileText, title: 'Document Intelligence', description: 'Extract, classify, and process documents automatically.' },
  { icon: Sparkles, title: 'Recommendation Engines', description: 'Personalized suggestions that drive engagement and revenue.' },
  { icon: TrendingUp, title: 'Sales Forecasting', description: 'Predict revenue and pipeline with data-driven accuracy.' },
  { icon: Shield, title: 'Fraud Detection', description: 'Identify suspicious activity in real time with AI models.' },
  { icon: Factory, title: 'Predictive Maintenance', description: 'Anticipate equipment failures before they happen.' },
  { icon: Workflow, title: 'Workflow Automation', description: 'Orchestrate complex processes with intelligent automation.' },
  { icon: BarChart3, title: 'Business Intelligence', description: 'Turn data into dashboards, reports, and decisions.' },
  { icon: Search, title: 'AI-Powered Search', description: 'Semantic search that understands intent and context.' },
  { icon: LineChart, title: 'Intelligent Data Analysis', description: 'Automated analysis that surfaces what matters most.' },
];

/* ------------------------------------------------------------------ */
/*  Hooks                                                             */
/* ------------------------------------------------------------------ */

function usePrefersReducedMotion(): boolean {
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

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, reduced]);

  return { ref, visible };
}

/* ------------------------------------------------------------------ */
/*  Reveal Wrapper                                                    */
/* ------------------------------------------------------------------ */

const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}> = ({ children, delay = 0, className = '', y = 30 }) => {
  const { ref, visible } = useScrollReveal();
  const reduced = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible || reduced ? 'translateY(0)' : `translateY(${y}px)`,
        transition: reduced
          ? 'none'
          : `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Background Particles                                               */
/* ------------------------------------------------------------------ */

const Particles: React.FC<{ count?: number }> = ({ count = 30 }) => {
  const reduced = usePrefersReducedMotion();
  const particles = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.4 + 0.1,
      })),
    [count]
  );

  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-cyan-300"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            boxShadow: '0 0 6px 1px rgba(103,232,249,0.5)',
            animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Hero Visual – AI Core                                             */
/* ------------------------------------------------------------------ */

const HeroVisual: React.FC = () => {
  const reduced = usePrefersReducedMotion();
  const nodes = [
    { label: 'AI Agents', angle: -60, radius: 38, icon: Bot },
    { label: 'Machine Learning', angle: 10, radius: 42, icon: Brain },
    { label: 'Generative AI', angle: 80, radius: 38, icon: Sparkles },
    { label: 'Predictive Analytics', angle: 160, radius: 42, icon: TrendingUp },
    { label: 'Computer Vision', angle: 230, radius: 38, icon: Eye },
  ];

  return (
    <div className="relative mx-auto flex h-[380px] w-full max-w-[500px] items-center justify-center sm:h-[460px] lg:h-[520px]">
      {/* Outer glow ring */}
      <div className="absolute h-[280px] w-[280px] rounded-full bg-gradient-to-br from-blue-600/20 via-violet-600/10 to-cyan-500/20 blur-3xl sm:h-[340px] sm:w-[340px]" />

      {/* Rotating orbit rings */}
      {!reduced && (
        <>
          <div className="absolute h-[260px] w-[260px] animate-[spin_28s_linear_infinite] rounded-full border border-white/[0.06] sm:h-[320px] sm:w-[320px]">
            <span className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.6)]" />
          </div>
          <div className="absolute h-[200px] w-[200px] animate-[spin_20s_linear_infinite_reverse] rounded-full border border-white/[0.08] sm:h-[250px] sm:w-[250px]">
            <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-violet-400 shadow-[0_0_8px_2px_rgba(167,139,250,0.6)]" />
          </div>
        </>
      )}

      {/* Connection lines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 500" aria-hidden="true">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {nodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const x2 = 250 + Math.cos(rad) * node.radius * 4.2;
          const y2 = 250 + Math.sin(rad) * node.radius * 4.2;
          return (
            <line
              key={i}
              x1="250"
              y1="250"
              x2={x2}
              y2={y2}
              stroke="url(#lineGrad)"
              strokeWidth="1"
              strokeDasharray="4 6"
              className={reduced ? '' : 'animate-[dash_3s_linear_infinite]'}
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          );
        })}
      </svg>

      {/* Central AI Core */}
      <div className="relative z-10 flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
        <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-blue-500/40 via-violet-500/30 to-cyan-400/40 blur-xl" />
        <div className="relative flex h-full w-full items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 shadow-[0_0_50px_-5px_rgba(59,130,246,0.5)]">
          <Brain className="h-10 w-10 text-cyan-300 sm:h-12 sm:w-12" strokeWidth={1.5} />
          <span className="absolute -bottom-8 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-400/80 sm:text-xs">
            AI Core
          </span>
        </div>
      </div>

      {/* Orbit Nodes */}
      {nodes.map((node, i) => {
        const rad = (node.angle * Math.PI) / 180;
        const x = 50 + Math.cos(rad) * node.radius;
        const y = 50 + Math.sin(rad) * node.radius;
        const Icon = node.icon;
        const floatDelay = i * 0.6;
        return (
          <div
            key={node.label}
            className="absolute z-20"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
              animation: reduced ? 'none' : `floatNode 5s ease-in-out ${floatDelay}s infinite alternate`,
            }}
          >
            <div className="group flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-2.5 py-1.5 backdrop-blur-md transition-colors hover:border-cyan-400/40 sm:px-3 sm:py-2">
              <Icon className="h-3.5 w-3.5 text-cyan-300 sm:h-4 sm:w-4" strokeWidth={1.5} />
              <span className="whitespace-nowrap text-[10px] font-medium text-slate-200 sm:text-xs">
                {node.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Section Heading                                                   */
/* ------------------------------------------------------------------ */

const SectionHeading: React.FC<{
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}> = ({ eyebrow, title, description, align = 'center' }) => (
  <Reveal className={align === 'center' ? 'text-center' : 'text-left'}>
    {eyebrow && (
      <span className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-400/80">
        {eyebrow}
      </span>
    )}
    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
      {title}
    </h2>
    {description && (
      <p
        className={`mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      >
        {description}
      </p>
    )}
  </Reveal>
);

/* ------------------------------------------------------------------ */
/*  Main Component                                                    */
/* ------------------------------------------------------------------ */

const AIInsights: React.FC = () => {
  const reduced = usePrefersReducedMotion();

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }, [reduced]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#05060f] text-slate-200 antialiased">
      {/* Global keyframes */}
      <style>{`
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(-30px) translateX(15px); }
        }
        @keyframes floatNode {
          0% { transform: translate(-50%, -50%) translateY(0); }
          100% { transform: translate(-50%, -50%) translateY(-8px); }
        }
        @keyframes dash {
          to { stroke-dashoffset: -40; }
        }
        @keyframes flowDash {
          to { stroke-dashoffset: -24; }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes arrowFlow {
          0% { opacity: 0; transform: translateX(-4px); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateX(4px); }
        }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(34,211,238,0.07),transparent_50%)]" />
      </div>

      <div className="relative z-10">
        {/* ================= HERO ================= */}
        <section className="relative flex min-h-screen items-center overflow-hidden px-5 py-20 sm:px-8 lg:px-12">
          <Particles count={35} />

          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Left content */}
            <div className="text-center lg:text-left">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-300">
                  <CircleDot className="h-3 w-3" />
                  AI Insights
                </span>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                  Turning{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                    Artificial Intelligence
                  </span>{' '}
                  Into Business Intelligence
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base lg:mx-0">
                  Explore the technologies, trends, and practical applications shaping the next
                  generation of intelligent software.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                  <button
                    onClick={() => scrollTo('landscape')}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:shadow-xl hover:shadow-violet-600/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 sm:w-auto"
                  >
                    Explore AI Capabilities
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={() => scrollTo('cta')}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 sm:w-auto"
                  >
                    Talk to Our AI Team
                  </button>
                </div>
              </Reveal>

              {/* Mini stats */}
              <Reveal delay={400}>
                <div className="mt-10 flex flex-wrap justify-center gap-6 lg:justify-start">
                  {[
                    { value: '50+', label: 'AI Solutions' },
                    { value: '12+', label: 'Industries' },
                    { value: '99.9%', label: 'Uptime' },
                  ].map((s) => (
                    <div key={s.label} className="text-center lg:text-left">
                      <div className="text-lg font-bold text-white sm:text-xl">{s.value}</div>
                      <div className="text-[11px] uppercase tracking-wider text-slate-500">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right visual */}
            <Reveal delay={200} className="lg:pl-8">
              <HeroVisual />
            </Reveal>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
            <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/15 p-1">
              <span className="h-1.5 w-1 animate-bounce rounded-full bg-cyan-400" />
            </div>
          </div>
        </section>

        {/* ================= AI LANDSCAPE ================= */}
        <section id="landscape" className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="AI Landscape"
              title="The AI Landscape Is Evolving"
              description="Modern AI is moving from simple automation toward intelligent systems capable of understanding data, generating content, predicting outcomes, and supporting complex workflows."
            />

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {aiLandscape.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={i * 80}>
                    <div className="group relative h-full overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-400/30 hover:bg-white/[0.04]">
                      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/10 to-violet-500/5 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
                      <div className="relative">
                        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-blue-500/15 to-violet-500/10 text-cyan-300 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                          <Icon className="h-5 w-5" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-base font-semibold text-white">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= BUSINESS IMPACT ================= */}
        <section className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Business Impact"
              title="Where AI Creates Business Value"
              description="A connected flow from raw data to measurable business outcomes."
            />

            {/* Workflow */}
            <Reveal className="mt-14">
              <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-center lg:gap-0">
                {['Data', 'Intelligence', 'Decision', 'Automation', 'Business Value'].map(
                  (stage, i, arr) => (
                    <React.Fragment key={stage}>
                      <div className="group relative flex w-full max-w-[220px] items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent px-5 py-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.4)] lg:w-auto">
                        <span className="text-sm font-semibold text-white">{stage}</span>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="flex items-center justify-center py-1 lg:px-1">
                          <ArrowRight className="hidden h-5 w-5 text-cyan-400/50 lg:block" />
                          <ArrowDown className="h-5 w-5 text-cyan-400/50 lg:hidden" />
                        </div>
                      )}
                    </React.Fragment>
                  )
                )}
              </div>
            </Reveal>

            {/* Capability cards */}
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {businessImpact.map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <Reveal key={cap.label} delay={i * 60}>
                    <div className="group flex h-full items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.04]">
                      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-violet-500/15 to-blue-500/10 text-violet-300 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm font-medium leading-snug text-slate-300">
                        {cap.label}
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= AI AGENTS ================= */}
        <section className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          {/* Section glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.06] blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="AI Agents"
              title="From AI Assistants to AI Agents"
              description="AI agents go beyond answering questions by understanding objectives, reasoning through tasks, interacting with systems, and helping execute workflows end to end."
            />

            <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
              {/* Workflow */}
              <Reveal>
                <div className="relative flex flex-col items-center gap-0">
                  {agentWorkflow.map((step, i) => {
                    const Icon = step.icon;
                    const isLast = i === agentWorkflow.length - 1;
                    return (
                      <React.Fragment key={step.label}>
                        <div className="group relative z-10 flex w-full max-w-xs items-center gap-3 rounded-lg border border-white/10 bg-slate-950/60 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_25px_-8px_rgba(34,211,238,0.5)]">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-blue-500/20 to-violet-500/15 text-cyan-300">
                            <Icon className="h-4 w-4" strokeWidth={1.5} />
                          </div>
                          <span className="text-sm font-medium text-slate-200">{step.label}</span>
                          {/* Particle */}
                          {!reduced && (
                            <span
                              className="absolute right-3 h-1.5 w-1.5 rounded-full bg-cyan-400"
                              style={{
                                boxShadow: '0 0 8px 2px rgba(34,211,238,0.6)',
                                animation: `arrowFlow 2.5s ease-in-out ${i * 0.3}s infinite`,
                              }}
                            />
                          )}
                        </div>
                        {!isLast && (
                          <div className="relative flex h-8 items-center justify-center">
                            <div className="h-full w-px bg-gradient-to-b from-cyan-400/40 to-violet-400/20" />
                            {!reduced && (
                              <span
                                className="absolute h-1.5 w-1.5 rounded-full bg-cyan-400"
                                style={{
                                  boxShadow: '0 0 6px 2px rgba(34,211,238,0.5)',
                                  animation: `slideDown 2s ease-in-out ${i * 0.4}s infinite`,
                                }}
                              />
                            )}
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </Reveal>

              {/* Info card */}
              <Reveal delay={150}>
                <div className="space-y-6">
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-6 backdrop-blur-sm">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/10 text-cyan-300">
                      <Network className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Intelligent Workflows</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      Intelligent workflows can connect AI with business applications, databases,
                      APIs, and internal systems — enabling agents to take meaningful action.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Boxes, label: 'Business Apps' },
                      { icon: Database, label: 'Databases' },
                      { icon: Terminal, label: 'APIs' },
                      { icon: Cloud, label: 'Internal Systems' },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.label}
                          className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 transition-colors duration-300 hover:border-cyan-400/30"
                        >
                          <Icon className="h-4 w-4 text-slate-400" strokeWidth={1.5} />
                          <span className="text-xs font-medium text-slate-300">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= TECH STACK ================= */}
        <section className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Technology Stack"
              title="Technologies Behind Intelligent Software"
              description="A comprehensive stack of AI technologies powering modern intelligent applications."
            />

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {techStack.map((tech, i) => {
                const Icon = tech.icon;
                return (
                  <Reveal key={tech.name} delay={i * 50}>
                    <div className="group relative h-full overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-400 hover:-translate-y-1.5 hover:border-blue-400/30 hover:bg-white/[0.04]">
                      <div className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-gradient-to-tl from-blue-500/10 to-transparent blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="relative">
                        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-cyan-300 transition-all duration-500 group-hover:scale-110 group-hover:border-cyan-400/30">
                          <Icon className="h-5 w-5" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-sm font-semibold text-white">{tech.name}</h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                          {tech.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= INDUSTRIES ================= */}
        <section className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Industry Insights"
              title="AI Across Industries"
              description="Tailored AI solutions that address the unique challenges of every sector."
            />

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {industries.map((ind, i) => {
                const Icon = ind.icon;
                return (
                  <Reveal key={ind.name} delay={i * 70}>
                    <div className="group relative h-full overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.04]">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${ind.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                      />
                      <div className="relative">
                        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-all duration-500 group-hover:scale-110 group-hover:text-white">
                          <Icon className="h-5 w-5" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-sm font-semibold text-white">{ind.name}</h3>
                        <p className="mt-2 text-xs leading-relaxed text-slate-400">
                          {ind.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= DATA TO INTELLIGENCE ================= */}
        <section className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Data Pipeline"
              title="From Data to Intelligence"
              description="How raw business data becomes actionable, automated intelligence."
            />

            <Reveal className="mt-14">
              <div className="relative">
                {/* Connecting line (desktop) */}
                <div className="absolute left-0 right-0 top-[52px] hidden h-px lg:block">
                  <svg className="h-px w-full" preserveAspectRatio="none">
                    <line
                      x1="0"
                      y1="0.5"
                      x2="100%"
                      y2="0.5"
                      stroke="url(#pipelineGrad)"
                      strokeWidth="2"
                      strokeDasharray="8 8"
                      className={reduced ? '' : 'animate-[flowDash_2s_linear_infinite]'}
                    />
                    <defs>
                      <linearGradient id="pipelineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                        <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.5" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="grid gap-8 lg:grid-cols-5 lg:gap-4">
                  {dataPipeline.map((stage, i) => {
                    const Icon = stage.icon;
                    return (
                      <Reveal key={stage.label} delay={i * 100}>
                        <div className="group relative flex flex-col items-center text-center lg:items-center">
                          <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-slate-950 shadow-lg transition-all duration-500 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.5)]">
                            <Icon className="h-6 w-6 text-cyan-300" strokeWidth={1.5} />
                            {!reduced && (
                              <span
                                className="absolute inset-0 rounded-full border border-cyan-400/30"
                                style={{ animation: `pulseGlow 3s ease-in-out ${i * 0.5}s infinite` }}
                              />
                            )}
                          </div>
                          <h3 className="mt-4 text-sm font-semibold text-white">{stage.label}</h3>
                          <p className="mt-1.5 max-w-[200px] text-xs leading-relaxed text-slate-400">
                            {stage.description}
                          </p>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= REAL-WORLD APPS ================= */}
        <section className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Applications"
              title="What Can We Build With AI?"
              description="Practical AI solutions that solve real business problems today."
            />

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {realWorldApps.map((app, i) => {
                const Icon = app.icon;
                return (
                  <Reveal key={app.title} delay={i * 50}>
                    <div className="group relative flex h-full flex-col rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-500 hover:z-10 hover:scale-[1.03] hover:border-cyan-400/30 hover:bg-white/[0.05] hover:shadow-[0_0_40px_-15px_rgba(34,211,238,0.4)]">
                      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/15 to-violet-500/10 text-cyan-300 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-sm font-semibold text-white transition-colors duration-300 group-hover:text-cyan-200">
                        {app.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                        {app.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= TRUST & GOVERNANCE ================= */}
        <section className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-950/90 to-slate-900/80 px-6 py-16 backdrop-blur-sm sm:px-12 sm:py-20">
                {/* Subtle background pattern */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
                    backgroundSize: '32px 32px',
                  }}
                  aria-hidden="true"
                />
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/[0.06] blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-violet-500/[0.06] blur-3xl" />

                <div className="relative">
                  <div className="text-center">
                    <span className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-400/80">
                      Trust & Governance
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                      Building AI With Trust
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
                      Our commitment to responsible, secure, and transparent AI practices.
                    </p>
                  </div>

                  <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {trustPrinciples.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <Reveal key={item.title} delay={i * 80}>
                          <div className="group flex items-start gap-4 rounded-lg border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-400 hover:border-white/15 hover:bg-white/[0.04]">
                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 group-hover:border-cyan-400/30 group-hover:text-cyan-300">
                              <Icon className="h-4 w-4" strokeWidth={1.5} />
                            </div>
                            <div>
                              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= ARTICLES ================= */}
        <section className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Insights"
              title="Explore AI Insights"
              description="Deep dives into the technologies and trends shaping intelligent software."
            />

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, i) => (
                <Reveal
                  key={article.title}
                  delay={i * 80}
                  className={i === 0 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''}
                >
                  <article
                    className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-violet-400/30 hover:bg-white/[0.04] ${
                      i === 0 ? 'lg:min-h-[380px]' : ''
                    }`}
                  >
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-violet-500/10 to-cyan-500/5 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative flex h-full flex-col">
                      <span className="mb-3 inline-block self-start rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-300">
                        {article.category}
                      </span>
                      <h3 className="text-base font-semibold text-white transition-colors duration-300 group-hover:text-cyan-200 sm:text-lg">
                        {article.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                        {article.description}
                      </p>
                      <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                        <span className="text-[11px] text-slate-500">{article.meta}</span>
                        <ArrowRight className="h-4 w-4 text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-300" />
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section id="cta" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          {/* Animated background network */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <Particles count={20} />
            <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/[0.07] blur-3xl" />
            <div className="absolute left-1/3 top-1/3 h-[300px] w-[300px] rounded-full bg-violet-600/[0.06] blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-[250px] w-[250px] rounded-full bg-cyan-500/[0.05] blur-3xl" />
          </div>

          {/* Connection lines behind CTA */}
          {!reduced && (
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
              aria-hidden="true"
            >
              <line
                x1="10%"
                y1="20%"
                x2="90%"
                y2="80%"
                stroke="url(#ctaGrad)"
                strokeWidth="1"
                strokeDasharray="4 8"
                className="animate-[dash_4s_linear_infinite]"
              />
              <line
                x1="90%"
                y1="20%"
                x2="10%"
                y2="80%"
                stroke="url(#ctaGrad)"
                strokeWidth="1"
                strokeDasharray="4 8"
                className="animate-[dash_5s_linear_infinite]"
              />
              <defs>
                <linearGradient id="ctaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          )}

          <div className="relative mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Have an{' '}
                <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                  AI Idea?
                </span>
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg lg:text-xl">
                Let&apos;s turn it into an intelligent software solution.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  onClick={() => scrollTo('landscape')}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:shadow-xl hover:shadow-violet-600/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 sm:w-auto"
                >
                  Start a Conversation
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => scrollTo('landscape')}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 sm:w-auto"
                >
                  Explore Our Solutions
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AIInsights;