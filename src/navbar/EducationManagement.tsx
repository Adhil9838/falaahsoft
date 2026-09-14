import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  GraduationCap,
  Users,
  BookOpen,
  ClipboardCheck,
  CreditCard,
  BarChart3,
  Play,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  Calendar,
  Award,
  Clock,
  ChevronRight,
  Sparkles,
  Brain,
  Target,
  LineChart,
  PieChart,
  Activity,
  FileText,
  Video,
  HelpCircle,
  Layers,
  Globe,
  Shield,
  Zap,
  UserCheck,
  MessageSquare,
  Send,
  Briefcase,
} from 'lucide-react';

// ---------- Sapphire Blue Palette ----------
// sapphire-50:  #EFF4FF
// sapphire-100: #DBE6FE
// sapphire-400: #5B8DEF
// sapphire-500: #3B6FE0
// sapphire-600: #0F52BA  (primary sapphire)
// sapphire-700: #0A3F94
// sapphire-900: #052154

// ---------- Types ----------
interface SolutionCard {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface StatItem {
  value: string;
  label: string;
}

interface WorkflowStep {
  step: string;
  title: string;
  description: string;
}

interface FooterColumn {
  heading: string;
  links: string[];
}

interface FloatingCard {
  label: string;
  value: string;
  icon: React.ElementType;
  position: string;
  delay: string;
}

// ---------- Custom Hooks ----------
const useInView = (options = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, ...options }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
};

const useCountUp = (end: number, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const { ref, isInView } = useInView();

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration, start]);

  return { ref, count };
};

