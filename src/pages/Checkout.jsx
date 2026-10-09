import { useState, useEffect } from 'react';
import { useNavigate, Navigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { Reveal, RevealGroup } from '../components/ui/Reveal';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

import { formatPrice } from '../utils/formatPrice';

const Checkout = () => {
  const { user, addOrder } = useAuth();
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const instantItem = location.state?.instantItem;

  const checkoutItems = instantItem ? [instantItem] : cartItems;
  const checkoutSubtotal = instantItem ? (instantItem.price * instantItem.quantity) : subtotal;

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: user?.address || '',
    city: '',
    state: '',
    pincode: ''
  });
  const [delivery, setDelivery] = useState('Standard');
  const [errors, setErrors] = useState({});

  if (checkoutItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const shippingCost = checkoutSubtotal >= 5000 ? 0 : 150;
  const total = checkoutSubtotal + shippingCost;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = "Valid phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim() || formData.pincode.length < 5) newErrors.pincode = "Valid PIN/ZIP code is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [toast, setToast] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const orderNumber = `ELN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      const newOrder = {
        id: orderNumber,
        date: new Date().toISOString(),
        items: [...checkoutItems],
        shippingDetails: formData,
        deliveryMethod: delivery,
        paymentMethod: 'Cash on delivery',
        subtotal: checkoutSubtotal,
        shippingCost,
        total,
        status: 'Processing'
      };

      if (user && addOrder) {
        addOrder(newOrder);
      }
      
      if (!instantItem) {
        clearCart();
      }
      
      // Show success toast
      setToast({ type: 'success', message: 'Your order is placed successfully!' });
      
      // Show popup instead of navigating
      setPlacedOrder(newOrder);
      setShowPopup(true);
    } else {
      setToast({ type: 'error', message: 'Please fill in all required fields.' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <PageTransition>
      {/* Toast Notification Container */}
      <div style={{
        position: 'fixed', top: '24px', left: '50%', transform: toast ? 'translate(-50%, 0)' : 'translate(-50%, -20px)', zIndex: 9999,
        pointerEvents: toast ? 'auto' : 'none',
        transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
        opacity: toast ? 1 : 0
      }}>
        {toast && (
          <div style={{
            display: 'flex', gap: '12px', alignItems: 'center',
            backgroundColor: toast.type === 'error' ? '#fff' : 'var(--color-ink)', 
            color: toast.type === 'error' ? '#e74c3c' : '#fff',
            padding: '16px 24px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            border: `1px solid ${toast.type === 'error' ? '#e74c3c' : 'var(--color-ink)'}`,
            fontWeight: 500, letterSpacing: '0.05em'
          }}>
            {toast.message}
          </div>
        )}
      </div>

      {/* Fullscreen Confirmation Popup */}
      <AnimatePresence>
        {showPopup && placedOrder && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
            />
            
            {/* Modal */}
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
                <Link to="/shop" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '16px', backgroundColor: 'transparent', color: 'var(--color-ivory)', border: '1px solid rgba(255,255,255,0.2)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px', borderRadius: '4px' }}>
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section style={{ paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-20)', backgroundColor: 'var(--color-ivory)' }}>
        <div className="container grid-12" style={{ alignItems: 'flex-start' }}>
          
          <div style={{ gridColumn: 'span 12', marginBottom: 'var(--space-8)' }}>
            <Reveal mask><h1 style={{ fontSize: '3rem' }}>Checkout</h1></Reveal>
          </div>

          {/* Form */}
          <div style={{ gridColumn: 'span 7', paddingRight: 'var(--space-8)' }}>
            <RevealGroup stagger={0.1}>
              <form onSubmit={handleSubmit}>
                <Reveal width="100%">
                  <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--color-ink)', paddingBottom: '8px' }}>Contact Information</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                    <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
                    <Input label="Phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} />
                  </div>
                </Reveal>

                <Reveal width="100%">
                  <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', marginTop: 'var(--space-6)', borderBottom: '1px solid var(--color-ink)', paddingBottom: '8px' }}>Shipping Address</h3>
                  <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
                  <Input label="Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} />
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
                    <Input label="City" name="city" value={formData.city} onChange={handleChange} error={errors.city} />
                    <Input label="State" name="state" value={formData.state} onChange={handleChange} error={errors.state} />
                    <Input label="PIN / ZIP" name="pincode" value={formData.pincode} onChange={handleChange} error={errors.pincode} />
                  </div>
                </Reveal>

                <Reveal width="100%">
                  <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', marginTop: 'var(--space-6)', borderBottom: '1px solid var(--color-ink)', paddingBottom: '8px' }}>Delivery Option</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <label style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', border: delivery === 'Standard' ? '1px solid var(--color-ink)' : '1px solid var(--color-stone)', cursor: 'pointer', opacity: delivery === 'Standard' ? 1 : 0.6 }}>
                      <div>
                        <input type="radio" name="delivery" value="Standard" checked={delivery === 'Standard'} onChange={() => setDelivery('Standard')} style={{ marginRight: '16px', accentColor: 'var(--color-ink)' }} />
                        <span>Standard Delivery (3-5 Business Days)</span>
                      </div>
                      <span>Free</span>
                    </label>
                    <label style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', border: delivery === 'Express' ? '1px solid var(--color-ink)' : '1px solid var(--color-stone)', cursor: 'pointer', opacity: delivery === 'Express' ? 1 : 0.6 }}>
                      <div>
                        <input type="radio" name="delivery" value="Express" checked={delivery === 'Express'} onChange={() => setDelivery('Express')} style={{ marginRight: '16px', accentColor: 'var(--color-ink)' }} />
                        <span>Express Delivery (1-2 Business Days)</span>
                      </div>
                      <span>₹150</span>
                    </label>
                  </div>
                </Reveal>

                <Reveal width="100%">
                  <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', marginTop: 'var(--space-6)', borderBottom: '1px solid var(--color-ink)', paddingBottom: '8px' }}>Payment Method</h3>
                  <div style={{ padding: '16px', border: '1px solid var(--color-ink)', backgroundColor: 'rgba(20,20,20,0.02)' }}>
                    <p style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-ink)', marginRight: '16px' }} />
                      Cash on Delivery (Demo)
                    </p>
                    <p style={{ fontSize: '12px', color: 'var(--color-stone)', marginTop: '8px', marginLeft: '28px' }}>Payment will be collected upon delivery of your order.</p>
                  </div>
                </Reveal>

                <Reveal delay={0.4} width="100%">
                  <button type="submit" className="btn" style={{ width: '100%', marginTop: 'var(--space-8)', backgroundColor: 'var(--color-ink)', color: 'var(--color-ivory)', border: 'none', padding: '20px 0' }}>
                    Complete Order
                  </button>
                </Reveal>
              </form>
            </RevealGroup>
          </div>

          {/* Order Summary */}
          <div style={{ gridColumn: 'span 5', position: 'sticky', top: '120px', backgroundColor: 'var(--color-white)', padding: 'var(--space-6)', border: '1px solid var(--color-ink)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--color-ink)', paddingBottom: '8px' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', maxHeight: '40vh', overflowY: 'auto' }}>
              {checkoutItems.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  <div style={{ width: '64px', height: '85px', flexShrink: 0, border: '1px solid var(--color-ink)' }}>
                    <img src={item?.images?.[0] || item?.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h4 style={{ fontSize: '14px', margin: 0, fontWeight: 400 }}>{item.name}</h4>
                      <span className="text-label">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <p className="text-label" style={{ color: 'var(--color-stone)', marginTop: '4px' }}>Qty: {item.quantity}</p>
                    <p className="text-label" style={{ color: 'var(--color-stone)', marginTop: '2px' }}>{item.color} / {item.size}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--color-stone)', paddingTop: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span className="text-label" style={{ color: 'var(--color-stone)' }}>Subtotal</span>
                <span className="text-label">{formatPrice(checkoutSubtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                <span className="text-label" style={{ color: 'var(--color-stone)' }}>Shipping</span>
                <span className="text-label">{shippingCost === 0 ? 'Free' : `${shippingCost === 0 ? "Free" : formatPrice(shippingCost)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-ink)', paddingTop: 'var(--space-4)' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 500 }}>Total</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 500 }}>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </PageTransition>
  );
};

export default Checkout;
