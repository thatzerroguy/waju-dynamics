import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wajudynamics.com';
  return [
    {
      url: `${baseUrl}/home`,
      lastModified: new Date('2026-03-04'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/home#services`,
      lastModified: new Date('2026-03-04'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/home#quote`,
      lastModified: new Date('2026-03-04'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}