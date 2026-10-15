import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  X,
  ChevronRight,
  Database,
  Cloud,
  Cpu,
  Layers,
  GitBranch,
  Zap,
  BarChart3,
  Server,
  Code2,
  Workflow,
  Rocket,
  CheckCircle2,
  Puzzle,
  BrainCircuit,
  TabletSmartphone,
  CloudCog,
  Network,
  Users,
  HeartPulse,
  ShoppingCart,
  Home,
  Truck,
  Landmark,
  GraduationCap,
  Factory,
  Briefcase,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  TYPES                                                              */
/* ------------------------------------------------------------------ */

interface CaseStudy {
  id: number;
  title: string;
  category: string;
  filterCategory: string;
  industry: string;
  challenge: string;
  solution: string;
  technologies: string[];
  overview: string;
  objectives: string[];
  approach: string[];
  keyFeatures: string[];
  workflow: string[];
  integrations: string[];
  impact: string[];
  gradient: string;
  icon: React.ReactNode;
  featured?: boolean;
}

interface TechCategory {
  name: string;
  icon: React.ReactNode;
  items: string[];
}

interface Industry {
  name: string;
  icon: React.ReactNode;
  description: string;
}

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    title: 'AI-Powered Business Intelligence Platform',
    category: 'AI & Machine Learning',
    filterCategory: 'AI & ML',
    industry: 'Business Intelligence',
    challenge:
      'Businesses needed faster access to actionable insights from large and complex datasets.',
    solution:
      'Built an intelligent platform combining data processing, AI models, analytics, and automated insights.',
    technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'AI/ML'],
    overview:
      'An intelligent analytics platform that ingests, processes, and analyzes large datasets, delivering automated insights and predictive analytics to business users through an intuitive dashboard.',
    objectives: [
      'Reduce time-to-insight from days to minutes',
      'Automate data processing and anomaly detection',
      'Provide natural language querying capabilities',
      'Deliver role-based dashboards and reporting',
    ],
    approach: [
      'Conducted deep discovery workshops with stakeholders',
      'Designed a scalable data pipeline architecture',
      'Implemented ML models for predictive analytics',
      'Built a responsive React dashboard with real-time updates',
      'Integrated automated alerting and reporting',
    ],
    keyFeatures: [
      'Real-time data processing pipeline',
      'AI-powered anomaly detection',
      'Natural language query interface',
      'Customizable dashboards and reports',
      'Automated alerting and notifications',
      'Role-based access control',
    ],
    workflow: [
      'Data Ingestion',
      'Processing & Cleaning',
      'AI Model Inference',
      'Insight Generation',
      'Dashboard Visualization',
    ],
    integrations: ['PostgreSQL', 'REST APIs', 'Cloud Storage', 'Email/Slack Notifications'],
    impact: [
      '85% reduction in time-to-insight',
      '40% increase in operational efficiency',
      'Real-time visibility across all business units',
      'Scalable to millions of data points daily',
    ],
    gradient: 'from-blue-600 via-indigo-600 to-violet-600',
    icon: <BrainCircuit className="w-5 h-5" />,
    featured: true,
  },
  {
    id: 2,
    title: 'Scalable E-Commerce Platform',
    category: 'Web Development',
    filterCategory: 'Web',
    industry: 'Retail & E-Commerce',
    challenge:
      'Create a flexible online commerce experience supporting products, customers, orders, payments, and real-time inventory.',
    solution:
      'Developed a full-stack commerce platform with product discovery, cart, wishlist, checkout, order workflows, and secure APIs.',
    technologies: ['React', 'TypeScript', 'Laravel', 'PostgreSQL', 'REST API'],
    overview:
      'A complete e-commerce solution designed for scale, featuring product management, secure checkout, order processing, and real-time inventory synchronization.',
    objectives: [
      'Support thousands of products and concurrent users',
      'Provide a seamless checkout experience',
      'Enable real-time inventory management',
      'Integrate multiple payment gateways',
    ],
    approach: [
      'Mapped the complete customer journey and admin workflows',
      'Designed a modular architecture with Laravel APIs',
      'Built a fast, responsive React storefront',
      'Implemented secure payment processing',
      'Set up automated order and inventory workflows',
    ],
    keyFeatures: [
      'Product catalog with advanced search and filters',
      'Cart, wishlist, and saved items',
      'Secure multi-gateway checkout',
      'Order tracking and management',
      'Real-time inventory sync',
      'Admin dashboard for operations',
    ],
    workflow: [
      'Product Discovery',
      'Cart & Wishlist',
      'Checkout & Payment',
      'Order Processing',
      'Fulfillment & Tracking',
    ],
    integrations: ['Stripe', 'PayPal', 'Shipping APIs', 'Inventory Management System'],
    impact: [
      '3x increase in online sales',
      '99.9% uptime during peak traffic',
      '50% reduction in cart abandonment',
      'Seamless experience across devices',
    ],
    gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    icon: <ShoppingCart className="w-5 h-5" />,
    featured: true,
  },
  {
    id: 3,
    title: 'Connected IoT Operations Platform',
    category: 'IoT',
    filterCategory: 'IoT',
    industry: 'Manufacturing & Operations',
    challenge:
      'Organizations needed centralized visibility into connected devices and operational data.',
    solution:
      'Built a platform that connects devices, processes incoming data, and presents real-time operational information.',
    technologies: ['IoT', 'Python', 'Cloud', 'APIs', 'React', 'PostgreSQL'],
    overview:
      'An IoT operations platform that connects and monitors distributed devices, processes telemetry data in real time, and provides actionable operational insights.',
    objectives: [
      'Centralize monitoring of distributed devices',
      'Process real-time telemetry data',
      'Enable proactive maintenance alerts',
      'Provide operational dashboards',
    ],
    approach: [
      'Defined device communication protocols and data models',
      'Built scalable ingestion and processing pipelines',
      'Developed real-time monitoring dashboards',
      'Implemented alerting and notification systems',
      'Integrated with existing operational systems',
    ],
    keyFeatures: [
      'Real-time device monitoring',
      'Telemetry data processing',
      'Predictive maintenance alerts',
      'Geospatial device mapping',
      'Historical data analysis',
      'Automated reporting',
    ],
    workflow: [
      'Device Connection',
      'Data Ingestion',
      'Real-time Processing',
      'Alert Generation',
      'Operational Dashboard',
    ],
    integrations: ['MQTT', 'REST APIs', 'Cloud IoT Services', 'Time-Series Database'],
    impact: [
      '70% reduction in unplanned downtime',
      'Real-time visibility across all facilities',
      '30% improvement in maintenance efficiency',
      'Scalable to thousands of connected devices',
    ],
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    icon: <Network className="w-5 h-5" />,
  },
  {
    id: 4,
    title: 'Cloud Infrastructure & DevOps Platform',
    category: 'Cloud & DevOps',
    filterCategory: 'Cloud & DevOps',
    industry: 'Technology Infrastructure',
    challenge:
      'Improve application deployment, scalability, reliability, and development workflows.',
    solution:
      'Designed automated deployment workflows and cloud infrastructure supporting scalable application environments.',
    technologies: ['Cloud', 'Docker', 'CI/CD', 'Linux', 'DevOps', 'Monitoring'],
    overview:
      'A comprehensive DevOps transformation program that automated deployment pipelines, standardized infrastructure, and improved system reliability.',
    objectives: [
      'Automate deployment and scaling processes',
      'Improve system reliability and uptime',
      'Standardize development and production environments',
      'Enable faster release cycles',
    ],
    approach: [
      'Assessed existing infrastructure and workflows',
      'Designed containerized application architecture',
      'Built automated CI/CD pipelines',
      'Implemented infrastructure as code',
      'Set up comprehensive monitoring and alerting',
    ],
    keyFeatures: [
      'Automated CI/CD pipelines',
      'Container orchestration',
      'Infrastructure as code',
      'Auto-scaling capabilities',
      'Centralized logging and monitoring',
      'Zero-downtime deployments',
    ],
    workflow: [
      'Code Commit',
      'Automated Testing',
      'Container Build',
      'Deployment Pipeline',
      'Monitoring & Alerting',
    ],
    integrations: ['GitHub Actions', 'Docker Hub', 'Cloud Providers', 'Monitoring Tools'],
    impact: [
      '90% faster deployment cycles',
      '99.95% system uptime',
      '60% reduction in operational costs',
      'Standardized environments across teams',
    ],
    gradient: 'from-sky-600 via-blue-600 to-indigo-600',
    icon: <CloudCog className="w-5 h-5" />,
  },
  {
    id: 5,
    title: 'Enterprise Workflow Automation',
    category: 'Custom Software',
    filterCategory: 'Custom Software',
    industry: 'Professional Services',
    challenge:
      'Manual workflows were creating delays and requiring repetitive human effort.',
    solution:
      'Created a centralized digital workflow platform that automates processes, approvals, notifications, and reporting.',
    technologies: ['React', 'TypeScript', 'Laravel', 'PostgreSQL', 'REST APIs'],
    overview:
      'A custom workflow automation platform that digitized and automated complex business processes, reducing manual effort and improving operational efficiency.',
    objectives: [
      'Eliminate manual, repetitive tasks',
      'Accelerate approval and review processes',
      'Provide visibility into workflow status',
      'Enable automated reporting',
    ],
    approach: [
      'Mapped existing manual workflows and pain points',
      'Designed digital workflow architecture',
      'Built configurable process engine',
      'Implemented automated notifications and escalations',
      'Developed reporting and analytics dashboard',
    ],
    keyFeatures: [
      'Configurable workflow builder',
      'Automated approvals and escalations',
      'Real-time status tracking',
      'Document management',
      'Automated notifications',
      'Comprehensive reporting',
    ],
    workflow: [
      'Request Initiation',
      'Automated Routing',
      'Approval Process',
      'Notification & Escalation',
      'Completion & Reporting',
    ],
    integrations: ['Email Systems', 'Document Storage', 'HR Systems', 'Reporting Tools'],
    impact: [
      '75% reduction in process time',
      'Elimination of manual data entry errors',
      'Complete audit trail for compliance',
      'Scalable across departments',
    ],
    gradient: 'from-violet-600 via-purple-600 to-fuchsia-600',
    icon: <Workflow className="w-5 h-5" />,
  },
  {
    id: 6,
    title: 'Data Engineering & Analytics Platform',
    category: 'Data Engineering',
    filterCategory: 'Data Engineering',
    industry: 'Data & Analytics',
    challenge:
      'Data was distributed across multiple systems and difficult to analyze consistently.',
    solution:
      'Designed data pipelines and processing workflows to consolidate information into a structured analytics environment.',
    technologies: ['Python', 'PostgreSQL', 'Data Pipelines', 'APIs', 'Cloud'],
    overview:
      'A centralized data engineering platform that consolidates data from multiple sources, ensuring consistency and enabling advanced analytics.',
    objectives: [
      'Consolidate data from disparate systems',
      'Ensure data quality and consistency',
      'Enable self-service analytics',
      'Reduce data processing time',
    ],
    approach: [
      'Audited existing data sources and quality issues',
      'Designed ETL/ELT pipeline architecture',
      'Built automated data quality checks',
      'Created unified data warehouse',
      'Developed analytics and reporting layer',
    ],
    keyFeatures: [
      'Automated data pipelines',
      'Data quality monitoring',
      'Unified data warehouse',
      'Self-service analytics',
      'Scheduled reporting',
      'Data lineage tracking',
    ],
    workflow: [
      'Data Extraction',
      'Transformation',
      'Quality Validation',
      'Warehouse Loading',
      'Analytics & Reporting',
    ],
    integrations: ['Multiple Databases', 'Cloud Storage', 'BI Tools', 'API Sources'],
    impact: [
      'Single source of truth for all data',
      '80% reduction in data processing time',
      'Improved data quality and consistency',
      'Democratized data access across teams',
    ],
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
    icon: <Database className="w-5 h-5" />,
  },
  {
    id: 7,
    title: 'Mobile Customer Experience Platform',
    category: 'Mobile Development',
    filterCategory: 'Mobile',
    industry: 'Consumer Services',
    challenge:
      'Customers needed a simple and accessible mobile experience across devices.',
    solution:
      'Designed and developed a responsive mobile application connected to secure backend APIs.',
    technologies: ['React Native', 'TypeScript', 'REST API', 'Laravel', 'PostgreSQL'],
    overview:
      'A cross-platform mobile application delivering a seamless customer experience with offline capabilities and secure backend integration.',
    objectives: [
      'Deliver consistent experience across iOS and Android',
      'Enable offline access to key features',
      'Integrate with existing backend systems',
      'Provide push notifications and real-time updates',
    ],
    approach: [
      'Conducted user research and usability testing',
      'Designed intuitive mobile-first interfaces',
      'Built cross-platform app with React Native',
      'Integrated secure authentication and APIs',
      'Implemented push notifications and analytics',
    ],
    keyFeatures: [
      'Cross-platform compatibility',
      'Offline mode with data sync',
      'Push notifications',
      'Secure authentication',
      'In-app messaging',
      'Biometric login support',
    ],
    workflow: [
      'User Authentication',
      'Content Loading',
      'Offline Sync',
      'Push Notifications',
      'Analytics Tracking',
    ],
    integrations: ['Push Notification Services', 'Analytics Platforms', 'Payment Gateways', 'Backend APIs'],
    impact: [
      '4.8-star average app rating',
      '60% increase in mobile engagement',
      'Reduced support tickets by 35%',
      'Seamless experience across devices',
    ],
    gradient: 'from-cyan-600 via-sky-600 to-blue-600',
    icon: <TabletSmartphone className="w-5 h-5" />,
  },
  {
    id: 8,
    title: 'API & Third-Party Integration Platform',
    category: 'API Integration',
    filterCategory: 'Web',
    industry: 'Enterprise Integration',
    challenge:
      'The business relied on multiple external services that needed to communicate with its core platform.',
    solution:
      'Integrated third-party APIs into a centralized software platform with authentication, data synchronization, and automated workflows.',
    technologies: ['React', 'TypeScript', 'Laravel', 'Python', 'REST APIs', 'Third-Party APIs'],
    overview:
      'A centralized integration platform that connects multiple third-party services, synchronizes data, and automates cross-platform workflows.',
    objectives: [
      'Centralize third-party API integrations',
      'Ensure reliable data synchronization',
      'Automate cross-platform workflows',
      'Provide monitoring and error handling',
    ],
    approach: [
      'Cataloged all external services and data flows',
      'Designed integration architecture with fault tolerance',
      'Built reusable API connector framework',
      'Implemented data transformation and mapping',
      'Set up monitoring and alerting',
    ],
    keyFeatures: [
      'Centralized API management',
      'Automated data synchronization',
      'Error handling and retry logic',
      'Rate limiting and caching',
      'Integration monitoring dashboard',
      'Webhook support',
    ],
    workflow: [
      'API Authentication',
      'Data Retrieval',
      'Transformation & Mapping',
      'Synchronization',
      'Monitoring & Alerts',
    ],
    integrations: ['Payment APIs', 'CRM Systems', 'Communication APIs', 'Analytics Services'],
    impact: [
      'Unified data across all platforms',
      '90% reduction in manual data entry',
      'Real-time synchronization',
      'Scalable integration framework',
    ],
    gradient: 'from-indigo-600 via-blue-600 to-cyan-600',
    icon: <Puzzle className="w-5 h-5" />,
  },
];

