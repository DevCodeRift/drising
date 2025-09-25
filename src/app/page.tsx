import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturedBuilds from '@/components/FeaturedBuilds';
import LatestNews from '@/components/LatestNews';
import CommunityStats from '@/components/CommunityStats';
import { getHomepageSchema } from '@/lib/structured-data';

export default function HomePage() {
  const structuredData = getHomepageSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Builds Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
                Featured <span className="text-gradient">Builds</span>
              </h2>
              <p className="text-lg text-destiny-gray-400 max-w-2xl mx-auto">
                Discover the most effective builds for the current season, crafted by our expert community.
              </p>
            </div>
            <FeaturedBuilds />
          </div>
        </section>

        {/* Latest News Section */}
        <section className="py-20 bg-destiny-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
                Latest <span className="text-gradient">News</span>
              </h2>
              <p className="text-lg text-destiny-gray-400 max-w-2xl mx-auto">
                Stay updated with the latest Destiny 2 news, updates, and meta changes.
              </p>
            </div>
            <LatestNews />
          </div>
        </section>

        {/* Community Stats Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CommunityStats />
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-destiny-gradient opacity-10" />
          <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
              Ready to dominate the <span className="text-gradient">Crucible</span>?
            </h2>
            <p className="text-xl text-destiny-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of Guardians who trust Destiny Rising for the best builds,
              guides, and strategies to excel in both PvP and PvE content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-4 text-lg">
                Explore Builds
              </button>
              <button className="btn-secondary px-8 py-4 text-lg">
                Join Community
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}