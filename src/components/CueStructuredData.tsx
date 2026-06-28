import React from 'react';

export default function CueStructuredData() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Cue by OptimaAI",
    "image": "https://optimaai.eu/Optimaai_logo.png",
    "description": "Get async web development delivered in 48 hours. One request at a time, no meetings, no estimates. Next.js, React, Supabase, APIs. Pause or cancel anytime.",
    "brand": {
      "@type": "Brand",
      "name": "OptimaAI"
    },
    "url": "https://cue.optimaai.eu",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "199",
      "highPrice": "1495",
      "offerCount": "3",
      "url": "https://cue.optimaai.eu"
    },
    "category": "Web Development Service",
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "Delivery Time", "value": "48 hours average" },
      { "@type": "PropertyValue", "name": "Communication", "value": "100% Async via Trello and Loom" },
      { "@type": "PropertyValue", "name": "Commitment", "value": "Pause or cancel anytime" }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Cue — Async Dev Subscription",
    "serviceType": "Web Development Subscription",
    "provider": {
      "@type": "Organization",
      "name": "OptimaAI",
      "url": "https://optimaai.eu"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 47.4979,
        "longitude": 19.0402
      },
      "geoRadius": "10000000",
      "description": "Worldwide (with focus US, Western Europe)"
    },
    "description": "Productized async web development. Subscribe to Cue and get focused web development delivered in 48 hours. No meetings, no estimates. We build landing pages, integrations, and complex features.",
    "offers": {
      "@type": "Offer",
      "price": "199",
      "priceCurrency": "USD"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Landing page sections" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "API integrations" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Auth flows" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Admin dashboards" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Email templates" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Performance fixes" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Database schemas" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Webhook setups" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UI components" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO fixes" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Form logic" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cron jobs" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Animations" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Third-party integrations" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Stripe integrations" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Supabase setups" } }
      ]
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OptimaAI",
    "url": "https://optimaai.eu",
    "logo": "https://optimaai.eu/Optimaai_logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@optimaai.eu",
      "contactType": "customer service"
    },
    "sameAs": [],
    "brand": {
      "@type": "Brand",
      "name": "Cue",
      "url": "https://cue.optimaai.eu"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Cue by OptimaAI",
    "url": "https://cue.optimaai.eu",
    "description": "Get async web development delivered in 48 hours. One request at a time, no meetings, no estimates.",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["#speakable-summary"]
    }
  };

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Which plan is right for my business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It depends entirely on your current stage and what you need shipped: Cue Mini ($199/mo) for maintenance, Cue Growth ($599/mo) for active marketing and features, and Cue Pro ($1,495/mo) for high-speed SaaS development."
        }
      },
      {
        "@type": "Question",
        "name": "What counts as a single request?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Any task that a senior developer can complete in under 4 hours. Massive projects are automatically broken down into focused 4-hour milestones delivered sequentially."
        }
      },
      {
        "@type": "Question",
        "name": "Do you do calls or meetings?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Never. Everything is 100% asynchronous via Trello, email, or Loom videos to maintain high-speed delivery."
        }
      },
      {
        "@type": "Question",
        "name": "What if I’m not happy with the results, or run out of tasks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer unlimited revisions. You can also pause or cancel your subscription anytime. The Growth plan includes a 14-day money-back guarantee."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://optimaai.eu"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Cue",
        "item": "https://cue.optimaai.eu"
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
