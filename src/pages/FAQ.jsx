import { useState } from 'react';
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
