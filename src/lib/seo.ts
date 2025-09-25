const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://destiny-rising-builds.vercel.app';

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