import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
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
    }
  ]
}
