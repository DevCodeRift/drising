// Destiny 2 Game Data Types

export interface Season {
  id: string;
  number: number;
  name: string;
  startDate: string;
  endDate?: string;
  active: boolean;
  expansion?: string;
}

export interface Weapon {
  id: string;
  name: string;
  type: 'Primary' | 'Special' | 'Heavy';
  weaponType: 'Hand Cannon' | 'Auto Rifle' | 'Scout Rifle' | 'Pulse Rifle' | 'Submachine Gun' | 'Sidearm' | 'Bow' | 'Sniper Rifle' | 'Shotgun' | 'Fusion Rifle' | 'Linear Fusion Rifle' | 'Trace Rifle' | 'Rocket Launcher' | 'Grenade Launcher' | 'Machine Gun' | 'Sword' | 'Glaive';
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Exotic';
  element: 'Kinetic' | 'Arc' | 'Solar' | 'Void' | 'Stasis' | 'Strand';
  description: string;
  season: string;
  source: string;
  intrinsicPerks?: string[];
  availablePerks?: string[];
  godRollPerks?: {
    pve: string[];
    pvp: string[];
  };
  stats: {
    impact?: number;
    range?: number;
    stability?: number;
    handling?: number;
    reloadSpeed?: number;
    chargeTime?: number;
    drawTime?: number;
    accuracy?: number;
    blastRadius?: number;
    velocity?: number;
    rpm?: number;
  };
  active: boolean;
  meta: {
    tier: 'S' | 'A' | 'B' | 'C' | 'D';
    pveRating: number;
    pvpRating: number;
    popularity: number;
  };
}

export interface Armor {
  id: string;
  name: string;
  type: 'Helmet' | 'Gauntlets' | 'Chest Armor' | 'Leg Armor' | 'Class Item';
  class: 'Hunter' | 'Titan' | 'Warlock' | 'Universal';
  rarity: 'Legendary' | 'Exotic';
  description: string;
  season: string;
  source: string;
  intrinsicPerk?: string;
  exoticPerk?: string;
  stats?: {
    mobility?: number;
    resilience?: number;
    recovery?: number;
    discipline?: number;
    intellect?: number;
    strength?: number;
  };
  active: boolean;
}

export interface Mod {
  id: string;
  name: string;
  type: 'Weapon' | 'Armor' | 'Ghost';
  category: 'Combat' | 'Utility' | 'Seasonal' | 'Raid' | 'General' | 'Charged with Light' | 'Elemental Well' | 'Warmind Cell';
  element?: 'Arc' | 'Solar' | 'Void' | 'Stasis' | 'Strand';
  description: string;
  effect: string;
  energyCost: number;
  season: string;
  source: string;
  active: boolean;
  deprecated?: boolean;
}

export interface Artifact {
  id: string;
  season: string;
  name: string;
  description: string;
  mods: ArtifactMod[];
  active: boolean;
}

export interface ArtifactMod {
  id: string;
  name: string;
  column: number;
  row: number;
  type: 'Anti-Champion' | 'Weapon' | 'Armor' | 'General';
  description: string;
  effect: string;
  unlockCost: number;
  prerequisites?: string[];
}

export interface Subclass {
  id: string;
  name: string;
  class: 'Hunter' | 'Titan' | 'Warlock';
  element: 'Arc' | 'Solar' | 'Void' | 'Stasis' | 'Strand';
  supers: Super[];
  aspects: Aspect[];
  fragments: Fragment[];
  grenades: Grenade[];
  melees: Melee[];
  classAbilities: ClassAbility[];
  active: boolean;
}

export interface Super {
  id: string;
  name: string;
  description: string;
  type: 'Roaming' | 'Shutdown' | 'Support' | 'Damage';
}

export interface Aspect {
  id: string;
  name: string;
  description: string;
  fragmentSlots: number;
}

export interface Fragment {
  id: string;
  name: string;
  description: string;
  element: 'Arc' | 'Solar' | 'Void' | 'Stasis' | 'Strand';
  stats?: {
    mobility?: number;
    resilience?: number;
    recovery?: number;
    discipline?: number;
    intellect?: number;
    strength?: number;
  };
}

export interface Grenade {
  id: string;
  name: string;
  description: string;
  element: 'Arc' | 'Solar' | 'Void' | 'Stasis' | 'Strand';
}

export interface Melee {
  id: string;
  name: string;
  description: string;
  element: 'Arc' | 'Solar' | 'Void' | 'Stasis' | 'Strand';
}

export interface ClassAbility {
  id: string;
  name: string;
  description: string;
  class: 'Hunter' | 'Titan' | 'Warlock';
}

export interface Activity {
  id: string;
  name: string;
  type: 'Raid' | 'Dungeon' | 'Nightfall' | 'Strike' | 'Crucible' | 'Gambit' | 'Lost Sector' | 'Seasonal';
  difficulty: 'Normal' | 'Hero' | 'Legend' | 'Master' | 'Grandmaster';
  rewards: string[];
  season: string;
  active: boolean;
  rotation?: boolean;
  rotationWeeks?: number[];
}

export interface Vendor {
  id: string;
  name: string;
  location: string;
  resetType: 'Daily' | 'Weekly' | 'Never';
  inventory: VendorItem[];
  active: boolean;
}

export interface VendorItem {
  id: string;
  type: 'Weapon' | 'Armor' | 'Mod' | 'Material' | 'Consumable';
  itemId: string;
  cost: {
    currency: string;
    amount: number;
  }[];
  available: boolean;
  resetDate?: string;
}

// Meta and Community Data
export interface BuildMeta {
  season: string;
  class: 'Hunter' | 'Titan' | 'Warlock';
  subclass: string;
  gameMode: 'PvE' | 'PvP' | 'Both';
  tier: 'S' | 'A' | 'B' | 'C' | 'D';
  popularity: number;
  winRate?: number;
  usage: number;
  lastUpdated: string;
}

export interface GameData {
  seasons: Season[];
  weapons: Weapon[];
  armor: Armor[];
  mods: Mod[];
  artifacts: Artifact[];
  subclasses: Subclass[];
  activities: Activity[];
  vendors: Vendor[];
  meta: BuildMeta[];
  lastUpdated: string;
  version: string;
}