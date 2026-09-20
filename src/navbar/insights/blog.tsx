import React, { useState } from 'react';

// --- Type Definitions ---
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

// --- Mock Data ---
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Enterprise AI',
    excerpt: 'How artificial intelligence is reshaping business processes and decision-making across industries.',
    content: `Artificial intelligence is no longer a futuristic concept—it's a present-day reality transforming how enterprises operate. From predictive analytics to natural language processing, AI is driving efficiency, personalization, and innovation at unprecedented scales.

In this deep dive, we explore how leading organizations are integrating AI into their core workflows. We'll examine real-world case studies, discuss ethical considerations, and look at the road ahead for enterprise AI adoption.

Key takeaways:
• AI adoption has accelerated by 270% in the last three years
• Enterprises using AI report 40% improvement in operational efficiency
• The biggest challenges remain data quality and talent acquisition
• Responsible AI frameworks are becoming a board-level priority`,
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    author: 'Sarah Chen',
    date: 'Mar 15, 2025',
    readTime: '8 min read',
    category: 'Technology',
  },
  {
    id: 2,
    title: 'Cloud Migration Strategies That Work',
    excerpt: 'A practical guide to moving your legacy systems to the cloud without disrupting business operations.',
    content: `Cloud migration is a journey, not a destination. Many organizations rush into it only to face unexpected costs, security gaps, and operational disruptions. This guide walks you through proven strategies for a seamless transition.

We cover the 6 R's of migration: Rehost, Replatform, Repurchase, Refactor, Retire, and Retain. You'll learn how to assess your current infrastructure, prioritize workloads, and build a phased migration roadmap that minimizes risk.

Essential steps:
1. Conduct a comprehensive application portfolio assessment
2. Define clear success metrics and KPIs
3. Choose the right cloud model (public, private, hybrid)
4. Implement robust security and compliance controls
5. Train your teams and establish a Cloud Center of Excellence`,
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    author: 'Marcus Johnson',
    date: 'Mar 12, 2025',
    readTime: '12 min read',
    category: 'Cloud',
  },
  {
    id: 3,
    title: 'Designing for Accessibility',
    excerpt: 'Why inclusive design is not just a compliance requirement but a competitive advantage.',
    content: `Accessibility in digital products is often treated as an afterthought—a checkbox to tick for legal compliance. But the most innovative companies know that designing for accessibility means designing for everyone.

When you build with accessibility in mind, you create products that are more usable, more discoverable, and more delightful for all users. From keyboard navigation to screen reader compatibility, small changes can have a massive impact.

What you'll learn:
• WCAG 2.2 guidelines explained in plain language
• How to conduct accessibility audits on existing products
• The business case for accessibility (it's bigger than you think)
• Tools and techniques for testing with real users
• Building an accessibility-first design culture`,
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80',
    author: 'Elena Rodriguez',
    date: 'Mar 10, 2025',
    readTime: '6 min read',
    category: 'Design',
  },
  {
    id: 4,
    title: 'Zero Trust Security Architecture',
    excerpt: 'Moving beyond perimeter-based security to a model that assumes no implicit trust.',
    content: `The traditional security model—trust everything inside the firewall, distrust everything outside—is no longer sufficient. With remote work, cloud services, and mobile devices, the perimeter has dissolved.

Zero Trust is a security framework that assumes no user or device is trustworthy by default, regardless of location. Every access request is verified, every connection is encrypted, and every action is logged and analyzed.

Implementing Zero Trust:
• Identity and Access Management (IAM) as the foundation
• Micro-segmentation of networks
• Continuous monitoring and behavioral analytics
• Least-privilege access principles
• Multi-factor authentication everywhere
• Regular security posture assessments`,
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    author: 'David Park',
    date: 'Mar 8, 2025',
    readTime: '10 min read',
    category: 'Security',
  },
  {
    id: 5,
    title: 'Data-Driven Decision Making',
    excerpt: 'How to build a culture where data informs every strategic choice, not just the big ones.',
    content: `Data is the new oil—but only if you know how to refine it. Many organizations collect massive amounts of data but struggle to extract actionable insights that drive decision-making.

Building a data-driven culture requires more than technology. It demands changes in mindset, processes, and incentives. Leaders must model data-informed behavior, and teams must be empowered with the right tools and training.

The path to data maturity:
• Start with a clear data strategy aligned to business goals
• Invest in data quality and governance
• Democratize access with self-service analytics
• Foster data literacy across all levels
• Measure and iterate on your data initiatives
• Celebrate wins and learn from failures publicly`,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    author: 'Aisha Patel',
    date: 'Mar 5, 2025',
    readTime: '7 min read',
    category: 'Analytics',
  },
  {
    id: 6,
    title: 'The Rise of Low-Code Platforms',
    excerpt: 'Empowering citizen developers to build applications without writing code.',
    content: `Low-code and no-code platforms are democratizing software development. Business users can now create applications, automate workflows, and solve problems without waiting for IT resources.

This shift is not about replacing developers—it's about augmenting them. Professional developers can focus on complex, high-value work while citizen developers handle departmental solutions. The result? Faster innovation and better alignment between IT and business.

What this means for your organization:
• Identify the right use cases for low-code (not everything qualifies)
• Establish governance without stifling innovation
• Provide training and support for citizen developers
• Integrate low-code solutions with existing systems
• Measure business outcomes, not just app counts`,
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    author: 'James Wilson',
    date: 'Mar 2, 2025',
    readTime: '9 min read',
    category: 'Development',
  },
];

