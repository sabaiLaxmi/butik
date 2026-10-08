import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import { Reveal, RevealGroup } from '../components/ui/Reveal';

const NotFound = () => (
  <PageTransition>
    <section style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <RevealGroup stagger={0.1}>
          <Reveal mask width="100%"><h1 style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', marginBottom: 'var(--space-4)' }}>404</h1></Reveal>
          <Reveal width="100%"><p style={{ fontSize: '1.25rem', marginBottom: 'var(--space-8)' }}>The page you are looking for does not exist.</p></Reveal>
          <Reveal delay={0.3} width="100%">
            <Link to="/" className="btn" style={{ border: '1px solid var(--color-ink)', color: 'var(--color-ink)', textDecoration: 'none' }}>
              Return to Homepage
            </Link>
          </Reveal>
        </RevealGroup>
      </div>
    </section>
  </PageTransition>
);

export default NotFound;
