import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
      <span style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 600,
        fontSize: '2rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--color-ink)',
        lineHeight: 1
      }}>
        ÉLAN
      </span>
      <div style={{
        marginTop: '8px',
        width: '100%',
        height: '1px',
        backgroundColor: 'var(--color-gold)'
      }} />
    </Link>
  );
};

export default Logo;
