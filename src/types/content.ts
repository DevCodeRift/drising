export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: 'builds' | 'guides' | 'news' | 'reviews';
  tags: string[];
  image?: string;
  featured?: boolean;
  readingTime: number;
  excerpt: string;
}

export interface BuildGuide extends BlogPost {
  category: 'builds';
  class: 'hunter' | 'titan' | 'warlock';
  subclass: string;
  gameMode: 'pve' | 'pvp' | 'both';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  season: string;
  weapons: {
    kinetic?: string;
    energy?: string;
    power?: string;
  };
  exoticArmor?: string;
  mods: string[];
}

export interface Guide extends BlogPost {
  category: 'guides';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  prerequisites?: string[];
}

export interface NewsPost extends BlogPost {
  category: 'news';
  urgent?: boolean;
  source?: string;
}

export interface WeaponReview extends BlogPost {
  category: 'reviews';
  weaponName: string;
  weaponType: string;
  rarity: 'legendary' | 'exotic';
  rating: number;
  pros: string[];
  cons: string[];
  bestPerks: string[];
}

export interface Author {
  name: string;
  bio: string;
  avatar: string;
  social: {
    twitter?: string;
    discord?: string;
    youtube?: string;
  };
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  color: string;
}

export interface Tag {
  name: string;
  slug: string;
  count: number;
}