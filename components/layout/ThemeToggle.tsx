"use client";

import { useTheme } from "@/hooks/useTheme";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="rounded-lg p-2 text-charcoal transition-colors hover:bg-cream-dark dark:text-zinc-100 dark:hover:bg-charcoal-light"
      aria-label="Toggle dark mode"
    >
      {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
}
