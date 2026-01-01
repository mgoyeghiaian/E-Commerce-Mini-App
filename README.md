# WEGE Mini E-Commerce App

A **mini e-commerce web application** built with **Next.js (App Router)** and **TypeScript**. This project demonstrates clean frontend architecture, static product pages, URL-driven filtering, global cart state, and an accessible UI using only a local JSON data source.

---

## How to Run the Project

### Prerequisites

- **Node.js 18+** (recommended: **Node 20 LTS**)
- npm

### Installation & Run

```bash
npm install
npm run dev
```

Open in your browser: [http://localhost:3000](http://localhost:3000)

---

## Tech Stack & Key Decisions

### Framework
- **Next.js (App Router)**
  - File-based routing
  - Built-in SSG / SSR
  - Layout system
  - Performance and SEO optimizations

### Language
- **TypeScript**
  - Strong typing for products, filters, cart state, and component props
  - Improves maintainability and reduces runtime errors

### Styling
- **Tailwind CSS**
  - Utility-first and responsive by default
  - Consistent design system
  - Accessibility-friendly focus states
  - Clean and maintainable UI

### State Management
- **Zustand** for global state
  - Shopping cart state
  - Add / remove items
  - Cart persistence using `localStorage`
- **Local state** via React hooks for filters, search input, and UI interactions

---

## Rendering Strategy
- **Home / Product Listing Page**
  - Implemented using Server Components
  - Products loaded from local JSON data
  - URL-driven filtering for shareable and persistent state
- **Product Details Pages**
  - Static Site Generation (SSG) with `generateStaticParams`
  - One static page per product (`/product/[id]`)
  - Fast load times and SEO-friendly pages

---

## Data & Filtering
- Uses a **local JSON data source**; no backend, database, or API is involved.
- Categories are derived dynamically from the data. Adding a new category or product requires no code changes.
- Details pages display full product information and related products based on the same category or gender (excluding the current product).

---

## Cart Functionality
- Add or remove items from any page
- Persistent storage via `localStorage`
- Cart icon in the navbar shows item count
- Dedicated `/cart` page lists all cart items

---

## Accessibility
- Semantic HTML elements
- Keyboard navigation support
- `:focus-visible` styles for improved UX
- Descriptive alt text and ARIA labels where necessary

---

## Notes
- Tests were skipped as part of the project scope—this is a frontend-only project designed for clarity and maintainability.
- Demonstrates clean Next.js App Router usage, static page generation, URL-based filters, global state management with Zustand, and an accessible responsive UI suitable for scalable projects.
