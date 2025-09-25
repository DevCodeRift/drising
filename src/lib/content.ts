import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { BlogPost, BuildGuide, Guide, NewsPost, WeaponReview } from '@/types/content';

const contentDirectory = path.join(process.cwd(), 'content');
const postsDirectory = path.join(contentDirectory, 'posts');

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(name => name.endsWith('.mdx') || name.endsWith('.md'))
    .map(name => name.replace(/\.(mdx|md)$/, ''));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const realSlug = slug.replace(/\.mdx?$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      // Try .md extension
      const mdPath = path.join(postsDirectory, `${realSlug}.md`);
      if (!fs.existsSync(mdPath)) {
        return null;
      }
      return getPostFromFile(mdPath, realSlug);
    }

    return getPostFromFile(fullPath, realSlug);
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

function getPostFromFile(filePath: string, slug: string): BlogPost {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  // Create excerpt from content if not provided
  const excerpt = data.excerpt || createExcerpt(content);

  return {
    slug,
    title: data.title || '',
    description: data.description || excerpt,
    content,
    publishedAt: data.publishedAt || data.date || new Date().toISOString(),
    updatedAt: data.updatedAt,
    author: data.author || 'Anonymous',
    category: data.category || 'news',
    tags: data.tags || [],
    image: data.image,
    featured: data.featured || false,
    readingTime: stats.minutes,
    excerpt,
  };
}

function createExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown formatting and take first paragraph
  const cleanContent = content
    .replace(/^---[\s\S]*?---/, '') // Remove frontmatter
    .replace(/#{1,6}\s+/g, '') // Remove headings
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Remove links but keep text
    .replace(/\*{1,2}([^*]*)\*{1,2}/g, '$1') // Remove bold/italic
    .replace(/`([^`]*)`/g, '$1') // Remove inline code
    .replace(/^\s*[-*+]\s+/gm, '') // Remove list markers
    .trim();

  const firstParagraph = cleanContent.split('\n\n')[0];

  if (firstParagraph.length <= maxLength) {
    return firstParagraph;
  }

  const words = firstParagraph.split(' ');
  let excerpt = '';

  for (const word of words) {
    if ((excerpt + ' ' + word).length > maxLength - 3) {
      break;
    }
    excerpt += (excerpt ? ' ' : '') + word;
  }

  return excerpt + '...';
}

export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return posts;
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(post => post.category === category);
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter(post => post.featured);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter(post =>
    post.tags.some(postTag =>
      postTag.toLowerCase() === tag.toLowerCase()
    )
  );
}

export function getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  const allPosts = getAllPosts().filter(post => post.slug !== currentPost.slug);

  // Score posts based on shared tags and same category
  const scoredPosts = allPosts.map(post => {
    let score = 0;

    // Same category gets higher score
    if (post.category === currentPost.category) {
      score += 3;
    }

    // Shared tags
    const sharedTags = post.tags.filter(tag =>
      currentPost.tags.includes(tag)
    );
    score += sharedTags.length * 2;

    return { post, score };
  });

  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}

export function searchPosts(query: string): BlogPost[] {
  const searchTerms = query.toLowerCase().split(' ');
  const allPosts = getAllPosts();

  return allPosts.filter(post => {
    const searchableText = [
      post.title,
      post.description,
      post.excerpt,
      post.author,
      ...post.tags,
    ].join(' ').toLowerCase();

    return searchTerms.every(term => searchableText.includes(term));
  });
}

// Type-specific getters with proper typing
export function getBuildGuides(): BuildGuide[] {
  return getPostsByCategory('builds') as BuildGuide[];
}

export function getGuides(): Guide[] {
  return getPostsByCategory('guides') as Guide[];
}

export function getNewsPlosts(): NewsPost[] {
  return getPostsByCategory('news') as NewsPost[];
}

export function getWeaponReviews(): WeaponReview[] {
  return getPostsByCategory('reviews') as WeaponReview[];
}

// Utility functions for pagination
export function paginatePosts(posts: BlogPost[], page: number = 1, limit: number = 10) {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    posts: posts.slice(startIndex, endIndex),
    totalPosts: posts.length,
    totalPages: Math.ceil(posts.length / limit),
    currentPage: page,
    hasNextPage: endIndex < posts.length,
    hasPrevPage: page > 1,
  };
}

// Get unique tags and their counts
export function getAllTags(): { name: string; slug: string; count: number }[] {
  const allPosts = getAllPosts();
  const tagCounts: Record<string, number> = {};

  allPosts.forEach(post => {
    post.tags.forEach(tag => {
      const slug = tag.toLowerCase().replace(/\s+/g, '-');
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

// Get unique categories and their counts
export function getAllCategories(): { name: string; slug: string; count: number }[] {
  const allPosts = getAllPosts();
  const categoryCounts: Record<string, number> = {};

  allPosts.forEach(post => {
    categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
  });

  return Object.entries(categoryCounts)
    .map(([name, count]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      slug: name,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}