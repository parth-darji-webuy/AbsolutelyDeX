'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { useRouter } from 'next/navigation';

interface WishlistContextType {
  wishlistIds: string[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string, productName?: string) => Promise<boolean>;
  loading: boolean;
  refetchWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const refetchWishlist = async () => {
    if (!user) {
      setWishlistIds([]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/wishlist');
      if (res.ok) {
        const data = await res.json();
        if (data.wishlists) {
          const ids = data.wishlists.map((w: { productId: string }) => w.productId);
          setWishlistIds(ids);
        }
      }
    } catch (e) {
      console.error('Wishlist fetch error', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetchWishlist();
  }, [user]);

  const isInWishlist = (productId: string) => {
    return wishlistIds.includes(productId);
  };

  const toggleWishlist = async (productId: string, productName?: string): Promise<boolean> => {
    if (!user) {
      showToast('Sign in to save items to your wishlist', 'info');
      router.push(`/signin?redirect=${encodeURIComponent(window.location.pathname)}`);
      return false;
    }

    try {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });

      if (res.status === 401) {
        showToast('Sign in to save items to your wishlist', 'info');
        router.push('/signin');
        return false;
      }

      if (res.ok) {
        const data = await res.json();
        setWishlistIds(data.productIds || []);
        if (data.added) {
          showToast(`Saved ${productName || 'item'} to wishlist`, 'success');
        } else {
          showToast(`Removed from wishlist`, 'info');
        }
        return data.added;
      } else {
        showToast('Failed to update wishlist', 'error');
        return false;
      }
    } catch (e) {
      showToast('Network error, please try again', 'error');
      return false;
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        isInWishlist,
        toggleWishlist,
        loading,
        refetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
