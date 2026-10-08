import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { useCart } from '../context/CartContext';
import { Reveal, RevealGroup } from '../components/ui/Reveal';
import productsData from '../data/products.json';

import { formatPrice } from '../utils/formatPrice';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, subtotal, itemCount } = useCart();

  return (
    <PageTransition>
      <section style={{ paddingTop: 'var(--space-20)', paddingBottom: 'var(--space-12)', minHeight: '80vh' }}>
        <div className="container grid-12" style={{ alignItems: 'flex-start' }}>
          
          <div style={{ gridColumn: 'span 12', marginBottom: 'var(--space-8)' }}>
            <Reveal mask><h1 style={{ fontSize: 'clamp(3rem, 5vw, 5rem)' }}>Your Bag</h1></Reveal>
          </div>

          {cartItems.length === 0 ? (
            <div style={{ gridColumn: 'span 12', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-12) 0', borderTop: '1px solid var(--color-ink)' }}>
              <RevealGroup stagger={0.1}>
                <Reveal mask><h3 style={{ marginBottom: 'var(--space-3)', fontWeight: 400 }}>Your bag is quietly empty.</h3></Reveal>
                <Reveal delay={0.2}><p style={{ marginBottom: 'var(--space-6)', color: 'var(--color-stone)' }}>Begin assembling your perfect wardrobe.</p></Reveal>
                <Reveal delay={0.3}>
                  <Link to="/shop" style={{ padding: '16px 32px', border: '1px solid var(--color-ink)', textDecoration: 'none', color: 'var(--color-ink)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px' }}>
                    Explore The Collection
                  </Link>
                </Reveal>
              </RevealGroup>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column' }}>
                {/* Header Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--color-ink)' }}>
                  <span className="text-label" style={{ color: 'var(--color-stone)' }}>Item</span>
                  <span className="text-label" style={{ color: 'var(--color-stone)', textAlign: 'center' }}>Quantity</span>
                  <span className="text-label" style={{ color: 'var(--color-stone)', textAlign: 'right' }}>Total</span>
                </div>

                <AnimatePresence>
                  {cartItems.map((item, idx) => (
                    <motion.div 
                      key={`${item.id}-${item.size}-${item.color}-${idx}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr', padding: 'var(--space-4) 0', borderBottom: '1px solid var(--color-stone)', alignItems: 'center' }}
                    >
                      {/* Product Detail */}
                      <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                        <div style={{ width: '120px', aspectRatio: '3/4', flexShrink: 0 }}>
                          <img src={productsData.find(p => p.id === item.id)?.images?.[0] || item?.images?.[0] || item?.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <h4 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 400, marginBottom: '8px' }}>
                            <Link to={`/shop/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{item.name}</Link>
                          </h4>
                          <p className="text-label" style={{ color: 'var(--color-stone)' }}>Color: {item.color}</p>
                          <p className="text-label" style={{ color: 'var(--color-stone)', marginTop: '4px' }}>Size: {item.size}</p>
                          <button onClick={() => removeFromCart(idx)} style={{ marginTop: 'auto', alignSelf: 'flex-start', background: 'none', border: 'none', padding: 0, cursor: 'pointer', borderBottom: '1px solid var(--color-ink)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Remove</button>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-ink)', height: 'fit-content' }}>
                          <button onClick={() => updateQuantity(idx, -1)} style={{ padding: '8px 12px', border: 'none', background: 'none', cursor: 'pointer' }}><Minus size={14} /></button>
                          <span style={{ fontFamily: 'var(--font-body)', width: '30px', textAlign: 'center', fontSize: '14px' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(idx, 1)} style={{ padding: '8px 12px', border: 'none', background: 'none', cursor: 'pointer' }}><Plus size={14} /></button>
                        </div>
                      </div>

                      {/* Total */}
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '1.125rem' }}>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <div style={{ gridColumn: '10 / span 3', position: 'sticky', top: '120px', backgroundColor: 'var(--color-white)', padding: 'var(--space-6)', border: '1px solid var(--color-ink)' }}>
                <h3 style={{ marginBottom: 'var(--space-6)', fontSize: '1.5rem', fontWeight: 400 }}>Summary</h3>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                  <span style={{ color: 'var(--color-stone)' }}>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
                  <span style={{ color: 'var(--color-stone)' }}>Shipping</span>
                  <span>Calculated at next step</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-ink)', marginBottom: 'var(--space-8)' }}>
                  <span style={{ fontWeight: 500, fontSize: '1.25rem' }}>Total</span>
                  <span style={{ fontWeight: 500, fontSize: '1.25rem' }}>{formatPrice(subtotal)}</span>
                </div>

                <Link to="/checkout" className="btn" style={{ display: 'block', width: '100%', textAlign: 'center', backgroundColor: 'var(--color-ink)', color: 'var(--color-ivory)', border: 'none' }}>
                  Proceed to Checkout
                </Link>
                
                <p className="text-label" style={{ textAlign: 'center', marginTop: 'var(--space-4)', color: 'var(--color-stone)', fontSize: '9px', lineHeight: 1.4 }}>
                  Secure encrypted checkout.<br/> Complimentary returns within 14 days.
                </p>
              </div>
            </>
          )}

        </div>
      </section>
    </PageTransition>
  );
};

export default Cart;
