#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(process.cwd(), 'data');

class DataValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.stats = {
      filesChecked: 0,
      errorsFound: 0,
      warningsFound: 0
    };
  }

  logError(file, message) {
    this.errors.push({ file, message });
    this.stats.errorsFound++;
  }

  logWarning(file, message) {
    this.warnings.push({ file, message });
    this.stats.warningsFound++;
  }

  validateSeasonData(data, filePath) {
    const fileName = path.basename(filePath);

    // Required fields for season data
    const requiredFields = ['id', 'number', 'name', 'startDate', 'active'];

    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null) {
        this.logError(fileName, `Missing required field: ${field}`);
      }
    }

    // Validate season number
    if (typeof data.number !== 'number' || data.number < 1) {
      this.logError(fileName, 'Season number must be a positive number');
    }

    // Validate date format
    if (data.startDate && !this.isValidDate(data.startDate)) {
      this.logError(fileName, 'startDate must be a valid ISO date string');
    }

    if (data.endDate && !this.isValidDate(data.endDate)) {
      this.logError(fileName, 'endDate must be a valid ISO date string');
    }

    // Validate active field
    if (typeof data.active !== 'boolean') {
      this.logError(fileName, 'active field must be boolean');
    }

    // Check for artifact data
    if (data.artifact) {
      this.validateArtifact(data.artifact, fileName);
    }
  }

  validateWeaponData(weapons, filePath) {
    const fileName = path.basename(filePath);

    if (!Array.isArray(weapons)) {
      this.logError(fileName, 'Weapons data must be an array');
      return;
    }

    const validWeaponTypes = ['Primary', 'Special', 'Heavy'];
    const validRarities = ['Common', 'Uncommon', 'Rare', 'Legendary', 'Exotic'];
    const validElements = ['Kinetic', 'Arc', 'Solar', 'Void', 'Stasis', 'Strand'];
    const weaponIds = new Set();

    weapons.forEach((weapon, index) => {
      const context = `weapon[${index}]`;

      // Check for duplicate IDs
      if (weapon.id) {
        if (weaponIds.has(weapon.id)) {
          this.logError(fileName, `${context}: Duplicate weapon ID: ${weapon.id}`);
        }
        weaponIds.add(weapon.id);
      } else {
        this.logError(fileName, `${context}: Missing weapon ID`);
      }

      // Validate required fields
      const requiredFields = ['name', 'type', 'weaponType', 'rarity', 'element', 'description'];
      for (const field of requiredFields) {
        if (!weapon[field]) {
          this.logError(fileName, `${context}: Missing required field: ${field}`);
        }
      }

      // Validate enums
      if (weapon.type && !validWeaponTypes.includes(weapon.type)) {
        this.logError(fileName, `${context}: Invalid weapon type: ${weapon.type}`);
      }

      if (weapon.rarity && !validRarities.includes(weapon.rarity)) {
        this.logError(fileName, `${context}: Invalid rarity: ${weapon.rarity}`);
      }

      if (weapon.element && !validElements.includes(weapon.element)) {
        this.logError(fileName, `${context}: Invalid element: ${weapon.element}`);
      }

      // Validate stats
      if (weapon.stats) {
        Object.entries(weapon.stats).forEach(([stat, value]) => {
          if (typeof value !== 'number' || value < 0 || value > 100) {
            this.logWarning(fileName, `${context}: Stat ${stat} should be between 0-100, got ${value}`);
          }
        });
      }

      // Validate meta information
      if (weapon.meta) {
        const validTiers = ['S', 'A', 'B', 'C', 'D'];
        if (weapon.meta.tier && !validTiers.includes(weapon.meta.tier)) {
          this.logError(fileName, `${context}: Invalid meta tier: ${weapon.meta.tier}`);
        }

        ['pveRating', 'pvpRating'].forEach(rating => {
          if (weapon.meta[rating] !== undefined) {
            if (typeof weapon.meta[rating] !== 'number' || weapon.meta[rating] < 0 || weapon.meta[rating] > 10) {
              this.logError(fileName, `${context}: ${rating} must be between 0-10`);
            }
          }
        });

        if (weapon.meta.popularity !== undefined) {
          if (typeof weapon.meta.popularity !== 'number' || weapon.meta.popularity < 0 || weapon.meta.popularity > 100) {
            this.logError(fileName, `${context}: popularity must be between 0-100`);
          }
        }
      }
    });

    console.log(`✅ Validated ${weapons.length} weapons in ${fileName}`);
  }

  validateModData(mods, filePath) {
    const fileName = path.basename(filePath);

    if (!Array.isArray(mods)) {
      this.logError(fileName, 'Mods data must be an array');
      return;
    }

    const validTypes = ['Weapon', 'Armor', 'Ghost'];
    const validCategories = ['Combat', 'Utility', 'Seasonal', 'Raid', 'General', 'Charged with Light', 'Elemental Well', 'Warmind Cell'];
    const modIds = new Set();

    mods.forEach((mod, index) => {
      const context = `mod[${index}]`;

      // Check for duplicate IDs
      if (mod.id) {
        if (modIds.has(mod.id)) {
          this.logError(fileName, `${context}: Duplicate mod ID: ${mod.id}`);
        }
        modIds.add(mod.id);
      } else {
        this.logError(fileName, `${context}: Missing mod ID`);
      }

      // Validate required fields
      const requiredFields = ['name', 'type', 'category', 'description', 'effect', 'energyCost'];
      for (const field of requiredFields) {
        if (mod[field] === undefined || mod[field] === null) {
          this.logError(fileName, `${context}: Missing required field: ${field}`);
        }
      }

      // Validate enums
      if (mod.type && !validTypes.includes(mod.type)) {
        this.logError(fileName, `${context}: Invalid mod type: ${mod.type}`);
      }

      if (mod.category && !validCategories.includes(mod.category)) {
        this.logError(fileName, `${context}: Invalid mod category: ${mod.category}`);
      }

      // Validate energy cost
      if (typeof mod.energyCost !== 'number' || mod.energyCost < 0 || mod.energyCost > 10) {
        this.logError(fileName, `${context}: energyCost must be between 0-10`);
      }
    });

    console.log(`✅ Validated ${mods.length} mods in ${fileName}`);
  }

  validateArtifact(artifact, fileName) {
    if (!artifact.id || !artifact.name || !artifact.description) {
      this.logError(fileName, 'Artifact missing required fields (id, name, description)');
    }

    if (!Array.isArray(artifact.mods)) {
      this.logError(fileName, 'Artifact mods must be an array');
      return;
    }

    artifact.mods.forEach((mod, index) => {
      const context = `artifact.mods[${index}]`;

      if (!mod.id || !mod.name || !mod.description || !mod.effect) {
        this.logError(fileName, `${context}: Missing required artifact mod fields`);
      }

      if (typeof mod.column !== 'number' || mod.column < 1) {
        this.logError(fileName, `${context}: Invalid column number`);
      }

      if (typeof mod.row !== 'number' || mod.row < 1) {
        this.logError(fileName, `${context}: Invalid row number`);
      }

      if (typeof mod.unlockCost !== 'number' || mod.unlockCost < 0) {
        this.logError(fileName, `${context}: Invalid unlock cost`);
      }
    });
  }

  validateSeasonTracker(tracker, filePath) {
    const fileName = path.basename(filePath);

    // Validate structure
    const requiredFields = ['currentSeason', 'seasonHistory', 'upcomingSeason', 'seasonalEvents', 'metadata'];
    for (const field of requiredFields) {
      if (!tracker[field]) {
        this.logError(fileName, `Missing required field: ${field}`);
      }
    }

    // Validate season history
    if (Array.isArray(tracker.seasonHistory)) {
      tracker.seasonHistory.forEach((season, index) => {
        this.validateSeasonData(season, `${fileName}:seasonHistory[${index}]`);
      });

      // Check that currentSeason exists in history
      const currentExists = tracker.seasonHistory.some(s => s.id === tracker.currentSeason);
      if (!currentExists) {
        this.logError(fileName, `Current season ${tracker.currentSeason} not found in season history`);
      }
    }

    console.log(`✅ Validated season tracker in ${fileName}`);
  }

  async validateJsonFile(filePath) {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      const parsed = JSON.parse(data);
      const fileName = path.basename(filePath);

      // Determine file type and validate accordingly
      if (fileName.includes('season') && fileName.includes('tracker')) {
        this.validateSeasonTracker(parsed, filePath);
      } else if (fileName.includes('season') || fileName === 'current-season.json') {
        this.validateSeasonData(parsed, filePath);
      } else if (fileName.includes('weapon')) {
        this.validateWeaponData(parsed, filePath);
      } else if (fileName.includes('mod')) {
        this.validateModData(parsed, filePath);
      } else {
        // Generic JSON validation
        console.log(`✅ Valid JSON: ${fileName}`);
      }

      this.stats.filesChecked++;

    } catch (error) {
      this.logError(path.basename(filePath), `Invalid JSON: ${error.message}`);
      this.stats.filesChecked++;
    }
  }

  async validateDirectory(dirPath) {
    try {
      const items = await fs.readdir(dirPath);

      for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const stat = await fs.stat(itemPath);

        if (stat.isDirectory() && !item.startsWith('.')) {
          await this.validateDirectory(itemPath);
        } else if (path.extname(item) === '.json') {
          await this.validateJsonFile(itemPath);
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dirPath}:`, error.message);
    }
  }

  isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime()) && dateString.includes('T');
  }

  printReport() {
    console.log('\n📊 VALIDATION REPORT');
    console.log('==================');
    console.log(`Files checked: ${this.stats.filesChecked}`);
    console.log(`Errors found: ${this.stats.errorsFound}`);
    console.log(`Warnings found: ${this.stats.warningsFound}`);

    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS:');
      this.errors.forEach(error => {
        console.log(`  ${error.file}: ${error.message}`);
      });
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warnings.forEach(warning => {
        console.log(`  ${warning.file}: ${warning.message}`);
      });
    }

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('\n✅ All data files are valid!');
    }
  }

  async run() {
    console.log('🔍 Starting data validation...\n');

    try {
      await fs.access(DATA_DIR);
    } catch {
      console.error(`❌ Data directory not found: ${DATA_DIR}`);
      process.exit(1);
    }

    await this.validateDirectory(DATA_DIR);
    this.printReport();

    // Exit with error code if validation failed
    if (this.stats.errorsFound > 0) {
      process.exit(1);
    }
  }
}

// CLI handling
async function main() {
  const args = process.argv.slice(2);
  const help = args.includes('--help') || args.includes('-h');

  if (help) {
    console.log(`
Destiny Rising Data Validator

Usage: node validate-data.js [options]

Options:
  --help, -h     Show this help message

This script validates all JSON files in the data directory to ensure:
- Valid JSON syntax
- Required fields are present
- Data types are correct
- Enum values are valid
- No duplicate IDs exist
`);
    return;
  }

  const validator = new DataValidator();
  await validator.run();
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = DataValidator;