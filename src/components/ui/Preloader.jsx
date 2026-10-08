import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 0: Draw paths (0-3s)
    // Stage 1: Glow & Shimmer (3s-4s)
    // Stage 2: Text Reveal (4s-5s)
    // Stage 3: Hold (5s-6s)
    // Stage 4: Fade out (6s+)
    
    const t1 = setTimeout(() => setStage(1), 3000);
    const t2 = setTimeout(() => setStage(2), 3500);
    const t3 = setTimeout(() => setStage(3), 5000);
    const t4 = setTimeout(() => {
      setStage(4);
      setTimeout(onComplete, 1000); // Trigger unmount after fade out
    }, 6000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.8, duration: 2, ease: [0.25, 1, 0.5, 1] },
        opacity: { delay: i * 0.8, duration: 0.1 }
      }
    })
  };

  const textContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const letterAnim = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { ease: "easeOut", duration: 0.8 }
    }
  };

  return (
    <AnimatePresence>
      {stage < 4 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#0A0A0A',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Logo Container */}
          <div style={{ position: 'relative', width: '200px', height: '200px' }}>
            <motion.svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              initial="hidden"
              animate="visible"
              style={{
                filter: stage >= 1 ? 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))' : 'none',
                transition: 'filter 1s ease'
              }}
            >
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5D67A" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#AA7C11" />
                </linearGradient>
                <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="50%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
              </defs>

              {/* The "V" Left Pillar */}
              <motion.path
                d="M 60 40 L 100 160"
                stroke="url(#goldGrad)"
                strokeWidth="14"
                strokeLinecap="round"
                fill="none"
                variants={draw}
                custom={0}
              />
              
              {/* The "V" Right Ribbon */}
              <motion.path
                d="M 140 40 C 130 90, 115 130, 100 160"
                stroke="url(#goldGrad)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                variants={draw}
                custom={1}
              />

              {/* The Thread */}
              <motion.path
                d="M 0 120 C 40 130, 70 90, 100 160 C 130 230, 180 150, 150 90 C 140 70, 110 70, 130 40 C 150 10, 180 30, 160 60"
                stroke="#F5D67A"
                strokeWidth="1.5"
                fill="none"
                variants={draw}
                custom={1.5}
              />

              {/* The Needle */}
              <motion.path
                d="M 160 60 L 175 15 L 180 18 Z"
                fill="#D4AF37"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3, duration: 0.5, ease: "easeOut" }}
              />
            </motion.svg>

            {/* Shimmer overlay effect */}
            {stage >= 1 && (
              <motion.div
                initial={{ left: '-100%' }}
                animate={{ left: '200%' }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  width: '50px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  transform: 'skewX(-20deg)',
                  zIndex: 10
                }}
              />
            )}
          </div>

          {/* Text Reveal */}
          <div style={{ height: '40px', marginTop: '20px', overflow: 'hidden' }}>
            <AnimatePresence>
              {stage >= 2 && (
                <motion.div
                  variants={textContainer}
                  initial="hidden"
                  animate="visible"
                  style={{
                    display: 'flex',
                    gap: '4px',
                    fontFamily: 'var(--font-heading, serif)',
                    fontSize: '24px',
                    letterSpacing: '0.3em',
                    color: '#D4AF37',
                    textTransform: 'uppercase'
                  }}
                >
                  {Array.from("VASTRIKA").map((char, index) => (
                    <motion.span key={index} variants={letterAnim}>
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
