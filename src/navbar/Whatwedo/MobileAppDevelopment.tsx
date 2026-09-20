import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Smartphone,
  Users,
  ShoppingCart,
  CalendarCheck,
  Briefcase,
  Truck,
  Headphones,
  Fingerprint,
  Bell,
  CreditCard,
  MapPin,
  Navigation,
  MessageSquare,
  Search,
  BarChart3,
  Database,
  Cloud,
  Mail,
  MessageCircle,
  Plug,
  ArrowRight,
  Star,
  TrendingUp,
  Zap,
  Shield,
  Layers,
  ChevronRight,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Scroll-reveal hook                                                 */
/* ------------------------------------------------------------------ */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(entry.target);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ------------------------------------------------------------------ */
/*  Reveal wrapper                                                     */
/* ------------------------------------------------------------------ */
const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right';
}> = ({ children, delay = 0, className = '', direction = 'up' }) => {
  const { ref, visible } = useReveal();
  const base =
    direction === 'left'
      ? 'translate-x-[-40px]'
      : direction === 'right'
        ? 'translate-x-[40px]'
        : 'translate-y-[40px]';

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${base}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Floating particle background                                       */
/* ------------------------------------------------------------------ */
const Particles: React.FC<{ count?: number }> = ({ count = 24 }) => {
  const particles = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * -20,
        opacity: Math.random() * 0.35 + 0.1,
      })),
    [count],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-blue-400"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `float-particle ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes float-particle {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-120px) translateX(40px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Phone mockup — reusable                                           */
