# VASTRIKA - Project Documentation

## 1. Project Overview
**VASTRIKA** is a premium, high-end fashion boutique web application designed to offer an immersive and luxurious shopping experience. Built with modern web technologies (React, Vite, Framer Motion), the platform specializes in exquisite ethnic wear including Lehengas, Sherwanis, Sarees, Kurta Sets, and Accessories. The website features a highly sophisticated aesthetic characterized by glassmorphism UI elements, smooth scroll animations, rich color gradients, and seamless video integrations.

---

## 2. Logo Design & Brand Identity
The VASTRIKA logo is the cornerstone of the brand's luxury identity. It is a minimalist and elegant monogram designed to reflect high fashion and bespoke tailoring.

* **The Icon:** A highly stylized "V" monogram. The left stem acts as a solid, dark brown classic serif pillar, projecting trust and timelessness. The right stem transforms into a flowing, metallic gold ribbon that sweeps upwards, representing the fluidity of luxury fabrics.
* **The Details:** Emerging from the center of the "V" is a delicate golden sewing needle with a thin graceful thread looping around it in a figure-8 curve. This subtly nods to couture craftsmanship and tailored perfection.
* **Typography:** The word "VASTRIKA" sits below the icon in a sophisticated luxury serif font with elegant, flared letterforms.

---

## 3. Milestone 1: Core Platform & Responsive UI
The first milestone focused on building the foundational shopping experience and ensuring the website looked stunning across all devices.

* **Mobile Responsiveness:** Completely overhauled the Homepage using modern CSS Grid and fluid typography (`clamp()`) to ensure the layout perfectly adapts to mobile phones, tablets, and desktop screens.
* **Dynamic Category Videos:** Integrated high-quality, auto-playing background videos for specific categories (Lehengas, Sherwanis, Kurta Sets) on the Shop page. Used advanced blending techniques (`mix-blend-mode: multiply`) so the videos look like they are playing directly on the website's background.
* **Interactive Elements:** Added the `BounceCards` component to the homepage, creating a fun, interactive, and animated gallery for users to explore curated outfits.
* **Order Flow Polish:** Designed a beautiful, fullscreen frosted-glass (glassmorphism) popup for order confirmations to make the checkout experience feel premium.

---

## 4. Milestone 2: Rebranding & Premium Animations
The second milestone focused on elevating the brand identity and adding sophisticated, high-end animations to the user interface.

* **Brand Transformation:** Successfully rebranded the entire application from its previous name to **VASTRIKA**, including injecting the new bespoke logo directly into the navigation bar for a seamless, professional look.
* **The Animated Hero:** Replaced the static homepage banner with a custom-built, highly animated Hero section. This section features a floating product display, staggered text animations, and a rich, dynamic background gradient that changes colors based on the product.
* **Live Data Syncing:** Connected the new Animated Hero directly to the store's `products.json` database. The banner now automatically pulls real products, images, names, and pricing for every category (Lehenga, Sherwani, Saree, Kurta, Accessories).
* **Glassmorphism Integration:** Wrapped "The Collection" header on the Shop page in a perfectly centered, frosted-glass gradient card with soft shadows, creating a pristine, magazine-like aesthetic.
