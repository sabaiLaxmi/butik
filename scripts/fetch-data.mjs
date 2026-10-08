import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CATEGORIES = [
  'womens-dresses', 'womens-shoes', 'womens-bags', 'womens-jewellery',
  'womens-watches', 'mens-shirts', 'mens-shoes', 'mens-watches', 'sunglasses', 'tops'
];

const BRAND_NAME_PREFIXES = ['The', 'Essential', 'Signature', 'Classic', 'Tailored', 'Structured'];
const BRAND_NAME_ADJECTIVES = ['Silk', 'Linen', 'Cashmere', 'Leather', 'Gold', 'Silver', 'Minimal', 'Sartorial'];

const generateBrandName = (originalName, category) => {
  const prefix = BRAND_NAME_PREFIXES[Math.floor(Math.random() * BRAND_NAME_PREFIXES.length)];
  const adj = BRAND_NAME_ADJECTIVES[Math.floor(Math.random() * BRAND_NAME_ADJECTIVES.length)];
  
  let noun = 'Piece';
  if (category.includes('dresses')) noun = 'Slip';
  if (category.includes('shoes')) noun = 'Loafer';
  if (category.includes('bags')) noun = 'Tote';
  if (category.includes('jewellery') || category.includes('watches')) noun = 'Timepiece';
  if (category.includes('shirts') || category.includes('tops')) noun = 'Blouse';
  if (category.includes('sunglasses')) noun = 'Frames';
  
  return `${prefix} ${adj} ${noun}`;
};

const generateDescription = () => {
  const descriptions = [
    "Crafted with meticulous attention to detail. This piece embodies quiet luxury and enduring style.",
    "A foundational wardrobe element designed for seamless integration. Its understated silhouette speaks volumes.",
    "Defined by clean lines and exceptional materials. It offers effortless sophistication for the modern minimalist.",
    "An exploration of form and function. Designed to transcend seasonal trends.",
    "Refined and perfectly proportioned. This is everyday elegance reimagined."
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const getSizesAndColors = (category) => {
  let sizes = ['XS', 'S', 'M', 'L'];
  let colors = ['Ink', 'Ivory', 'Stone'];
  
  if (category.includes('shoes')) {
    sizes = ['36', '37', '38', '39', '40', '41'];
    colors = ['Ink', 'Leather', 'Suede'];
  }
  if (category.includes('bags') || category.includes('jewellery') || category.includes('watches') || category.includes('sunglasses')) {
    sizes = ['One Size'];
    if (category.includes('jewellery') || category.includes('watches')) {
      colors = ['Gold', 'Silver'];
    }
  }
  return { sizes, colors };
};

const getCollection = (category) => {
  if (category.includes('womens') || category === 'tops') return 'Women';
  if (category.includes('mens')) return 'Men';
  return 'Accessories'; // sunglasses
};

const downloadImage = async (url, dest) => {
  const res = await fetch(url);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(dest, buffer);
};

const fetchProducts = async () => {
  let allProducts = [];
  const publicImagesDir = path.join(__dirname, '../public/images/products');
  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
  }

  // To simulate New Arrivals
  const newArrivalsIndices = [0, 5, 10, 15, 20];

  let idCounter = 1;
  for (const cat of CATEGORIES) {
    const res = await fetch(`https://dummyjson.com/products/category/${cat}`);
    const data = await res.json();
    
    // Take 3-4 products per category
    const productsToTake = data.products.slice(0, 3 + Math.floor(Math.random() * 2));
    
    for (const product of productsToTake) {
      const elegantName = generateBrandName(product.title, cat);
      const { sizes, colors } = getSizesAndColors(cat);
      const collection = getCollection(cat);
      const isNewArrival = newArrivalsIndices.includes(idCounter);
      
      const imageUrl = product.images[0];
      const imageFileName = `${product.id}.jpg`;
      const imagePath = path.join(publicImagesDir, imageFileName);
      
      if (imageUrl) {
        try {
          await downloadImage(imageUrl, imagePath);
          
          allProducts.push({
            id: product.id.toString(),
            originalName: product.title,
            name: elegantName,
            description: generateDescription(),
            price: product.price,
            category: cat,
            collections: isNewArrival ? [collection, 'New Arrivals'] : [collection],
            sizes,
            colors,
            image: `/images/products/${imageFileName}`,
            brand: 'ÉLAN'
          });
          idCounter++;
        } catch (e) {
          console.error(`Failed to download image for ${product.id}`);
        }
      }
    }
  }
  
  return allProducts;
};

const fetchHeroImages = async () => {
  const credits = [];
  const publicImagesDir = path.join(__dirname, '../public/images/hero');
  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
  }

  const queries = ['fashion editorial', 'minimal fashion', 'luxury clothing', 'atelier', 'fabric texture', 'minimalist aesthetic'];
  
  const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;
  if (!UNSPLASH_KEY) {
    console.warn("No UNSPLASH_ACCESS_KEY found. Skipping editorial images.");
    return [];
  }
  
  for (let i = 0; i < queries.length; i++) {
    const q = queries[i];
    try {
      const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&per_page=1&orientation=portrait&client_id=${UNSPLASH_KEY}`);
      const data = await res.json();
      
      if (data.results && data.results.length > 0) {
        const photo = data.results[0];
        const imageUrl = photo.urls.regular;
        const imageFileName = `editorial-${i + 1}.jpg`;
        const imagePath = path.join(publicImagesDir, imageFileName);
        
        await downloadImage(imageUrl, imagePath);
        
        credits.push({
          id: `editorial-${i + 1}`,
          image: `/images/hero/${imageFileName}`,
          photographer: photo.user.name,
          photographerUrl: photo.user.links.html,
          query: q
        });
      }
    } catch (e) {
      console.error(`Failed to fetch hero image for query ${q}`);
    }
  }
  
  return credits;
};

const main = async () => {
  console.log("Fetching products...");
  const products = await fetchProducts();
  
  console.log("Fetching editorial images...");
  const credits = await fetchHeroImages();
  
  const dataDir = path.join(__dirname, '../src/data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(dataDir, 'products.json'), JSON.stringify(products, null, 2));
  fs.writeFileSync(path.join(dataDir, 'credits.json'), JSON.stringify(credits, null, 2));
  
  const collectionsList = ['Women', 'Men', 'Accessories', 'New Arrivals'];
  fs.writeFileSync(path.join(dataDir, 'collections.json'), JSON.stringify(collectionsList, null, 2));
  
  console.log(`Data fetching complete. Saved ${products.length} products.`);
};

main();
