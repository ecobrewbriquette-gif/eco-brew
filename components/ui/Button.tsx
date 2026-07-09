import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-forest text-white hover:bg-forest-light focus:ring-forest dark:bg-forest-light dark:hover:bg-forest",
    secondary:
      "bg-coffee text-white hover:bg-coffee-light focus:ring-coffee",
    outline:
      "border-2 border-forest text-forest hover:bg-forest hover:text-white focus:ring-forest dark:border-forest-light dark:text-forest-light",
    ghost:
      "text-charcoal hover:bg-cream-dark dark:text-zinc-100 dark:hover:bg-charcoal-light",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
