import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'All 23 Indian Saree Categories | Pure Silk, Handloom & Bridal Weaves',
  description:
    'Comprehensive encyclopedia of 23 Indian saree categories: Kanchipuram, Banarasi, Paithani, Mysore Silk, Uppada, Gadwal, Pochampally Ikat, Chanderi, Patola, Organza, and more.',
  alternates: {
    canonical: '/categories',
  },
  openGraph: {
    title: 'All 23 Saree Categories | SareeHub',
    description:
      'Comprehensive encyclopedia of 23 Indian saree categories: Kanchipuram, Banarasi, Paithani, Mysore Silk, and more.',
    url: `${SITE_CONFIG.domain}/categories`,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: 'All 23 Indian Saree Categories on SareeHub',
      },
    ],
    locale: SITE_CONFIG.locale,
    type: 'website',
  },
};

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
