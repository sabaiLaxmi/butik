const fs = require('fs');
let code = fs.readFileSync('src/pages/Checkout.jsx', 'utf8');

const hookFix = `  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: user?.address || '',
    city: '',
    state: '',
    pincode: ''
  });
  const [delivery, setDelivery] = useState('Standard');
  const [errors, setErrors] = useState({});

  if (!user) {
    return <Navigate to="/login" state={{ from: { pathname: '/checkout' } }} replace />;
  }

  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }`;

const toReplace = `  if (!user) {
    return <Navigate to="/login" state={{ from: { pathname: '/checkout' } }} replace />;
  }

  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: '',
    address: user.address || '',
    city: '',
    state: '',
    pincode: ''
  });
  const [delivery, setDelivery] = useState('Standard');
  const [errors, setErrors] = useState({});`;

code = code.replace(toReplace, hookFix);
fs.writeFileSync('src/pages/Checkout.jsx', code);
console.log('Fixed Checkout.jsx lint error');
