import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import logoHover from '../assets/hoverlogo.png';

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: string[];
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    {
      label: 'What We Do',
      href: '/what-we-do',
      hasDropdown: true,
      dropdownItems: [
        'Custom Software Development',
        'AI & Machine Learning',
        'Data Engineering',
        'Healthcare Solutions',
        'Web Development',
        'Mobile Development',
        'Cloud & DevOps',
        'IoT Solutions',
      ],
    },
    {
      label: 'Solutions',
      href: '/solutions',
      hasDropdown: true,
      dropdownItems: [
        'Digital Transformation',
        'Enterprise Applications',
        'AI Automation',
        'Healthcare Platforms',
        'Business Intelligence',
        'Cloud Migration',
      ],
    },
    {
      label: 'Industries',
      href: '/industries',
      hasDropdown: true,
      dropdownItems: [
        'Healthcare',
        'Finance & Banking',
        'Retail',
        'Manufacturing',
        'Education',
        'Logistics',
        'Real Estate',
        'Travel & Hospitality',
      ],
    },
    {
      label: 'Insights',
      href: '/insights',
      hasDropdown: true,
      dropdownItems: [
        'Blogs',
        'Technology Trends',
        'AI Insights',
        'Case Studies',
        'White Papers',
        'Success Stories',
      ],
    },
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl bg-white/20 backdrop-blur-2xl rounded-full shadow-xl border border-white/30'
          : 'sticky top-0 bg-transparent shadow-none w-full'
      }`}
      style={
        isScrolled
          ? {
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
            }
          : undefined
      }
    >
      {/* Main Header */}
      <div className="mx-auto px-6">
        <div
          className={`flex justify-between items-center transition-all duration-500 ease-in-out ${
            isScrolled ? 'h-12' : 'h-20'
          }`}
        >
          {/* Logo with slow cross-fade on hover */}
          <div className="flex-shrink-0 flex items-center mr-6">
            <a
              href="/"
              className="flex items-center relative"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              {/* Base logo (always visible) */}
              <img
                src={logo}
                alt="Company Logo"
                className={`w-auto object-contain transition-all duration-700 ease-in-out ${
                  isScrolled ? 'h-8' : 'h-16'
                } ${isLogoHovered ? 'opacity-0' : 'opacity-100'}`}
              />

              {/* Hover logo (fades in on top, absolutely positioned) */}
              <img
                src={logoHover}
                alt="Company Logo Hover"
                className={`absolute inset-0 w-auto h-full object-contain transition-all duration-700 ease-in-out ${
                  isLogoHovered ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center justify-center flex-1 space-x-5">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() =>
                  item.hasDropdown && setActiveDropdown(item.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className={`flex items-center font-medium hover:text-[#006BB8] transition-colors duration-200 py-1 whitespace-nowrap ${
                    isScrolled
                      ? 'text-[13px] text-[#1A1A1A]'
                      : 'text-[15px] text-[#1A1A1A]'
                  }`}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <svg
                      className={`ml-1 w-3 h-3 transition-transform duration-200 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </a>

                {/* Dropdown — Enhanced Glassmorphism when scrolled */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                    <div
                      className={`w-64 rounded-xl shadow-2xl py-2 overflow-hidden border transition-all duration-300 ${
                        isScrolled
                          ? 'bg-white/40 border-white/40'
                          : 'bg-[#FFFFFF] border-gray-100'
                      }`}
                      style={
                        isScrolled
                          ? {
                              backdropFilter: 'blur(24px) saturate(180%)',
                              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                              backgroundColor: 'rgba(255, 255, 255, 0.35)',
                            }
                          : undefined
                      }
                    >
                      {item.dropdownItems?.map((dropItem, idx) => (
                        <a
                          key={idx}
                          href="#"
                          className={`block px-5 py-2.5 text-[14px] font-medium transition-all duration-200 ${
                            isScrolled
                              ? 'text-[#1A1A1A] hover:bg-white/40 hover:text-[#006BB8]'
                              : 'text-[#4A4A4A] hover:bg-[#EAF5FF] hover:text-[#006BB8]'
                          } hover:pl-6`}
                        >
                          {dropItem}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden xl:block ml-6">
            <a
              href="/contact"
              className={`inline-flex items-center bg-[#006BB8] text-[#FFFFFF] font-semibold rounded-full hover:bg-[#004A80] transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap ${
                isScrolled ? 'px-4 py-1.5 text-xs' : 'px-6 py-3 text-sm'
              }`}
            >
              Talk to an Expert
              <svg
                className="ml-2 w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-md text-[#1A1A1A] hover:bg-[#FFFFFF]/20 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu — Enhanced Glassmorphism when scrolled */}
      {isMobileMenuOpen && (
        <div
          className={`xl:hidden border-t border-white/20 absolute w-full left-0 shadow-lg ${
            isScrolled
              ? 'rounded-b-[20px]'
              : 'bg-[#EAF5FF]'
          }`}
          style={
            isScrolled
              ? {
                  backdropFilter: 'blur(24px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                }
              : undefined
          }
        >
          <div className="px-4 pt-2 pb-6 space-y-1 max-h-[calc(100vh-6rem)] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  className={`block px-4 py-3 font-semibold rounded-lg transition-colors ${
                    isScrolled
                      ? 'text-[#1A1A1A] hover:bg-white/30 hover:text-[#006BB8]'
                      : 'text-[#1A1A1A] hover:bg-[#FFFFFF]/20 hover:text-[#006BB8]'
                  }`}
                >
                  {item.label}
                </a>
                {item.hasDropdown && item.dropdownItems && (
                  <div className="pl-6 pb-1">
                    {item.dropdownItems.map((dropItem, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className={`block px-4 py-2 text-[13px] rounded-lg transition-colors ${
                          isScrolled
                            ? 'text-[#4A4A4A] hover:bg-white/30 hover:text-[#006BB8]'
                            : 'text-[#4A4A4A] hover:bg-[#FFFFFF]/20 hover:text-[#006BB8]'
                        }`}
                      >
                        {dropItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 mt-2 border-t border-white/20">
              <a
                href="/contact"
                className="block w-full text-center px-6 py-4 bg-[#006BB8] text-[#FFFFFF] font-semibold rounded-lg hover:bg-[#004A80] transition-colors"
              >
                Talk to an Expert
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;