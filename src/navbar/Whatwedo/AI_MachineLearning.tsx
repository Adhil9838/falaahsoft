import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Brain,
  Database,
  TrendingUp,
  Bot,
  Workflow,
  FileSearch,
  BarChart3,
  Users,
  MessageSquare,
  Eye,
  AlertTriangle,
  ShoppingCart,
  Landmark,
  Truck,
  Factory,
  GraduationCap,
  Megaphone,
  Code2,
  Server,
  Layers,
  Cpu,
  Cloud,
  GitBranch,
  ChevronDown,
  ArrowRight,
  Zap,
  Shield,
  Sparkles,
  Target,
  Lightbulb,
  Gauge,
  Clock,
  DollarSign,
  Award,
  CheckCircle2,
  Settings,
  RefreshCw,
  LineChart,
  Lock,
  Globe,
  type LucideIcon,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CapabilityCardProps {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  index: number;
}

interface WorkflowStepProps {
  number: string;
  title: string;
  description: string;
  index: number;
  isLast: boolean;
}

interface ApplicationCardProps {
  icon: LucideIcon;
  title: string;
  points: string[];
  index: number;
}

interface TechPillProps {
  icon: LucideIcon;
  label: string;
  index: number;
}

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

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
  }, [threshold]);

  return { ref, visible };
};

/* ------------------------------------------------------------------ */
/*  Reusable local components                                          */
/* ------------------------------------------------------------------ */

const SectionReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const CapabilityCard: React.FC<CapabilityCardProps> = ({
  icon: Icon,
  label,
  title,
  description,
  index,
}) => {
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-indigo-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)] sm:p-8 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />
      </div>

      <div className="relative z-10">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
            <Icon className="h-6 w-6 text-indigo-300 transition-colors duration-300 group-hover:text-indigo-200" />
          </div>
          <span className="text-xs font-medium tracking-widest text-indigo-400/60 uppercase">
            {label}
          </span>
        </div>

        <h3 className="mb-2 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-indigo-200">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/70">
          {description}
        </p>
      </div>
    </div>
  );
};

