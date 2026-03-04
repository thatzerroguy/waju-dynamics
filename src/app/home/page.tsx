import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import WhySection from './components/WhySection';
import TestimonialsSection from './components/TestimonialsSection';
import QuoteSection from './components/QuoteSection';

export const metadata: Metadata = {
  title: 'Waju Dynamic — Construction & Haulage Delivery You Can Rely On',
  description:
    'Waju Dynamic delivers aggregate, concrete, steel, and bulk materials to construction sites across the region. 18 years of on-time delivery, 850K+ tons moved.',
  alternates: {
    canonical: '/home',
  },
  openGraph: {
    title: 'Waju Dynamic — Haulage Delivery You Can Rely On',
    description: 'Aggregate, concrete, steel & bulk material delivery. 18 years, 850K+ tons moved.',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630 }],
  },
};

// JSON-LD structured data
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'HaulPro',
  url: 'https://haulpro.com',
  logo: '/assets/images/app_logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-800-555-0190',
    contactType: 'customer service',
    availableLanguage: 'English',
  },
  sameAs: [],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Waju Dynamics — Construction & Haulage Delivery',
  description:
    'Waju Dynamic delivers aggregate, concrete, steel, and bulk materials to construction sites.',
  url: 'https://haulpro.com/home',
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Waju Dynamics',
  description: 'Construction and haulage delivery specialists',
  telephone: '+234-904-915-5555',
  email: 'info@wajudynamic.com',
  areaServed: 'Nigeria',
};

export default function HomePage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <Header />

      <main>
        <HeroSection />
        <ServicesSection />
        <WhySection />
        <TestimonialsSection />
        <QuoteSection />
      </main>

      <Footer />
    </>
  );
}