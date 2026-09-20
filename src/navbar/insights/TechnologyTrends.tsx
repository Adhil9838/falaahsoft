import React, { useEffect, useState } from 'react';

// ---------- Types ----------
type Trend = {
  id: number;
  title: string;
  category: string;
  description: string;
  capability: string;
  image: string;
  alt: string;
};

// ---------- 24 Technology Trends ----------
const trends: Trend[] = [
  {
    id: 1,
    title: 'AI & Machine Learning',
    category: 'Intelligence',
    description:
      'Intelligent systems that learn, adapt, and automate complex tasks — from predictive analytics and natural language processing to computer vision and autonomous decision-making.',
    capability: 'Predictive · Generative · Autonomous',
    image: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png',
    alt: 'AI brain icon',
  },
  {
    id: 2,
    title: 'Cloud Computing',
    category: 'Infrastructure',
    description:
      'Build, deploy, and scale applications with the power of the cloud. Multi-cloud and hybrid strategies deliver resilience, elasticity, and cost efficiency at global scale.',
    capability: 'Multi-Cloud · Serverless · Hybrid',
    image: 'https://cdn-icons-png.flaticon.com/512/4149/4149672.png',
    alt: 'Cloud icon',
  },
  {
    id: 3,
    title: 'IoT & Smart Systems',
    category: 'Connectivity',
    description:
      'Connect devices and systems for real-time insights and automation. Smart sensors, telemetry, and edge-to-cloud pipelines unlock operational intelligence across industries.',
    capability: 'Sensors · Telemetry · Edge-to-Cloud',
    image: 'https://cdn-icons-png.flaticon.com/512/2885/2885412.png',
    alt: 'IoT chip icon',
  },
  {
    id: 4,
    title: 'Data Engineering',
    category: 'Data',
    description:
      'Turn data into valuable insights with modern data pipelines. Lakehouse architectures, real-time streaming, and governance frameworks make data a trusted enterprise asset.',
    capability: 'Lakehouse · Streaming · Governance',
    image: 'https://cdn-icons-png.flaticon.com/512/2906/2906274.png',
    alt: 'Database icon',
  },
  {
    id: 5,
    title: 'Cybersecurity',
    category: 'Trust',
    description:
      'Protect data, systems, and users in a connected world. Zero-trust architecture, threat intelligence, and continuous compliance safeguard your digital ecosystem.',
    capability: 'Zero-Trust · Threat Intel · Compliance',
    image: 'https://cdn-icons-png.flaticon.com/512/2092/2092663.png',
    alt: 'Security shield icon',
  },
  {
    id: 6,
    title: 'Modern Web Development',
    category: 'Experience',
    description:
      'Create fast, scalable, and engaging web experiences. Component-driven architectures, edge rendering, and accessibility-first design deliver measurable business outcomes.',
    capability: 'Edge Rendering · A11y · Performance',
    image: 'https://cdn-icons-png.flaticon.com/512/1006/1006363.png',
    alt: 'Code laptop icon',
  },
  {
    id: 7,
    title: 'Mobile App Development',
    category: 'Experience',
    description:
      'Build powerful mobile applications for iOS, Android, and beyond. Cross-platform frameworks and native performance engineering meet users wherever they are.',
    capability: 'Cross-Platform · Native · Offline-First',
    image: 'https://cdn-icons-png.flaticon.com/512/1067/1067019.png',
    alt: 'Smartphone icon',
  },
  {
    id: 8,
    title: 'Blockchain & Web3',
    category: 'Decentralized',
    description:
      'Enable transparency, security, and new digital ecosystems. Smart contracts, tokenization, and decentralized identity reshape how value and trust are exchanged.',
    capability: 'Smart Contracts · Tokenization · DID',
    image: 'https://cdn-icons-png.flaticon.com/512/6475/6475491.png',
    alt: 'Blockchain cubes icon',
  },
  {
    id: 9,
    title: 'Automation & RPA',
    category: 'Efficiency',
    description:
      'Streamline operations with intelligent automation. Robotic process automation combined with AI orchestrates workflows, reduces cost, and eliminates repetitive work.',
    capability: 'RPA · Orchestration · AI-Augmented',
    image: 'https://cdn-icons-png.flaticon.com/512/8637/8637185.png',
    alt: 'Robotic arm icon',
  },
  {
    id: 10,
    title: 'AR / VR / Spatial Computing',
    category: 'Immersion',
    description:
      'Create immersive digital experiences for training and engagement. Spatial interfaces blend physical and virtual worlds for simulation, collaboration, and storytelling.',
    capability: 'Immersive · Simulation · Spatial UI',
    image: 'https://cdn-icons-png.flaticon.com/512/854/854894.png',
    alt: 'VR headset icon',
  },
  {
    id: 11,
    title: 'Edge Computing',
    category: 'Infrastructure',
    description:
      'Process data closer to the action for faster, smarter decisions. Distributed compute at the edge reduces latency and enables real-time autonomy for critical systems.',
    capability: 'Low-Latency · Distributed · Real-Time',
    image: 'https://cdn-icons-png.flaticon.com/512/4248/4248443.png',
    alt: 'Edge server icon',
  },
  {
    id: 12,
    title: 'Digital Twins',
    category: 'Simulation',
    description:
      'Virtual models for real-world systems to predict, simulate, and optimize. Digital twins bridge the physical and digital to improve performance across the lifecycle.',
    capability: 'Simulate · Predict · Optimize',
    image: 'https://cdn-icons-png.flaticon.com/512/2906/2906131.png',
    alt: 'Digital twin buildings icon',
  },
  // ---------- NEW ADDITIONS ----------
  {
    id: 13,
    title: 'Quantum Computing',
    category: 'Frontier',
    description:
      'Harness quantum mechanics to solve problems beyond classical limits. Quantum algorithms accelerate drug discovery, cryptography, optimization, and material science.',
    capability: 'Qubits · Superposition · Entanglement',
    image: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png',
    alt: 'Quantum computing icon',
  },
  {
    id: 14,
    title: '5G & Advanced Connectivity',
    category: 'Connectivity',
    description:
      'Ultra-low latency and massive bandwidth enable real-time applications. 5G and beyond power autonomous vehicles, smart factories, and immersive remote collaboration.',
    capability: 'Low-Latency · Massive IoT · Slicing',
    image: 'https://cdn-icons-png.flaticon.com/512/2885/2885412.png',
    alt: '5G connectivity icon',
  },
  {
    id: 15,
    title: 'Generative AI',
    category: 'Intelligence',
    description:
      'Create text, images, code, and designs with AI models. Generative systems augment creativity, accelerate prototyping, and personalize content at scale.',
    capability: 'LLMs · Diffusion · Multimodal',
    image: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png',
    alt: 'Generative AI icon',
  },
  {
    id: 16,
    title: 'DevOps & Platform Engineering',
    category: 'Operations',
    description:
      'Accelerate delivery with CI/CD, infrastructure-as-code, and internal developer platforms. Engineering velocity and reliability become competitive advantages.',
    capability: 'CI/CD · IaC · Developer Portals',
    image: 'https://cdn-icons-png.flaticon.com/512/1006/1006363.png',
    alt: 'DevOps icon',
  },
  {
    id: 17,
    title: 'Low-Code / No-Code',
    category: 'Efficiency',
    description:
      'Empower citizen developers to build applications visually. Low-code platforms accelerate digital transformation and reduce dependency on scarce engineering talent.',
    capability: 'Visual Builders · Workflows · Citizen Dev',
    image: 'https://cdn-icons-png.flaticon.com/512/8637/8637185.png',
    alt: 'Low-code icon',
  },
  {
    id: 18,
    title: 'Green Technology & Sustainability',
    category: 'Sustainability',
    description:
      'Reduce carbon footprint with energy-efficient infrastructure, smart grids, and circular economy platforms. Sustainability becomes a driver of innovation and compliance.',
    capability: 'Carbon-Aware · Smart Grid · Circular',
    image: 'https://cdn-icons-png.flaticon.com/512/2906/2906274.png',
    alt: 'Green technology icon',
  },
  {
    id: 19,
    title: 'Computer Vision',
    category: 'Intelligence',
    description:
      'Extract meaning from images and video in real time. Visual AI powers quality inspection, medical imaging, security, retail analytics, and autonomous navigation.',
    capability: 'Detection · Segmentation · Tracking',
    image: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png',
    alt: 'Computer vision icon',
  },
  {
    id: 20,
    title: 'Natural Language Processing',
    category: 'Intelligence',
    description:
      'Enable machines to understand and generate human language. NLP drives chatbots, sentiment analysis, translation, summarization, and semantic search.',
    capability: 'LLMs · NLP · Semantic Search',
    image: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png',
    alt: 'NLP icon',
  },
  {
    id: 21,
    title: 'Robotics & Autonomous Systems',
    category: 'Automation',
    description:
      'Deploy intelligent robots for manufacturing, logistics, healthcare, and exploration. Autonomous systems combine perception, planning, and control for real-world tasks.',
    capability: 'SLAM · Motion Planning · Autonomy',
    image: 'https://cdn-icons-png.flaticon.com/512/8637/8637185.png',
    alt: 'Robotics icon',
  },
  {
    id: 22,
    title: 'Privacy-Enhancing Technologies',
    category: 'Trust',
    description:
      'Protect sensitive data with homomorphic encryption, secure multi-party computation, and differential privacy. Compliance and privacy become built-in by design.',
    capability: 'FHE · MPC · Differential Privacy',
    image: 'https://cdn-icons-png.flaticon.com/512/2092/2092663.png',
    alt: 'Privacy icon',
  },
  {
    id: 23,
    title: 'API-First Architecture',
    category: 'Integration',
    description:
      'Design systems around reusable APIs for composability and scale. API-first strategies enable partner ecosystems, microservices, and headless architectures.',
    capability: 'REST · GraphQL · Microservices',
    image: 'https://cdn-icons-png.flaticon.com/512/1006/1006363.png',
    alt: 'API icon',
  },
  {
    id: 24,
    title: 'Serverless & Event-Driven',
    category: 'Infrastructure',
    description:
      'Build applications without managing servers. Event-driven serverless architectures scale automatically, reduce cost, and accelerate time-to-market.',
    capability: 'FaaS · Event-Driven · Auto-Scale',
    image: 'https://cdn-icons-png.flaticon.com/512/4149/4149672.png',
    alt: 'Serverless icon',
  },
];

