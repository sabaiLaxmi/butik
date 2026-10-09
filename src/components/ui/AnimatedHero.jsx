import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, ArrowLeft, ArrowRight, Menu } from 'lucide-react';
import './AnimatedHero.css';

import productsData from '../../data/products.json';

const lehengaData = productsData.find(p => p.type === 'Lehenga') || {};
const sherwaniData = productsData.find(p => p.type === 'Sherwani') || {};
const sareeData = productsData.find(p => p.type === 'Saree') || {};
const kurtaData = productsData.find(p => p.type === 'Kurta') || {};
const accessoriesData = productsData.find(p => p.type === 'Accessories' || p.department === 'Accessories') || {};

const products = [
  {
    id: 1,
    name: lehengaData.name || "Festive Lehenga",
    image: lehengaData.images?.[0] || "https://res.cloudinary.com/snuwehqj/image/upload/f_auto/q_auto/l1.png",
    color1: "#6B0f1a", 
    color2: "#2d060b", 
    textColor: "#ffffff",
    price: lehengaData.price ? `$${lehengaData.price}` : "$450",
    oldPrice: lehengaData.price ? `$${Math.round(lehengaData.price * 1.3)}` : "$600",
    heading: "The Crimson Elegance",
    description: "Step into the spotlight with our exquisite Lehenga. A masterpiece of traditional craftsmanship.",
    sizes: ["S", "M", "L"]
  },
  {
    id: 2,
    name: sherwaniData.name || "Royal Sherwani",
    image: sherwaniData.images?.[0] || "https://res.cloudinary.com/snuwehqj/image/upload/f_auto/q_auto/l2.jpg",
    color1: "#0a192f", 
    color2: "#020c1b", 
    textColor: "#ffffff",
    price: sherwaniData.price ? `$${sherwaniData.price}` : "$520",
    oldPrice: sherwaniData.price ? `$${Math.round(sherwaniData.price * 1.3)}` : "$750",
    heading: "Midnight Allure",
    description: "Command the room in this sleek, intricately crafted Sherwani. Pure midnight magic.",
    sizes: ["M", "L", "XL"]
  },
  {
    id: 3,
    name: sareeData.name || "Silk Saree",
    image: sareeData.images?.[0] || "https://res.cloudinary.com/snuwehqj/image/upload/f_auto/q_auto/sarees1.png",
    color1: "#0b3b24", 
    color2: "#04170e", 
    textColor: "#ffffff",
    price: sareeData.price ? `$${sareeData.price}` : "$380",
    oldPrice: sareeData.price ? `$${Math.round(sareeData.price * 1.3)}` : "$490",
    heading: "Emerald Majesty",
    description: "Rich textures and timeless draping come together in this breathtaking traditional Saree.",
    sizes: ["FS"]
  },
  {
    id: 4,
    name: kurtaData.name || "Kurta Set",
    image: kurtaData.images?.[0] || "https://res.cloudinary.com/snuwehqj/image/upload/f_auto/q_auto/l3.jpg",
    color1: "#8b5a2b", 
    color2: "#4a3017", 
    textColor: "#ffffff",
    price: kurtaData.price ? `$${kurtaData.price}` : "$210",
    oldPrice: kurtaData.price ? `$${Math.round(kurtaData.price * 1.3)}` : "$290",
    heading: "Golden Hour",
    description: "A perfect blend of comfort and festive style in this elegant Kurta set.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 5,
    name: accessoriesData.name || "Premium Accessories",
    image: accessoriesData.images?.[0] || "https://images.unsplash.com/photo-1599643478524-fb66f70d00f8?w=800&q=80",
    color1: "#1c1c1c", 
    color2: "#000000", 
    textColor: "#ffffff",
    price: accessoriesData.price ? `$${accessoriesData.price}` : "$150",
    oldPrice: accessoriesData.price ? `$${Math.round(accessoriesData.price * 1.3)}` : "$195",
    heading: "The Final Touch",
    description: "Elevate your ensemble with handcrafted ethnic accessories designed for the modern royal.",
    sizes: ["OS"]
  }
];

const AnimatedHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const shouldReduceMotion = useReducedMotion();

  const currentProduct = products[currentIndex];
  const nextIndex = (currentIndex + 1) % products.length;
  const nextProduct = products[nextIndex];

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next >= products.length) next = 0;
      if (next < 0) next = products.length - 1;
      return next;
    });
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, paginate]);

  // Framer motion variants
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.7 },
        scale: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
      }
    },
    exit: (dir) => ({
      x: dir < 0 ? 200 : -200,
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.7 },
        scale: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
      }
    })
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.5, ease: "easeOut" }
    })
  };

  const floatAnimation = shouldReduceMotion ? {} : {
    y: [-12, 12, -12],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    }
  };

  const shadowAnimation = shouldReduceMotion ? {} : {
    scale: [0.9, 1.1, 0.9],
    opacity: [0.5, 0.3, 0.5],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    }
  };

  return (
    <div 
      className="animated-hero-container"
      style={{
        '--c1': currentProduct.color1,
        '--c2': currentProduct.color2,
        color: currentProduct.textColor
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Navigation */}
      <nav className="hero-nav">
        <div className="hero-logo">VASTRIKA</div>
        
        <div className="glass-menu">
          <Link to="/shop?category=Lehenga">Festive Collection</Link>
          <Link to="/shop">All Products</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="hero-icons">
          <button className="hero-icon-btn d-md-none"><Menu size={20} /></button>
          <Link to="/shop" className="hero-icon-btn"><Heart size={20} /></Link>
          <Link to="/cart" className="hero-icon-btn"><ShoppingBag size={20} /></Link>
        </div>
      </nav>

      {/* Main Content Grid */}
      <div className="hero-content-grid">
        
        {/* Left Side: Text Content */}
        <div className="hero-left">
          <div className="hero-arrows">
            <button className="arrow-btn" onClick={() => paginate(-1)}>
              <ArrowLeft size={20} />
            </button>
            <button className="arrow-btn" onClick={() => paginate(1)}>
              <ArrowRight size={20} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id + "-text"}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
              <motion.h1 className="hero-heading" custom={0} variants={textVariants}>
                {currentProduct.heading}
              </motion.h1>
              <motion.p className="hero-desc" custom={1} variants={textVariants}>
                {currentProduct.description}
              </motion.p>
              <motion.div custom={2} variants={textVariants}>
                <Link to="/shop" className="hero-cta">
                  Get the look &rarr;
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center: Image */}
        <div className="hero-center">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentProduct.id}
              custom={direction}
              variants={shouldReduceMotion ? {} : variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="dress-container"
            >
              <motion.img 
                src={currentProduct.image} 
                alt={currentProduct.name} 
                className="dress-image"
                animate={floatAnimation}
              />
              <motion.div 
                className="dress-shadow"
                animate={shadowAnimation}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Price & Size */}
        <div className="hero-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id + "-price"}
              initial="hidden"
              animate="visible"
              exit="hidden"
              style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
              <motion.div className="price-container" custom={3} variants={textVariants}>
                <span className="current-price">{currentProduct.price}</span>
                <span className="old-price">{currentProduct.oldPrice}</span>
              </motion.div>

              <motion.div className="size-selector" custom={4} variants={textVariants}>
                <span className="size-label">Choose your size:</span>
                <div className="size-pills">
                  {currentProduct.sizes.map(size => (
                    <button 
                      key={size}
                      className={`size-pill ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Bottom Footer Area */}
      <div className="hero-footer">
        <div className="social-icons">
          <a href="#" style={{ textDecoration: 'none' }}>IG</a>
          <a href="#" style={{ textDecoration: 'none' }}>TW</a>
          <a href="#" style={{ textDecoration: 'none' }}>FB</a>
        </div>
        
        <div className="hero-caption">
          Confidence, wrapped in elegance
        </div>

        <div className="thumbnail-preview" onClick={() => paginate(1)}>
          <div className="thumb-text">
            <span style={{ opacity: 0.7, fontSize: '0.7rem' }}>Next</span><br/>
            <strong>{nextProduct.name}</strong>
          </div>
          <div className="thumb-image">
            <img src={nextProduct.image} alt="Next product" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default AnimatedHero;
