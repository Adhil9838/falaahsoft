// Footer.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const footerColumns: FooterColumn[] = [
    {
      title: 'What We Do',
      links: [
        { label: 'Custom Software Development', href: '/what-we-do/custom-software-development' },
        { label: 'AI & Machine Learning', href: '/what-we-do/ai-machine-learning' },
        { label: 'Data Engineering', href: '/what-we-do/data-engineering' },
        { label: 'Web Development', href: '/what-we-do/web-development' },
        { label: 'Mobile Development', href: '/what-we-do/mobile-development' },
        { label: 'Cloud & DevOps', href: '/what-we-do/cloud-devops' },
        { label: 'IoT Solutions', href: '/what-we-do/iot-solutions' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Digital Transformation', href: '/solutions/digital-transformation' },
        { label: 'Enterprise Applications', href: '/solutions/enterprise-applications' },
        { label: 'AI Automation', href: '/solutions/ai-automation' },
        { label: 'Healthcare Platforms', href: '/solutions/healthcare-platforms' },
        { label: 'Business Intelligence', href: '/solutions/business-intelligence' },
        { label: 'Cloud Migration', href: '/solutions/cloud-migration' },
      ],
    },
    {
      title: 'Industries',
      links: [
        { label: 'Healthcare', href: '/industries/healthcare' },
        { label: 'Finance & Banking', href: '/industries/finance-banking' },
        { label: 'Retail', href: '/industries/retail' },
        { label: 'Manufacturing', href: '/industries/manufacturing' },
        { label: 'Education', href: '/industries/education' },
        { label: 'Logistics', href: '/industries/logistics' },
        { label: 'Real Estate', href: '/industries/real-estate' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Insights', href: '/insights/blogs' },
        { label: 'Case Studies', href: '/insights/case-studies' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ];

  const socialLinks = [
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: 'Twitter',
      href: 'https://twitter.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: 'GitHub',
      href: 'https://github.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
    {
      label: 'YouTube',
      href: 'https://youtube.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#0A1628] text-white pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-5">
              <img
                src={logo}
                alt="Company Logo"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed mb-6 max-w-sm">
              We build intelligent digital solutions that empower businesses to
              innovate, scale, and lead in an ever-evolving technological
              landscape.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gray-300 hover:bg-[#006BB8] hover:text-white transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
                  {column.title}
                </h4>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm text-gray-400 hover:text-[#4DA6FF] transition-colors duration-200 inline-block hover:translate-x-1"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-10 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-md">
              <h4 className="text-lg font-semibold text-white mb-1">
                Stay in the loop
              </h4>
              <p className="text-sm text-gray-400">
                Get the latest insights on AI, software, and digital
                transformation delivered to your inbox.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-5 py-3 rounded-full bg-white/5 border border-white/15 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#006BB8] focus:ring-2 focus:ring-[#006BB8]/30 transition-all duration-200 w-full sm:w-72"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#006BB8] text-white text-sm font-semibold hover:bg-[#004A80] transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap"
              >
                {subscribed ? '✓ Subscribed' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              to="/privacy-policy"
              className="text-xs text-gray-500 hover:text-[#4DA6FF] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="text-xs text-gray-500 hover:text-[#4DA6FF] transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookie-policy"
              className="text-xs text-gray-500 hover:text-[#4DA6FF] transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;