import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clean existing tables in correct order
  await prisma.wishlist.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create demo user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@absolutelydex.com',
      name: 'Alex Vance',
      passwordHash: hashedPassword,
    },
  });

  console.log('Created demo user:', demoUser.email);

  // Create categories
  const fashionCategory = await prisma.category.create({
    data: {
      name: 'Fashion',
      slug: 'fashion',
      description: 'Modern luxury streetwear, technical apparel, and architectural accessories.',
      image: '/images/products/fashion-jacket-cyber.jpg',
    },
  });

  const techCategory = await prisma.category.create({
    data: {
      name: 'Technology',
      slug: 'technology',
      description: 'High-performance computing, spatial audio, and precision hardware.',
      image: '/images/products/tech-headphones-studio.jpg',
    },
  });

  console.log('Created categories: Fashion & Technology');

  // Seed Products
  const productsData = [
    // --- FASHION PRODUCTS ---
    {
      name: 'Aura Stealth Leather Sneakers',
      slug: 'aura-stealth-leather-sneakers',
      description: 'Handcrafted minimalist monochrome sneakers featuring full-grain Italian leather, ultra-cushioned ergonomic insoles, and a durable custom vulcanized rubber outsole built for modern urban exploration.',
      price: 245.0,
      originalPrice: 295.0,
      discount: 17,
      brand: 'AURA Studio',
      categoryId: fashionCategory.id,
      images: JSON.stringify([
        '/images/products/fashion-sneakers-apex.jpg',
        '/images/products/fashion-tshirt-organic.jpg',
      ]),
      rating: 4.9,
      reviewCount: 38,
      stockStatus: 'In Stock',
      sizes: JSON.stringify(['US 8', 'US 9', 'US 10', 'US 11', 'US 12']),
      colors: JSON.stringify(['Obsidian Black', 'Chalk White', 'Titanium Gray']),
      specifications: JSON.stringify({
        'Material': 'Full-Grain Italian Calfskin Leather',
        'Sole': 'Custom Vulcanized Rubber',
        'Origin': 'Handmade in Portugal',
        'Fit': 'True to Size',
      }),
      isFeatured: true,
      isNewArrival: false,
      isTrending: true,
    },
    {
      name: 'Monolith Weatherproof Bomber Jacket',
      slug: 'monolith-weatherproof-bomber-jacket',
      description: 'Engineered windproof and water-resistant technical outerwear built with 3-layer laminated membrane, articulated sleeve movement, internal storm cuffs, and sleek concealed magnetic pocket closures.',
      price: 380.0,
      originalPrice: 450.0,
      discount: 15,
      brand: 'DE-X Technical',
      categoryId: fashionCategory.id,
      images: JSON.stringify([
        '/images/products/fashion-jacket-cyber.jpg',
        '/images/editorial/everyday-edit-promo.jpg',
      ]),
      rating: 4.8,
      reviewCount: 24,
      stockStatus: 'In Stock',
      sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
      colors: JSON.stringify(['Midnight Navy', 'Matte Charcoal', 'Olive Drab']),
      specifications: JSON.stringify({
        'Fabric': '3-Layer GoreTech Membrane',
        'Waterproof Rating': '20,000 mm Rating',
        'Closure': 'YKK AquaGuard Zippers',
        'Pockets': '4 External, 2 Internal RFID-Blocked',
      }),
      isFeatured: true,
      isNewArrival: true,
      isTrending: true,
    },
    {
      name: 'Minimal Heavyweight Oversized Hoodie',
      slug: 'minimal-heavyweight-oversized-hoodie',
      description: 'Ultra-dense 500 GSM custom-knit organic French terry cotton hoodie. Designed with a structured double-layer hood, dropped shoulders, zero drawstring clutter, and subtle tonal embroidery.',
      price: 165.0,
      originalPrice: 195.0,
      discount: 15,
      brand: 'Structure Lab',
      categoryId: fashionCategory.id,
      images: JSON.stringify([
        '/images/products/fashion-hoodie-minimal.jpg',
      ]),
      rating: 4.7,
      reviewCount: 42,
      stockStatus: 'In Stock',
      sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL']),
      colors: JSON.stringify(['Washed Slate', 'Raw Chalk', 'Deep Raven']),
      specifications: JSON.stringify({
        'Fabric Weight': '500 GSM French Terry',
        'Composition': '100% Organic Combed Cotton',
        'Fit': 'Relaxed Oversized',
        'Care': 'Machine Wash Cold, Hang Dry',
      }),
      isFeatured: false,
      isNewArrival: true,
      isTrending: false,
    },
    {
      name: 'Vanguard Modular Roll-top Backpack',
      slug: 'vanguard-modular-rolltop-backpack',
      description: 'A 28L weather-sealed urban commuter backpack crafted from 1680D recycled Cordura ballistic nylon. Features a dedicated 16-inch fleece-lined laptop sleeve, magnetic Fidlock closure, and expandable front harness system.',
      price: 210.0,
      originalPrice: 240.0,
      discount: 12,
      brand: 'DE-X Technical',
      categoryId: fashionCategory.id,
      images: JSON.stringify([
        '/images/products/fashion-bag-commuter.jpg',
      ]),
      rating: 4.9,
      reviewCount: 51,
      stockStatus: 'In Stock',
      sizes: JSON.stringify(['28L Standard']),
      colors: JSON.stringify(['Tactical Black', 'Slate Grey']),
      specifications: JSON.stringify({
        'Volume': '28 Liters (Expandable to 34L)',
        'Laptop Sleeve': 'Fits up to 16" MacBook Pro',
        'Hardware': 'Fidlock V-Buckle Magnetic Clips',
        'Weight': '1.2 kg',
      }),
      isFeatured: true,
      isNewArrival: false,
      isTrending: true,
    },
    {
      name: 'Chronos Obsidian Sapphire Watch',
      slug: 'chronos-obsidian-sapphire-watch',
      description: 'Architectural analog timepiece featuring a DLC-coated grade 5 titanium case, scratch-proof sapphire crystal dome, Japanese automatic movement with 42-hour power reserve, and interchangeable fluororubber strap.',
      price: 520.0,
      originalPrice: 650.0,
      discount: 20,
      brand: 'Chronos Atelier',
      categoryId: fashionCategory.id,
      images: JSON.stringify([
        '/images/products/fashion-watch-chrono.jpg',
      ]),
      rating: 5.0,
      reviewCount: 19,
      stockStatus: 'Low Stock',
      sizes: JSON.stringify(['40mm Case']),
      colors: JSON.stringify(['Monochrome Stealth', 'Brushed Steel']),
      specifications: JSON.stringify({
        'Case Material': 'Grade 5 Titanium (DLC Coated)',
        'Movement': 'Miyota 9015 Automatic (28,800 bph)',
        'Water Resistance': '100 Meters / 10 ATM',
        'Crystal Glass': 'Double-Domed Sapphire Crystal',
      }),
      isFeatured: false,
      isNewArrival: true,
      isTrending: true,
    },
    {
      name: 'Prism Architectural Matte Sunglasses',
      slug: 'prism-architectural-matte-sunglasses',
      description: 'Handcrafted acetate frame sunglasses housing Category 3 polarized Japanese lenses with 100% UV400 protection and anti-reflective inner coating.',
      price: 185.0,
      originalPrice: null,
      discount: null,
      brand: 'AURA Studio',
      categoryId: fashionCategory.id,
      images: JSON.stringify([
        '/images/products/fashion-sunglasses-frame.jpg',
      ]),
      rating: 4.6,
      reviewCount: 17,
      stockStatus: 'In Stock',
      sizes: JSON.stringify(['Standard Fit']),
      colors: JSON.stringify(['Matte Black', 'Tortoise Shell', 'Smoked Olive']),
      specifications: JSON.stringify({
        'Lens Type': 'Polarized TAC Lens (Cat 3)',
        'UV Protection': '100% UV400',
        'Frame Material': 'Mazzucchelli Bio-Acetate',
        'Hinge': 'Custom 5-Barrel Stainless Steel',
      }),
      isFeatured: false,
      isNewArrival: false,
      isTrending: false,
    },
    {
      name: 'Structure Heavyweight Organic Cotton Tee',
      slug: 'structure-heavyweight-organic-cotton-tee',
      description: 'Classic minimalist crewneck shirt cut from 260 GSM long-staple organic cotton. Preshrunk fabric ensures tight collar shape retention wash after wash.',
      price: 75.0,
      originalPrice: 90.0,
      discount: 16,
      brand: 'Structure Lab',
      categoryId: fashionCategory.id,
      images: JSON.stringify([
        '/images/products/fashion-tshirt-organic.jpg',
      ]),
      rating: 4.8,
      reviewCount: 64,
      stockStatus: 'In Stock',
      sizes: JSON.stringify(['S', 'M', 'L', 'XL', 'XXL']),
      colors: JSON.stringify(['Milk White', 'Pebble Grey', 'Pitch Black']),
      specifications: JSON.stringify({
        'Fabric Weight': '260 GSM Single Jersey',
        'Composition': '100% Organic Combed Cotton',
        'Stitching': 'Reinforced Twin-Needle Hem',
      }),
      isFeatured: false,
      isNewArrival: false,
      isTrending: true,
    },
    {
      name: 'MagLock RFID Aluminum Cardholder Wallet',
      slug: 'maglock-rfid-aluminum-cardholder-wallet',
      description: 'Precision CNC-machined aerospace grade aluminum slim wallet with quick card ejection lever, integrated RFID blocking shield, and magnetic cash strap.',
      price: 89.0,
      originalPrice: 110.0,
      discount: 19,
      brand: 'DE-X Technical',
      categoryId: fashionCategory.id,
      images: JSON.stringify([
        '/images/products/fashion-wallet-leather.jpg',
      ]),
      rating: 4.9,
      reviewCount: 31,
      stockStatus: 'In Stock',
      sizes: JSON.stringify(['Slim 1-12 Cards']),
      colors: JSON.stringify(['Gunmetal Gray', 'Anodized Black', 'Raw Silver']),
      specifications: JSON.stringify({
        'Material': '6061-T6 Aircraft Aluminum',
        'Capacity': 'Holds 1 to 12 Cards + Cash',
        'Security': 'Complete RFID/NFC Blocking',
        'Weight': '62 grams',
      }),
      isFeatured: false,
      isNewArrival: true,
      isTrending: false,
    },
    // --- VINTAGE FASHION PRODUCTS ---
    {
      name: 'Heritage 1970s Leather Racer Jacket',
      slug: 'heritage-1970s-leather-racer-jacket',
      description: 'A vintage-inspired racer jacket in softly distressed full-grain leather, finished with a quilted lining, brass hardware, and a cropped silhouette drawn from 1970s motorsport style.',
      price: 425.0,
      originalPrice: 495.0,
      discount: 14,
      brand: 'Heritage Archive',
      categoryId: fashionCategory.id,
      images: JSON.stringify([
        '/images/products/fashion-jacket-cyber.jpg',
      ]),
      rating: 4.8,
      reviewCount: 28,
      stockStatus: 'In Stock',
      sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
      colors: JSON.stringify(['Aged Espresso', 'Vintage Black']),
      specifications: JSON.stringify({
        'Material': 'Distressed Full-Grain Leather',
        'Lining': 'Quilted Viscose Blend',
        'Hardware': 'Antique Brass Zippers',
        'Fit': 'Classic Cropped Racer',
      }),
      isFeatured: true,
      isNewArrival: false,
      isTrending: true,
    },
    {
      name: 'Archive Wash Pocket Tee',
      slug: 'archive-wash-pocket-tee',
      description: 'A relaxed cotton pocket tee with a sun-faded garment wash, ribbed crew neck, and subtle stitched chest pocket for an authentic well-worn look.',
      price: 68.0,
      originalPrice: null,
      discount: null,
      brand: 'Heritage Archive',
      categoryId: fashionCategory.id,
      images: JSON.stringify([
        '/images/products/fashion-tshirt-organic.jpg',
      ]),
      rating: 4.7,
      reviewCount: 46,
      stockStatus: 'In Stock',
      sizes: JSON.stringify(['S', 'M', 'L', 'XL', 'XXL']),
      colors: JSON.stringify(['Faded Cream', 'Washed Indigo', 'Vintage Charcoal']),
      specifications: JSON.stringify({
        'Fabric': '240 GSM Garment-Dyed Cotton',
        'Finish': 'Sun-Faded Enzyme Wash',
        'Pocket': 'Single Stitched Chest Pocket',
        'Fit': 'Relaxed Vintage Fit',
      }),
      isFeatured: false,
      isNewArrival: false,
      isTrending: true,
    },
    {
      name: 'Classic Tortoise Clubmaster Sunglasses',
      slug: 'classic-tortoise-clubmaster-sunglasses',
      description: 'Retro clubmaster sunglasses with hand-polished tortoise acetate brows, gold-tone metal rims, and polarized lenses inspired by timeless mid-century eyewear.',
      price: 160.0,
      originalPrice: 190.0,
      discount: 16,
      brand: 'Maison Retro',
      categoryId: fashionCategory.id,
      images: JSON.stringify([
        '/images/products/fashion-sunglasses-frame.jpg',
      ]),
      rating: 4.9,
      reviewCount: 33,
      stockStatus: 'Low Stock',
      sizes: JSON.stringify(['Standard Fit']),
      colors: JSON.stringify(['Classic Tortoise', 'Honey Amber']),
      specifications: JSON.stringify({
        'Frame': 'Hand-Polished Acetate and Stainless Steel',
        'Lens': 'Polarized UV400',
        'Style': 'Mid-Century Clubmaster',
        'Case': 'Included Faux Leather Hard Case',
      }),
      isFeatured: false,
      isNewArrival: true,
      isTrending: false,
    },
    {
      name: 'Hand-Finished Leather Bifold Wallet',
      slug: 'hand-finished-leather-bifold-wallet',
      description: 'A slim traditional bifold wallet crafted from vegetable-tanned leather, hand-burnished at the edges, and designed to develop a rich patina over time.',
      price: 115.0,
      originalPrice: null,
      discount: null,
      brand: 'Atelier 1964',
      categoryId: fashionCategory.id,
      images: JSON.stringify([
        '/images/products/fashion-wallet-leather.jpg',
      ]),
      rating: 4.8,
      reviewCount: 22,
      stockStatus: 'In Stock',
      sizes: JSON.stringify(['Standard Bifold']),
      colors: JSON.stringify(['Cognac', 'Oxblood', 'Dark Tan']),
      specifications: JSON.stringify({
        'Leather': 'Vegetable-Tanned Full-Grain Leather',
        'Capacity': 'Six Cards, Notes, and Coin Pocket',
        'Construction': 'Hand-Stitched Waxed Thread',
        'Origin': 'Made in Small Batches',
      }),
      isFeatured: false,
      isNewArrival: false,
      isTrending: false,
    },

    // --- TECHNOLOGY PRODUCTS ---
    {
      name: 'Resonance Pro Wireless ANC Headphones',
      slug: 'resonance-pro-wireless-anc-headphones',
      description: 'Flagship audiophile wireless headphones featuring custom 45mm beryllium drivers, active hybrid noise cancellation up to 42dB, ultra-clear beamforming microphone array, and 45-hour battery life.',
      price: 399.0,
      originalPrice: 450.0,
      discount: 11,
      brand: 'Acoustica',
      categoryId: techCategory.id,
      images: JSON.stringify([
        '/images/products/tech-headphones-studio.jpg',
        '/images/editorial/tech-spotlight-banner.jpg',
      ]),
      rating: 4.9,
      reviewCount: 88,
      stockStatus: 'In Stock',
      sizes: JSON.stringify(['Over-Ear Universal']),
      colors: JSON.stringify(['Space Grey', 'Starlight Silver', 'Matte Black']),
      specifications: JSON.stringify({
        'Drivers': '45mm Beryllium Dynamic Transducers',
        'ANC Rating': 'Adaptive Active Noise Cancellation (42dB)',
        'Battery Life': '45 Hours Playtime (Fast Charge 10min = 5h)',
        'Codec Support': 'LDAC, aptX Adaptive, AAC, SBC',
      }),
      isFeatured: true,
      isNewArrival: false,
      isTrending: true,
    },
    {
      name: 'Nexus 15 Ultra Matte Titanium Smartphone',
      slug: 'nexus-15-ultra-matte-titanium-smartphone',
      description: 'Next-generation flagship smartphone engineered with a grade 5 titanium chassis, 6.7-inch 120Hz LTPO OLED display, 200MP Quad-Camera array with 10x optical periscope zoom, and vapor chamber thermal cooling.',
      price: 1199.0,
      originalPrice: 1299.0,
      discount: 7,
      brand: 'Nexus Hardware',
      categoryId: techCategory.id,
      images: JSON.stringify([
        '/images/products/tech-smartphone-flagship.jpg',
      ]),
      rating: 4.9,
      reviewCount: 142,
      stockStatus: 'In Stock',
      sizes: JSON.stringify(['256GB Storage', '512GB Storage', '1TB Storage']),
      colors: JSON.stringify(['Natural Titanium', 'Dark Slate', 'Desert Titanium']),
      specifications: JSON.stringify({
        'Display': '6.7" LTPO OLED (1-120Hz, 3000 nits Peak)',
        'Processor': 'Octa-Core 3nm Neural Chipset',
        'Camera Array': '200MP Main + 50MP Ultrawide + 50MP 10x Zoom',
        'Battery': '5,200 mAh (67W Wired, 50W Mag Wireless)',
      }),
      isFeatured: true,
      isNewArrival: true,
      isTrending: true,
    },
    {
      name: 'Horizon M3 Max Precision Laptop',
      slug: 'horizon-m3-max-precision-laptop',
      description: 'Ultra-slim unibody aluminum workstation powered by an advanced 16-core CPU and 40-core GPU. Boasts a Liquid Retina XDR display with 1600 nits peak brightness and up to 22 hours of continuous battery life.',
      price: 2499.0,
      originalPrice: 2799.0,
      discount: 10,
      brand: 'Horizon Compute',
      categoryId: techCategory.id,
      images: JSON.stringify([
        '/images/products/tech-laptop-pro.jpg',
      ]),
      rating: 5.0,
      reviewCount: 67,
      stockStatus: 'In Stock',
      sizes: JSON.stringify(['36GB RAM / 1TB SSD', '64GB RAM / 2TB SSD']),
      colors: JSON.stringify(['Space Black', 'Silver']),
      specifications: JSON.stringify({
        'Processor': '16-Core CPU / 40-Core GPU',
        'Display Panel': '16.2-inch Liquid Retina XDR (3024 x 1964)',
        'I/O Ports': '3x Thunderbolt 4, HDMI 2.1, SDXC, MagSafe 3',
        'Weight': '2.14 kg',
      }),
      isFeatured: true,
      isNewArrival: true,
      isTrending: true,
    },
    {
      name: 'Pulse X Titan Fitness Smartwatch',
      slug: 'pulse-x-titan-fitness-smartwatch',
      description: 'Rugged titanium outdoor GPS smartwatch equipped with dual-frequency satellite tracking, ECG heart monitor, continuous blood oxygen sensor, and up to 14 days of battery life in solar mode.',
      price: 449.0,
      originalPrice: 499.0,
      discount: 10,
      brand: 'Nexus Hardware',
      categoryId: techCategory.id,
      images: JSON.stringify([
        '/images/products/tech-smartwatch-ultra.jpg',
      ]),
      rating: 4.8,
      reviewCount: 53,
      stockStatus: 'In Stock',
      sizes: JSON.stringify(['49mm Titanium Case']),
      colors: JSON.stringify(['Titanium Orange Band', 'Stealth Rubber Band']),
      specifications: JSON.stringify({
        'Display Screen': '1.92" Sapphire Crystal OLED (2000 nits)',
        'Water Rating': '100m / EN13319 Dive Certified',
        'Biometric Sensors': 'Dual-Freq L1+L5 GPS, ECG, SpO2, Temp',
        'Battery Duration': 'Up to 60 Hours Normal, 14 Days Solar',
      }),
      isFeatured: false,
      isNewArrival: false,
      isTrending: true,
    },
    {
      name: 'Aperture R4 Mirrorless 8K Camera',
      slug: 'aperture-r4-mirrorless-8k-camera',
      description: 'Professional full-frame mirrorless camera capturing 45MP still images at 30 fps and uncropped 8K RAW video recording with AI subject-tracking autofocus.',
      price: 3299.0,
      originalPrice: 3599.0,
      discount: 8,
      brand: 'Aperture Optics',
      categoryId: techCategory.id,
      images: JSON.stringify([
        '/images/products/tech-camera-mirrorless.jpg',
      ]),
      rating: 4.9,
      reviewCount: 29,
      stockStatus: 'Low Stock',
      sizes: JSON.stringify(['Body Only', 'Body + 24-70mm f/2.8 Kit']),
      colors: JSON.stringify(['Matte Graphite']),
      specifications: JSON.stringify({
        'Sensor Type': '45.7MP Full-Frame Stacked BSI CMOS',
        'Video Format': '8K 60p RAW internal, 4K 120p ProRes HQ',
        'Autofocus': 'Deep-Learning AI Eye & Vehicle Tracking',
        'Image Stabilization': '8.0 Stops 5-Axis In-Body IS',
      }),
      isFeatured: false,
      isNewArrival: true,
      isTrending: false,
    },
    {
      name: 'CyberBoard Gasket Custom Mechanical Keyboard',
      slug: 'cyberboard-gasket-custom-mechanical-keyboard',
      description: 'Heavyweight CNC aluminum gasket-mounted custom keyboard with hot-swappable tactile switches, PBT dye-sub keycaps, per-key RGB backlighting, and triple-mode wireless connectivity.',
      price: 289.0,
      originalPrice: 320.0,
      discount: 10,
      brand: 'CyberBoard',
      categoryId: techCategory.id,
      images: JSON.stringify([
        '/images/products/tech-keyboard-mech.jpg',
      ]),
      rating: 4.8,
      reviewCount: 46,
      stockStatus: 'In Stock',
      sizes: JSON.stringify(['75% Compact Layout']),
      colors: JSON.stringify(['Anodized Black', 'Frosted E-White']),
      specifications: JSON.stringify({
        'Structure': 'Custom Silicone Gasket Mount',
        'Key Switches': 'Pre-lubed Gateron Oil King Tactile',
        'Connectivity': 'Bluetooth 5.1 / 2.4GHz Wireless / USB-C',
        'Battery': '8,000 mAh (Up to 300 Hours RGB off)',
      }),
      isFeatured: false,
      isNewArrival: false,
      isTrending: true,
    },
    {
      name: 'Acoustica Spatial Hi-Fi Desk Speaker',
      slug: 'acoustica-spatial-hifi-desk-speaker',
      description: 'A compact room-filling wireless Hi-Fi speaker featuring 360-degree spatial audio, custom aluminum neodymium woofers, AirPlay 2, Spotify Connect, and optical digital inputs.',
      price: 349.0,
      originalPrice: 399.0,
      discount: 12,
      brand: 'Acoustica',
      categoryId: techCategory.id,
      images: JSON.stringify([
        '/images/products/tech-speaker-hifi.jpg',
      ]),
      rating: 4.7,
      reviewCount: 39,
      stockStatus: 'In Stock',
      sizes: JSON.stringify(['Desk Compact']),
      colors: JSON.stringify(['Concrete Grey', 'Walnut Wood', 'Matte Black']),
      specifications: JSON.stringify({
        'Audio Output': '200W Peak Class-D Amplifier System',
        'Connectivity': 'Wi-Fi 6, Bluetooth 5.3, AirPlay 2, Optical',
        'Frequency Range': '35Hz - 22,000Hz',
        'Weight': '3.4 kg',
      }),
      isFeatured: false,
      isNewArrival: false,
      isTrending: false,
    },
    {
      name: 'Aeroflex Lightweight Ergonomic Gaming Mouse',
      slug: 'aeroflex-lightweight-ergonomic-gaming-mouse',
      description: 'Ultra-lightweight 49g wireless competitive gaming mouse boasting a 30,000 DPI optical sensor, 8,000Hz polling rate, and zero-flex carbon fiber reinforced chassis.',
      price: 129.0,
      originalPrice: 149.0,
      discount: 13,
      brand: 'CyberBoard',
      categoryId: techCategory.id,
      images: JSON.stringify([
        '/images/products/tech-mouse-wireless.jpg',
      ]),
      rating: 4.9,
      reviewCount: 71,
      stockStatus: 'In Stock',
      sizes: JSON.stringify(['Medium Ergonomic']),
      colors: JSON.stringify(['Phantom Black', 'Ghost White']),
      specifications: JSON.stringify({
        'Body Weight': '49 Grams Ultra-Light',
        'Optical Sensor': 'PAW3395 30,000 DPI Optical',
        'Polling Rate': 'True 8,000Hz Wireless Dongle',
        'Switches': 'Optical Micro Switches (90M Clicks)',
      }),
      isFeatured: false,
      isNewArrival: true,
      isTrending: false,
    },
  ];

  for (const item of productsData) {
    const createdProduct = await prisma.product.create({
      data: item,
    });

    // Seed 2 reviews per product
    await prisma.review.create({
      data: {
        productId: createdProduct.id,
        userId: demoUser.id,
        userName: 'Marcus Sterling',
        rating: 5,
        comment: `Exceptional design and quality execution on the ${createdProduct.name}. Arrived quickly and matches the editorial standard!`,
      },
    });

    await prisma.review.create({
      data: {
        productId: createdProduct.id,
        userName: 'Elena Rostova',
        rating: 4,
        comment: `Sleek aesthetic, functions flawlessly. Really impressed with the attention to detail for AbsolutelyDeX!`,
      },
    });
  }

  // Seed demo wishlist item for Alex Vance
  const firstProduct = await prisma.product.findFirst({ where: { slug: 'aura-stealth-leather-sneakers' } });
  if (firstProduct) {
    await prisma.wishlist.create({
      data: {
        userId: demoUser.id,
        productId: firstProduct.id,
      },
    });
  }

  console.log(`Successfully seeded ${productsData.length} products and reviews!`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
