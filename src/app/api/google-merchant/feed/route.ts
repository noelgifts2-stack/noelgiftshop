import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS } from '@/data/products';
import { Locale, CountryCode } from '@/types';

/**
 * Google Merchant Center Standard RSS 2.0 / Google Base XML Feed
 * URL: /api/google-merchant/feed?country=FR|CA|DE|ES
 * 100% Conforme aux spécifications officielles Google Shopping 2026
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const country = (searchParams.get('country') || 'FR').toUpperCase() as CountryCode;
  
  let locale: Locale = 'fr';
  let currency = 'EUR';
  
  if (country === 'CA') {
    locale = 'en';
    currency = 'CAD';
  } else if (country === 'DE') {
    locale = 'de';
    currency = 'EUR';
  } else if (country === 'ES') {
    locale = 'es';
    currency = 'EUR';
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.noelgiftshop.com';

  const itemsXml = PRODUCTS.map(product => {
    const title = product.title[locale] || product.title.fr;
    const description = product.description[locale] || product.description.fr;
    const price = currency === 'CAD' ? product.priceCad : product.priceEur;
    const link = `${siteUrl}/${locale}/product/${product.id}`;
    const imageLink = product.images[0];
    const additionalImagesXml = product.images.slice(1).map(img => 
      `<g:additional_image_link>${escapeXml(img)}</g:additional_image_link>`
    ).join('\n        ');

    return `
    <item>
      <g:id>${escapeXml(product.sku)}</g:id>
      <g:title>${escapeXml(title)}</g:title>
      <g:description>${escapeXml(description)}</g:description>
      <g:link>${escapeXml(link)}</g:link>
      <g:image_link>${escapeXml(imageLink)}</g:image_link>
      ${additionalImagesXml}
      <g:condition>${product.condition}</g:condition>
      <g:availability>${product.availability}</g:availability>
      <g:price>${price.toFixed(2)} ${currency}</g:price>
      <g:brand>${escapeXml(product.brand)}</g:brand>
      <g:gtin>${product.gtin}</g:gtin>
      <g:mpn>${escapeXml(product.mpn)}</g:mpn>
      <g:identifier_exists>${product.identifierExists ? 'yes' : 'no'}</g:identifier_exists>
      <g:google_product_category>${escapeXml(product.googleProductCategory)}</g:google_product_category>
      ${product.gender ? `<g:gender>${product.gender}</g:gender>` : ''}
      ${product.ageGroup ? `<g:age_group>${product.ageGroup}</g:age_group>` : ''}
      <g:shipping>
        <g:country>${country}</g:country>
        <g:service>Standard Festive Delivery</g:service>
        <g:price>0.00 ${currency}</g:price>
      </g:shipping>
    </item>`;
  }).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>NOËL GIFT SHOP - Google Merchant Center Product Feed (${country})</title>
    <link>${siteUrl}</link>
    <description>Flux de produits officiel Google Shopping - NOËL GIFT SHOP 2026</description>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
