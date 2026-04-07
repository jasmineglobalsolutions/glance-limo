import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from './utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.18em]',
  {
    variants: {
      variant: {
        default:
          'border-[var(--crm-border-strong)] bg-[var(--crm-secondary)] text-[var(--crm-muted-foreground)]',
        accent:
          'border-[var(--crm-border-strong)] bg-[var(--crm-secondary-strong)] text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
