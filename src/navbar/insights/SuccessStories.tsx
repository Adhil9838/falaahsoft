import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Eye,
  Workflow,
  Layers,
  Server,
  Users,
  Rocket,
  Code2,
  Database,
  Brain,
  Cloud,
  GitBranch,
  Cpu,
  ShoppingBag,
  Building2,
  Heart,
  Truck,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Globe,
  Lock,
  Zap,
  RefreshCw,
  LayoutGrid,
  MessageSquare,
  Target,
} from 'lucide-react';

// ─── TypeScript Interfaces ───────────────────────────────────────────────────

interface SuccessStory {
  id: string;
  title: string;
  category: string;
  challenge: string;
  solution: string;
  technology: string[];
  impact: string[];
  icon: React.ReactNode;
  gradient: string;
  glowColor: string;
}

interface MetricItem {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}

interface ImpactCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

interface TimelineStep {
  label: string;
  description: string;
  icon: React.ReactNode;
}

interface ChallengeOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'retail',
    title: 'Retail Digital Platform',
    category: 'Retail & Commerce',
    challenge:
      'Fragmented sales operations and disconnected business data.',
    solution:
      'A centralized digital platform connecting products, customers, orders, inventory, and reporting.',
    technology: ['React', 'TypeScript', 'Laravel', 'PostgreSQL'],
    impact: [
      'Streamlined workflows',
      'Centralized information',
      'Improved operational visibility',
    ],
    icon: <ShoppingBag className="w-7 h-7" />,
    gradient: 'from-blue-500/20 to-cyan-500/10',
    glowColor: 'shadow-blue-500/20',
  },
  {
    id: 'realestate',
    title: 'Real Estate Digital Platform',
    category: 'PropTech',
    challenge:
      'Property information, customer enquiries, and sales workflows were handled across multiple systems.',
    solution:
      'A centralized platform for properties, leads, appointments, agents, documents, and customer communication.',
    technology: ['React', 'TypeScript', 'Laravel', 'PostgreSQL'],
    impact: [
      'Better lead visibility',
      'Faster workflows',
      'Improved customer follow-up',
    ],
    icon: <Building2 className="w-7 h-7" />,
    gradient: 'from-purple-500/20 to-pink-500/10',
    glowColor: 'shadow-purple-500/20',
  },
  {
    id: 'healthcare',
    title: 'Healthcare Digital Platform',
    category: 'HealthTech',
    challenge:
      'Appointment scheduling and operational workflows required better coordination.',
    solution:
      'A digital platform connecting appointments, doctors, schedules, tokens, notifications, and administrative workflows.',
    technology: ['React', 'TypeScript', 'Laravel', 'PostgreSQL', 'Socket.IO'],
    impact: [
      'Real-time updates',
      'Smoother scheduling',
      'Better operational visibility',
    ],
    icon: <Heart className="w-7 h-7" />,
    gradient: 'from-emerald-500/20 to-teal-500/10',
    glowColor: 'shadow-emerald-500/20',
  },
  {
    id: 'logistics',
    title: 'Logistics Platform',
    category: 'Supply Chain',
    challenge:
      'Shipment information and operational processes were spread across multiple workflows.',
    solution:
      'A connected logistics platform for shipment tracking, workflow automation, notifications, and operational visibility.',
    technology: ['React', 'TypeScript', 'Python', 'PostgreSQL'],
    impact: [
      'Improved tracking visibility',
      'Streamlined logistics workflows',
    ],
    icon: <Truck className="w-7 h-7" />,
    gradient: 'from-amber-500/20 to-orange-500/10',
    glowColor: 'shadow-amber-500/20',
  },
];

const METRICS: MetricItem[] = [
  { value: 50, suffix: '+', label: 'Projects Delivered', icon: <Rocket className="w-5 h-5" /> },
  { value: 10, suffix: '+', label: 'Industries', icon: <Globe className="w-5 h-5" /> },
  { value: 20, suffix: '+', label: 'Technologies', icon: <Code2 className="w-5 h-5" /> },
  { value: 95, suffix: '%', label: 'Client Satisfaction', icon: <TrendingUp className="w-5 h-5" /> },
];

