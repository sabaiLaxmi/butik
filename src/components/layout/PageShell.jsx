import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from './PageTransition';

/**
 * PageShell component for Info Pages (Contact Us, Track Order, Return & Exchange, etc.)
 *
 * Requirements:
 * 1. max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14
 * 2. Header block:
 *    - small eyebrow (text-xs tracking-[0.2em] uppercase, muted rose)
 *    - h1 (text-4xl md:text-5xl, serif font, leading-tight)
 *    - subtext line (text-sm md:text-base, max-w-xl)
 *    - Spacing between eyebrow, h1, subtext is small (mt-2 / mt-3)
 *    - NO huge gap under heading
 * 3. Layout:
 *    - Desktop: grid md:grid-cols-5 gap-10
 *    - Form card: 3 columns
 *    - Info/side panel: 2 columns
 *    - Mobile: single column, side panel below form
 * 4. Form card:
 *    - bg-white, rounded-2xl, border border-[#EADBD5], shadow-[0_10px_40px_rgba(90,30,43,0.06)], p-5 md:p-8
 * 5. Framer motion:
 *    - Page header and form card fade/slide up on load
 */

export const Card = ({
  children,
  className = '',
  highlight = false,
  ...props
}) => {
  return (
    <div
      className={`rounded-2xl border overflow-hidden min-w-0 box-border p-6 md:p-8 transition-shadow duration-200 ${
        highlight
          ? 'bg-[#FAF2EF] border-[#EADBD5]'
          : 'bg-white border-[#EADBD5] shadow-[0_10px_40px_rgba(90,30,43,0.06)]'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const PageShell = ({
  eyebrow = 'VASTRIKA ASSISTANCE',
  title,
  subtext,
  children,
  sidePanel
}) => {
  return (
    <PageTransition>
      <div className="w-full bg-[#FAF6F4] min-h-[calc(100vh-80px)] flex flex-col items-center">
        <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 box-border">
          {/* Header Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            {eyebrow && (
              <span className="text-xs tracking-[0.2em] uppercase font-semibold text-[#8C4A5A] block mb-3">
                {eyebrow}
              </span>
            )}
            <h1 className="text-4xl md:text-6xl font-serif text-[var(--color-ink)] leading-tight font-playfair mb-4 mt-0">
              {title}
            </h1>
            {subtext && (
              <p className="text-sm md:text-base text-[#6B5A56] max-w-xl mb-10 mt-0 leading-relaxed">
                {subtext}
              </p>
            )}
          </motion.div>

          {/* Grid Layout: 3 cols Form Card, 2 cols Side Panel on lg+ */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Form Card (lg:col-span-3) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3 w-full bg-white rounded-2xl border border-[#EADBD5] shadow-[0_10px_40px_rgba(90,30,43,0.06)] p-6 md:p-8 min-w-0 overflow-hidden box-border"
            >
              {children}
            </motion.div>

            {/* Side Panel (lg:col-span-2 with flex flex-col gap-6) */}
            {sidePanel && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-2 w-full flex flex-col gap-6 min-w-0"
              >
                {sidePanel}
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default PageShell;
