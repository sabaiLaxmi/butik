const fs = require('fs');
let code = fs.readFileSync('src/pages/Shop.jsx', 'utf8');

const oldStr = code.match(/<div style=\{\{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' \}\}>[\s\S]*?<p className=\"text-label\" style=\{\{ color: 'var\(--color-stone\)' \}\}>\{product.type \|\| product.department\}<\/p>/)[0];

const newBlock = `<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
            <h4 style={{ fontSize: '1.125rem', margin: 0, fontWeight: 400 }}>{product.name}</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {product.originalPrice ? (
                <>
                  <span className="text-label" style={{ fontWeight: 500, color: 'var(--color-discount)' }}>{formatPrice(product.price)}</span>
                  <span className="text-label" style={{ textDecoration: 'line-through', color: 'var(--color-stone)', fontSize: '0.85em' }}>{formatPrice(product.originalPrice)}</span>
                  <span style={{ fontSize: '10px', backgroundColor: 'var(--color-discount)', color: '#fff', padding: '2px 4px', borderRadius: '2px' }}>
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </>
              ) : (
                <span className="text-label" style={{ fontWeight: 500 }}>{formatPrice(product.price)}</span>
              )}
            </div>
          </div>
          <p className="text-label" style={{ color: 'var(--color-stone)' }}>{product.type || product.department}</p>`;

code = code.replace(oldStr, newBlock);

code = code.replace(/max="1000"/, 'max="100000"');
code = code.replace(/step="50"/, 'step="5000"');
code = code.replace(/step="1000"/, 'step="5000"');

fs.writeFileSync('src/pages/Shop.jsx', code);
