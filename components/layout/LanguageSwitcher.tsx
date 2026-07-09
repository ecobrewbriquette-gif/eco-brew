"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { locales } from "@/lib/dictionaries";
import { FiGlobe } from "react-icons/fi";
import { useState } from "react";

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const currentLang = (params?.lang as string) || "id";
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-lg p-2 text-sm font-medium text-charcoal transition-colors hover:bg-cream-dark dark:text-zinc-100 dark:hover:bg-charcoal-light"
      >
        <FiGlobe size={16} />
        <span>{currentLang.toUpperCase()}</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-32 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5 dark:bg-charcoal-light">
            {locales.map((locale) => (
              <Link
                key={locale}
                href={pathname.replace(`/${currentLang}`, `/${locale}`)}
                className={`block px-4 py-2 text-sm transition-colors hover:bg-cream-dark dark:hover:bg-charcoal ${
                  locale === currentLang
                    ? "font-semibold text-forest dark:text-forest-light"
                    : "text-charcoal dark:text-zinc-300"
                }`}
                onClick={() => setOpen(false)}
              >
                {locale === "id" ? "Indonesia" : "English"}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
