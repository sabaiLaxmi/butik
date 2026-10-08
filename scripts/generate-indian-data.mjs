import fs from 'fs';
import path from 'path';

const products = [
  {
    id: "eth-001",
    name: "Royal Crimson Lehenga Choli",
    description: "Intricately embroidered crimson lehenga with zardozi work. Perfect for bridal and grand festive occasions.",
    price: 850.00,
    category: "Women",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    colors: ["Crimson Red", "Gold"],
    sizes: ["S", "M", "L", "XL"],
    brand: "ÉLAN Ethnic"
  },
  {
    id: "eth-002",
    name: "Ivory Silk Sherwani",
    description: "Classic ivory silk sherwani for men, featuring subtle threadwork and a matching safa. Elegant and regal.",
    price: 620.00,
    category: "Men",
    image: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?q=80&w=800&auto=format&fit=crop",
    colors: ["Ivory", "Cream"],
    sizes: ["38", "40", "42", "44"],
    brand: "ÉLAN Ethnic"
  },
  {
    id: "eth-003",
    name: "Emerald Green Silk Saree",
    description: "A breathtaking emerald green silk saree with gold zari border. A timeless classic for any traditional gathering.",
    price: 450.00,
    category: "Women",
    image: "https://images.unsplash.com/photo-1550614000-4b95d41b12b2?q=80&w=800&auto=format&fit=crop",
    colors: ["Emerald Green"],
    sizes: ["Free Size"],
    brand: "ÉLAN Ethnic"
  },
  {
    id: "eth-004",
    name: "Midnight Blue Kurta Set",
    description: "A sharp midnight blue raw silk kurta set for men. Minimalist yet striking.",
    price: 210.00,
    category: "Men",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop",
    colors: ["Midnight Blue", "Black"],
    sizes: ["38", "40", "42", "44"],
    brand: "ÉLAN Ethnic"
  },
  {
    id: "eth-005",
    name: "Pastel Floral Lehenga",
    description: "Lightweight pastel lehenga with delicate floral embroidery, ideal for sangeet or daytime ceremonies.",
    price: 580.00,
    category: "Women",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
    colors: ["Pastel Pink", "Mint Green"],
    sizes: ["XS", "S", "M", "L"],
    brand: "ÉLAN Ethnic"
  },
  {
    id: "eth-006",
    name: "Charcoal Velvet Bandhgala",
    description: "Luxurious charcoal grey velvet bandhgala jacket. Sophisticated formal wear for evening receptions.",
    price: 750.00,
    category: "Men",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop",
    colors: ["Charcoal", "Black"],
    sizes: ["38", "40", "42"],
    brand: "ÉLAN Ethnic"
  },
  {
    id: "eth-007",
    name: "Gold Plated Kundan Set",
    description: "Heavy bridal Kundan necklace set with matching earrings and maang tikka.",
    price: 320.00,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1558769132-cb1fac084092?q=80&w=800&auto=format&fit=crop",
    colors: ["Gold"],
    sizes: ["One Size"],
    brand: "ÉLAN Jewels"
  },
  {
    id: "eth-008",
    name: "Embroidered Mojari Shoes",
    description: "Traditional handcrafted mojari shoes with intricate gold threadwork.",
    price: 120.00,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    colors: ["Tan", "Gold"],
    sizes: ["8", "9", "10", "11"],
    brand: "ÉLAN Footwear"
  }
];

fs.writeFileSync(path.join(process.cwd(), 'src/data/products.json'), JSON.stringify(products, null, 2));
console.log('Successfully generated Indian ethnic wear product data with reliable images.');
