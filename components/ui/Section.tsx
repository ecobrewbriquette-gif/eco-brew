import { cn } from "@/lib/utils";

export default function Section({
  children,
  className = "",
  id,
  dark = false,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        dark && "bg-forest text-cream dark:bg-forest-dark",
        !dark && "bg-cream text-charcoal dark:bg-black dark:text-zinc-100",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
