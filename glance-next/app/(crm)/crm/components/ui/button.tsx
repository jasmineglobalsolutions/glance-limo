import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from './utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--crm-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--crm-card)] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--crm-accent)] text-[var(--crm-accent-foreground)] shadow-[0_12px_30px_rgba(0,0,0,0.35)] hover:bg-[var(--crm-accent-strong)]',
        secondary:
          'bg-[var(--crm-secondary)] text-[var(--crm-foreground)] hover:bg-[var(--crm-secondary-strong)]',
        ghost:
          'text-[var(--crm-muted-foreground)] hover:bg-white/5 hover:text-[var(--crm-foreground)]',
        outline:
          'border border-[var(--crm-border)] bg-transparent text-[var(--crm-foreground)] hover:bg-white/5',
      },
      size: {
        default: 'h-11 px-4 py-2',
        sm: 'h-9 rounded-lg px-3',
        lg: 'h-12 rounded-xl px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
