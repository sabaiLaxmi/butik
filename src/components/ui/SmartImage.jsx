import { useState } from 'react';
import { motion } from 'framer-motion';

const SmartImage = ({ 
  src, 
  alt, 
  aspectRatio, 
  eager = false, 
  srcSet, 
  sizes, 
  className = '', 
  style = {},
  fallbackSrc = 'https://placehold.co/800x1200/F9F8F6/1A1A1A?text=Image+Unavailable'
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'var(--color-ivory)',
    ...style
  };

  if (aspectRatio) {
    containerStyle.aspectRatio = aspectRatio;
  }

  return (
    <div className={className} style={containerStyle}>
      {!loaded && !error && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--color-ivory)', zIndex: 1 }} />
      )}
      <motion.img
        src={error ? fallbackSrc : src}
        alt={alt}
        srcSet={!error ? srcSet : undefined}
        sizes={!error ? sizes : undefined}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded || error ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          inset: 0,
          zIndex: 2
        }}
      />
    </div>
  );
};

export default SmartImage;
