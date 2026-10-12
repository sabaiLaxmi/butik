// src/components/hero/ProductDetailsRight.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ProductDetailsRight component
 * Features:
 * - Price badge & size circles (S, M, L)
 * - Highlighted selected size
 * - Dynamic color harmony with product.accent
 */
const ProductDetailsRight = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState('M');
  const availableSizes = ['S', 'M', 'L'];

  return (
    <div className="flex lg:flex-col items-center justify-center gap-4 lg:gap-6 z-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-row lg:flex-col items-center gap-3 sm:gap-4 lg:gap-6 px-3 py-2 sm:px-4 sm:py-3 lg:p-4 rounded-2xl sm:rounded-3xl backdrop-blur-md bg-white/10 border border-white/20 shadow-md"
        >
          {/* Price Tag Circle / Indicator */}
          <div className="flex flex-col items-center text-center px-2">
            <span
              style={{ color: product.accent }}
              className="text-[10px] tracking-[0.2em] uppercase font-montserrat opacity-75 font-semibold"
            >
              Price
            </span>
            <span
              style={{ color: product.accent }}
              className="text-xl font-bold font-playfair tracking-tight"
            >
              {product.price}
            </span>
          </div>

          <div
            style={{ backgroundColor: `${product.accent}30` }}
            className="w-[1px] h-6 lg:w-8 lg:h-[1px]"
          />

          {/* Size Circles with Selected Highlighting */}
          <div className="flex flex-row lg:flex-col items-center gap-2 lg:gap-2.5">
            <span
              style={{ color: product.accent }}
              className="text-[10px] tracking-[0.2em] uppercase font-montserrat opacity-75 font-semibold"
            >
              Size
            </span>
            <div className="flex flex-row lg:flex-col gap-1.5 sm:gap-2">
              {availableSizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    style={{
                      backgroundColor: isSelected ? product.accent : 'transparent',
                      color: isSelected ? product.bg : product.accent,
                      borderColor: `${product.accent}50`,
                      borderRadius: '9999px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    className={`w-9 h-9 rounded-full border text-xs font-semibold font-montserrat transition-all duration-300 shadow-sm ${
                      isSelected
                        ? 'scale-110 shadow-md ring-2 ring-white/30 font-bold'
                        : 'hover:bg-white/15 hover:scale-105 opacity-80'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailsRight;
