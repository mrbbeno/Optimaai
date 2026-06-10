"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeSync() {
  const { theme } = useTheme();

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    // Store original background colors
    const originalBodyBg = body.style.backgroundColor;
    const originalHtmlBg = html.style.backgroundColor;
    
    // Dynamically toggle body backgrounds based on active theme
    const isDark = theme === "dark";
    body.style.backgroundColor = isDark ? "#0A0A0C" : "#FBFBFD";
    html.style.backgroundColor = isDark ? "#0A0A0C" : "#FBFBFD";

    return () => {
      // Restore on unmount
      body.style.backgroundColor = originalBodyBg;
      html.style.backgroundColor = originalHtmlBg;
    };
  }, [theme]);

  return null;
}