const FILTERS = [
  'All',
  'AI & ML',
  'Web',
  'Mobile',
  'Cloud & DevOps',
  'Data Engineering',
  'IoT',
  'Custom Software',
  'Automation',
];

const TECH_CATEGORIES: TechCategory[] = [
  {
    name: 'Frontend',
    icon: <Code2 className="w-5 h-5" />,
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
  },
  {
    name: 'Backend',
    icon: <Server className="w-5 h-5" />,
    items: ['Laravel', 'PHP', 'Python', 'FastAPI', 'Node.js'],
  },
  {
    name: 'Database',
    icon: <Database className="w-5 h-5" />,
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  },
  {
    name: 'Cloud & DevOps',
    icon: <Cloud className="w-5 h-5" />,
    items: ['AWS', 'Docker', 'CI/CD', 'Linux'],
  },
  {
    name: 'AI & Data',
    icon: <BrainCircuit className="w-5 h-5" />,
    items: ['Python', 'Machine Learning', 'Data Engineering', 'Analytics'],
  },
  {
    name: 'Integration',
    icon: <GitBranch className="w-5 h-5" />,
    items: ['REST APIs', 'Third-Party APIs', 'Payment APIs', 'Communication APIs'],
  },
];

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand the business, users, workflows, and requirements.',
    icon: <Users className="w-5 h-5" />,
  },
  {
    number: '02',
    title: 'Architect',
    description: 'Choose the appropriate architecture, technologies, integrations, and infrastructure.',
    icon: <Layers className="w-5 h-5" />,
  },
  {
    number: '03',
    title: 'Design',
    description: 'Create intuitive interfaces and user experiences.',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    number: '04',
    title: 'Develop',
    description: 'Build scalable and maintainable software.',
    icon: <Code2 className="w-5 h-5" />,
  },
  {
    number: '05',
    title: 'Integrate',
    description: 'Connect APIs, third-party platforms, databases, and external services.',
    icon: <GitBranch className="w-5 h-5" />,
  },
  {
    number: '06',
    title: 'Launch',
    description: 'Test, deploy, monitor, and continuously improve the solution.',
    icon: <Rocket className="w-5 h-5" />,
  },
];

