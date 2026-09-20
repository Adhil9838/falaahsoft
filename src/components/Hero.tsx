// src/components/Hero.tsx
import React from 'react';
import heroVideo from '../assets/HeroSection.mp4'; // Import method for video
// If you have a poster image
// import heroPoster from '../assets/hero-poster.jpg';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[800px] lg:min-h-[900px] w-full overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        // poster={heroPoster} // Optional: poster image
      >
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
          Transforming Businesses with AI, Software & Digital Innovation
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl max-w-2xl text-gray-200">
          Discover amazing features and take your experience to the next level with our innovative solutions.
        </p>
      </div>

      {/* Scroll Indicator (Optional) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;