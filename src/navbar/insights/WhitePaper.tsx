import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  FileText,
  BookOpen,
  ArrowRight,
  Search,
  Cpu,
  Cloud,
  Database,
  Wifi,
  Shield,
  Code2,
  TrendingUp,
  Sparkles,
  Globe,
  Layers,
  Zap,
  Brain,
  Network,
  Settings,
  Monitor,
  Lightbulb,
  BarChart3,
  ChevronRight,
  X,
  Calendar,
  Clock,
  Filter,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface WhitePaper {
  id: number;
  title: string;
  category: string;
  description: string;
  readingTime: string;
  publishedDate: string;
  icon: React.ElementType;
}

interface Category {
  label: string;
  icon: React.ElementType;
}

interface ResearchTopic {
  title: string;
  description: string;
  icon: React.ElementType;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const categories: Category[] = [
  { label: "All", icon: Layers },
  { label: "Artificial Intelligence", icon: Brain },
  { label: "Cloud & DevOps", icon: Cloud },
  { label: "Data Engineering", icon: Database },
  { label: "IoT", icon: Wifi },
  { label: "Cybersecurity", icon: Shield },
  { label: "Custom Software", icon: Code2 },
  { label: "Digital Transformation", icon: TrendingUp },
];

const whitePapers: WhitePaper[] = [
  {
    id: 1,
    title: "AI Adoption Strategies for Modern Businesses",
    category: "Artificial Intelligence",
    description:
      "A pragmatic framework for integrating AI capabilities into existing business processes, covering model selection, data readiness, and organizational change management.",
    readingTime: "12 min read",
    publishedDate: "Jan 2025",
    icon: Brain,
  },
  {
    id: 2,
    title: "Cloud Modernization: From Legacy Systems to Scalable Platforms",
    category: "Cloud & DevOps",
    description:
      "Strategies for migrating monolithic workloads to cloud-native architectures while maintaining business continuity and optimizing operational costs.",
    readingTime: "15 min read",
    publishedDate: "Feb 2025",
    icon: Cloud,
  },
  {
    id: 3,
    title: "Building a Data-Driven Enterprise",
    category: "Data Engineering",
    description:
      "How to design modern data pipelines, establish governance frameworks, and build analytics capabilities that drive informed decision-making.",
    readingTime: "10 min read",
    publishedDate: "Mar 2025",
    icon: Database,
  },
  {
    id: 4,
    title: "Connected Operations with Industrial IoT",
    category: "IoT",
    description:
      "Architecting IoT ecosystems for manufacturing and logistics, from edge computing and sensor networks to real-time analytics and predictive maintenance.",
    readingTime: "11 min read",
    publishedDate: "Jan 2025",
    icon: Wifi,
  },
  {
    id: 5,
    title: "API Integration Strategies for Enterprise Applications",
    category: "Custom Software",
    description:
      "Best practices for designing, securing, and scaling API integrations across heterogeneous enterprise systems and third-party services.",
    readingTime: "9 min read",
    publishedDate: "Feb 2025",
    icon: Code2,
  },
  {
    id: 6,
    title: "Securing Modern Digital Applications",
    category: "Cybersecurity",
    description:
      "A defense-in-depth approach to application security covering identity management, encryption, threat modeling, and incident response.",
    readingTime: "13 min read",
    publishedDate: "Mar 2025",
    icon: Shield,
  },
  {
    id: 7,
    title: "Designing Scalable Software Architecture",
    category: "Custom Software",
    description:
      "Principles and patterns for building resilient, horizontally scalable systems that can grow with your business without sacrificing performance.",
    readingTime: "14 min read",
    publishedDate: "Jan 2025",
    icon: Layers,
  },
  {
    id: 8,
    title: "Digital Transformation: From Strategy to Implementation",
    category: "Digital Transformation",
    description:
      "A comprehensive guide to planning and executing digital transformation initiatives, from roadmap definition to measuring business outcomes.",
    readingTime: "16 min read",
    publishedDate: "Feb 2025",
    icon: TrendingUp,
  },
];

const researchTopics: ResearchTopic[] = [
  {
    title: "AI & Machine Learning",
    description:
      "Exploring model architectures, deployment patterns, and responsible AI practices for enterprise environments.",
    icon: Brain,
  },
  {
    title: "Cloud Architecture",
    description:
      "Designing resilient, cost-optimized cloud infrastructures across multi-cloud and hybrid environments.",
    icon: Cloud,
  },
  {
    title: "Data Engineering",
    description:
      "Building scalable data platforms, real-time pipelines, and analytics infrastructure for modern enterprises.",
    icon: Database,
  },
  {
    title: "IoT & Connected Systems",
    description:
      "Architecting edge-to-cloud IoT solutions with a focus on reliability, security, and real-time processing.",
    icon: Network,
  },
  {
    title: "Enterprise Software",
    description:
      "Patterns for building maintainable, scalable enterprise applications that integrate seamlessly with existing systems.",
    icon: Monitor,
  },
  {
    title: "Cybersecurity",
    description:
      "Zero-trust architectures, threat detection, and compliance frameworks for protecting digital assets.",
    icon: Shield,
  },
  {
    title: "Automation",
    description:
      "Intelligent process automation, CI/CD pipelines, and infrastructure-as-code for operational efficiency.",
    icon: Settings,
  },
  {
    title: "Digital Experience",
    description:
      "Crafting user-centric digital products with a focus on performance, accessibility, and engagement.",
    icon: Globe,
  },
];

const contentPreviewItems = [
  {
    number: "01",
    title: "Industry Context",
    description:
      "Understand the business and technology challenge driving the need for transformation.",
  },
  {
    number: "02",
    title: "Technical Perspective",
    description:
      "Explore architectures, technologies, and implementation approaches in detail.",
  },
  {
    number: "03",
    title: "Practical Considerations",
    description:
      "Understand challenges, trade-offs, and implementation factors for real-world scenarios.",
  },
  {
    number: "04",
    title: "Business Impact",
    description:
      "See how technology decisions can influence scalability, efficiency, and growth.",
  },
];

const stats = [
  { value: "25+", label: "Research Topics" },
  { value: "8+", label: "Technology Domains" },
  { value: "100%", label: "Practical Focus" },
  { value: "Enterprise", label: "Technology Perspective" },
];

// ─── Animation Variants ──────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Section Wrapper ─────────────────────────────────────────────────────────

function SectionReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Hero Visual Component ───────────────────────────────────────────────────

function HeroVisual() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative w-full h-[420px] lg:h-[520px]">
      {/* Glowing orb background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-72 h-72 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-cyan-500/20 blur-3xl" />
      </div>

      {/* Connected nodes SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        viewBox="0 0 500 500"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="nodeLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {!prefersReduced && (
          <>
            <motion.line
              x1="100" y1="120" x2="280" y2="200"
              stroke="url(#nodeLine)" strokeWidth="1"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            <motion.line
              x1="280" y1="200" x2="400" y2="100"
              stroke="url(#nodeLine)" strokeWidth="1"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.8 }}
            />
            <motion.line
              x1="280" y1="200" x2="200" y2="380"
              stroke="url(#nodeLine)" strokeWidth="1"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.1 }}
            />
            <motion.line
              x1="200" y1="380" x2="380" y2="340"
              stroke="url(#nodeLine)" strokeWidth="1"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.4 }}
            />
            <motion.line
              x1="400" y1="100" x2="380" y2="340"
              stroke="url(#nodeLine)" strokeWidth="1"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.7 }}
            />
          </>
        )}
        {/* Nodes */}
        {[
          { cx: 100, cy: 120 },
          { cx: 280, cy: 200 },
          { cx: 400, cy: 100 },
          { cx: 200, cy: 380 },
          { cx: 380, cy: 340 },
        ].map((node, i) => (
          <motion.circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r="5"
            fill="#818cf8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
          />
        ))}
      </svg>

