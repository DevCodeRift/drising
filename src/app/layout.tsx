import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import { getStructuredData } from '@/lib/seo';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://destiny-rising-builds.vercel.app'),
  title: {
    default: 'Destiny Rising Builds - Best Destiny 2 Builds & Guides',
    template: '%s | Destiny Rising Builds',
  },
  description: 'The ultimate destination for Destiny 2 builds, guides, and news. Find the best PvP and PvE builds, weapon reviews, and seasonal content updates.',
  keywords: ['Destiny 2', 'builds', 'guides', 'PvP', 'PvE', 'weapons', 'armor', 'exotic', 'legendary'],
  authors: [{ name: 'Destiny Rising Builds Team' }],
  creator: 'Destiny Rising Builds Team',
  publisher: 'Destiny Rising Builds',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Destiny Rising Builds',
    title: 'Destiny Rising Builds - Best Destiny 2 Builds & Guides',
    description: 'Discover top-tier Destiny 2 builds, weapon guides, and seasonal content. Stay ahead with the latest PvP and PvE strategies.',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Destiny Rising Builds',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@DestinyRising',
    creator: '@DestinyRising',
    title: 'Destiny Rising Builds - Best Destiny 2 Builds & Guides',
    description: 'Discover top-tier Destiny 2 builds, weapon guides, and seasonal content.',
    images: ['/images/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = getStructuredData('website');

  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="min-h-screen bg-destiny-dark text-destiny-gray-100">
        <div className="relative">
          {/* Background gradient overlay */}
          <div className="fixed inset-0 bg-hero-pattern opacity-50 pointer-events-none" />

          {/* Main content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}