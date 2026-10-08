const fs = require('fs');
const path = require('path');

const pagesDir = 'src/pages';
const layoutDir = 'src/components/layout';

// 1. Create InfoPage layout
const infoPageCode = `import { motion } from 'framer-motion';
import PageTransition from './PageTransition';
import { Reveal, RevealGroup } from '../ui/Reveal';

const InfoPage = ({ title, children }) => {
  return (
    <PageTransition>
      <section style={{ paddingTop: 'var(--space-24)', paddingBottom: 'var(--space-16)', backgroundColor: 'var(--color-ivory)', minHeight: '100vh' }}>
        <div className="container">
          <RevealGroup stagger={0.1}>
            <Reveal mask>
              <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', textAlign: 'center', marginBottom: 'var(--space-12)', fontFamily: 'var(--font-heading)' }}>
                {title}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ maxWidth: '720px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-ink)' }}>
                {children}
              </div>
            </Reveal>
          </RevealGroup>
        </div>
      </section>
    </PageTransition>
  );
};

export default InfoPage;
`;
fs.writeFileSync(path.join(layoutDir, 'InfoPage.jsx'), infoPageCode);

// 2. Create basic pages
const basicPages = [
  { name: 'ShippingPolicy', title: 'Shipping Policy' },
  { name: 'Terms', title: 'Terms & Conditions' },
  { name: 'Privacy', title: 'Privacy Policy' },
  { name: 'Returns', title: 'Returns Policy' }
];

basicPages.forEach(p => {
  const code = `import InfoPage from '../components/layout/InfoPage';

const ${p.name} = () => {
  return (
    <InfoPage title="${p.title}">
      <p style={{ marginBottom: 'var(--space-4)' }}>
        At A%LAN, we strive to deliver your pieces with the utmost care and precision. Our ${p.title.toLowerCase()} is designed to ensure a seamless and elegant experience from the moment you place your order until it arrives at your door.
      </p>
      <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-3)', marginTop: 'var(--space-8)' }}>Our Commitment</h3>
      <p>
        Every piece is meticulously inspected before dispatch. Should you have any inquiries regarding our policies, our dedicated concierge team is always available to assist you. We believe in transparency and trust as the foundation of our relationship with you.
      </p>
    </InfoPage>
  );
};

export default ${p.name};
`;
  fs.writeFileSync(path.join(pagesDir, p.name + '.jsx'), code);
});

// 3. Create FAQ Page
const faqCode = `import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InfoPage from '../components/layout/InfoPage';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: "Do you offer international shipping?", a: "Yes, we ship globally using premium expedited courier services to ensure safe delivery." },
  { q: "Can I customize a piece?", a: "Absolutely. Many of our pieces can be tailored to your precise measurements. Contact our styling team for more details." },
  { q: "How do I care for my A%LAN garments?", a: "We recommend professional dry cleaning for all our intricately embroidered and delicate silk pieces." },
  { q: "What is your return policy for bespoke items?", a: "Bespoke and made-to-measure items are crafted exclusively for you and are generally non-returnable unless defective." },
  { q: "How long does a custom order take?", a: "Typically, bespoke pieces take between 3 to 6 weeks, depending on the complexity of the craftsmanship." },
  { q: "Are the colors on the website accurate?", a: "We make every effort to display colors accurately, though variations may occur depending on your screen settings." },
  { q: "Do you offer physical consultations?", a: "Yes, we have flagship boutiques in select cities. You can book an appointment online." },
  { q: "How can I track my order?", a: "Once dispatched, you will receive an email with your tracking number and a link to trace your package." }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <InfoPage title="Frequently Asked Questions">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: 'var(--space-4)' }}>
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', padding: 'var(--space-2) 0', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--color-ink)' }}
            >
              {faq.q}
              <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }}>
                <ChevronDown size={20} />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }} 
                  animate={{ height: 'auto', opacity: 1 }} 
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{ paddingTop: 'var(--space-2)', color: 'var(--color-stone)' }}>{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </InfoPage>
  );
};

export default FAQ;
`;
fs.writeFileSync(path.join(pagesDir, 'FAQ.jsx'), faqCode);

// 4. Create Contact Page
const contactCode = `import { useState } from 'react';
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
`;
fs.writeFileSync(path.join(pagesDir, 'Contact.jsx'), contactCode);

// 5. Create OrderTracking Page
const trackCode = `import { useState } from 'react';
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
`;
fs.writeFileSync(path.join(pagesDir, 'OrderTracking.jsx'), trackCode);

// 6. Create ReturnExchange Page
const returnExCode = `import { useState } from 'react';
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
`;
fs.writeFileSync(path.join(pagesDir, 'ReturnExchange.jsx'), returnExCode);

console.log('Successfully created all requested pages.');
