import { ImageProps } from 'next/image';

// Image optimization utilities

export interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallback?: string;
}

export const IMAGE_DOMAINS = [
  'destiny-rising-builds.vercel.app',
  'images.unsplash.com',
  'cdn.bungie.net', // Official Destiny 2 assets
  'www.bungie.net',
];

export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 200 },
  medium: { width: 600, height: 400 },
  large: { width: 1200, height: 800 },
  hero: { width: 1920, height: 1080 },
  og: { width: 1200, height: 630 },
};

export const IMAGE_QUALITY = {
  low: 50,
  medium: 75,
  high: 90,
  max: 95,
};

// Generate placeholder URLs for development
export function generatePlaceholderImage(
  width: number,
  height: number,
  text?: string,
  background = '1a1a1a',
  foreground = '0066cc'
): string {
  const encodedText = encodeURIComponent(text || `${width}x${height}`);
  return `https://via.placeholder.com/${width}x${height}/${background}/${foreground}?text=${encodedText}`;
}

// Create optimized image props
export function createOptimizedImageProps(
  src: string,
  alt: string,
  size: keyof typeof IMAGE_SIZES,
  priority = false
): OptimizedImageProps {
  const dimensions = IMAGE_SIZES[size];

  return {
    src,
    alt,
    width: dimensions.width,
    height: dimensions.height,
    priority,
    quality: IMAGE_QUALITY.high,
    placeholder: 'blur',
    blurDataURL: generateBlurDataURL(dimensions.width, dimensions.height),
  };
}

// Generate a blur placeholder data URL
export function generateBlurDataURL(width: number, height: number): string {
  // Create a simple gradient blur placeholder
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#2d2d2d;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0066cc;stop-opacity:0.3" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#gradient)" />
    </svg>
  `;

  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

// Destiny-themed placeholder images for development
export const DESTINY_PLACEHOLDERS = {
  builds: {
    hunter: generatePlaceholderImage(600, 400, 'Hunter Build', '1a1a1a', '4fb3d9'),
    titan: generatePlaceholderImage(600, 400, 'Titan Build', '1a1a1a', 'ff6b35'),
    warlock: generatePlaceholderImage(600, 400, 'Warlock Build', '1a1a1a', '9932cc'),
  },
  weapons: {
    kinetic: generatePlaceholderImage(400, 200, 'Kinetic Weapon', '2d2d2d', 'ffffff'),
    energy: generatePlaceholderImage(400, 200, 'Energy Weapon', '2d2d2d', '00ff00'),
    power: generatePlaceholderImage(400, 200, 'Power Weapon', '2d2d2d', 'ff0000'),
  },
  activities: {
    crucible: generatePlaceholderImage(600, 300, 'Crucible', '1a1a1a', 'ff4444'),
    pve: generatePlaceholderImage(600, 300, 'PvE Content', '1a1a1a', '44ff44'),
    raids: generatePlaceholderImage(600, 300, 'Raid Guide', '1a1a1a', 'ffd700'),
  },
  og: {
    default: generatePlaceholderImage(1200, 630, 'Destiny Rising Builds', '0a0a0a', '0066cc'),
    homepage: generatePlaceholderImage(1200, 630, 'Best Destiny 2 Builds', '0a0a0a', '0066cc'),
  }
};

// Image component with error handling and fallbacks
export function getImageWithFallback(src: string, category: keyof typeof DESTINY_PLACEHOLDERS = 'og'): string {
  if (!src || src === '') {
    return DESTINY_PLACEHOLDERS[category].default || DESTINY_PLACEHOLDERS.og.default;
  }

  // If it's already a placeholder or external URL, return as-is
  if (src.startsWith('http') || src.startsWith('data:')) {
    return src;
  }

  // For local images, ensure they exist or provide fallback
  return src;
}

// SEO-optimized image metadata
export interface ImageMetadata {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  credit?: string;
}

export function createImageMetadata(
  src: string,
  alt: string,
  size: keyof typeof IMAGE_SIZES,
  caption?: string,
  credit?: string
): ImageMetadata {
  const dimensions = IMAGE_SIZES[size];

  return {
    src: getImageWithFallback(src),
    alt,
    width: dimensions.width,
    height: dimensions.height,
    caption,
    credit,
  };
}

// Responsive image srcSet generation
export function generateSrcSet(baseSrc: string, sizes: number[]): string {
  return sizes
    .map(size => `${baseSrc}?w=${size} ${size}w`)
    .join(', ');
}

export const RESPONSIVE_SIZES = {
  thumbnail: '(max-width: 768px) 100px, 150px',
  card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  hero: '100vw',
  content: '(max-width: 768px) 100vw, 800px',
};