// ---------- Digital Earth Component ----------
const DigitalEarth: React.FC = () => {
  return (
    <div className="relative w-full max-w-[520px] aspect-square mx-auto">
      <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl animate-pulse-slow" />

      <svg viewBox="0 0 400 400" className="relative z-10 w-full h-full drop-shadow-[0_0_40px_rgba(59,130,246,0.5)]">
        <circle cx="200" cy="200" r="170" stroke="#3B82F6" strokeWidth="0.5" strokeOpacity="0.3" fill="none" />
        <circle cx="200" cy="200" r="150" stroke="#3B82F6" strokeWidth="0.3" strokeOpacity="0.2" fill="none" strokeDasharray="4 6" />

        <circle cx="200" cy="200" r="130" fill="#0A1120" stroke="#1E3A8A" strokeWidth="1.5" />

        <ellipse cx="200" cy="200" rx="130" ry="50" stroke="#3B82F6" strokeWidth="0.6" strokeOpacity="0.25" fill="none" />
        <ellipse cx="200" cy="200" rx="50" ry="130" stroke="#3B82F6" strokeWidth="0.6" strokeOpacity="0.25" fill="none" />
        <ellipse cx="200" cy="200" rx="130" ry="90" stroke="#3B82F6" strokeWidth="0.5" strokeOpacity="0.2" fill="none" />
        <ellipse cx="200" cy="200" rx="90" ry="130" stroke="#3B82F6" strokeWidth="0.5" strokeOpacity="0.2" fill="none" />

        <path d="M120 170 Q140 140 180 145 Q210 150 220 180 Q210 210 180 215 Q140 210 120 170Z" fill="#3B82F6" fillOpacity="0.15" />
        <path d="M250 150 Q280 160 285 190 Q280 220 250 225 Q230 210 235 180 Q240 160 250 150Z" fill="#3B82F6" fillOpacity="0.12" />
        <path d="M150 250 Q180 230 220 245 Q240 265 210 285 Q170 285 150 250Z" fill="#3B82F6" fillOpacity="0.1" />

        <g stroke="#60A5FA" strokeWidth="0.8" strokeOpacity="0.7">
          <line x1="140" y1="160" x2="260" y2="180" />
          <line x1="180" y1="130" x2="240" y2="200" />
          <line x1="130" y1="220" x2="250" y2="240" />
          <line x1="160" y1="250" x2="270" y2="190" />
          <line x1="120" y1="190" x2="200" y2="140" />
        </g>

        <g fill="#3B82F6">
          <circle cx="140" cy="160" r="3" className="animate-ping-slow" />
          <circle cx="260" cy="180" r="3" className="animate-ping-slow" style={{ animationDelay: '0.5s' }} />
          <circle cx="180" cy="130" r="3" className="animate-ping-slow" style={{ animationDelay: '1s' }} />
          <circle cx="240" cy="200" r="3" className="animate-ping-slow" style={{ animationDelay: '1.5s' }} />
          <circle cx="130" cy="220" r="3" className="animate-ping-slow" style={{ animationDelay: '0.8s' }} />
          <circle cx="250" cy="240" r="3" className="animate-ping-slow" style={{ animationDelay: '0.3s' }} />
          <circle cx="160" cy="250" r="3" className="animate-ping-slow" style={{ animationDelay: '1.2s' }} />
          <circle cx="270" cy="190" r="3" className="animate-ping-slow" style={{ animationDelay: '0.6s' }} />
        </g>
        <g fill="#93C5FD" fillOpacity="0.8">
          <circle cx="140" cy="160" r="1.5" />
          <circle cx="260" cy="180" r="1.5" />
          <circle cx="180" cy="130" r="1.5" />
          <circle cx="240" cy="200" r="1.5" />
          <circle cx="130" cy="220" r="1.5" />
          <circle cx="250" cy="240" r="1.5" />
          <circle cx="160" cy="250" r="1.5" />
          <circle cx="270" cy="190" r="1.5" />
        </g>

        <path d="M100 200 Q200 100 300 200" stroke="url(#trailGrad)" strokeWidth="1.2" fill="none" strokeOpacity="0.6" />
        <path d="M120 260 Q200 320 280 240" stroke="url(#trailGrad2)" strokeWidth="1" fill="none" strokeOpacity="0.5" />

        <defs>
          <linearGradient id="trailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
            <stop offset="50%" stopColor="#60A5FA" stopOpacity="1" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="trailGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </linearGradient>
        </defs>

        <text x="200" y="195" textAnchor="middle" fill="#E0F2FE" fontSize="14" fontWeight="600" fontFamily="Space Grotesk, sans-serif" letterSpacing="2">A CONNECTED</text>
        <text x="200" y="218" textAnchor="middle" fill="#93C5FD" fontSize="12" fontWeight="500" fontFamily="Space Grotesk, sans-serif" letterSpacing="3">TOMORROW</text>
      </svg>

      <div className="absolute inset-0 pointer-events-none">
        {[
          { label: 'AI', top: '8%', left: '12%', delay: '0s' },
          { label: 'Cloud', top: '20%', right: '6%', delay: '0.3s' },
          { label: 'IoT', top: '48%', left: '2%', delay: '0.6s' },
          { label: 'Data', bottom: '18%', right: '0%', delay: '0.9s' },
          { label: 'Security', bottom: '8%', left: '18%', delay: '1.2s' },
          { label: 'Automation', top: '10%', right: '20%', delay: '1.5s' },
          { label: 'Edge', bottom: '28%', left: '6%', delay: '1.8s' },
        ].map((item, i) => (
          <span
            key={i}
            className="absolute px-3 py-1.5 text-xs font-medium text-blue-100 bg-white/10 backdrop-blur-md border border-blue-400/30 rounded-full shadow-lg shadow-blue-500/10 animate-float"
            style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom, animationDelay: item.delay }}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
};

// ---------- Main Component ----------
const TechnologyTrends: React.FC = () => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('trends-section');
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 150) {
          setRevealed(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white font-inter">
      {/* ========== HERO ========== */}
      <section className="relative min-h-screen w-full bg-[#0A0C10] overflow-hidden flex items-center px-6 lg:px-12 py-20">
        <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-float-slow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[120px] pointer-events-none opacity-40">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,120 L0,80 L30,80 L30,50 L60,50 L60,70 L100,70 L100,40 L130,40 L130,60 L170,60 L170,30 L200,30 L200,50 L240,50 L240,20 L280,20 L280,45 L320,45 L320,15 L360,15 L360,50 L400,50 L400,25 L440,25 L440,60 L480,60 L480,35 L520,35 L520,70 L560,70 L560,40 L600,40 L600,75 L640,75 L640,30 L680,30 L680,55 L720,55 L720,25 L760,25 L760,65 L800,65 L800,45 L840,45 L840,70 L880,70 L880,35 L920,35 L920,60 L960,60 L960,20 L1000,20 L1000,55 L1040,55 L1040,75 L1080,75 L1080,40 L1120,40 L1120,65 L1160,65 L1160,30 L1200,30 L1200,70 L1240,70 L1240,45 L1280,45 L1280,80 L1320,80 L1320,55 L1360,55 L1360,85 L1400,85 L1400,60 L1440,60 L1440,120 Z" fill="#1A2A4A" opacity="0.6" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* LEFT */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
              Innovation for a Smarter Tomorrow
            </span>
            <h1 className="font-space-grotesk text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-white mb-6">
              Technology Trends
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Shaping a Better Future
              </span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Explore the latest technology trends transforming industries, creating new opportunities, and building a smarter, more connected world.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
              <button className="group relative px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5">
                Explore Our Solutions
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
              </button>
              <button className="px-8 py-3.5 bg-white/5 border border-white/15 text-white font-semibold rounded-full backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5">
                Talk to an Expert
              </button>
            </div>
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Future-Ready Solutions
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Industry-Focused Innovation
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Scalable & Secure Technologies
              </span>
            </div>
          </div>

          {/* RIGHT – Digital Earth */}
          <div className="flex-1 flex justify-center items-center w-full max-w-lg lg:max-w-xl">
            <DigitalEarth />
          </div>
        </div>
      </section>

      {/* ========== TRENDS SECTION ========== */}
      <section id="trends-section" className="relative bg-white py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-4 py-2 mb-5">
              Explore
            </span>
            <h2 className="font-space-grotesk text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-5">
              Top Technology <span className="text-blue-600">Trends</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Powering innovation across industries with next-generation technologies.
            </p>
          </div>

          {/* grid – 24 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trends.map((trend, index) => (
              <div
                key={trend.id}
                className={`group relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-200 transition-all duration-500 hover:-translate-y-1.5 flex flex-col ${
                  revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(index % 12) * 60}ms` }}
              >
                {/* Category tag */}
                <span className="self-start text-[10px] font-semibold tracking-[0.15em] uppercase text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-1 mb-4">
                  {trend.category}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-50 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300 p-2 mb-4">
                  <img
                    src={trend.image}
                    alt={trend.alt}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Title */}
                <h3 className="font-space-grotesk text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-3">
                  {trend.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                  {trend.description}
                </p>

                {/* Capability highlight */}
                <div className="pt-4 border-t border-gray-100 mt-auto">
                  <span className="text-xs font-medium text-blue-500 tracking-wide">
                    {trend.capability}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ========== STATS STRIP ========== */}
          <div className="mt-20 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-3xl border border-blue-100 p-8 lg:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600/10">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <span className="font-space-grotesk text-3xl font-bold text-gray-900">24+</span>
                <span className="text-sm text-gray-500 font-medium">Technology Domains</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600/10">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-space-grotesk text-3xl font-bold text-gray-900">100+</span>
                <span className="text-sm text-gray-500 font-medium">Successful Projects</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600/10">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <span className="font-space-grotesk text-3xl font-bold text-gray-900">Global</span>
                <span className="text-sm text-gray-500 font-medium">Industry Presence</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600/10">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-space-grotesk text-3xl font-bold text-gray-900">Future-Ready</span>
                <span className="text-sm text-gray-500 font-medium">For Next-Gen Growth</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-ping-slow { animation: ping-slow 2.5s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .font-space-grotesk { font-family: 'Space Grotesk', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>
    </div>
  );
};

export default TechnologyTrends;