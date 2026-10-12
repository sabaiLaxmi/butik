// src/components/hero/HeroNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Pill-shaped glassmorphism navbar, top center
 * Features backdrop-blur-md, bg-white/20, rounded-full
 */
const HeroNavbar = ({ accentColor = '#ffffff' }) => {
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Collection', path: '/shop' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <header className="absolute top-3 sm:top-6 left-0 right-0 z-50 flex items-center justify-center px-3 pointer-events-none">
      <nav
        aria-label="Hero navigation"
        style={{ borderRadius: '9999px' }}
        className="pointer-events-auto flex items-center gap-1 sm:gap-3 md:gap-6 px-3.5 sm:px-7 py-1.5 sm:py-2.5 rounded-full backdrop-blur-md bg-white/20 border border-white/25 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] transition-all duration-500 hover:bg-white/25"
      >
        <div className="flex items-center gap-2.5 sm:gap-6 text-[11px] sm:text-sm font-medium tracking-wider uppercase font-montserrat">
          {navLinks.map((item, index) => (
            <Link
              key={item.label}
              to={item.path}
              style={{ color: accentColor }}
              className="relative py-1 px-2 sm:px-2.5 rounded-full transition-all duration-300 hover:opacity-100 opacity-85 hover:bg-white/15"
            >
              {item.label}
              {index === 0 && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-current opacity-80" />
              )}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default HeroNavbar;
