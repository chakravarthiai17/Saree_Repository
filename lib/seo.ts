import { Saree, StateCollection, SareeCategory } from './types';

export const SITE_CONFIG = {
  name: 'SareeHub',
  domain: 'https://sareehub.com',
  title: 'SareeHub | Discover the Beauty of India, One Saree at a Time',
  description:
    'SareeHub is your luxury online destination for authentic Indian handloom sarees across 15+ states. Explore Kanchipuram, Banarasi, Paithani, Mysore, and heirloom weaves with Silk Mark certified purity.',
  keywords: [
    'Indian Sarees',
    'Kanchipuram Silk Sarees',
    'Banarasi Sarees',
    'Paithani Sarees',
    'Mysore Silk Sarees',
    'Gadwal Sarees',
    'Pochampally Ikat Sarees',
    'Uppada Sarees',
    'Chanderi Sarees',
    'Patola Sarees',
    'Handloom Sarees',
    'Bridal Sarees',
    'Pure Silk Sarees',
    'Silk Mark Certified Sarees',
    'Indian Ethnic Fashion',
    'Buy Sarees Online',
  ],
  author: 'SareeHub Artisans & Connoisseurs',
  creator: 'SareeHub',
  publisher: 'SareeHub',
  locale: 'en_IN',
  ogImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
  social: {
    instagram: 'https://instagram.com/sareehub',
    facebook: 'https://facebook.com/sareehub',
    pinterest: 'https://pinterest.com/sareehub',
    youtube: 'https://youtube.com/sareehub',
  },
  contact: {
    phone: '+917406197088',
    email: 'support@sareehub.com',
    city: 'Hyderabad',
    state: 'Telangana',
    postalCode: '500033',
    country: 'IN',
  },
};

/**
 * Generate Schema.org Organization structured data
 */
export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FashionStore',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.domain,
    logo: `${SITE_CONFIG.domain}/logo.png`,
    image: SITE_CONFIG.ogImage,
    description: SITE_CONFIG.description,
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot 42, Weavers Pavilion, Jubilee Hills',
      addressLocality: SITE_CONFIG.contact.city,
      addressRegion: SITE_CONFIG.contact.state,
      postalCode: SITE_CONFIG.contact.postalCode,
      addressCountry: SITE_CONFIG.contact.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '17.4319',
      longitude: '78.4073',
    },
    sameAs: [
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.pinterest,
      SITE_CONFIG.social.youtube,
    ],
    priceRange: '₹₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, UPI, Net Banking, Razorpay',
  };
}

/**
 * Generate Schema.org WebSite structured data with SearchAction
 */
export function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.domain,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.domain}/shop?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Schema.org Product structured data for saree product detail pages
 */
export function getProductJsonLd(product: Saree) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.id,
    mpn: product.slug,
    brand: {
      '@type': 'Brand',
      name: 'SareeHub Handloom',
    },
    countryOfOrigin: {
      '@type': 'Country',
      name: 'India',
    },
    color: product.color,
    material: product.fabric,
    category: product.category,
    offers: {
      '@type': 'Offer',
      url: `${SITE_CONFIG.domain}/product/${product.slug}`,
      priceCurrency: 'INR',
      price: product.discountedPrice,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability:
        product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        returnPolicyCategory:
          'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 7,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: product.discountedPrice >= 1999 ? '0' : '150',
          currency: 'INR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IN',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 5,
            unitCode: 'd',
          },
        },
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount || 1,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

/**
 * Generate Schema.org BreadcrumbList structured data
 */
export function getBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_CONFIG.domain}${item.url}`,
    })),
  };
}

/**
 * Generate Schema.org FAQPage structured data
 */
export function getFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
