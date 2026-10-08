import { motion } from 'framer-motion';
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
