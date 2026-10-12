import React from 'react';

/**
 * Reusable Card component for Atelier Info Pages
 * Specifications:
 * - bg-white rounded-2xl border border-[#EADBD5] p-6 md:p-8 overflow-hidden min-w-0 box-border
 * - Highlighted variant: bg-[#FAF2EF] p-6 rounded-2xl border border-[#EADBD5]
 * - Ensures all content stays at least 24px (p-6) from card boundaries
 */
export const Card = ({
  children,
  className = '',
  highlight = false,
  ...props
}) => {
  return (
    <div
      className={`rounded-2xl border overflow-hidden min-w-0 box-border transition-shadow duration-200 ${
        highlight
          ? 'bg-[#FAF2EF] border-[#EADBD5] p-6'
          : 'bg-white border-[#EADBD5] shadow-[0_10px_40px_rgba(90,30,43,0.06)] p-6 md:p-8'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
