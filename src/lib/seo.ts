import { DefaultSeoProps } from 'next-seo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://destiny-rising-builds.vercel.app';

export const defaultSEO: DefaultSeoProps = {
  title: 'Destiny Rising Builds',
  titleTemplate: '%s | Destiny Rising Builds',
  description: 'The ultimate destination for Destiny 2 builds, guides, and news. Find the best PvP and PvE builds, weapon reviews, and seasonal content updates.',
  canonical: SITE_URL,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Destiny Rising Builds',
    title: 'Destiny Rising Builds - Best Destiny 2 Builds & Guides',
    description: 'Discover top-tier Destiny 2 builds, weapon guides, and seasonal content. Stay ahead with the latest PvP and PvE strategies.',
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: 'Destiny Rising Builds',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    handle: '@DestinyRising',
    site: '@DestinyRising',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
    {
      name: 'author',
      content: 'Destiny Rising Builds Team',
    },
    {
      name: 'keywords',
      content: 'Destiny 2, builds, guides, PvP, PvE, weapons, armor, exotic, legendary, season, raids, dungeons, crucible, trials, iron banner',
    },
    {
      name: 'theme-color',
      content: '#0066CC',
    },
    {
      name: 'msapplication-TileColor',
      content: '#0066CC',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'Destiny Rising',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
  ],
};

export interface BlogPostSEO {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  tags: string[];
  category: string;
  author: string;
  image?: string;
}

export const getBlogPostSEO = (post: BlogPostSEO, slug: string) => {
  const url = `${SITE_URL}/posts/${slug}`;
  const imageUrl = post.image ? `${SITE_URL}${post.image}` : `${SITE_URL}/images/og-default.jpg`;

  return {
    title: post.title,
    description: post.description,
    canonical: url,
    openGraph: {
      type: 'article' as const,
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedTime,
      modifiedTime: post.modifiedTime || post.publishedTime,
      authors: [post.author],
      tags: post.tags,
      section: post.category,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/jpeg',
        },
      ],
    },
    additionalMetaTags: [
      {
        name: 'article:author',
        content: post.author,
      },
      {
        name: 'article:published_time',
        content: post.publishedTime,
      },
      {
        name: 'article:modified_time',
        content: post.modifiedTime || post.publishedTime,
      },
      {
        name: 'article:section',
        content: post.category,
      },
      ...post.tags.map(tag => ({
        name: 'article:tag',
        content: tag,
      })),
    ],
  };
};

export const getStructuredData = (type: 'website' | 'article', data?: any) => {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Destiny Rising Builds',
    description: 'The ultimate destination for Destiny 2 builds, guides, and news',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  if (type === 'article' && data) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.title,
      description: data.description,
      author: {
        '@type': 'Person',
        name: data.author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Destiny Rising Builds',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/images/logo.png`,
        },
      },
      datePublished: data.publishedTime,
      dateModified: data.modifiedTime || data.publishedTime,
      image: data.image ? `${SITE_URL}${data.image}` : `${SITE_URL}/images/og-default.jpg`,
      url: `${SITE_URL}/posts/${data.slug}`,
      keywords: data.tags.join(', '),
      articleSection: data.category,
    };
  }

  return baseStructuredData;
};