import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import { Reveal, RevealGroup } from '../components/ui/Reveal';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email";
    
    if (!password) newErrors.password = "Password is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    if (validate()) {
      try {
        login(email, password);
        const from = location.state?.from?.pathname || '/profile';
        navigate(from, { replace: true });
      } catch (err) {
        setAuthError(err.message);
      }
    }
  };

  return (
    <PageTransition>
      <section style={{ paddingTop: 'var(--space-20)', paddingBottom: 'var(--space-20)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '480px' }}>
          <RevealGroup stagger={0.1}>
            <Reveal mask><h1 style={{ fontSize: '3rem', marginBottom: 'var(--space-2)', textAlign: 'center' }}>Sign In</h1></Reveal>
            <Reveal delay={0.2}><p style={{ textAlign: 'center', marginBottom: 'var(--space-8)', color: 'var(--color-stone)' }}>(Demo Authentication - LocalStorage)</p></Reveal>

            <Reveal delay={0.3} width="100%">
              <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {authError && <p style={{ color: '#e74c3c', fontSize: '12px', textAlign: 'center', marginBottom: 'var(--space-2)' }}>{authError}</p>}
                
                <Input 
                  label="Email Address" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  error={errors.email} 
                />
                
                <Input 
                  label="Password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  error={errors.password} 
                />
                
                <button type="submit" className="btn" style={{ marginTop: 'var(--space-4)', backgroundColor: 'var(--color-ink)', color: 'var(--color-ivory)', border: '1px solid var(--color-ink)', width: '100%' }}>
                  Sign In
                </button>
              </form>
            </Reveal>

            <Reveal delay={0.4} width="100%">
              <div style={{ marginTop: 'var(--space-6)', textAlign: 'center' }}>
                <Link to="/signup" className="text-label hover-underline" style={{ color: 'var(--color-stone)' }}>Create an account</Link>
              </div>
            </Reveal>
          </RevealGroup>
        </div>
      </section>
    </PageTransition>
  );
};

export default Login;
