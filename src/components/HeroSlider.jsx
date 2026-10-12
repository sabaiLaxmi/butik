// src/components/HeroSlider.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products, getOptimizedImageUrl } from '../data/products';
import HeroNavbar from './hero/HeroNavbar';
import ProductImage from './hero/ProductImage';
import ProductText from './hero/ProductText';
import ProductDetailsRight from './hero/ProductDetailsRight';

/**
 * Full-screen auto-playing fashion hero slider
 * Built with React, Tailwind CSS and Framer Motion.
 *
 * Core Specifications:
 * - 4500ms auto-play interval with pause on hover
 * - Smooth 0.9s background color transitions on root motion.section
 * - Staggered text animations on left
 * - Pure PNG cutout cloth with custom ground shadow and continuous float
 * - Interactive size selection on right
 * - Next garment preview in bottom right (15% size)
 * - Dot indicators & animated 4.5s linear progress bar
 */
const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const currentProduct = products[currentIndex];
  const nextIndex = (currentIndex + 1) % products.length;
  const nextProduct = products[nextIndex];

  // Helper to advance to next slide
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  }, []);

  // Helper to go back to previous slide
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  }, []);


  // 1. AUTO-PLAY: setInterval every 4500ms to (i+1) % length.
  // Pause on hover, reset timer on manual next/prev.
  useEffect(() => {
    if (isHovered) return;

    timerRef.current = setInterval(() => {
      handleNext();
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isHovered, handleNext]);

  return (
    /* 
      2. BACKGROUND COLOR CHANGE:
      Root is motion.section with animate={{ backgroundColor: p.bg }} and transition duration 0.9s,
      so the whole background smoothly changes color for every cloth.
    */
    <motion.section
      animate={{ backgroundColor: currentProduct.bg }}
      transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full min-h-screen h-screen overflow-hidden flex flex-col justify-between selection:bg-white/20"
      style={{ willChange: 'background-color' }}
    >
      {/* Subtle luxury ambient texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] z-0" />

      {/* Pill-shaped glassmorphism navbar at top center */}
      <HeroNavbar accentColor={currentProduct.accent} />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-12 sm:pt-16 pb-1 sm:pb-2 min-h-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-6 lg:gap-4 items-center">
          {/* Left Block: Product Text (Stacked above cloth on mobile) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start order-1 lg:order-1 w-full">
            <ProductText
              product={currentProduct}
              onPrev={handlePrev}
              onNext={handleNext}
              currentIndex={currentIndex}
              totalCount={products.length}
            />
          </div>

          {/* Center Block: Cloth with AnimatePresence, floating motion & code-made ground shadow */}
          <div className="lg:col-span-5 flex justify-center items-center order-2 lg:order-2 w-full">
            <ProductImage
              product={currentProduct}
              allProducts={products}
            />
          </div>

          {/* Right Block: Price Tag & Interactive Size Selector */}
          <div className="lg:col-span-2 hidden lg:flex justify-end order-3">
            <ProductDetailsRight product={currentProduct} />
          </div>
        </div>
      </div>

      {/* Bottom Bar: Next Cloth Preview */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-2 sm:pb-4 flex items-center justify-end shrink-0">

        {/* 
          6. Bottom right: Small preview of the NEXT cloth (about 15% size) that scales in.
          Features scale + fade AnimatePresence transition.
        */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.button
              key={nextProduct.id}
              onClick={handleNext}
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderColor: `${currentProduct.accent}35`,
                color: currentProduct.accent,
                borderRadius: '16px'
              }}
              aria-label={`Next item: ${nextProduct.title}`}
              className="group flex items-center gap-2 sm:gap-3 p-1.5 sm:px-3 sm:py-2 backdrop-blur-md bg-white/10 border shadow-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-left"
            >
              {/* Mini cloth image (~15% scale of hero garment) */}
              <div className="relative w-8 h-10 sm:w-14 sm:h-16 flex items-center justify-center overflow-hidden">
                <img
                  src={getOptimizedImageUrl(nextProduct.img)}
                  alt={nextProduct.title}
                  className="h-full w-auto object-contain drop-shadow transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Preview Labels */}
              <div className="hidden sm:flex flex-col pr-1">
                <span className="text-[10px] tracking-[0.2em] uppercase font-montserrat opacity-70 font-semibold">
                  Up Next
                </span>
                <span className="text-xs font-serif font-semibold font-playfair line-clamp-1 max-w-[120px]">
                  {nextProduct.title}
                </span>
                <span className="text-[11px] font-montserrat opacity-85">
                  {nextProduct.price}
                </span>
              </div>
            </motion.button>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSlider;
