# AbsolutelyDeX (v2)

**AbsolutelyDeX** is a modern, premium e-commerce platform for Fashion and Technology products, built for Dev Day.

It features an editorial design language, high-resolution local product imagery from Unsplash, custom product filtering & search, an interactive slide-over cart drawer, persistent user wishlists backed by PostgreSQL & Prisma, password-hashed session authentication, and GrowthBook A/B testing.

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

* **Framework**: Next.js 13 (App Router, React 18, TypeScript)
* **Styling**: Tailwind CSS, Lucide Icons, Custom design system tokens
* **Database**: PostgreSQL with Prisma ORM
* **Hosted Database**: Neon PostgreSQL
* **Authentication**: Custom signed HTTP-only cookies + `bcryptjs`
* **A/B Testing**: GrowthBook
* **State Management**: React Context

---

# Getting Started

## 1. Prerequisites

* **Node.js**: v18 or later
* **npm**: v8.19.4 or later
* **Neon account**: https://console.neon.tech/

---

## 2. Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd AbsolutelyDeX
npm install
cp .env.example .env
```

---

## 3. Set Up Neon PostgreSQL

Create a new project in Neon:

https://console.neon.tech/

After creating the project:

1. Open your Neon project.
2. Click **Connect**.
3. Copy the PostgreSQL connection string.
4. Add it to `.env` as `DATABASE_URL`.

Example:

```env
DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

Keep `sslmode=require` for Neon.

### Configure Session Secret

Add:

```env
SESSION_SECRET="replace-with-a-long-random-secret"
```

Generate a secure secret with:

```bash
openssl rand -base64 32
```

---

## 4. Apply Prisma Database Setup

Generate Prisma Client:

```bash
npm run db:generate
```

Apply the database migrations:

```bash
npm run db:deploy
```

Seed the demo data:

```bash
npm run db:seed
```

> Run `db:seed` only when setting up a new database because it resets the application tables before adding demo data.

---

## 5. Run the Application

Start the development server:

```bash
npm run dev
```

Open:

http://localhost:3000

---

# GrowthBook PostgreSQL Data Source

GrowthBook can connect directly to the Neon PostgreSQL database as a data source.

In GrowthBook:

**Settings → Data Sources → Add Data Source → PostgreSQL**

Use the values from your Neon connection string.

### GrowthBook PostgreSQL Fields

If your Neon connection string looks like:

```text
postgresql://neondb_owner:YOUR_PASSWORD@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

Enter the fields as:

| GrowthBook Field | Value                              |
| ---------------- | ---------------------------------- |
| **Host**         | `ep-xxxxx.us-east-2.aws.neon.tech` |
| **Port**         | `5432`                             |
| **Database**     | `neondb`                           |
| **Username**     | `neondb_owner`                     |
| **Password**     | Your Neon database password        |
| **SSL**          | Required                           |

### Important

Do **not** paste the entire PostgreSQL connection string into the **Host** field.

Incorrect:

```text
Host:
postgresql://neondb_owner:YOUR_PASSWORD@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

Correct:

```text
Host:
ep-xxxxx.us-east-2.aws.neon.tech
```

The username, password, database, port, and SSL settings should be entered into their respective GrowthBook fields.

---

## Demo Accounts

**Email**

```text
demo@absolutelydex.com
```

**Password**

```text
password123
```

You can also create a new account at `/signup`.

---

## Project Structure

```text
absolutely-dex/
├── public/
│   └── images/
│       ├── products/
│       └── editorial/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── products/
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── wishlist/
│   │   └── api/
│   ├── components/
│   ├── context/
│   ├── data/
│   │   └── image-sources.json
│   └── lib/
│       ├── prisma.ts
│       └── auth.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── .env.example
├── tailwind.config.js
├── tsconfig.json
└── README.md
```
