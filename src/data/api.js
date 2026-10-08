// Mock API for a frontend-only store. Put products.json next to this file.
// Every function returns a Promise, so you can swap in a real backend later without changing the UI.
import products from './products.json';

const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));

export const TYPES = ['Lehenga', 'Saree', 'Sherwani', 'Kurta', 'Bandhgala', 'Jewellery', 'Footwear', 'Bags'];

// params: { type, department, tag ('new'|'bestseller'|'sale'), q, minPrice, maxPrice, sort ('newest'|'price-low'|'price-high'|'rating'), page, limit }
export async function getProducts(params = {}) {
  await delay();
  const { type, department, tag, q, minPrice = 0, maxPrice = Infinity, sort = 'newest', page = 1, limit = 12 } = params;
  let list = products.filter((p) =>
    (!type || p.type.toLowerCase() === type.toLowerCase()) &&
    (!department || p.department === department) &&
    (!tag || p.tags.includes(tag)) &&
    p.price >= minPrice && p.price <= maxPrice &&
    (!q || `${p.name} ${p.fabric} ${p.work} ${p.type}`.toLowerCase().includes(q.toLowerCase()))
  );
  if (sort === 'price-low') list.sort((a, b) => a.price - b.price);
  else if (sort === 'price-high') list.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
  const total = list.length;
  list = list.slice((page - 1) * limit, page * limit);
  return { data: list, total, page, pages: Math.ceil(total / limit) };
}

export async function getProduct(id) {
  await delay(200);
  const p = products.find((x) => x.id === id);
  if (!p) throw new Error('Product not found');
  const related = products.filter((x) => x.type === p.type && x.id !== id).slice(0, 4);
  return { data: p, related };
}

export async function getCategories() {
  await delay(100);
  return TYPES.map((t) => ({ type: t, count: products.filter((p) => p.type === t).length }));
}
