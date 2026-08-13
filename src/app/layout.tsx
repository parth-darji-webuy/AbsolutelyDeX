import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: 'AbsolutelyDeX | Modern Fashion & Technology',
  description: 'Curated luxury fashion apparel, technical outerwear, and high-performance technology hardware.',
  keywords: ['Fashion', 'Technology', 'Streetwear', 'Audio', 'Smartphones', 'E-commerce', 'AbsolutelyDeX'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 min-h-screen flex flex-col justify-between antialiased transition-colors duration-200">
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <CartProvider>
                <WishlistProvider>
                  <Header />
                  <main className="flex-1">{children}</main>
                  <CartDrawer />
                  <Footer />
                </WishlistProvider>
              </CartProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
