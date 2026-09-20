import React, { useEffect, useRef, useState } from 'react';
import {
  BrainCircuit,
  DatabaseZap,
  HeartPulse,
  Globe2,
  Smartphone,
  CloudCog,
  Sparkles,
  Target,
  Users,
  TrendingUp,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  🔽 Import your promo background image here                         */
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
  /** NEW: extra context paragraph that fills the lower area of the card */
  context: string;
  icon: React.ReactNode;
  iconBg?: string;
  hoverIconColor: string;
};

type ProofIndicator = {
  label: string;
  icon: React.ReactNode;
};

/* ------------------------------------------------------------------ */
/*  Data — each service now has a real context paragraph               */
/* ------------------------------------------------------------------ */

const services: Service[] = [
  {
    title: 'Artificial Intelligence & Machine Learning',
    description:
      'Custom AI/ML models, predictive analytics, and intelligent automation.',
    context:
      'We design, train, and deploy models that turn your raw data into decisions — from recommendation engines to vision-based quality checks — fully integrated with your existing systems.',
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
    context:
      'From ingestion to insight, we build reliable pipelines and modern warehouses so your teams always work with clean, timely, and trustworthy data at any scale.',
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
    context:
      'We deliver compliant, patient-first digital health products that improve clinical workflows, expand access, and support better outcomes across the care journey.',
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
    context:
      'We craft fast, secure, and accessible web applications — from customer-facing portals to internal tools — engineered to scale with your business.',
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
    context:
      'We build intuitive mobile products that feel at home on every device — with smooth performance, offline support, and experiences your users keep coming back to.',
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
    context:
      'We automate how you build, test, and ship — with secure cloud infrastructure, containerized workloads, and pipelines that let your team release with confidence.',
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
/*  Subtle technical grid                                              */
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

const SoftGlow: React.FC = () => (null);

/* ------------------------------------------------------------------ */
/*  PromoPanel — slides in from the LEFT                               */
/* ------------------------------------------------------------------ */

const PromoPanel: React.FC = () => {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <aside
      ref={ref}
      className={`relative flex w-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a1a35] via-[#0f2847] to-[#1a4a7a] transition-all duration-1000 ease-out will-change-transform sm:rounded-3xl lg:h-auto lg:w-[30%] lg:shrink-0 ${
        inView ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
      }`}
      aria-labelledby="promo-heading"
    >
      <img
        src={promoImage}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0a1a35]/85 via-[#0f2847]/75 to-[#1a4a7a]/70"
        aria-hidden="false"
      />

      <TechnicalGrid />
      <SoftGlow />

      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-10 lg:px-8 lg:py-14">
        <div className="flex flex-col">
          <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.08] ring-1 ring-white/10 backdrop-blur-sm">
            <Sparkles
              className="h-5 w-5 text-cyan-300"
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </div>

          <h2
            id="promo-heading"
            className="mb-5 text-[1.3rem] font-bold leading-[1.2] tracking-tight text-white sm:text-xl lg:text-[1.45rem] xl:text-[1.55rem]"
          >
            Technology Guided by Industry Knowledge
          </h2>

          <p className="max-w-[22rem] text-[13px] leading-relaxed text-blue-100/80">
            We bring together deep industry experience and modern technology to
            solve complex business challenges and create lasting value.
          </p>
        </div>

        <div className="mt-12">
          <p
            className="mb-6 text-right font-serif text-[11.5px] italic leading-snug text-cyan-200/60"
            aria-hidden="true"
          >
            Smarter Solutions
            <br />
            Brighter Tomorrow
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/15 pt-5">
            {proofIndicators.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                {item.icon}
                <span className="text-[11.5px] font-medium tracking-wide text-white/80">
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
/*  ServiceItem — icon + title + description + context paragraph       */
/* ------------------------------------------------------------------ */

interface ServiceItemProps {
  service: Service;
  index: number;
  start: boolean;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service, index, start }) => (
  <li
    className={`group relative flex flex-col gap-4 rounded-xl border border-slate-100 bg-white p-4 ease-out hover:-translate-y-1 hover:border-slate-200 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] lg:min-h-[200px] lg:p-5 ${
      start ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
    }`}
    style={{
      transitionProperty: 'transform, opacity, box-shadow, border-color',
      transitionDuration: `${ITEM_DURATION}ms`,
      transitionDelay: start ? `${index * STAGGER_MS}ms` : '0ms',
      transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    }}
  >
    {/* Top: icon + title + short description */}
    <div className="flex items-start gap-3">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        {service.icon}
      </div>

      <div className="min-w-0">
        <h3 className="text-[14px] font-bold leading-snug text-slate-800 transition-colors duration-300 group-hover:text-blue-600">
          {service.title}
        </h3>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-400">
          {service.description}
        </p>
      </div>
    </div>

    {/* Bottom: real context paragraph that fills the empty space */}
    <p className="border-t border-slate-100 pt-3 text-[12px] leading-relaxed text-slate-500">
      {service.context}
    </p>
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
      className="w-full overflow-hidden bg-slate-50/80 px-3 py-16 sm:px-4 sm:py-24 lg:px-6 lg:py-32"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto flex w-full flex-col gap-4 rounded-2xl border border-slate-200/60 bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.04)] sm:rounded-3xl sm:p-4 lg:min-h-[640px] lg:flex-row lg:gap-0 lg:p-6">
        <PromoPanel />

        <div
          ref={rightPanelRef}
          className="flex flex-col px-2 py-4 sm:px-4 lg:w-[70%] lg:px-8 lg:py-6"
        >
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
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

          <hr className="mb-6 border-slate-100" />

          <ul
            className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
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