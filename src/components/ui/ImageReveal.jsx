import { motion } from 'framer-motion';

const ImageReveal = ({ src, alt, aspectRatio = '3/4', delay = 0 }) => {
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio, overflow: 'hidden', backgroundColor: 'var(--color-ivory)' }}>
      <motion.div
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
      >
        <motion.img 
          src={src} 
          alt={alt} 
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </div>
  );
};

export default ImageReveal;
