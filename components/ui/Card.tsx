export default function Card({
  children,
  className = "",
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-sm dark:bg-charcoal-light ${
        hover ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-md" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
