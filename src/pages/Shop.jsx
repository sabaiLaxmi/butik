import { navFilters } from '../data/categories';
import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import { Reveal, RevealGroup } from '../components/ui/Reveal';
import productsData from '../data/products.json';
import { Search, Heart } from 'lucide-react';

import { formatPrice } from '../utils/formatPrice';

const ProductCard = ({ product, index, isBestsellerView = false, isSaleView = false, isNewView = false }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const hoverImage = product.images[1] || product.images[0];
  const discountPercent = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  // Check if item was added within the last 30 days
  const isRecentNew = useMemo(() => {
    if (!product.addedAt) return product.tags?.includes('new');
    const addedTime = new Date(product.addedAt).getTime();
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    return (Date.now() - addedTime) <= thirtyDaysMs;
  }, [product.addedAt, product.tags]);

  if (isBestsellerView) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <Link 
          to={`/shop/${product.id}`} 
          className="bestseller-product-card group" 
          style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          {/* Card Top: Soft blush background with cutout image & ground shadow */}
          <div 
            style={{ 
              position: 'relative', 
              width: '100%', 
              aspectRatio: '3/4', 
              backgroundColor: '#F3E6E2', 
              borderRadius: '16px',
              overflow: 'hidden', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}
          >
            {/* Wishlist Heart Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsWishlisted(prev => !prev);
              }}
              aria-label="Wishlist"
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                zIndex: 10,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, background-color 0.2s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <Heart 
                size={18} 
                strokeWidth={1.7} 
                color={isWishlisted ? '#E11D48' : 'var(--color-ink)'} 
                fill={isWishlisted ? '#E11D48' : 'transparent'} 
                style={{ transition: 'all 0.2s ease' }}
              />
            </button>

            {/* Cutout Image with Lift & Shadow animation container */}
            <div 
              className="bestseller-img-container"
              style={{ 
                position: 'relative', 
                width: '82%', 
                height: '82%', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="bestseller-cutout-img"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain', 
                  zIndex: 2,
                  transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                  filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.08))'
                }}
              />
              {/* Code-made Ground Shadow */}
              <div 
                className="bestseller-ground-shadow"
                style={{
                  position: 'absolute',
                  bottom: '6px',
                  width: '68%',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 0, 0, 0.22)',
                  filter: 'blur(10px)',
                  transform: 'scale(1)',
                  transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease',
                  zIndex: 1
                }}
              />
            </div>
          </div>

          {/* Card Info: Name & Price */}
          <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
              <h4 style={{ fontSize: '1rem', margin: 0, fontWeight: 500, lineHeight: 1.35, color: 'var(--color-ink)' }}>
                {product.name}
              </h4>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
              <span className="text-label" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-ink)' }}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-label" style={{ textDecoration: 'line-through', color: 'var(--color-stone)', fontSize: '0.85em' }}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="text-label" style={{ color: 'var(--color-stone)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
              {product.type || product.department}
            </p>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
    >
      <Link to={`/shop/${product.id}`} className="product-card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', backgroundColor: 'var(--color-ivory)', borderRadius: isSaleView ? '8px' : '0px' }}>
          {/* Badges in top-left corner */}
          {discountPercent ? (
            <span 
              style={{ 
                position: 'absolute', 
                top: '10px', 
                left: '10px', 
                zIndex: 10, 
                backgroundColor: 'var(--color-discount)', 
                color: '#fff', 
                fontSize: '11px', 
                fontWeight: 600, 
                padding: '4px 8px', 
                borderRadius: '4px',
                letterSpacing: '0.05em',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
              }}
            >
              -{discountPercent}%
            </span>
          ) : isRecentNew && (
            <span 
              style={{ 
                position: 'absolute', 
                top: '10px', 
                left: '10px', 
                zIndex: 10, 
                backgroundColor: '#8B5A2B', 
                color: '#fff', 
                fontSize: '10px', 
                fontWeight: 700, 
                padding: '4px 8px', 
                borderRadius: '4px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
              }}
            >
              NEW
            </span>
          )}

          <img 
            src={product.images[0]} 
            alt={product.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, transition: 'opacity 0.6s var(--ease-primary)', zIndex: 2 }}
            className="primary-image"
          />
          <img 
            src={hoverImage} 
            alt={`${product.name} alternate`} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, zIndex: 1 }}
          />
          <style>{`
            .product-card-link:hover .primary-image { opacity: 0; }
          `}</style>
        </div>
        <div style={{ marginTop: 'var(--space-3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
            <h4 style={{ fontSize: '1.125rem', margin: 0, fontWeight: 400 }}>{product.name}</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {product.originalPrice ? (
                <>
                  <span className="text-label" style={{ fontWeight: 600, color: 'var(--color-discount)' }}>{formatPrice(product.price)}</span>
                  <span className="text-label" style={{ textDecoration: 'line-through', color: 'var(--color-stone)', fontSize: '0.85em' }}>{formatPrice(product.originalPrice)}</span>
                </>
              ) : (
                <span className="text-label" style={{ fontWeight: 500 }}>{formatPrice(product.price)}</span>
              )}
            </div>
          </div>
          <p className="text-label" style={{ color: 'var(--color-stone)' }}>{product.type || product.department}</p>
        </div>
      </Link>
    </motion.div>
  );
};

