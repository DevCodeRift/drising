'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

const latestNews = [
  {
    id: 1,
    title: 'Season 23 Meta Changes: What You Need to Know',
    excerpt: 'Major weapon balance updates are coming with the new season. Here\'s how they\'ll affect your favorite builds.',
    category: 'news',
    author: 'MetaAnalyst',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    readingTime: '5 min read',
    tags: ['Meta', 'Season 23', 'Weapon Balance'],
    urgent: true,
    image: '/images/news/season-23-meta.jpg',
  },
  {
    id: 2,
    title: 'New Exotic Weapon Review: Conditional Finality',
    excerpt: 'Is this new Stasis/Solar exotic shotgun worth the grind? Our comprehensive review breaks down everything you need to know.',
    category: 'reviews',
    author: 'WeaponExpert',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    readingTime: '8 min read',
    tags: ['Exotic', 'Shotgun', 'Review'],
    urgent: false,
    image: '/images/news/conditional-finality.jpg',
  },
  {
    id: 3,
    title: 'Root of Nightmares Raid Guide: Complete Walkthrough',
    excerpt: 'Master the mechanics of Destiny 2\'s latest raid with our detailed guide covering every encounter and strategy.',
    category: 'guides',
    author: 'RaidSherpa',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    readingTime: '15 min read',
    tags: ['Raid', 'PvE', 'Guide'],
    urgent: false,
    image: '/images/news/root-nightmares.jpg',
  },
  {
    id: 4,
    title: 'Trials of Osiris Map Rotation: This Week\'s Strategies',
    excerpt: 'Dominate this week\'s Trials map with our tactical breakdown and recommended loadouts for each game mode.',
    category: 'guides',
    author: 'TrialsMaster',
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
    readingTime: '6 min read',
    tags: ['Trials', 'PvP', 'Strategy'],
    urgent: false,
    image: '/images/news/trials-rotation.jpg',
  },
  {
    id: 5,
    title: 'Best Hunter Builds for Grandmaster Nightfalls',
    excerpt: 'Survive the toughest PvE content with these optimized Hunter builds designed for Grandmaster difficulty.',
    category: 'builds',
    author: 'GMExpert',
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    readingTime: '10 min read',
    tags: ['Hunter', 'GM Nightfall', 'PvE'],
    urgent: false,
    image: '/images/news/hunter-gm-builds.jpg',
  },
];

const categoryColors = {
  news: 'bg-red-500/20 text-red-400 border-red-500/30',
  reviews: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  guides: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  builds: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const categoryIcons = {
  news: '📰',
  reviews: '⭐',
  guides: '📖',
  builds: '⚔️',
};

export default function LatestNews() {
  return (
    <div className="space-y-8">
      {/* Featured Article */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <Link
          href={`/posts/${latestNews[0].id}`}
          className="group block mb-8 lg:mb-0"
        >
          <article className="relative h-64 lg:h-96 rounded-xl overflow-hidden bg-destiny-gray-800 hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-t from-destiny-dark via-destiny-dark/60 to-transparent z-10" />

            {latestNews[0].urgent && (
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full animate-pulse">
                  🔥 URGENT
                </span>
              </div>
            )}

            <div className="absolute top-4 right-4 z-20">
              <span className={`px-2 py-1 text-xs font-semibold border rounded-full ${categoryColors[latestNews[0].category]}`}>
                {categoryIcons[latestNews[0].category]} {latestNews[0].category.toUpperCase()}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-destiny-primary transition-colors duration-200">
                {latestNews[0].title}
              </h2>
              <p className="text-destiny-gray-300 mb-4 text-sm lg:text-base">
                {latestNews[0].excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-destiny-gray-400">
                <div className="flex items-center gap-4">
                  <span>By {latestNews[0].author}</span>
                  <span>•</span>
                  <span>{formatDistanceToNow(latestNews[0].publishedAt)} ago</span>
                </div>
                <span>{latestNews[0].readingTime}</span>
              </div>
            </div>
          </article>
        </Link>

        {/* Article List */}
        <div className="space-y-6">
          {latestNews.slice(1, 4).map((article) => (
            <Link
              key={article.id}
              href={`/posts/${article.id}`}
              className="group block"
            >
              <article className="flex gap-4 p-4 rounded-lg hover:bg-destiny-gray-800/50 transition-colors duration-200">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-destiny-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{categoryIcons[article.category]}</span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 text-xs font-semibold border rounded ${categoryColors[article.category]}`}>
                      {article.category.toUpperCase()}
                    </span>
                    <span className="text-xs text-destiny-gray-500">
                      {formatDistanceToNow(article.publishedAt)} ago
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-destiny-primary transition-colors duration-200 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-sm text-destiny-gray-400 line-clamp-2 mb-2">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-destiny-gray-500">
                    <span>By {article.author}</span>
                    <span>{article.readingTime}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {latestNews.slice(4).map((article) => (
          <Link
            key={article.id}
            href={`/posts/${article.id}`}
            className="group block"
          >
            <article className="card hover:border-destiny-primary/50 h-full">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-1 text-xs font-semibold border rounded ${categoryColors[article.category]}`}>
                  {categoryIcons[article.category]} {article.category.toUpperCase()}
                </span>
                <span className="text-xs text-destiny-gray-500">
                  {formatDistanceToNow(article.publishedAt)} ago
                </span>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-destiny-primary transition-colors duration-200">
                {article.title}
              </h3>

              <p className="text-destiny-gray-400 mb-4 flex-1">
                {article.excerpt}
              </p>

              <div className="flex items-center gap-2 mb-4">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-destiny-gray-700 text-destiny-gray-300 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-destiny-gray-500 pt-3 border-t border-destiny-gray-700">
                <span>By {article.author}</span>
                <span>{article.readingTime}</span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <Link
          href="/news"
          className="btn-secondary px-8 py-3 text-lg inline-flex items-center gap-2"
        >
          View All News
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}