"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ConsentState = "pending" | "accepted" | "declined";

interface CookieConsentContextType {
  consentState: ConsentState;
  analyticsConsent: boolean;
  acceptAll: () => void;
  declineAll: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consentState, setConsentState] = useState<ConsentState>("pending");

  useEffect(() => {
    const savedConsent = localStorage.getItem("optimaai_cookie_consent");
    if (savedConsent === "accepted") {
      setConsentState("accepted");
    } else if (savedConsent === "declined") {
      setConsentState("declined");
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("optimaai_cookie_consent", "accepted");
    setConsentState("accepted");
  };

  const declineAll = () => {
    localStorage.setItem("optimaai_cookie_consent", "declined");
    setConsentState("declined");
  };

  const analyticsConsent = consentState === "accepted";

  return (
    <CookieConsentContext.Provider value={{ consentState, analyticsConsent, acceptAll, declineAll }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
};
