"use client";

import { useCookieConsent } from "@/context/CookieConsentContext";
import GoogleAnalytics from "./GoogleAnalytics";

export default function GoogleAnalyticsWrapper() {
  const { analyticsConsent } = useCookieConsent();
  
  return <GoogleAnalytics analyticsConsent={analyticsConsent} />;
}
