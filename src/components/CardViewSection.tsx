import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion'; // FIX: Imported as type
import { 
  ArrowUpRight, 
  Factory, 
  Sprout, 
  Zap, 
  Landmark, 
  HeartPulse, 
  ShoppingBag,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react'; // FIX: Imported as type to prevent Vite SyntaxError
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for classnames
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Type Definitions ---
interface Sector {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  href: string;
}

interface CardViewSectionProps {
  onExploreClick?: (sectorId: string, href: string) => void;
}

// Data Structure
const sectors: Sector[] = [
  {
    id: 'manufacturing',
    title: 'MANUFACTURING',
    description: 'Connected shop floors, industrial AI, digital twins, and intelligent operations that keep production moving.',
    image: 'https://images.unsplash.com/photo-1565439396-2055c136834b?q=80&w=2070&auto=format&fit=crop',
    icon: Factory,
    href: '/industries/manufacturing',
  },
  {
    id: 'agriculture',
    title: 'AGRICULTURE',
    description: 'Precision farming, IoT sensors, and data-driven crop management for sustainable food production.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop',
    icon: Sprout,
    href: '/industries/agriculture',
  },
  {
    id: 'energy',
    title: 'ENERGY & UTILITIES',
    description: 'Smart grids, renewable integration, and predictive maintenance for resilient power infrastructure.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2070&auto=format&fit=crop',
    icon: Zap,
    href: '/industries/energy',
  },
  {
    id: 'bfsi',
    title: 'BFSI',
    description: 'Secure fintech platforms, AI-driven risk assessment, and frictionless digital banking experiences.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop',
    icon: Landmark,
    href: '/industries/bfsi',
  },
  {
    id: 'healthcare',
    title: 'HEALTHCARE',
    description: 'Telemedicine, connected medical devices, and intelligent patient data systems for better outcomes.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2070&auto=format&fit=crop',
    icon: HeartPulse,
    href: '/industries/healthcare',
  },
  {
    id: 'retail',
    title: 'RETAIL & CONSUMER',
    description: 'Omnichannel commerce, personalized shopping experiences, and AI-powered supply chain optimization.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
    icon: ShoppingBag,
    href: '/industries/retail',
  },
];

// --- Framer Motion Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

// --- Main Component ---
export default function CardViewSection({ onExploreClick }: CardViewSectionProps): React.JSX.Element {
  const [activeId, setActiveId] = useState<string>(sectors[0].id);

  const activeSector = sectors.find((s) => s.id === activeId) || sectors[0];
  const inactiveSectors = sectors.filter((s) => s.id !== activeId);

  // Default Explore Method
  const handleExplore = (sector: Sector) => {
    if (onExploreClick) {
      onExploreClick(sector.id, sector.href);
    } else {
      // Default fallback: Standard browser navigation
      console.log(`Navigating to: ${sector.href}`);
      // window.location.href = sector.href; // Uncomment in production
    }
  };

  return (
    <section className="w-full min-h-[700px] bg-[#0A192F] py-24 px-6 md:px-12 lg:px-20 overflow-hidden relative font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#006BB8] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00A3FF] rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none" />

      {/* Header */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
        className="mb-12 relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
          Industries We<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-[#4CC9F0]"> Accelerate</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#006BB8] to-[#00A3FF] rounded-full" />
      </motion.div>

      {/* Layout Container */}
      <motion.div 
        variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[550px] w-full max-w-[1600px] mx-auto relative z-10"
      >
        
        {/* Active Main Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSector.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex-grow lg:w-[60%] h-[400px] lg:h-full rounded-3xl overflow-hidden group shadow-2xl"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${activeSector.image})` }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/80 to-transparent opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#006BB8]/40 to-transparent mix-blend-overlay" />

            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(0,163,255,0.3)]">
                  <activeSector.icon className="w-6 h-6 text-[#4CC9F0]" />
                </div>
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl font-bold text-white tracking-wider"
                >
                  {activeSector.title}
                </motion.h3>
              </div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="text-[#B8C5D6] text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-8"
              >
                {activeSector.description}
              </motion.p>

              {/* Explore Button */}
              <motion.button
                onClick={() => handleExplore(activeSector)}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-[#00A3FF] font-semibold tracking-wider uppercase text-sm group/btn w-fit outline-none cursor-pointer"
              >
                Explore
                <div className="p-1 rounded-full bg-[#00A3FF]/10 group-hover/btn:bg-[#00A3FF]/20 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Inactive Accordion Tabs */}
        <div className="flex flex-row lg:w-[40%] gap-3 h-[200px] lg:h-full overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar">
          {inactiveSectors.map((sector) => (
            <motion.div
              key={sector.id}
              layoutId={`card-${sector.id}`}
              onClick={() => setActiveId(sector.id)}
              onMouseEnter={() => setActiveId(sector.id)}
              className={cn(
                "relative flex-1 min-w-[80px] lg:min-w-0 rounded-3xl overflow-hidden cursor-pointer group transition-all duration-500 ease-in-out border border-transparent hover:border-[#00A3FF]/50",
                "hover:shadow-[0_0_30px_rgba(0,163,255,0.2)]"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${sector.image})` }}
              />
              <div className="absolute inset-0 bg-[#0A192F]/80 group-hover:bg-[#112240]/60 backdrop-blur-[2px] group-hover:backdrop-blur-none transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-80" />

              <div className="absolute inset-0 flex items-center justify-center lg:block lg:p-6 lg:pt-12">
                <h4 className="text-white font-bold tracking-[0.2em] text-xs lg:text-sm lg:writing-mode-vertical lg:transform lg:rotate-180 whitespace-nowrap">
                  {sector.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 1024px) {
          .lg\\:writing-mode-vertical { writing-mode: vertical-rl; }
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}