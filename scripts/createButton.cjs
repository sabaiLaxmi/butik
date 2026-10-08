const fs = require('fs');
const path = require('path');

// 1. Create Button.jsx
const buttonCode = `import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Button = React.forwardRef(({ 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false, 
  to, 
  href, 
  children, 
  className = '', 
  style = {},
  ...props 
}, ref) => {
  
  const baseClasses = 'btn-base';
  const variantClasses = \`btn-\${variant}\`;
  const sizeClasses = \`btn-\${size}\`;
  const stateClasses = (disabled || loading) ? 'btn-disabled' : '';
  
  const classes = \`\${baseClasses} \${variantClasses} \${sizeClasses} \${stateClasses} \${className}\`.trim();

  const content = (
    <>
      <span className="btn-content" style={{ opacity: loading ? 0 : 1 }}>{children}</span>
      {loading && (
        <span className="btn-loader">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'currentColor', borderRadius: '50%' }}
          />
        </span>
      )}
    </>
  );

  if (to) {
    return <Link to={to} className={classes} style={style} ref={ref} {...props}>{content}</Link>;
  }
  
  if (href) {
    return <a href={href} className={classes} style={style} ref={ref} {...props}>{content}</a>;
  }

  return (
    <button className={classes} style={style} disabled={disabled || loading} ref={ref} {...props}>
      {content}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
`;

fs.mkdirSync('src/components/ui', { recursive: true });
fs.writeFileSync('src/components/ui/Button.jsx', buttonCode);

// 2. Update base.css
let baseCss = fs.readFileSync('src/styles/base.css', 'utf8');

const newStyles = `
/* Form elements & Button overrides */
button, input, select, textarea {
  appearance: none;
  border-radius: 0 !important;
  font-family: var(--font-body);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

@media (hover: none) {
  button, input, select, textarea {
    min-height: 48px;
  }
}

input, select, textarea {
  border: 1px solid var(--color-ink);
  background: transparent;
  padding: 12px;
  color: var(--color-ink);
}

input:focus-visible, select:focus-visible, textarea:focus-visible {
  outline: 1px solid var(--color-ink);
  outline-offset: 2px;
}

/* Button System */
.btn-base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 0;
  text-decoration: none;
  transition: color 0.4s ease, border-color 0.4s ease;
  border: none;
  background: none;
}

.btn-base:focus-visible {
  outline: 2px solid var(--color-ink);
  outline-offset: 2px;
}

.btn-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
}

/* Sizes */
.btn-sm { padding: 8px 16px; font-size: 10px; }
.btn-md { padding: 14px 28px; font-size: 12px; }
.btn-lg { padding: 20px 40px; font-size: 14px; }

/* Variants */
.btn-primary {
  background-color: var(--color-ink);
  color: var(--color-ivory);
  border: 1px solid var(--color-ink);
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-color: var(--color-stone);
  transform: translateX(-101%);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 0;
}

.btn-primary:hover:not(.btn-disabled)::before {
  transform: translateX(0);
}

.btn-primary .btn-content {
  position: relative;
  z-index: 1;
}

.btn-secondary {
  background-color: transparent;
  color: var(--color-ink);
  border: 1px solid var(--color-ink);
}

.btn-secondary::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-color: var(--color-ink);
  transform: translateX(-101%);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 0;
}

.btn-secondary:hover:not(.btn-disabled) {
  color: var(--color-ivory);
}

.btn-secondary:hover:not(.btn-disabled)::before {
  transform: translateX(0);
}

.btn-secondary .btn-content {
  position: relative;
  z-index: 1;
}

.btn-ghost {
  background-color: transparent;
  color: var(--color-ink);
  border: none;
  padding: 8px 0;
}

.btn-ghost::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; width: 100%; height: 1px;
  background-color: var(--color-ink);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s ease;
}

.btn-ghost:hover:not(.btn-disabled)::after {
  transform: scaleX(1);
  transform-origin: left;
}
`;

fs.writeFileSync('src/styles/base.css', baseCss + '\n' + newStyles);
console.log('Created Button and updated base.css');
