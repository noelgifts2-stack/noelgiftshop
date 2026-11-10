import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.noelgiftshop.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/checkout', '/cart', '/api/orders'],
      },
      {
        userAgent: ['Googlebot', 'Googlebot-Image', 'Google-StoreBot'],
        allow: ['/', '/product/', '/category/', '/api/google-merchant/feed'],
        disallow: ['/checkout', '/cart'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
