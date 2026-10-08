import { navFilters } from '../data/categories';
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import { Reveal, RevealGroup } from '../components/ui/Reveal';
import productsData from '../data/products.json';
import { Search } from 'lucide-react';

import { formatPrice } from '../utils/formatPrice';

const ProductCard = ({ product, index }) => {
  // Use the second image for hover, or fallback to the first if not available
  const hoverImage = product.images[1] || product.images[0];

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
        <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', backgroundColor: 'var(--color-ivory)' }}>
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
                  <span className="text-label" style={{ fontWeight: 500, color: 'var(--color-discount)' }}>{formatPrice(product.price)}</span>
                  <span className="text-label" style={{ textDecoration: 'line-through', color: 'var(--color-stone)', fontSize: '0.85em' }}>{formatPrice(product.originalPrice)}</span>
                  <span style={{ fontSize: '10px', backgroundColor: 'var(--color-discount)', color: '#fff', padding: '2px 4px', borderRadius: '2px' }}>
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
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

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';
  const displayCategory = activeCategory === 'All' ? 'The Collection' : (navFilters[activeCategory] ? activeCategory + 's' : activeCategory);

  useEffect(() => {
    document.title = `${displayCategory} | A%LAN`;
  }, [displayCategory]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('newest'); // newest, price-low, price-high
  const [priceRange, setPriceRange] = useState(100000); // Max price

  const chips = [
    { label: 'All', value: 'All' },
    { label: 'Lehengas', value: 'Lehenga' },
    { label: 'Sarees', value: 'Saree' },
    { label: 'Sherwanis', value: 'Sherwani' },
    { label: 'Kurta Sets', value: 'Kurta' },
    { label: 'Accessories', value: 'Accessories' }
  ];

  const filteredProducts = useMemo(() => {
    let result = productsData;

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

    // Sort
    if (sortType === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortType === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortType === 'newest') {
      // Simulate newest by sorting by ID descending
      result.sort((a, b) => b.id.localeCompare(a.id));
    }

    return result;
  }, [activeCategory, searchQuery, sortType, priceRange]);

  const categoryVideos = {
    Lehenga: "https://res.cloudinary.com/snuwehqj/video/upload/v1791449773/gemini_generated_video_ae08ed5a.mp4",
    Sherwani: "https://res.cloudinary.com/snuwehqj/video/upload/v1791450724/gemini_generated_video_61a8bf7f.mp4",
    Kurta: "https://res.cloudinary.com/snuwehqj/video/upload/image-to-video/i2v_b818191cb595402183b9a33ce809f3d1.mp4",
    Accessories: "https://res.cloudinary.com/snuwehqj/video/upload/image-to-video/i2v_27e5399204234111b6174edc294ce213.mp4"
  };
  const activeVideo = categoryVideos[activeCategory];

  return (
    <PageTransition>
      <section style={{ 
        paddingTop: activeVideo ? 'var(--space-12)' : 'var(--space-20)', 
        paddingBottom: activeVideo ? 'var(--space-12)' : 'var(--space-8)'
      }}>
        <div className="container">
          {activeVideo ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '32px',
              alignItems: 'center',
              backgroundColor: 'transparent'
            }}>
              <style dangerouslySetInnerHTML={{__html: `
                @media (min-width: 900px) {
                  .video-header-grid {
                    grid-template-columns: 1fr 1fr !important;
                  }
                }
              `}} />
              <div className="video-header-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', width: '100%' }}>
                {/* Left Side: Text */}
                <div style={{ padding: '0 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <RevealGroup stagger={0.1}>
                    <Reveal mask>
                      <div style={{ marginBottom: '8px' }}>
                        <span className="text-label" style={{ color: 'var(--color-stone)' }}>{activeCategory}</span>
                      </div>
                      <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', marginBottom: 'var(--space-4)', textTransform: 'capitalize', lineHeight: 1.1 }}>
                        {displayCategory}
                      </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                      <p style={{ fontSize: '1.125rem', color: 'var(--color-stone)', maxWidth: '400px', lineHeight: 1.6 }}>
                        Discover our meticulously curated selection of timeless pieces, designed for intentional living.
                      </p>
                    </Reveal>
                  </RevealGroup>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                  <video 
                    src={activeVideo}
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '600px',
                      objectFit: 'contain',
                      display: 'block',
                      mixBlendMode: 'multiply',
                      opacity: 0.9
                    }}
                  />
                </div>
              </div>
            </div>
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

      <section style={{ paddingTop: 'var(--space-4)' }}>
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
                    <ProductCard key={product.id} product={product} index={idx} />
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
