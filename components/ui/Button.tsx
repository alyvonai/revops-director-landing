import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-accent text-white hover:bg-rust",
  secondary: "bg-ink text-white hover:bg-ink/90",
  ghost: "border border-border bg-transparent text-ink hover:bg-altsurface",
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
