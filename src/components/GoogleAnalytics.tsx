"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface GoogleAnalyticsProps {
  analyticsConsent: boolean;
}

export default function GoogleAnalytics({ analyticsConsent }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    if (analyticsConsent && gaId && (window as any).gtag) {
      (window as any).gtag("config", gaId, {
        page_path: pathname,
        anonymize_ip: true,
      });
    }
  }, [pathname, analyticsConsent, gaId]);

  if (!analyticsConsent || !gaId) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
            });
          `,
        }}
      />
    </>
  );
}
