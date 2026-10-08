import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
      <img 
        src="/vastrika-logo.jpg" 
        alt="VASTRIKA Logo" 
        style={{ height: '80px', objectFit: 'contain', mixBlendMode: 'multiply' }} 
      />
    </Link>
  );
};

export default Logo;
