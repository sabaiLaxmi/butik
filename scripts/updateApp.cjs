const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Add imports for new pages
const importRegex = /import NotFound from '\.\/pages\/NotFound';/;
const newImports = `import NotFound from './pages/NotFound';
import FAQ from './pages/FAQ';
import ShippingPolicy from './pages/ShippingPolicy';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Returns from './pages/Returns';
import Contact from './pages/Contact';
import OrderTracking from './pages/OrderTracking';
import ReturnExchange from './pages/ReturnExchange';`;
code = code.replace(importRegex, newImports);

// 2. Add titles to the map
const titlesRegex = /'\/confirmation': 'Thank You \| A%LAN'/;
const newTitles = `'/confirmation': 'Thank You | A%LAN',
      '/faq': 'FAQ | A%LAN',
      '/shipping': 'Shipping Policy | A%LAN',
      '/terms': 'Terms & Conditions | A%LAN',
      '/privacy': 'Privacy Policy | A%LAN',
      '/returns': 'Returns Policy | A%LAN',
      '/contact': 'Contact Us | A%LAN',
      '/track': 'Track Order | A%LAN',
      '/exchange': 'Return & Exchange | A%LAN'`;
code = code.replace(titlesRegex, newTitles);

// 3. Add routes
const routesRegex = /<Route path="\*" element=\{<NotFound \/>\} \/>/;
const newRoutes = `<Route path="/faq" element={<FAQ />} />
            <Route path="/shipping" element={<ShippingPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/track" element={<OrderTracking />} />
            <Route path="/exchange" element={<ReturnExchange />} />
            <Route path="*" element={<NotFound />} />`;
code = code.replace(routesRegex, newRoutes);

fs.writeFileSync('src/App.jsx', code);
console.log('Successfully updated App.jsx');
