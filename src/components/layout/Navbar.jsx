import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Logo from '../ui/Logo';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { openCart, itemCount } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 1. Top Utility / Announcement Bar */}
      <div style={{ backgroundColor: 'var(--color-ivory)', borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '6px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
        <div style={{ display: 'flex', gap: '12px', color: 'var(--color-stone)', fontWeight: 500 }}>
          <span>FB</span>
          <span>IG</span>
          <span>YT</span>
        </div>
        <div style={{ fontWeight: 500, letterSpacing: '0.05em' }}>
          GRAND FESTIVE SALE | UPTO 60% OFF ON ETHNIC WEAR
        </div>
        <div style={{ width: '100px' }}>{/* Spacer for center alignment */}</div>
      </div>

      {/* 2. Main Header Bar (Sticky) */}
      <header style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 50, 
        backgroundColor: 'var(--color-white)', 
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        boxShadow: scrolled ? '0 4px 12px rgba(0,0,0,0.03)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px' }}>
          
          {/* Left: Search */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-stone)' }}>
            <Search size={20} strokeWidth={1.5} />
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Search</span>
          </div>

          {/* Center: Logo */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'var(--color-ink)' }}>
              <Logo />
            </Link>
          </div>

          {/* Right: Actions */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-ink)' }}>
              <Heart size={22} strokeWidth={1.5} />
            </button>
            <Link to={user ? "/profile" : "/login"} style={{ color: 'var(--color-ink)' }}>
              <User size={22} strokeWidth={1.5} />
            </Link>
            <button onClick={openCart} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-ink)', position: 'relative' }}>
              <ShoppingBag size={22} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span style={{ position: 'absolute', top: '-6px', right: '-8px', backgroundColor: 'var(--color-ink)', color: 'var(--color-white)', fontSize: '10px', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 3. Category Navigation Bar */}
        <nav style={{ borderTop: '1px solid rgba(0,0,0,0.05)', backgroundColor: 'var(--color-white)' }}>
          <ul style={{ display: 'flex', justifyContent: 'center', gap: '32px', listStyle: 'none', margin: 0, padding: '12px 0', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
            <li><Link to="/shop?category=New" style={{ textDecoration: 'none', color: 'var(--color-ink)' }}>New Arrivals</Link></li>
            <li><Link to="/shop?category=Bestsellers" style={{ textDecoration: 'none', color: 'var(--color-ink)' }}>Bestsellers</Link></li>
            <li><Link to="/shop?category=Lehenga" style={{ textDecoration: 'none', color: 'var(--color-ink)' }}>Lehengas</Link></li>
            <li><Link to="/shop?category=Sherwani" style={{ textDecoration: 'none', color: 'var(--color-ink)' }}>Sherwanis</Link></li>
            <li><Link to="/shop?category=Saree" style={{ textDecoration: 'none', color: 'var(--color-ink)' }}>Sarees</Link></li>
            <li><Link to="/shop?category=Kurta" style={{ textDecoration: 'none', color: 'var(--color-ink)' }}>Kurta Sets</Link></li>
            <li><Link to="/shop?category=Accessories" style={{ textDecoration: 'none', color: 'var(--color-ink)' }}>Accessories</Link></li>
            <li><Link to="/shop?category=Sale" style={{ textDecoration: 'none', color: 'var(--color-discount)' }}>Sale</Link></li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
