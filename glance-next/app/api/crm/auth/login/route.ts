import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

import {
  CRM_SESSION_COOKIE,
  createCrmSessionToken,
  getCrmCookieOptions,
} from '@/lib/crm-auth';
import { prisma } from '@/lib/prisma';

const loginSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: Request) {
  const parsedBody = await request.json().catch(() => null);
  const validated = loginSchema.safeParse(parsedBody);

  if (!validated.success) {
    return NextResponse.json(
      { message: 'Invalid login payload.' },
      { status: 400 },
    );
  }

  const { email, password } = validated.data;

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, password: true, role: true },
  });

  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
  }

  let isValidPassword = false;
  if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
    isValidPassword = await bcrypt.compare(password, user.password);
  } else {
    isValidPassword = user.password === password;
  }

  if (!isValidPassword) {
    return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(
    CRM_SESSION_COOKIE,
    createCrmSessionToken(user.email),
    getCrmCookieOptions(60 * 60 * 12),
  );
  return response;
}