const INDUSTRIES: Industry[] = [
  { name: 'Healthcare', icon: <HeartPulse className="w-5 h-5" />, description: 'Patient management, telemedicine, health records' },
  { name: 'Retail', icon: <ShoppingCart className="w-5 h-5" />, description: 'E-commerce, inventory, customer experience' },
  { name: 'Real Estate', icon: <Home className="w-5 h-5" />, description: 'Property management, listings, virtual tours' },
  { name: 'Logistics', icon: <Truck className="w-5 h-5" />, description: 'Fleet tracking, route optimization, supply chain' },
  { name: 'Finance', icon: <Landmark className="w-5 h-5" />, description: 'Banking, payments, compliance, analytics' },
  { name: 'Education', icon: <GraduationCap className="w-5 h-5" />, description: 'E-learning, student management, assessments' },
  { name: 'Manufacturing', icon: <Factory className="w-5 h-5" />, description: 'IoT, automation, quality control, ERP' },
  { name: 'Professional Services', icon: <Briefcase className="w-5 h-5" />, description: 'CRM, project management, automation' },
];

const CAPABILITIES = [
  'AI & Machine Learning',
  'Web Development',
  'Mobile Development',
  'Cloud & DevOps',
  'Data Engineering',
  'IoT Solutions',
  'Custom Software',
  'API Integration',
];