const IMPACT_CARDS: ImpactCard[] = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Faster Operations',
    description:
      'Streamlined processes and automation that reduce manual effort and accelerate delivery cycles.',
    gradient: 'from-blue-500/20 to-cyan-500/5',
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Better Visibility',
    description:
      'Real-time dashboards and reporting that give you a clear picture of your entire operation.',
    gradient: 'from-purple-500/20 to-pink-500/5',
  },
  {
    icon: <Workflow className="w-6 h-6" />,
    title: 'Workflow Automation',
    description:
      'Intelligent automation that eliminates repetitive tasks and lets your team focus on what matters.',
    gradient: 'from-emerald-500/20 to-teal-500/5',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'System Integration',
    description:
      'Connected tools and platforms that work together seamlessly, eliminating data silos.',
    gradient: 'from-amber-500/20 to-orange-500/5',
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: 'Scalable Architecture',
    description:
      'Built to grow with your business — reliable, secure, and ready for whatever comes next.',
    gradient: 'from-rose-500/20 to-red-500/5',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Improved Customer Experience',
    description:
      'Faster responses, better communication, and smoother journeys that keep customers coming back.',
    gradient: 'from-indigo-500/20 to-violet-500/5',
  },
];

const TIMELINE_STEPS: TimelineStep[] = [
  { label: 'Challenge', description: 'We listen and understand your pain points.', icon: <Target className="w-5 h-5" /> },
  { label: 'Discovery', description: 'Deep dive into your processes and goals.', icon: <Eye className="w-5 h-5" /> },
  { label: 'Solution Design', description: 'Architecture and UX tailored to your needs.', icon: <LayoutGrid className="w-5 h-5" /> },
  { label: 'Development', description: 'Agile sprints with regular demos and feedback.', icon: <Code2 className="w-5 h-5" /> },
  { label: 'Integration', description: 'Connecting with your existing tools and data.', icon: <GitBranch className="w-5 h-5" /> },
  { label: 'Deployment', description: 'Smooth rollout with monitoring and support.', icon: <Rocket className="w-5 h-5" /> },
  { label: 'Business Impact', description: 'Measurable results and continuous improvement.', icon: <BarChart3 className="w-5 h-5" /> },
];

const CHALLENGE_OPTIONS: ChallengeOption[] = [
  { id: 'manual', label: 'I need to replace manual processes', icon: <RefreshCw className="w-5 h-5" /> },
  { id: 'integrate', label: 'I need multiple systems integrated', icon: <Layers className="w-5 h-5" /> },
  { id: 'platform', label: 'I need a custom business platform', icon: <LayoutGrid className="w-5 h-5" /> },
  { id: 'realtime', label: 'I need real-time data', icon: <Zap className="w-5 h-5" /> },
  { id: 'automation', label: 'I need workflow automation', icon: <Workflow className="w-5 h-5" /> },
  { id: 'ai', label: 'I need an AI-powered solution', icon: <Brain className="w-5 h-5" /> },
];

const TECH_STACK = [
  { name: 'React', icon: <Code2 className="w-5 h-5" /> },
  { name: 'TypeScript', icon: <Code2 className="w-5 h-5" /> },
  { name: 'Laravel', icon: <Server className="w-5 h-5" /> },
  { name: 'Python', icon: <Code2 className="w-5 h-5" /> },
  { name: 'FastAPI', icon: <Zap className="w-5 h-5" /> },
  { name: 'PostgreSQL', icon: <Database className="w-5 h-5" /> },
  { name: 'MongoDB', icon: <Database className="w-5 h-5" /> },
  { name: 'AI/ML', icon: <Brain className="w-5 h-5" /> },
  { name: 'Cloud', icon: <Cloud className="w-5 h-5" /> },
  { name: 'DevOps', icon: <GitBranch className="w-5 h-5" /> },
  { name: 'IoT', icon: <Cpu className="w-5 h-5" /> },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(el);
      }
    }, { threshold: 0.15, ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}

function useCountUp(target: number, isInView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return count;
}

// ─── Reusable Components ──────────────────────────────────────────────────────

