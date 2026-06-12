import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/adatvedelem/', '/aszf/', '/lab/'],
      },
    ],
    sitemap: 'https://optimaai.eu/sitemap.xml',
  }
}
