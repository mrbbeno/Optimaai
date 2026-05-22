export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Optimaai',
    url: 'https://optimaai.eu',
    logo: 'https://optimaai.eu/Optimaai_logo.png',
    description:
      'Prémium weboldalakat, AI automatizációs rendszereket és ingatlan marketing platformokat fejlesztünk Budapesten.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Budapest',
      addressCountry: 'HU',
    },
    email: 'info@optimaai.eu',
    foundingDate: '2024',
    sameAs: [],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function WebSiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Optimaai',
    url: 'https://optimaai.eu',
    inLanguage: 'hu',
    description:
      'Prémium webfejlesztés, AI automatizáció és ingatlan marketing — Budapest',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Optimaai',
    url: 'https://optimaai.eu',
    logo: 'https://optimaai.eu/Optimaai_logo.png',
    image: 'https://optimaai.eu/Optimaai_logo.png',
    description:
      'Egyedi weboldal fejlesztés, AI automatizáció és digitális marketing megoldások vállalkozásoknak.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Budapest',
      addressCountry: 'HU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 47.4979,
      longitude: 19.0402,
    },
    email: 'info@optimaai.eu',
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'Magyarország',
    },
    serviceType: [
      'Weboldal fejlesztés',
      'AI automatizáció',
      'Ingatlan marketing',
      'Webdesign',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function ServicesJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Optimaai Szolgáltatások',
    itemListElement: [
      {
        '@type': 'Service',
        position: 1,
        name: 'Prémium Weboldal Fejlesztés',
        description:
          'Egyedi, konverzióra optimalizált weboldalak tervezése és fejlesztése vállalkozásoknak.',
        provider: {
          '@type': 'Organization',
          name: 'Optimaai',
        },
        areaServed: 'Magyarország',
        serviceType: 'Webfejlesztés',
      },
      {
        '@type': 'Service',
        position: 2,
        name: 'AI Automatizációs Rendszerek',
        description:
          'Üzleti folyamatok automatizálása mesterséges intelligenciával — lead-kezelés, ajánlatgenerálás, ügyfélkommunikáció.',
        provider: {
          '@type': 'Organization',
          name: 'Optimaai',
        },
        areaServed: 'Magyarország',
        serviceType: 'AI automatizáció',
      },
      {
        '@type': 'Service',
        position: 3,
        name: 'Ingatlan Marketing Platformok',
        description:
          'Foglalási rendszerek, értékesítési funnelek és landing oldalak ingatlanfejlesztőknek.',
        provider: {
          '@type': 'Organization',
          name: 'Optimaai',
        },
        areaServed: 'Magyarország',
        serviceType: 'Ingatlan marketing',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
