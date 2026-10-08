import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import CartDrawer from './components/cart/CartDrawer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Confirmation from './pages/Confirmation';
import About from './pages/About';
import Journal from './pages/Journal';
import NotFound from './pages/NotFound';
import FAQ from './pages/FAQ';
import ShippingPolicy from './pages/ShippingPolicy';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Returns from './pages/Returns';
import Contact from './pages/Contact';
import OrderTracking from './pages/OrderTracking';
import ReturnExchange from './pages/ReturnExchange';

function App() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      '/': 'ÉLAN | Elegance, With Intention.',
      '/shop': 'Shop | ÉLAN',
      '/cart': 'Your Bag | ÉLAN',
      '/checkout': 'Checkout | ÉLAN',
      '/login': 'Sign In | ÉLAN',
      '/signup': 'Create Account | ÉLAN',
      '/profile': 'Profile | ÉLAN',
      '/about': 'About | ÉLAN',
      '/journal': 'Journal | ÉLAN',
      '/confirmation': 'Thank You | ÉLAN'
    };
    
    // For dynamic routes like /shop/:id, we just set a fallback
    if (location.pathname.startsWith('/shop/') && location.pathname.length > 6) {
      document.title = 'Product | ÉLAN';
    } else {
      document.title = titles[location.pathname] || 'ÉLAN';
    }
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/shipping" element={<ShippingPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/track" element={<OrderTracking />} />
            <Route path="/exchange" element={<ReturnExchange />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer />
    </>
  );
}

export default App;
