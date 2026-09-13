import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Lightbulb,
  Target,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

interface Slide {
  id: number;
  label: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  watermark: string;
}

const slides: Slide[] = [
  {
    id: 1,
    label: 'Integrated',
    title: 'Integrated',
    description:
      'We connect strategy, design, and engineering into one seamless delivery model — eliminating silos and accelerating outcomes across your entire organization.',
    icon: <Layers className="w-6 h-6" />,
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    watermark: '01',
  },
  {
    id: 2,
    label: 'Inventive',
    title: 'Inventive',
    description:
      'Curiosity drives everything we build. We challenge assumptions, prototype rapidly, and craft novel solutions that create lasting competitive advantage.',
    icon: <Lightbulb className="w-6 h-6" />,
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    watermark: '02',
  },
  {
    id: 3,
    label: 'Practical',
    title: 'Practical',
    description:
      'Ambition grounded in reality. Every recommendation is engineered for your constraints, scalable to your growth, and measurable from day one.',
    icon: <Target className="w-6 h-6" />,
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    watermark: '03',
  },
  {
    id: 4,
    label: 'Ethical',
    title: 'Ethical',
    description:
      'Trust is our foundation. We hold ourselves to the highest standards of transparency, data stewardship, and responsible innovation — always.',
    icon: <ShieldCheck className="w-6 h-6" />,
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80',
    watermark: '04',
  },
];

const OurApproach: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const slide = slides[current];
  const total = slides.length;

  const paginate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + total) % total);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const contentVariants = {
    enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 24 : -24 }),
    center: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? -24 : 24,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section className="relative bg-[#F8FAFC] py-24 lg:py-32 overflow-hidden">
      {/* Ambient background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#006BB8]/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#006BB8]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* ---------- Header ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2.5 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#006BB8]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#006BB8]">
              Our Approach
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1E293B] leading-[1.05]">
            How we deliver
            <span className="block text-[#006BB8]">exceptional outcomes.</span>
          </h2>
          <p className="mt-6 text-lg text-[#475569] leading-relaxed max-w-2xl">
            Four principles guide every engagement — from the first workshop to
            the final deployment. This is how we turn complexity into clarity.
          </p>
        </motion.div>

        {/* ---------- Main Grid (equal height columns) ---------- */}
        <div className="mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-stretch">
          {/* ---------- LEFT: Image ---------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full"
          >
            <div className="group relative h-full min-h-[480px] lg:min-h-[560px] w-full overflow-hidden rounded-[20px] bg-[#E2E8F0] shadow-[0_24px_60px_-20px_rgba(15,23,42,0.25)]">
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.img
                  key={slide.id}
                  src={slide.image}
                  alt={slide.title}
                  custom={direction}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover will-change-transform group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                  loading="lazy"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/50 via-transparent to-transparent" />

              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/85 backdrop-blur-md px-3.5 py-1.5 shadow-sm border border-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-[#006BB8] animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1E293B]">
                  Principle {slide.watermark}
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
                    Our Approach
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {slide.title}
                  </p>
                </div>
                <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white">
                  {slide.icon}
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-4 -right-4 h-32 w-32 rounded-[20px] border border-[#006BB8]/15 -z-10" />
          </motion.div>

          {/* ---------- RIGHT: Navigation + Content (stretch to match) ---------- */}
          <div className="flex flex-col gap-6 h-full">
            {/* Top Nav Bar Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center justify-between rounded-2xl border border-[#E2E8F0] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] shrink-0"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#006BB8]/8 text-[#006BB8]">
                  {slide.icon}
                </span>
                <div className="leading-tight">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#94A3B8]">
                    Section
                  </p>
                  <p className="text-sm font-semibold text-[#1E293B]">
                    {slide.title}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-baseline gap-1 tabular-nums">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={current}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="text-sm font-bold text-[#1E293B]"
                    >
                      {String(current + 1).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-sm font-medium text-[#CBD5E1]">/</span>
                  <span className="text-sm font-medium text-[#94A3B8]">
                    {String(total).padStart(2, '0')}
                  </span>
                </div>

                <div className="h-6 w-px bg-[#E2E8F0]" />

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => paginate(-1)}
                    aria-label="Previous slide"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#475569] transition-colors hover:border-[#006BB8] hover:text-[#006BB8] hover:bg-[#006BB8]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#006BB8]/40"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => paginate(1)}
                    aria-label="Next slide"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#006BB8] text-white shadow-sm transition-colors hover:bg-[#00579A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#006BB8]/40"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Content Card (fills remaining height) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex-1 overflow-hidden rounded-[20px] border border-[#E2E8F0] bg-white/80 backdrop-blur-xl shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_50px_-24px_rgba(15,23,42,0.18)]"
            >
              <div className="pointer-events-none absolute -right-6 -top-10 select-none">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={slide.watermark}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="block text-[180px] font-bold leading-none tracking-tighter text-[#006BB8]/[0.06]"
                  >
                    {slide.watermark}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="relative flex h-full flex-col p-8 sm:p-10 lg:p-12">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={slide.id}
                    custom={direction}
                    variants={contentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col flex-1"
                  >
                    <motion.div
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: 0.1,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#006BB8] to-[#00579A] text-white shadow-[0_8px_24px_-8px_rgba(0,107,184,0.6)]"
                    >
                      {slide.icon}
                    </motion.div>

                    <h3 className="mt-7 text-3xl sm:text-4xl font-bold tracking-tight text-[#1E293B]">
                      {slide.title}
                    </h3>

                    <p className="mt-4 text-base sm:text-lg text-[#475569] leading-relaxed max-w-lg">
                      {slide.description}
                    </p>

                    <div className="mt-auto pt-10 flex items-center gap-2">
                      {slides.map((s, i) => (
                        <button
                          key={s.id}
                          onClick={() => {
                            setDirection(i > current ? 1 : -1);
                            setCurrent(i);
                          }}
                          aria-label={`Go to ${s.title}`}
                          className="group relative h-1 flex-1 overflow-hidden rounded-full bg-[#E2E8F0] transition-colors hover:bg-[#CBD5E1] focus:outline-none"
                        >
                          <motion.span
                            initial={false}
                            animate={{ width: i === current ? '100%' : '0%' }}
                            transition={{
                              duration: 0.5,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="absolute inset-y-0 left-0 rounded-full bg-[#006BB8]"
                          />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurApproach;