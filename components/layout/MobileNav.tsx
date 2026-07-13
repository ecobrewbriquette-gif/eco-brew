"use client";

import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function MobileNav({ items }: { items: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const pathname = usePathname();
  const lang = (params?.lang as string) || "id";

  const isActive = (href: string) => {
    const cleanPath = pathname.replace(`/${lang}`, "") || "/";
    return cleanPath === href || cleanPath.startsWith(href + "/");
  };

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg p-2 text-charcoal transition-colors hover:bg-cream-dark dark:text-zinc-100 dark:hover:bg-charcoal-light"
        aria-label="Open menu"
      >
        <FiMenu size={24} />
      </button>

      {open && createPortal(
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="flex w-72 flex-col bg-white p-6 shadow-xl dark:bg-charcoal">
            <div className="mb-8 flex items-center justify-between">
              <Link
                href={`/${lang}`}
                className="text-xl font-bold text-forest dark:text-forest-light"
                onClick={() => setOpen(false)}
              >
                EcoBrew
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-charcoal hover:bg-cream-dark dark:text-zinc-100 dark:hover:bg-charcoal-light"
              >
                <FiX size={24} />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={`/${lang}${item.href}`}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-forest text-white"
                      : "text-charcoal hover:bg-cream-dark dark:text-zinc-300 dark:hover:bg-charcoal-light"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
