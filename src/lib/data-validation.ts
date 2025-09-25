import { Season, Weapon, Armor, Mod, Artifact, ArtifactMod } from '@/types/game-data';

export class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(`${field}: ${message}`);
    this.name = 'ValidationError';
  }
}

export class DataValidator {
  static validateSeason(season: any): Season {
    if (!season || typeof season !== 'object') {
      throw new ValidationError('season', 'Must be an object');
    }

    const errors: string[] = [];

    if (!season.id || typeof season.id !== 'string') {
      errors.push('id is required and must be a string');
    }

    if (typeof season.number !== 'number' || season.number < 1) {
      errors.push('number must be a positive number');
    }

    if (!season.name || typeof season.name !== 'string') {
      errors.push('name is required and must be a string');
    }

    if (!season.startDate || !this.isValidDate(season.startDate)) {
      errors.push('startDate is required and must be a valid ISO date string');
    }

    if (season.endDate && !this.isValidDate(season.endDate)) {
      errors.push('endDate must be a valid ISO date string');
    }

    if (typeof season.active !== 'boolean') {
      errors.push('active must be a boolean');
    }

    if (errors.length > 0) {
      throw new ValidationError('season', errors.join(', '));
    }

    return season as Season;
  }

  static validateWeapon(weapon: any): Weapon {
    if (!weapon || typeof weapon !== 'object') {
      throw new ValidationError('weapon', 'Must be an object');
    }

    const errors: string[] = [];

    if (!weapon.id || typeof weapon.id !== 'string') {
      errors.push('id is required and must be a string');
    }

    if (!weapon.name || typeof weapon.name !== 'string') {
      errors.push('name is required and must be a string');
    }

    const validWeaponTypes = ['Primary', 'Special', 'Heavy'];
    if (!validWeaponTypes.includes(weapon.type)) {
      errors.push(`type must be one of: ${validWeaponTypes.join(', ')}`);
    }

    const validWeaponSubTypes = [
      'Hand Cannon', 'Auto Rifle', 'Scout Rifle', 'Pulse Rifle', 'Submachine Gun',
      'Sidearm', 'Bow', 'Sniper Rifle', 'Shotgun', 'Fusion Rifle', 'Linear Fusion Rifle',
      'Trace Rifle', 'Rocket Launcher', 'Grenade Launcher', 'Machine Gun', 'Sword', 'Glaive'
    ];
    if (!validWeaponSubTypes.includes(weapon.weaponType)) {
      errors.push(`weaponType must be one of: ${validWeaponSubTypes.join(', ')}`);
    }

    const validRarities = ['Common', 'Uncommon', 'Rare', 'Legendary', 'Exotic'];
    if (!validRarities.includes(weapon.rarity)) {
      errors.push(`rarity must be one of: ${validRarities.join(', ')}`);
    }

    const validElements = ['Kinetic', 'Arc', 'Solar', 'Void', 'Stasis', 'Strand'];
    if (!validElements.includes(weapon.element)) {
      errors.push(`element must be one of: ${validElements.join(', ')}`);
    }

    if (!weapon.description || typeof weapon.description !== 'string') {
      errors.push('description is required and must be a string');
    }

    if (!weapon.season || typeof weapon.season !== 'string') {
      errors.push('season is required and must be a string');
    }

    if (!weapon.source || typeof weapon.source !== 'string') {
      errors.push('source is required and must be a string');
    }

    if (!weapon.stats || typeof weapon.stats !== 'object') {
      errors.push('stats is required and must be an object');
    }

    if (typeof weapon.active !== 'boolean') {
      errors.push('active must be a boolean');
    }

    if (!weapon.meta || typeof weapon.meta !== 'object') {
      errors.push('meta is required and must be an object');
    } else {
      const validTiers = ['S', 'A', 'B', 'C', 'D'];
      if (!validTiers.includes(weapon.meta.tier)) {
        errors.push(`meta.tier must be one of: ${validTiers.join(', ')}`);
      }

      if (typeof weapon.meta.pveRating !== 'number' || weapon.meta.pveRating < 0 || weapon.meta.pveRating > 10) {
        errors.push('meta.pveRating must be a number between 0 and 10');
      }

      if (typeof weapon.meta.pvpRating !== 'number' || weapon.meta.pvpRating < 0 || weapon.meta.pvpRating > 10) {
        errors.push('meta.pvpRating must be a number between 0 and 10');
      }

      if (typeof weapon.meta.popularity !== 'number' || weapon.meta.popularity < 0 || weapon.meta.popularity > 100) {
        errors.push('meta.popularity must be a number between 0 and 100');
      }
    }

    if (errors.length > 0) {
      throw new ValidationError('weapon', errors.join(', '));
    }

    return weapon as Weapon;
  }

