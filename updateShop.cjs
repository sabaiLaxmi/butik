const fs = require('fs');
let code = fs.readFileSync('src/pages/Shop.jsx', 'utf8');

// 1. Remove useState for activeTab and useEffect
code = code.replace(/const \[activeTab, setActiveTab\] = useState\([\s\S]*?\);\s*\/\/ Update activeTab when URL changes\s*useEffect\(\(\) => \{[\s\S]*?\}, \[urlCategory\]\);/, '');

// 2. Add activeCategory derived from URL
const newLogic = `
  const activeCategory = searchParams.get('category') || 'All';
  const displayCategory = activeCategory === 'All' ? 'The Collection' : (navFilters[activeCategory] ? activeCategory + 's' : activeCategory);

  useEffect(() => {
    document.title = \`\${displayCategory} | A%LAN\`;
  }, [displayCategory]);
`;
code = code.replace(/const urlCategory = searchParams\.get\('category'\);/, `const urlCategory = searchParams.get('category');${newLogic}`);

// 3. Update tabs to chips
code = code.replace(/const tabs = \['All', 'Women', 'Men', 'Accessories'\];/, `const chips = [
    { label: 'All', value: 'All' },
    { label: 'Lehengas', value: 'Lehenga' },
    { label: 'Sarees', value: 'Saree' },
    { label: 'Sherwanis', value: 'Sherwani' },
    { label: 'Kurta Sets', value: 'Kurta' },
    { label: 'Accessories', value: 'Accessories' }
  ];`);

// 4. Update filtering logic to use activeCategory instead of activeTab
code = code.replace(/activeTab/g, 'activeCategory');

// 5. Update chips rendering
const oldTabsRender = /\{tabs\.map\([\s\S]*?\}\)\}/;
const newChipsRender = `{chips.map(chip => (
                <button 
                  key={chip.value} 
                  onClick={() => setSearchParams(prev => { prev.set('category', chip.value); return prev; })}
                  style={{ 
                    background: activeCategory === chip.value ? 'var(--color-ink)' : 'transparent', 
                    border: '1px solid var(--color-ink)', 
                    padding: '8px 16px', 
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: activeCategory === chip.value ? 'var(--color-white)' : 'var(--color-ink)',
                    borderRadius: '24px',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {chip.label}
                </button>
              ))}`;
code = code.replace(oldTabsRender, newChipsRender);

// 6. Title and subtitle
const oldTitle = /<Reveal mask><h1 style=\{\{[^}]+\}\}>The Collection<\/h1><\/Reveal>/;
const newTitle = `
            <Reveal mask>
              <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                <span className="text-label" style={{ color: 'var(--color-stone)' }}>{activeCategory !== 'All' ? activeCategory : 'Explore'}</span>
              </div>
              <h1 style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', textAlign: 'center', marginBottom: 'var(--space-6)', textTransform: 'capitalize' }}>
                {displayCategory}
              </h1>
            </Reveal>`;
code = code.replace(oldTitle, newTitle);

// 7. Result count
const oldControls = /<div style=\{\{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 'var\(--space-4\)', marginBottom: 'var\(--space-10\)', borderBottom: '1px solid var\(--color-ink\)', paddingBottom: 'var\(--space-4\)' \}\}>/;
const newControls = `
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <span className="text-label" style={{ color: 'var(--color-stone)' }}>{filteredProducts.length} pieces</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-8)', borderBottom: '1px solid var(--color-ink)', paddingBottom: 'var(--space-4)' }}>`;
code = code.replace(oldControls, newControls);

// 8. Grid class and style tag
const oldGrid = /<div style=\{\{\s*display: 'grid',\s*gridTemplateColumns: 'repeat\(auto-fill, minmax\(calc\(50% - 12px\), 1fr\)\)',\s*gap: 'var\(--space-8\) var\(--space-4\)'\s*\}\}>\s*<style>\{\`\s*@media \(min-width: 1024px\) \{\s*div\[style\*="grid-template-columns"\] \{\s*grid-template-columns: repeat\(4, 1fr\) !important;\s*gap: var\(--space-12\) var\(--space-6\) !important;\s*\}\s*\}\s*\`\}<\/style>/;
const newGrid = `<div className="product-grid">`;
code = code.replace(oldGrid, newGrid);

// 9. Empty state
const oldEmptyState = /<motion\.div[\s\S]*?<h3 style=\{\{ marginBottom: 'var\(--space-3\)' \}\}>No pieces found<\/h3>[\s\S]*?<p>We couldn't find any pieces matching your refined criteria\. <br \/>Perhaps explore our other collections\.<\/p>[\s\S]*?<button[\s\S]*?>[\s\S]*?Reset Filters[\s\S]*?<\/button>[\s\S]*?<\/motion\.div>/;
const newEmptyState = `
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    padding: 'var(--space-20) var(--space-4)', 
                    textAlign: 'center',
                    backgroundColor: 'var(--color-ivory)',
                    borderRadius: '8px'
                  }}
                >
                  <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-4)' }}>No pieces found</h3>
                  <p style={{ color: 'var(--color-stone)', marginBottom: 'var(--space-6)', maxWidth: '400px' }}>
                    We couldn't find any pieces matching your refined criteria. Try adjusting your filters or explore our complete collection.
                  </p>
                  <button 
                    onClick={() => { setSearchQuery(''); setPriceRange(100000); setSearchParams({ category: 'All' }); }}
                    style={{ 
                      padding: '12px 24px', 
                      backgroundColor: 'var(--color-ink)', 
                      color: 'var(--color-white)', 
                      border: 'none', 
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontSize: '12px'
                    }}
                  >
                    Reset Filters
                  </button>
                </motion.div>`;
code = code.replace(oldEmptyState, newEmptyState);

fs.writeFileSync('src/pages/Shop.jsx', code);
console.log('Successfully updated Shop.jsx');
