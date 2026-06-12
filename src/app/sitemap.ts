import { MetadataRoute } from 'next'
import { researchArticles } from '@/lib/researchData'

export async function generateSitemaps() {
  return [{ id: 0 }]
}

export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://optimaai.eu'
  const labUrl = 'https://lab.optimaai.eu'

  // Research cikkek URL-jei a lab subdomainhez
  const researchUrls: MetadataRoute.Sitemap = researchArticles.map((article) => ({
    url: `${labUrl}/research/${article.slug}`,
    lastModified: new Date('2026-06-12'),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    // — Fő domain oldalak —
    {
      url: baseUrl,
      lastModified: new Date('2026-06-12'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/szolgaltatasok`,
      lastModified: new Date('2026-06-12'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/munkak`,
      lastModified: new Date('2026-06-12'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kapcsolat`,
      lastModified: new Date('2026-06-12'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/folyamat`,
      lastModified: new Date('2026-06-12'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // — Lab subdomain oldalak —
    {
      url: labUrl,
      lastModified: new Date('2026-06-12'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Lab research cikkek
    ...researchUrls,
  ]
}
