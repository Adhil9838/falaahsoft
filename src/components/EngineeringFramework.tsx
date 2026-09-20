import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Page {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  checklist: string[];
  /**
   * Path to this step's image. Drop your own file into /public/images
   * (or wherever your build serves static assets from) using this exact
   * name, or just change the string to point wherever you like.
   */
  image: string;
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
    image: '/images/01-discover.jpg',
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
    image: '/images/02-design.jpg',
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
    image: '/images/03-build.jpg',
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
    image: '/images/04-validate.jpg',
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
    image: '/images/05-launch.jpg',
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
    image: '/images/06-scale.jpg',
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
const IMAGE_STICKY_TOP = TAB_BAR_HEIGHT + 24;
/** Shared fixed height (desktop only) so the card and the image panel always match in size. */
const PANEL_HEIGHT = 640;

/**
 * Scroll runway between cards (drives the ride-over animation).
 * Also used as the SMALL trailing runway after the LAST card — just
 * enough for it to fully slide up over the previous card, then the
 * page ends. No more huge empty space at the bottom.
 */
const CARD_SPACER = '60vh';
const CARD_TRAILING = '20vh';

/** Simple placeholder shown until a real image file exists at page.image */
const ImagePlaceholder: React.FC<{ page: Page }> = ({ page }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-slate-300 p-6 text-center">
    <div className="text-blue-400">{page.icon}</div>
    <span className="text-sm font-semibold text-white">{page.title}</span>
    <span className="text-[11px] text-slate-400 break-all">
      Add image at: <code className="text-orange-300">{page.image}</code>
    </span>
  </div>
);

/** One face of the flipping image card (front or back). */
const ImageFace: React.FC<{
  page: Page;
  faceStyle: React.CSSProperties;
}> = ({ page, faceStyle }) => {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl border border-slate-200"
      style={faceStyle}
    >
      {errored ? (
        <ImagePlaceholder page={page} />
      ) : (
        <img
          src={page.image}
          alt={page.title}
          onError={() => setErrored(true)}
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
        <span className="text-white/70 text-xs font-semibold tracking-widest">
          {page.number}
        </span>
        <h3 className="text-white text-xl font-bold">{page.title}</h3>
      </div>
    </div>
  );
};

const EngineeringFramework: React.FC = () => {
  const [activeId, setActiveId] = useState(1);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardFaceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageFlipRef = useRef<HTMLDivElement | null>(null);

  // Which two steps are currently front/back on the image flip card.
  const [imagePairIndex, setImagePairIndex] = useState(0); // 0-based index of the "front" step

  /**
   * The active card is the LAST card whose top edge has reached (or
   * passed) its sticky threshold. Because cards stack with increasing
   * z-index, the highest-index pinned card is always the one visually
   * on top.
   *
   * While computing that, we also derive a continuous 0→1 "flip
   * progress" for each card: how far the NEXT card has climbed up
   * from the bottom of the viewport toward covering this one. That
   * value drives a 180° rotateX flip on the card (bottom edge tucking
   * away, top to bottom) and, for the currently active step, a synced
   * 180° rotateY flip on the image panel on the right.
   */
  const recalcActive = useCallback(() => {
    const vh = window.innerHeight || 1;
    let bestId = pages[0].id;

    containerRefs.current.forEach((el, index) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const stickyTop = CARD_STICKY_BASE + index * CARD_STICKY_STEP;
      if (rect.top <= stickyTop + 8) {
        bestId = index + 1;
      }
    });

    setActiveId((prev) => (prev === bestId ? prev : bestId));

    const nextPairIndex = bestId - 1;
    setImagePairIndex((prev) => (prev === nextPairIndex ? prev : nextPairIndex));

    let activeCardProgress = 0;

    containerRefs.current.forEach((el, index) => {
      const face = cardFaceRefs.current[index];
      if (!el || !face) return;

      const isLast = index === containerRefs.current.length - 1;
      const nextEl = containerRefs.current[index + 1];

      let progress = 0;
      if (!isLast && nextEl) {
        const nextTop = nextEl.getBoundingClientRect().top;
        progress = 1 - Math.min(1, Math.max(0, nextTop / vh));
        progress = Math.min(1, Math.max(0, progress));
      }

      face.style.transform = `rotateX(-${progress * 180}deg)`;

      if (index === nextPairIndex) {
        activeCardProgress = progress;
      }
    });

    if (imageFlipRef.current) {
      imageFlipRef.current.style.transform = `rotateY(${activeCardProgress * 180}deg)`;
    }
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

  const frontPage = pages[imagePairIndex] ?? pages[0];
  const backPage = pages[imagePairIndex + 1] ?? frontPage;

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      {/* ===== HERO / INTRO ===== */}
      <style>{`
        @keyframes feFadeInUp {
          from { opacity: 0; transform: translateY(26px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes feLineGrow {
          from { width: 0; opacity: 0; }
          to { width: 2rem; opacity: 1; }
        }
        @keyframes feGradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .fe-fade-up {
          opacity: 0;
          animation: feFadeInUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .fe-eyebrow-line {
          width: 0;
          animation: feLineGrow 0.6s ease-out 0.1s forwards;
        }
        .fe-gradient-text {
          background: linear-gradient(90deg, #2563eb, #7c3aed, #0ea5e9, #2563eb);
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: feGradientShift 6s ease-in-out infinite;
        }
      `}</style>

      <section className="w-full px-6 lg:px-12 pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="flex items-center gap-3 mb-4 fe-fade-up" style={{ animationDelay: '0ms' }}>
          <span className="h-px bg-blue-500 fe-eyebrow-line" />
          <span className="text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase">
            Our Framework · How We Build Exceptional Products
          </span>
        </div>

        <h1
          className="text-3xl sm:text-5xl font-extrabold text-slate-800 leading-tight tracking-tight mb-6 max-w-3xl fe-fade-up"
          style={{ animationDelay: '140ms' }}
        >
          How We <span className="fe-gradient-text">Build Exceptional Products</span>
        </h1>

        <p
          className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mb-10 fe-fade-up"
          style={{ animationDelay: '280ms' }}
        >
          We transform ambitious visions into scalable products through
          disciplined engineering, strategic product thinking, and agile
          execution, minimizing technical risk while accelerating
          time-to-market, so your business scales confidently with software
          built to last.
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-w-5xl">
          {highlights.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 fe-fade-up"
              style={{ animationDelay: `${380 + i * 100}ms` }}
            >
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
        <div className="w-full px-6 lg:px-12 flex gap-1">
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

      {/* ===== CARD SECTION + IMAGE SECTION, SIDE BY SIDE ===== */}
      <div className="w-full px-6 lg:px-12 -mt-1 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
        {/* ----- CARD SECTION (left) ----- */}
        <div>
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
                  perspective: '1600px',
                }}
              >
                <div
                  ref={(el) => {
                    cardFaceRefs.current[index] = el;
                  }}
                  className={`bg-white rounded-2xl border border-slate-200 transition-shadow duration-300 flex flex-col lg:overflow-hidden ${
                    isActive ? 'shadow-xl' : 'shadow-sm opacity-95'
                  }`}
                  style={{
                    transformOrigin: 'bottom center',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform',
                    height: `${PANEL_HEIGHT}px`,
                    maxHeight: `${PANEL_HEIGHT}px`,
                  }}
                >
                  {/* Mobile-only image (image section is hidden below lg) */}
                  <div className="lg:hidden relative h-40 shrink-0 rounded-t-2xl overflow-hidden">
                    <img
                      src={page.image}
                      alt={page.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div
                      className="hidden absolute inset-0 flex-col items-center justify-center gap-1 bg-gradient-to-br from-slate-700 to-slate-900 text-slate-300"
                      style={{ display: 'none' }}
                    >
                      <div className="text-blue-400">{page.icon}</div>
                      <span className="text-[11px] break-all px-3 text-center">{page.image}</span>
                    </div>
                  </div>

                  <div className="p-8 sm:p-10 lg:flex-1 lg:min-h-0 lg:overflow-y-auto">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-slate-700">{page.icon}</div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                        {page.title}
                      </h2>
                    </div>

                    <p className="text-slate-600 text-base mb-5">{page.subtitle}</p>

                    <p className="text-slate-700 leading-relaxed mb-8">{page.description}</p>

                    <div className="h-px bg-blue-500 mb-6" />

                    <div className="grid grid-cols-1 gap-y-3">
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

        {/* ----- IMAGE SECTION (right, desktop only) ----- */}
        <div
          className="hidden lg:block sticky"
          style={{ top: `${IMAGE_STICKY_TOP}px` }}
        >
          <div
            className="relative w-full"
            style={{ height: `${PANEL_HEIGHT}px`, perspective: '1800px' }}
          >
            <div
              ref={imageFlipRef}
              className="relative w-full h-full"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              {/* Front face: current step */}
              <ImageFace
                page={frontPage}
                faceStyle={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
              />
              {/* Back face: next step, pre-rotated so it faces forward at 180° */}
              <ImageFace
                page={backPage}
                faceStyle={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineeringFramework;