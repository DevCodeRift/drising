import { promises as fs } from 'fs';
import path from 'path';
import { GameData, Season, Weapon, Armor, Mod, Artifact, Subclass, Activity, Vendor } from '@/types/game-data';

const DATA_DIR = path.join(process.cwd(), 'data');
const GAME_DIR = path.join(DATA_DIR, 'game');
const SEASONS_DIR = path.join(DATA_DIR, 'seasons');
const META_DIR = path.join(DATA_DIR, 'meta');

export class DataManager {
  private static instance: DataManager;
  private gameData: GameData | null = null;

  private constructor() {}

  static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  async ensureDirectories(): Promise<void> {
    const dirs = [DATA_DIR, GAME_DIR, SEASONS_DIR, META_DIR];

    for (const dir of dirs) {
      try {
        await fs.access(dir);
      } catch {
        await fs.mkdir(dir, { recursive: true });
      }
    }
  }

  async loadGameData(): Promise<GameData> {
    if (this.gameData) {
      return this.gameData;
    }

    try {
      const [
        seasons,
        weapons,
        armor,
        mods,
        artifacts,
        subclasses,
        activities,
        vendors,
        meta
      ] = await Promise.all([
        this.loadSeasons(),
        this.loadWeapons(),
        this.loadArmor(),
        this.loadMods(),
        this.loadArtifacts(),
        this.loadSubclasses(),
        this.loadActivities(),
        this.loadVendors(),
        this.loadMeta()
      ]);

      this.gameData = {
        seasons,
        weapons,
        armor,
        mods,
        artifacts,
        subclasses,
        activities,
        vendors,
        meta,
        lastUpdated: new Date().toISOString(),
        version: '1.0.0'
      };

      return this.gameData;
    } catch (error) {
      console.error('Failed to load game data:', error);
      throw new Error('Unable to load game data');
    }
  }

  async getCurrentSeason(): Promise<Season | null> {
    try {
      const filePath = path.join(GAME_DIR, 'current-season.json');
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  async updateCurrentSeason(season: Season): Promise<void> {
    await this.ensureDirectories();
    const filePath = path.join(GAME_DIR, 'current-season.json');
    await fs.writeFile(filePath, JSON.stringify(season, null, 2));
    this.gameData = null; // Clear cache
  }

  private async loadSeasons(): Promise<Season[]> {
    try {
      const currentSeason = await this.getCurrentSeason();
      if (currentSeason) {
        return [currentSeason];
      }
      return [];
    } catch {
      return [];
    }
  }

  private async loadJsonFile<T>(fileName: string): Promise<T[]> {
    try {
      const filePath = path.join(GAME_DIR, fileName);
      const data = await fs.readFile(filePath, 'utf-8');
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return [];
    }
  }

  private async saveJsonFile<T>(fileName: string, data: T[]): Promise<void> {
    await this.ensureDirectories();
    const filePath = path.join(GAME_DIR, fileName);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }

  async loadWeapons(): Promise<Weapon[]> {
    return this.loadJsonFile<Weapon>('weapons.json');
  }

  async saveWeapons(weapons: Weapon[]): Promise<void> {
    await this.saveJsonFile('weapons.json', weapons);
    this.gameData = null;
  }

  async addWeapon(weapon: Weapon): Promise<void> {
    const weapons = await this.loadWeapons();
    const existingIndex = weapons.findIndex(w => w.id === weapon.id);

    if (existingIndex >= 0) {
      weapons[existingIndex] = weapon;
    } else {
      weapons.push(weapon);
    }

    await this.saveWeapons(weapons);
  }

  async loadArmor(): Promise<Armor[]> {
    return this.loadJsonFile<Armor>('armor.json');
  }

  async saveArmor(armor: Armor[]): Promise<void> {
    await this.saveJsonFile('armor.json', armor);
    this.gameData = null;
  }

  async addArmor(armorPiece: Armor): Promise<void> {
    const armor = await this.loadArmor();
    const existingIndex = armor.findIndex(a => a.id === armorPiece.id);

    if (existingIndex >= 0) {
      armor[existingIndex] = armorPiece;
    } else {
      armor.push(armorPiece);
    }

    await this.saveArmor(armor);
  }

  async loadMods(): Promise<Mod[]> {
    return this.loadJsonFile<Mod>('mods.json');
  }

  async saveMods(mods: Mod[]): Promise<void> {
    await this.saveJsonFile('mods.json', mods);
    this.gameData = null;
  }

  async addMod(mod: Mod): Promise<void> {
    const mods = await this.loadMods();
    const existingIndex = mods.findIndex(m => m.id === mod.id);

    if (existingIndex >= 0) {
      mods[existingIndex] = mod;
    } else {
      mods.push(mod);
    }

    await this.saveMods(mods);
  }

  async loadArtifacts(): Promise<Artifact[]> {
    return this.loadJsonFile<Artifact>('artifacts.json');
  }

  async saveArtifacts(artifacts: Artifact[]): Promise<void> {
    await this.saveJsonFile('artifacts.json', artifacts);
    this.gameData = null;
  }

  async addArtifact(artifact: Artifact): Promise<void> {
    const artifacts = await this.loadArtifacts();
    const existingIndex = artifacts.findIndex(a => a.id === artifact.id);

    if (existingIndex >= 0) {
      artifacts[existingIndex] = artifact;
    } else {
      artifacts.push(artifact);
    }

    await this.saveArtifacts(artifacts);
  }

  async loadSubclasses(): Promise<Subclass[]> {
    return this.loadJsonFile<Subclass>('subclasses.json');
  }

  async saveSubclasses(subclasses: Subclass[]): Promise<void> {
    await this.saveJsonFile('subclasses.json', subclasses);
    this.gameData = null;
  }

  async loadActivities(): Promise<Activity[]> {
    return this.loadJsonFile<Activity>('activities.json');
  }

  async saveActivities(activities: Activity[]): Promise<void> {
    await this.saveJsonFile('activities.json', activities);
    this.gameData = null;
  }

  async loadVendors(): Promise<Vendor[]> {
    return this.loadJsonFile<Vendor>('vendors.json');
  }

  async saveVendors(vendors: Vendor[]): Promise<void> {
    await this.saveJsonFile('vendors.json', vendors);
    this.gameData = null;
  }

  async loadMeta(): Promise<any[]> {
    return this.loadJsonFile<any>('meta.json');
  }

  async saveMeta(meta: any[]): Promise<void> {
    await this.saveJsonFile('meta.json', meta);
    this.gameData = null;
  }

  async getActiveWeapons(): Promise<Weapon[]> {
    const weapons = await this.loadWeapons();
    return weapons.filter(weapon => weapon.active);
  }

  async getWeaponsByType(type: 'Primary' | 'Special' | 'Heavy'): Promise<Weapon[]> {
    const weapons = await this.loadWeapons();
    return weapons.filter(weapon => weapon.type === type && weapon.active);
  }

  async getWeaponsBySeason(seasonId: string): Promise<Weapon[]> {
    const weapons = await this.loadWeapons();
    return weapons.filter(weapon => weapon.season === seasonId);
  }

  async getModsByType(type: string): Promise<Mod[]> {
    const mods = await this.loadMods();
    return mods.filter(mod => mod.type === type && mod.active);
  }

  async searchContent(query: string): Promise<{
    weapons: Weapon[];
    armor: Armor[];
    mods: Mod[];
    activities: Activity[];
  }> {
    const [weapons, armor, mods, activities] = await Promise.all([
      this.loadWeapons(),
      this.loadArmor(),
      this.loadMods(),
      this.loadActivities()
    ]);

    const lowercaseQuery = query.toLowerCase();

    return {
      weapons: weapons.filter(item =>
        item.name.toLowerCase().includes(lowercaseQuery) ||
        item.description.toLowerCase().includes(lowercaseQuery)
      ),
      armor: armor.filter(item =>
        item.name.toLowerCase().includes(lowercaseQuery) ||
        item.description.toLowerCase().includes(lowercaseQuery)
      ),
      mods: mods.filter(item =>
        item.name.toLowerCase().includes(lowercaseQuery) ||
        item.description.toLowerCase().includes(lowercaseQuery)
      ),
      activities: activities.filter(item =>
        item.name.toLowerCase().includes(lowercaseQuery)
      )
    };
  }

  async getDataStats(): Promise<{
    weapons: number;
    armor: number;
    mods: number;
    artifacts: number;
    activities: number;
    lastUpdated: string;
  }> {
    const [weapons, armor, mods, artifacts, activities] = await Promise.all([
      this.loadWeapons(),
      this.loadArmor(),
      this.loadMods(),
      this.loadArtifacts(),
      this.loadActivities()
    ]);

    return {
      weapons: weapons.length,
      armor: armor.length,
      mods: mods.length,
      artifacts: artifacts.length,
      activities: activities.length,
      lastUpdated: new Date().toISOString()
    };
  }
}

export const dataManager = DataManager.getInstance();