import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ 
        opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        exit: { duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
