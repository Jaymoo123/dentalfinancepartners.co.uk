import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
  "inline-flex items-center justify-center font-sans text-[0.9375rem] font-medium transition-colors duration-[180ms] focus-visible:outline-2 focus-visible:outline-offset-3",
  {
    variants: {
      variant: {
        // §7: focus ring flips to ink on navy buttons
        primary:
          "rounded-pill bg-navy text-white hover:bg-[#141d42] focus-visible:outline-ink",
        secondary:
          "rounded-pill border border-hairline-strong bg-transparent text-ink hover:border-ink hover:bg-navy-08 focus-visible:outline-navy",
      },
      size: {
        md: "px-6 py-2.5",
        lg: "px-8 py-3.5 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type ButtonProps = VariantProps<typeof button> & {
  href?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"button">, "className">;

export function Button({ href, variant, size, className, children, ...rest }: ButtonProps) {
  const cls = button({ variant, size, className });
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
