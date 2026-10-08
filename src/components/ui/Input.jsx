import { useState } from 'react';
import { motion } from 'framer-motion';

const Input = ({ label, type = "text", value, onChange, error, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: error ? 'var(--space-6)' : 'var(--space-4)' }}>
      <label
        style={{
          position: 'absolute',
          left: 0,
          top: isActive ? '-12px' : '10px',
          fontSize: isActive ? '10px' : '12px',
          color: isActive ? 'var(--color-stone)' : 'var(--color-ink)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          pointerEvents: 'none',
          transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          width: '100%',
          padding: '10px 0',
          background: 'transparent',
          border: 'none',
          borderBottom: `1px solid ${error ? '#e74c3c' : isFocused ? 'var(--color-ink)' : 'var(--color-stone)'}`,
          outline: 'none',
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          color: 'var(--color-ink)',
          transition: 'border-color 0.3s ease'
        }}
        {...props}
      />
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ position: 'absolute', left: 0, bottom: '-20px', fontSize: '10px', color: '#e74c3c' }}
        >
          {error}
        </motion.span>
      )}
    </div>
  );
};

export default Input;
