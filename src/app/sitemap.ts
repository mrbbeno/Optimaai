import { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { researchArticles } from '@/lib/researchData'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers()
  const host = headersList.get('host') || 'optimaai.eu'
  const isLab = host.includes('lab.optimaai.eu')
  const isCue = host.includes('cue.optimaai.eu')

  if (isCue) {
    return [
      {
        url: 'https://cue.optimaai.eu',
        lastModified: new Date('2025-01-01'),
        changeFrequency: 'weekly',
        priority: 1.0,
      }
    ]
  }

  if (isLab) {
    const labUrl = 'https://lab.optimaai.eu'
    const researchUrls: MetadataRoute.Sitemap = researchArticles.map((article) => ({
      url: `${labUrl}/research/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

    return [
      {
        url: labUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
      ...researchUrls,
    ]
  }

  const baseUrl = 'https://optimaai.eu'
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
  ]
}
