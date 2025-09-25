'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const heroStats = [
  { label: 'Active Builds', value: '2,500+', icon: '⚔️' },
  { label: 'Community Members', value: '50K+', icon: '👥' },
  { label: 'Guides Published', value: '1,200+', icon: '📖' },
  { label: 'Meta Updates', value: 'Weekly', icon: '📈' },
];

const featuredKeywords = [
  'Destiny Rising Builds',
  'Best Destiny 2 Builds',
  'PvP Builds',
  'PvE Builds',
  'Exotic Weapons',
  'Meta Analysis',
  'Seasonal Guides',
  'Weapon Reviews',
];

export default function HeroSection() {
  const [currentKeyword, setCurrentKeyword] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentKeyword((prev) => (prev + 1) % featuredKeywords.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-destiny-gradient opacity-20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-destiny-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-destiny-accent-solar/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-8 text-shadow-lg">
            <span className="block text-white">Master the</span>
            <span className="block text-gradient animate-fade-in">
              {featuredKeywords[currentKeyword]}
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-destiny-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Discover the most powerful Destiny 2 builds, expert guides, and meta analysis.
            Dominate in PvP, excel in PvE, and stay ahead of the competition with our
            community-driven content.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              href="/builds"
              className="btn-primary px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200"
            >
              🔥 Explore Top Builds
            </Link>
            <Link
              href="/guides"
              className="btn-secondary px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200"
            >
              📚 Read Guides
            </Link>
          </div>

          {/* Quick Search */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <input
                type="search"
                placeholder="Search builds, weapons, guides..."
                className="w-full px-6 py-4 bg-destiny-gray-800/80 backdrop-blur-sm border-2 border-destiny-gray-700 rounded-xl text-white placeholder-destiny-gray-400 focus:outline-none focus:border-destiny-primary transition-colors duration-200"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-destiny-gray-400 hover:text-destiny-primary transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-destiny-gray-400">Popular searches:</span>
              {['Hunter Builds', 'Titan PvP', 'Warlock PvE', 'Exotic Reviews'].map((term) => (
                <button
                  key={term}
                  className="px-3 py-1 text-sm bg-destiny-gray-800 hover:bg-destiny-primary/20 text-destiny-gray-300 hover:text-destiny-primary rounded-full transition-colors duration-200"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {heroStats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white font-display mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-destiny-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-destiny-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}