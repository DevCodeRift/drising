import Link from 'next/link';

const footerNavigation = {
  builds: [
    { name: 'Hunter Builds', href: '/builds/hunter' },
    { name: 'Titan Builds', href: '/builds/titan' },
    { name: 'Warlock Builds', href: '/builds/warlock' },
    { name: 'PvP Builds', href: '/builds/pvp' },
  ],
  guides: [
    { name: 'Beginner Guides', href: '/guides/beginner' },
    { name: 'Advanced Guides', href: '/guides/advanced' },
    { name: 'Weapon Guides', href: '/guides/weapons' },
    { name: 'Armor Guides', href: '/guides/armor' },
  ],
  content: [
    { name: 'Latest News', href: '/news' },
    { name: 'Weapon Reviews', href: '/reviews' },
    { name: 'Season Updates', href: '/news/season' },
    { name: 'Meta Analysis', href: '/guides/meta' },
  ],
  community: [
    { name: 'Discord', href: 'https://discord.gg/destiny' },
    { name: 'Twitter', href: 'https://twitter.com/destinyrising' },
    { name: 'Reddit', href: 'https://reddit.com/r/destinyrising' },
    { name: 'YouTube', href: 'https://youtube.com/destinyrising' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-destiny-gray-900 border-t border-destiny-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-destiny-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl font-display">D</span>
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-white">
                  Destiny Rising
                </h2>
                <p className="text-sm text-destiny-gray-400 -mt-1">
                  Builds & Guides
                </p>
              </div>
            </Link>
            <p className="text-destiny-gray-400 text-base max-w-md">
              The ultimate destination for Destiny 2 builds, guides, and news.
              Stay ahead of the meta with our expert analysis and community-driven content.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-destiny-gray-400 hover:text-destiny-primary transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-destiny-gray-400 hover:text-destiny-primary transition-colors duration-200">
                <span className="sr-only">Discord</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
              <a href="#" className="text-destiny-gray-400 hover:text-destiny-primary transition-colors duration-200">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-destiny-gray-200 tracking-wider uppercase">
                  Builds
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {footerNavigation.builds.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-destiny-gray-400 hover:text-destiny-primary transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-destiny-gray-200 tracking-wider uppercase">
                  Guides
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {footerNavigation.guides.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-destiny-gray-400 hover:text-destiny-primary transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-destiny-gray-200 tracking-wider uppercase">
                  Content
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {footerNavigation.content.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-destiny-gray-400 hover:text-destiny-primary transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-destiny-gray-200 tracking-wider uppercase">
                  Community
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {footerNavigation.community.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base text-destiny-gray-400 hover:text-destiny-primary transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-destiny-gray-800 pt-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <Link href="/privacy" className="text-destiny-gray-400 hover:text-destiny-primary transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-destiny-gray-400 hover:text-destiny-primary transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-destiny-gray-400 hover:text-destiny-primary transition-colors duration-200">
                Contact
              </Link>
            </div>
            <p className="mt-8 text-base text-destiny-gray-400 md:mt-0 md:order-1">
              &copy; {new Date().getFullYear()} Destiny Rising Builds. All rights reserved.
            </p>
          </div>
          <div className="mt-4">
            <p className="text-xs text-destiny-gray-500">
              Destiny Rising Builds is not affiliated with Bungie, Inc. Destiny 2 is a trademark of Bungie, Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}