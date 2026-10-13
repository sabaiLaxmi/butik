import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import { Reveal } from '../components/ui/Reveal';
import ImageReveal from '../components/ui/ImageReveal';
import productsData from '../data/products.json';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

const COLOR_PALETTE = [
  { match: /\bdusty rose\b/i, name: 'Dusty Rose', hex: '#C98D83' },
  { match: /\brose gold\b/i, name: 'Rose Gold', hex: '#B76E79' },
  { match: /\bblush pink\b/i, name: 'Blush Pink', hex: '#E8C5C8' },
  { match: /\b(soft pink|pastel pink)\b/i, name: 'Soft Pink', hex: '#F4C2C2' },
  { match: /\bpink\b/i, name: 'Pink', hex: '#EFA7A7' },
  { match: /\bnavy blue\b/i, name: 'Navy Blue', hex: '#1B2838' },
  { match: /\bice blue\b/i, name: 'Ice Blue', hex: '#9BB8CD' },
  { match: /\bmidnight blue\b/i, name: 'Midnight Blue', hex: '#191970' },
  { match: /\bblue\b/i, name: 'Royal Blue', hex: '#2B4C7E' },
  { match: /\bchocolate brown\b/i, name: 'Chocolate Brown', hex: '#5C3317' },
  { match: /\bbrown\b/i, name: 'Brown', hex: '#6E473B' },
  { match: /\bvibrant red\b/i, name: 'Vibrant Red', hex: '#9E2A2B' },
  { match: /\b(red|crimson)\b/i, name: 'Red', hex: '#9E2A2B' },
  { match: /\b(deep maroon|royal maroon|maroon|burgundy)\b/i, name: 'Deep Maroon', hex: '#4A1521' },
  { match: /\b(ivory|off-white|cream)\b/i, name: 'Ivory', hex: '#F4EFEA' },
  { match: /\bwhite\b/i, name: 'Pristine White', hex: '#FFFFFF' },
  { match: /\b(midnight black|black)\b/i, name: 'Midnight Black', hex: '#1A1A1A' },
  { match: /\bbeige\b/i, name: 'Beige', hex: '#D8C7B5' },
  { match: /\bgold\b/i, name: 'Regal Gold', hex: '#C5A059' },
  { match: /\bsilver\b/i, name: 'Silver', hex: '#C0C0C0' },
  { match: /\b(ash grey|grey)\b/i, name: 'Ash Grey', hex: '#9E9E9E' },
  { match: /\bolive green\b/i, name: 'Olive Green', hex: '#556B2F' },
  { match: /\bemerald( green)?\b/i, name: 'Emerald Green', hex: '#1B4D3E' },
  { match: /\bmint\b/i, name: 'Pastel Mint', hex: '#A8E6CF' },
  { match: /\brust orange\b/i, name: 'Rust Orange', hex: '#C85A17' },
  { match: /\borange\b/i, name: 'Orange', hex: '#D35400' },
  { match: /\b(ochre yellow|ochre)\b/i, name: 'Ochre Yellow', hex: '#CC7722' },
  { match: /\b(mustard)\b/i, name: 'Mustard Yellow', hex: '#D4A338' },
  { match: /\byellow\b/i, name: 'Yellow', hex: '#F1C40F' },
  { match: /\bbronze\b/i, name: 'Metallic Bronze', hex: '#8C6239' },
  { match: /\baquamarine\b/i, name: 'Aquamarine', hex: '#7FFFD4' }
];

