import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Explore Sarees Across India | 15+ States Handloom Collections',
  description:
    'Discover traditional handloom sarees from Tamil Nadu, Uttar Pradesh, Telangana, Andhra Pradesh, Karnataka, Maharashtra, Gujarat, Rajasthan, West Bengal, Odisha, and more.',
  alternates: {
    canonical: '/states',
  },
  openGraph: {
    title: 'Explore Sarees Across 15+ Indian States | SareeHub',
    description:
      'Discover traditional handloom sarees from Tamil Nadu, Uttar Pradesh, Telangana, Maharashtra, and across India.',
    url: `${SITE_CONFIG.domain}/states`,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: 'Explore Sarees Across India',
      },
    ],
    locale: SITE_CONFIG.locale,
    type: 'website',
  },
};

export default function StatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
