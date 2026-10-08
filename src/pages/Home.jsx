import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import productsData from '../data/products.json';
import { useCart } from '../context/CartContext';

import { formatPrice } from '../utils/formatPrice';

import BounceCards from '../components/ui/BounceCards';

const Home = () => {
  const { addToCart } = useCart();
  const [bounceWidth, setBounceWidth] = useState(500);

  useEffect(() => {
    const handleResize = () => {
      setBounceWidth(window.innerWidth < 600 ? window.innerWidth - 32 : 500);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <PageTransition>
      <style dangerouslySetInnerHTML={{__html: `
        .home-grid-4 {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 16px;
        }
        .home-grid-4-gap24 {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 24px;
        }
        .price-banners {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 16px;
        }
        .hero-title {
          font-size: clamp(2.5rem, 8vw, 6rem);
        }
        @media (min-width: 600px) {
          .home-grid-4, .home-grid-4-gap24 {
            grid-template-columns: repeat(2, 1fr);
          }
          .price-banners {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .home-grid-4 {
            grid-template-columns: repeat(4, 1fr);
          }
          .home-grid-4-gap24 {
            grid-template-columns: repeat(4, 1fr);
          }
          .price-banners {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}} />

      {/* Hero Carousel Section */}
      <section style={{ position: 'relative', width: '100%', height: '80vh', overflow: 'hidden' }}>
        <img 
          src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2000&auto=format&fit=crop" 
          alt="Hero Fashion" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', textAlign: 'center', padding: '0 16px' }}>
          <h1 className="hero-title" style={{ fontFamily: 'var(--font-heading)', margin: 0, fontWeight: 500, lineHeight: 1.1 }}>FESTIVE COLLECTION</h1>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', marginTop: '16px', marginBottom: '32px' }}>Royal Vibes, Endless Style</p>
          <Link to="/shop" style={{ backgroundColor: '#fff', color: 'var(--color-ink)', padding: '16px 32px', textDecoration: 'none', fontWeight: 500, letterSpacing: '0.05em' }}>
            SHOP NOW
          </Link>
        </div>
      </section>

      {/* BounceCards Interactive Showcase */}
      <section style={{ padding: '80px 16px', backgroundColor: 'var(--color-ivory)', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>Curated For You</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-stone)', marginBottom: '64px', maxWidth: '600px', fontSize: 'clamp(0.9rem, 3vw, 1rem)' }}>Hover over the gallery to explore pieces that match your style.</p>
        <BounceCards
          images={[
            productsData.find(p => p.type === 'Lehenga')?.images[0] || "https://res.cloudinary.com/snuwehqj/image/upload/f_auto/q_auto/l3.jpg",
            productsData.find(p => p.type === 'Sherwani')?.images[0] || "https://res.cloudinary.com/snuwehqj/image/upload/f_auto/q_auto/sarees3.jpg",
            productsData.find(p => p.type === 'Saree')?.images[0] || "https://res.cloudinary.com/snuwehqj/image/upload/f_auto/q_auto/l1.png",
            productsData.find(p => p.department === 'Accessories')?.images[0] || "https://res.cloudinary.com/snuwehqj/image/upload/f_auto/q_auto/sarees1.png",
            "https://res.cloudinary.com/snuwehqj/image/upload/f_auto/q_auto/l2.jpg"
          ]}
          containerWidth={bounceWidth}
          containerHeight={250}
          animationDelay={0.5}
          animationStagger={0.08}
          easeType="elastic.out(1, 0.5)"
          enableHover={true}
        />
      </section>

      {/* Watch & Buy Reels Section */}
      <section style={{ padding: '64px 0', backgroundColor: 'var(--color-ivory)' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '32px', fontFamily: 'var(--font-heading)' }}>Watch & Buy</h2>
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', padding: '0 16px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          {[1, 13, 25, 37, 49].map(i => (
            <div key={i} style={{ minWidth: '280px', height: '480px', borderRadius: 0, overflow: 'hidden', position: 'relative', backgroundColor: '#333' }}>
              <img src={productsData[i].images[0]} alt="Reel" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
              <div style={{ position: 'absolute', top: '16px', left: 0, width: '100%', textAlign: 'center', color: '#fff', fontWeight: 500, fontSize: '1.1rem' }}>
                NEW ARRIVAL
              </div>
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', backgroundColor: '#fff', borderRadius: 0, padding: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={productsData[i].images[0]} style={{ width: '40px', height: '50px', borderRadius: 0, objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '12px', margin: 0, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{productsData[i].name}</p>
                  <p style={{ fontSize: '12px', margin: 0, color: 'var(--color-stone)' }}>${productsData[i].price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories & Collections Grid */}
      <section style={{ padding: '64px 16px' }}>
        <div className="home-grid-4" style={{ marginBottom: '16px' }}>
          <div style={{ height: '240px', backgroundColor: '#eee', borderRadius: '0 0 40px 0', overflow: 'hidden', position: 'relative' }}>
             <img src={productsData.find(p => p.type === 'Lehenga')?.images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             <div style={{ position: 'absolute', bottom: 0, width: '100%', padding: '16px', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', color: '#fff', textAlign: 'center' }}>BRIDAL LEHENGAS</div>
          </div>
          <div style={{ height: '240px', backgroundColor: '#eee', borderRadius: '0 0 40px 0', overflow: 'hidden', position: 'relative' }}>
             <img src={productsData.find(p => p.type === 'Sherwani')?.images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             <div style={{ position: 'absolute', bottom: 0, width: '100%', padding: '16px', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', color: '#fff', textAlign: 'center' }}>MENS SHERWANIS</div>
          </div>
          <div style={{ height: '240px', backgroundColor: '#eee', borderRadius: '0 0 40px 0', overflow: 'hidden', position: 'relative' }}>
             <img src={productsData.find(p => p.type === 'Saree')?.images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             <div style={{ position: 'absolute', bottom: 0, width: '100%', padding: '16px', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', color: '#fff', textAlign: 'center' }}>SILK SAREES</div>
          </div>
          <div style={{ height: '240px', backgroundColor: '#eee', borderRadius: '0 0 40px 0', overflow: 'hidden', position: 'relative' }}>
             <img src={productsData.find(p => p.type === 'Accessories' || p.department === 'Accessories')?.images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             <div style={{ position: 'absolute', bottom: 0, width: '100%', padding: '16px', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', color: '#fff', textAlign: 'center' }}>ACCESSORIES</div>
          </div>
        </div>
        
        <div className="home-grid-4">
          {[1, 13, 25, 37].map(i => (
             <div key={i} style={{ aspectRatio: '3/4', backgroundColor: '#eee', borderRadius: '0 0 40px 0', overflow: 'hidden' }}>
               <img src={productsData[i].images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             </div>
          ))}
        </div>
      </section>

      {/* Price-Point Promotional Banners */}
      <section style={{ padding: '0 16px 64px 16px' }}>
        <div className="price-banners">
          <div style={{ padding: '32px 16px', backgroundColor: 'var(--color-ink)', color: '#fff', textAlign: 'center', fontSize: '1.2rem', fontWeight: 500, letterSpacing: '0.05em' }}>STYLES UNDER $200</div>
          <div style={{ padding: '32px 16px', backgroundColor: 'var(--color-ink)', color: '#fff', textAlign: 'center', fontSize: '1.2rem', fontWeight: 500, letterSpacing: '0.05em' }}>STYLES UNDER $400</div>
          <div style={{ padding: '32px 16px', backgroundColor: 'var(--color-ink)', color: '#fff', textAlign: 'center', fontSize: '1.2rem', fontWeight: 500, letterSpacing: '0.05em' }}>STYLES UNDER $600</div>
          <div style={{ padding: '32px 16px', backgroundColor: 'var(--color-ink)', color: '#fff', textAlign: 'center', fontSize: '1.2rem', fontWeight: 500, letterSpacing: '0.05em' }}>STYLES UNDER $800</div>
        </div>
      </section>

      {/* Product Grid (Bestsellers) */}
      <section style={{ padding: '0 16px 64px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '8px', fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}>FESTIVE ESSENTIALS</h2>
          <Link to="/shop" style={{ color: 'var(--color-ink)', textTransform: 'uppercase', fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em' }}>VIEW ALL</Link>
        </div>
        
        <div className="home-grid-4-gap24">
          {[0, 12, 24, 36].map(index => {
            const product = productsData[index];
            return (
            <div key={product.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', aspectRatio: '3/4', backgroundColor: '#eee', marginBottom: '16px' }}>
                <img src={product.images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: '#6a0dad', color: '#fff', padding: '4px 8px', fontSize: '10px', fontWeight: 500 }}>33% off</div>
                <div style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: '#8b5a2b', color: '#fff', padding: '4px 8px', fontSize: '10px', fontWeight: 500 }}>New arrival</div>
                <div style={{ position: 'absolute', bottom: '8px', left: 0, width: '100%', display: 'flex', justifyContent: 'center', gap: '4px', padding: '0 8px', flexWrap: 'wrap' }}>
                  {product.sizes.slice(0,3).map(s => <span key={s} style={{ backgroundColor: '#fff', padding: '4px 8px', fontSize: '10px', fontWeight: 500, border: '1px solid #ddd' }}>{s}</span>)}
                </div>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 400, textAlign: 'center', marginBottom: '8px' }}>{product.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', color: '#f39c12', fontSize: '12px', marginBottom: '8px' }}>★★★★★ <span style={{ color: 'var(--color-stone)' }}>6 reviews</span></div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'baseline', marginBottom: '16px' }}>
                <span style={{ textDecoration: 'line-through', color: 'var(--color-stone)', fontSize: '14px' }}>${(product.price * 1.33).toFixed(2)}</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{formatPrice(product.price)}</span>
              </div>
              <button 
                onClick={() => addToCart(product, 1, product.sizes[0], product.colors[0])}
                style={{ marginTop: 'auto', backgroundColor: 'var(--color-ink)', color: '#fff', padding: '12px', border: 'none', width: '100%', fontWeight: 500, letterSpacing: '0.05em', cursor: 'pointer' }}
              >
                ADD TO CART
              </button>
            </div>
          )})}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section style={{ padding: '64px 16px', backgroundColor: 'var(--color-ivory)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', textAlign: 'center', marginBottom: '32px', fontFamily: 'var(--font-heading)' }}>Frequently Asked Questions About Ethnic Wear</h2>
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '16px', marginBottom: '24px' }}>
            <input type="text" placeholder="Search FAQ" style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '1rem' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {['Do you offer custom tailoring for Lehengas?', 'How long does shipping take for bridal wear?', 'What is the return policy on Sherwanis?', 'How should I care for my silk sarees?'].map((q, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer' }}>
                <span style={{ fontWeight: 500, fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>{q}</span>
                <span>+</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
