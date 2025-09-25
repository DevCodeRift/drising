import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://destiny-rising-builds.vercel.app';

interface SitemapUrl {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), 'content/posts');

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter(name => name.endsWith('.mdx') || name.endsWith('.md'))
    .map(name => {
      const slug = name.replace(/\.(mdx|md)$/, '');
      const fullPath = path.join(postsDirectory, name);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      const stats = fs.statSync(fullPath);

      return {
        slug,
        lastmod: data.updatedAt || data.publishedAt || stats.mtime.toISOString(),
      };
    });

  return posts;
}

function generateSitemapXml(urls: SitemapUrl[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ url, lastmod, changefreq, priority }) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`;
}

export async function GET() {
  try {
    const posts = getAllPosts();

    const staticPages: SitemapUrl[] = [
      {
        url: SITE_URL,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 1.0,
      },
      {
        url: `${SITE_URL}/builds`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/guides`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/news`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/about`,
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.5,
      },
    ];

    const postPages: SitemapUrl[] = posts.map(post => ({
      url: `${SITE_URL}/posts/${post.slug}`,
      lastmod: post.lastmod,
      changefreq: 'weekly',
      priority: 0.7,
    }));

    const allUrls = [...staticPages, ...postPages];
    const sitemap = generateSitemapXml(allUrls);

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}