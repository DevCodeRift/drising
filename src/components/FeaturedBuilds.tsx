'use client';

import Link from 'next/link';
import Image from 'next/image';

const featuredBuilds = [
  {
    id: 1,
    title: 'Immortal Titan - PvP Domination',
    description: 'Unstoppable Solar Titan build for Crucible and Trials. Maximum survivability with consistent ability uptime.',
    class: 'titan',
    subclass: 'solar',
    gameMode: 'pvp',
    difficulty: 'intermediate',
    rating: 4.9,
    views: '15.2K',
    image: '/images/builds/immortal-titan.jpg',
    tags: ['PvP', 'Solar', 'Survivability', 'Trials'],
    author: {
      name: 'GuardianPro',
      avatar: '/images/avatars/guardian-pro.jpg',
    },
    weapons: {
      kinetic: 'Ace of Spades',
      energy: 'Mindbenders Ambition',
      power: 'Gjallarhorn',
    },
    exoticArmor: 'Loreley Splendor Helm',
  },
  {
    id: 2,
    title: 'Void Hunter - Endless Invisibility',
    description: 'Master of stealth and precision. Perfect for solo content and high-level PvE activities.',
    class: 'hunter',
    subclass: 'void',
    gameMode: 'pve',
    difficulty: 'advanced',
    rating: 4.8,
    views: '22.1K',
    image: '/images/builds/void-hunter.jpg',
    tags: ['PvE', 'Void', 'Invisibility', 'Solo'],
    author: {
      name: 'ShadowRunner',
      avatar: '/images/avatars/shadow-runner.jpg',
    },
    weapons: {
      kinetic: 'Arbalest',
      energy: 'Funnelweb',
      power: 'Falling Guillotine',
    },
    exoticArmor: 'Graviton Forfeit',
  },
  {
    id: 3,
    title: 'Arc Warlock - Lightning Storm',
    description: 'Chain lightning through entire armies. Incredible add-clear potential for raids and dungeons.',
    class: 'warlock',
    subclass: 'arc',
    gameMode: 'pve',
    difficulty: 'beginner',
    rating: 4.7,
    views: '18.7K',
    image: '/images/builds/arc-warlock.jpg',
    tags: ['PvE', 'Arc', 'Add-clear', 'Raids'],
    author: {
      name: 'StormCaller',
      avatar: '/images/avatars/storm-caller.jpg',
    },
    weapons: {
      kinetic: 'Trinity Ghoul',
      energy: 'Riskrunner',
      power: 'Thunderlord',
    },
    exoticArmor: 'Crown of Tempests',
  },
];

const classColors: Record<string, string> = {
  hunter: 'from-blue-500 to-cyan-400',
  titan: 'from-orange-500 to-red-400',
  warlock: 'from-purple-500 to-pink-400',
};

const subclassIcons: Record<string, string> = {
  solar: '☀️',
  void: '🌑',
  arc: '⚡',
  stasis: '❄️',
  strand: '🕸️',
};

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function FeaturedBuilds() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredBuilds.map((build) => (
        <Link
          key={build.id}
          href={`/builds/${build.id}`}
          className="group block"
        >
          <article className="card hover:border-destiny-primary/50 transition-all duration-300 group-hover:scale-[1.02] h-full flex flex-col">
            {/* Build Image */}
            <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-destiny-gray-700">
              <div className={`absolute inset-0 bg-gradient-to-br ${classColors[build.class]} opacity-20`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl opacity-50">{subclassIcons[build.subclass]}</span>
              </div>

              {/* Build Tags */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs font-semibold bg-destiny-gray-900/80 backdrop-blur-sm text-white rounded-full">
                  {build.class.charAt(0).toUpperCase() + build.class.slice(1)}
                </span>
                <span className="px-2 py-1 text-xs font-semibold bg-destiny-primary/80 backdrop-blur-sm text-white rounded-full">
                  {build.gameMode.toUpperCase()}
                </span>
              </div>

              {/* Difficulty */}
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 text-xs font-semibold border rounded-full ${difficultyColors[build.difficulty]}`}>
                  {build.difficulty.charAt(0).toUpperCase() + build.difficulty.slice(1)}
                </span>
              </div>

              {/* Rating */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-destiny-gray-900/80 backdrop-blur-sm px-2 py-1 rounded-full">
                <svg className="w-4 h-4 text-destiny-accent-solar" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs text-white font-medium">{build.rating}</span>
              </div>
            </div>

            {/* Build Content */}
            <div className="flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-destiny-primary transition-colors duration-200">
                {build.title}
              </h3>

              <p className="text-destiny-gray-400 mb-4 flex-1 text-sm leading-relaxed">
                {build.description}
              </p>

              {/* Weapons */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-destiny-gray-300 mb-2">Weapons</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-destiny-gray-500">Kinetic:</span>
                    <span className="text-destiny-gray-300">{build.weapons.kinetic}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-destiny-gray-500">Energy:</span>
                    <span className="text-destiny-gray-300">{build.weapons.energy}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-destiny-gray-500">Power:</span>
                    <span className="text-destiny-gray-300">{build.weapons.power}</span>
                  </div>
                </div>
              </div>

              {/* Exotic Armor */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-destiny-gray-300 mb-1">Exotic Armor</h4>
                <span className="text-xs text-destiny-accent-solar font-medium">{build.exoticArmor}</span>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {build.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-destiny-gray-700 text-destiny-gray-300 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-destiny-gray-500 pt-3 border-t border-destiny-gray-700">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-destiny-gray-600 rounded-full flex items-center justify-center text-[10px]">
                    {build.author.name.charAt(0)}
                  </span>
                  <span>{build.author.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{build.views}</span>
                </div>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}