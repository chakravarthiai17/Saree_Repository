import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Shop Handloom Sarees Online | 23 Categories & 15+ Indian States',
  description:
    'Browse our curated collection of authentic Indian sarees. Filter by State, Fabric, Occasion, Price, and Discounts. Silk Mark Certified pure mulberry silk, katan, paithani, and tussar.',
  alternates: {
    canonical: '/shop',
  },
  openGraph: {
    title: 'Shop Authentic Indian Sarees Online | SareeHub',
    description:
      'Browse our curated collection of authentic Indian sarees from Kanchipuram, Banaras, Paithan, and across India.',
    url: `${SITE_CONFIG.domain}/shop`,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: 'Shop Indian Handloom Sarees on SareeHub',
      },
    ],
    locale: SITE_CONFIG.locale,
    type: 'website',
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
