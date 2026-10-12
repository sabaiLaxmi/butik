// src/data/products.js
// Cloudinary helper to inject optimizations: f_auto,q_auto,h_900
export const getOptimizedImageUrl = (url, usePng = false) => {
  if (!url) return '';
  const transform = usePng ? 'f_png,q_auto,h_900' : 'f_auto,q_auto,h_900';
  return url.replace('/image/upload/', `/image/upload/${transform}/`);
};

export const products = [
  {
    id: 'fish-cut-lehenga',
    title: 'Fish Cut Lehenga',
    tagline: 'Sculpted Silhouette & Luminescent Grace',
    description: 'A bespoke mermaid cut tailored in dusty rose organza with undulating sequin wave embroidery.\nCascades into a sweeping flared hem, curated for breathtaking celebratory grand entrances.',
    price: '$1,280',
    oldPrice: '$1,650',
    img: 'https://res.cloudinary.com/snuwehqj/image/upload/v1791704699/fish_1.png',
    bg: '#2F4A3F', // Deep forest emerald - contrasting with soft mauve/rose
    accent: '#F3E8D2', // Warm champagne ivory for high legibility
    badge: 'Couture Edition',
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'royal-sherwani',
    title: 'Royal Heritage Sherwani',
    tagline: 'Princely Splendor in Woven Silk',
    description: 'Impeccably tailored ivory raw silk adorned with intricate rose-gold zardozi hand embroidery.\nFinished with ornamental jewel buttons, capturing timeless aristocracy for the groom.',
    price: '$1,450',
    oldPrice: '$1,890',
    img: 'https://res.cloudinary.com/snuwehqj/image/upload/v1791704696/sher.png',
    bg: '#5A1E2B', // Regal royal maroon - stark, breathtaking contrast with ivory silk
    accent: '#F7E7CE', // Antique gold text
    badge: 'Masterpiece',
    sizes: ['38', '40', '42']
  },
  {
    id: 'embroidered-lehenga',
    title: 'Embroidered Bridal Lehenga',
    tagline: 'Hand-Embellished Antique Poetry',
    description: 'Opulent dusty blush lehenga handcrafted with hundreds of micro-pearls and zardozi needlework.\nDraped with a pre-pleated tissue dupatta that catches candlelight with soft radiance.',
    price: '$1,620',
    oldPrice: '$2,100',
    img: 'https://res.cloudinary.com/snuwehqj/image/upload/v1791704695/lehngar.png',
    bg: '#2B2B2B', // Haute charcoal velvet - highlights delicate dusty blush and gold thread
    accent: '#F9EDE3', // Pearl blush ivory
    badge: 'Handcrafted',
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'sapphire-saree',
    title: 'Sapphire Floral Silk Saree',
    tagline: 'Celestial Drapes with Golden Florets',
    description: 'Lustrous sapphire blue pure silk canvas interwoven with delicate heritage gold jaal work.\nFalls with an effortless, liquid contour that commands timeless grace at every soiree.',
    price: '$890',
    oldPrice: '$1,150',
    img: 'https://res.cloudinary.com/snuwehqj/image/upload/v1791704710/sareeset.png',
    bg: '#E8DCCB', // Warm luxury beige - vivid contrast against deep sapphire blue
    accent: '#231D19', // Deep dark espresso - crisp readability against warm beige
    badge: 'Pure Silk',
    sizes: ['Free Size', 'Custom']
  },
  {
    id: 'maroon-kurta-set',
    title: 'Crimson Velvet Kurta Set',
    tagline: 'Subtle Majesty & Effortless Poise',
    description: 'Deep crimson wine tunic detailed with delicate tone-on-tone neckline embroidery.\nPaired with matching wide-leg trousers and a gossamer drape for refined festive luxury.',
    price: '$650',
    oldPrice: '$820',
    img: 'https://res.cloudinary.com/snuwehqj/image/upload/v1791704697/kurtaset.png',
    bg: '#1F2A44', // Deep imperial navy - dramatic contrast with rich crimson maroon
    accent: '#F4ECE1', // Soft alabaster cream
    badge: 'Festive Classic',
    sizes: ['S', 'M', 'L', 'XL']
  }
];

export default products;
