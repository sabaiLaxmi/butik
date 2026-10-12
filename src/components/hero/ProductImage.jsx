// src/components/hero/ProductImage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOptimizedImageUrl } from '../../data/products';

/**
 * ProductImage component
 * Features:
 * - Direct background placement (no card, no border, no white box)
 * - Required classes: "h-[320px] md:h-[420px] lg:h-[520px] w-auto object-contain relative z-10"
 * - Framer Motion slide + scale + rotate enter/exit transition
 * - Synchronized floating effect for cloth (y: [0, -12, 0])
 * - Code-made ground shadow ellipse in sync: scaleX [1, 0.88, 1], opacity [0.3, 0.18, 0.3]
 * - Preloads all images on mount with 3s retry on failure
 */
const ProductImage = ({ product, allProducts = [] }) => {
  const [imgSrc, setImgSrc] = useState(getOptimizedImageUrl(product?.img));

  // Update image source when product changes
  useEffect(() => {
    if (product?.img) {
      setImgSrc(getOptimizedImageUrl(product.img));
    }
  }, [product]);

  // Preload all product images on mount using new Image(), with a 3s retry if any fails
  useEffect(() => {
    const retryTimers = [];

    allProducts.forEach((item) => {
      const preloadUrl = getOptimizedImageUrl(item.img);
      const img = new Image();
      img.src = preloadUrl;

      img.onerror = () => {
        // Retry once after 3s with f_png safeguard
        const timer = setTimeout(() => {
          const retryImg = new Image();
          retryImg.src = getOptimizedImageUrl(item.img, true);
        }, 3000);
        retryTimers.push(timer);
      };
    });

    return () => {
      retryTimers.forEach((timer) => clearTimeout(timer));
    };
  }, [allProducts]);

  // Fallback to f_png if image ever encounters an error
  const handleImageError = () => {
    if (product?.img) {
      setImgSrc(getOptimizedImageUrl(product.img, true));
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* 
        Cloth enters and exits using AnimatePresence mode="wait"
        Initial: {x:220, opacity:0, scale:0.85, rotate:4}
        Animate: {x:0, opacity:1, scale:1, rotate:0}
        Exit: {x:-220, opacity:0, scale:0.85, rotate:-4}
      */}
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ x: 220, opacity: 0, scale: 0.85, rotate: 4 }}
          animate={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
          exit={{ x: -220, opacity: 0, scale: 0.85, rotate: -4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center"
        >
          {/* Continuous floating animation: y: [0, -12, 0] over 3s easeInOut */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="relative flex items-center justify-center"
          >
            <img
              src={imgSrc}
              alt={product.title}
              onError={handleImageError}
              loading="eager"
              decoding="async"
              className="h-[210px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[520px] max-h-[38vh] sm:max-h-[44vh] lg:max-h-none w-auto object-contain relative z-10 drop-shadow-sm pointer-events-none"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* 
        Ground shadow:
        Absolute ellipse, w-[60%] max-w-[260px] h-[28px], rounded-[50%],
        bg-black/30, blur-xl, bottom center, slightly overlapping cloth's hem.
        Animates in sync with float: scaleX [1, 0.88, 1], opacity [0.3, 0.18, 0.3]
      */}
      <motion.div
        animate={{
          scaleX: [1, 0.88, 1],
          opacity: [0.3, 0.18, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ borderRadius: '50%' }}
        className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 w-[55%] max-w-[160px] sm:max-w-[220px] md:max-w-[260px] h-[16px] sm:h-[22px] md:h-[28px] bg-black/30 blur-lg sm:blur-xl pointer-events-none z-0"
      />
    </div>
  );
};

export default ProductImage;
