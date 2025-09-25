import { BlogPost } from '@/types/content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://destiny-rising-builds.vercel.app';

// Organization Schema
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Destiny Rising Builds',
  url: SITE_URL,
  description: 'The ultimate destination for Destiny 2 builds, guides, and news',
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/logo.png`,
    width: 200,
    height: 200,
  },
  sameAs: [
    'https://twitter.com/destinyrising',
    'https://discord.gg/destiny',
    'https://reddit.com/r/destinyrising',
    'https://youtube.com/c/destinyrising',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    availableLanguage: 'English',
  },
};

// Website Schema
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Destiny Rising Builds',
  alternateName: 'Destiny Rising',
  url: SITE_URL,
  description: 'The ultimate destination for Destiny 2 builds, guides, and news',
  publisher: {
    '@type': 'Organization',
    name: 'Destiny Rising Builds',
    url: SITE_URL,
  },
  potentialAction: [
    {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  ],
  mainEntity: {
    '@type': 'ItemList',
    name: 'Destiny 2 Content',
    itemListElement: [
      {
        '@type': 'SiteNavigationElement',
        position: 1,
        name: 'Builds',
        description: 'Destiny 2 character builds and loadouts',
        url: `${SITE_URL}/builds`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 2,
        name: 'Guides',
        description: 'Destiny 2 guides and tutorials',
        url: `${SITE_URL}/guides`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 3,
        name: 'News',
        description: 'Latest Destiny 2 news and updates',
        url: `${SITE_URL}/news`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 4,
        name: 'Reviews',
        description: 'Weapon and exotic reviews',
        url: `${SITE_URL}/reviews`,
      },
    ],
  },
};

// Breadcrumb Schema
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

// Article Schema
export function generateArticleSchema(post: BlogPost, slug: string) {
  const articleUrl = `${SITE_URL}/posts/${slug}`;
  const imageUrl = post.image ? `${SITE_URL}${post.image}` : `${SITE_URL}/images/og-default.jpg`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': articleUrl,
    headline: post.title,
    description: post.description,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Person',
      name: post.author,
      url: `${SITE_URL}/authors/${post.author.toLowerCase().replace(/\s+/g, '-')}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Destiny Rising Builds',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
        width: 200,
        height: 200,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    keywords: post.tags.join(', '),
    articleSection: post.category,
    wordCount: Math.ceil(post.content.split(' ').length),
    timeRequired: `PT${Math.ceil(post.readingTime)}M`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Destiny Rising Builds',
      url: SITE_URL,
    },
    about: {
      '@type': 'VideoGame',
      name: 'Destiny 2',
      publisher: 'Bungie',
      genre: 'First-person shooter',
      platform: ['PlayStation', 'Xbox', 'PC'],
    },
  };
}

// How-to Guide Schema (for guide posts)
export function generateHowToSchema(post: BlogPost, steps: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: post.title,
    description: post.description,
    image: post.image ? `${SITE_URL}${post.image}` : `${SITE_URL}/images/og-default.jpg`,
    totalTime: `PT${Math.ceil(post.readingTime)}M`,
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Destiny 2 Game',
      },
      {
        '@type': 'HowToSupply',
        name: 'Gaming Platform (PC, PlayStation, or Xbox)',
      },
    ],
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: `Step ${index + 1}`,
      text: step,
    })),
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: organizationSchema,
  };
}

// Game Item Schema (for weapon/armor reviews)
export function generateGameItemSchema(
  itemName: string,
  itemType: string,
  description: string,
  rating?: number
) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: itemName,
    description: description,
    category: itemType,
    brand: {
      '@type': 'Brand',
      name: 'Bungie',
    },
    isRelatedTo: {
      '@type': 'VideoGame',
      name: 'Destiny 2',
    },
  };

  if (rating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: rating,
      ratingCount: 1,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
}

// Video Game Schema
export const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Destiny 2',
  description: 'A free-to-play online-only multiplayer first-person shooter video game',
  publisher: {
    '@type': 'Organization',
    name: 'Bungie',
    url: 'https://www.bungie.net',
  },
  genre: ['First-person shooter', 'Action role-playing', 'MMO'],
  gamePlatform: ['PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X/S', 'Microsoft Windows', 'Stadia'],
  contentRating: {
    '@type': 'Rating',
    ratingValue: 'T',
    author: 'ESRB',
    bestRating: 'M',
    worstRating: 'E',
  },
  applicationCategory: 'Game',
  operatingSystem: ['Windows', 'PlayStation', 'Xbox'],
};

// FAQ Schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Collection Schema (for build collections)
export function generateCollectionSchema(
  title: string,
  description: string,
  items: BlogPost[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Collection',
    name: title,
    description: description,
    numberOfItems: items.length,
    about: videoGameSchema,
    hasPart: items.map((item, index) => ({
      '@type': 'Article',
      position: index + 1,
      name: item.title,
      url: `${SITE_URL}/posts/${item.slug}`,
      datePublished: item.publishedAt,
      author: {
        '@type': 'Person',
        name: item.author,
      },
    })),
  };
}

// Local Business Schema (for community/social aspects)
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'OnlineStore',
  name: 'Destiny Rising Builds',
  description: 'Online community and resource hub for Destiny 2 players',
  url: SITE_URL,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
  openingHours: '24/7',
  priceRange: 'Free',
  acceptsReservations: false,
  servesCuisine: 'Gaming Content',
  serviceType: 'Gaming Community',
};

// Combined Schema for homepage
export function getHomepageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      websiteSchema,
      videoGameSchema,
      localBusinessSchema,
    ],
  };
}