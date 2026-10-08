const fs = require('fs');
const path = 'c:/Users/Admin/Desktop/faishon/src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Filter out the 5 kurtas I added previously
const filteredData = data.filter(p => !p.id.startsWith('kur-10'));

const images = [
  "https://res.cloudinary.com/snuwehqj/image/upload/v1791437677/musterd.jpg",
  "https://res.cloudinary.com/snuwehqj/image/upload/v1791437677/emerald_silk.jpg",
  "https://res.cloudinary.com/snuwehqj/image/upload/v1791437677/dusty_rose.jpg",
  "https://res.cloudinary.com/snuwehqj/image/upload/v1791437676/mens_blue_kurta.jpg",
  "https://res.cloudinary.com/snuwehqj/image/upload/v1791437676/men_white_chikankari.jpg",
  "https://res.cloudinary.com/snuwehqj/image/upload/v1791437676/white.jpg",
  "https://res.cloudinary.com/snuwehqj/image/upload/v1791437676/men_rose_kurta.jpg",
  "https://res.cloudinary.com/snuwehqj/image/upload/v1791437676/blue_kurta.jpg",
  "https://res.cloudinary.com/snuwehqj/image/upload/v1791437676/musterd_kurta.jpg"
];

const newKurtas = images.map((imgUrl, index) => {
  return {
    "id": `kur-10${index + 1}`,
    "name": `Kurta Set Edition ${index + 1}`,
    "department": "Men",
    "type": "Kurta",
    "price": 10000 + (index * 500),
    "tags": ["new", "bestseller"],
    "fabric": "Silk Blend",
    "work": "Thread Work",
    "colors": ["Multicolor"],
    "sizes": ["S", "M", "L", "XL"],
    "description": "An elegantly crafted kurta set, perfect for festive occasions.",
    "deliveryNote": "Ships in 1-2 weeks",
    "rating": 4.8,
    "reviews": 20 + index,
    "stock": 10,
    "imageQuery": "mens kurta",
    "images": [imgUrl], // Each product gets exactly 1 image
    "demo": true
  };
});

filteredData.push(...newKurtas);

fs.writeFileSync(path, JSON.stringify(filteredData, null, 2), 'utf8');
console.log("Fixed kurta products successfully.");
