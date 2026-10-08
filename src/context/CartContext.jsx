import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('elan_cart');
      return localData ? JSON.parse(localData) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('elan_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product, quantity, size, color) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size && item.color === color);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity, size, color }];
    });
    
    // Show Toast
    setToast({ product, size, color, quantity });
    setTimeout(() => setToast(null), 3000);
    
    // Optionally still open cart, but usually a toast replaces it. 
    // We will leave openCart() commented out if they prefer just the toast.
    // openCart();
  };

  const updateQuantity = (index, delta) => {
    setCartItems(prev => prev.map((item, i) => {
      if (i === index) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      isCartOpen, openCart, closeCart, 
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart,
      subtotal, itemCount 
    }}>
      {children}
      
      {/* Toast Notification Container */}
      <div style={{
        position: 'fixed', top: '24px', right: '24px', zIndex: 9999,
        pointerEvents: toast ? 'auto' : 'none',
        transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
        transform: toast ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.95)',
        opacity: toast ? 1 : 0
      }}>
        {toast && (
          <div style={{
            display: 'flex', gap: '16px', alignItems: 'center',
            backgroundColor: '#fff', padding: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            border: '1px solid var(--color-ink)', minWidth: '320px'
          }}>
            <img 
              src={toast.product?.images?.[0] || toast.product?.image} 
              alt={toast.product?.name} 
              style={{ width: '50px', height: '65px', objectFit: 'cover', border: '1px solid #eee' }} 
            />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Added to Bag</p>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px' }}>{toast.product?.name}</p>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-stone)' }}>{toast.color} / {toast.size}</p>
            </div>
            <button 
              onClick={() => openCart()} 
              style={{ padding: '8px 12px', backgroundColor: 'var(--color-ink)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
            >
              View
            </button>
          </div>
        )}
      </div>
    </CartContext.Provider>
  );
};
