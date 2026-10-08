import { Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import { Reveal, RevealGroup } from '../components/ui/Reveal';
import { CheckCircle } from 'lucide-react';

import { formatPrice } from '../utils/formatPrice';

const Confirmation = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <PageTransition>
      <section style={{ minHeight: '100vh', display: 'flex', backgroundColor: 'var(--color-ink)', color: 'var(--color-ivory)' }}>
        {/* Left Side: Premium Image */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'none' }} className="confirmation-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2000&auto=format&fit=crop" 
            alt="Fashion Elegance" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} 
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8), transparent)' }}></div>
          <div style={{ position: 'absolute', bottom: '10%', left: '10%', right: '10%' }}>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', fontWeight: 300, lineHeight: 1.1, margin: 0 }}
            >
              Elegance <br/>Delivered.
            </motion.h2>
          </div>
        </div>

        {/* Right Side: Order Details */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'var(--space-12) 10%', backgroundColor: 'var(--color-ink)' }} className="confirmation-details">
          <RevealGroup stagger={0.15}>
            
            <Reveal>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 'var(--space-8)' }}>
                <CheckCircle size={48} strokeWidth={1} color="#d4af37" />
                <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-heading)', margin: 0, fontWeight: 300 }}>Thank You</h1>
              </div>
            </Reveal>

            <Reveal>
              <p style={{ fontSize: '1.25rem', marginBottom: 'var(--space-12)', color: 'rgba(255,255,255,0.8)', fontWeight: 300 }}>
                Your order <strong style={{ color: '#d4af37', fontWeight: 500 }}>{order.id}</strong> has been successfully placed. We're getting it ready for you.
              </p>
            </Reveal>

            <Reveal>
              <div style={{ padding: 'var(--space-6)', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', marginBottom: 'var(--space-8)' }}>
                <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-6)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', color: '#d4af37' }}>Order Summary</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
                  <div>
                    <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', margin: '0 0 4px 0' }}>Date</p>
                    <p style={{ margin: 0, fontSize: '1.1rem' }}>{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', margin: '0 0 4px 0' }}>Total</p>
                    <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500 }}>{formatPrice(order.total)}</p>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', margin: '0 0 4px 0' }}>Shipping To</p>
                    <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.5 }}>
                      {order.shippingDetails.name}<br/>
                      {order.shippingDetails.address}, {order.shippingDetails.city}<br/>
                      {order.shippingDetails.state} {order.shippingDetails.pincode}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.6}>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <Link to="/shop" style={{ textDecoration: 'none', backgroundColor: '#d4af37', color: 'var(--color-ink)', padding: '16px 32px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, display: 'inline-block', transition: 'background-color 0.3s' }}>
                  Continue Shopping
                </Link>
                <Link to="/profile" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.8)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid rgba(255,255,255,0.4)', paddingBottom: '4px', transition: 'color 0.3s' }}>
                  View Orders
                </Link>
              </div>
            </Reveal>

          </RevealGroup>
        </div>
        
        {/* Simple inline CSS to handle the media query for the split screen */}
        <style dangerouslySetInnerHTML={{__html: `
          @media (min-width: 900px) {
            .confirmation-image-wrapper {
              display: block !important;
            }
          }
        `}} />
      </section>
    </PageTransition>
  );
};

export default Confirmation;
