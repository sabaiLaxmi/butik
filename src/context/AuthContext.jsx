import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const localUser = localStorage.getItem('elan_user');
      return localUser ? JSON.parse(localUser) : null;
    } catch {
      return null;
    }
  });

  const [usersDb, setUsersDb] = useState(() => {
    try {
      const db = localStorage.getItem('elan_users_db');
      return db ? JSON.parse(db) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem('elan_user', JSON.stringify(user));
    else localStorage.removeItem('elan_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('elan_users_db', JSON.stringify(usersDb));
  }, [usersDb]);

  const login = (email, password) => {
    const existingUser = usersDb.find(u => u.email === email && u.password === password);
    if (!existingUser) throw new Error("Invalid email or password");
    setUser(existingUser);
    return existingUser;
  };

  const signup = (name, email, password) => {
    if (usersDb.some(u => u.email === email)) {
      throw new Error("Email is already registered");
    }
    const newUser = { id: Date.now().toString(), name, email, password, address: '', orders: [] };
    setUsersDb([...usersDb, newUser]);
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    setUsersDb(prev => prev.map(u => u.id === user.id ? updatedUser : u));
  };

  const addOrder = (order) => {
    if (!user) return;
    const updatedOrders = [order, ...(user.orders || [])];
    updateProfile({ orders: updatedOrders });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
};
