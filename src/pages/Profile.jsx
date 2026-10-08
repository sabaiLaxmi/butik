import { useState, useEffect } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import { Reveal, RevealGroup } from '../components/ui/Reveal';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { User } from 'lucide-react';

import { formatPrice } from '../utils/formatPrice';

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (user) {
      setAddress(user.address || '');
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const handleSave = () => {
    updateProfile({ address });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <PageTransition>
      <section style={{ paddingTop: 'var(--space-20)', paddingBottom: 'var(--space-20)', minHeight: '80vh' }}>
        <div className="container grid-12" style={{ alignItems: 'flex-start' }}>
          
          <div style={{ gridColumn: 'span 4', paddingRight: 'var(--space-8)' }}>
            <RevealGroup stagger={0.1}>
              <Reveal mask><h1 style={{ fontSize: '3rem', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: '16px' }}><User size={40} /></h1></Reveal>
              <Reveal><p className="text-label" style={{ marginBottom: '4px' }}>Name</p></Reveal>
              <Reveal><p style={{ marginBottom: 'var(--space-4)', fontSize: '1.25rem' }}>{user.name}</p></Reveal>
              
              <Reveal><p className="text-label" style={{ marginBottom: '4px' }}>Email</p></Reveal>
              <Reveal><p style={{ marginBottom: 'var(--space-8)', fontSize: '1.125rem', color: 'var(--color-stone)' }}>{user.email}</p></Reveal>

              <Reveal delay={0.3} width="100%">
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', padding: 0, borderBottom: '1px solid var(--color-ink)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Sign Out
                </button>
              </Reveal>
            </RevealGroup>
          </div>

          <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
            
            <Reveal delay={0.2} width="100%">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--color-ink)', paddingBottom: 'var(--space-2)' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 400 }}>Shipping Address</h3>
                  <button onClick={() => isEditing ? handleSave() : setIsEditing(true)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {isEditing ? 'Save' : 'Edit'}
                  </button>
                </div>
                
                {isEditing ? (
                  <Input 
                    label="Full Address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                  />
                ) : (
                  <p style={{ color: address ? 'var(--color-ink)' : 'var(--color-stone)' }}>
                    {address || "No shipping address saved. Please edit to add one."}
                  </p>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.3} width="100%">
              <div>
                <div style={{ borderBottom: '1px solid var(--color-ink)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 400 }}>Order History</h3>
                </div>
                
                {user.orders && user.orders.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                    {user.orders.map(order => (
                      <div key={order.id} style={{ border: '1px solid var(--color-ink)', padding: 'var(--space-4)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-stone)', paddingBottom: '8px', marginBottom: '16px' }}>
                          <span className="text-label">Order {order.id}</span>
                          <span className="text-label" style={{ color: 'var(--color-stone)' }}>{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px' }}>
                          {order.items.map((item, idx) => (
                            <div key={idx} style={{ width: '60px', flexShrink: 0 }}>
                              <img src={item?.images?.[0] || item?.image} alt={item.name} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', border: '1px solid var(--color-ink)' }} />
                            </div>
                          ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                          <span className="text-label" style={{ color: 'var(--color-stone)' }}>Status: {order.status}</span>
                          <span style={{ fontSize: '1rem', fontWeight: 500 }}>Total: {formatPrice(order.total)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--color-stone)' }}>You have not placed any orders yet.</p>
                )}
              </div>
            </Reveal>
            
          </div>

        </div>
      </section>
    </PageTransition>
  );
};

export default Profile;
