import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Page {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  checklist: string[];
}

/* ---------- Icons ---------- */
const DiscoverIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
    <path
      d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.47V16h8v-2.53A6 6 0 0 0 12 3z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="13.5" cy="8.5" r="2.5" fill="#F97316" />
  </svg>
);

const DesignIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
    <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="18" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7.5 7.5L11 16M16.5 7.5L13 16M8 6h8" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="18" r="1.2" fill="#F97316" />
  </svg>
);

const BuildIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
    <path d="M14 6l4 4-9 9H5v-4l9-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M13 7l4 4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="7" cy="7" r="2" fill="#F97316" />
  </svg>
);

const ValidateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
    <rect x="3" y="5" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="18" cy="7" r="3" fill="#F97316" />
  </svg>
);

const LaunchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
    <path
      d="M5 15l-1 4 4-1M14 4c4 0 6 2 6 6 0 4-4 8-8 10-2-1-4-3-5-5 2-4 6-8 7-11z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="14" cy="10" r="2" fill="#F97316" />
  </svg>
);

const ScaleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
    <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="16" cy="8" r="2" fill="#F97316" />
  </svg>
);

/* ---------- Data ---------- */
const pages: Page[] = [
  {
    id: 1,
    number: '01',
    title: 'Discover',
    subtitle: 'Align technology with your business goals.',
    description:
      'Every engagement starts with understanding your business objectives, users, technical challenges, and product vision. Together, we define a roadmap that minimizes uncertainty and creates a clear path to successful delivery.',
    icon: <DiscoverIcon />,
    checklist: [
      'Business discovery workshops',
      'Requirement analysis',
      'Architecture planning',
      'Product vision alignment',
      'Technical feasibility assessment',
      'Delivery roadmap',
    ],
  },
  {
    id: 2,
    number: '02',
    title: 'Design',
    subtitle: 'Create intuitive experiences and scalable architecture.',
    description:
      'Our designers and solution architects collaborate to create user-centric experiences and a technical foundation that supports long-term growth, security, and maintainability.',
    icon: <DesignIcon />,
    checklist: [
      'User experience research',
      'UI design',
      'Database design',
      'Wireframes and prototypes',
      'Solution architecture',
      'API planning',
    ],
  },
  {
    id: 3,
    number: '03',
    title: 'Build',
    subtitle: 'Develop with agility, precision, and quality.',
    description:
      'Our engineering teams build in iterative sprints, delivering working software quickly while maintaining high standards for code quality, security, and performance.',
    icon: <BuildIcon />,
    checklist: [
      'Agile sprint planning',
      'Frontend development',
      'Backend development',
      'Code reviews',
      'CI/CD pipeline setup',
      'DevOps integration',
    ],
  },
  {
    id: 4,
    number: '04',
    title: 'Validate',
    subtitle: 'Build quality into every release.',
    description:
      'Quality engineering is integrated throughout development—not left until the end. Automated testing, peer reviews, and security audits ensure reliable, production-ready software at every milestone.',
    icon: <ValidateIcon />,
    checklist: [
      'Automated testing',
      'Performance testing',
      'Functional testing',
      'Security testing',
      'User acceptance testing',
      'Regression testing',
    ],
  },
  {
    id: 5,
    number: '05',
    title: 'Launch',
    subtitle: 'Deliver with confidence and zero downtime.',
    description:
      'We coordinate every aspect of the release—from infrastructure provisioning and deployment automation to monitoring, rollback plans, and stakeholder communication.',
    icon: <LaunchIcon />,
    checklist: [
      'Deployment planning',
      'Infrastructure setup',
      'Monitoring & alerts',
      'Rollback strategy',
      'Stakeholder communication',
      'Post-launch support',
    ],
  },
  {
    id: 6,
    number: '06',
    title: 'Scale',
    subtitle: 'Grow your product with confidence.',
    description:
      'We help you evolve your product continuously—optimizing performance, expanding capabilities, and adapting infrastructure to meet growing demand without compromising reliability.',
    icon: <ScaleIcon />,
    checklist: [
      'Performance optimization',
      'Feature expansion',
      'Infrastructure scaling',
      'Analytics & insights',
      'Continuous improvement',
      'Long-term support',
    ],
  },
];

const highlights = [
  'Strategic Product Discovery aligned to Business Objectives',
  'Modern Engineering Practices reducing Technical Debt Risk',
  'Agile Delivery Cycles accelerating Launch without Compromise',
  'Continuous Support that Keeps your Product Scaling Post-launch',
];

/* ---------- Constants ---------- */
const TAB_BAR_HEIGHT = 70;
const CARD_STICKY_BASE = 70;
const CARD_STICKY_STEP = 4;

/**
 * Scroll runway between cards (drives the ride-over animation).
 * Also used as the SMALL trailing runway after the LAST card — just
 * enough for it to fully slide up over the previous card, then the
 * page ends. No more huge empty space at the bottom.
 */
const CARD_SPACER = '60vh';
const CARD_TRAILING = '20vh';

