import { useState } from 'react';
import InfoPage from '../components/layout/InfoPage';
import { motion } from 'framer-motion';

const OrderTracking = () => {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = (e) => {
    e.preventDefault();
    const orderNum = e.target.orderNum.value;
    const orders = JSON.parse(localStorage.getItem('alan_orders') || '[]');
    const found = orders.find(o => o.id === orderNum);
    
    if (found) {
      setOrder(found);
      setError('');
    } else {
      setOrder(null);
      setError('Order not found. Please verify your order number.');
    }
  };

  return (
    <InfoPage title="Track Order">
      {!order ? (
        <form onSubmit={handleTrack} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: '400px', margin: '0 auto' }}>
          <p style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>Enter your order number to trace your shipment.</p>
          <input required name="orderNum" placeholder="Order Number (e.g., ORD-1234)" style={{ padding: '12px', border: '1px solid var(--color-ink)', background: 'transparent' }} />
          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
          <button type="submit" style={{ padding: '16px', background: 'var(--color-ink)', color: 'var(--color-white)', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Track
          </button>
        </form>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3 style={{ marginBottom: 'var(--space-4)', textAlign: 'center' }}>Order {order.id} Status</h3>
          <div style={{ padding: 'var(--space-6)', border: '1px solid rgba(0,0,0,0.1)', position: 'relative' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '6px', top: '24px', bottom: '24px', width: '2px', backgroundColor: 'var(--color-ink)', opacity: 0.2 }} />
              
              {['Order Placed', 'Processing', 'Quality Check', 'Dispatched'].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', zIndex: 1 }}>
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: i <= 1 ? 'var(--color-ink)' : 'var(--color-ivory)', border: '2px solid var(--color-ink)' }} />
                  <div>
                    <h4 style={{ margin: 0 }}>{step}</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-stone)' }}>{i === 0 ? order.date : (i === 1 ? 'In Progress' : 'Pending')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => setOrder(null)} style={{ marginTop: 'var(--space-6)', padding: '12px', width: '100%', background: 'transparent', border: '1px solid var(--color-ink)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Track Another
          </button>
        </motion.div>
      )}
    </InfoPage>
  );
};

export default OrderTracking;
