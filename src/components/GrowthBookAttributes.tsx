'use client';

import { useEffect } from 'react';
import { useGrowthBook } from '@growthbook/growthbook-react';
import { useAuth } from '@/context/AuthContext';

export default function GrowthBookAttributes() {
  const growthbook = useGrowthBook();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Don't set attributes until authentication is resolved
    if (loading) {
      return;
    }

    if (user) {
      growthbook.setAttributes({
        id: user.id,
        country: user.email,
      });

      return;
    }

    // User is logged out
    growthbook.setAttributes({
      id: '',
      country: '',
    });
  }, [growthbook, user, loading]);

  return null;
}