import { MetadataRoute } from 'next'
import { researchArticles } from '@/lib/researchData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://optimaai.eu'
  const labUrl = 'https://lab.optimaai.eu'

  // Research cikkek URL-jei a lab subdomainhez
  const researchUrls: MetadataRoute.Sitemap = researchArticles.map((article) => ({
    url: `${labUrl}/research/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/kapcsolat`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // — Lab subdomain oldalak —
    {
      url: labUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Lab research cikkek
    ...researchUrls,
  ]
}