const EngineeringFramework: React.FC = () => {
  const [activeId, setActiveId] = useState(1);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  /**
   * The active card is the LAST card whose top edge has reached (or
   * passed) its sticky threshold. Because cards stack with increasing
   * z-index, the highest-index pinned card is always the one visually
   * on top.
   */
  const recalcActive = useCallback(() => {
    let bestId = pages[0].id;

    containerRefs.current.forEach((el, index) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const stickyTop = CARD_STICKY_BASE + index * CARD_STICKY_STEP;
      if (rect.top <= stickyTop + 8) {
        bestId = index + 1;
      }
    });

    setActiveId(bestId);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      () => recalcActive(),
      {
        rootMargin: `-${CARD_STICKY_BASE}px 0px -40% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    containerRefs.current.forEach((ref) => ref && observer.observe(ref));

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        recalcActive();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    recalcActive();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [recalcActive]);

  /**
   * Scroll to a card so its top lands exactly at (its) sticky threshold.
   *
   * Why this works for every card including the last:
   *  - For cards 01–05, we compute the absolute Y where the card's top
   *    would sit at `stickyTop`. Scrolling there activates that step.
   *  - For the last card, there isn't enough content below to reach the
   *    exact position — so we clamp to `documentHeight - viewportHeight`,
   *    which is the closest the browser can get. The trailing spacer is
   *    sized so this clamped position is still enough to trigger pinning
   *    on the last card.
   *  - We also clamp to 0 so we never scroll negatively.
   */
  const scrollTo = (index: number) => {
    const el = containerRefs.current[index];
    if (!el) return;

    const stickyTop = CARD_STICKY_BASE + index * CARD_STICKY_STEP;
    const absoluteTop = el.getBoundingClientRect().top + window.scrollY;
    const target = absoluteTop - stickyTop + 1;

    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const clamped = Math.max(0, Math.min(target, maxScroll));

    window.scrollTo({ top: clamped, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      {/* ===== HERO / INTRO ===== */}
      <section className="max-w-5xl mx-auto px-4 pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-blue-500" />
          <span className="text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase">
            Our FrameworkHow We Build Exceptional Products
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-800 leading-tight tracking-tight mb-6 max-w-3xl">
          How We  <span className="text-blue-600">Build Exceptional Products</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mb-10">
          We transform ambitious visions into scalable products through
          disciplined engineering, strategic product thinking, and agile
          execution, minimizing technical risk while accelerating
          time-to-market, so your business scales confidently with software
          built to last.
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl">
          {highlights.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 text-blue-500 mt-0.5" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-slate-700 text-[15px] leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ===== STICKY TAB BAR ===== */}
      <div className="sticky top-0 z-50 bg-slate-100 pt-4" style={{ height: TAB_BAR_HEIGHT }}>
        <div className="max-w-5xl mx-auto px-4 flex gap-1">
          {pages.map((page, i) => {
            const isCurrent = page.id === activeId;
            const isPassed = page.id < activeId;

            return (
              <button
                key={page.id}
                onClick={() => scrollTo(i)}
                tabIndex={0}
                aria-label={`Go to step ${page.number}: ${page.title}`}
                className={`relative flex-1 max-w-[140px] py-3 text-center text-base font-bold rounded-t-xl transition-all duration-300 cursor-pointer ${
                  isCurrent
                    ? 'bg-white text-blue-600 shadow-sm'
                    : isPassed
                    ? 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                    : 'bg-slate-200 text-slate-400 hover:bg-slate-300'
                }`}
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
                }}
              >
                <span
                  className={`inline-block transition-opacity duration-200 ${
                    page.id <= activeId ? 'opacity-100' : 'opacity-60'
                  }`}
                >
                  {page.number}
                </span>
              </button>
            );
          })}
          <div className="flex-1" />
        </div>
      </div>

      {/* ===== STACKED CARDS ===== */}
      <div className="max-w-5xl mx-auto px-4 -mt-1">
        {pages.map((page, index) => {
          const isActive = activeId === page.id;
          const isLast = index === pages.length - 1;
          const stickyTop = CARD_STICKY_BASE + index * CARD_STICKY_STEP;

          return (
            <div
              key={page.id}
              data-id={page.id}
              ref={(el) => {
                containerRefs.current[index] = el;
              }}
              className="sticky"
              style={{
                top: `${stickyTop}px`,
                zIndex: index + 1,
              }}
            >
              <div
                className={`bg-white rounded-2xl border border-slate-200 transition-all duration-300 ${
                  isActive ? 'shadow-xl' : 'shadow-sm opacity-95'
                }`}
              >
                <div className="p-8 sm:p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-slate-700">{page.icon}</div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                      {page.title}
                    </h2>
                  </div>

                  <p className="text-slate-600 text-base mb-5">{page.subtitle}</p>

                  <p className="text-slate-700 leading-relaxed mb-8">{page.description}</p>

                  <div className="h-px bg-blue-500 mb-6" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    {page.checklist.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 text-blue-500" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-slate-700 text-[15px]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Full spacer between cards, tiny spacer after the last one. */}
              <div
                style={{ height: isLast ? CARD_TRAILING : CARD_SPACER }}
                aria-hidden
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EngineeringFramework;