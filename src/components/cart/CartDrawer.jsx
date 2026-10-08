import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import productsData from '../../data/products.json';

import { formatPrice } from '../../utils/formatPrice';

const CartDrawer = () => {
  const { isCartOpen, closeCart, cartItems, removeFromCart, updateQuantity, subtotal, itemCount } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Dimmed Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={closeCart}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'var(--color-ink)', zIndex: 100 }}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ 
              position: 'fixed', 
              top: 0, 
              right: 0, 
              height: '100vh', 
              width: '100%', 
              maxWidth: '440px', 
              backgroundColor: 'var(--color-ivory)', 
              zIndex: 101,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-4px 0 24px rgba(0,0,0,0.1)'
            }}
          >
            {/* Header */}
            <div style={{ padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-ink)' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 500 }}>Your Bag ({itemCount})</h3>
              <button onClick={closeCart} style={{ background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Close Bag">
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {cartItems.length === 0 ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', opacity: 0.6 }}>
                  <p style={{ fontSize: '1.25rem', marginBottom: 'var(--space-2)' }}>Your bag is empty.</p>
                  <p style={{ fontSize: '0.875rem' }}>Curate your collection by adding timeless pieces.</p>
                  <button onClick={closeCart} style={{ marginTop: 'var(--space-6)', padding: '12px 24px', border: '1px solid var(--color-ink)', background: 'transparent', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px' }}>
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={`${item.id}-${item.size}-${item.color}-${idx}`} style={{ display: 'flex', gap: 'var(--space-4)' }}>
                    <div style={{ width: '100px', height: '133px', flexShrink: 0, border: '1px solid var(--color-ink)' }}>
                      <img src={productsData.find(p => p.id === item.id)?.images?.[0] || item?.images?.[0] || item?.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <h4 style={{ fontSize: '1.125rem', margin: 0, fontWeight: 400 }}>{item.name}</h4>
                          <span className="text-label">{formatPrice(item.price)}</span>
                        </div>
                        <p className="text-label" style={{ color: 'var(--color-stone)', marginTop: '8px' }}>{item.color} / {item.size}</p>
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        {/* Quantity Controls */}
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-ink)' }}>
                          <button onClick={() => updateQuantity(idx, -1)} style={{ padding: '4px 8px', border: 'none', background: 'none', cursor: 'pointer' }}><Minus size={12} /></button>
                          <span style={{ fontFamily: 'var(--font-body)', width: '24px', textAlign: 'center', fontSize: '14px' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(idx, 1)} style={{ padding: '4px 8px', border: 'none', background: 'none', cursor: 'pointer' }}><Plus size={12} /></button>
                        </div>
                        
                        <button onClick={() => removeFromCart(idx)} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', padding: 0, cursor: 'pointer', borderBottom: '1px solid var(--color-stone)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-stone)' }}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--color-ink)', backgroundColor: 'var(--color-ivory)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span className="text-label">Subtotal</span>
                  <span className="text-label">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-label" style={{ color: 'var(--color-stone)', fontSize: '10px', marginBottom: 'var(--space-4)' }}>Shipping and taxes calculated at checkout.</p>
                <Link to="/checkout" onClick={closeCart} style={{ display: 'block', width: '100%', padding: '16px 0', backgroundColor: 'var(--color-ink)', color: 'var(--color-ivory)', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none', transition: 'opacity 0.3s' }}>
                  Proceed to Checkout
                </Link>
                <div style={{ textAlign: 'center', marginTop: 'var(--space-3)' }}>
                  <Link to="/cart" onClick={closeCart} className="text-label hover-underline" style={{ fontSize: '10px', color: 'var(--color-stone)' }}>View full bag</Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
