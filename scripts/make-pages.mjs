import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = ['Home', 'Shop', 'ProductDetail', 'Cart', 'Checkout', 'Login', 'Signup', 'Profile', 'Confirmation', 'NotFound'];
const dir = path.join(__dirname, '../src/pages');

if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

pages.forEach(p => {
  const content = `import PageTransition from '../components/layout/PageTransition';

const ${p} = () => (
  <PageTransition>
    <section>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2>${p}</h2>
      </div>
    </section>
  </PageTransition>
);

export default ${p};
`;
  fs.writeFileSync(path.join(dir, `${p}.jsx`), content);
});

console.log("Pages created.");
