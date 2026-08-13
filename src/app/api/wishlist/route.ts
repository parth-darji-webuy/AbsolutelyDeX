import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ wishlists: [] });
    }

    const wishlists = await prisma.wishlist.findMany({
      where: { userId: user.id },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ wishlists });
  } catch (error) {
    console.error('Wishlist GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'UNAUTHENTICATED', message: 'Sign in to save items to your wishlist' },
        { status: 401 }
      );
    }

    const { productId } = await request.json();
    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const existing = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId,
        },
      },
    });

    let added = false;
    if (existing) {
      await prisma.wishlist.delete({
        where: { id: existing.id },
      });
      added = false;
    } else {
      await prisma.wishlist.create({
        data: {
          userId: user.id,
          productId,
        },
      });
      added = true;
    }

    const updatedWishlists = await prisma.wishlist.findMany({
      where: { userId: user.id },
      select: { productId: true },
    });

    return NextResponse.json({
      success: true,
      added,
      productIds: updatedWishlists.map((w) => w.productId),
    });
  } catch (error) {
    console.error('Wishlist POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
