import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import { Reveal, RevealGroup } from '../components/ui/Reveal';
import ImageReveal from '../components/ui/ImageReveal';

const articles = [
  {
    id: 1,
    title: "The Art of Zardozi",
    date: "October 12, 2026",
    category: "Craftsmanship",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    excerpt: "Discover the centuries-old embroidery technique that breathes life into our bridal lehengas, preserved by master artisans."
  },
  {
    id: 2,
    title: "Weaving Heritage: Silk Sarees",
    date: "September 28, 2026",
    category: "Heritage",
    image: "https://images.unsplash.com/photo-1550614000-4b95d41b12b2?q=80&w=800&auto=format&fit=crop",
    excerpt: "A journey through the handloom process of our pure silk sarees, from raw thread to the final six yards of elegance."
  },
  {
    id: 3,
    title: "Modern Silhouettes in Menswear",
    date: "September 15, 2026",
    category: "Style",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop",
    excerpt: "How we are redefining the classic Sherwani and Kurta sets for the contemporary groom."
  }
];

const Journal = () => {
  return (
    <PageTransition>
      <section style={{ paddingTop: '160px', paddingBottom: 'var(--space-20)', backgroundColor: 'var(--color-ivory)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <RevealGroup stagger={0.2}>
            <Reveal mask width="100%">
              <h1 style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 400, letterSpacing: '0.02em', marginBottom: 'var(--space-6)' }}>
                The Journal
              </h1>
            </Reveal>
            <Reveal width="100%">
              <p style={{ fontSize: '1.25rem', color: 'var(--color-stone)', maxWidth: '600px', margin: '0 auto' }}>
                Stories of craftsmanship, heritage, and the artisans behind our collections.
              </p>
            </Reveal>
          </RevealGroup>
        </div>
      </section>

      <section style={{ paddingBottom: 'var(--space-24)', backgroundColor: 'var(--color-ivory)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-8)' }}>
            {articles.map((article, idx) => (
              <div key={article.id} style={{ display: 'flex', flexDirection: 'column' }}>
                <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ aspectRatio: '4/5', backgroundColor: '#eee', marginBottom: 'var(--space-4)', overflow: 'hidden' }}>
                    <ImageReveal src={article.image} alt={article.title} delay={idx * 0.1} />
                  </div>
                  <Reveal delay={0.2 + (idx * 0.1)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span className="text-label" style={{ color: 'var(--color-stone)' }}>{article.category}</span>
                      <span className="text-label" style={{ color: 'var(--color-stone)' }}>{article.date}</span>
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: 'var(--space-3)' }}>{article.title}</h3>
                    <p style={{ color: 'var(--color-stone)', lineHeight: 1.6 }}>{article.excerpt}</p>
                    <span className="text-label hover-underline" style={{ display: 'inline-block', marginTop: 'var(--space-4)' }}>Read More</span>
                  </Reveal>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Journal;
