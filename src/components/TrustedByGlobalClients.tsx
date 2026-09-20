import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── TypeScript Interfaces ────────────────────────────────────────────────────

interface Company {
  name: string;
  abbreviation: string;
}

interface CompanyCardProps {
  company: Company;
}

interface MarqueeRowProps {
  companies: Company[];
  /** 'left'  → cards shift left  (new ones enter from right)
   *  'right' → cards shift right (new ones enter from left) */
  direction: 'left' | 'right';
  /** seconds for one full card step */
  stepDuration?: number;
}

// ─── Sample Data ──────────────────────────────────────────────────────────────

const topRowCompanies: Company[] = [
  { name: 'TATA', abbreviation: 'TATA' },
  { name: 'Infosys', abbreviation: 'INFY' },
  { name: 'Accenture', abbreviation: 'ACN' },
  { name: 'Cognizant', abbreviation: 'CTSH' },
  { name: 'HCL', abbreviation: 'HCL' },
  { name: 'IBM', abbreviation: 'IBM' },
];

const bottomRowCompanies: Company[] = [
  { name: 'Wipro', abbreviation: 'WIT' },
  { name: 'Tech Mahindra', abbreviation: 'TECHM' },
  { name: 'Capgemini', abbreviation: 'CAP' },
  { name: 'LTTS', abbreviation: 'LTTS' },
  { name: 'Oracle', abbreviation: 'ORCL' },
  { name: 'SAP', abbreviation: 'SAP' },
];

// Card width (220) + gap (24) = 244px shift per card
const CARD_WIDTH = 220;
const GAP = 24;
const STEP = CARD_WIDTH + GAP; // 244

// ─── CompanyCard Component ────────────────────────────────────────────────────

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <motion.div
      className="
        group flex h-[120px] w-[220px] shrink-0 items-center justify-center
        rounded-xl border border-[#E5E7EB] bg-white shadow-sm
        transition-all duration-300 ease-out
        hover:-translate-y-[5px] hover:border-[#006BB8] hover:shadow-lg
        dark:border-gray-700 dark:bg-gray-900
        dark:hover:border-[#006BB8]
      "
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="flex flex-col items-center gap-1">
        <span
          className="
            text-lg font-bold tracking-wider text-gray-400
            transition-colors duration-300
            group-hover:text-[#006BB8]
            dark:text-gray-500
            dark:group-hover:text-[#006BB8]
          "
        >
          {company.abbreviation}
        </span>
        <span
          className="
            text-[11px] font-medium uppercase tracking-widest text-gray-400
            transition-colors duration-300
            group-hover:text-[#006BB8]
            dark:text-gray-500
            dark:group-hover:text-[#006BB8]
          "
        >
          {company.name}
        </span>
      </div>
    </motion.div>
  );
};

// ─── MarqueeRow Component ─────────────────────────────────────────────────────

const MarqueeRow: React.FC<MarqueeRowProps> = ({
  companies,
  direction,
  stepDuration = 2.2,
}) => {
  const loopedCompanies = [...companies, ...companies, ...companies];

  const travelDistance = companies.length * STEP;

  const xKeyframes =
    direction === 'left' ? [0, -travelDistance] : [-travelDistance, 0];

  return (
    <div className="group/marquee relative flex overflow-hidden">
      {/* Edge fades — match the white background */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent dark:from-gray-950" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent dark:from-gray-950" />

      <motion.div
        className="flex gap-6 py-2 group-hover/marquee:[animation-play-state:paused]"
        style={{ willChange: 'transform' }}
        animate={{ x: xKeyframes }}
        transition={{
          duration: stepDuration * companies.length,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        {loopedCompanies.map((company, index) => (
          <CompanyCard key={`${company.name}-${index}`} company={company} />
        ))}
      </motion.div>
    </div>
  );
};

// ─── Main Section Component ───────────────────────────────────────────────────

const TrustedByGlobalClients: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="
        relative flex min-h-screen w-full items-center justify-center
        overflow-hidden bg-white py-24
        dark:bg-gray-950
      "
    >
      {/* ── Full-width content wrapper ── */}
      <div className="relative z-10 w-full">
        {/* Text content stays inside max-w-7xl */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span
              className="inline-block rounded-full border border-[#006BB8]/20 bg-[#006BB8]/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#006BB8] dark:border-[#006BB8]/30 dark:bg-[#006BB8]/10 dark:text-[#4DA6E0]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Trusted By Global Clients
            </motion.span>

            <motion.h2
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.2] dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              We&apos;re proud to work with{' '}
              <span className="text-[#006BB8] dark:text-[#4DA6E0]">
                forward-thinking
              </span>{' '}
              businesses
            </motion.h2>

            <motion.p
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              From startups to large enterprises, we help organizations build
              innovative software solutions and achieve sustainable growth.
            </motion.p>
          </motion.div>
        </div>

        {/* ── Marquee Rows — edge-to-edge ── */}
        <motion.div
          className="mt-16 w-full space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Top Row → moves LEFT */}
          <MarqueeRow
            companies={topRowCompanies}
            direction="left"
            stepDuration={2.2}
          />

          {/* Bottom Row → moves RIGHT */}
          <MarqueeRow
            companies={bottomRowCompanies}
            direction="right"
            stepDuration={2.2}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedByGlobalClients;