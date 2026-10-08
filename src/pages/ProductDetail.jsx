import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { Reveal, RevealGroup } from '../components/ui/Reveal';
import ImageReveal from '../components/ui/ImageReveal';
import productsData from '../data/products.json';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CheckCircle } from 'lucide-react';

import { formatPrice } from '../utils/formatPrice';

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ borderBottom: '1px solid var(--color-ink)' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3) 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
      >
        {title}
        {isOpen ? <ChevronUp size={16} strokeWidth={1} /> : <ChevronDown size={16} strokeWidth={1} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ paddingBottom: 'var(--space-3)', color: 'var(--color-stone)' }}>{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user, addOrder } = useAuth();
  
  const product = productsData.find(p => p.id === id) || productsData[0];
  const relatedProducts = productsData.filter(p => (p.type === product.type || p.department === product.department) && p.id !== product.id).slice(0, 4);
  
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const gallery = product.images;

  const handleInstantBuy = () => {
    const orderNumber = `ELN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderNumber,
      date: new Date().toISOString(),
      items: [{ ...product, quantity, size: selectedSize, color: selectedColor }],
      shippingDetails: { 
        name: user?.name || 'Guest', 
        address: user?.address || 'Your Shipping Address',
        city: 'Your City',
        state: 'Your State',
        pincode: '000000'
      },
      total: product.price * quantity,
      status: 'Processing'
    };
    if (user && addOrder) {
      addOrder(newOrder);
    }
    setPlacedOrder(newOrder);
    setShowPopup(true);
  };

  return (
    <PageTransition>
      {/* Fullscreen Confirmation Popup for Instant Buy */}
      <AnimatePresence>
        {showPopup && placedOrder && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{ position: 'relative', width: '90%', maxWidth: '480px', backgroundColor: 'var(--color-ink)', color: 'var(--color-ivory)', padding: 'var(--space-8)', borderRadius: '12px', boxShadow: '0 24px 48px rgba(0,0,0,0.2)', textAlign: 'center' }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                <CheckCircle size={64} strokeWidth={1} color="#d4af37" />
              </div>
              <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 300, marginBottom: 'var(--space-2)' }}>Confirmed!</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', marginBottom: 'var(--space-6)', lineHeight: 1.5 }}>
                Your beautiful pieces are being prepared.<br />
                Order <strong style={{ color: '#d4af37' }}>{placedOrder.id}</strong>
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link to="/profile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '16px', backgroundColor: '#d4af37', color: 'var(--color-ink)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px', fontWeight: 600, borderRadius: '4px' }}>
                  View My Profile
                </Link>
                <button onClick={() => setShowPopup(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '16px', backgroundColor: 'transparent', color: 'var(--color-ivory)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px', borderRadius: '4px' }}>
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section style={{ paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-8)' }}>
        <style>{`
          .pdp-col-left { grid-column: span 7; }
          .pdp-col-right { grid-column: 9 / span 4; }
          @media (max-width: 900px) {
            .pdp-col-left { grid-column: span 12 !important; }
            .pdp-col-right { grid-column: span 12 !important; }
          }
        `}</style>
        <div className="container grid-12" style={{ alignItems: 'flex-start' }}>
          
          {/* Left Column: Vertical Image Gallery */}
          <div className="pdp-col-left" style={{ display: 'flex', gap: 'var(--space-3)' }}>
            
            {/* Thumbnails */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', width: '80px' }}>
              <style>{`
                @media (max-width: 768px) {
                  .pdp-thumbnails { display: none !important; }
                  .pdp-grid { grid-template-columns: 1fr !important; }
                  .pdp-sticky { position: static !important; margin-top: var(--space-6); }
                }
              `}</style>
              <div className="pdp-thumbnails" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {gallery.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveImage(img)}
                    style={{ 
                      width: '100%', 
                      aspectRatio: '3/4', 
                      padding: 0, 
                      border: activeImage === img ? '1px solid var(--color-ink)' : 'none',
                      opacity: activeImage === img ? 1 : 0.6,
                      cursor: 'pointer',
                      transition: 'opacity 0.3s'
                    }}
                  >
                    <img src={img} alt={`Thumbnail ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Main Image */}
            <div style={{ flex: 1, position: 'relative', aspectRatio: '3/4', backgroundColor: 'var(--color-ivory)', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Sticky Details */}
          <div className="pdp-col-right pdp-sticky" style={{ position: 'sticky', top: '120px' }}>
            <RevealGroup stagger={0.1}>
              <Reveal>
                <h1 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', marginBottom: 'var(--space-1)' }}>{product.name}</h1>
                <p style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)' }}>{formatPrice(product.price)}</p>
                <p style={{ color: 'var(--color-stone)', marginBottom: 'var(--space-6)' }}>{product.description}</p>
              </Reveal>

              <Reveal delay={0.2}>
                {/* Color Selection */}
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="text-label">Color</span>
                    <span className="text-label" style={{ color: 'var(--color-stone)' }}>{selectedColor}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {product.colors.map(color => (
                      <button 
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        style={{ 
                          width: '32px', 
                          height: '32px', 
                          borderRadius: '50% !important', 
                          border: '1px solid var(--color-ink)',
                          padding: '2px',
                          background: 'transparent',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ 
                          width: '100%', 
                          height: '100%', 
                          borderRadius: '50% !important', 
                          backgroundColor: color.toLowerCase() === 'ivory' ? '#F4F1EA' : color.toLowerCase() === 'ink' ? '#141414' : color.toLowerCase() === 'stone' ? '#6B675F' : color.toLowerCase() === 'gold' ? '#D4AF37' : color.toLowerCase() === 'silver' ? '#C0C0C0' : color.toLowerCase() === 'leather' ? '#8B5A2B' : '#000'
                        }} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div style={{ marginBottom: 'var(--space-6)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="text-label">Size</span>
                    <span className="text-label hover-underline" style={{ cursor: 'pointer' }}>Size Guide</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        style={{
                          flex: 1,
                          minWidth: '60px',
                          padding: '12px 0',
                          border: '1px solid var(--color-ink)',
                          backgroundColor: selectedSize === size ? 'var(--color-ink)' : 'transparent',
                          color: selectedSize === size ? 'var(--color-white)' : 'var(--color-ink)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.3s'
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity and Add to Bag */}
                <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-ink)' }}>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '0 16px', border: 'none', background: 'none', cursor: 'pointer' }}><Minus size={14} /></button>
                    <span style={{ fontFamily: 'var(--font-body)', width: '30px', textAlign: 'center' }}>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '0 16px', border: 'none', background: 'none', cursor: 'pointer' }}><Plus size={14} /></button>
                  </div>
                  
                  <div style={{ display: 'flex', flex: 1, gap: '12px' }}>
                    <button 
                      onClick={() => addToCart(product, quantity, selectedSize, selectedColor)}
                      className="add-to-bag-btn"
                    >
                      Add to Bag
                    </button>
                    <button 
                      onClick={handleInstantBuy}
                      className="place-order-btn"
                    >
                      Place an Order
                    </button>
                  </div>
                  <style>{`
                    .add-to-bag-btn {
                      flex: 1;
                      position: relative;
                      overflow: hidden;
                      border: 1px solid var(--color-ink);
                      background: transparent;
                      color: var(--color-ink);
                      cursor: pointer;
                      font-family: var(--font-body);
                      font-size: 10px;
                      text-transform: uppercase;
                      letter-spacing: 0.1em;
                      transition: color 0.4s ease;
                      z-index: 1;
                      padding: 16px 0;
                    }
                    .add-to-bag-btn::before {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: -100%;
                      width: 100%;
                      height: 100%;
                      background-color: var(--color-ink);
                      transition: left 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                      z-index: -1;
                    }
                    .add-to-bag-btn:hover {
                      color: var(--color-white);
                    }
                    .add-to-bag-btn:hover::before {
                      left: 0;
                    }

                    .place-order-btn {
                      flex: 1;
                      position: relative;
                      overflow: hidden;
                      border: 1px solid #d4af37;
                      background: #d4af37;
                      color: var(--color-ink);
                      cursor: pointer;
                      font-family: var(--font-body);
                      font-size: 10px;
                      font-weight: 600;
                      text-transform: uppercase;
                      letter-spacing: 0.1em;
                      transition: all 0.3s ease;
                      padding: 16px 0;
                    }
                    .place-order-btn:hover {
                      background: var(--color-ink);
                      border-color: var(--color-ink);
                      color: #d4af37;
                    }
                  `}</style>
                </div>

                {/* Accordions */}
                <div style={{ borderTop: '1px solid var(--color-ink)' }}>
                  <Accordion title="Details" content={product.description + " Hand-finished construction ensures lasting durability and comfort."} />
                  <Accordion title="Care" content="Dry clean only. Store flat in a cool, dry place." />
                  <Accordion title="Shipping & Returns" content="Complimentary express shipping on all orders. Returns accepted within 14 days of delivery." />
                </div>
              </Reveal>
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      <section style={{ borderTop: '1px solid var(--color-ink)', marginTop: 'var(--space-12)' }}>
        <div className="container">
          <Reveal mask><h3 style={{ marginBottom: 'var(--space-8)' }}>You May Also Like</h3></Reveal>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
            {relatedProducts.map((p, i) => (
              <div key={p.id} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <Link to={`/shop/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ImageReveal src={p.images[0]} alt={p.name} delay={i * 0.1} />
                  <div style={{ marginTop: 'var(--space-3)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ fontSize: '1.125rem', margin: 0, fontWeight: 400 }}>{p.name}</h4>
                      <span className="text-label">{formatPrice(p.price)}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    </PageTransition>
  );
};

export default ProductDetail;
