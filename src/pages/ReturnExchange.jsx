import { useState } from 'react';
import InfoPage from '../components/layout/InfoPage';

const ReturnExchange = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('success');
  };

  return (
    <InfoPage title="Return & Exchange">
      {status === 'success' ? (
        <div style={{ padding: 'var(--space-4)', backgroundColor: 'rgba(0,128,0,0.05)', border: '1px solid rgba(0,128,0,0.2)', textAlign: 'center' }}>
          <h4 style={{ color: 'green', marginBottom: '8px' }}>Request Received</h4>
          <p>Our team will review your request and email you the return instructions within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: '500px', margin: '0 auto' }}>
          <p style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>Initiate a return or exchange for an eligible item.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="text-label">Order Number</label>
            <input required name="orderNum" placeholder="ORD-XXXXXX" style={{ padding: '12px', border: '1px solid var(--color-ink)', background: 'transparent' }} />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="text-label">Email Address</label>
            <input required name="email" type="email" style={{ padding: '12px', border: '1px solid var(--color-ink)', background: 'transparent' }} />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="text-label">Reason for Return/Exchange</label>
            <select required name="reason" style={{ padding: '12px', border: '1px solid var(--color-ink)', background: 'transparent', fontFamily: 'inherit' }}>
              <option value="">Select a reason</option>
              <option value="size">Size Issue</option>
              <option value="defective">Defective/Damaged</option>
              <option value="wrong">Received Wrong Item</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <button type="submit" style={{ padding: '16px', background: 'var(--color-ink)', color: 'var(--color-white)', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 'var(--space-2)' }}>
            Submit Request
          </button>
        </form>
      )}
    </InfoPage>
  );
};

export default ReturnExchange;
