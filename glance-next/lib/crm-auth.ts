import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

export const CRM_SESSION_COOKIE = 'crm_session';
const SESSION_TTL_SECONDS = 60 * 60 * 12;

type CrmSessionPayload = {
  email: string;
  role: 'ADMIN';
  exp: number;
};

function getSecret() {
  return process.env.JWT_SECRET ?? 'change-me';
}

function toBase64Url(input: string) {
  return Buffer.from(input, 'utf8').toString('base64url');
}

function fromBase64Url(input: string) {
  return Buffer.from(input, 'base64url').toString('utf8');
}

function sign(input: string) {
  return createHmac('sha256', getSecret()).update(input).digest('base64url');
}

function serializePayload(payload: CrmSessionPayload) {
  return toBase64Url(JSON.stringify(payload));
}

function parsePayload(tokenPayload: string): CrmSessionPayload | null {
  try {
    const parsed = JSON.parse(fromBase64Url(tokenPayload)) as CrmSessionPayload;
    if (!parsed?.email || !parsed?.exp || parsed.role !== 'ADMIN') {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function createToken(payload: CrmSessionPayload) {
  const encodedPayload = serializePayload(payload);
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function createCrmSessionToken(email: string) {
  const now = Math.floor(Date.now() / 1000);
  return createToken({
    email,
    role: 'ADMIN',
    exp: now + SESSION_TTL_SECONDS,
  });
}

export function getCrmCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge,
  };
}

function verifyToken(token: string): CrmSessionPayload | null {
  const [encodedPayload, encodedSignature] = token.split('.');
  if (!encodedPayload || !encodedSignature) {
    return null;
  }

  const expectedSignature = sign(encodedPayload);
  const signatureBuffer = Buffer.from(encodedSignature, 'utf8');
  const expectedBuffer = Buffer.from(expectedSignature, 'utf8');

  if (signatureBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  const payload = parsePayload(encodedPayload);
  if (!payload) {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp <= now) {
    return null;
  }

  return payload;
}

export async function createCrmSession(email: string) {
  const token = createCrmSessionToken(email);

  const cookieStore = await cookies();
  cookieStore.set(CRM_SESSION_COOKIE, token, getCrmCookieOptions(SESSION_TTL_SECONDS));
}

export async function clearCrmSession() {
  const cookieStore = await cookies();
  cookieStore.set(CRM_SESSION_COOKIE, '', getCrmCookieOptions(0));
  cookieStore.set(CRM_SESSION_COOKIE, '', {
    ...getCrmCookieOptions(0),
    path: '/crm',
  });
}

export async function getCrmSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CRM_SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }
  return verifyToken(token);
}