/* ------------------------------------------------------------------ */
const PhoneFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
  floating?: boolean;
}> = ({ children, className = '', floating = false }) => (
  <div
    className={`relative mx-auto w-[270px] sm:w-[300px] rounded-[2.6rem] border border-white/20 bg-gradient-to-b from-slate-800 to-slate-900 p-[10px] shadow-2xl shadow-blue-500/20 ${className}`}
    style={
      floating
        ? { animation: 'phone-float 6s ease-in-out infinite' }
        : undefined
    }
  >
    {/* Notch */}
    <div className="absolute left-1/2 top-[10px] z-20 h-[22px] w-[90px] -translate-x-1/2 rounded-full bg-slate-950" />
    {/* Screen */}
    <div className="relative overflow-hidden rounded-[2.1rem] bg-slate-950">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2 text-[10px] font-medium text-white/70">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <span className="inline-block h-2 w-3 rounded-sm border border-white/50" />
          <span className="inline-block h-2 w-3 rounded-sm border border-white/50" />
          <span className="inline-block h-2 w-4 rounded-sm border border-white/50 bg-white/60" />
        </div>
      </div>
      {children}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Hero phone UI                                                      */
/* ------------------------------------------------------------------ */
const HeroPhoneUI: React.FC = () => (
  <div className="px-4 pb-4">
    {/* Welcome */}
    <div className="mb-3 flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-xs font-bold text-white">
        AK
      </div>
      <div>
        <p className="text-[10px] text-white/50">Welcome back</p>
        <p className="text-xs font-semibold text-white">Alex Kim</p>
      </div>
      <div className="relative ml-auto">
        <Bell className="h-4 w-4 text-white/60" />
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-rose-500" />
      </div>
    </div>

    {/* Search */}
    <div className="mb-3 flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
      <Search className="h-3.5 w-3.5 text-white/40" />
      <span className="text-[10px] text-white/40">Search products, services…</span>
    </div>

    {/* Quick stats */}
    <div className="mb-3 grid grid-cols-2 gap-2">
      <div className="rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 p-2.5 border border-blue-400/20">
        <TrendingUp className="mb-1 h-3.5 w-3.5 text-blue-400" />
        <p className="text-[9px] text-white/50">Revenue</p>
        <p className="text-xs font-bold text-white">$12.4k</p>
      </div>
      <div className="rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 p-2.5 border border-purple-400/20">
        <ShoppingCart className="mb-1 h-3.5 w-3.5 text-purple-400" />
        <p className="text-[9px] text-white/50">Orders</p>
        <p className="text-xs font-bold text-white">86</p>
      </div>
    </div>

    {/* Service cards */}
    <p className="mb-2 text-[10px] font-semibold text-white/70">Popular Services</p>
    <div className="mb-3 space-y-2">
      {[
        { icon: CalendarCheck, label: 'Consultation', sub: 'Today · 2:30 PM', color: 'text-emerald-400' },
        { icon: Truck, label: 'Delivery', sub: 'In transit · 15 min', color: 'text-amber-400' },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-2.5 rounded-xl bg-white/5 p-2.5 border border-white/5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5">
            <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-medium text-white">{item.label}</p>
            <p className="text-[8px] text-white/40">{item.sub}</p>
          </div>
          <ChevronRight className="h-3 w-3 text-white/30" />
        </div>
      ))}
    </div>

    {/* Order status */}
    <div className="mb-3 rounded-xl bg-gradient-to-r from-emerald-500/15 to-teal-500/10 p-2.5 border border-emerald-400/20">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
          <Zap className="h-3 w-3 text-emerald-400" />
        </div>
        <div className="flex-1">
          <p className="text-[9px] font-semibold text-emerald-300">Order #4821</p>
          <p className="text-[8px] text-white/40">Out for delivery</p>
        </div>
        <span className="text-[8px] text-emerald-400 font-medium">2 min</span>
      </div>
    </div>

    {/* Bottom nav */}
    <div className="flex items-center justify-around rounded-xl bg-white/5 px-2 py-2 border border-white/5">
      {[Smartphone, Search, ShoppingCart, Users].map((Icon, i) => (
        <div
          key={i}
          className={`flex flex-col items-center gap-0.5 ${i === 0 ? 'text-blue-400' : 'text-white/30'}`}
        >
          <Icon className="h-3.5 w-3.5" />
          <span className="text-[7px] font-medium">
            {['Home', 'Search', 'Cart', 'Profile'][i]}
          </span>
        </div>
      ))}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Floating mini card                                                 */
/* ------------------------------------------------------------------ */
const FloatingCard: React.FC<{
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  color: string;
  className: string;
  delay?: number;
}> = ({ icon: Icon, title, subtitle, color, className, delay = 0 }) => (
  <div
    className={`absolute z-20 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 shadow-lg backdrop-blur-md ${className}`}
    style={{ animation: `float-card 5s ease-in-out infinite`, animationDelay: `${delay}s` }}
  >
    <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${color}`}>
      <Icon className="h-3.5 w-3.5 text-white" />
    </div>
    <div>
      <p className="text-[10px] font-semibold text-white">{title}</p>
      {subtitle && <p className="text-[8px] text-white/50">{subtitle}</p>}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Data connection line (SVG)                                         */
/* ------------------------------------------------------------------ */
const DataLine: React.FC<{ d: string; delay?: number }> = ({ d, delay = 0 }) => (
  <path
    d={d}
    fill="none"
    stroke="url(#lineGrad)"
    strokeWidth="1.5"
    strokeDasharray="6 8"
    className="opacity-40"
    style={{ animation: `dash 3s linear infinite`, animationDelay: `${delay}s` }}
  />
);

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */
const MobileAppDevelopment: React.FC = () => {
  /* ---------------- Section 1 – Hero ---------------- */
  const hero = (
    <section className="relative overflow-hidden bg-slate-950 pt-20 pb-24 sm:pt-28 sm:pb-32 lg:pt-32 lg:pb-40">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/videos/hero-poster.jpg"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30 motion-reduce:hidden"
        aria-hidden="true"
      >
        <source src="/videos/mobile-hero-bg.webm" type="video/webm" />
        <source src="/mobile development.mp4" type="video/mp4" />
      </video>

      {/* Static poster fallback for reduced-motion users */}
      <div
        className="pointer-events-none absolute inset-0 hidden bg-cover bg-center opacity-30 motion-reduce:block"
        style={{ backgroundImage: 'url(/videos/hero-poster.jpg)' }}
        aria-hidden="true"
      />

      {/* Dark overlay for text readability */}
    

      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[140px]" />
        <div className="absolute -right-40 top-40 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)]" />
      </div>

      <Particles count={30} />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-8">
          {/* Left */}
          <div className="text-center lg:text-left">
            <Reveal delay={0}>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-300 backdrop-blur-sm">
                <Smartphone className="h-3.5 w-3.5" />
                Mobile App Development
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Powerful Mobile{' '}
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Experiences
                </span>{' '}
                for Modern Businesses
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-300/90 sm:text-lg lg:mx-0">
                We design and build intuitive, scalable mobile applications that connect your
                customers, teams, and business operations — wherever they are.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href="#solutions"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:brightness-110 sm:w-auto"
                >
                  Explore Mobile Solutions
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="#cta"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 sm:w-auto"
                >
                  Discuss Your App
                </a>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-10 flex items-center justify-center gap-6 lg:justify-start">
                {[
                  { value: '120+', label: 'Apps Delivered' },
                  { value: '98%', label: 'Client Retention' },
                  { value: '4.9', label: 'Average Rating', icon: Star },
                ].map((stat, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <p className="flex items-center justify-center gap-1 text-xl font-bold text-white lg:justify-start">
                      {stat.value}
                      {stat.icon && <stat.icon className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />}
                    </p>
                    <p className="text-[11px] text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right – Phone mockup */}
          <Reveal delay={250} direction="right">
            <div className="relative mx-auto flex max-w-md items-center justify-center">
              {/* Glow behind phone */}
              <div className="absolute h-[420px] w-[320px] rounded-full bg-blue-500/20 blur-[80px]" />

              {/* SVG data connections */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 500 600"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <DataLine d="M 120 200 Q 200 280 250 300" delay={0} />
                <DataLine d="M 380 180 Q 320 260 250 300" delay={0.8} />
                <DataLine d="M 400 420 Q 330 380 260 340" delay={1.6} />
                <DataLine d="M 100 440 Q 180 380 240 340" delay={2.4} />
              </svg>

              <style>{`
                @keyframes dash { to { stroke-dashoffset: -28; } }
                @keyframes phone-float {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-14px); }
                }
                @keyframes float-card {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-8px); }
                }
              `}</style>

              <PhoneFrame floating className="relative z-10">
                <HeroPhoneUI />
              </PhoneFrame>

              {/* Floating cards */}
              <FloatingCard
                icon={CalendarCheck}
                title="New Booking"
                subtitle="Just now"
                color="bg-emerald-500"
                className="-left-6 top-16 sm:-left-10"
                delay={0}
              />
              <FloatingCard
                icon={CreditCard}
                title="Payment Successful"
                subtitle="$249.00"
                color="bg-blue-500"
                className="-right-4 top-40 sm:-right-10"
                delay={1}
              />
              <FloatingCard
                icon={Truck}
                title="Order Delivered"
                subtitle="On time"
                color="bg-amber-500"
                className="-left-4 bottom-40 sm:-left-8"
                delay={2}
              />
              <FloatingCard
                icon={Bell}
                title="New Notification"
                subtitle="You have 3 new"
                color="bg-purple-500"
                className="-right-6 bottom-20 sm:-right-8"
                delay={0.5}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );

  /* ---------------- Section 2 – Problem → Solution ---------------- */
  const problems = [
    {
      icon: Users,
      title: 'Disconnected Customers',
      desc: 'Give customers a convenient way to access your products, services, bookings, and support from their phones.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Layers,
      title: 'Manual Processes',
      desc: 'Move everyday business workflows from paperwork and repetitive tasks into efficient mobile experiences.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Navigation,
      title: 'Limited Accessibility',
      desc: 'Keep customers and employees connected to essential business information from anywhere.',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Plug,
      title: 'Multiple Systems',
      desc: 'Connect your mobile application with existing APIs, CRM platforms, payment systems, maps, and business software.',
      gradient: 'from-amber-500 to-orange-500',
    },
  ];

  const problemSection = (
    <section className="relative bg-slate-950 py-20 sm:py-28" id="solutions">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-[300px] w-[300px] rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Turn Business Challenges Into{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Mobile Experiences
              </span>
            </h2>
            <p className="mt-4 text-slate-400">
              We identify the friction points in your business and transform them into seamless
              mobile solutions.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-blue-500/10">
                <div
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${p.gradient} shadow-lg`}
                >
                  <p.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-base font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.desc}</p>
                <div
                  className={`absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br ${p.gradient} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );

  /* ---------------- Section 3 – What We Build ---------------- */
  const solutions = [
    { icon: Users, title: 'Customer Apps', desc: 'Deliver personalized experiences for customers, users, and members.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { icon: ShoppingCart, title: 'E-Commerce Apps', desc: 'Mobile shopping experiences with products, cart, wishlist, checkout, and orders.', color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { icon: CalendarCheck, title: 'Booking Apps', desc: 'Appointments, reservations, schedules, availability, and instant confirmations.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { icon: Briefcase, title: 'Business Apps', desc: 'Give teams access to business operations, workflows, records, and communication.', color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { icon: Truck, title: 'Delivery & Tracking', desc: 'Real-time delivery tracking, locations, order updates, and status notifications.', color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { icon: Headphones, title: 'Service Applications', desc: 'Connect customers with your services through simple and intuitive mobile workflows.', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  ];

  const whatWeBuild = (
    <section className="relative bg-slate-900/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Mobile Applications Built{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Around Your Business
              </span>
            </h2>
            <p className="mt-4 text-slate-400">
              From customer-facing apps to internal business tools — we build solutions that fit
              your exact needs.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-blue-500/10">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${s.bg}`}>
                  <s.icon className={`h-6 w-6 ${s.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Explore <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );

  /* ---------------- Section 4 – Android + iOS + Cross-Platform ---------------- */
  const platforms = (
    <section className="relative overflow-hidden bg-slate-950 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              One Digital Experience{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Across Devices
              </span>
            </h2>
            <p className="mt-4 text-slate-400">
              Build consistent mobile experiences that work seamlessly across the devices your
              customers and teams use every day.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-16 flex flex-wrap items-end justify-center gap-6 sm:gap-10 lg:gap-16">
            {/* Tablet – left */}
            <div className="hidden sm:block" style={{ animation: 'device-float 7s ease-in-out infinite', animationDelay: '0.5s' }}>
              <div className="relative w-[180px] rounded-2xl border border-white/15 bg-gradient-to-b from-slate-800 to-slate-900 p-2 shadow-xl shadow-blue-500/10 lg:w-[200px]">
                <div className="overflow-hidden rounded-xl bg-slate-950 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                    <div className="h-1.5 w-12 rounded-full bg-white/20" />
                  </div>
                  <div className="mb-2 h-16 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/10" />
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-full rounded-full bg-white/10" />
                    <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-1.5">
                    <div className="h-10 rounded-lg bg-white/5" />
                    <div className="h-10 rounded-lg bg-white/5" />
                  </div>
                </div>
              </div>
              <p className="mt-3 text-center text-xs font-medium text-slate-400">Tablet</p>
            </div>

            {/* Main phone – center */}
            <div style={{ animation: 'device-float 6s ease-in-out infinite' }}>
              <PhoneFrame>
                <div className="px-4 pb-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-white/50">Good morning</p>
                      <p className="text-xs font-semibold text-white">Dashboard</p>
                    </div>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-[8px] font-bold text-white">
                      AK
                    </div>
                  </div>
                  <div className="mb-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/10 p-3 border border-blue-400/20">
                    <p className="text-[9px] text-white/50">Total Balance</p>
                    <p className="text-lg font-bold text-white">$8,420.00</p>
                    <div className="mt-2 flex gap-2">
                      <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[8px] text-blue-300">+12.5%</span>
                    </div>
                  </div>
                  <p className="mb-2 text-[10px] font-semibold text-white/70">Recent Activity</p>
                  <div className="space-y-2">
                    {[
                      { label: 'Payment', value: '-$49.00', color: 'text-rose-400' },
                      { label: 'Deposit', value: '+$320.00', color: 'text-emerald-400' },
                      { label: 'Transfer', value: '-$120.00', color: 'text-rose-400' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-2">
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 rounded-md bg-white/10" />
                          <span className="text-[9px] text-white/70">{item.label}</span>
                        </div>
                        <span className={`text-[9px] font-medium ${item.color}`}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </PhoneFrame>
              <p className="mt-3 text-center text-xs font-medium text-slate-400">Smartphone</p>
            </div>

            {/* Phone – right */}
            <div className="hidden sm:block" style={{ animation: 'device-float 6.5s ease-in-out infinite', animationDelay: '1s' }}>
              <div className="relative w-[160px] rounded-[2rem] border border-white/15 bg-gradient-to-b from-slate-800 to-slate-900 p-2 shadow-xl shadow-purple-500/10 lg:w-[180px]">
                <div className="overflow-hidden rounded-[1.6rem] bg-slate-950 p-3">
                  <div className="mb-3 h-24 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-400/20" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-lg bg-emerald-500/20" />
                      <div className="flex-1">
                        <div className="h-1.5 w-16 rounded-full bg-white/20" />
                        <div className="mt-1 h-1 w-10 rounded-full bg-white/10" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-lg bg-blue-500/20" />
                      <div className="flex-1">
                        <div className="h-1.5 w-14 rounded-full bg-white/20" />
                        <div className="mt-1 h-1 w-8 rounded-full bg-white/10" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-center text-xs font-medium text-slate-400">Smartphone</p>
            </div>
          </div>
        </Reveal>

        {/* Platform labels */}
        <Reveal delay={300}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {['Android', 'iOS', 'Cross-Platform'].map((label, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/10"
              >
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
                <span className="text-sm font-medium text-white">{label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <style>{`
          @keyframes device-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </div>
    </section>
  );

  /* ---------------- Section 5 – Mobile Features ---------------- */
  const features = [
    { icon: Fingerprint, title: 'User Authentication', desc: 'Secure login, registration, profiles, and account access.' },
    { icon: Bell, title: 'Push Notifications', desc: 'Keep users informed with timely alerts and updates.' },
    { icon: CreditCard, title: 'Payments', desc: 'Connect secure payment experiences to your application.' },
    { icon: MapPin, title: 'Real-Time Tracking', desc: 'Show live locations, delivery progress, and status updates.' },
    { icon: Navigation, title: 'Maps & Location', desc: 'Integrate location-based experiences and navigation.' },
    { icon: MessageSquare, title: 'Chat & Communication', desc: 'Enable direct communication between customers and teams.' },
    { icon: Search, title: 'Search & Filters', desc: 'Help users quickly discover products, services, or information.' },
    { icon: BarChart3, title: 'Analytics', desc: 'Understand user activity and application performance.' },
  ];

  const featuresSection = (
    <section className="relative bg-slate-900/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything Your Mobile App{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Needs
              </span>
            </h2>
            <p className="mt-4 text-slate-400">
              A complete toolkit of features and capabilities to power your mobile experience.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-400 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-blue-500/10">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/10 transition-transform duration-300 group-hover:scale-110">
                  <f.icon className="h-5 w-5 text-blue-400 transition-colors duration-300 group-hover:text-blue-300" />
                </div>
                <h3 className="text-sm font-semibold text-white">{f.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );

  /* ---------------- Section 6 – Integration ---------------- */
  const integrations = [
    { icon: Users, label: 'CRM', angle: -90 },
    { icon: Briefcase, label: 'ERP', angle: -45 },
    { icon: CreditCard, label: 'Payment Gateway', angle: 0 },
    { icon: Cloud, label: 'Cloud', angle: 45 },
    { icon: Database, label: 'Database', angle: 90 },
    { icon: MapPin, label: 'Maps', angle: 135 },
    { icon: MessageCircle, label: 'SMS', angle: 180 },
    { icon: Mail, label: 'Email', angle: 225 },
    { icon: Plug, label: 'Third-Party APIs', angle: 270 },
  ];

  const integrationSection = (
    <section className="relative overflow-hidden bg-slate-950 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Connect Your App With{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Your Existing Systems
              </span>
            </h2>
            <p className="mt-4 text-slate-400">
              Your mobile application doesn't have to work alone. Integrate your existing business
              systems and third-party services into one connected mobile experience.
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="relative mx-auto mt-16 flex h-[420px] w-full max-w-3xl items-center justify-center sm:h-[480px] lg:h-[520px]">
            {/* Connection lines */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 600 520"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="intGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.5" />
                </linearGradient>
                <radialGradient id="dotGrad">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#a855f7" />
                </radialGradient>
              </defs>

              {integrations.map((item, i) => {
                const cx = 300;
                const cy = 260;
                const rad = (item.angle * Math.PI) / 180;
                const r = 175;
                const x = cx + r * Math.cos(rad);
                const y = cy + r * Math.sin(rad);
                return (
                  <g key={i}>
                    <line
                      x1={cx}
                      y1={cy}
                      x2={x}
                      y2={y}
                      stroke="url(#intGrad)"
                      strokeWidth="1"
                      strokeDasharray="4 6"
                      className="opacity-50"
                      style={{ animation: `dash-int 2.5s linear infinite`, animationDelay: `${i * 0.3}s` }}
                    />
                    <circle r="3" fill="url(#dotGrad)">
                      <animateMotion
                        dur={`${2.5 + i * 0.3}s`}
                        repeatCount="indefinite"
                        path={`M${cx},${cy} L${x},${y}`}
                      />
                    </circle>
                  </g>
                );
              })}
            </svg>

            {/* Center card */}
            <div className="relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-600/30 to-purple-600/20 shadow-xl shadow-blue-500/20 backdrop-blur-md sm:h-32 sm:w-32">
              <Smartphone className="h-6 w-6 text-blue-300 sm:h-7 sm:w-7" />
              <p className="mt-1 text-[10px] font-semibold text-white sm:text-xs">Your Mobile App</p>
            </div>

            {/* Orbiting integration cards */}
            {integrations.map((item, i) => {
              const rad = (item.angle * Math.PI) / 180;
              const r = 175;
              const x = 300 + r * Math.cos(rad);
              const y = 260 + r * Math.sin(rad);
              return (
                <div
                  key={i}
                  className="absolute z-10 flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900/80 px-2.5 py-1.5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-blue-400/40 hover:bg-slate-800/90 hover:shadow-blue-500/20"
                  style={{
                    left: `${(x / 600) * 100}%`,
                    top: `${(y / 520) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <item.icon className="h-3 w-3 text-blue-400 sm:h-3.5 sm:w-3.5" />
                  <span className="whitespace-nowrap text-[8px] font-medium text-white sm:text-[10px]">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>

        <style>{`
          @keyframes dash-int { to { stroke-dashoffset: -20; } }
        `}</style>
      </div>
    </section>
  );

  /* ---------------- Section 7 – User Journey ---------------- */
  const steps = [
    { num: '01', title: 'Open App', desc: 'User opens the business application.' },
    { num: '02', title: 'Discover', desc: 'User searches products, services, bookings, or information.' },
    { num: '03', title: 'Take Action', desc: 'User books, purchases, requests, tracks, or communicates.' },
    { num: '04', title: 'Get Notified', desc: 'User receives confirmation and real-time updates.' },
    { num: '05', title: 'Stay Connected', desc: 'Business and customer remain connected through the application.' },
  ];

  const journeySection = (
    <section className="relative bg-slate-900/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Journey steps */}
          <div>
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                From{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Tap to Action
                </span>
              </h2>
              <p className="mt-4 text-slate-400">
                A seamless journey that keeps your customers engaged and your business connected.
              </p>
            </Reveal>

            <div className="relative mt-10">
              {/* Vertical line */}
              <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-transparent opacity-30" />

              <div className="space-y-8">
                {steps.map((step, i) => (
                  <Reveal key={i} delay={i * 120} direction="left">
                    <div className="relative flex gap-5">
                      <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-400/30 bg-slate-900 text-[10px] font-bold text-blue-400 shadow-lg shadow-blue-500/10">
                        {step.num}
                      </div>
                      <div className="pt-0.5">
                        <h3 className="text-base font-semibold text-white">{step.title}</h3>
                        <p className="mt-1 text-sm text-slate-400">{step.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* Phone visual */}
          <Reveal delay={200} direction="right">
            <div className="relative flex justify-center" style={{ animation: 'phone-float 7s ease-in-out infinite' }}>
              <div className="absolute h-[400px] w-[300px] rounded-full bg-purple-500/15 blur-[90px]" />
              <PhoneFrame className="relative z-10">
                <div className="px-4 pb-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Search className="h-3.5 w-3.5 text-white/40" />
                    <div className="h-1.5 w-24 rounded-full bg-white/10" />
                  </div>
                  <div className="mb-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/10 p-3 border border-blue-400/20">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20">
                        <CalendarCheck className="h-3.5 w-3.5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-[9px] font-semibold text-white">Booking Confirmed</p>
                        <p className="text-[8px] text-white/40">Your appointment is set</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { icon: Bell, label: 'Notification sent', time: '2m ago' },
                      { icon: Truck, label: 'Order on the way', time: '15m' },
                      { icon: MessageSquare, label: 'Chat with support', time: 'Online' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-lg bg-white/5 px-2.5 py-2">
                        <item.icon className="h-3 w-3 text-white/50" />
                        <span className="flex-1 text-[9px] text-white/70">{item.label}</span>
                        <span className="text-[8px] text-white/30">{item.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-emerald-500/10 py-2 border border-emerald-400/20">
                    <Zap className="h-3 w-3 text-emerald-400" />
                    <span className="text-[9px] font-medium text-emerald-300">All systems connected</span>
                  </div>
                </div>
              </PhoneFrame>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );

  /* ---------------- Section 8 – Business Benefits ---------------- */
  const benefits = [
    { icon: Star, title: 'Better Customer Experience', desc: 'Make your services accessible through a simple mobile experience.', gradient: 'from-blue-500 to-cyan-500' },
    { icon: Zap, title: 'Faster Operations', desc: 'Reduce manual workflows and improve everyday business processes.', gradient: 'from-purple-500 to-pink-500' },
    { icon: TrendingUp, title: 'Real-Time Connectivity', desc: 'Keep customers, employees, and systems connected.', gradient: 'from-emerald-500 to-teal-500' },
    { icon: Shield, title: 'Scalable Technology', desc: 'Build a foundation that can grow with your business.', gradient: 'from-amber-500 to-orange-500' },
  ];

  const benefitsSection = (
    <section className="relative bg-slate-950 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Built to Create{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Real Business Value
              </span>
            </h2>
            <p className="mt-4 text-slate-400">
              Every mobile application we build is designed to deliver measurable impact.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {benefits.map((b, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-blue-500/10">
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${b.gradient} shadow-lg`}>
                  <b.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{b.desc}</p>
                <div className={`absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br ${b.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );

  /* ---------------- Section 9 – Technology Strip ---------------- */
  const techStack = [
    'React Native', 'Flutter', 'Android', 'iOS',
    'REST APIs', 'Cloud Integration', 'Push Notifications', 'Payment Integration',
  ];

  const techSection = (
    <section className="relative border-y border-white/5 bg-slate-900/40 py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {techStack.map((tech, i) => (
              <span
                key={i}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-blue-300 sm:px-5 sm:py-2.5 sm:text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );

  /* ---------------- Section 10 – Final CTA ---------------- */
  const ctaSection = (
    <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-32" id="cta">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 h-[300px] w-[300px] rounded-full bg-purple-600/15 blur-[120px]" />
      </div>

      {/* Background phone illustration */}
      <div className="pointer-events-none absolute right-[-60px] top-1/2 -translate-y-1/2 opacity-[0.07] sm:right-[-40px] lg:right-10 lg:opacity-[0.12]" aria-hidden="true">
        <div className="w-[280px] rounded-[2.6rem] border-2 border-white/30 p-[10px] sm:w-[320px]">
          <div className="aspect-[9/19] rounded-[2.1rem] bg-white/20" />
        </div>
      </div>

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Have a Mobile App Idea?
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-300/90 sm:text-lg">
            Let's turn your business idea into a mobile experience your customers and teams can use
            every day.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-blue-600/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/40 hover:brightness-110 sm:w-auto"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 sm:w-auto"
            >
              Talk to Our Team
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );

  /* ---------------- Assemble ---------------- */
  return (
    <div className="min-h-screen bg-slate-950 font-sans antialiased selection:bg-blue-500/30 selection:text-white">
      {hero}
      {problemSection}
      {whatWeBuild}
      {platforms}
      {featuresSection}
      {integrationSection}
      {journeySection}
      {benefitsSection}
      {techSection}
      {ctaSection}

      {/* Global keyframes */}
      <style>{`
        @keyframes phone-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes float-card {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes dash { to { stroke-dashoffset: -28; } }
        @keyframes dash-int { to { stroke-dashoffset: -20; } }
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-120px) translateX(40px); opacity: 0; }
        }
        @keyframes device-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @media (prefers-reduced-motion: reduce) {
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

export default MobileAppDevelopment;