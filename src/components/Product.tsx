import React, { useEffect, useRef, useState } from "react"
import {
  HeartPulse,
  ShoppingCart,
  Truck,
  GraduationCap,
  House,
  ShieldCheck,
  ArrowRight,
  Users,
  Building2,
  Settings2,
  BadgeCheck,
} from "lucide-react";

// 👇 Background image import
import productsBg from "../assets/background.png";

// 👇 Card images — update filenames to match your assets
import careGridImg from "../assets/Doctor.png";
import retailGridImg from "../assets/e-commere.png";
import fleetGridImg from "../assets/truck.png";
import learnGridImg from "../assets/education .png";
import propertyGridImg from "../assets/Land.png";
import controlGridImg from "../assets/complance.png";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Product {
  id: number;
  name: string;
  accentPart: string;
  industry: string;
  headline: string;
  description: string;
  icon: React.ElementType;
  image: string;
  imageAlt: string;
  badge: string;
  accent: {
    text: string;
    bg: string;
    ring: string;
    gradient: string;
    glow: string;
    solid: string;
  };
  href: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const products: Product[] = [
  {
    id: 1,
    name: "CareGrid",
    accentPart: "Grid",
    industry: "Healthcare",
    headline: "Connected healthcare for better outcomes.",
    description:
      "Patient portals, provider tools, appointments, secure communication, and operational insights.",
    icon: HeartPulse,
    image: careGridImg,
    imageAlt: "CareGrid healthcare platform preview",
    badge: "Better Care, Healthier Lives",
    accent: {
      text: "text-teal-600",
      bg: "bg-teal-50",
      ring: "ring-teal-100",
      gradient: "from-teal-400/20 to-emerald-300/10",
      glow: "bg-teal-400/10",
      solid: "bg-teal-600",
    },
    href: "/products/caregrid",
  },
  {
    id: 2,
    name: "RetailGrid",
    accentPart: "Grid",
    industry: "Retail & Commerce",
    headline: "Smarter retail experiences.",
    description:
      "Inventory tools, loyalty programs, analytics, and seamless omnichannel integrations.",
    icon: ShoppingCart,
    image: retailGridImg,
    imageAlt: "RetailGrid commerce platform preview",
    badge: "Customers Come First",
    accent: {
      text: "text-orange-600",
      bg: "bg-orange-50",
      ring: "ring-orange-100",
      gradient: "from-orange-400/20 to-rose-300/10",
      glow: "bg-orange-400/10",
      solid: "bg-orange-500",
    },
    href: "/products/retailgrid",
  },
  {
    id: 3,
    name: "FleetGrid",
    accentPart: "Grid",
    industry: "Logistics & Transportation",
    headline: "Keep your world moving.",
    description:
      "Fleet tools, real-time tracking, ETA monitoring, dispatch workflows, and operational insights.",
    icon: Truck,
    image: fleetGridImg,
    imageAlt: "FleetGrid logistics platform preview",
    badge: "On Time, Every Time",
    accent: {
      text: "text-blue-600",
      bg: "bg-blue-50",
      ring: "ring-blue-100",
      gradient: "from-blue-400/20 to-sky-300/10",
      glow: "bg-blue-400/10",
      solid: "bg-blue-600",
    },
    href: "/products/fleetgrid",
  },
  {
    id: 4,
    name: "LearnGrid",
    accentPart: "Grid",
    industry: "Education & EdTech",
    headline: "Empowering brighter futures.",
    description:
      "Learning platforms, content workflows, student analytics, and engaging mobile experiences.",
    icon: GraduationCap,
    image: learnGridImg,
    imageAlt: "LearnGrid education platform preview",
    badge: "Learn Today, Lead Tomorrow",
    accent: {
      text: "text-purple-600",
      bg: "bg-purple-50",
      ring: "ring-purple-100",
      gradient: "from-purple-400/20 to-violet-300/10",
      glow: "bg-purple-400/10",
      solid: "bg-purple-600",
    },
    href: "/products/learngrid",
  },
  {
    id: 5,
    name: "PropertyGrid",
    accentPart: "Grid",
    industry: "Real Estate & Property",
    headline: "Building opportunities together.",
    description:
      "Listings, lead capture, property management workflows, and customer dashboards.",
    icon: House,
    image: propertyGridImg,
    imageAlt: "PropertyGrid real estate platform preview",
    badge: "Properties, People, Possibilities",
    accent: {
      text: "text-amber-600",
      bg: "bg-amber-50",
      ring: "ring-amber-100",
      gradient: "from-amber-400/20 to-yellow-300/10",
      glow: "bg-amber-400/10",
      solid: "bg-amber-500",
    },
    href: "/products/propertygrid",
  },
  {
    id: 6,
    name: "ControlGrid",
    accentPart: "Grid",
    industry: "Compliance & Regulated Operations",
    headline: "Secure digital workflows.",
    description:
      "Automation, approvals, audit trails, and reporting for regulated industries.",
    icon: ShieldCheck,
    image: controlGridImg,
    imageAlt: "ControlGrid compliance platform preview",
    badge: "Compliance Built In",
    accent: {
      text: "text-cyan-600",
      bg: "bg-cyan-50",
      ring: "ring-cyan-100",
      gradient: "from-cyan-400/20 to-teal-300/10",
      glow: "bg-cyan-400/10",
      solid: "bg-cyan-600",
    },
    href: "/products/controlgrid",
  },
];

/* ------------------------------------------------------------------ */
/*  Hook — viewport entrance observer                                  */
/* ------------------------------------------------------------------ */

function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.12 },
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}