const categoryTitleMap = {
  "new": "New Arrivals",
  "bestsellers": "Bestsellers",
  "sale": "Sale",
  "lehengas": "Lehengas",
  "lehenga": "Lehengas",
  "sherwanis": "Sherwanis",
  "sherwani": "Sherwanis",
  "sarees": "Sarees",
  "saree": "Sarees",
  "kurta-sets": "Kurta Sets",
  "kurta": "Kurta Sets",
  "accessories": "Accessories"
};

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';
  const categoryKey = activeCategory.toLowerCase();
  const displayCategory = activeCategory === 'All' 
    ? 'The Collection' 
    : (categoryTitleMap[categoryKey] || (navFilters[activeCategory] ? activeCategory + 's' : activeCategory));

  useEffect(() => {
    document.title = `${displayCategory} | VASTRIKA`;
  }, [displayCategory]);

  const initialSearch = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch !== null) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);
  const [sortType, setSortType] = useState('newest'); // newest, price-low, price-high
  const [priceRange, setPriceRange] = useState(100000); // Max price
  const gridSectionRef = useRef(null);

  // Countdown timer for Sale page (7 days from now)
  const [timeLeft, setTimeLeft] = useState({ days: 6, hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    // Target date set to 7 days from initial mount
    const targetDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime();

    const calculateTime = () => {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const timerInterval = setInterval(calculateTime, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const chips = [
    { label: 'All', value: 'All' },
    { label: 'New Arrivals', value: 'New' },
    { label: 'Sale', value: 'Sale' },
    { label: 'Bestsellers', value: 'Bestsellers' },
    { label: 'Lehengas', value: 'Lehenga' },
    { label: 'Sarees', value: 'Saree' },
    { label: 'Sherwanis', value: 'Sherwani' },
    { label: 'Kurta Sets', value: 'Kurta' },
    { label: 'Accessories', value: 'Accessories' }
  ];

  const filteredProducts = useMemo(() => {
    let result = [...productsData];

    // Filter by Tab or Category from URL
    if (activeCategory !== 'All') {
      const filterConfig = navFilters[activeCategory];
      
      if (filterConfig) {
        // Advanced filtering based on categories.js
        result = result.filter(p => {
          if (filterConfig.filterBy === 'tags') {
            return p.tags && p.tags.includes(filterConfig.value);
          } else if (filterConfig.filterBy === 'type') {
            if (Array.isArray(filterConfig.value)) {
              return filterConfig.value.includes(p.type);
            }
            return p.type === filterConfig.value;
          } else if (filterConfig.filterBy === 'department') {
            return p.department === filterConfig.value;
          }
          return true;
        });
      } else {
        // Fallback for regular tabs (Women, Men, Accessories)
        result = result.filter(p => p.department === activeCategory);
      }
    }

    // Filter by Search
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Filter by Price
    result = result.filter(p => p.price <= priceRange);

    // Sort: Default 'newest' sorts by addedAt date descending (newest first)
    if (sortType === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortType === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortType === 'newest') {
      result.sort((a, b) => {
        const timeA = a.addedAt ? new Date(a.addedAt).getTime() : 0;
        const timeB = b.addedAt ? new Date(b.addedAt).getTime() : 0;
        if (timeB !== timeA) return timeB - timeA;
        return b.id.localeCompare(a.id);
      });
    }

    return result;
  }, [activeCategory, searchQuery, sortType, priceRange]);

  const categoryVideos = {
    Lehenga: "https://res.cloudinary.com/snuwehqj/video/upload/v1791449773/gemini_generated_video_ae08ed5a.mp4",
    Sherwani: "https://res.cloudinary.com/snuwehqj/video/upload/v1791450724/gemini_generated_video_61a8bf7f.mp4",
    Saree: "https://res.cloudinary.com/snuwehqj/video/upload/v1791775290/gemini_generated_video_e326f6f9.mp4",
    Kurta: "https://res.cloudinary.com/snuwehqj/video/upload/image-to-video/i2v_b818191cb595402183b9a33ce809f3d1.mp4",
    Accessories: "https://res.cloudinary.com/snuwehqj/video/upload/image-to-video/i2v_27e5399204234111b6174edc294ce213.mp4"
  };
  const activeVideo = categoryVideos[activeCategory];
  const isBestsellerCategory = activeCategory.toLowerCase() === 'bestsellers';
  const isSaleCategory = activeCategory.toLowerCase() === 'sale';
  const isNewCategory = activeCategory.toLowerCase() === 'new';

  return (
    <PageTransition>
      <section style={{ 
        paddingTop: activeVideo ? 'var(--space-12)' : 'var(--space-16)', 
        paddingBottom: activeVideo ? 'var(--space-12)' : 'var(--space-8)'
      }}>
        <div className="container">
          {activeVideo ? (
            <div style={{
              position: 'relative',
              width: '100%',
              minHeight: '500px',
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
              {/* Background Video */}
              <video 
                src={activeVideo}
                autoPlay 
                loop 
                muted 
                playsInline
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0
                }}
              />
              {/* Overlay for better text readability */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                zIndex: 1
              }} />

              {/* Text Content */}
              <div style={{ 
                position: 'relative', 
                zIndex: 2, 
                textAlign: 'center', 
                padding: '40px',
                color: 'var(--color-white)' 
              }}>
                <RevealGroup stagger={0.1}>
                  <Reveal mask>
                    <div style={{ marginBottom: '16px' }}>
                      <span className="text-label" style={{ color: 'rgba(255,255,255,0.8)', letterSpacing: '0.15em', fontWeight: 600 }}>{activeCategory}</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', marginBottom: 'var(--space-6)', textTransform: 'capitalize', color: 'var(--color-white)' }}>
                      {displayCategory}
                    </h1>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                      Discover our meticulously curated selection of timeless pieces, designed for intentional living.
                    </p>
                  </Reveal>
                </RevealGroup>
              </div>
            </div>
          ) : isBestsellerCategory ? (
            /* Custom Bestsellers Hero Banner Card */
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'relative',
                background: 'linear-gradient(135deg, rgba(243, 230, 226, 0.95) 0%, rgba(249, 243, 240, 0.8) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '32px',
                border: '1px solid rgba(255, 255, 255, 0.7)',
                boxShadow: '0 20px 50px rgba(139, 90, 43, 0.08)',
                padding: 'clamp(32px, 6vw, 64px)',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                alignItems: 'center',
                gap: '40px',
                overflow: 'hidden'
              }}
            >
              {/* Left-aligned text content */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', zIndex: 10 }}>
                <motion.div
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  <span 
                    className="text-label" 
                    style={{ 
                      color: 'var(--color-ink)', 
                      letterSpacing: '0.2em', 
                      fontWeight: 700, 
                      fontSize: '0.85rem',
                      display: 'inline-block',
                      marginBottom: '12px',
                      textTransform: 'uppercase'
                    }}
                  >
                    BESTSELLERS
                  </span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                  style={{ 
                    fontSize: 'clamp(2.75rem, 6.5vw, 4.75rem)', 
                    textAlign: 'left', 
                    marginBottom: 'var(--space-4)', 
                    color: 'var(--color-ink)',
                    lineHeight: 1.08,
                    fontWeight: 600,
                    letterSpacing: '-0.02em'
                  }}
                >
                  Bestsellers
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  style={{ 
                    textAlign: 'left', 
                    maxWidth: '480px', 
                    margin: 0, 
                    fontSize: '1.15rem', 
                    color: 'var(--color-ink)', 
                    opacity: 0.82,
                    lineHeight: 1.6
                  }}
                >
                  Discover our meticulously curated selection of timeless pieces, designed for intentional living.
                </motion.p>
              </div>

              {/* Right-aligned 3 transparent cloth cutout images overlapping like a fan */}
              <div 
                style={{ 
                  position: 'relative', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  minHeight: '340px',
                  width: '100%',
                  zIndex: 5
                }}
              >
                {/* Left Cutout: Saree / Lehnga */}
                <motion.div
                  initial={{ opacity: 0, x: -40, rotate: -15, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, rotate: -8, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute',
                    left: 'calc(50% - 150px)',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/snuwehqj/image/upload/v1791704710/sareeset.png"
                    alt="Saree Cutout"
                    style={{
                      height: '220px',
                      width: 'auto',
                      objectFit: 'contain',
                      display: 'block'
                    }}
                  />
                  {/* Blurred ellipse shadow */}
                  <div 
                    style={{
                      width: '110px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 0, 0.20)',
                      filter: 'blur(16px)',
                      marginTop: '-8px'
                    }}
                  />
                </motion.div>

                {/* Right Cutout: Sherwani */}
                <motion.div
                  initial={{ opacity: 0, x: 40, rotate: 15, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, rotate: 8, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute',
                    right: 'calc(50% - 150px)',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/snuwehqj/image/upload/v1791704696/sher.png"
                    alt="Sherwani Cutout"
                    style={{
                      height: '220px',
                      width: 'auto',
                      objectFit: 'contain',
                      display: 'block'
                    }}
                  />
                  {/* Blurred ellipse shadow */}
                  <div 
                    style={{
                      width: '110px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 0, 0.20)',
                      filter: 'blur(16px)',
                      marginTop: '-8px'
                    }}
                  />
                </motion.div>

                {/* Center Cutout: Bigger Lehenga (h-[300px]) with hover lift */}
                <motion.div
                  initial={{ opacity: 0, y: 35, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -12, scale: 1.03 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'relative',
                    zIndex: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/snuwehqj/image/upload/v1791704695/lehngar.png"
                    alt="Lehenga Cutout"
                    style={{
                      height: '300px',
                      width: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                      filter: 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.12))'
                    }}
                  />
                  {/* Blurred ellipse shadow */}
                  <div 
                    style={{
                      width: '140px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 0, 0.20)',
                      filter: 'blur(18px)',
                      marginTop: '-6px'
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ) : isSaleCategory ? (
            /* Custom Season Sale Hero Banner Card */
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'relative',
                background: 'linear-gradient(135deg, #F3E1DB 0%, #E9C9C4 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '32px',
                border: '1px solid rgba(255, 255, 255, 0.7)',
                boxShadow: '0 20px 50px rgba(126, 79, 79, 0.12)',
                padding: 'clamp(32px, 6vw, 64px)',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                alignItems: 'center',
                gap: '40px',
                overflow: 'hidden'
              }}
            >
              {/* Left-aligned text content */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', zIndex: 10 }}>
                {/* Eyebrow & Pill Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-label" 
                    style={{ 
                      color: 'var(--color-ink)', 
                      letterSpacing: '0.2em', 
                      fontWeight: 700, 
                      fontSize: '0.85rem',
                      textTransform: 'uppercase'
                    }}
                  >
                    SEASON SALE
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{
                      backgroundColor: 'var(--color-discount)',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      padding: '5px 12px',
                      borderRadius: '9999px',
                      textTransform: 'uppercase',
                      boxShadow: '0 4px 12px rgba(126, 79, 79, 0.25)'
                    }}
                  >
                    UP TO 40% OFF
                  </motion.span>
                </div>

                {/* Heading */}
                <motion.h1
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  style={{ 
                    fontSize: 'clamp(3rem, 7vw, 5.25rem)', 
                    textAlign: 'left', 
                    marginBottom: 'var(--space-4)', 
                    color: 'var(--color-ink)',
                    lineHeight: 1.05,
                    fontWeight: 600,
                    letterSpacing: '-0.02em'
                  }}
                >
                  Sales
                </motion.h1>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  style={{ 
                    textAlign: 'left', 
                    maxWidth: '460px', 
                    margin: 0, 
                    fontSize: '1.15rem', 
                    color: 'var(--color-ink)', 
                    opacity: 0.85,
                    lineHeight: 1.6,
                    marginBottom: '28px'
                  }}
                >
                  Handpicked festive pieces at special prices. Limited stock.
                </motion.p>

                {/* Countdown Timer (Days, Hours, Minutes) */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    marginBottom: '32px' 
                  }}
                >
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    padding: '8px 14px',
                    borderRadius: '12px',
                    minWidth: '64px',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
                  }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-ink)', lineHeight: 1 }}>
                      {String(timeLeft.days).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-stone)', marginTop: '4px' }}>
                      Days
                    </span>
                  </div>

                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-stone)' }}>:</span>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    padding: '8px 14px',
                    borderRadius: '12px',
                    minWidth: '64px',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
                  }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-ink)', lineHeight: 1 }}>
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-stone)', marginTop: '4px' }}>
                      Hours
                    </span>
                  </div>

                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-stone)' }}>:</span>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    padding: '8px 14px',
                    borderRadius: '12px',
                    minWidth: '64px',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
                  }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-ink)', lineHeight: 1 }}>
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-stone)', marginTop: '4px' }}>
                      Mins
                    </span>
                  </div>
                </motion.div>

                {/* Shop the Sale button (smooth scroll) */}
                <motion.button
                  type="button"
                  onClick={() => {
                    gridSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    backgroundColor: 'var(--color-ink)',
                    color: 'var(--color-white)',
                    border: 'none',
                    padding: '14px 32px',
                    borderRadius: '40px',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                    transition: 'box-shadow 0.2s ease'
                  }}
                >
                  Shop the Sale
                </motion.button>
              </div>

              {/* Right-aligned 3 transparent cutout cloths overlapping like a fan with discount tags */}
              <div 
                style={{ 
                  position: 'relative', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  minHeight: '360px',
                  width: '100%',
                  zIndex: 5
                }}
              >
                {/* Left Cutout: Saree (-35%) */}
                <motion.div
                  initial={{ opacity: 0, x: -45, rotate: -16, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, rotate: -8, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute',
                    left: 'calc(50% - 155px)',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <img
                      src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto,q_auto,h_700/v1791704710/sareeset.png"
                      alt="Saree Cutout"
                      style={{
                        height: '230px',
                        width: 'auto',
                        objectFit: 'contain',
                        display: 'block'
                      }}
                    />
                    {/* Discount Tag */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '8px',
                      backgroundColor: 'var(--color-discount)',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                    }}>
                      -35%
                    </div>
                  </div>
                  {/* Blurred ellipse shadow */}
                  <div 
                    style={{
                      width: '110px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 0, 0.20)',
                      filter: 'blur(16px)',
                      marginTop: '-8px'
                    }}
                  />
                </motion.div>

                {/* Right Cutout: Kurta Set (-30%) */}
                <motion.div
                  initial={{ opacity: 0, x: 45, rotate: 16, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, rotate: 8, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute',
                    right: 'calc(50% - 155px)',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <img
                      src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto,q_auto,h_700/v1791704697/kurtaset.png"
                      alt="Kurta Set Cutout"
                      style={{
                        height: '230px',
                        width: 'auto',
                        objectFit: 'contain',
                        display: 'block'
                      }}
                    />
                    {/* Discount Tag */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '8px',
                      backgroundColor: 'var(--color-discount)',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                    }}>
                      -30%
                    </div>
                  </div>
                  {/* Blurred ellipse shadow */}
                  <div 
                    style={{
                      width: '110px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 0, 0.20)',
                      filter: 'blur(16px)',
                      marginTop: '-8px'
                    }}
                  />
                </motion.div>

                {/* Center Cutout: Bigger Lehenga (-40%) */}
                <motion.div
                  initial={{ opacity: 0, y: 35, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -12, scale: 1.03 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'relative',
                    zIndex: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <img
                      src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto,q_auto,h_700/v1791704695/lehngar.png"
                      alt="Lehenga Cutout"
                      style={{
                        height: '305px',
                        width: 'auto',
                        objectFit: 'contain',
                        display: 'block',
                        filter: 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.12))'
                      }}
                    />
                    {/* Discount Tag */}
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'var(--color-discount)',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                    }}>
                      -40%
                    </div>
                  </div>
                  {/* Blurred ellipse shadow */}
                  <div 
                    style={{
                      width: '145px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 0, 0.20)',
                      filter: 'blur(18px)',
                      marginTop: '-6px'
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ) : isNewCategory ? (
            /* Custom New Arrivals Hero Banner Card */
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'relative',
                background: 'linear-gradient(135deg, #F5EBDD 0%, #EBDCD3 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '32px',
                border: '1px solid rgba(255, 255, 255, 0.7)',
                boxShadow: '0 20px 50px rgba(139, 90, 43, 0.08)',
                padding: 'clamp(32px, 6vw, 64px)',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                alignItems: 'center',
                gap: '40px',
                overflow: 'hidden'
              }}
            >
              {/* Left-aligned text content */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', zIndex: 10 }}>
                {/* Eyebrow & Pill Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-label" 
                    style={{ 
                      color: 'var(--color-ink)', 
                      letterSpacing: '0.2em', 
                      fontWeight: 700, 
                      fontSize: '0.85rem',
                      textTransform: 'uppercase'
                    }}
                  >
                    JUST LANDED
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{
                      backgroundColor: '#6B0F1A', // deep maroon
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      padding: '5px 12px',
                      borderRadius: '9999px',
                      textTransform: 'uppercase',
                      boxShadow: '0 4px 12px rgba(107, 15, 26, 0.25)'
                    }}
                  >
                    NEW THIS WEEK
                  </motion.span>
                </div>

                {/* Heading */}
                <motion.h1
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  style={{ 
                    fontSize: 'clamp(3rem, 7vw, 5.25rem)', 
                    textAlign: 'left', 
                    marginBottom: 'var(--space-4)', 
                    color: 'var(--color-ink)',
                    lineHeight: 1.05,
                    fontWeight: 600,
                    letterSpacing: '-0.02em'
                  }}
                >
                  New Arrivals
                </motion.h1>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  style={{ 
                    textAlign: 'left', 
                    maxWidth: '460px', 
                    margin: 0, 
                    fontSize: '1.15rem', 
                    color: 'var(--color-ink)', 
                    opacity: 0.85,
                    lineHeight: 1.6,
                    marginBottom: '28px'
                  }}
                >
                  Fresh from the atelier. Be the first to wear this season's newest pieces.
                </motion.p>

                {/* Shop the Collection button (smooth scroll) */}
                <motion.button
                  type="button"
                  onClick={() => {
                    gridSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    backgroundColor: 'var(--color-ink)',
                    color: 'var(--color-white)',
                    border: 'none',
                    padding: '14px 32px',
                    borderRadius: '40px',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                    transition: 'box-shadow 0.2s ease'
                  }}
                >
                  Shop the Collection
                </motion.button>
              </div>

              {/* Right-aligned 2 transparent cutout cloths with small NEW tags and blurred ellipse shadows */}
              <div 
                style={{ 
                  position: 'relative', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  minHeight: '360px',
                  width: '100%',
                  zIndex: 5
                }}
              >
                {/* Left/Rear Cutout: Sherwani */}
                <motion.div
                  initial={{ opacity: 0, x: -40, rotate: -12, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, rotate: -6, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute',
                    left: 'calc(50% - 130px)',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <img
                      src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto,q_auto,h_700/v1791704696/sher.png"
                      alt="Sherwani New Arrival"
                      style={{
                        height: '240px',
                        width: 'auto',
                        objectFit: 'contain',
                        display: 'block'
                      }}
                    />
                    {/* Small NEW Tag */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '8px',
                      backgroundColor: '#8B5A2B',
                      color: '#ffffff',
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      letterSpacing: '0.08em',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                    }}>
                      NEW
                    </div>
                  </div>
                  {/* Blurred ellipse shadow */}
                  <div 
                    style={{
                      width: '115px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 0, 0.20)',
                      filter: 'blur(16px)',
                      marginTop: '-8px'
                    }}
                  />
                </motion.div>

                {/* Right/Front Cutout: Pastel Aqua Fishtail Lehenga */}
                <motion.div
                  initial={{ opacity: 0, y: 35, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'relative',
                    left: '40px',
                    zIndex: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <img
                      src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto,q_auto,h_700/v1791704699/fish_1.png"
                      alt="Fishtail Lehenga New Arrival"
                      style={{
                        height: '310px',
                        width: 'auto',
                        objectFit: 'contain',
                        display: 'block',
                        filter: 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.12))'
                      }}
                    />
                    {/* Small NEW Tag */}
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      right: '12px',
                      backgroundColor: '#8B5A2B',
                      color: '#ffffff',
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      letterSpacing: '0.08em',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                    }}>
                      NEW
                    </div>
                  </div>
                  {/* Blurred ellipse shadow */}
                  <div 
                    style={{
                      width: '145px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 0, 0.20)',
                      filter: 'blur(18px)',
                      marginTop: '-6px'
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <div style={{
              background: 'linear-gradient(135deg, rgba(139, 90, 43, 0.15) 0%, rgba(107, 15, 26, 0.1) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '32px',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
              padding: '80px 32px',
              margin: '0 auto',
              maxWidth: '1000px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}>
              <RevealGroup stagger={0.1}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  <Reveal mask>
                    <div style={{ textAlign: 'center', marginBottom: '16px', display: 'flex', justifyContent: 'center', width: '100%' }}>
                      <span className="text-label" style={{ color: 'var(--color-ink)', letterSpacing: '0.15em', fontWeight: 600 }}>{activeCategory !== 'All' ? activeCategory : 'Explore'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                      <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', textAlign: 'center', marginBottom: 'var(--space-6)', textTransform: 'capitalize', color: 'var(--color-ink)' }}>
                        {displayCategory}
                      </h1>
                    </div>
                  </Reveal>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <Reveal delay={0.2}>
                    <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', fontSize: '1.25rem', color: 'var(--color-ink)', opacity: 0.85 }}>
                      Discover our meticulously curated selection of timeless pieces, designed for intentional living.
                    </p>
                  </Reveal>
                </div>
              </RevealGroup>
            </div>
          )}
        </div>
      </section>

      <section ref={gridSectionRef} style={{ paddingTop: 'var(--space-4)' }}>
        <div className="container">
          {/* Controls Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <span className="text-label" style={{ color: 'var(--color-stone)' }}>{filteredProducts.length} pieces</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-8)', borderBottom: '1px solid var(--color-ink)', paddingBottom: 'var(--space-4)' }}>
            
            {/* Chips */}
            <div style={{ display: 'flex', gap: 'var(--space-4)', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px' }}>
              {chips.map(chip => (
                <button 
                  key={chip.value} 
                  onClick={() => setSearchParams(prev => { prev.set('category', chip.value); return prev; })}
                  style={{ 
                    background: activeCategory === chip.value ? 'var(--color-ink)' : 'transparent', 
                    border: '1px solid var(--color-ink)', 
                    padding: '8px 16px', 
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: activeCategory === chip.value ? 'var(--color-white)' : 'var(--color-ink)',
                    borderRadius: '24px',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Filters & Search */}
            <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--color-ink)' }}>
                <Search size={16} strokeWidth={1} style={{ color: 'var(--color-stone)' }} />
                <input 
                  type="text" 
                  placeholder="Search pieces..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ border: 'none', background: 'transparent', padding: '8px', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '1rem', width: '150px' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <label className="text-label" style={{ color: 'var(--color-stone)' }}>Sort:</label>
                <select 
                  value={sortType} 
                  onChange={(e) => setSortType(e.target.value)}
                  style={{ border: 'none', background: 'transparent', fontFamily: 'var(--font-body)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', outline: 'none' }}
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <label className="text-label" style={{ color: 'var(--color-stone)' }}>Max Price: ₹{priceRange}</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100000" 
                  step="5000"
                  value={priceRange} 
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  style={{ width: '100px', accentColor: 'var(--color-ink)' }}
                />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <motion.div layout style={{ minHeight: '50vh' }}>
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <div className="product-grid">
                  {filteredProducts.map((product, idx) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      index={idx} 
                      isBestsellerView={isBestsellerCategory}
                      isSaleView={isSaleCategory}
                      isNewView={isNewCategory}
                    />
                  ))}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    padding: 'var(--space-20) var(--space-4)', 
                    textAlign: 'center',
                    backgroundColor: 'var(--color-ivory)',
                    borderRadius: '8px'
                  }}
                >
                  <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-4)' }}>No pieces found</h3>
                  <p style={{ color: 'var(--color-stone)', marginBottom: 'var(--space-6)', maxWidth: '400px' }}>
                    We couldn't find any pieces matching your refined criteria. Try adjusting your filters or explore our complete collection.
                  </p>
                  <button 
                    onClick={() => { setSearchQuery(''); setPriceRange(100000); setSearchParams({ category: 'All' }); }}
                    style={{ 
                      padding: '12px 24px', 
                      backgroundColor: 'var(--color-ink)', 
                      color: 'var(--color-white)', 
                      border: 'none', 
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontSize: '12px'
                    }}
                  >
                    Reset Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>
    </PageTransition>
  );
};

export default Shop;
