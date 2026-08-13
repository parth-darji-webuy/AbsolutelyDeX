import crypto from 'crypto';
import { cookies } from 'next/headers';
import { prisma } from './prisma';

const SESSION_SECRET = process.env.SESSION_SECRET || 'absolutelydex_devday_super_secret_key_32bytes';
export const COOKIE_NAME = 'absolutelydex_session';

export function signData(data: string): string {
  return crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('hex');
}

export function createSessionToken(userId: string): string {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const payload = `${userId}:${expiresAt}`;
  const signature = signData(payload);
  return Buffer.from(`${payload}:${signature}`).toString('base64');
}

export function parseSessionToken(token: string): { userId: string } | null {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const parts = decoded.split(':');
    if (parts.length !== 3) return null;

    const [userId, expiresAtStr, signature] = parts;
    const expiresAt = parseInt(expiresAtStr, 10);

    if (isNaN(expiresAt) || Date.now() > expiresAt) {
      return null;
    }

    const payload = `${userId}:${expiresAtStr}`;
    const expectedSignature = signData(payload);

    if (signature !== expectedSignature) {
      return null;
    }

    return { userId };
  } catch (err) {
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  const session = parseSessionToken(sessionCookie.value);
  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  });

  return user;
}