/* ------------------------------------------------------------------ */
/*  Product card                                                       */
/* ------------------------------------------------------------------ */

function ProductCard({
  product,
  index,
  inView,
}: {
  product: Product;
  index: number;
  inView: boolean;
}) {
  const {
    name,
    accentPart,
    industry,
    headline,
    description,
    icon: Icon,
    image,
    badge,
    accent,
    href,
  } = product;

  const [prefix] = name.split(accentPart);

  return (
    <article
      className={`group relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-15px_rgba(15,23,42,0.22)] sm:min-h-[400px] sm:p-7 ${
        inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
      style={{ transitionDelay: inView ? `${index * 80}ms` : "0ms" }}
    >
      {/* ---------- Full-bleed background image ---------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-white/85" />

        <div
          className={`absolute inset-0 bg-linear-to-br ${accent.gradient} opacity-40`}
        />

        <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-white via-white/70 to-transparent" />
      </div>

      {/* ---------- Content ---------- */}
      <div className="relative flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.08]">
  <Icon className={`h-7 w-7 ${accent.text}`} strokeWidth={1.8} aria-hidden="true" />
</div>

        <div className="min-w-0 pt-0.5">
          <h3 className="text-lg font-bold leading-tight tracking-tight text-slate-900">
            {prefix}
            <span className={accent.text}>{accentPart}</span>
          </h3>
          <p className="mt-0.5 text-xs font-medium text-slate-500">{industry}</p>
        </div>
      </div>

      <p className="relative mt-5 text-base font-bold leading-snug text-slate-900">
        {headline}
      </p>

      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {description}
      </p>

      {/* ---------- Footer: Learn More + badge ---------- */}
      <div className="relative mt-6 flex items-end justify-between gap-3">
        <a
          href={href}
          className={`inline-flex items-center gap-1.5 rounded text-sm font-semibold ${accent.text} transition-colors duration-300 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2`}
        >
          Learn More
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a>

        <span
          className={`inline-flex max-w-[65%] items-center gap-1.5 rounded-full ${accent.solid} px-3 py-1.5 text-[11px] font-semibold text-white shadow-md`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white/90" aria-hidden="true" />
          {badge}
        </span>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Statistics row                                                     */
/* ------------------------------------------------------------------ */

function StatsRow({ inView }: { inView: boolean }) {
  const stats = [
    { value: "6", label: "Industry Solutions", icon: Building2 },
    { value: "100+", label: "Happy Clients", icon: Users },
    { value: "Scalable", label: "For Your Growth", icon: Settings2 },
    { value: "Trusted", label: "Across Industries", icon: BadgeCheck },
  ];

  return (
    <div
      className={`mt-16 grid grid-cols-2 gap-6 border-t border-slate-200/70 pt-10 transition-all duration-700 ease-out sm:grid-cols-4 sm:gap-8 ${
        inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
      style={{ transitionDelay: inView ? "600ms" : "0ms" }}
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 ring-1 ring-blue-100">
              <Icon className="h-4 w-4 text-blue-600" strokeWidth={1.8} aria-hidden="true" />
            </div>
            <p className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {stat.value}
            </p>
            <p className="mt-0.5 text-xs font-medium uppercase tracking-widest text-slate-400">
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function Product() {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.08 });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="software-products-heading"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      {/* ---------- Background layer ---------- */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${productsBg})` }}
        />
        <div className="absolute inset-0 bg-white/70" />
        <div className="absolute inset-0 bg-linear-to-b from-white/60 via-white/40 to-white/70" />

        <div className="absolute -left-40 top-0 h-125 w-125 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -right-40 top-40 h-105 w-105 rounded-full bg-sky-300/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-95 w-95 rounded-full bg-indigo-300/8 blur-3xl" />
      </div>

      {/* ---------- Content ---------- */}
      <div className="relative mx-auto max-w-[80rem] px-5 sm:px-8 lg:px-12">
        <header
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-out ${
            inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100/80 bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600 shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden="true" />
            Our Software Products
          </span>

          <h2
            id="software-products-heading"
            className="mt-6 text-balance text-4xl font-bold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl"
          >
            One Technology Partner.
            <br />
            <span className="bg-linear-to-r from-blue-600 via-blue-500 to-sky-400 bg-clip-text text-transparent">
              Six Powerful Solutions.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-500 sm:text-lg">
            Purpose-built software for the industries that keep the world moving.
            Scalable, secure, and designed for real impact.
          </p>
        </header>

        {/* 👇 Medium-sized cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        <StatsRow inView={inView} />
      </div>
    </section>
  );
}