import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
      <img 
        src="/vastrika-logo.jpg" 
        alt="VASTRIKA Logo" 
        style={{ height: '130px', margin: '-25px 0', objectFit: 'contain', mixBlendMode: 'multiply', transform: 'scale(1.2)' }} 
      />
    </Link>
  );
};

export default Logo;
