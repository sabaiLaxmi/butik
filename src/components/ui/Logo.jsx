import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ 
        fontFamily: 'var(--font-heading)', 
        fontSize: '28px', 
        fontStyle: 'italic', 
        color: '#d4af37', 
        border: '1px solid #d4af37', 
        padding: '2px 8px', 
        lineHeight: 1 
      }}>
        VS
      </div>
      <div style={{ 
        fontFamily: 'var(--font-heading)', 
        fontSize: '22px', 
        letterSpacing: '0.15em', 
        fontWeight: 400, 
        color: 'var(--color-ink)' 
      }}>
        VASTRIKA
      </div>
    </div>
  );
};

export default Logo;