// --- SVG Icons ---
const CloseIcon: React.FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ArrowRightIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const CalendarIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UserIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

// --- Main Blog Component ---
const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const openModal = (post: BlogPost) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO SECTION WITH VIDEO ===== */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80"
        >
          <source
            src="https://cdn.pixabay.com/video/2023/10/22/186115-876963225_large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Overlay - SAP Blue gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a6ed1]/90 via-[#0a6ed1]/70 to-[#003d73]/80" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-sm text-white rounded-full border border-white/30">
              Insights & Perspectives
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Our Blog
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-50 mb-10 max-w-2xl mx-auto leading-relaxed">
              Exploring the ideas, technologies, and strategies shaping tomorrow's enterprise.
            </p>
            <button
              onClick={() => {
                document.getElementById('blog-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0a6ed1] font-semibold rounded-lg shadow-lg hover:bg-blue-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Explore Articles
              <ArrowRightIcon />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/80 rounded-full" />
          </div>
        </div>
      </section>

      {/* ===== BLOG GRID SECTION ===== */}
      <section id="blog-grid" className="py-20 px-6 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Latest Articles
            </h2>
            <div className="w-24 h-1.5 bg-[#0a6ed1] mx-auto rounded-full mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay informed with our latest thinking on technology, design, and business strategy.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => openModal(post)}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-[#0a6ed1] text-white rounded-full shadow-lg">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <UserIcon />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarIcon />
                      {post.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#0a6ed1] transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <ClockIcon />
                      {post.readTime}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#0a6ed1] group-hover:gap-2 transition-all duration-300">
                      Read More
                      <ArrowRightIcon />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FULLSCREEN MODAL ===== */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-slideUp">
            {/* Modal Header Image */}
            <div className="relative h-64 sm:h-80 flex-shrink-0">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/40 transition-all duration-200 hover:scale-110"
                aria-label="Close modal"
              >
                <CloseIcon />
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-wider bg-[#0a6ed1] text-white rounded-full">
                  {selectedPost.category}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                  {selectedPost.title}
                </h2>
              </div>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pb-6 mb-6 border-b border-gray-200 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <UserIcon />
                  <span className="font-medium text-gray-900">{selectedPost.author}</span>
                </span>
                <span className="flex items-center gap-2">
                  <CalendarIcon />
                  {selectedPost.date}
                </span>
                <span className="flex items-center gap-2">
                  <ClockIcon />
                  {selectedPost.readTime}
                </span>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {selectedPost.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('•') || paragraph.startsWith('-')) {
                    return (
                      <ul key={index} className="list-disc pl-6 mb-4 space-y-1 text-gray-700">
                        {paragraph.split('\n').map((item, i) => (
                          <li key={i} className="leading-relaxed">
                            {item.replace(/^[•-]\s*/, '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (/^\d+\./.test(paragraph)) {
                    return (
                      <ol key={index} className="list-decimal pl-6 mb-4 space-y-1 text-gray-700">
                        {paragraph.split('\n').map((item, i) => (
                          <li key={i} className="leading-relaxed">
                            {item.replace(/^\d+\.\s*/, '')}
                          </li>
                        ))}
                      </ol>
                    );
                  }
                  return (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex-shrink-0 px-6 sm:px-8 py-5 bg-gradient-to-r from-[#0a6ed1] to-[#003d73] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white/90 text-sm">
                Enjoyed this article? Share it with your network.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/30"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                  }}
                  className="px-6 py-2.5 bg-white text-[#0a6ed1] font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-lg"
                >
                  Share Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== ANIMATIONS (Tailwind CSS Keyframes) ===== */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Blog;