const getColorHex = (name) => {
  const found = COLOR_PALETTE.find(p => p.match.test(name) || p.name.toLowerCase() === name.toLowerCase());
  if (found) return found.hex;
  const lower = name.toLowerCase();
  if (lower === 'ivory') return '#F4EFEA';
  if (lower === 'ink') return '#141414';
  if (lower === 'stone') return '#6B675F';
  if (lower === 'gold') return '#D4AF37';
  if (lower === 'silver') return '#C0C0C0';
  if (lower === 'leather') return '#8B5A2B';
  return '#3B1C1C';
};

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ borderBottom: '1px solid var(--color-ink)' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3) 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
      >
        {title}
        {isOpen ? <ChevronUp size={16} strokeWidth={1} /> : <ChevronDown size={16} strokeWidth={1} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ paddingBottom: 'var(--space-3)', color: 'var(--color-stone)' }}>{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const product = productsData.find(p => p.id === id) || productsData[0];
  const relatedProducts = productsData.filter(p => (p.type === product.type || p.department === product.department) && p.id !== product.id).slice(0, 4);

  // Gallery images with fallbacks for products with 1 image
  const gallery = useMemo(() => {
    if (product.images && product.images.length > 1) {
      return product.images;
    }
    const base = product.images?.[0];
    if (!base) return [];
    const relatedSameType = productsData
      .filter(p => p.id !== product.id && p.type === product.type && p.images?.[0])
      .map(p => p.images[0]);
    const fallbacks = relatedSameType.length >= 3 
      ? relatedSameType.slice(0, 3) 
      : productsData.filter(p => p.id !== product.id && p.images?.[0]).map(p => p.images[0]).slice(0, 3);
    return [base, ...fallbacks];
  }, [product]);

  // Color Swatches
  const colorSwatches = useMemo(() => {
    const nonMulti = (product.colors || []).filter(c => c.toLowerCase() !== 'multicolor');
    if (nonMulti.length > 0) {
      return nonMulti.map(name => ({
        name,
        hex: getColorHex(name)
      }));
    }
    let primary = null;
    for (const entry of COLOR_PALETTE) {
      if (entry.match.test(product.name)) {
        primary = { name: entry.name, hex: entry.hex };
        break;
      }
    }
    if (!primary) primary = { name: 'Deep Maroon', hex: '#3B1C1C' };
    const neutrals = [
      { name: 'Ivory', hex: '#F4EFEA' },
      { name: 'Deep Maroon', hex: '#3B1C1C' },
      { name: 'Regal Gold', hex: '#C5A059' }
    ].filter(c => c.name.toLowerCase() !== primary.name.toLowerCase());

    return [primary, ...neutrals.slice(0, 2)];
  }, [product]);

  const [activeImage, setActiveImage] = useState(product.images?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(colorSwatches[0]?.name || 'Deep Maroon');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  useEffect(() => {
    if (product.images?.[0]) {
      setActiveImage(product.images[0]);
    }
    if (colorSwatches[0]?.name) {
      setSelectedColor(colorSwatches[0].name);
    }
    if (product.sizes?.[0]) {
      setSelectedSize(product.sizes[0]);
    }
    setQuantity(1);
  }, [product.id, product.images, product.sizes, colorSwatches]);

  const isCutout = activeImage?.toLowerCase().includes('.png');

  const handleInstantBuy = () => {
    navigate('/checkout', { state: { instantItem: { ...product, quantity, size: selectedSize, color: selectedColor } } });
  };

  return (
    <PageTransition>
      {/* Fullscreen Confirmation Popup for Instant Buy */}
      <AnimatePresence>
        {showPopup && placedOrder && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{ position: 'relative', width: '90%', maxWidth: '480px', backgroundColor: 'var(--color-ink)', color: 'var(--color-ivory)', padding: 'var(--space-8)', borderRadius: '12px', boxShadow: '0 24px 48px rgba(0,0,0,0.2)', textAlign: 'center' }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                <CheckCircle size={64} strokeWidth={1} color="#d4af37" />
              </div>
              <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 300, marginBottom: 'var(--space-2)' }}>Confirmed!</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', marginBottom: 'var(--space-6)', lineHeight: 1.5 }}>
                Your beautiful pieces are being prepared.<br />
                Order <strong style={{ color: '#d4af37' }}>{placedOrder.id}</strong>
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link to="/profile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '16px', backgroundColor: '#d4af37', color: 'var(--color-ink)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px', fontWeight: 600, borderRadius: '4px' }}>
                  View My Profile
                </Link>
                <button onClick={() => setShowPopup(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '16px', backgroundColor: 'transparent', color: 'var(--color-ivory)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px', borderRadius: '4px' }}>
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 1. Page container: max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12. Layout: grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start. */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* 2. Gallery (left column): lg:sticky lg:top-24 */}
          <div className="w-full lg:sticky lg:top-24">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 items-start w-full">
              {/* Thumbnails: Desktop vertical strip on the left (w-16 gap-3, each thumbnail h-20 w-16 object-cover rounded-lg, the active one with a maroon border). Mobile horizontal scroll row below main image (flex overflow-x-auto gap-2). */}
              <div className="order-2 lg:order-1 flex lg:flex-col overflow-x-auto lg:overflow-visible w-full lg:w-16 shrink-0 gap-2 lg:gap-3 py-1 lg:py-0">
                {gallery.map((img, i) => {
                  const isActive = activeImage === img;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`relative shrink-0 w-16 h-20 rounded-lg overflow-hidden cursor-pointer transition-all p-0 bg-[#F3E6E2] ${
                        isActive
                          ? 'border-2 border-[#3B1C1C]'
                          : 'border-2 border-transparent opacity-70 hover:opacity-100'
                      }`}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${i + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </button>
                  );
                })}
              </div>

              {/* Main image wrapper: aspect-[3/4], w-full, max-h-[640px], overflow-hidden, rounded-2xl, bg-[#F3E6E2]. The image inside uses w-full h-full object-cover (for photos) or object-contain with padding (for transparent cutouts). It must never be taller than the viewport: use max-h-[calc(100vh-120px)]. */}
              <div
                className="order-1 lg:order-2 flex-1 w-full aspect-[3/4] max-h-[640px] max-h-[calc(100vh-120px)] overflow-hidden rounded-2xl bg-[#F3E6E2] relative flex items-center justify-center shadow-sm"
                style={{ maxHeight: 'min(640px, calc(100vh - 120px))' }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className={`w-full h-full ${isCutout ? 'object-contain p-4 md:p-6' : 'object-cover'}`}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* 3. Details (right column): space-y-6. Title text-3xl md:text-4xl leading-tight, price text-xl, description text-sm md:text-base leading-relaxed. */}
          <div className="w-full space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif leading-tight text-[var(--color-ink)] mb-2 font-normal">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-xl font-medium text-[var(--color-ink)]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm line-through text-[var(--color-stone)]">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-sm md:text-base leading-relaxed text-[var(--color-stone)] m-0">
                {product.description}
              </p>
            </div>

            {/* Color label and swatches: swatch h-9 w-9 rounded-full, and show the selected color's name (do not show "MULTICOLOR" next to a single black swatch). */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider uppercase text-[var(--color-ink)]">Color</span>
                <span className="text-xs uppercase tracking-wider text-[var(--color-stone)] font-medium">
                  {selectedColor}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {colorSwatches.map(swatch => {
                  const isSelected = selectedColor === swatch.name;
                  return (
                    <button
                      key={swatch.name}
                      type="button"
                      onClick={() => setSelectedColor(swatch.name)}
                      className={`h-9 w-9 rounded-full transition-all flex items-center justify-center p-0.5 cursor-pointer bg-transparent border-none ${
                        isSelected
                          ? 'ring-2 ring-[#3B1C1C] ring-offset-2'
                          : 'hover:scale-105 opacity-80 hover:opacity-100'
                      }`}
                      title={swatch.name}
                      aria-label={swatch.name}
                    >
                      <span
                        className="w-full h-full rounded-full border border-black/10 shadow-inner block"
                        style={{ backgroundColor: swatch.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size buttons: min-w-[56px] h-11 rounded-lg. */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider uppercase text-[var(--color-ink)]">Size</span>
                <button
                  type="button"
                  className="text-xs uppercase tracking-wider text-[var(--color-stone)] hover:underline cursor-pointer bg-transparent border-none p-0"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[56px] h-11 px-3 rounded-lg border text-xs font-semibold tracking-wider transition-all cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? 'bg-[var(--color-ink)] text-white border-[var(--color-ink)]'
                          : 'bg-transparent text-[var(--color-ink)] border-[var(--color-ink)]/30 hover:border-[var(--color-ink)]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity stepper h-12. */}
            <div className="space-y-3">
              <span className="text-xs font-semibold tracking-wider uppercase text-[var(--color-ink)] block">
                Quantity
              </span>
              <div className="inline-flex items-center border border-[var(--color-ink)] rounded-lg h-12 px-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center text-[var(--color-ink)] hover:opacity-70 cursor-pointer bg-transparent border-none"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span className="w-10 text-center font-medium text-sm text-[var(--color-ink)]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center text-[var(--color-ink)] hover:opacity-70 cursor-pointer bg-transparent border-none"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            {/* 4. Buttons row: flex flex-wrap gap-3. "Add to bag" and "Place an order" each flex-1 min-w-[140px] h-12, whitespace-nowrap, text-sm, so the label never wraps. Stack them full width on mobile. */}
            <div className="pdp-buttons-row flex flex-col md:flex-row flex-wrap gap-3 pt-2 w-full">
              <button
                type="button"
                onClick={() => addToCart(product, quantity, selectedSize, selectedColor)}
                className="add-to-bag-btn flex-1 min-w-[140px] w-full md:w-auto h-12 whitespace-nowrap text-sm font-semibold tracking-wider uppercase rounded-lg border border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white transition-colors cursor-pointer flex items-center justify-center"
              >
                Add to bag
              </button>
              <button
                type="button"
                onClick={handleInstantBuy}
                className="place-order-btn flex-1 min-w-[140px] w-full md:w-auto h-12 whitespace-nowrap text-sm font-semibold tracking-wider uppercase rounded-lg border border-[#d4af37] bg-[#d4af37] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:border-[var(--color-ink)] hover:text-[#d4af37] transition-colors cursor-pointer flex items-center justify-center"
              >
                Place an order
              </button>
              <style>{`
                @media (max-width: 767px) {
                  .pdp-buttons-row {
                    flex-direction: column !important;
                  }
                  .pdp-buttons-row > button {
                    width: 100% !important;
                    min-width: 100% !important;
                  }
                }
                @media (min-width: 768px) {
                  .pdp-buttons-row {
                    flex-direction: row !important;
                  }
                  .pdp-buttons-row > button {
                    flex: 1 1 0% !important;
                    min-width: 140px !important;
                  }
                }
              `}</style>
            </div>

            {/* Accordions */}
            <div className="border-t border-[var(--color-ink)]/20 pt-2 mt-6">
              <Accordion title="Details" content={product.description + " Hand-finished construction ensures lasting durability and comfort."} />
              <Accordion title="Care" content="Dry clean only. Store flat in a cool, dry place." />
              <Accordion title="Shipping & Returns" content="Complimentary express shipping on all orders. Returns accepted within 14 days of delivery." />
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      <section className="border-t border-[var(--color-ink)]/20 mt-12 pt-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <Reveal mask>
            <h3 className="text-2xl md:text-3xl font-serif text-[var(--color-ink)] mb-8 font-normal">
              You May Also Like
            </h3>
          </Reveal>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p, i) => (
              <div key={p.id} className="flex flex-col gap-3 min-w-0">
                <Link to={`/shop/${p.id}`} className="no-underline text-inherit group block">
                  <ImageReveal src={p.images[0]} alt={p.name} delay={i * 0.1} />
                  <div className="mt-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                      <h4 className="text-sm md:text-base font-normal m-0 group-hover:underline line-clamp-1">
                        {p.name}
                      </h4>
                      <span className="text-xs uppercase tracking-wider text-[var(--color-stone)] shrink-0 font-medium">
                        {formatPrice(p.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    </PageTransition>
  );
};

export default ProductDetail;
