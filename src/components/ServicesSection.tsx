import React, { useEffect, useRef, useState } from 'react';
import {
  BrainCircuit,
  DatabaseZap,
  HeartPulse,
  Globe2,
  Smartphone,
  CloudCog,
  ArrowRight,
  Sparkles,
  Target,
  Users,
  TrendingUp,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  🔽 Import your promo background image here                         */
/*  Replace the path below with your actual image location.            */
/*  Works with JPG, PNG, WEBP, AVIF, etc. (handled by your bundler)    */
/* ------------------------------------------------------------------ */

import promoImage from '../assets/Our_servie.png';

/* ------------------------------------------------------------------ */
/*  useInView hook                                                     */
/* ------------------------------------------------------------------ */

function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Service = {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg?: string;
  hoverIconColor: string;
};

type ProofIndicator = {
  label: string;
  icon: React.ReactNode;
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const services: Service[] = [
  {
    title: 'Artificial Intelligence & Machine Learning',
    description:
      'Custom AI/ML models, predictive analytics, and intelligent automation.',
    icon: (
      <BrainCircuit
        className="h-[22px] w-[22px] text-blue-600 transition-transform duration-300 ease-out group-hover:scale-[1.08] group-hover:rotate-[2deg]"
        strokeWidth={1.7}
        aria-hidden="true"
      />
    ),
    
    hoverIconColor: 'group-hover:text-blue-700',
  },
  {
    title: 'Data Engineering & Cloud Platforms',
    description:
      'ETL pipelines, data warehousing, and cloud deployment solutions.',
    icon: (
      <DatabaseZap
        className="h-[22px] w-[22px] text-cyan-600 transition-transform duration-300 ease-out group-hover:scale-[1.08] group-hover:rotate-[2deg]"
        strokeWidth={1.7}
        aria-hidden="true"
      />
    ),
    iconBg:
      'bg-gradient-to-br from-cyan-50 to-cyan-100/50 border border-cyan-100/60',
    hoverIconColor: 'group-hover:text-cyan-700',
  },
  {
    title: 'Healthcare Technology Solutions',
    description:
      'Telemedicine platforms, patient management, and AI diagnostic systems.',
    icon: (
      <HeartPulse
        className="h-[22px] w-[22px] text-rose-500 transition-transform duration-300 ease-out group-hover:scale-[1.08] group-hover:rotate-[2deg]"
        strokeWidth={1.7}
        aria-hidden="true"
      />
    ),
    iconBg:
      'bg-gradient-to-br from-rose-50 to-rose-100/50 border border-rose-100/60',
    hoverIconColor: 'group-hover:text-rose-600',
  },
  {
    title: 'Web Application Development',
    description:
      'Full-stack development with modern technologies and scalable architecture.',
    icon: (
      <Globe2
        className="h-[22px] w-[22px] text-emerald-600 transition-transform duration-300 ease-out group-hover:scale-[1.08] group-hover:rotate-[2deg]"
        strokeWidth={1.7}
        aria-hidden="true"
      />
    ),
    iconBg:
      'bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-100/60',
    hoverIconColor: 'group-hover:text-emerald-700',
  },
  {
    title: 'Mobile Application Development',
    description: 'Native iOS & Android apps with seamless user experiences.',
    icon: (
      <Smartphone
        className="h-[22px] w-[22px] text-sky-600 transition-transform duration-300 ease-out group-hover:scale-[1.08] group-hover:rotate-[2deg]"
        strokeWidth={1.7}
        aria-hidden="true"
      />
    ),
    iconBg:
      'bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-100/60',
    hoverIconColor: 'group-hover:text-sky-700',
  },
  {
    title: 'Cloud & DevOps',
    description:
      'CI/CD pipelines, containerization, and infrastructure management.',
    icon: (
      <CloudCog
        className="h-[22px] w-[22px] text-indigo-500 transition-transform duration-300 ease-out group-hover:scale-[1.08] group-hover:rotate-[2deg]"
        strokeWidth={1.7}
        aria-hidden="true"
      />
    ),
    iconBg:
      'bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-100/60',
    hoverIconColor: 'group-hover:text-indigo-600',
  },
];

const proofIndicators: ProofIndicator[] = [
  {
    label: 'Domain Expertise',
    icon: <Target className="h-4 w-4 text-cyan-300/80" strokeWidth={1.7} aria-hidden="true" />,
  },
  {
    label: 'Client Focused',
    icon: <Users className="h-4 w-4 text-cyan-300/80" strokeWidth={1.7} aria-hidden="true" />,
  },
  {
    label: 'Real Impact',
    icon: <TrendingUp className="h-4 w-4 text-cyan-300/80" strokeWidth={1.7} aria-hidden="true" />,
  },
];

/* ------------------------------------------------------------------ */
/*  Animation timing                                                   */
/* ------------------------------------------------------------------ */

const STAGGER_MS = 400;
const ITEM_DURATION = 800;

/* ------------------------------------------------------------------ */
/*  Subtle technical grid — reduced opacity, larger cells              */
/* ------------------------------------------------------------------ */

const TechnicalGrid: React.FC = () => (
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.035]"
    aria-hidden="true"
    style={{
      backgroundImage:
        'linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)',
      backgroundSize: '48px 48px',
    }}
  />
);

/* ------------------------------------------------------------------ */
/*  Soft glow orbs — very subtle depth, no busy network lines          */
/* ------------------------------------------------------------------ */

const SoftGlow: React.FC = () => ( null
);

/* ------------------------------------------------------------------ */
/*  PromoPanel — slides in from the LEFT                               */
/*                                                                     */
/*  Background now uses an imported image via <img>. The original      */
/*  gradient is kept as a fallback and a dark overlay sits on top      */
/*  so the white text stays readable over any photo.                   */
/* ------------------------------------------------------------------ */

const PromoPanel: React.FC = () => {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <aside
      ref={ref}
      className={`relative flex w-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a1a35] via-[#0f2847] to-[#1a4a7a] transition-all duration-1000 ease-out will-change-transform sm:rounded-3xl lg:w-[30%] lg:shrink-0 ${
        inView ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
      }`}
      aria-labelledby="promo-heading"
    >
      {/* ---------------------------------------------------------- */}
      {/*  Background image layer (imported asset)                    */}
      {/* ---------------------------------------------------------- */}
      <img
  src={promoImage}
  alt=""
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
  loading="lazy"
  decoding="async"
/>

      {/* ---------------------------------------------------------- */}
      {/*  Dark overlay so white text remains legible over the image  */}
      {/*  Tune the opacity values below to taste.                    */}
      {/* ---------------------------------------------------------- */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0a1a35]/85 via-[#0f2847]/75 to-[#1a4a7a]/70"
        aria-hidden="false"
      />

      {/* Very subtle technical grid */}
      <TechnicalGrid />

      <SoftGlow />

      {/* Content wrapper */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-8 lg:px-8 lg:py-10">
        {/* Top block */}
        <div className="flex flex-col">
          {/* Icon badge */}
          <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.08] ring-1 ring-white/10 backdrop-blur-sm">
            <Sparkles
              className="h-5 w-5 text-cyan-300"
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </div>

          {/* Heading */}
          <h2
            id="promo-heading"
            className="mb-4 text-[1.2rem] font-bold leading-[1.2] tracking-tight text-white sm:text-xl lg:text-[1.3rem] xl:text-[1.4rem]"
          >
            Technology Guided by Industry Knowledge
          </h2>

          {/* Body */}
          <p className="max-w-[22rem] text-[12.5px] leading-relaxed text-blue-100/80">
            We bring together deep industry experience and modern technology to
            solve complex business challenges and create lasting value.
          </p>
        </div>

        {/* Bottom block */}
        <div className="mt-10">
          {/* Handwritten decorative line */}
          <p
            className="mb-5 text-right font-serif text-[11px] italic leading-snug text-cyan-200/60"
            aria-hidden="true"
          >
            Smarter Solutions
            <br />
            Brighter Tomorrow
          </p>

          {/* Proof indicators */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/15 pt-4">
            {proofIndicators.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                {item.icon}
                <span className="text-[11px] font-medium tracking-wide text-white/80">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

/* ------------------------------------------------------------------ */
/*  ServiceItem — slides in from the RIGHT, slow staggered reveal      */
/*  Icon sits inline (left of title/description) instead of above      */
/* ------------------------------------------------------------------ */

interface ServiceItemProps {
  service: Service;
  index: number;
  start: boolean;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service, index, start }) => (
  <li
    className={`group relative flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-3.5 ease-out hover:-translate-y-1 hover:border-slate-200 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] ${
      start ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
    }`}
    style={{
      transitionProperty: 'transform, opacity, box-shadow, border-color',
      transitionDuration: `${ITEM_DURATION}ms`,
      transitionDelay: start ? `${index * STAGGER_MS}ms` : '0ms',
      transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    }}
  >
    {/* Icon — left of the text, vertically centered with title row */}
    <div
  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-105"
  aria-hidden="true"
>
  {service.icon}
</div>

    <div className="min-w-0">
      <h3 className="text-[13px] font-bold leading-snug text-slate-800 transition-colors duration-300 group-hover:text-blue-600">
        {service.title}
      </h3>
      <p className="mt-1 text-xs leading-relaxed text-slate-400">
        {service.description}
      </p>
    </div>
  </li>
);

/* ------------------------------------------------------------------ */
/*  ServicesSection                                                    */
/* ------------------------------------------------------------------ */

const ServicesSection: React.FC = () => {
  const { ref: rightPanelRef, inView: panelInView } =
    useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      className="overflow-hidden bg-slate-50/80 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto flex max-w-[75rem] flex-col gap-4 rounded-2xl border border-slate-200/60 bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.04)] sm:rounded-3xl sm:p-4 lg:flex-row lg:gap-0 lg:p-4">
        <PromoPanel />

        <div
          ref={rightPanelRef}
          className="flex flex-col px-2 py-4 sm:px-4 lg:w-[70%] lg:px-6 lg:py-5"
        >
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p
                id="services-heading"
                className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-500/70"
              >
                From Insight to Execution
              </p>
              <h2 className="mt-1.5 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                Our Core Technology Expertise
              </h2>
            </div>
          </div>

          <hr className="mb-4 border-slate-100" />

          <ul
            className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
          >
            {services.map((service, i) => (
              <ServiceItem
                key={service.title}
                service={service}
                index={i}
                start={panelInView}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;