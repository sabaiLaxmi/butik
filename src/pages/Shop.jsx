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
        className="flex flex-col h-full min-w-0 w-full"
      >
        <Link 
          to={`/shop/${product.id}`} 
          className="bestseller-product-card group flex flex-col h-full min-w-0 w-full no-underline text-inherit"
        >
          {/* Card Top: Soft blush background with cutout image & ground shadow */}
          <div className="relative w-full aspect-[3/4] bg-[#F3E6E2] rounded-2xl overflow-hidden flex items-center justify-center min-w-0">
            {/* Wishlist Heart Button - min 40x40px tap target */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsWishlisted(prev => !prev);
              }}
              aria-label="Wishlist"
              className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border-none flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 shadow-sm"
            >
              <Heart 
                size={18} 
                strokeWidth={1.7} 
                color={isWishlisted ? '#E11D48' : 'var(--color-ink)'} 
                fill={isWishlisted ? '#E11D48' : 'transparent'} 
                className="transition-colors"
              />
            </button>

            {/* Cutout Image with Lift & Shadow animation container */}
            <div className="bestseller-img-container relative w-[82%] h-[82%] flex flex-col items-center justify-center min-w-0">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="bestseller-cutout-img w-full h-full object-contain z-10 drop-shadow-md transition-transform duration-400"
              />
              {/* Code-made Ground Shadow */}
              <div 
                className="bestseller-ground-shadow absolute bottom-1.5 w-[68%] h-3.5 rounded-[50%] bg-black/25 blur-md z-0 transition-transform duration-400"
              />
            </div>
          </div>

          {/* Card Info: Name, Price, Category */}
          <div className="mt-3 flex flex-col gap-1 min-w-0 w-full">
            <h4 className="text-base font-normal sm:font-medium leading-snug text-[var(--color-ink)] m-0 line-clamp-2 min-w-0">
              {product.name}
            </h4>
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mt-0.5 min-w-0">
              <span className="text-sm sm:text-base font-semibold text-[var(--color-ink)] shrink-0">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs line-through text-[var(--color-stone)] shrink-0">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="text-xs uppercase tracking-wider text-[var(--color-stone)] m-0 truncate">
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
      className="flex flex-col gap-2 sm:gap-3 min-w-0 w-full h-full"
    >
      <Link to={`/shop/${product.id}`} className="product-card-link flex flex-col h-full min-w-0 w-full no-underline text-inherit">
        <div className={`relative w-full aspect-[3/4] overflow-hidden bg-[var(--color-ivory)] ${isSaleView ? 'rounded-lg' : 'rounded-none'} min-w-0`}>
          {/* Wishlist Heart Button - min 40x40px tap target */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsWishlisted(prev => !prev);
            }}
            aria-label="Wishlist"
            className="absolute top-2 right-2 z-10 w-10 h-10 rounded-full bg-white/85 backdrop-blur-md border-none flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 shadow-sm"
          >
            <Heart 
              size={18} 
              strokeWidth={1.7} 
              color={isWishlisted ? '#E11D48' : 'var(--color-ink)'} 
              fill={isWishlisted ? '#E11D48' : 'transparent'} 
              className="transition-colors"
            />
          </button>

          {/* Badges in top-left corner */}
          {discountPercent ? (
            <span className="absolute top-2 left-2 z-10 bg-[var(--color-discount)] text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded shadow-sm tracking-wider">
              -{discountPercent}%
            </span>
          ) : isRecentNew && (
            <span className="absolute top-2 left-2 z-10 bg-[#8B5A2B] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm tracking-wider uppercase">
              NEW
            </span>
          )}

          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="primary-image w-full h-full object-contain absolute inset-0 transition-opacity duration-500 z-[2]"
          />
          <img 
            src={hoverImage} 
            alt={`${product.name} alternate`} 
            className="w-full h-full object-contain absolute inset-0 z-[1]"
          />
          <style>{`
            .product-card-link:hover .primary-image { opacity: 0; }
          `}</style>
        </div>
        
        <div className="mt-2.5 flex flex-col gap-1 min-w-0 w-full">
          <h4 className="text-base font-normal leading-snug text-[var(--color-ink)] m-0 line-clamp-2 min-w-0">
            {product.name}
          </h4>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mt-0.5 min-w-0">
            {product.originalPrice ? (
              <>
                <span className="text-sm sm:text-base font-semibold text-[var(--color-discount)] shrink-0">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs line-through text-[var(--color-stone)] shrink-0">
                  {formatPrice(product.originalPrice)}
                </span>
              </>
            ) : (
              <span className="text-sm sm:text-base font-semibold text-[var(--color-ink)] shrink-0">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <p className="text-xs uppercase tracking-wider text-[var(--color-stone)] m-0 truncate">
            {product.type || product.department}
          </p>
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
              className="relative w-full max-w-5xl mx-auto rounded-3xl border border-white/70 shadow-[0_20px_50px_rgba(139,90,43,0.08)] p-5 md:p-10 flex flex-col md:grid md:grid-cols-2 items-center gap-6 md:gap-10 overflow-hidden backdrop-blur-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(243, 230, 226, 0.95) 0%, rgba(249, 243, 240, 0.8) 100%)',
              }}
            >
              {/* Text content - centered on mobile, left on desktop */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 w-full min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  <span className="text-label text-[var(--color-ink)] tracking-[0.2em] font-bold text-xs uppercase mb-2 inline-block">
                    BESTSELLERS
                  </span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                  className="text-4xl md:text-6xl font-serif font-semibold text-[var(--color-ink)] leading-tight tracking-tight mb-3"
                >
                  Bestsellers
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  className="text-sm md:text-base text-[var(--color-ink)]/80 max-w-md m-0 leading-relaxed"
                >
                  Discover our meticulously curated selection of timeless pieces, designed for intentional living.
                </motion.p>
              </div>

              {/* 3 transparent cloth cutout images overlapping like a fan - stacked below text on mobile */}
              <div className="relative flex items-center justify-center h-[200px] md:h-[320px] w-full z-5 overflow-hidden">
                {/* Left Cutout: Saree */}
                <motion.div
                  initial={{ opacity: 0, x: -30, rotate: -12, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, rotate: -8, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-[calc(50%-100px)] md:left-[calc(50%-140px)] z-[2] flex flex-col items-center"
                >
                  <img
                    src="https://res.cloudinary.com/snuwehqj/image/upload/v1791704710/sareeset.png"
                    alt="Saree Cutout"
                    className="h-[150px] md:h-[220px] w-auto object-contain block drop-shadow-sm"
                  />
                  <div className="w-20 md:w-28 h-3.5 rounded-[50%] bg-black/20 blur-md -mt-2" />
                </motion.div>

                {/* Right Cutout: Sherwani */}
                <motion.div
                  initial={{ opacity: 0, x: 30, rotate: 12, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, rotate: 8, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-[calc(50%-100px)] md:right-[calc(50%-140px)] z-[2] flex flex-col items-center"
                >
                  <img
                    src="https://res.cloudinary.com/snuwehqj/image/upload/v1791704696/sher.png"
                    alt="Sherwani Cutout"
                    className="h-[150px] md:h-[220px] w-auto object-contain block drop-shadow-sm"
                  />
                  <div className="w-20 md:w-28 h-3.5 rounded-[50%] bg-black/20 blur-md -mt-2" />
                </motion.div>

                {/* Center Cutout: Bigger Lehenga (h-[180px] mobile, h-[300px] desktop) */}
                <motion.div
                  initial={{ opacity: 0, y: 25, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-[4] flex flex-col items-center cursor-pointer"
                >
                  <img
                    src="https://res.cloudinary.com/snuwehqj/image/upload/v1791704695/lehngar.png"
                    alt="Lehenga Cutout"
                    className="h-[180px] md:h-[290px] w-auto object-contain block drop-shadow-md"
                  />
                  <div className="w-24 md:w-36 h-4 rounded-[50%] bg-black/20 blur-md -mt-2" />
                </motion.div>
              </div>
            </motion.div>
          ) : isSaleCategory ? (
            /* Custom Season Sale Hero Banner Card */
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl mx-auto rounded-3xl border border-white/70 shadow-[0_20px_50px_rgba(126,79,79,0.12)] p-5 md:p-10 flex flex-col md:grid md:grid-cols-2 items-center gap-6 md:gap-10 overflow-hidden backdrop-blur-xl"
              style={{
                background: 'linear-gradient(135deg, #F3E1DB 0%, #E9C9C4 100%)',
              }}
            >
              {/* Text content - centered on mobile, left on desktop */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 w-full min-w-0">
                {/* Eyebrow & Pill Badge */}
                <div className="flex items-center justify-center md:justify-start gap-2.5 flex-wrap mb-3">
                  <motion.span 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-label text-[var(--color-ink)] tracking-[0.2em] font-bold text-xs uppercase"
                  >
                    SEASON SALE
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-[var(--color-discount)] text-white text-[11px] font-bold tracking-wider px-3 py-1 rounded-full uppercase shadow-sm"
                  >
                    UP TO 40% OFF
                  </motion.span>
                </div>

                {/* Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-4xl md:text-6xl font-serif font-semibold text-[var(--color-ink)] leading-tight tracking-tight mb-3"
                >
                  Sale
                </motion.h1>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="text-sm md:text-base text-[var(--color-ink)]/85 max-w-md m-0 leading-relaxed mb-5"
                >
                  Handpicked festive pieces at special prices. Limited stock.
                </motion.p>

                {/* Countdown Timer (Days, Hours, Minutes) */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 mb-6"
                >
                  <div className="flex flex-col items-center bg-white/75 backdrop-blur-md px-3 py-1.5 rounded-xl min-w-[54px] sm:min-w-[64px] border border-white/60 shadow-sm">
                    <span className="text-lg sm:text-xl font-bold text-[var(--color-ink)] leading-none">
                      {String(timeLeft.days).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-[var(--color-stone)] mt-1 font-semibold">
                      Days
                    </span>
                  </div>

                  <span className="text-base sm:text-lg font-bold text-[var(--color-stone)]">:</span>

                  <div className="flex flex-col items-center bg-white/75 backdrop-blur-md px-3 py-1.5 rounded-xl min-w-[54px] sm:min-w-[64px] border border-white/60 shadow-sm">
                    <span className="text-lg sm:text-xl font-bold text-[var(--color-ink)] leading-none">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-[var(--color-stone)] mt-1 font-semibold">
                      Hours
                    </span>
                  </div>

                  <span className="text-base sm:text-lg font-bold text-[var(--color-stone)]">:</span>

                  <div className="flex flex-col items-center bg-white/75 backdrop-blur-md px-3 py-1.5 rounded-xl min-w-[54px] sm:min-w-[64px] border border-white/60 shadow-sm">
                    <span className="text-lg sm:text-xl font-bold text-[var(--color-ink)] leading-none">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-[var(--color-stone)] mt-1 font-semibold">
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
                  className="bg-[var(--color-ink)] text-white border-none px-6 sm:px-8 py-3 rounded-full text-xs font-semibold tracking-widest uppercase cursor-pointer shadow-md transition-shadow"
                >
                  Shop the Sale
                </motion.button>
              </div>

              {/* 3 transparent cutout cloths overlapping like a fan with discount tags - stacked below text on mobile */}
              <div className="relative flex items-center justify-center h-[200px] md:h-[320px] w-full z-5 overflow-hidden">
                {/* Left Cutout: Saree (-35%) */}
                <motion.div
                  initial={{ opacity: 0, x: -30, rotate: -12, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, rotate: -8, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-[calc(50%-100px)] md:left-[calc(50%-140px)] z-[2] flex flex-col items-center"
                >
                  <div className="relative">
                    <img
                      src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto,q_auto,h_700/v1791704710/sareeset.png"
                      alt="Saree Cutout"
                      className="h-[150px] md:h-[220px] w-auto object-contain block drop-shadow-sm"
                    />
                    <div className="absolute top-2 left-1 bg-[var(--color-discount)] text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                      -35%
                    </div>
                  </div>
                  <div className="w-20 md:w-28 h-3.5 rounded-[50%] bg-black/20 blur-md -mt-2" />
                </motion.div>

                {/* Right Cutout: Kurta Set (-30%) */}
                <motion.div
                  initial={{ opacity: 0, x: 30, rotate: 12, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, rotate: 8, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-[calc(50%-100px)] md:right-[calc(50%-140px)] z-[2] flex flex-col items-center"
                >
                  <div className="relative">
                    <img
                      src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto,q_auto,h_700/v1791704697/kurtaset.png"
                      alt="Kurta Set Cutout"
                      className="h-[150px] md:h-[220px] w-auto object-contain block drop-shadow-sm"
                    />
                    <div className="absolute top-2 right-1 bg-[var(--color-discount)] text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                      -30%
                    </div>
                  </div>
                  <div className="w-20 md:w-28 h-3.5 rounded-[50%] bg-black/20 blur-md -mt-2" />
                </motion.div>

                {/* Center Cutout: Bigger Lehenga (-40%) */}
                <motion.div
                  initial={{ opacity: 0, y: 25, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-[4] flex flex-col items-center cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto,q_auto,h_700/v1791704695/lehngar.png"
                      alt="Lehenga Cutout"
                      className="h-[180px] md:h-[290px] w-auto object-contain block drop-shadow-md"
                    />
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-[var(--color-discount)] text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded shadow">
                      -40%
                    </div>
                  </div>
                  <div className="w-24 md:w-36 h-4 rounded-[50%] bg-black/20 blur-md -mt-2" />
                </motion.div>
              </div>
            </motion.div>
          ) : isNewCategory ? (
            /* Custom New Arrivals Hero Banner Card */
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-5xl mx-auto rounded-[32px] p-5 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 overflow-hidden relative"
              style={{
                background: 'linear-gradient(135deg, #F5EBDD 0%, #EBDCD3 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.7)',
                boxShadow: '0 20px 50px rgba(139, 90, 43, 0.08)'
              }}
            >
              {/* Text content - centered on mobile, left on desktop */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 w-full md:max-w-md">
                {/* Eyebrow & Pill Badge */}
                <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap mb-3">
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
                  className="text-4xl md:text-6xl font-semibold mb-3 tracking-tight leading-tight"
                  style={{ color: 'var(--color-ink)' }}
                >
                  New Arrivals
                </motion.h1>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="text-sm md:text-base mb-5 leading-relaxed max-w-sm md:max-w-md opacity-85"
                  style={{ color: 'var(--color-ink)' }}
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
                  className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest cursor-pointer shadow-md"
                  style={{
                    backgroundColor: 'var(--color-ink)',
                    color: 'var(--color-white)',
                    border: 'none',
                    minHeight: '44px'
                  }}
                >
                  Shop the Collection
                </motion.button>
              </div>

              {/* Cutout cloths - stacked below text on mobile with h-[180px], fan overlap on desktop */}
              <div className="relative flex items-center justify-center w-full min-h-[190px] md:min-h-[340px] z-[5] overflow-hidden">
                {/* Left/Rear Cutout: Sherwani */}
                <motion.div
                  initial={{ opacity: 0, x: -30, rotate: -10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, rotate: -6, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute z-[2] flex flex-col items-center"
                  style={{
                    left: 'calc(50% - 75px)',
                    transformOrigin: 'bottom center'
                  }}
                >
                  <div className="relative">
                    <img
                      src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto,q_auto,h_700/v1791704696/sher.png"
                      alt="Sherwani New Arrival"
                      className="h-[150px] md:h-[240px] w-auto object-contain block"
                    />
                    {/* Small NEW Tag */}
                    <div className="absolute top-2 left-1 bg-[#8B5A2B] text-white text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                      NEW
                    </div>
                  </div>
                  {/* Blurred ellipse shadow */}
                  <div className="w-[80px] md:w-[115px] h-[12px] md:h-[16px] rounded-full bg-black/20 blur-md -mt-1 md:-mt-2" />
                </motion.div>

                {/* Right/Front Cutout: Pastel Aqua Fishtail Lehenga */}
                <motion.div
                  initial={{ opacity: 0, y: 35, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="relative left-[30px] md:left-[45px] z-[4] flex flex-col items-center cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto,q_auto,h_700/v1791704699/fish_1.png"
                      alt="Fishtail Lehenga New Arrival"
                      className="h-[180px] md:h-[300px] w-auto object-contain block drop-shadow-md"
                    />
                    {/* Small NEW Tag */}
                    <div className="absolute top-2 right-1 bg-[#8B5A2B] text-white text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                      NEW
                    </div>
                  </div>
                  {/* Blurred ellipse shadow */}
                  <div className="w-[100px] md:w-[145px] h-[14px] md:h-[18px] rounded-full bg-black/20 blur-md -mt-1 md:-mt-2" />
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <div 
              className="w-full max-w-5xl mx-auto rounded-[32px] p-5 md:p-10 flex flex-col items-center justify-center text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 90, 43, 0.15) 0%, rgba(107, 15, 26, 0.1) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
              }}
            >
              <RevealGroup stagger={0.1}>
                <div className="flex flex-col items-center w-full">
                  <Reveal mask>
                    <div className="text-center mb-2 flex justify-center w-full">
                      <span className="text-label" style={{ color: 'var(--color-ink)', letterSpacing: '0.15em', fontWeight: 600 }}>{activeCategory !== 'All' ? activeCategory : 'Explore'}</span>
                    </div>
                    <div className="flex justify-center w-full">
                      <h1 className="text-4xl md:text-6xl font-semibold mb-3 tracking-tight capitalize" style={{ color: 'var(--color-ink)' }}>
                        {displayCategory}
                      </h1>
                    </div>
                  </Reveal>
                </div>
                <div className="flex justify-center w-full">
                  <Reveal delay={0.2}>
                    <p className="text-sm md:text-base max-w-md mx-auto text-center opacity-85 leading-relaxed" style={{ color: 'var(--color-ink)' }}>
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
          <div className="flex justify-between items-center mb-3">
            <span className="text-label text-[var(--color-stone)] text-xs uppercase tracking-wider">{filteredProducts.length} pieces</span>
          </div>

          <div className="flex flex-col gap-4 mb-8 border-b border-[var(--color-ink)]/20 pb-4 min-w-0 w-full">
            
            {/* Category Chips - Single horizontal scroll row on mobile without scrollbar */}
            <div className="flex overflow-x-auto whitespace-nowrap gap-2 pb-1 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-w-0 w-full">
              {chips.map(chip => (
                <button 
                  key={chip.value} 
                  onClick={() => setSearchParams(prev => { prev.set('category', chip.value); return prev; })}
                  className={`px-4 py-2 text-xs uppercase tracking-wider rounded-full transition-all shrink-0 cursor-pointer border ${
                    activeCategory === chip.value 
                      ? 'bg-[var(--color-ink)] text-white border-[var(--color-ink)] font-semibold' 
                      : 'bg-transparent text-[var(--color-ink)] border-[var(--color-ink)]/30 hover:border-[var(--color-ink)]'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Filters, Search & Sort - Stacks vertically on mobile (flex-col, gap-3, each w-full), one row on md+ */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 min-w-0 w-full">
              {/* Search */}
              <div className="flex items-center gap-2 border-b border-[var(--color-ink)]/40 pb-1.5 w-full md:w-56">
                <Search size={16} strokeWidth={1.5} className="text-[var(--color-stone)] shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search pieces..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-sm text-[var(--color-ink)] placeholder:text-[var(--color-stone)]"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                {/* Sort */}
                <div className="flex items-center justify-between sm:justify-start gap-2 bg-black/[0.03] sm:bg-transparent px-3 sm:px-0 py-2 sm:py-0 rounded-lg sm:rounded-none">
                  <label className="text-xs uppercase tracking-wider text-[var(--color-stone)] font-medium">Sort:</label>
                  <select 
                    value={sortType} 
                    onChange={(e) => setSortType(e.target.value)}
                    className="bg-transparent border-none outline-none text-xs uppercase tracking-wider text-[var(--color-ink)] cursor-pointer font-medium"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

                {/* Price Slider */}
                <div className="flex items-center justify-between sm:justify-start gap-2 bg-black/[0.03] sm:bg-transparent px-3 sm:px-0 py-2 sm:py-0 rounded-lg sm:rounded-none">
                  <label className="text-xs uppercase tracking-wider text-[var(--color-stone)] whitespace-nowrap font-medium">
                    Max: ₹{priceRange}
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100000" 
                    step="5000"
                    value={priceRange} 
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-28 sm:w-24 accent-[var(--color-ink)] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <motion.div layout className="min-h-[50vh] px-0 sm:px-2 min-w-0 w-full">
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6 min-w-0 w-full">
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
