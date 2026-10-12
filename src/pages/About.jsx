import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
                  Founded on the belief that traditional artistry deserves a modern stage. Vastrika creates pieces that transcend seasons, celebrating India's rich textiles and centuries-old weaving techniques.
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

      {/* The Atelier Split Section */}
      <section className="relative overflow-hidden py-12 md:py-16 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          
          {/* Images: On desktop left column (order-1), on mobile below text (order-2) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 md:order-1 grid grid-cols-2 gap-3 w-full"
          >
            {/* Image 1: Sherwani cutout on soft blush card */}
            <div className="relative aspect-[3/4] max-h-[240px] md:max-h-[380px] bg-[#F3E6E2] rounded-2xl flex flex-col items-center justify-center p-3 md:p-5 overflow-hidden shadow-sm">
              <img
                src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto,q_auto,h_700/v1791704696/sher.png"
                alt="Artisanal Sherwani"
                className="w-full h-full max-h-[85%] object-contain relative z-10 drop-shadow-sm select-none"
              />
              {/* Code-made blurred ellipse ground shadow */}
              <div className="w-[65%] h-[14px] md:h-[18px] rounded-full bg-black/20 blur-md mt-1 z-0" />
            </div>

            {/* Image 2: Saree set cutout on soft blush card, sits 24px lower (mt-6) on desktop */}
            <div className="relative aspect-[3/4] max-h-[240px] md:max-h-[380px] bg-[#F3E6E2] rounded-2xl flex flex-col items-center justify-center p-3 md:p-5 overflow-hidden shadow-sm md:mt-6">
              <img
                src="https://res.cloudinary.com/snuwehqj/image/upload/f_auto,q_auto,h_700/v1791704710/sareeset.png"
                alt="Handcrafted Saree Set"
                className="w-full h-full max-h-[85%] object-contain relative z-10 drop-shadow-sm select-none"
              />
              {/* Code-made blurred ellipse ground shadow */}
              <div className="w-[65%] h-[14px] md:h-[18px] rounded-full bg-black/20 blur-md mt-1 z-0" />
            </div>
          </motion.div>

          {/* Text Block: On desktop right column (order-2), on mobile first (order-1) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 md:order-2 flex flex-col justify-center space-y-3"
          >
            {/* Eyebrow */}
            <span className="text-xs uppercase tracking-widest font-semibold text-[var(--color-stone)]">
              OUR STORY
            </span>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-ink)] font-normal leading-tight font-playfair">
              The Atelier
            </h2>

            {/* One short paragraph, max 3 lines */}
            <p className="text-sm md:text-base text-[var(--color-stone)] leading-relaxed max-w-lg m-0">
              Our atelier is a space of vibrant creation, where age-old techniques meet contemporary silhouettes. We partner directly with weaving clusters across India, finishing each piece with care.
            </p>

            {/* Small link with underline hover */}
            <div className="pt-1">
              <Link
                to="/about"
                className="inline-flex items-center text-sm font-medium text-[var(--color-ink)] hover:underline underline-offset-4 transition-all"
              >
                Our Story &rarr;
              </Link>
            </div>
          </motion.div>

        </div>
      </section>
    </PageTransition>
  );
};

export default About;
