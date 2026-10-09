import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
      <img 
        src="/vastrika-logo.jpg" 
        alt="VASTRIKA Logo" 
        style={{ height: '60px', objectFit: 'contain', mixBlendMode: 'multiply' }} 
      />
    </div>
  );
};

export default Logo;
