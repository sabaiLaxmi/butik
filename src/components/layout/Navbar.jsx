import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Logo from '../ui/Logo';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { openCart, itemCount } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };
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
      <style>{`
        .navbar-main-header { padding: 8px 32px; }
        .nav-search-input { width: 150px; }
        .nav-actions { gap: 20px; }
        .nav-categories-list {
          display: flex;
          justify-content: center;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 8px 0;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
        }
        @media (max-width: 768px) {
          .navbar-main-header { padding: 8px 16px !important; }
          .nav-search-input { width: 80px !important; }
          .nav-actions { gap: 12px !important; }
          .nav-categories-list {
            justify-content: flex-start !important;
            overflow-x: auto;
            white-space: nowrap;
            padding-left: 16px !important;
            padding-right: 16px !important;
            gap: 24px !important;
            scrollbar-width: none;
          }
          .nav-categories-list::-webkit-scrollbar { display: none; }
        }
      `}</style>

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
        <div className="navbar-main-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Left: Empty (for balancing center) */}
          <div style={{ flex: 1 }}></div>

          {/* Center: Logo */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'var(--color-ink)' }}>
              <Logo />
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="nav-actions" style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '4px', borderBottom: '1px solid var(--color-stone)', paddingBottom: '2px', marginRight: '16px' }}>
              <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--color-ink)', display: 'flex' }}>
                <Search size={18} strokeWidth={1.5} />
              </button>
              <input 
                className="nav-search-input"
                type="text"
                placeholder="SEARCH"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-ink)' }}
              />
            </form>

            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-ink)' }}>
              <Heart size={20} strokeWidth={1.5} />
            </button>
            <Link to={user ? "/profile" : "/login"} style={{ color: 'var(--color-ink)' }}>
              <User size={20} strokeWidth={1.5} />
            </Link>
            <button onClick={openCart} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-ink)', position: 'relative' }}>
              <ShoppingBag size={20} strokeWidth={1.5} />
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
          <ul className="nav-categories-list">
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
