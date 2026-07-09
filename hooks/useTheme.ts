"use client";

import { useCallback, useState } from "react";

function getInitialTheme(): boolean {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("ecobrew-theme");
    return stored === "dark";
  }
  return false;
}

export function useTheme() {
  const [isDark, setIsDark] = useState(getInitialTheme);

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("ecobrew-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("ecobrew-theme", "light");
      }
      return next;
    });
  }, []);

  return { isDark, toggle };
}
