# Destiny Rising Builds

A high-performance, SEO-optimized website for Destiny 2 builds, guides, and news. Built with Next.js 14, TypeScript, and Tailwind CSS, designed for optimal deployment on Vercel.

## ✨ Features

- **🚀 Performance**: Next.js 14 with App Router, image optimization, and static generation
- **🎯 SEO**: Comprehensive SEO optimization with structured data, sitemaps, and meta tags
- **📱 Responsive**: Mobile-first design with Destiny-themed UI components
- **📝 Content Management**: MDX-based blog system for builds, guides, and news
- **🔍 Search Friendly**: Optimized for "Destiny Rising Builds" and related keywords
- **⚡ Fast Loading**: Optimized for Core Web Vitals and Google rankings

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Destiny theme
- **Content**: MDX for blog posts and guides
- **SEO**: next-seo, structured data, dynamic sitemaps
- **Deployment**: Vercel (optimized configuration)
- **Image Optimization**: Next.js Image component with smart loading

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/destiny-rising-builds.git
   cd destiny-rising-builds
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
destiny-rising-builds/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable React components
│   ├── lib/              # Utility functions and configurations
│   ├── styles/           # Global styles and Tailwind config
│   └── types/            # TypeScript type definitions
├── content/
│   └── posts/            # MDX blog posts and guides
├── public/               # Static assets
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── vercel.json          # Vercel deployment configuration
```

## 📝 Content Management

### Adding New Posts

1. Create a new `.mdx` file in `content/posts/`
2. Add frontmatter with required fields:

```mdx
---
title: 'Your Post Title'
description: 'SEO-optimized description'
publishedAt: '2024-01-15T10:00:00Z'
author: 'Author Name'
category: 'builds' | 'guides' | 'news' | 'reviews'
tags: ['Destiny 2', 'Hunter', 'PvP']
featured: true
image: '/images/posts/your-image.jpg'
---

# Your content here
```

### Content Categories

- **Builds**: Character builds and loadouts
- **Guides**: How-to guides and tutorials
- **News**: Latest Destiny 2 news and updates
- **Reviews**: Weapon and exotic reviews

## 🎨 Customization

### Destiny Theme

The site uses a custom Destiny-inspired color palette:

```css
/* Primary colors */
--destiny-primary: #0066CC;    /* Destiny blue */
--destiny-secondary: #FFD700;  /* Golden */
--destiny-dark: #0A0A0A;       /* Deep black */

/* Energy colors */
--solar: #FFD700;    /* Solar energy */
--void: #9932CC;     /* Void energy */
--arc: #4FB3D9;      /* Arc energy */
--stasis: #4FB3D9;   /* Stasis energy */
--strand: #50C878;   /* Strand energy */
```

### Adding Components

Create new components in `src/components/` and import them in your pages:

```tsx
import YourComponent from '@/components/YourComponent';
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Connect your repository to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your Git repository
   - Vercel will automatically detect Next.js

2. **Configure environment variables**
   Add your environment variables in the Vercel dashboard

3. **Deploy**
   Every push to main will trigger a new deployment

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 📊 SEO Optimization

### Key Features

- **Structured Data**: Automatic JSON-LD for articles and website info
- **Dynamic Sitemaps**: Auto-generated from your content
- **Meta Tags**: Optimized for social sharing and search engines
- **Core Web Vitals**: Optimized for Google's ranking factors
- **Semantic HTML**: Proper heading hierarchy and landmark elements

### SEO Checklist

- ✅ Optimized for "Destiny Rising Builds" keywords
- ✅ Mobile-friendly responsive design
- ✅ Fast loading speeds (< 3s)
- ✅ Proper meta descriptions and titles
- ✅ Image alt tags and optimization
- ✅ Internal linking structure
- ✅ XML sitemap and robots.txt

## 📈 Performance

### Optimization Features

- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Code Splitting**: Automatic route-based splitting
- **Static Generation**: Pre-rendered pages for better performance
- **Font Optimization**: Google Fonts optimization
- **Lazy Loading**: Images and components load as needed

### Core Web Vitals Scores

Target metrics:
- **LCP**: < 2.5 seconds
- **FID**: < 100 milliseconds
- **CLS**: < 0.1

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Production server
npm start

# Type checking
npm run typecheck

# Linting
npm run lint
```

### Adding New Features

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Develop your feature**
   Add components, pages, or functionality

3. **Test thoroughly**
   ```bash
   npm run build
   npm run typecheck
   npm run lint
   ```

4. **Submit pull request**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎮 About Destiny 2

This project is not affiliated with Bungie, Inc. Destiny 2 is a trademark of Bungie, Inc. All game assets and content belong to their respective owners.

## 📞 Support

- **Documentation**: Check this README and inline comments
- **Issues**: Create a GitHub issue
- **Community**: Join our Discord server

---

Built with ❤️ for the Destiny 2 community