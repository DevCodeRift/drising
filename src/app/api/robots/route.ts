import { NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://destiny-rising-builds.vercel.app';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml

# Crawl-delay for polite crawling
Crawl-delay: 1

# Disallow admin areas and API routes
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /dashboard/

# Allow crawling of static assets
Allow: /images/
Allow: /icons/
Allow: /_next/static/`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}