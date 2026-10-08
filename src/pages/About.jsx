import PageTransition from '../components/layout/PageTransition';
import { Reveal, RevealGroup } from '../components/ui/Reveal';
import ImageReveal from '../components/ui/ImageReveal';

const About = () => {
  return (
    <PageTransition>
      {/* Hero Title Section */}
      <section style={{ paddingTop: '80px', paddingBottom: '40px', textAlign: 'center' }}>
        <div className="container">
          <RevealGroup stagger={0.15}>
            <Reveal mask width="100%">
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400, letterSpacing: '0.02em', marginBottom: '16px', lineHeight: 1.1 }}>
                Heritage,<br />Crafted With Love.
              </h1>
            </Reveal>
            <Reveal width="100%">
              <p style={{ fontSize: '1.125rem', color: 'var(--color-stone)', maxWidth: '700px', margin: '0 auto' }}>
                We believe that true luxury lies in our roots. Our garments celebrate the rich Indian craftsmanship, designed to become the crown jewels of your ethnic wardrobe.
              </p>
            </Reveal>
          </RevealGroup>
        </div>
      </section>

      {/* Hero Image Collage */}
      <section style={{ paddingBottom: '60px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxHeight: '500px', overflow: 'hidden' }}>
          <div style={{ position: 'relative', height: '100%', minHeight: '300px' }}>
            <ImageReveal src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto/q_auto/l3.jpg" alt="Fashion Detail 1" />
          </div>
          <div style={{ position: 'relative', height: '100%', minHeight: '300px' }}>
            <ImageReveal src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto/q_auto/sarees3.jpg" alt="Fashion Detail 2" />
          </div>
          <div style={{ position: 'relative', height: '100%', minHeight: '300px' }}>
            <ImageReveal src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto/q_auto/l1.png" alt="Fashion Detail 3" />
          </div>
        </div>
      </section>

      {/* The Story Split */}
      <section style={{ paddingBottom: '60px' }}>
        <div className="container grid-12" style={{ alignItems: 'center' }}>
          
          <div style={{ gridColumn: 'span 5', paddingRight: '32px' }}>
            <RevealGroup stagger={0.15}>
              <Reveal mask><h2 style={{ fontSize: '3rem', marginBottom: '24px' }}>Our Story</h2></Reveal>
              <Reveal>
                <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '24px' }}>
                  Founded on the belief that traditional artistry deserves a modern stage. A%LAN Ethnic creates pieces that transcend seasons, celebrating India's rich textiles and centuries-old weaving techniques.
                </p>
              </Reveal>
              <Reveal>
                <p style={{ color: 'var(--color-stone)', lineHeight: 1.8, marginBottom: '24px' }}>
                  Every garment is meticulously crafted by master artisans. We focus on precise tailoring and enduring quality, rejecting fleeting trends in favor of timeless elegance. We take pride in our roots, drawing inspiration from the vibrant colors of royal courts and the intricate motifs of ancient Indian architecture.
                </p>
              </Reveal>
              <Reveal>
                <p style={{ color: 'var(--color-stone)', lineHeight: 1.8, marginBottom: '24px' }}>
                  Our journey began with a simple vision: to empower the modern woman with attire that speaks volumes of her cultural heritage while allowing her to move with contemporary grace. From the silken threads of Banarasi weaves to the delicate hand-embroidered zardozi work, every stitch tells a story of passion and dedication.
                </p>
              </Reveal>
              <Reveal>
                <p style={{ color: 'var(--color-ink)', lineHeight: 1.8, fontWeight: 500 }}>
                  Wear your heritage. Own your elegance.
                </p>
              </Reveal>
            </RevealGroup>
          </div>

          <div style={{ gridColumn: '7 / span 6', display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1, marginTop: '40px', aspectRatio: '3/4', backgroundColor: 'var(--color-ivory)' }}>
              <ImageReveal src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto/q_auto/sarees1.png" alt="Fabric details" />
            </div>
            <div style={{ flex: 1, aspectRatio: '3/4', backgroundColor: 'var(--color-ivory)' }}>
              <ImageReveal src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto/q_auto/l2.jpg" alt="Artisan work" />
            </div>
          </div>
          
        </div>
      </section>

      {/* The Atelier Split (Reversed) */}
      <section style={{ paddingBottom: '80px', backgroundColor: 'var(--color-ivory)', paddingTop: '60px', borderTop: '1px solid var(--color-ink)' }}>
        <style dangerouslySetInnerHTML={{__html: `
          .atelier-layout {
            display: grid;
            grid-template-columns: 1fr;
            gap: 48px;
            align-items: center;
          }
          .atelier-images {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
          @media (min-width: 900px) {
            .atelier-layout {
              grid-template-columns: 1fr 1fr;
              gap: 64px;
            }
          }
        `}} />
        <div className="container atelier-layout">
          
          <div className="atelier-images">
            <div style={{ aspectRatio: '1/1' }}>
              <ImageReveal src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto/q_auto/k2.jpg" alt="Studio Detail" />
            </div>
            <div style={{ aspectRatio: '1/1', marginTop: '32px' }}>
              <ImageReveal src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto/q_auto/sarees2.jpg" alt="Studio Work" />
            </div>
          </div>

          <div>
            <RevealGroup stagger={0.15}>
              <Reveal mask><h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3rem)', marginBottom: '24px' }}>The Atelier</h2></Reveal>
              <Reveal>
                <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '16px', position: 'relative', zIndex: 2 }}>
                  Our atelier is a space of vibrant creation, where age-old techniques meet contemporary silhouettes.
                </p>
              </Reveal>
              <Reveal>
                <p style={{ color: 'var(--color-stone)', lineHeight: 1.8, position: 'relative', zIndex: 2 }}>
                  We partner directly with weaving clusters across India. Each intricate embroidery and delicate motif is hand-finished to ensure lasting beauty and unparalleled grace.
                </p>
              </Reveal>
            </RevealGroup>
          </div>

        </div>
      </section>
    </PageTransition>
  );
};

export default About;