// ---------- Reusable Components ----------
const SectionWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}> = ({ children, className = '', id, dark = false }) => {
  const { ref, isInView } = useInView();
  return (
    <section
      id={id}
      ref={ref}
      className={`relative w-full overflow-hidden ${
        dark ? 'bg-black' : 'bg-white'
      } ${className}`}
    >
      <div
        className={`transition-all duration-1000 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        {children}
      </div>
    </section>
  );
};

const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}> = ({ children, className = '', hover = true }) => (
  <div
    className={`relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl shadow-black/20 transition-all duration-500 ${
      hover
        ? 'hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0F52BA]/20 hover:border-[#5B8DEF]/40'
        : ''
    } ${className}`}
  >
    {children}
  </div>
);

const GradientText: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <span
    className={`bg-gradient-to-r from-[#5B8DEF] via-[#3B6FE0] to-[#0F52BA] bg-clip-text text-transparent ${className}`}
  >
    {children}
  </span>
);

const AnimatedButton: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}> = ({ children, variant = 'primary', className = '', onClick, ariaLabel }) => {
  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B8DEF] focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-[0.98]';
  const variants = {
    primary:
      'bg-gradient-to-r from-[#0F52BA] to-[#3B6FE0] text-white shadow-lg shadow-[#0F52BA]/40 hover:shadow-xl hover:shadow-[#0F52BA]/60 hover:brightness-110',
    secondary:
      'bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40',
    ghost:
      'bg-transparent text-slate-300 hover:text-white hover:bg-white/5',
  };
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// ---------- Main Component ----------
const EducationManagement: React.FC = () => {
  // ---------- Data ----------
  const solutions: SolutionCard[] = useMemo(
    () => [
      {
        icon: GraduationCap,
        title: 'Student Management',
        description:
          'Manage student profiles, admissions, attendance, academic records, and communication from one platform.',
      },
      {
        icon: Users,
        title: 'Teacher Management',
        description:
          'Manage teacher profiles, schedules, workload, attendance, and performance efficiently.',
      },
      {
        icon: BookOpen,
        title: 'Learning Management',
        description:
          'Deliver courses, lessons, assignments, learning materials, quizzes, and personalized learning experiences.',
      },
      {
        icon: ClipboardCheck,
        title: 'Examination & Assessment',
        description:
          'Create examinations, assessments, grading workflows, results, and detailed academic reports.',
      },
      {
        icon: CreditCard,
        title: 'Fees & Finance',
        description:
          'Manage student fees, payments, invoices, scholarships, and financial reporting.',
      },
      {
        icon: BarChart3,
        title: 'Education Analytics',
        description:
          'Turn academic data into actionable insights with attendance, performance, progress, and institutional analytics.',
      },
    ],
    []
  );

  const features = useMemo(
    () => [
      'Online Courses',
      'Live & Recorded Classes',
      'Digital Assignments',
      'Interactive Assessments',
      'Progress Tracking',
      'Certificates',
    ],
    []
  );

  const aiFeatures = useMemo(
    () => [
      {
        icon: Brain,
        title: 'AI Learning Assistant',
        description:
          'A 24/7 intelligent tutor that answers questions, explains concepts, and guides learners step by step.',
      },
      {
        icon: Target,
        title: 'Personalized Recommendations',
        description:
          'Adaptive content suggestions based on each student’s strengths, weaknesses, and learning pace.',
      },
      {
        icon: Zap,
        title: 'Automated Assessments',
        description:
          'AI-generated quizzes and instant grading with detailed feedback for every learner.',
      },
      {
        icon: LineChart,
        title: 'Student Performance Insights',
        description:
          'Predictive analytics that identify at-risk students and highlight opportunities for growth.',
      },
    ],
    []
  );

  const stats: StatItem[] = useMemo(
    () => [
      { value: '10K+', label: 'Students Managed' },
      { value: '500+', label: 'Institutions' },
      { value: '98%', label: 'Platform Availability' },
      { value: '24/7', label: 'Digital Access' },
    ],
    []
  );

  const workflow: WorkflowStep[] = useMemo(
    () => [
      { step: '01', title: 'Admissions', description: 'Streamline applications, enrollment, and onboarding.' },
      { step: '02', title: 'Student Management', description: 'Centralize records, attendance, and communication.' },
      { step: '03', title: 'Learning', description: 'Deliver engaging courses and personalized content.' },
      { step: '04', title: 'Assessment', description: 'Conduct exams, quizzes, and automated grading.' },
      { step: '05', title: 'Analytics', description: 'Gain actionable insights from academic data.' },
      { step: '06', title: 'Continuous Improvement', description: 'Optimize outcomes with data-driven decisions.' },
    ],
    []
  );

  const footerColumns: FooterColumn[] = useMemo(
    () => [
      {
        heading: 'Product',
        links: [
          'Student Management',
          'Teacher Management',
          'LMS',
          'Examination',
          'Fees',
          'Analytics',
        ],
      },
      {
        heading: 'Solutions',
        links: ['Schools', 'Colleges', 'Universities', 'EdTech'],
      },
      {
        heading: 'Company',
        links: ['About', 'Services', 'Contact'],
      },
    ],
    []
  );

  const floatingCards: FloatingCard[] = useMemo(
    () => [
      {
        label: '98% Attendance',
        value: 'Attendance',
        icon: UserCheck,
        position: 'top-4 -left-8 md:-left-12',
        delay: '0s',
      },
      {
        label: '92% Course Progress',
        value: 'Progress',
        icon: TrendingUp,
        position: 'bottom-24 -right-6 md:-right-10',
        delay: '0.2s',
      },
      {
        label: '24 Assignments',
        value: 'Assignments',
        icon: FileText,
        position: 'bottom-4 -left-6 md:-left-10',
        delay: '0.4s',
      },
      {
        label: 'AI Learning Insights',
        value: 'AI Insights',
        icon: Sparkles,
        position: 'top-24 -right-8 md:-right-12',
        delay: '0.6s',
      },
    ],
    []
  );

  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Ensure the video plays even if the browser blocks autoplay initially
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.play().catch((err) => {
        console.warn('Video autoplay was blocked:', err);
      });
    };

    tryPlay();

    const onUserInteraction = () => {
      tryPlay();
      window.removeEventListener('click', onUserInteraction);
      window.removeEventListener('touchstart', onUserInteraction);
      window.removeEventListener('scroll', onUserInteraction);
    };
    window.addEventListener('click', onUserInteraction, { once: true });
    window.addEventListener('touchstart', onUserInteraction, { once: true });
    window.addEventListener('scroll', onUserInteraction, { once: true });

    return () => {
      window.removeEventListener('click', onUserInteraction);
      window.removeEventListener('touchstart', onUserInteraction);
      window.removeEventListener('scroll', onUserInteraction);
    };
  }, []);

  const statCounters = useMemo(
    () =>
      stats.map((s) => {
        const numeric = parseInt(s.value.replace(/[^0-9]/g, ''), 10);
        return { ...s, numeric: isNaN(numeric) ? 0 : numeric };
      }),
    [stats]
  );

  const CounterItem: React.FC<{ item: StatItem; numeric: number }> = ({ item, numeric }) => {
    const { ref, count } = useCountUp(numeric, 1800);
    const suffix = item.value.replace(/[0-9]/g, '');
    return (
      <div ref={ref} className="text-center">
        <div className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
          <GradientText>
            {count}
            {suffix}
          </GradientText>
        </div>
        <p className="mt-2 text-sm font-medium text-slate-400 md:text-base">{item.label}</p>
      </div>
    );
  };

  // ---------- Render ----------
  return (
    <div className="min-h-screen bg-black font-sans antialiased selection:bg-[#0F52BA]/40 selection:text-white">
      {/* ---------- Navigation ---------- */}

      {/* ---------- 1. HERO SECTION (Full Screen) ---------- */}
      {/* - h-screen: makes the section fill the entire viewport height
          - min-h-screen: guarantees full height on mobile browsers with dynamic toolbars
          - isolate: scopes -z-* children to this section
          - overflow-hidden: clips video so it can't bleed out
          - flex items-center: vertically centers content within the full screen
          - no padding top/bottom so content truly fills the viewport */}
      <section
        id="hero"
        className="relative isolate flex h-screen min-h-screen w-full items-center overflow-hidden bg-black"
      >
        {/* --- Video Background Layer (fills entire section) --- */}
        <div className="absolute inset-0 -z-20 overflow-hidden bg-black">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
            style={{ opacity: 0.55 }}
          >
            {/* Replace the src below with your actual video URL */}
            <source src="/eduction.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Gradient tint overlay ensures text readability without fully hiding the video */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        </div>

        {/* --- Gradient & Pattern Overlay Layer --- */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(15,82,186,0.35),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(59,111,224,0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-[#5B8DEF]/40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${8 + Math.random() * 12}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* --- Hero Content --- */}
        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-8">
          <div
            ref={heroRef}
            className={`transition-all duration-1000 ${
              heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#5B8DEF]/40 bg-[#0F52BA]/20 px-4 py-1.5 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[#5B8DEF]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#5B8DEF]">
                Education Technology
              </span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Transforming Education Through{' '}
              <GradientText>Intelligent Technology</GradientText>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Connect students, educators, parents, and administrators through one powerful
              digital education ecosystem.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <AnimatedButton className="w-full sm:w-auto">
                Explore Solutions
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </AnimatedButton>
              <AnimatedButton variant="secondary" className="w-full sm:w-auto">
                <Play className="h-4 w-4" />
                Request a Demo
              </AnimatedButton>
            </div>
            <p className="mt-6 text-xs font-medium tracking-wide text-slate-500 sm:text-sm">
              Built for Schools • Colleges • Universities • EdTech
            </p>
          </div>

          <div
            className={`relative transition-all delay-300 duration-1000 ${
              heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            {floatingCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className={`absolute z-20 hidden animate-[float_6s_ease-in-out_infinite] rounded-xl border border-white/10 bg-white/10 px-3 py-2 shadow-xl backdrop-blur-xl md:block ${card.position}`}
                  style={{ animationDelay: card.delay }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#0F52BA] to-[#3B6FE0]">
                      <Icon className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="whitespace-nowrap text-xs font-semibold text-white">
                      {card.label}
                    </span>
                  </div>
                </div>
              );
            })}

            <div className="relative mx-auto max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl shadow-[#0F52BA]/20 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                </div>
                <span className="text-xs font-medium text-slate-400">Education Dashboard</span>
              </div>
              <div className="space-y-4 p-5">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Students', value: '2,847', icon: Users, color: 'text-[#5B8DEF]' },
                    { label: 'Attendance', value: '98%', icon: UserCheck, color: 'text-green-400' },
                    { label: 'Courses', value: '156', icon: BookOpen, color: 'text-[#3B6FE0]' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-white/5 bg-white/5 p-3"
                    >
                      <stat.icon className={`mb-1 h-4 w-4 ${stat.color}`} />
                      <div className="text-lg font-bold text-white">{stat.value}</div>
                      <div className="text-[10px] text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">Student Performance</span>
                    <TrendingUp className="h-3.5 w-3.5 text-green-400" />
                  </div>
                  <div className="flex items-end gap-1.5">
                    {[40, 55, 45, 70, 60, 80, 75, 90, 85, 95, 88, 100].map((h, i) => (
                      <div
                        key={i}
                        className="w-full rounded-t-sm bg-gradient-to-t from-[#0A3F94] to-[#5B8DEF]"
                        style={{ height: `${h * 0.5}px` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Course Progress', value: 92, color: 'from-[#0F52BA] to-[#5B8DEF]' },
                    { label: 'Assignments', value: 78, color: 'from-[#3B6FE0] to-[#5B8DEF]' },
                    { label: 'Exams', value: 85, color: 'from-[#0A3F94] to-[#3B6FE0]' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="mb-1 flex justify-between text-[10px]">
                        <span className="text-slate-400">{item.label}</span>
                        <span className="font-medium text-white">{item.value}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 2. EDUCATION SOLUTIONS SECTION ---------- */}
      <SectionWrapper id="solutions" className="bg-[#0A0A0A] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Everything You Need to Manage{' '}
              <GradientText>Modern Education</GradientText>
            </h2>
            <p className="mt-4 text-base text-slate-400 sm:text-lg">
              Powerful digital solutions designed to simplify academic operations and create
              better learning experiences.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, idx) => {
              const Icon = solution.icon;
              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#5B8DEF]/40 hover:shadow-2xl hover:shadow-[#0F52BA]/20"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#0F52BA]/0 via-[#5B8DEF]/0 to-[#0F52BA]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-[#0F52BA]/20 group-hover:via-[#5B8DEF]/20 group-hover:to-[#0F52BA]/20" />
                  <div className="relative">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F52BA]/30 to-[#5B8DEF]/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-6 w-6 text-[#5B8DEF] transition-colors group-hover:text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{solution.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {solution.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#5B8DEF] opacity-0 transition-all duration-300 group-hover:opacity-100">
                      Explore Solution
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* ---------- 3. DIGITAL LEARNING SECTION ---------- */}
      <SectionWrapper id="platform" className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-lg">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/50">
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-3">
                  <span className="text-xs font-semibold text-slate-500">Learning Management</span>
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-slate-300" />
                    <div className="h-2 w-2 rounded-full bg-slate-300" />
                    <div className="h-2 w-2 rounded-full bg-slate-300" />
                  </div>
                </div>
                <div className="space-y-4 p-5">
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-[#0F52BA]" />
                      <span className="text-xs font-semibold text-slate-700">My Courses</span>
                    </div>
                    <div className="space-y-2">
                      {['Mathematics', 'Physics', 'Computer Science'].map((course, i) => (
                        <div
                          key={course}
                          className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-sm"
                        >
                          <span className="text-xs font-medium text-slate-600">{course}</span>
                          <span className="text-[10px] font-semibold text-[#0F52BA]">
                            {70 + i * 10}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-black p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                        <Play className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">Video Lesson</div>
                        <div className="text-[10px] text-slate-400">Chapter 5: Calculus</div>
                      </div>
                    </div>
                    <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/20">
                      <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#0F52BA] to-[#5B8DEF]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                      <HelpCircle className="mb-1 h-4 w-4 text-[#3B6FE0]" />
                      <div className="text-xs font-semibold text-slate-700">Quiz</div>
                      <div className="text-[10px] text-slate-400">5 questions</div>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                      <FileText className="mb-1 h-4 w-4 text-[#0F52BA]" />
                      <div className="text-xs font-semibold text-slate-700">Assignments</div>
                      <div className="text-[10px] text-slate-400">2 due</div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-gradient-to-r from-[#EFF4FF] to-[#DBE6FE] p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700">Learning Progress</span>
                      <span className="text-sm font-bold text-[#0F52BA]">92%</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white">
                      <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-[#0F52BA] to-[#5B8DEF]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-[#0F52BA]">
              Digital Learning
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Create Engaging <GradientText>Learning Experiences</GradientText>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Give learners access to interactive courses, digital resources, assessments, and
              personalized learning journeys from anywhere.
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-[#0F52BA]" />
                  <span className="text-sm font-medium text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <AnimatedButton>
                Discover LMS
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </AnimatedButton>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ---------- 4. SMART EDUCATION DASHBOARD ---------- */}
      <SectionWrapper id="analytics" className="bg-black py-20 md:py-28" dark>
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(15,82,186,0.25),transparent_60%)]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              See Education Through <GradientText>Data</GradientText>
            </h2>
            <p className="mt-4 text-base text-slate-400 sm:text-lg">
              A unified dashboard that turns academic data into actionable insights.
            </p>
          </div>

          <div className="mt-14 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] shadow-2xl backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F52BA] to-[#3B6FE0]">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Education Analytics</h3>
                  <p className="text-xs text-slate-400">Academic Year 2024–2025</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                  <Activity className="h-3 w-3" />
                  Live
                </span>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                  <Calendar className="mr-1 inline h-3 w-3" />
                  This Term
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                {[
                  { label: 'Total Students', value: '2,847', change: '+12%', icon: Users, color: 'text-[#5B8DEF]' },
                  { label: 'Attendance Rate', value: '98.2%', change: '+3.1%', icon: UserCheck, color: 'text-green-400' },
                  { label: 'Average Performance', value: '87.5%', change: '+5.4%', icon: TrendingUp, color: 'text-[#3B6FE0]' },
                  { label: 'Course Completion', value: '92%', change: '+8.2%', icon: Award, color: 'text-[#5B8DEF]' },
                  { label: 'Examination Results', value: '94%', change: '+4.7%', icon: ClipboardCheck, color: 'text-[#0F52BA]' },
                ].map((kpi) => (
                  <div
                    key={kpi.label}
                    className="rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                      <span className="text-[10px] font-medium text-green-400">{kpi.change}</span>
                    </div>
                    <div className="text-xl font-bold text-white">{kpi.value}</div>
                    <div className="mt-0.5 text-[10px] text-slate-400">{kpi.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="rounded-xl border border-white/5 bg-white/5 p-5 lg:col-span-2">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-white">Student Performance</h4>
                      <p className="text-xs text-slate-400">Average score trend</p>
                    </div>
                    <LineChart className="h-4 w-4 text-[#5B8DEF]" />
                  </div>
                  <svg viewBox="0 0 400 120" className="h-32 w-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5B8DEF" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#5B8DEF" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <polyline
                      points="0,90 40,75 80,80 120,55 160,60 200,40 240,45 280,30 320,35 360,20 400,25"
                      fill="none"
                      stroke="#5B8DEF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polygon
                      points="0,90 40,75 80,80 120,55 160,60 200,40 240,45 280,30 320,35 360,20 400,25 400,120 0,120"
                      fill="url(#lineGrad)"
                    />
                  </svg>
                  <div className="mt-2 flex justify-between text-[10px] text-slate-500">
                    {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/5 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-white">Attendance</h4>
                      <p className="text-xs text-slate-400">This week</p>
                    </div>
                    <PieChart className="h-4 w-4 text-green-400" />
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative h-28 w-28">
                      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="10" />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="10"
                          strokeDasharray="251.2"
                          strokeDashoffset="5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">98%</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {[
                      { day: 'Mon', pct: 96 },
                      { day: 'Tue', pct: 98 },
                      { day: 'Wed', pct: 97 },
                    ].map((d) => (
                      <div key={d.day} className="flex items-center gap-2">
                        <span className="w-8 text-[10px] text-slate-400">{d.day}</span>
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
                            style={{ width: `${d.pct}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-medium text-white">{d.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-white/5 bg-white/5 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-white">Recent Activities</h4>
                  <Clock className="h-4 w-4 text-slate-400" />
                </div>
                <div className="space-y-3">
                  {[
                    { icon: UserCheck, text: 'Attendance marked for Grade 10-A', time: '2 min ago', color: 'text-green-400' },
                    { icon: ClipboardCheck, text: 'Mid-term exam results published', time: '1 hour ago', color: 'text-[#5B8DEF]' },
                    { icon: BookOpen, text: 'New course material uploaded', time: '3 hours ago', color: 'text-[#3B6FE0]' },
                    { icon: CreditCard, text: 'Fee payment received from 24 students', time: '5 hours ago', color: 'text-[#0F52BA]' },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                        <activity.icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-slate-200">{activity.text}</p>
                        <p className="text-[10px] text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ---------- 5. AI-POWERED EDUCATION ---------- */}
      <SectionWrapper id="ai" className="bg-[#0A0A0A] py-20 md:py-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#0F52BA]/20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#5B8DEF]/40 bg-[#0F52BA]/20 px-4 py-1.5">
              <Brain className="h-3.5 w-3.5 text-[#5B8DEF]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#5B8DEF]">
                AI-Powered Education
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Personalized Learning <GradientText>Powered by AI</GradientText>
            </h2>
            <p className="mt-4 text-base text-slate-400 sm:text-lg">
              Help every learner move at their own pace with intelligent recommendations, adaptive
              content, and actionable academic insights.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aiFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <GlassCard key={idx} className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F52BA]/30 to-[#5B8DEF]/20">
                    <Icon className="h-6 w-6 text-[#5B8DEF]" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {feature.description}
                  </p>
                  <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#0F52BA] to-[#5B8DEF] transition-all duration-1000"
                      style={{ width: `${60 + idx * 10}%` }}
                    />
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* ---------- 6. CONNECTED EDUCATION ECOSYSTEM ---------- */}
      <SectionWrapper className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Connected <GradientText>Education Ecosystem</GradientText>
            </h2>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              One platform connecting every stakeholder in the education journey.
            </p>
          </div>

          <div className="relative mx-auto mt-16 max-w-3xl">
            <div className="relative z-10 mx-auto w-fit">
              <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F52BA] to-[#3B6FE0] px-8 py-6 shadow-2xl shadow-[#0F52BA]/30">
                <Layers className="mb-2 h-8 w-8 text-white" />
                <span className="text-sm font-bold uppercase tracking-widest text-white">
                  Education Platform
                </span>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:mt-16">
              {[
                { label: 'Student', icon: GraduationCap, color: 'from-[#0F52BA] to-[#3B6FE0]' },
                { label: 'Teacher', icon: Users, color: 'from-[#3B6FE0] to-[#5B8DEF]' },
                { label: 'Parent', icon: Users, color: 'from-[#0A3F94] to-[#0F52BA]' },
                { label: 'Administrator', icon: Shield, color: 'from-[#0F52BA] to-[#5B8DEF]' },
              ].map((node) => {
                const Icon = node.icon;
                return (
                  <div
                    key={node.label}
                    className="group flex flex-col items-center gap-3 rounded-xl border border-slate-100 bg-white p-5 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${node.color} shadow-lg`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{node.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {[
                { label: 'Attendance', icon: UserCheck },
                { label: 'Courses', icon: BookOpen },
                { label: 'Exams', icon: ClipboardCheck },
                { label: 'Fees', icon: CreditCard },
                { label: 'Communication', icon: MessageSquare },
                { label: 'Analytics', icon: BarChart3 },
              ].map((mod) => {
                const Icon = mod.icon;
                return (
                  <div
                    key={mod.label}
                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 transition-all duration-300 hover:border-[#5B8DEF] hover:bg-[#EFF4FF] hover:shadow-md"
                  >
                    <Icon className="h-3.5 w-3.5 text-[#0F52BA]" />
                    <span className="text-xs font-medium text-slate-600">{mod.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ---------- 7. WHY CHOOSE OUR PLATFORM ---------- */}
      <SectionWrapper className="bg-black py-20 md:py-28" dark>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {statCounters.map((item) => (
              <CounterItem key={item.label} item={item} numeric={item.numeric} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ---------- 8. EDUCATION WORKFLOW ---------- */}
      <SectionWrapper className="bg-[#0A0A0A] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Education <GradientText>Workflow</GradientText>
            </h2>
            <p className="mt-4 text-base text-slate-400 sm:text-lg">
              A streamlined process from admissions to continuous improvement.
            </p>
          </div>

          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-1/2 hidden h-0.5 -translate-y-1/2 bg-gradient-to-r from-[#0F52BA]/0 via-[#5B8DEF]/60 to-[#0F52BA]/0 lg:block" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
              {workflow.map((step) => (
                <div
                  key={step.step}
                  className="group relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#5B8DEF]/40 bg-[#0A0A0A] text-lg font-bold text-[#5B8DEF] shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:border-[#5B8DEF] group-hover:shadow-[#0F52BA]/40">
                    {step.step}
                  </div>
                  <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                  <p className="mt-1 text-xs text-slate-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ---------- 9. CTA SECTION ---------- */}
      <SectionWrapper className="relative overflow-hidden bg-black py-20 md:py-28" dark>
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(15,82,186,0.3),transparent_60%)]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Cpath d=%22M0 0h40v40H0z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        </div>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Build a Smarter Future for <GradientText>Education</GradientText>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-400 sm:text-lg">
            Bring your students, educators, parents, and academic operations together with one
            intelligent platform.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <AnimatedButton className="w-full sm:w-auto">
              Request a Demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </AnimatedButton>
            <AnimatedButton variant="secondary" className="w-full sm:w-auto">
              Talk to Our Team
            </AnimatedButton>
          </div>
        </div>
      </SectionWrapper>

      {/* ---------- 10. FOOTER ---------- */}
      <footer className="border-t border-white/5 bg-black pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F52BA] to-[#3B6FE0]">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold tracking-tight text-white">
                  Edu<span className="text-[#5B8DEF]">Sphere</span>
                </span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
                Intelligent education technology for schools, colleges, universities, and EdTech
                companies.
              </p>
              <div className="mt-6 flex gap-3">
                {[
                  { Icon: Globe, label: 'Website' },
                  { Icon: Send, label: 'Twitter / X' },
                  { Icon: Briefcase, label: 'LinkedIn' },
                  { Icon: Video, label: 'YouTube' },
                ].map(({ Icon, label }, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5B8DEF]/40 hover:bg-[#0F52BA]/20 hover:text-[#5B8DEF]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {footerColumns.map((col) => (
              <div key={col.heading}>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                  {col.heading}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-slate-400 transition-colors hover:text-[#5B8DEF]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} EduSphere. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-slate-500 transition-colors hover:text-[#5B8DEF]">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-slate-500 transition-colors hover:text-[#5B8DEF]">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default EducationManagement;