function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  const { ref, isInView } = useInView();
  return (
    <div
      ref={ref}
      className={`mb-14 transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${center ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}`}
    >
      {eyebrow && (
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-blue-400/80 mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base sm:text-lg text-white/50 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

function GlassCard({
  children,
  className = '',
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl ${
        hover
          ? 'transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-blue-500/5'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

function AnimatedCounter({ metric, isInView }: { metric: MetricItem; isInView: boolean }) {
  const count = useCountUp(metric.value, isInView);
  return (
    <div className="text-center group">
      <div className="flex items-center justify-center mb-3">
        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
          {metric.icon}
        </div>
      </div>
      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
        {count}
        <span className="text-blue-400">{metric.suffix}</span>
      </div>
      <div className="mt-2 text-sm text-white/40 font-medium tracking-wide">
        {metric.label}
      </div>
    </div>
  );
}

function StoryCard({ story, index }: { story: SuccessStory; index: number }) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 delay-${index * 100} ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <GlassCard className="overflow-hidden group">
        {/* Accent gradient bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${story.gradient}`} />

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left: Title + Category */}
            <div className="lg:w-1/3 shrink-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-blue-400">
                  {story.icon}
                </div>
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30">
                  {story.category}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                {story.title}
              </h3>

              {/* Technology pills */}
              <div className="flex flex-wrap gap-2">
                {story.technology.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/[0.05] border border-white/[0.08] text-white/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Challenge / Solution / Impact */}
            <div className="flex-1 space-y-6">
              <div>
                <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-red-400/70 mb-2">
                  Challenge
                </h4>
                <p className="text-sm text-white/50 leading-relaxed">
                  {story.challenge}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-blue-400/70 mb-2">
                  Solution
                </h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  {story.solution}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-emerald-400/70 mb-3">
                  Impact
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {story.impact.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span className="text-xs text-white/60 leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

function TechCard({ name, icon, index }: { name: string; icon: React.ReactNode; index: number }) {
  return (
    <div
      className="group flex items-center gap-3 px-5 py-4 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-lg transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06] hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 shrink-0"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <span className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
        {icon}
      </span>
      <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

function TimelineItem({
  step,
  index,
  isLast,
}: {
  step: TimelineStep;
  index: number;
  isLast: boolean;
}) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`relative flex gap-6 pb-10 transition-all duration-700 ${
        isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Line */}
      {!isLast && (
        <div className="absolute left-[23px] top-14 bottom-0 w-px bg-gradient-to-b from-blue-500/40 to-transparent" />
      )}

      {/* Dot */}
      <div className="relative z-10 shrink-0">
        <div className="w-12 h-12 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm flex items-center justify-center text-blue-400">
          {step.icon}
        </div>
      </div>

      {/* Content */}
      <div className="pt-1.5">
        <h4 className="text-base font-semibold text-white mb-1">{step.label}</h4>
        <p className="text-sm text-white/40 leading-relaxed">{step.description}</p>
      </div>
    </div>
  );
}

function ChallengeCard({
  challenge,
  selected,
  onSelect,
}: {
  challenge: ChallengeOption;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 group ${
        selected
          ? 'border-blue-500/50 bg-blue-500/10 shadow-lg shadow-blue-500/10'
          : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.05]'
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-2.5 rounded-xl transition-colors duration-300 ${
            selected
              ? 'bg-blue-500/20 text-blue-300'
              : 'bg-white/[0.04] text-white/40 group-hover:text-white/60'
          }`}
        >
          {challenge.icon}
        </div>
        <span
          className={`text-sm font-medium transition-colors duration-300 ${
            selected ? 'text-white' : 'text-white/60 group-hover:text-white/80'
          }`}
        >
          {challenge.label}
        </span>
        {selected && (
          <CheckCircle2 className="w-5 h-5 text-blue-400 ml-auto shrink-0" />
        )}
      </div>
    </button>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function SuccessStories() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const [metricsInView, setMetricsInView] = useState(false);

  // Hero entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Metrics observer
  useEffect(() => {
    const el = metricsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMetricsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToStories = useCallback(() => {
    document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToContact = useCallback(() => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#050510] text-white antialiased selection:bg-blue-500/30 overflow-x-hidden">
      {/* ─── Global Background Effects ─────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[120px]" />
      </div>

      {/* ─── 1. HERO SECTION ──────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Floating orbs */}
        <div className="absolute top-20 left-[15%] w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/[0.03] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.04] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/[0.05] rounded-full" />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-float"
            style={{
              top: `${20 + i * 12}%`,
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${6 + i}s`,
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 text-center">
          {/* Eyebrow */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm mb-8 transition-all duration-1000 ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/50">
              Success Stories
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Technology That Creates{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Real Business Impact
            </span>
          </h1>

          {/* Supporting text */}
          <p
            className={`mt-7 text-base sm:text-lg lg:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Explore how we transform complex business challenges into scalable
            digital products, connected platforms, and intelligent workflows.
          </p>

          {/* CTAs */}
          <div
            className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-600 ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button
              onClick={scrollToStories}
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="flex items-center gap-2">
                Explore Success Stories
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
            <button
              onClick={scrollToContact}
              className="group px-8 py-4 rounded-full border border-white/[0.12] bg-white/[0.03] backdrop-blur-sm text-white/80 font-semibold text-sm tracking-wide transition-all duration-300 hover:border-white/[0.25] hover:bg-white/[0.06] hover:text-white hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="flex items-center gap-2">
                Discuss Your Project
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>

          {/* Scroll indicator */}
          <div
            className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
              heroLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="w-6 h-10 rounded-full border-2 border-white/[0.15] flex items-start justify-center p-1.5">
              <div className="w-1.5 h-3 rounded-full bg-blue-400/60 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. SUCCESS METRICS ──────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32" ref={metricsRef}>
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {METRICS.map((metric) => (
              <AnimatedCounter key={metric.label} metric={metric} isInView={metricsInView} />
            ))}
          </div>

          {/* Scalable digital solutions badge */}
          <div
            className={`mt-16 text-center transition-all duration-700 delay-700 ${
              metricsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
              <Server className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white/50">
                Scalable Digital Solutions
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. FEATURED SUCCESS STORIES ─────────────────────────────────── */}
      <section id="stories" className="relative py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <SectionHeading
            eyebrow="Featured Work"
            title="Projects That Moved the Needle"
            description="Each engagement starts with a real business problem. Here's how we solved them."
          />

          <div className="space-y-8">
            {SUCCESS_STORIES.map((story, i) => (
              <StoryCard key={story.id} story={story} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. BEFORE VS AFTER ──────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <SectionHeading
            eyebrow="Transformation"
            title="From Fragmented to Connected"
            description="See the difference our solutions make across your entire operation."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Before */}
            <BeforeAfterColumn
              title="Before"
              items={[
                'Manual processes',
                'Scattered information',
                'Repetitive work',
                'Delayed updates',
                'Multiple disconnected tools',
              ]}
              variant="before"
            />

            {/* After */}
            <BeforeAfterColumn
              title="After"
              items={[
                'Automated workflows',
                'Centralized information',
                'Real-time updates',
                'Integrated systems',
                'Better business visibility',
              ]}
              variant="after"
            />
          </div>

          {/* Center arrow */}
          <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/30 animate-pulse">
              <ArrowRight className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. OUR TECHNOLOGY ───────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <SectionHeading
            eyebrow="Our Stack"
            title="Technologies We Master"
            description="Modern tools and frameworks we use to build reliable, scalable solutions."
          />
        </div>

        {/* Horizontal scroll */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 px-6 sm:px-8 scrollbar-hide max-w-6xl mx-auto flex-wrap justify-center">
            {TECH_STACK.map((tech, i) => (
              <TechCard key={tech.name} name={tech.name} icon={tech.icon} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. BUSINESS IMPACT ──────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <SectionHeading
            eyebrow="Business Impact"
            title="What You Gain"
            description="Every solution is designed to create measurable business outcomes."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {IMPACT_CARDS.map((card, i) => (
              <ImpactCardItem key={card.title} card={card} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. SUCCESS STORY TIMELINE ───────────────────────────────────── */}
      <section className="relative py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <SectionHeading
            eyebrow="Our Process"
            title="How We Bring Ideas to Life"
            description="A proven approach that keeps you informed and involved at every stage."
          />

          <div className="relative">
            {TIMELINE_STEPS.map((step, i) => (
              <TimelineItem
                key={step.label}
                step={step}
                index={i}
                isLast={i === TIMELINE_STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. CLIENT CHALLENGE SECTION ─────────────────────────────────── */}
      <section className="relative py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <SectionHeading
            eyebrow="Your Turn"
            title="Have a Challenge Similar to These?"
            description="Select what resonates with you. We'll help you find the right path forward."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CHALLENGE_OPTIONS.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                selected={selectedChallenge === challenge.id}
                onSelect={() =>
                  setSelectedChallenge(
                    selectedChallenge === challenge.id ? null : challenge.id
                  )
                }
              />
            ))}
          </div>

          {selectedChallenge && (
            <div className="mt-8 text-center animate-in fade-in duration-500">
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-[1.03]"
              >
                Let's Talk About Your Challenge
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── 9. FINAL CTA ────────────────────────────────────────────────── */}
      <section id="cta" className="relative py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent backdrop-blur-xl overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px]" />

            <div className="relative z-10 px-8 sm:px-12 lg:px-16 py-16 sm:py-20 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] mb-8">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/50">
                  Let's Build Together
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight max-w-3xl mx-auto">
                Your Challenge Could Be Our{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Next Success Story
                </span>
              </h2>

              <p className="mt-6 text-base sm:text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
                Tell us what you're trying to solve. We'll help you explore the
                right technology, architecture, and implementation approach.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-[1.03] active:scale-[0.98]">
                  <span className="flex items-center gap-2">
                    Start a Conversation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
                <button className="group px-8 py-4 rounded-full border border-white/[0.12] bg-white/[0.03] backdrop-blur-sm text-white/80 font-semibold text-sm tracking-wide transition-all duration-300 hover:border-white/[0.25] hover:bg-white/[0.06] hover:text-white hover:scale-[1.03] active:scale-[0.98]">
                  <span className="flex items-center gap-2">
                    Explore Our Solutions
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Additional Sub-Components ────────────────────────────────────────────────

function BeforeAfterColumn({
  title,
  items,
  variant,
}: {
  title: string;
  items: string[];
  variant: 'before' | 'after';
}) {
  const { ref, isInView } = useInView();
  const isBefore = variant === 'before';

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isInView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      }`}
    >
      <GlassCard className="p-6 sm:p-8 h-full">
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`p-2 rounded-lg ${
              isBefore
                ? 'bg-red-500/10 border border-red-500/20'
                : 'bg-emerald-500/10 border border-emerald-500/20'
            }`}
          >
            {isBefore ? (
              <Lock className="w-4 h-4 text-red-400" />
            ) : (
              <Sparkles className="w-4 h-4 text-emerald-400" />
            )}
          </div>
          <h3
            className={`text-lg font-semibold ${
              isBefore ? 'text-red-400/80' : 'text-emerald-400/80'
            }`}
          >
            {title}
          </h3>
        </div>

        <ul className="space-y-3.5">
          {items.map((item, i) => (
            <li
              key={item}
              className="flex items-start gap-3 transition-all duration-500"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateX(0)' : 'translateX(-10px)',
                transitionDelay: `${i * 100 + 300}ms`,
              }}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
                  isBefore ? 'bg-red-400/50' : 'bg-emerald-400/50'
                }`}
              />
              <span className="text-sm text-white/50 leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </GlassCard>
    </div>
  );
}

function ImpactCardItem({ card, index }: { card: ImpactCard; index: number }) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <GlassCard className="p-6 sm:p-7 h-full group cursor-default">
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        <div className="relative z-10">
          <div className="p-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-blue-400 w-fit mb-5 group-hover:scale-110 transition-transform duration-300">
            {card.icon}
          </div>
          <h3 className="text-base font-semibold text-white mb-2">
            {card.title}
          </h3>
          <p className="text-sm text-white/40 leading-relaxed">
            {card.description}
          </p>
        </div>
      </GlassCard>
    </div>
  );
}