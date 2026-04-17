import * as React from 'react';

import { cn } from './utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-xl border border-[var(--crm-input-border)] bg-[var(--crm-input)] px-3 py-2 text-sm text-[var(--crm-foreground)] placeholder:text-[var(--crm-muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--crm-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--crm-card)] disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
