import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Waju Dynamic — Construction & Haulage Delivery You Can Rely On',
  description: 'Waju Dynamics delivers aggregate, concrete, steel, and bulk materials to construction sites across the region. 18 years of on-time delivery, 850K+ tons moved.',
  icons: {
    icon: [
      { url: '/assets/images/logo.png', type: 'image/x-icon' }
    ],
  },
  openGraph: {
    title: 'Waju Dynamics — Haulage Delivery You Can Rely On',
    description: 'Aggregate, concrete, steel & bulk material delivery. 18 years, 850K+ tons moved.',
    images: [{ url: '/assets/images/logo.png', width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}

      </body>
    </html>
  );
}