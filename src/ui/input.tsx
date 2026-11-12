import type { ComponentProps, RefObject } from 'react';
import { cn } from '@/lib/utils';

export function Input({
  className,
  type,
  ref,
  ...props
}: ComponentProps<'input'> & {
  ref?: RefObject<HTMLInputElement | null>;
}) {
  return (
    <input
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring disabled:bg-input/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 h-10 w-full min-w-0 rounded-md border bg-white px-3 py-2 text-base transition-colors outline-none focus-visible:ring-3 focus-visible:ring-violet-950 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm dark:border-0 dark:bg-zinc-700 dark:text-white dark:focus-visible:ring-zinc-300',
        className
        // file:text-foreground file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium
      )}
      ref={ref}
      type={type}
      {...props}
    />
  );
}
