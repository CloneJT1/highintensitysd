import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
const LAST = '2026-09-12';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://highintensityfootball.com',               lastModified: LAST, changeFrequency: 'weekly',  priority: 1   },
    { url: 'https://highintensityfootball.com/championships', lastModified: LAST, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