/* ------------------------------------------------------------------ */
/*  HOOKS                                                              */
/* ------------------------------------------------------------------ */

function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

/* ------------------------------------------------------------------ */
/*  SHARED COMPONENTS                                                  */
/* ------------------------------------------------------------------ */

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = '',
}) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const SectionHeading: React.FC<{
  badge?: string;
  title: string;
  description?: string;
  light?: boolean;
}> = ({ badge, title, description, light = false }) => (
  <Reveal className="max-w-3xl">
    {badge && (
      <span
        className={`inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 ${
          light ? 'text-blue-400' : 'text-blue-600'
        }`}
      >
        {badge}
      </span>
    )}
    <h2
      className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 tracking-tight ${
        light ? 'text-white' : 'text-slate-900'
      }`}
    >
      {title}
    </h2>
    {description && (
      <p className={`text-base sm:text-lg leading-relaxed ${light ? 'text-slate-300' : 'text-slate-600'}`}>
        {description}
      </p>
    )}
  </Reveal>
);

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors duration-300 cursor-default">
    {children}
  </span>
);

/* ------------------------------------------------------------------ */
/*  1. HERO SECTION                                                    */
/* ------------------------------------------------------------------ */

const HeroSection: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col overflow-hidden bg-slate-950">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Video background (falls back to gradient) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          poster=""
        >
          {/* If you have a video, add <source src="..." /> here */}
        </video>

        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/80 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.15),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(139,92,246,0.1),_transparent_60%)]" />

        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating orbs */}
        <div className="absolute top-1/4 right-[10%] w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
        <div
          className="absolute bottom-1/4 left-[5%] w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: '2s' }}
        />

        {/* Floating UI elements */}
        <div className="absolute top-[20%] left-[8%] hidden lg:block animate-[float_6s_ease-in-out_infinite]">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-4 py-3">
            <div className="flex items-center gap-2 text-white/60 text-xs">
              <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
              <span>Analytics</span>
            </div>
          </div>
        </div>
        <div
          className="absolute top-[35%] right-[6%] hidden lg:block animate-[float_7s_ease-in-out_infinite]"
          style={{ animationDelay: '1s' }}
        >
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-4 py-3">
            <div className="flex items-center gap-2 text-white/60 text-xs">
              <Cloud className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cloud Native</span>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-[25%] right-[15%] hidden lg:block animate-[float_8s_ease-in-out_infinite]"
          style={{ animationDelay: '2s' }}
        >
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-4 py-3">
            <div className="flex items-center gap-2 text-white/60 text-xs">
              <Cpu className="w-3.5 h-3.5 text-violet-400" />
              <span>AI Powered</span>
            </div>
          </div>
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-32">
          <div
            className={`max-w-4xl transition-all duration-1000 ease-out ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-blue-400 mb-6 border border-blue-400/20 bg-blue-400/5 rounded-full px-4 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Case Studies
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
              Technology That Solves{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Real Business Challenges
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300/90 leading-relaxed max-w-2xl mb-10">
              Explore how we transform complex business requirements into scalable digital products,
              intelligent platforms, automated workflows, and connected experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo('case-studies')}
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/25 hover:-translate-y-0.5"
              >
                Explore Case Studies
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg border border-white/15 hover:border-white/25 transition-all duration-300 backdrop-blur-sm"
              >
                Start a Project
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Capability strip */}
      <div className="relative z-10 border-t border-white/5 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-between">
            {CAPABILITIES.map((cap, i) => (
              <span
                key={cap}
                className={`text-xs font-medium text-slate-400/80 whitespace-nowrap transition-all duration-700 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${600 + i * 80}ms` }}
              >
                {cap}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  2. INTRODUCTION SECTION                                            */
/* ------------------------------------------------------------------ */

const IntroSection: React.FC = () => (
  <section className="py-20 lg:py-28 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <SectionHeading
          badge="Our Approach"
          title="From Business Challenge to Digital Solution"
          description="Every project begins with a business challenge. We combine product thinking, engineering expertise, and the right technology stack to create solutions designed around real-world requirements."
        />

        <div className="space-y-6 lg:pt-8">
          {[
            {
              num: '01',
              title: 'Understand',
              desc: 'Identify the business challenge, users, workflows, and technical requirements.',
            },
            {
              num: '02',
              title: 'Build',
              desc: 'Design and develop scalable software using the technologies that best fit the project.',
            },
            {
              num: '03',
              title: 'Deliver',
              desc: 'Deploy a reliable solution that improves workflows, connectivity, automation, and user experience.',
            },
          ].map((item, i) => (
            <Reveal key={item.num} delay={i * 120}>
              <div className="group flex gap-5 p-5 rounded-xl border border-slate-200/80 hover:border-blue-200 bg-white hover:bg-blue-50/30 transition-all duration-300 hover:shadow-sm">
                <span className="text-sm font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-lg w-10 h-10 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors duration-300">
                  {item.num}
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  3 & 4. FILTER + CASE STUDY CARDS                                   */
/* ------------------------------------------------------------------ */

const CaseStudyCard: React.FC<{
  study: CaseStudy;
  onOpen: (s: CaseStudy) => void;
  featured?: boolean;
  index: number;
}> = ({ study, onOpen, featured = false, index }) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`group relative transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${featured ? 'lg:col-span-2 lg:row-span-2' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className={`relative flex flex-col h-full bg-white rounded-2xl border border-slate-200/80 overflow-hidden cursor-pointer
          hover:border-transparent hover:shadow-2xl hover:shadow-slate-900/10 hover:-translate-y-1
          transition-all duration-500 ${featured ? 'lg:min-h-[480px]' : ''}`}
        onClick={() => onOpen(study)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onOpen(study)}
        aria-label={`View case study: ${study.title}`}
      >
        {/* Gradient border on hover */}
        <div
          className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
            bg-gradient-to-br ${study.gradient} p-[1px]`}
        >
          <div className="w-full h-full rounded-2xl bg-white" />
        </div>

        {/* Visual area */}
        <div
          className={`relative overflow-hidden ${featured ? 'h-64 lg:h-80' : 'h-48'} bg-gradient-to-br ${study.gradient}`}
        >
          {/* Abstract tech pattern */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />
          </div>

          {/* Icon */}
          <div className="absolute top-4 left-4">
            <div className="w-10 h-10 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
              {study.icon}
            </div>
          </div>

          {/* Industry badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/15 backdrop-blur-sm text-white border border-white/20">
              {study.industry}
            </span>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        </div>

        {/* Content */}
        <div className="relative flex flex-col flex-1 p-6 lg:p-7 z-10">
          <span className="text-xs font-semibold text-blue-600 tracking-wide uppercase mb-2">
            {study.category}
          </span>

          <h3
            className={`font-bold text-slate-900 leading-snug mb-3 group-hover:text-blue-700 transition-colors duration-300 ${
              featured ? 'text-xl lg:text-2xl' : 'text-lg'
            }`}
          >
            {study.title}
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">{study.challenge}</p>

          <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-2">{study.solution}</p>

          {/* Technology badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {study.technologies.slice(0, featured ? 6 : 4).map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
            {study.technologies.length > (featured ? 6 : 4) && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-medium text-slate-400">
                +{study.technologies.length - (featured ? 6 : 4)}
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:text-blue-700">
            <span>View Case Study</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CaseStudiesSection: React.FC<{ onOpen: (s: CaseStudy) => void }> = ({ onOpen }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((s) => s.filterCategory === activeFilter);

  const featured = filtered.filter((s) => s.featured);
  const rest = filtered.filter((s) => !s.featured);

  return (
    <section id="case-studies" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Featured Work"
          title="Case Studies"
          description="Real projects. Real challenges. Real results. Explore how we've helped businesses across industries solve complex problems with technology."
        />

        {/* Filters */}
        <Reveal className="mt-10 mb-12">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No case studies found for this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Featured cards first */}
            {featured.map((study, i) => (
              <CaseStudyCard key={study.id} study={study} onOpen={onOpen} featured index={i} />
            ))}
            {/* Rest */}
            {rest.map((study, i) => (
              <CaseStudyCard key={study.id} study={study} onOpen={onOpen} index={featured.length + i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  6. CASE STUDY MODAL                                                */
/* ------------------------------------------------------------------ */

const CaseStudyModal: React.FC<{
  study: CaseStudy | null;
  onClose: () => void;
}> = ({ study, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (study) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = 'hidden';
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 300);
      document.body.style.overflow = '';
      return () => clearTimeout(t);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [study]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!mounted || !study) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center overflow-y-auto transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className={`relative w-full max-w-4xl mx-4 sm:mx-6 my-8 sm:my-12 bg-white rounded-2xl shadow-2xl transition-all duration-300 ${
          visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.98]'
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-105 shadow-sm"
          aria-label="Close case study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header visual */}
        <div className={`relative h-48 sm:h-56 rounded-t-2xl overflow-hidden bg-gradient-to-br ${study.gradient}`}>
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)',
              }}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-black/40 to-transparent">
            <span className="inline-block text-xs font-semibold text-white/80 tracking-wide uppercase mb-2">
              {study.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">{study.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-10 max-h-[calc(100vh-20rem)] overflow-y-auto">
          {/* Overview */}
          <section>
            <h3 className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-3">
              Project Overview
            </h3>
            <p className="text-slate-700 leading-relaxed">{study.overview}</p>
          </section>

          {/* Challenge & Solution */}
          <div className="grid sm:grid-cols-2 gap-6">
            <section className="bg-slate-50 rounded-xl p-5 border border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Business Challenge</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{study.challenge}</p>
            </section>
            <section className="bg-blue-50/50 rounded-xl p-5 border border-blue-100">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Our Solution</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{study.solution}</p>
            </section>
          </div>

          {/* Objectives */}
          <section>
            <h3 className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-4">
              Objectives
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {study.objectives.map((obj) => (
                <li key={obj} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  {obj}
                </li>
              ))}
            </ul>
          </section>

          {/* Approach */}
          <section>
            <h3 className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-4">
              Our Approach
            </h3>
            <ul className="space-y-3">
              {study.approach.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-sm text-slate-600">
                  <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </section>

          {/* Key Features */}
          <section>
            <h3 className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-4">
              Key Features
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {study.keyFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-slate-600 bg-slate-50 rounded-lg p-3 border border-slate-100"
                >
                  <Zap className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </section>

          {/* Technology Stack */}
          <section>
            <h3 className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-4">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {study.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Workflow */}
          <section>
            <h3 className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-4">
              System Workflow
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 overflow-x-auto pb-2">
              {study.workflow.map((step, i) => (
                <React.Fragment key={step}>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 whitespace-nowrap">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">
                      {i + 1}
                    </span>
                    {step}
                  </div>
                  {i < study.workflow.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-slate-300 mx-1 hidden sm:block shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* Integrations */}
          <section>
            <h3 className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-4">
              Integrations
            </h3>
            <div className="flex flex-wrap gap-2">
              {study.integrations.map((integ) => (
                <span
                  key={integ}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                >
                  {integ}
                </span>
              ))}
            </div>
          </section>

          {/* Impact */}
          <section>
            <h3 className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-4">
              Project Impact
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {study.impact.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-slate-700 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-lg p-3 border border-slate-100"
                >
                  <BarChart3 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* Process timeline */}
          <section className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-6">
              Project Lifecycle
            </h3>
            <div className="flex flex-col gap-0">
              {[
                'Business Challenge',
                'Discovery',
                'Architecture',
                'Development',
                'Integration',
                'Testing',
                'Deployment',
              ].map((step, i, arr) => (
                <div key={step} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      {i + 1}
                    </div>
                    {i < arr.length - 1 && (
                      <div className="w-0.5 h-6 bg-gradient-to-b from-blue-400 to-blue-200" />
                    )}
                  </div>
                  <span className="text-sm text-slate-700 font-medium pt-1">{step}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  7. TECHNOLOGY STACK SECTION                                        */
/* ------------------------------------------------------------------ */

const TechStackSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Technology"
          title="The Right Technology for Every Challenge"
          description="We work across modern technologies and select the architecture and tools based on the project's business requirements."
        />

        <Reveal className="mt-12">
          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto pb-2 mb-8 scrollbar-hide">
            {TECH_CATEGORIES.map((cat, i) => (
              <button
                key={cat.name}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeTab === i
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 sm:p-8 lg:p-10 min-h-[200px]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm">
                {TECH_CATEGORIES[activeTab].icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{TECH_CATEGORIES[activeTab].name}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {TECH_CATEGORIES[activeTab].items.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-700 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  8. PROCESS SECTION                                                 */
/* ------------------------------------------------------------------ */

const ProcessSection: React.FC = () => (
  <section className="py-20 lg:py-28 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        badge="Methodology"
        title="How We Approach Projects"
        description="A structured, collaborative process that ensures every project is delivered on time, on budget, and to the highest standards."
      />

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROCESS_STEPS.map((step, i) => (
          <Reveal key={step.number} delay={i * 100}>
            <div className="group relative bg-white rounded-xl border border-slate-200/80 p-6 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-500 h-full">
              <div className="flex items-center justify-between mb-5">
                <span className="text-3xl font-bold text-slate-200 group-hover:text-blue-200 transition-colors duration-500">
                  {step.number}
                </span>
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all duration-500">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  9. INDUSTRIES SECTION                                              */
/* ------------------------------------------------------------------ */

const IndustriesSection: React.FC = () => (
  <section className="py-20 lg:py-28 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        badge="Industries"
        title="Solutions Across Industries"
        description="Technology solutions can be applied across diverse domains. Here are examples of industries where we've helped solve real business challenges."
      />

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {INDUSTRIES.map((ind, i) => (
          <Reveal key={ind.name} delay={i * 80}>
            <div className="group bg-white rounded-xl border border-slate-200/80 p-5 hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-400 cursor-default h-full">
              <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all duration-400 mb-4">
                {ind.icon}
              </div>
              <h3 className="font-semibold text-slate-900 mb-1.5">{ind.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{ind.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  10. CLIENT-FOCUSED SECTION                                         */
/* ------------------------------------------------------------------ */

const ClientSection: React.FC = () => (
  <section className="py-20 lg:py-28 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-8 sm:p-12 lg:p-16">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.04]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5 tracking-tight">
              Have a Complex Business Challenge?
            </h2>
            <p className="text-slate-300/90 text-base sm:text-lg leading-relaxed mb-8">
              Whether you need a new digital product, legacy modernization, API integration,
              automation, AI capabilities, or cloud infrastructure, we can help turn your
              requirements into a practical technology solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/25 hover:-translate-y-0.5">
                Discuss Your Project
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg border border-white/15 hover:border-white/25 transition-all duration-300 backdrop-blur-sm">
                Explore Our Solutions
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  11. FINAL CTA                                                      */
/* ------------------------------------------------------------------ */

const FinalCTA: React.FC = () => (
  <section id="contact" className="relative py-24 lg:py-32 bg-slate-950 overflow-hidden">
    {/* Background effects */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.12),_transparent_70%)]" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-500/8 rounded-full blur-[120px]" />
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500/8 rounded-full blur-[100px]" />
    </div>

    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <Reveal>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 tracking-tight">
          Let's Build What's Next
        </h2>
        <p className="text-lg sm:text-xl text-slate-300/90 leading-relaxed max-w-2xl mx-auto mb-10">
          Tell us what you're trying to solve. We'll help you explore the right technology,
          architecture, and approach.
        </p>
        <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-xl hover:shadow-white/10 hover:-translate-y-0.5 text-base">
          Start a Conversation
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */

const CaseStudiesPage: React.FC = () => {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  const handleOpen = useCallback((study: CaseStudy) => {
    setSelectedStudy(study);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedStudy(null);
  }, []);

  return (
    <main className="min-h-screen bg-white antialiased">
      <HeroSection />
      <IntroSection />
      <CaseStudiesSection onOpen={handleOpen} />
      <TechStackSection />
      <ProcessSection />
      <IndustriesSection />
      <ClientSection />
      <FinalCTA />
      <CaseStudyModal study={selectedStudy} onClose={handleClose} />
    </main>
  );
};

export default CaseStudiesPage;