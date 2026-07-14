interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  backgroundImage?: string;
}

export default function Card({ children, className, hover, backgroundImage }: CardProps) {
  const hasBg = !!backgroundImage;
  return (
    <div
      className={`relative rounded-2xl bg-white p-6 shadow-sm dark:bg-charcoal-light ${hover ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-md" : ""} ${className}`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/60 rounded-2xl" aria-hidden="true" />
      )}
      <div className={`relative z-10 ${hasBg ? "text-white/95 drop-shadow-lg" : ""}`}>
        {children}
      </div>
    </div>
  );
}
