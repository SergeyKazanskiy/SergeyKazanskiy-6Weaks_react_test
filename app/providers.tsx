"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/src/theme/store";


export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const setTheme = useThemeStore((s) => s.setTheme);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    setTheme(saved ?? "light");
  }, [setTheme]);

  return <>{children}</>;
}
