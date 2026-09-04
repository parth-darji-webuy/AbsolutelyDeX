'use client';

import { ShoppingBag } from 'lucide-react';
import { useFeatureValue } from '@growthbook/growthbook-react';

import { Button } from './Button';
import { useCart } from '@/context/CartContext';
import { analytics } from "@/lib/analytics";
import { getAnonymousId } from "@/lib/anonymous-id";

interface AddToCartButtonProps {
    productId: string;
    name: string;
    slug: string;
    brand: string;
    price: number;
    image: string;
    selectedSize?: string;
    selectedColor?: string;
    quantity: number;
}

export function AddToCartButton({
    productId,
    name,
    slug,
    brand,
    price,
    image,
    selectedSize,
    selectedColor,
    quantity,
}: AddToCartButtonProps) {
    const { addItem } = useCart();

    /*
     * GrowthBook evaluates the add_to_cart feature
     * for the current user.
     *
     * Expected values:
     *   control
     *   treatment
     */
    const addToCartVariant = useFeatureValue<string>('add-to-cart','control');

    console.log('GrowthBook variant:', addToCartVariant);

    const isTreatment = addToCartVariant === 'treatment';

    const anonymousId = getAnonymousId();

    const handleAddToCart = () => {
        addItem({
            productId,
            name,
            slug,
            brand,
            price,
            image,
            selectedSize: selectedSize || undefined,
            selectedColor: selectedColor || undefined,
            quantity,
        });

        analytics.track("add_to_cart", {
            anonymousId: anonymousId,
            product_id: productId,
            product_name: name,
            slug,
            brand,
            price,
            quantity,
            selected_size: selectedSize || undefined,
            selected_color: selectedColor || undefined,
        });

        console.log('Add to Cart:', {
            productId,
            variant: addToCartVariant,
        });
    };

    return (
        <Button
            variant="secondary"
            size="lg"
            className="flex-1 text-base font-bold shadow-xl"
            onClick={handleAddToCart}
        >
            <ShoppingBag className="w-5 h-5" />

            {isTreatment ? 'Buy Now' : 'Add to Cart'}
        </Button>
    );
}