      {/* Floating document cards */}
      {!prefersReduced && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 30, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute top-[15%] left-[5%] w-44 lg:w-52"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-xl p-4 shadow-lg shadow-indigo-500/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <div className="h-2 w-16 bg-slate-200 rounded-full" />
                  <div className="h-1.5 w-10 bg-slate-100 rounded-full mt-1.5" />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                <div className="h-1.5 w-3/4 bg-slate-100 rounded-full" />
                <div className="h-1.5 w-5/6 bg-slate-100 rounded-full" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="absolute bottom-[20%] right-[5%] w-44 lg:w-52"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-xl p-4 shadow-lg shadow-cyan-500/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-cyan-600" />
                </div>
                <div className="flex-1">
                  <div className="h-2 w-14 bg-slate-200 rounded-full" />
                  <div className="h-1.5 w-8 bg-slate-100 rounded-full mt-1.5" />
                </div>
              </div>
              <div className="flex items-end gap-1 h-10">
                {[40, 65, 45, 80, 55, 70].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 1.2 + i * 0.1, duration: 0.6 }}
                    className="flex-1 bg-gradient-to-t from-cyan-400 to-cyan-300 rounded-sm"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute top-[55%] left-[10%]"
          >
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="bg-white/70 backdrop-blur-lg border border-white/50 rounded-lg p-3 shadow-md"
            >
              <Lightbulb className="w-5 h-5 text-amber-500" />
            </motion.div>
          </motion.div>
        </>
      )}

      {/* Data particles */}
      {!prefersReduced &&
        Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-indigo-400/60"
            style={{
              top: `${20 + (i * 37) % 60}%`,
              left: `${10 + (i * 53) % 80}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Research icon center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-500/30">
            <BookOpen className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-2xl bg-indigo-400/30"
          />
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function WhitePaperPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const prefersReduced = useReducedMotion();
  const libraryRef = useRef<HTMLDivElement>(null);

  const filteredPapers = useMemo(() => {
    return whitePapers.filter((paper) => {
      const matchesCategory =
        activeCategory === "All" || paper.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const scrollToLibrary = () => {
    libraryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePlaceholderClick = () => {
    // Placeholder for navigation / analytics
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased overflow-x-hidden">
      {/* ── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background video placeholder */}
        <div className="absolute inset-0 z-0">
          {/*
            To use a video, replace the src below:
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="YOUR_VIDEO_URL.mp4" type="video/mp4" />
            </video>
          */}
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />
          {/* Animated gradient overlay */}
          {!prefersReduced && (
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  "radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.3) 0%, transparent 60%)",
                  "radial-gradient(ellipse at 80% 50%, rgba(6,182,212,0.3) 0%, transparent 60%)",
                  "radial-gradient(ellipse at 50% 80%, rgba(139,92,246,0.3) 0%, transparent 60%)",
                  "radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.3) 0%, transparent 60%)",
                ],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          )}
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-slate-950/60" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-xl"
            >
              <motion.div variants={fadeUp} custom={0}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-indigo-200 text-sm font-medium mb-8">
                  <Sparkles className="w-4 h-4" />
                  Research & Insights
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6"
              >
                Research, Insights & Technology That Shape{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  What's Next
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-lg text-slate-300/90 leading-relaxed mb-10"
              >
                Explore practical research, technical insights, and technology
                perspectives designed to help businesses make informed decisions
                and build what comes next.
              </motion.p>

              <motion.div
                variants={fadeUp}
                custom={3}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={scrollToLibrary}
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-violet-700 transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/35 hover:-translate-y-0.5"
                >
                  Explore White Papers
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={handlePlaceholderClick}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/15 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Talk to Our Experts
                </button>
              </motion.div>
            </motion.div>

            {/* Right visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="hidden lg:block"
            >
              <HeroVisual />
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-10" />
      </section>

      {/* ── SECTION 2: FEATURED WHITE PAPER ─────────────────────────────── */}
      <section className="relative py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionReveal>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 overflow-hidden">
              {/* Visual side */}
              <div className="relative h-72 lg:h-full min-h-[320px] bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800 flex items-center justify-center p-8">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: "30px 30px",
                  }}
                />
                <div className="relative z-10 text-center">
                  <motion.div
                    animate={prefersReduced ? {} : { y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 mb-6"
                  >
                    <FileText className="w-12 h-12 text-white" />
                  </motion.div>
                  <div className="space-y-2">
                    <div className="h-2 w-32 mx-auto bg-white/20 rounded-full" />
                    <div className="h-2 w-24 mx-auto bg-white/15 rounded-full" />
                    <div className="h-2 w-28 mx-auto bg-white/10 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Content side */}
              <div className="p-8 lg:p-12">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold tracking-wide uppercase mb-5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured Research
                </span>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight mb-4">
                  Building Scalable Digital Platforms for the Modern Enterprise
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  This comprehensive research explores architectural patterns,
                  technology choices, and operational practices for building
                  digital platforms that scale with business growth. Learn how
                  leading enterprises approach platform engineering, from
                  infrastructure foundations to developer experience.
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-indigo-500" />
                    Digital Transformation
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    Jan 2025
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    18 min read
                  </span>
                </div>

                {/* Key topics */}
                <div className="mb-8">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Key Topics
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Platform Engineering",
                      "Microservices",
                      "Cloud Native",
                      "DevOps",
                      "Scalability",
                    ].map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handlePlaceholderClick}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-slate-900/10"
                >
                  Read White Paper
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── SECTION 3: CATEGORIES ──────────────────────────────────────── */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionReveal>
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Browse by Category
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.label;
                return (
                  <motion.button
                    key={cat.label}
                    onClick={() => setActiveCategory(cat.label)}
                    whileHover={prefersReduced ? {} : { scale: 1.03 }}
                    whileTap={prefersReduced ? {} : { scale: 0.98 }}
                    className={`relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeCategory"
                        className="absolute inset-0 rounded-xl bg-slate-900 -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── SECTION 4: WHITE PAPER LIBRARY ─────────────────────────────── */}
      <section ref={libraryRef} className="py-12 lg:py-20 scroll-mt-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionReveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                  White Paper Library
                </h2>
                <p className="text-slate-500">
                  In-depth research and technical insights across domains.
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search white papers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </SectionReveal>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {filteredPapers.length > 0 ? (
              <motion.div
                key={activeCategory + searchQuery}
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredPapers.map((paper) => {
                  const Icon = paper.icon;
                  return (
                    <motion.article
                      key={paper.id}
                      variants={scaleIn}
                      whileHover={prefersReduced ? {} : { y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="group relative bg-white rounded-2xl border border-slate-200/80 p-6 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col"
                    >
                      {/* Top row */}
                      <div className="flex items-start justify-between mb-5">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 flex items-center justify-center group-hover:from-indigo-100 group-hover:to-violet-100 transition-colors duration-300">
                          <Icon className="w-5 h-5 text-indigo-600 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-500 text-[11px] font-semibold rounded-md uppercase tracking-wide">
                          {paper.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-semibold text-slate-900 leading-snug mb-3 group-hover:text-indigo-700 transition-colors duration-300">
                        {paper.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-1">
                        {paper.description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-slate-400 mb-5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {paper.readingTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {paper.publishedDate}
                        </span>
                      </div>

                      {/* Action */}
                      <button
                        onClick={handlePlaceholderClick}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 group-hover:text-indigo-700 transition-colors"
                      >
                        Read White Paper
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </motion.article>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">
                  No white papers found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-4 text-sm text-indigo-600 font-semibold hover:text-indigo-700"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── SECTION 5: RESEARCH TOPICS ────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Explore Our Areas of Research
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Deep-dive into the technology domains that drive enterprise
              innovation and digital transformation.
            </p>
          </SectionReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {researchTopics.map((topic, i) => {
              const Icon = topic.icon;
              return (
                <motion.div
                  key={topic.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, delay: i * 0.06 },
                    },
                  }}
                  whileHover={prefersReduced ? {} : { y: -6, scale: 1.02 }}
                  className="group bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.07] hover:border-indigo-400/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-400/20 flex items-center justify-center mb-5 group-hover:from-indigo-500/30 group-hover:to-violet-500/30 transition-all duration-300">
                    <Icon className="w-6 h-6 text-indigo-300 group-hover:text-indigo-200 transition-colors" />
                  </div>
                  <h3 className="text-white font-semibold mb-2 group-hover:text-indigo-200 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-5">
                    {topic.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                    Explore Research
                    <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: CONTENT PREVIEW ────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Inside Every White Paper
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              A structured approach that balances technical depth with practical
              business relevance.
            </p>
          </SectionReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contentPreviewItems.map((item, i) => (
              <motion.div
                key={item.number}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: i * 0.1 },
                  },
                }}
                whileHover={prefersReduced ? {} : { y: -4 }}
                className="group relative bg-white rounded-2xl border border-slate-200/80 p-6 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300"
              >
                <span className="text-4xl font-bold text-slate-100 group-hover:text-indigo-100 transition-colors duration-300 select-none">
                  {item.number}
                </span>
                <h3 className="text-base font-semibold text-slate-900 mt-3 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: STATISTICS ─────────────────────────────────────── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionReveal className="text-center mb-14">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">
              Technology Knowledge, Built for Real-World Decisions
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: i * 0.1 },
                  },
                }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: FINAL CTA ──────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800" />
        {!prefersReduced && (
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        )}
        {/* Floating particles */}
        {!prefersReduced &&
          Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-white/30"
              style={{
                top: `${15 + (i * 41) % 70}%`,
                left: `${8 + (i * 67) % 84}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.5, 0.1],
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}

        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <SectionReveal>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight">
              Have a Technology Challenge Worth Exploring?
            </h2>
            <p className="text-indigo-100/90 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Talk with our technology team about your business requirements,
              architecture challenges, integrations, or digital transformation
              goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handlePlaceholderClick}
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-all duration-300 shadow-lg shadow-black/10 hover:-translate-y-0.5"
              >
                Talk to Our Experts
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={handlePlaceholderClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-md border border-white/25 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                Explore Our Solutions
              </button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}