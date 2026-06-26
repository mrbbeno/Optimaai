"use client";

import { useEffect } from "react";

export default function CueBackgroundProvider() {
  useEffect(() => {
    // Store original values
    const originalBodyBg = document.body.style.backgroundColor;
    const originalHtmlBg = document.documentElement.style.backgroundColor;

    // Apply strict black background to prevent white overscroll on mobile
    document.body.style.backgroundColor = "#030303";
    document.documentElement.style.backgroundColor = "#030303";

    return () => {
      // Restore on unmount
      document.body.style.backgroundColor = originalBodyBg;
      document.documentElement.style.backgroundColor = originalHtmlBg;
    };
  }, []);

  return null;
}
