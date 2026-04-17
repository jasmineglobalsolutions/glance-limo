'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, LockKeyhole, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

const loginSchema = z.object({
  email: z.email('Enter a valid work email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginValues) => {
    setErrorMessage(null);

    const response = await fetch('/api/crm/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;
      setErrorMessage(body?.message ?? 'Login failed. Please try again.');
      return;
    }

    router.push('/crm/dashboard');
    router.refresh();
  };

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--crm-muted-foreground)]" />
                  <Input
                    className="pl-10"
                    placeholder="ops@glancelimousine.com.sg"
                    type="email"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription>Use your assigned CRM account.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between gap-3">
                <FormLabel>Password</FormLabel>
                <Link
                  className="text-sm text-[var(--crm-accent)] transition-colors hover:text-[var(--crm-accent-strong)]"
                  href="/crm/login"
                >
                  Forgot password?
                </Link>
              </div>
              <FormControl>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--crm-muted-foreground)]" />
                  <Input
                    className="pl-10"
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" size="lg" type="submit">
          {form.formState.isSubmitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Signing in
            </>
          ) : (
            'Sign in to CRM'
          )}
        </Button>
        {errorMessage ? (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {errorMessage}
          </p>
        ) : null}
      </form>
    </Form>
  );
}