const WorkflowStep: React.FC<WorkflowStepProps> = ({
  number,
  title,
  description,
  index,
  isLast,
}) => {
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`relative flex flex-1 flex-col items-center text-center transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm transition-all duration-500 hover:border-indigo-400/50 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)]">
        <span className="text-sm font-bold tracking-wider text-indigo-300">
          {number}
        </span>
        <div className="absolute inset-0 animate-ping rounded-full border border-indigo-500/20" style={{ animationDuration: '3s' }} />
      </div>

      <h3 className="mb-2 text-sm font-semibold text-white sm:text-base">
        {title}
      </h3>
      <p className="max-w-[220px] text-xs leading-relaxed text-white/40 sm:text-sm">
        {description}
      </p>

      {!isLast && (
        <div className="absolute top-8 left-[calc(50%+2rem)] hidden h-px w-[calc(100%-4rem)] lg:block">
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/40 via-purple-500/30 to-indigo-500/40" />
            <div className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 animate-[slideDot_3s_ease-in-out_infinite] rounded-full bg-indigo-400 shadow-[0_0_8px_2px_rgba(99,102,241,0.6)]" />
          </div>
        </div>
      )}

      {!isLast && (
        <div className="absolute top-[calc(100%+0.5rem)] left-1/2 h-8 w-px -translate-x-1/2 lg:hidden">
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/40 to-purple-500/20" />
            <div className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 animate-[slideDotVertical_3s_ease-in-out_infinite] rounded-full bg-indigo-400 shadow-[0_0_8px_2px_rgba(99,102,241,0.6)]" />
          </div>
        </div>
      )}
    </div>
  );
};

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  icon: Icon,
  title,
  points,
  index,
}) => {
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-indigo-500/25 hover:shadow-[0_0_50px_-12px_rgba(99,102,241,0.25)] sm:p-8 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-indigo-500/5 blur-3xl transition-all duration-700 group-hover:bg-indigo-500/10" />

      <div className="relative z-10">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/15 to-purple-500/15 ring-1 ring-white/10 transition-all duration-500 group-hover:scale-110 group-hover:ring-indigo-500/30">
          <Icon className="h-7 w-7 text-indigo-300 transition-colors duration-300 group-hover:text-indigo-200" />
        </div>

        <h3 className="mb-4 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-indigo-200">
          {title}
        </h3>

        <ul className="space-y-2.5">
          {points.map((point, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-white/50 transition-colors duration-300 group-hover:text-white/70">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400/60" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const TechPill: React.FC<TechPillProps> = ({ icon: Icon, label, index }) => {
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 backdrop-blur-sm transition-all duration-500 hover:border-indigo-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <Icon className="h-4 w-4 text-indigo-400" />
      <span className="text-sm font-medium text-white/70">{label}</span>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Architecture Flow Component                                        */
/* ------------------------------------------------------------------ */

const ArchitectureNode: React.FC<{
  icon: LucideIcon;
  label: string;
  sublabel: string;
  index: number;
  isLast: boolean;
}> = ({ icon: Icon, label, sublabel, index, isLast }) => {
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="group relative flex flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl transition-all duration-500 group-hover:border-indigo-500/30 group-hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)] sm:h-24 sm:w-24">
          <Icon className="h-8 w-8 text-indigo-300 transition-transform duration-500 group-hover:scale-110 sm:h-9 sm:w-9" />
        </div>
        <span className="mt-3 text-center text-xs font-semibold tracking-wide text-white/80 sm:text-sm">
          {label}
        </span>
        <span className="mt-0.5 text-center text-[10px] text-white/35 sm:text-xs">
          {sublabel}
        </span>
      </div>

      {!isLast && (
        <div className="my-3 flex flex-col items-center">
          <div className="relative h-10 w-px">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/40 to-purple-500/20" />
            <div className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 animate-[slideDotVertical_2.5s_ease-in-out_infinite] rounded-full bg-indigo-400 shadow-[0_0_8px_2px_rgba(99,102,241,0.6)]" />
          </div>
          <ChevronDown className="h-4 w-4 text-indigo-500/40" />
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

const AI_MachineLearning: React.FC = () => {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  /* ---- Data ---- */

  const introCards = [
    {
      icon: Database,
      title: 'Understand',
      text: 'Analyze complex business data and uncover meaningful patterns that would otherwise remain hidden.',
    },
    {
      icon: TrendingUp,
      title: 'Predict',
      text: 'Use machine learning models to forecast outcomes, anticipate trends, and identify opportunities before they emerge.',
    },
    {
      icon: Bot,
      title: 'Automate',
      text: 'Reduce repetitive work with intelligent automation and AI-powered workflows that learn and improve over time.',
    },
  ];

  const stats = [
    { icon: Gauge, value: '40%', label: 'Faster Decision Making', description: 'When insights are delivered in real time.' },
    { icon: DollarSign, value: '3.5x', label: 'Average ROI', description: 'Reported by businesses adopting AI automation.' },
    { icon: Clock, value: '60%', label: 'Less Manual Work', description: 'Through intelligent process automation.' },
    { icon: Target, value: '92%', label: 'Prediction Accuracy', description: 'Achieved with well-trained ML models.' },
  ];

  const challenges = [
    {
      icon: FileSearch,
      challenge: 'Data trapped in silos',
      solution: 'Unified intelligent layer that connects disparate data sources and surfaces a single source of truth for decision-making.',
    },
    {
      icon: Clock,
      challenge: 'Slow, manual processes',
      solution: 'AI-powered automation that handles document processing, data entry, approvals, and recurring workflows end-to-end.',
    },
    {
      icon: LineChart,
      challenge: 'Reactive decision making',
      solution: 'Predictive models that forecast demand, churn, risk, and revenue so teams act before problems materialise.',
    },
    {
      icon: Users,
      challenge: 'Generic customer experiences',
      solution: 'Personalisation engines that adapt content, products, and recommendations to every individual user in real time.',
    },
    {
      icon: AlertTriangle,
      challenge: 'Undetected anomalies & fraud',
      solution: 'Continuous monitoring and anomaly detection that flags suspicious activity within milliseconds, not days.',
    },
    {
      icon: Settings,
      challenge: 'Rigid legacy systems',
      solution: 'Non-invasive AI integration that enhances existing software with intelligent capabilities — no full rewrite required.',
    },
  ];

  const capabilities = [
    {
      icon: Workflow,
      label: '01',
      title: 'AI-Powered Automation',
      description: 'Automate repetitive processes, document workflows, data extraction, and business operations with intelligent agents.',
    },
    {
      icon: BarChart3,
      label: '02',
      title: 'Predictive Analytics',
      description: 'Turn historical data into forecasts, predictions, trends, and business intelligence that drives strategy.',
    },
    {
      icon: Users,
      label: '03',
      title: 'Recommendation Systems',
      description: 'Deliver personalized product, content, and customer recommendations that increase engagement and revenue.',
    },
    {
      icon: MessageSquare,
      label: '04',
      title: 'Intelligent Assistants',
      description: 'Create AI-powered assistants that understand questions, retrieve knowledge, and provide useful business information.',
    },
    {
      icon: Eye,
      label: '05',
      title: 'Computer Vision',
      description: 'Analyze images and visual information using intelligent image-processing models for quality, safety, and insight.',
    },
    {
      icon: AlertTriangle,
      label: '06',
      title: 'Anomaly Detection',
      description: 'Identify unusual patterns, suspicious activity, operational issues, and potential risks before they escalate.',
    },
  ];

  const workflowSteps = [
    {
      number: '01',
      title: 'Business Data',
      description: 'Collect information from applications, customers, transactions, and business operations.',
    },
    {
      number: '02',
      title: 'Data Processing',
      description: 'Clean, organize, transform, and prepare data for intelligent analysis.',
    },
    {
      number: '03',
      title: 'AI / ML Engine',
      description: 'Machine learning models analyze patterns and generate predictions or classifications.',
    },
    {
      number: '04',
      title: 'Intelligent Results',
      description: 'Return recommendations, predictions, insights, or automated actions to the application.',
    },
    {
      number: '05',
      title: 'Business Action',
      description: 'Use intelligent results to improve decisions, efficiency, and customer experiences.',
    },
  ];

  const applications = [
    {
      icon: ShoppingCart,
      title: 'E-commerce',
      points: ['Product recommendations', 'Customer behavior prediction', 'Demand forecasting', 'Dynamic pricing intelligence'],
    },
    {
      icon: Landmark,
      title: 'Finance',
      points: ['Fraud detection', 'Risk analysis', 'Transaction anomaly detection', 'Credit scoring automation'],
    },
    {
      icon: Truck,
      title: 'Logistics',
      points: ['Route optimization', 'Demand prediction', 'Delivery intelligence', 'Fleet maintenance forecasting'],
    },
    {
      icon: Factory,
      title: 'Manufacturing',
      points: ['Predictive maintenance', 'Quality inspection', 'Production forecasting', 'Supply chain optimization'],
    },
    {
      icon: GraduationCap,
      title: 'Education',
      points: ['Personalized learning', 'Student behavior insights', 'Intelligent assistants', 'Adaptive assessments'],
    },
    {
      icon: Megaphone,
      title: 'Marketing',
      points: ['Customer segmentation', 'Lead scoring', 'Campaign intelligence', 'Content personalization'],
    },
  ];

  const technologies = [
    { icon: Code2, label: 'React' },
    { icon: Layers, label: 'TypeScript' },
    { icon: Server, label: 'Laravel' },
    { icon: Cpu, label: 'Python' },
    { icon: Zap, label: 'FastAPI' },
    { icon: Database, label: 'PostgreSQL' },
    { icon: Brain, label: 'Machine Learning' },
    { icon: Cloud, label: 'AI APIs' },
  ];

  const architectureNodes = [
    { icon: Layers, label: 'Existing Application', sublabel: 'Your current software' },
    { icon: GitBranch, label: 'API / Integration Layer', sublabel: 'Secure data exchange' },
    { icon: Brain, label: 'AI & Machine Learning', sublabel: 'Models & processing' },
    { icon: Database, label: 'Business Data', sublabel: 'Structured & unstructured' },
    { icon: Sparkles, label: 'Intelligent Result', sublabel: 'Actionable insights' },
  ];

  const processPhases = [
    {
      icon: Lightbulb,
      phase: 'Discovery',
      duration: '1–2 weeks',
      description: 'We audit your data landscape, identify high-impact opportunities, and define measurable success criteria for the AI initiative.',
    },
    {
      icon: Settings,
      phase: 'Design & Prototype',
      duration: '2–4 weeks',
      description: 'We architect the integration approach, build a working prototype, and validate model performance against real business data.',
    },
    {
      icon: Cpu,
      phase: 'Build & Train',
      duration: '4–8 weeks',
      description: 'We develop production-grade models, build the integration layer, and train on your historical data for accuracy.',
    },
    {
      icon: RefreshCw,
      phase: 'Deploy & Monitor',
      duration: 'Ongoing',
      description: 'We deploy into your existing software stack, set up monitoring dashboards, and continuously retrain models as data evolves.',
    },
  ];

  const trustPoints = [
    { icon: Lock, text: 'Enterprise-grade security & data governance' },
    { icon: Globe, text: 'Cloud, on-premise, or hybrid deployment' },
    { icon: Shield, text: 'GDPR & compliance-aware model design' },
    { icon: Award, text: 'Certified AI & ML engineering team' },
    { icon: CheckCircle2, text: 'Transparent model explainability & reporting' },
    { icon: RefreshCw, text: 'Continuous model monitoring & retraining' },
  ];

  const faqs = [
    {
      question: 'Do we need a large dataset to get started with AI?',
      answer: 'Not necessarily. Many of our solutions start with the data you already have. We assess quality and volume during discovery and can supplement with transfer learning, synthetic data, or pre-trained models to deliver value quickly.',
    },
    {
      question: 'Will AI replace our existing software?',
      answer: 'No. Our approach is to enhance, not replace. We integrate intelligent capabilities directly into the applications your team already uses, so there is minimal disruption and a faster path to value.',
    },
    {
      question: 'How long does a typical AI project take?',
      answer: 'Most engagements move from discovery to a working prototype within 3–6 weeks. Full production deployment typically takes 2–4 months depending on complexity, data readiness, and integration requirements.',
    },
    {
      question: 'How do you ensure AI models stay accurate over time?',
      answer: 'We build monitoring, alerting, and automated retraining into every solution. Models are continuously evaluated against real-world outcomes, and we provide dashboards that show performance, drift, and confidence levels.',
    },
    {
      question: 'Can AI be integrated into legacy systems?',
      answer: 'Absolutely. Our integration layer is designed to work with REST APIs, databases, message queues, and even file-based workflows. We have successfully added AI to systems that are 10+ years old.',
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#050508] text-white antialiased selection:bg-indigo-500/30">
      {/* ============================================================ */}
      {/*  KEYFRAME STYLES (injected once)                             */}
      {/* ============================================================ */}
      <style>{`
        @keyframes slideDot {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes slideDotVertical {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.6; }
          50% { opacity: 0.3; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes dataFlow {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
      `}</style>

      {/* ============================================================ */}
      {/*  SECTION 1 — HERO                                            */}
      {/* ============================================================ */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect width='1920' height='1080' fill='%23050508'/%3E%3C/svg%3E"
        >
          <source
            src="/AI And ML.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/80 via-[#050508]/60 to-[#050508]" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/20 via-transparent to-purple-950/20" />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-indigo-400/40"
              style={{
                left: `${8 + i * 8}%`,
                top: `${20 + (i % 5) * 15}%`,
                animation: `floatParticle ${8 + (i % 4) * 3}s linear infinite`,
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-24 text-center sm:px-8 lg:px-12">
          <div
            className={`mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/[0.07] px-5 py-2 backdrop-blur-sm transition-all duration-1000 ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
            <span className="text-[11px] font-medium tracking-[0.2em] text-indigo-300/80 uppercase sm:text-xs">
              AI • Machine Learning • Intelligent Software
            </span>
          </div>

          <h1
            className={`mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-white transition-all duration-1000 sm:text-5xl md:text-6xl lg:text-7xl ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            Turn Data Into{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
              Intelligence
            </span>
          </h1>

          <p
            className={`mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/50 transition-all duration-1000 sm:text-lg ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            Build smarter software with AI and machine learning that automates processes,
            discovers patterns, predicts outcomes, and creates intelligent customer
            experiences.
          </p>

          <div
            className={`flex flex-col items-center justify-center gap-4 transition-all duration-1000 sm:flex-row ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <button
              onClick={() => scrollTo('capabilities')}
              className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_-8px_rgba(99,102,241,0.6)] sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore AI Solutions
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>

            <button
              onClick={() => scrollTo('cta')}
              className="group w-full rounded-full border border-white/15 bg-white/[0.04] px-8 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-indigo-500/40 hover:bg-white/[0.08] hover:text-white hover:shadow-[0_0_30px_-8px_rgba(99,102,241,0.4)] sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2">
                Build With Us
                <Sparkles className="h-4 w-4 text-indigo-400 transition-transform duration-300 group-hover:rotate-12" />
              </span>
            </button>
          </div>

          {/* Trust micro-copy */}
          <div
            className={`mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 transition-all duration-1000 ${
              heroLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            {['Enterprise-ready', 'Secure & compliant', 'Production-grade ML'].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-[11px] text-white/30">
                <CheckCircle2 className="h-3 w-3 text-indigo-500/60" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 ${
            heroLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1200ms' }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-medium tracking-[0.2em] text-white/25 uppercase">
              Scroll
            </span>
            <div className="flex h-8 w-5 items-start justify-center rounded-full border border-white/15 p-1">
              <div
                className="h-1.5 w-1.5 rounded-full bg-indigo-400"
                style={{ animation: 'scrollBounce 2s ease-in-out infinite' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 2 — INTRODUCTION + STATS                            */}
      {/* ============================================================ */}
      <section className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-600/[0.04] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionReveal className="mb-16 text-center">
            <h2 className="mb-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Intelligence Built Into{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Your Business
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/45 sm:text-lg">
              We integrate AI and machine learning into existing software systems to
              transform business data into meaningful predictions, automation,
              recommendations, and actionable insights.
            </p>
          </SectionReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {introCards.map((card, i) => (
              <SectionReveal key={card.title} delay={i * 120}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-indigo-500/25 hover:bg-white/[0.05] hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.25)]">
                  <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-indigo-500/[0.04] blur-3xl transition-all duration-700 group-hover:bg-indigo-500/[0.08]" />
                  <div className="relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/15 to-purple-500/15 ring-1 ring-white/10 transition-all duration-500 group-hover:scale-110 group-hover:ring-indigo-500/30">
                      <card.icon className="h-7 w-7 text-indigo-300" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-white">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-white/45 transition-colors duration-300 group-hover:text-white/65">
                      {card.text}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Stats strip */}
          <SectionReveal delay={300} className="mt-16">
            <div className="grid gap-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="mb-2 flex justify-center">
                    <stat.icon className="h-5 w-5 text-indigo-400/70" />
                  </div>
                  <div className="mb-1 text-3xl font-bold text-white">{stat.value}</div>
                  <div className="mb-1 text-sm font-semibold text-indigo-300/80">{stat.label}</div>
                  <div className="text-xs text-white/35">{stat.description}</div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 3 — WHY IT MATTERS (CHALLENGE → SOLUTION)           */}
      {/* ============================================================ */}
      <section className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute top-1/2 right-0 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-purple-600/[0.04] blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionReveal className="mb-16 text-center">
            <span className="mb-4 inline-block text-xs font-semibold tracking-[0.25em] text-indigo-400/70 uppercase">
              Why It Matters
            </span>
            <h2 className="mb-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Real Problems. Intelligent Solutions.
            </h2>
            <p className="mx-auto max-w-2xl text-base text-white/45">
              Every AI initiative starts with a business challenge. Here is how we turn
              common pain points into competitive advantages.
            </p>
          </SectionReveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {challenges.map((item, i) => (
              <SectionReveal key={item.challenge} delay={i * 100}>
                <div className="group h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-xl transition-all duration-500 hover:border-indigo-500/20 hover:bg-white/[0.04]">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 ring-1 ring-red-500/20">
                      <item.icon className="h-5 w-5 text-red-400/80" />
                    </div>
                    <span className="text-xs font-medium tracking-wider text-red-400/60 uppercase">
                      Challenge
                    </span>
                  </div>
                  <h3 className="mb-3 text-base font-semibold text-white/90">{item.challenge}</h3>
                  <div className="mb-3 flex items-center gap-2">
                    <ArrowRight className="h-3.5 w-3.5 text-indigo-400" />
                    <span className="text-xs font-medium tracking-wider text-indigo-400/70 uppercase">
                      Solution
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-white/45 transition-colors duration-300 group-hover:text-white/65">
                    {item.solution}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 4 — AI CAPABILITIES                                 */}
      {/* ============================================================ */}
      <section id="capabilities" className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute top-1/2 left-0 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-purple-600/[0.04] blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionReveal className="mb-16 text-center">
            <span className="mb-4 inline-block text-xs font-semibold tracking-[0.25em] text-indigo-400/70 uppercase">
              Capabilities
            </span>
            <h2 className="mb-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              AI Capabilities For Modern Businesses
            </h2>
            <p className="mx-auto max-w-2xl text-base text-white/45">
              A comprehensive suite of intelligent solutions designed to solve real
              business problems.
            </p>
          </SectionReveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {capabilities.map((cap, i) => (
              <CapabilityCard key={cap.title} {...cap} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 5 — HOW AI WORKS WITH SOFTWARE                      */}
      {/* ============================================================ */}
      <section className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/[0.08] to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionReveal className="mb-20 text-center">
            <span className="mb-4 inline-block text-xs font-semibold tracking-[0.25em] text-indigo-400/70 uppercase">
              Workflow
            </span>
            <h2 className="mb-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              From Business Data To Intelligent Software
            </h2>
            <p className="mx-auto max-w-2xl text-base text-white/45">
              A seamless pipeline that transforms raw data into actionable intelligence.
            </p>
          </SectionReveal>

          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-6">
            {workflowSteps.map((step, i) => (
              <WorkflowStep
                key={step.number}
                {...step}
                index={i}
                isLast={i === workflowSteps.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 6 — REAL-WORLD APPLICATIONS                         */}
      {/* ============================================================ */}
      <section className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-indigo-600/[0.03] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionReveal className="mb-16 text-center">
            <span className="mb-4 inline-block text-xs font-semibold tracking-[0.25em] text-indigo-400/70 uppercase">
              Applications
            </span>
            <h2 className="mb-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Where AI Creates Business Value
            </h2>
            <p className="mx-auto max-w-2xl text-base text-white/45">
              Intelligent solutions tailored to the unique challenges of every industry.
            </p>
          </SectionReveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {applications.map((app, i) => (
              <ApplicationCard key={app.title} {...app} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 7 — AI + EXISTING SOFTWARE                          */}
      {/* ============================================================ */}
      <section className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-purple-600/[0.04] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionReveal className="mb-16 text-center">
            <span className="mb-4 inline-block text-xs font-semibold tracking-[0.25em] text-indigo-400/70 uppercase">
              Integration
            </span>
            <h2 className="mb-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Make Your Existing Software Smarter
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/45">
              AI doesn&apos;t have to replace your existing systems. We can integrate
              intelligent capabilities into the software your business already uses.
            </p>
          </SectionReveal>

          <div className="mx-auto flex max-w-lg flex-col items-center">
            {architectureNodes.map((node, i) => (
              <ArchitectureNode
                key={node.label}
                {...node}
                index={i}
                isLast={i === architectureNodes.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 8 — OUR PROCESS                                     */}
      {/* ============================================================ */}
      <section className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/[0.05] to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionReveal className="mb-16 text-center">
            <span className="mb-4 inline-block text-xs font-semibold tracking-[0.25em] text-indigo-400/70 uppercase">
              Our Process
            </span>
            <h2 className="mb-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              From Idea To Intelligent Production
            </h2>
            <p className="mx-auto max-w-2xl text-base text-white/45">
              A structured, transparent engagement model designed to deliver working
              intelligence quickly.
            </p>
          </SectionReveal>

          <div className="grid gap-6 lg:grid-cols-4">
            {processPhases.map((phase, i) => (
              <SectionReveal key={phase.phase} delay={i * 120}>
                <div className="group relative h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-indigo-500/25 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.25)]">
                  {/* Step number badge */}
                  <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full border border-indigo-500/30 bg-[#050508] text-xs font-bold text-indigo-300">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-purple-500/15 ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110">
                    <phase.icon className="h-6 w-6 text-indigo-300" />
                  </div>
                  <div className="mb-1 text-xs font-medium tracking-wider text-indigo-400/60 uppercase">
                    {phase.duration}
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-white">{phase.phase}</h3>
                  <p className="text-sm leading-relaxed text-white/45 transition-colors duration-300 group-hover:text-white/65">
                    {phase.description}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 9 — TRUST & SECURITY                                */}
      {/* ============================================================ */}
      <section className="relative py-24 sm:py-32">
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <SectionReveal>
              <span className="mb-4 inline-block text-xs font-semibold tracking-[0.25em] text-indigo-400/70 uppercase">
                Trust & Security
              </span>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Enterprise AI You Can Trust
              </h2>
              <p className="mb-8 text-base leading-relaxed text-white/45">
                Security, compliance, and transparency are built into every solution we
                deliver. Your data stays protected, your models stay explainable, and
                your business stays in control.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {trustPoints.map((point) => (
                  <div key={point.text} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 ring-1 ring-indigo-500/20">
                      <point.icon className="h-3 w-3 text-indigo-400" />
                    </div>
                    <span className="text-sm text-white/55">{point.text}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>

            {/* Abstract security visual */}
            <SectionReveal delay={200}>
              <div className="relative flex items-center justify-center">
                <div className="relative h-72 w-72 sm:h-80 sm:w-80">
                  {/* Outer orbit */}
                  <div className="absolute inset-0 animate-[spin_20s_linear_infinite] rounded-full border border-indigo-500/10">
                    <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-indigo-400/60 shadow-[0_0_10px_2px_rgba(99,102,241,0.5)]" />
                  </div>
                  {/* Middle orbit */}
                  <div className="absolute inset-8 animate-[spin_15s_linear_infinite_reverse] rounded-full border border-purple-500/10">
                    <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-purple-400/60 shadow-[0_0_10px_2px_rgba(139,92,246,0.5)]" />
                  </div>
                  {/* Inner orbit */}
                  <div className="absolute inset-16 animate-[spin_10s_linear_infinite] rounded-full border border-indigo-500/15">
                    <div className="absolute top-1/2 -right-1 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-indigo-300/70" />
                  </div>
                  {/* Center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl">
                      <Shield className="h-10 w-10 text-indigo-300" />
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 10 — TECHNOLOGY STRIP                               */}
      {/* ============================================================ */}
      <section className="relative py-20 sm:py-28">
        <div className="relative mx-auto max-w-5xl px-6 text-center sm:px-8">
          <SectionReveal>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Built With Modern Technology
            </h2>
            <p className="mx-auto mb-12 max-w-xl text-sm text-white/40">
              Enterprise-grade tools and frameworks that power reliable, scalable
              intelligent systems.
            </p>
          </SectionReveal>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {technologies.map((tech, i) => (
              <TechPill key={tech.label} {...tech} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 11 — FAQ                                            */}
      {/* ============================================================ */}
      <section className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute top-1/2 left-0 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-indigo-600/[0.04] blur-[100px]" />

        <div className="relative mx-auto max-w-3xl px-6 sm:px-8">
          <SectionReveal className="mb-14 text-center">
            <span className="mb-4 inline-block text-xs font-semibold tracking-[0.25em] text-indigo-400/70 uppercase">
              FAQ
            </span>
            <h2 className="mb-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Questions, Answered
            </h2>
            <p className="text-base text-white/45">
              Common questions about building AI into your software.
            </p>
          </SectionReveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <SectionReveal key={i} delay={i * 80}>
                <div
                  className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                    openFaq === i
                      ? 'border-indigo-500/30 bg-white/[0.04]'
                      : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  >
                    <span className="text-sm font-medium text-white/85 sm:text-base">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-indigo-400 transition-transform duration-300 ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      openFaq === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-4 text-sm leading-relaxed text-white/50">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 12 — FINAL CTA                                      */}
      {/* ============================================================ */}
      <section id="cta" className="relative overflow-hidden py-28 sm:py-36">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.08) 25%, transparent 50%, rgba(99,102,241,0.08) 75%, rgba(139,92,246,0.12) 100%)',
            backgroundSize: '300% 300%',
            animation: 'gradientShift 12s ease-in-out infinite',
          }}
        />

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-0 h-px w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
          <div className="absolute bottom-1/4 left-0 h-px w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
          <div className="absolute top-0 left-1/4 h-full w-px bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent" />
          <div className="absolute top-0 right-1/4 h-full w-px bg-gradient-to-b from-transparent via-purple-500/10 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-indigo-400/30"
              style={{
                left: `${5 + i * 4.5}%`,
                top: `${15 + (i % 6) * 12}%`,
                animation: `floatParticle ${7 + (i % 5) * 2.5}s linear infinite`,
                animationDelay: `${i * 0.6}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center sm:px-8">
          <SectionReveal>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/[0.07] px-4 py-1.5 backdrop-blur-sm">
              <Zap className="h-3.5 w-3.5 text-indigo-400" />
              <span className="text-xs font-medium text-indigo-300/80">
                Free AI Opportunity Assessment
              </span>
            </div>

            <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready To Build{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
                Smarter Software?
              </span>
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg">
              Bring AI and machine learning into your next digital product and turn your
              business data into intelligent action.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_50px_-10px_rgba(99,102,241,0.7)] sm:w-auto">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Your AI Project
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>

              <button
                onClick={() => scrollTo('capabilities')}
                className="group w-full rounded-full border border-white/15 bg-white/[0.04] px-8 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-indigo-500/40 hover:bg-white/[0.08] hover:text-white hover:shadow-[0_0_30px_-8px_rgba(99,102,241,0.4)] sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  Explore Solutions
                  <Shield className="h-4 w-4 text-indigo-400" />
                </span>
              </button>
            </div>

            <p className="mt-6 text-xs text-white/30">
              No commitment. We&apos;ll review your data landscape and share a tailored
              opportunity report within 5 business days.
            </p>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
};

export default AI_MachineLearning;