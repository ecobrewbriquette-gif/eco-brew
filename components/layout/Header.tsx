"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileNav from "./MobileNav";

interface NavItem {
  key: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { key: "home", label: "Beranda", href: "/" },
  { key: "about", label: "Tentang", href: "/about" },
  { key: "products", label: "Produk", href: "/products" },
  { key: "technology", label: "Teknologi", href: "/technology" },
  { key: "sustainability", label: "Keberlanjutan", href: "/sustainability" },
  { key: "industries", label: "Industri", href: "/industries" },
  { key: "gallery", label: "Galeri", href: "/gallery" },
  { key: "blog", label: "Blog", href: "/blog" },
  { key: "contact", label: "Kontak", href: "/contact" },
];

export default function Header() {
  const params = useParams();
  const pathname = usePathname();
  const lang = (params?.lang as string) || "id";

  const isActive = (href: string) => {
    const cleanPath = pathname.replace(`/${lang}`, "") || "/";
    if (href === "/") return cleanPath === "/";
    return cleanPath.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-cream-dark/50 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-black/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2 text-xl font-bold text-forest dark:text-forest-light"
        >
          <Image
            src="/images/logo-ecobrew.png"
            alt="EcoBrew"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-xl font-bold">EcoBrew</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${lang}${item.href}`}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-forest/10 text-forest dark:bg-forest/20 dark:text-forest-light"
                  : "text-charcoal hover:bg-cream-dark dark:text-zinc-300 dark:hover:bg-charcoal-light"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <MobileNav items={navItems.map((n) => ({ label: n.label, href: n.href }))} />
        </div>
      </div>
    </header>
  );
}
