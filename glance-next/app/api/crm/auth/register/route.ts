import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

import {
  CRM_SESSION_COOKIE,
  createCrmSessionToken,
  getCrmCookieOptions,
} from '@/lib/crm-auth';
import { prisma } from '@/lib/prisma';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  tenantName: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    
    if (!body) {
      return NextResponse.json(
        { message: 'Invalid JSON payload' },
        { status: 400 },
      );
    }

    const validated = registerSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { message: 'Invalid input', errors: validated.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { email, password, tenantName } = validated.data;

    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists with this email' },
        { status: 409 }, // Conflict
      );
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Find or create tenant
    const targetTenantName = tenantName || 'Default Tenant';
    let tenant = await prisma.tenant.findUnique({
      where: { name: targetTenantName },
    });

    if (!tenant) {
      tenant = await prisma.tenant.create({
        data: { name: targetTenantName },
      });
    }

    // 4. Create User with ADMIN role
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'ADMIN',
        tenantId: tenant.id,
      },
    });

    // 5. Success response and set session cookie
    const response = NextResponse.json({ 
        success: true, 
        user: { id: user.id, email: user.email, role: user.role } 
    }, { status: 201 });

    response.cookies.set(
      CRM_SESSION_COOKIE,
      createCrmSessionToken(user.email),
      getCrmCookieOptions(60 * 60 * 12),
    );

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { 
        message: 'Internal server error occurred during registration.'
      },
      { status: 500 },
    );
  }
}
