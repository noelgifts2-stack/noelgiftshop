import { MetadataRoute } from 'next';
import { PRODUCTS, CATEGORIES } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.noelgiftshop.com';
  const lastModified = new Date();

  // Pages statiques
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/shop`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/legal/returns`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/legal/shipping`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/legal/cgv`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/legal/privacy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/legal/mentions-legales`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Catégories dynamiques
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${siteUrl}/category/${cat.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Produits dynamiques (lu par Googlebot)
  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((prod) => ({
    url: `${siteUrl}/product/${prod.id}`,
    lastModified,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
