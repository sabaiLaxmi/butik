import { useState } from 'react';
import InfoPage from '../components/layout/InfoPage';

const Contact = () => {
  const [status, setStatus] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name: e.target.name.value, email: e.target.email.value, message: e.target.message.value };
    localStorage.setItem('lastContact', JSON.stringify(data));
    setStatus('success');
    e.target.reset();
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <InfoPage title="Contact Us">
      <p style={{ marginBottom: 'var(--space-8)', textAlign: 'center' }}>Our concierge team is here to assist you with styling advice, orders, and inquiries.</p>
      
      {status === 'success' ? (
        <div style={{ padding: 'var(--space-4)', backgroundColor: 'rgba(0,128,0,0.05)', border: '1px solid rgba(0,128,0,0.2)', textAlign: 'center' }}>
          <h4 style={{ color: 'green', marginBottom: '8px' }}>Message Sent Successfully</h4>
          <p>An A%LAN representative will contact you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="text-label">Name</label>
            <input required name="name" type="text" style={{ padding: '12px', border: '1px solid var(--color-ink)', background: 'transparent' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="text-label">Email</label>
            <input required name="email" type="email" style={{ padding: '12px', border: '1px solid var(--color-ink)', background: 'transparent' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="text-label">Message</label>
            <textarea required name="message" rows="5" style={{ padding: '12px', border: '1px solid var(--color-ink)', background: 'transparent' }}></textarea>
          </div>
          <button type="submit" style={{ padding: '16px', background: 'var(--color-ink)', color: 'var(--color-white)', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Send Message
          </button>
        </form>
      )}
    </InfoPage>
  );
};

export default Contact;
