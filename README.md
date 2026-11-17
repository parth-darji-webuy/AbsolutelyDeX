# AbsolutelyDeX (v2)

**AbsolutelyDeX** is a modern, premium e-commerce platform for Fashion and Technology products, built for Dev Day.

It features an editorial design language, high-resolution local product imagery from Unsplash, custom product filtering & search, an interactive slide-over cart drawer, persistent user wishlists backed by PostgreSQL & Prisma, password-hashed session authentication, and GrowthBook A/B testing.

It also comes with **Absolutely DeX Insights**, read-only dashboard we built to track the store's A/B tests, events and products. It shows weekly store performance, experiment winners, tracked events, product views and add-to-cart activity, and daily CSV reports per test. It reads from the store's Neon database (read-only) and GrowthBook, and has an "Ask your data" box (powered by Groq) that answers plain-English questions with the numbers and the SQL behind them.
---

## Features

* **Editorial Homepage**: Hero section ("EXPLORE WHAT'S NEXT"), asymmetric category showcase, New Arrivals, "The Everyday Edit" promo, Trending Now grid, Tech Spotlight hardware breakdown, and recommendations.
* **Product Listing Page (`/products`)**: Filter by category (Fashion vs. Tech), price slider, brand checkboxes, rating threshold, stock status, and dynamic sorting.
* **Product Detail Page (`/products/[slug]`)**: High-res multi-image gallery with thumbnail selection, variant selectors, quantity picker, Add to Cart, Wishlist toggle, specifications, and reviews.
* **Cart & Slide-Over Drawer**: Client-side cart state persisted in `localStorage`.
* **Session Authentication & Wishlist**: `/signin` and `/signup` routes with `bcryptjs` password hashing and signed HTTP-only cookie sessions.
* **A/B Testing**: GrowthBook integration for feature flags and experiments.
* **Local Product Assets**: Product and editorial images are stored locally in `/public/images/`.

---

## Tech Stack

* **Framework**: Next.js 13 (App Router, React 18)
* **Language**: TypeScript
* **Runtime**: Node.js 18+
* **Styling**: Tailwind CSS, PostCSS, Lucide Icons, clsx + tailwind-merge
* **Database**: PostgreSQL (hosted on Neon) with Prisma ORM
* **Authentication**: Custom signed HTTP-only cookies + bcryptjs
* **A/B Testing**: GrowthBook (JS + React SDKs)
* **State Management**: React Context, with the cart persisted in localStorage
* **Tooling**: ESLint, ts-node (database seeding)

---

