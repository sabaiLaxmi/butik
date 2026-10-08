# ÉLAN - Luxury Fashion E-commerce

A modern, high-performance, and beautifully animated frontend e-commerce application built with React, Vite, Framer Motion, and Lenis smooth scrolling.

## Tech Stack
- React 18 + Vite
- React Router DOM
- Framer Motion (Animations & Page Transitions)
- Lenis (Smooth Scrolling)
- Plain CSS (CSS Variables, clamp(), custom utility classes)
- Lucide React (Icons)

## Features
- **Editorial Design System**: Fluid typography, generous whitespace, strict geometric rules (no border radius, hairline borders).
- **Smooth Animations**: High-performance Framer Motion transitions, sticky layouts, on-scroll clip-path wipes (`<ImageReveal>`), and masking reveals (`<Reveal>`).
- **Global State**: Fully functional cart and demo authentication contexts persisting to `localStorage`.
- **Responsive**: Meticulously crafted layouts ensuring seamless transitions from mobile (375px) to ultra-wide desktop (1440px+).

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Generate Product & Editorial Data**
   The application uses a local JSON file (`src/data/products.json`) to serve products, keeping the runtime blazing fast. Before running the app, execute the fetch script:
   ```bash
   node scripts/fetch-data.mjs
   ```
   *(Optional)*: If you want to pull authentic high-resolution editorial photography from Unsplash for the Hero and Journal sections, create a `.env` file in the root directory and add your API key:
   ```env
   UNSPLASH_ACCESS_KEY=your_api_key_here
   ```
   Then run the script again. The script automatically synthesizes metadata (elegant naming, colours, sizes) and saves the images to `public/images/`.

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Deployment
This project is configured and ready to deploy on Vercel. 
- A `vercel.json` file is included to properly handle Single Page Application (SPA) routing.
- Images should be compressed before production deployment. The provided `<ImageReveal>` components utilize `loading="lazy"` attributes and `object-fit: cover` to ensure performance and layout stability.
