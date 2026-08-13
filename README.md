# AbsolutelyDeX (v2)

**AbsolutelyDeX** is a modern, premium e-commerce platform for Fashion and Technology products, built for Dev Day.

It features an editorial design language, high-resolution local product imagery from Unsplash, custom product filtering & search, an interactive slide-over cart drawer, persistent user wishlists backed by SQLite & Prisma, and password-hashed session authentication.

---

## Features

- **Editorial Homepage**: Hero section ("EXPLORE WHAT'S NEXT"), asymmetric category showcase, New Arrivals, "The Everyday Edit" promo, Trending Now grid, Tech Spotlight hardware breakdown, and recommendations.
- **Product Listing Page (`/products`)**: Filter by category (Fashion vs. Tech), price slider, brand checkboxes, rating threshold, stock status, and dynamic sorting (Featured, Price, Rating, Newest).
- **Product Detail Page (`/products/[slug]`)**: High-res multi-image gallery with thumbnail selection, variant selectors (sizes, colors, specs), quantity picker, Add to Cart, Wishlist toggle, specifications table, and read-only customer reviews.
- **Cart & Slide-Over Drawer**: Fully client-side state persisted in `localStorage`. Modify quantities, remove items, view live subtotal, and trigger disabled Dev Day checkout modal.
- **Session Authentication & Wishlist**: `/signin` and `/signup` routes with `bcryptjs` password hashing and signed HTTP-only cookie sessions. Unauthenticated wishlist interaction gracefully prompts sign-in.
- **100% Offline & Reproducible**: All product and editorial photos are curated from Unsplash and stored locally in `/public/images/`. Attribution metadata is tracked in `src/data/image-sources.json`.

---

## Tech Stack

- **Framework**: Next.js 13 (App Router, React 18, TypeScript)
- **Styling**: Tailwind CSS, Lucide Icons, Custom design system tokens
- **Database**: SQLite with Prisma ORM
- **Authentication**: Custom signed HTTP-only cookies + `bcryptjs`
- **State Management**: React Context (`CartContext`, `WishlistContext`, `AuthContext`, `ToastProvider`)

---

## Getting Started

### 1. Prerequisites

- **Node.js**: v16.20.0 or higher (v18+ recommended)
- **npm**: v8.19.4 or higher

### 2. Installation

Clone or navigate to the project directory:

```bash
cd /Users/pdarji/.gemini/antigravity/scratch/absolutely-dex
npm install
```

### 3. Database Migration & Seeding

Sync the SQLite database schema and seed realistic demo products, categories, reviews, and a demo user account:

```bash
npx prisma db push
npx prisma db seed
```

### 4. Running Locally

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Demo Accounts & Credentials

- **Email**: `demo@absolutelydex.com`
- **Password**: `password123`

You can also create a new account at `/signup`.

---

## Environment Variables

Check `.env.example`:

```env
DATABASE_URL="file:./dev.db"
SESSION_SECRET="absolutelydex_devday_super_secret_key_32bytes"
```

---

## Image Sourcing & Manifest

All product images are downloaded into `/public/images/products/` and `/public/images/editorial/`. The attribution manifest is stored at:

`src/data/image-sources.json`

To re-download or update curated images, run:

```bash
python3 /Users/pdarji/.gemini/antigravity/scratch/download_images.py
```

---

## Project Structure

```text
absolutely-dex/
├── public/
│   └── images/
│       ├── products/      # Local high-res product photos
│       └── editorial/     # Local editorial banners
├── src/
│   ├── app/
│   │   ├── page.tsx       # Homepage
│   │   ├── products/
│   │   │   ├── page.tsx   # PLP
│   │   │   └── [slug]/    # PDP
│   │   ├── signin/        # Sign In page
│   │   ├── signup/        # Sign Up page
│   │   ├── wishlist/      # Saved wishlist page
│   │   └── api/           # Auth, Wishlist, Products API routes
│   ├── components/        # Header, CartDrawer, ProductCard, ProductFilters, etc.
│   ├── context/           # CartContext, AuthContext, WishlistContext, ToastContext
│   ├── data/
│   │   └── image-sources.json
│   └── lib/
│       ├── prisma.ts      # Prisma client singleton
│       └── auth.ts        # Session & bcrypt helpers
├── prisma/
│   ├── schema.prisma      # SQLite schema
│   └── seed.ts            # Demo data seed script
├── .env.example
├── tailwind.config.js
├── tsconfig.json
└── README.md
```
