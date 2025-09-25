import Link from 'next/link';
import { format } from 'date-fns';
import { BlogPost } from '@/types/content';

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

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map(post => (
        <Link
          key={post.slug}
          href={`/posts/${post.slug}`}
          className="group block"
        >
          <article className="card hover:border-destiny-primary/50 h-full flex flex-col">
            {/* Category Badge */}
            <div className="mb-3">
              <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold border rounded ${categoryColors[post.category]}`}>
                <span>{categoryIcons[post.category]}</span>
                {post.category.toUpperCase()}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-destiny-primary transition-colors duration-200 flex-1 line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-destiny-gray-400 mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-destiny-gray-700 text-destiny-gray-300 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-destiny-gray-700 text-destiny-gray-300 rounded">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-destiny-gray-500 pt-3 border-t border-destiny-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-destiny-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-medium">
                    {post.author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-3">
                <span>{Math.ceil(post.readingTime)} min</span>
                <time dateTime={post.publishedAt}>
                  {format(new Date(post.publishedAt), 'MMM dd')}
                </time>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}