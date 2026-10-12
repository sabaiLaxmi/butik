// src/components/hero/ProductText.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';

/**
 * ProductText component (Left block)
 * Features:
 * - Staggered lines: slides up 30px, fades in with 0.1s incremental delay
 * - Smooth color adaptation to product.accent
 * - Prev / Next navigational arrows on the left
 * - Luxury typography using Playfair Display & Montserrat
 */
const ProductText = ({
  product,
  onPrev,
  onNext,
  currentIndex,
  totalCount
}) => {
  const lineVariants = {
    initial: { y: 30, opacity: 0 },
    animate: (customDelay) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: customDelay,
        ease: [0.22, 1, 0.36, 1]
      }
    }),
    exit: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.35, ease: 'easeIn' }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left max-w-xl z-20 w-full mx-auto md:mx-0 min-w-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full min-w-0 flex flex-col items-center md:items-start space-y-1 sm:space-y-2 md:space-y-3"
        >
          {/* Badge & Collection Index */}
          <motion.div
            custom={0.0}
            variants={lineVariants}
            className="flex items-center gap-2 sm:gap-3"
          >
            <span
              style={{
                color: product.accent,
                borderColor: `${product.accent}40`,
                borderRadius: '9999px'
              }}
              className="text-[9px] sm:text-xs tracking-[0.2em] uppercase font-montserrat font-semibold px-2.5 py-0.5 border backdrop-blur-sm bg-white/10"
            >
              {product.badge || 'Haute Couture'}
            </span>
            <span
              style={{ color: product.accent }}
              className="text-[10px] sm:text-xs tracking-widest opacity-60 font-montserrat"
            >
              0{currentIndex + 1} / 0{totalCount}
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            custom={0.1}
            variants={lineVariants}
            style={{ color: product.accent }}
            className="text-[10px] sm:text-xs md:text-sm tracking-[0.14em] uppercase font-montserrat font-medium opacity-90"
          >
            {product.tagline}
          </motion.p>

          {/* Title in Playfair Display */}
          <motion.h1
            custom={0.2}
            variants={lineVariants}
            style={{ color: product.accent }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] xl:text-5xl font-serif font-bold leading-[1.14] tracking-tight font-playfair drop-shadow-sm break-words"
          >
            {product.title}
          </motion.h1>

          {/* Description */}
          <motion.div
            custom={0.3}
            variants={lineVariants}
            style={{ color: product.accent }}
            className="text-[11px] sm:text-sm leading-relaxed opacity-85 font-montserrat max-w-md line-clamp-3 sm:line-clamp-none whitespace-pre-line px-2 sm:px-0"
          >
            {product.description}
          </motion.div>

          {/* Price, Action, & Navigation */}
          <motion.div
            custom={0.4}
            variants={lineVariants}
            className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 md:gap-4 pt-1"
          >
            {/* Price */}
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span
                style={{ color: product.accent }}
                className="text-xl sm:text-2xl md:text-3xl font-serif font-bold font-playfair tracking-tight"
              >
                {product.price}
              </span>
              {product.oldPrice && (
                <span
                  style={{ color: product.accent }}
                  className="text-xs sm:text-sm line-through opacity-50 font-montserrat"
                >
                  {product.oldPrice}
                </span>
              )}
            </div>

            {/* "Shop now" button */}
            <Link
              to="/shop"
              style={{
                backgroundColor: product.accent,
                color: product.bg,
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
              }}
              className="group relative px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-[0.12em] uppercase font-montserrat overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
                Shop Now
              </span>
            </Link>

            {/* Prev/Next arrows */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous garment"
                style={{
                  color: product.accent,
                  borderColor: `${product.accent}35`,
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border backdrop-blur-md bg-white/10 transition-all duration-300 hover:bg-white/25 hover:scale-110 active:scale-90"
              >
                <HiArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Next garment"
                style={{
                  color: product.accent,
                  borderColor: `${product.accent}35`,
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border backdrop-blur-md bg-white/10 transition-all duration-300 hover:bg-white/25 hover:scale-110 active:scale-90"
              >
                <HiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProductText;
