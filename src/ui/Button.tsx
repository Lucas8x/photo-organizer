import { ComponentProps } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const button = tv({
  base: 'w-fit rounded-md px-4 py-2 text-base font-bold text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    variant: {
      primary: 'bg-green-600 hover:bg-green-500',
      secondary: 'bg-red-600 hover:bg-red-500',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof button>;

export function Button({ children, variant, ...props }: ButtonProps) {
  return (
    <button className={button({ variant })} {...props}>
      {children}
    </button>
  );
}
