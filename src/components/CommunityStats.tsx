'use client';

import { useState, useEffect, useRef } from 'react';

const stats = [
  {
    id: 1,
    name: 'Active Guardians',
    value: 50000,
    suffix: '+',
    description: 'Members in our community',
    icon: '👥',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    id: 2,
    name: 'Builds Created',
    value: 2500,
    suffix: '+',
    description: 'Community-tested builds',
    icon: '⚔️',
    color: 'from-green-500 to-emerald-400',
  },
  {
    id: 3,
    name: 'Guides Published',
    value: 1200,
    suffix: '+',
    description: 'In-depth guides available',
    icon: '📖',
    color: 'from-purple-500 to-pink-400',
  },
  {
    id: 4,
    name: 'Hours Saved',
    value: 100000,
    suffix: '+',
    description: 'Time saved by our community',
    icon: '⏰',
    color: 'from-orange-500 to-red-400',
  },
];

const achievements = [
  {
    title: 'Most Comprehensive Destiny 2 Resource',
    description: 'Recognized by the community as the go-to destination for builds and guides',
    icon: '🏆',
    year: '2024',
  },
  {
    title: 'Top-Rated Content Creators',
    description: 'Our guides consistently receive 4.8+ star ratings from the community',
    icon: '⭐',
    year: '2024',
  },
  {
    title: 'Weekly Meta Updates',
    description: 'First to report on meta changes and seasonal updates',
    icon: '📈',
    year: 'Ongoing',
  },
];

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible]);

  return { count, ref };
}

function StatCard({ stat }: { stat: typeof stats[0] }) {
  const { count, ref } = useCountUp(stat.value);

  return (
    <div ref={ref} className="relative group">
      <div className="card hover:border-destiny-primary/30 text-center h-full">
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <span className="text-2xl">{stat.icon}</span>
        </div>

        {/* Stat */}
        <div className="mb-2">
          <div className="text-3xl md:text-4xl font-bold text-white font-display">
            {count.toLocaleString()}{stat.suffix}
          </div>
          <div className="text-lg font-semibold text-destiny-primary">
            {stat.name}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-destiny-gray-400">
          {stat.description}
        </p>

        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      </div>
    </div>
  );
}

export default function CommunityStats() {
  return (
    <div className="space-y-16">
      {/* Stats Grid */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
            Trusted by the <span className="text-gradient">Community</span>
          </h2>
          <p className="text-lg text-destiny-gray-400 max-w-2xl mx-auto">
            Join thousands of Guardians who rely on our platform for the latest builds,
            strategies, and community-driven content.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="relative">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-display">
            Our <span className="text-gradient">Achievements</span>
          </h3>
          <p className="text-destiny-gray-400 max-w-2xl mx-auto">
            Recognition from the community that drives us to provide the best
            Destiny 2 content and resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="card hover:border-destiny-accent-solar/30 text-center group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {achievement.icon}
              </div>

              <h4 className="text-lg font-semibold text-white mb-2">
                {achievement.title}
              </h4>

              <p className="text-sm text-destiny-gray-400 mb-4">
                {achievement.description}
              </p>

              <div className="inline-flex items-center px-3 py-1 bg-destiny-accent-solar/20 text-destiny-accent-solar text-xs font-semibold rounded-full">
                {achievement.year}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <div className="card bg-destiny-gradient/10 border-destiny-primary/30 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4 font-display">
            Join Our Growing Community
          </h3>
          <p className="text-destiny-gray-400 mb-6">
            Be part of the most active Destiny 2 community. Share builds, get help,
            and stay updated with the latest meta changes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-6 py-3">
              Join Discord
            </button>
            <button className="btn-secondary px-6 py-3">
              Follow on Twitter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}