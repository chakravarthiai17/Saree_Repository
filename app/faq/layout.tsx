import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Silk Mark, Care & Delivery',
  description:
    'Answers to all common questions about Silk Mark authenticity, gold zari testing, 5.5m saree dimensions, 7-day easy returns, free Pan-India shipping, and pure silk storage.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'SareeHub FAQs | Handloom Authenticity & Customer Service',
    description:
      'Answers to all questions about Silk Mark authenticity, saree care, and returns.',
    url: `${SITE_CONFIG.domain}/faq`,
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
