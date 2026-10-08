const fs = require('fs');
const path = require('path');

// 1. Create src/utils/formatPrice.js
const utilsDir = 'src/utils';
if (!fs.existsSync(utilsDir)) {
  fs.mkdirSync(utilsDir, { recursive: true });
}
const formatPriceCode = `export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", { 
    style: "currency", 
    currency: "INR", 
    maximumFractionDigits: 0 
  }).format(price);
};
`;
fs.writeFileSync(path.join(utilsDir, 'formatPrice.js'), formatPriceCode);

// Helper
function addImport(filePath) {
  if (!fs.existsSync(filePath)) return false;
  let code = fs.readFileSync(filePath, 'utf8');
  if (!code.includes('formatPrice')) {
    const importRegex = /^import\s+.*?;\s*$/gm;
    let match;
    let lastIndex = 0;
    while ((match = importRegex.exec(code)) !== null) {
      lastIndex = match.index + match[0].length;
    }
    const importStmt = `\nimport { formatPrice } from '../utils/formatPrice';\n`;
    code = code.slice(0, lastIndex) + importStmt + code.slice(lastIndex);
    fs.writeFileSync(filePath, code);
    return true;
  }
  return false;
}

// Checkout.jsx logic
let checkoutFile = 'src/pages/Checkout.jsx';
if (fs.existsSync(checkoutFile)) {
  addImport(checkoutFile);
  let code = fs.readFileSync(checkoutFile, 'utf8');
  
  // Shipping logic
  code = code.replace(/const shippingCost = delivery === 'Express' \? 25 : 0;/, 'const shippingCost = subtotal >= 5000 ? 0 : 150;');
  
  // Replace formatted text
  code = code.replace(/\$\{subtotal\.toFixed\(2\)\}/g, '{formatPrice(subtotal)}');
  code = code.replace(/\$\{shippingCost\.toFixed\(2\)\}/g, '{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}');
  code = code.replace(/\$\{total\.toFixed\(2\)\}/g, '{formatPrice(total)}');
  code = code.replace(/\$\{\(item\.product\.price \* item\.quantity\)\.toFixed\(2\)\}/g, '{formatPrice(item.product.price * item.quantity)}');
  
  // Replace literal text like "$25.00" in the radio button
  code = code.replace(/\$25\.00/g, '₹150');
  code = code.replace(/\$0\.00/g, 'Free');
  
  fs.writeFileSync(checkoutFile, code);
}

// Replace everywhere else
const filesToUpdate = [
  'src/pages/Shop.jsx',
  'src/pages/ProductDetail.jsx',
  'src/pages/Home.jsx',
  'src/components/cart/CartDrawer.jsx',
  'src/pages/Cart.jsx',
  'src/pages/Confirmation.jsx',
  'src/pages/Profile.jsx'
];

filesToUpdate.forEach(file => {
  if (fs.existsSync(file)) {
    addImport(file);
    let code = fs.readFileSync(file, 'utf8');
    
    // Catch common patterns: ${product.price}, ${subtotal}, etc.
    code = code.replace(/\$\{([a-zA-Z0-9_\.]+)\}/g, (match, p1) => {
      if (p1.includes('price') || p1.includes('Price') || p1.includes('total') || p1.includes('Total') || p1.includes('subtotal') || p1.includes('cost')) {
        return `{formatPrice(${p1})}`;
      }
      return match;
    });

    // Also catch .toFixed(2) variants
    code = code.replace(/\$\{([a-zA-Z0-9_\.]+)\.toFixed\(2\)\}/g, (match, p1) => {
      return `{formatPrice(${p1})}`;
    });

    // Fix remaining hardcoded $
    code = code.replace(/>\$\{([a-zA-Z0-9_\.]+)}</g, '>{formatPrice($1)}<');
    code = code.replace(/>\$([0-9\.]+)</g, '>₹$1<');

    fs.writeFileSync(file, code);
  }
});

console.log('Successfully formatted prices.');
