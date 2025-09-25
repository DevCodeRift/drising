import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextSeo } from 'next-seo';
import { format } from 'date-fns';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/content';
import { getBlogPostSEO, getStructuredData } from '@/lib/seo';
import RelatedPosts from '@/components/RelatedPosts';
import ShareButtons from '@/components/ShareButtons';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const seoData = getBlogPostSEO(
    {
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
      category: post.category,
      author: post.author,
      image: post.image,
    },
    post.slug
  );

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      ...seoData.openGraph,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  };
}

const categoryColors: Record<string, string> = {
  builds: 'bg-green-500/20 text-green-400 border-green-500/30',
  guides: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  news: 'bg-red-500/20 text-red-400 border-red-500/30',
  reviews: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const categoryIcons: Record<string, string> = {
  builds: '⚔️',
  guides: '📖',
  news: '📰',
  reviews: '⭐',
};

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const seoData = getBlogPostSEO(
    {
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
      category: post.category,
      author: post.author,
      image: post.image,
    },
    post.slug
  );

  const structuredData = getStructuredData('article', {
    ...post,
    slug: params.slug,
  });

  const relatedPosts = getRelatedPosts(post);

  return (
    <>
      <NextSeo {...seoData} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <Header />

      <main className="min-h-screen pt-24">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article Header */}
          <header className="mb-12">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm">
              <ol className="flex items-center space-x-2 text-destiny-gray-400">
                <li>
                  <a href="/" className="hover:text-destiny-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li>
                  <a
                    href={`/${post.category}`}
                    className="hover:text-destiny-primary transition-colors capitalize"
                  >
                    {post.category}
                  </a>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li className="text-destiny-gray-500">
                  {post.title}
                </li>
              </ol>
            </nav>

            {/* Category Badge */}
            <div className="mb-4">
              <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold border rounded-full ${categoryColors[post.category]}`}>
                <span>{categoryIcons[post.category]}</span>
                {post.category.toUpperCase()}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-destiny-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-destiny-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {post.author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span>By {post.author}</span>
              </div>

              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={post.publishedAt}>
                  {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
                </time>
              </div>

              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{Math.ceil(post.readingTime)} min read</span>
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <a
                      key={tag}
                      href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      className="px-3 py-1 bg-destiny-gray-800 hover:bg-destiny-primary/20 text-destiny-gray-300 hover:text-destiny-primary rounded-full text-sm transition-colors duration-200"
                    >
                      #{tag}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <ShareButtons
              title={post.title}
              url={`/posts/${post.slug}`}
              className="mb-8"
            />
          </header>

          {/* Article Content */}
          <div className="lg:grid lg:grid-cols-1 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-1">
              <div className="prose prose-lg max-w-none">
                <div
                  className="content-area"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* Updated Date */}
              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <div className="mt-8 p-4 bg-destiny-gray-800/50 rounded-lg">
                  <p className="text-sm text-destiny-gray-400">
                    <span className="font-medium">Last updated:</span>{' '}
                    <time dateTime={post.updatedAt}>
                      {format(new Date(post.updatedAt), 'MMM dd, yyyy')}
                    </time>
                  </p>
                </div>
              )}

              {/* Author Bio */}
              <div className="mt-12 p-6 bg-destiny-gray-800/30 rounded-lg border border-destiny-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-destiny-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {post.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      About {post.author}
                    </h3>
                    <p className="text-destiny-gray-400 mb-4">
                      Expert Destiny 2 content creator and community contributor.
                      Specializing in {post.category} and helping Guardians excel in both PvP and PvE.
                    </p>
                    <div className="flex gap-4 text-sm">
                      <a
                        href="#"
                        className="text-destiny-primary hover:text-destiny-accent-solar transition-colors"
                      >
                        View Profile
                      </a>
                      <a
                        href="#"
                        className="text-destiny-primary hover:text-destiny-accent-solar transition-colors"
                      >
                        More Posts
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 py-12 bg-destiny-gray-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 font-display text-center">
                Related <span className="text-gradient">Posts</span>
              </h2>
              <RelatedPosts posts={relatedPosts} />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}