import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact Us | Bridal Concierge & Saree Styling Support',
  description:
    'Contact the SareeHub concierge team for personalized bridal trousseau consultations, Silk Mark verification guidance, and order support.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact SareeHub Concierge & Saree Specialists',
    description:
      'Contact our concierge desk for personalized bridal saree consultations and order assistance.',
    url: `${SITE_CONFIG.domain}/contact`,
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
