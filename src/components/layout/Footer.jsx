import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <footer style={{ backgroundColor: 'var(--color-ivory)', color: 'var(--color-ink)', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '64px' }}>
      <div className="container footer-grid">
        <style>{`
          .footer-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 48px;
            padding-bottom: 64px;
          }
          @media (min-width: 768px) {
            .footer-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1024px) {
            .footer-grid {
              grid-template-columns: repeat(4, 1fr);
            }
          }
        `}</style>
        
        {/* Column 1: About */}
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '24px', letterSpacing: '0.05em' }}>About our store</h3>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-stone)', marginBottom: '24px' }}>
            A%LAN Ethnic celebrates the rich heritage of Indian craftsmanship, bringing you timeless silhouettes and intricate embroideries for your most cherished moments.
          </p>
          <div style={{ display: 'flex', gap: '16px', color: 'var(--color-ink)' }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
          </div>
        </div>

        {/* Column 2: Information */}
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '24px', letterSpacing: '0.05em' }}>Information</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link to="/faq" style={{ color: 'var(--color-stone)', textDecoration: 'none', fontSize: '14px' }}>FAQ</Link></li>
            <li><Link to="/about" style={{ color: 'var(--color-stone)', textDecoration: 'none', fontSize: '14px' }}>About us</Link></li>
            <li><Link to="/shipping" style={{ color: 'var(--color-stone)', textDecoration: 'none', fontSize: '14px' }}>Shipping Policy</Link></li>
            <li><Link to="/terms" style={{ color: 'var(--color-stone)', textDecoration: 'none', fontSize: '14px' }}>Terms of service</Link></li>
            <li><Link to="/privacy" style={{ color: 'var(--color-stone)', textDecoration: 'none', fontSize: '14px' }}>Privacy Policy</Link></li>
            <li><Link to="/returns" style={{ color: 'var(--color-stone)', textDecoration: 'none', fontSize: '14px' }}>Returns & Cancellations Policy</Link></li>
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '24px', letterSpacing: '0.05em' }}>Quick links</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link to="/contact" style={{ color: 'var(--color-stone)', textDecoration: 'none', fontSize: '14px' }}>Contact Us</Link></li>
            <li><Link to="/track" style={{ color: 'var(--color-stone)', textDecoration: 'none', fontSize: '14px' }}>Order Tracking</Link></li>
            <li><Link to="/exchange" style={{ color: 'var(--color-stone)', textDecoration: 'none', fontSize: '14px' }}>Raise Return / Exchange</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '24px', letterSpacing: '0.05em' }}>Newsletter</h3>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-stone)', marginBottom: '16px' }}>
            Sign up for exclusive offers, original stories, events and more.
          </p>
          <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input 
              type="email" 
              placeholder="Your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '12px', border: '1px solid rgba(0,0,0,0.1)', background: 'var(--color-white)', fontSize: '14px', outline: 'none' }}
            />
            <button type="submit" style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-white)', border: 'none', padding: '12px', fontSize: '14px', fontWeight: 500, letterSpacing: '0.05em', cursor: 'pointer' }}>
              SUBSCRIBE
            </button>
            {status === 'success' && <p style={{ color: 'green', fontSize: '12px', margin: 0 }}>Thank you for subscribing!</p>}
            {status === 'error' && <p style={{ color: 'red', fontSize: '12px', margin: 0 }}>Please enter a valid email.</p>}
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', padding: '24px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '13px', color: 'var(--color-stone)', margin: 0 }}>
            &copy; 2026 A%LAN ETHNIC. All rights reserved.
          </p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-white)', border: '1px solid rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-ink)' }}>
            <ChevronRight size={20} style={{ transform: 'rotate(-90deg)' }} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
