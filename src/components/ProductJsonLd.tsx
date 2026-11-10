import React from 'react';
import { Product, Locale, Currency } from '@/types';

interface ProductJsonLdProps {
  product: Product;
  locale: Locale;
  currency: Currency;
  siteUrl?: string;
}

export default function ProductJsonLd({
  product,
  locale,
  currency,
  siteUrl = 'https://www.noelgiftshop.com'
}: ProductJsonLdProps) {
  const title = product.title[locale] || product.title.fr;
  const description = product.description[locale] || product.description.fr;
  const price = currency === 'CAD' ? product.priceCad : product.priceEur;

  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: title,
    image: product.images,
    description: description,
    sku: product.sku,
    gtin13: product.gtin || undefined,
    mpn: product.mpn,
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/${locale}/product/${product.id}`,
      priceCurrency: currency,
      price: price.toFixed(2),
      priceValidUntil: '2026-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.stock > 0 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'NOËL GIFT SHOP'
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0.00',
          currency: currency
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          businessDays: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'd'
          }
        }
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: ['FR', 'CA', 'DE', 'ES'],
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toString(),
      reviewCount: product.reviewsCount.toString()
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
