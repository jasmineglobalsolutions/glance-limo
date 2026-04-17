import { NextResponse } from 'next/server';
import type { ZodError } from 'zod';

export function unauthorizedCrmResponse() {
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
}

export function validationErrorResponse(error: ZodError) {
  return NextResponse.json(
    {
      message: 'Invalid request payload.',
      errors: error.flatten(),
    },
    { status: 400 },
  );
}

export function routeErrorResponse(
  error: unknown,
  fallbackMessage = 'Unable to process CRM request.',
) {
  return NextResponse.json(
    {
      message: error instanceof Error ? error.message : fallbackMessage,
    },
    { status: 400 },
  );
}