  static validateMod(mod: any): Mod {
    if (!mod || typeof mod !== 'object') {
      throw new ValidationError('mod', 'Must be an object');
    }

    const errors: string[] = [];

    if (!mod.id || typeof mod.id !== 'string') {
      errors.push('id is required and must be a string');
    }

    if (!mod.name || typeof mod.name !== 'string') {
      errors.push('name is required and must be a string');
    }

    const validTypes = ['Weapon', 'Armor', 'Ghost'];
    if (!validTypes.includes(mod.type)) {
      errors.push(`type must be one of: ${validTypes.join(', ')}`);
    }

    const validCategories = [
      'Combat', 'Utility', 'Seasonal', 'Raid', 'General',
      'Charged with Light', 'Elemental Well', 'Warmind Cell'
    ];
    if (!validCategories.includes(mod.category)) {
      errors.push(`category must be one of: ${validCategories.join(', ')}`);
    }

    if (mod.element) {
      const validElements = ['Arc', 'Solar', 'Void', 'Stasis', 'Strand'];
      if (!validElements.includes(mod.element)) {
        errors.push(`element must be one of: ${validElements.join(', ')}`);
      }
    }

    if (!mod.description || typeof mod.description !== 'string') {
      errors.push('description is required and must be a string');
    }

    if (!mod.effect || typeof mod.effect !== 'string') {
      errors.push('effect is required and must be a string');
    }

    if (typeof mod.energyCost !== 'number' || mod.energyCost < 0 || mod.energyCost > 10) {
      errors.push('energyCost must be a number between 0 and 10');
    }

    if (!mod.season || typeof mod.season !== 'string') {
      errors.push('season is required and must be a string');
    }

    if (!mod.source || typeof mod.source !== 'string') {
      errors.push('source is required and must be a string');
    }

    if (typeof mod.active !== 'boolean') {
      errors.push('active must be a boolean');
    }

    if (errors.length > 0) {
      throw new ValidationError('mod', errors.join(', '));
    }

    return mod as Mod;
  }

  static validateArtifact(artifact: any): Artifact {
    if (!artifact || typeof artifact !== 'object') {
      throw new ValidationError('artifact', 'Must be an object');
    }

    const errors: string[] = [];

    if (!artifact.id || typeof artifact.id !== 'string') {
      errors.push('id is required and must be a string');
    }

    if (!artifact.season || typeof artifact.season !== 'string') {
      errors.push('season is required and must be a string');
    }

    if (!artifact.name || typeof artifact.name !== 'string') {
      errors.push('name is required and must be a string');
    }

    if (!artifact.description || typeof artifact.description !== 'string') {
      errors.push('description is required and must be a string');
    }

    if (!Array.isArray(artifact.mods)) {
      errors.push('mods must be an array');
    } else {
      artifact.mods.forEach((mod: any, index: number) => {
        try {
          this.validateArtifactMod(mod);
        } catch (error) {
          if (error instanceof ValidationError) {
            errors.push(`mods[${index}] - ${error.message}`);
          }
        }
      });
    }

    if (typeof artifact.active !== 'boolean') {
      errors.push('active must be a boolean');
    }

    if (errors.length > 0) {
      throw new ValidationError('artifact', errors.join(', '));
    }

    return artifact as Artifact;
  }

  static validateArtifactMod(mod: any): ArtifactMod {
    if (!mod || typeof mod !== 'object') {
      throw new ValidationError('artifactMod', 'Must be an object');
    }

    const errors: string[] = [];

    if (!mod.id || typeof mod.id !== 'string') {
      errors.push('id is required and must be a string');
    }

    if (!mod.name || typeof mod.name !== 'string') {
      errors.push('name is required and must be a string');
    }

    if (typeof mod.column !== 'number' || mod.column < 1) {
      errors.push('column must be a positive number');
    }

    if (typeof mod.row !== 'number' || mod.row < 1) {
      errors.push('row must be a positive number');
    }

    const validTypes = ['Anti-Champion', 'Weapon', 'Armor', 'General'];
    if (!validTypes.includes(mod.type)) {
      errors.push(`type must be one of: ${validTypes.join(', ')}`);
    }

    if (!mod.description || typeof mod.description !== 'string') {
      errors.push('description is required and must be a string');
    }

    if (!mod.effect || typeof mod.effect !== 'string') {
      errors.push('effect is required and must be a string');
    }

    if (typeof mod.unlockCost !== 'number' || mod.unlockCost < 0) {
      errors.push('unlockCost must be a non-negative number');
    }

    if (mod.prerequisites && !Array.isArray(mod.prerequisites)) {
      errors.push('prerequisites must be an array');
    }

    if (errors.length > 0) {
      throw new ValidationError('artifactMod', errors.join(', '));
    }

    return mod as ArtifactMod;
  }

  private static isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime()) && dateString.includes('T');
  }

  static sanitizeString(input: string): string {
    return input.trim().replace(/[<>\"'&]/g, (char) => {
      switch (char) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#x27;';
        case '&': return '&amp;';
        default: return char;
      }
    });
  }

  static generateId(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
}