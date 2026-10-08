import React from 'react';
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
  const variantClasses = `btn-${variant}`;
  const sizeClasses = `btn-${size}`;
  const stateClasses = (disabled || loading) ? 'btn-disabled' : '';
  
  const classes = `${baseClasses} ${variantClasses} ${sizeClasses} ${stateClasses} ${className}`.trim();

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
