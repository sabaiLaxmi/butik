import { motion } from 'framer-motion';

export const Reveal = ({ children, delay = 0, width = "fit-content", mask = false }) => {
  return (
    <div style={{ width, position: 'relative', overflow: mask ? 'hidden' : 'visible' }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: mask ? '100%' : 20 },
          visible: { opacity: 1, y: 0 }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const RevealGroup = ({ children, stagger = 0.1, delay = 0 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};
