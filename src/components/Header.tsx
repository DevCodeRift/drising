'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Builds', href: '/builds' },
  { name: 'Guides', href: '/guides' },
  { name: 'News', href: '/news' },
  { name: 'Reviews', href: '/reviews' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-destiny-dark/95 backdrop-blur-md border-b border-destiny-gray-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-destiny-primary rounded-lg flex items-center justify-center group-hover:bg-destiny-accent-solar transition-colors duration-200">
              <span className="text-white font-bold text-xl font-display">D</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-display font-bold text-white">
                Destiny Rising
              </h1>
              <p className="text-xs text-destiny-gray-400 -mt-1">
                Builds & Guides
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-destiny-primary'
                    : 'text-destiny-gray-300 hover:text-destiny-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button className="p-2 text-destiny-gray-400 hover:text-destiny-primary transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-destiny-gray-400 hover:text-destiny-primary transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-destiny-gray-900/95 backdrop-blur-md rounded-lg mb-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 rounded-md ${
                    pathname === item.href
                      ? 'text-destiny-primary bg-destiny-primary/10'
                      : 'text-destiny-gray-300 hover:text-destiny-primary hover:bg-destiny-primary/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}