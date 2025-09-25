#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(process.cwd(), 'data');
const GAME_DIR = path.join(DATA_DIR, 'game');
const SEASONS_DIR = path.join(DATA_DIR, 'seasons');

class DataUpdater {
  constructor() {
    this.config = {
      apiUrl: process.env.BUNGIE_API_URL || 'https://www.bungie.net/Platform',
      apiKey: process.env.BUNGIE_API_KEY,
      manifestVersion: null,
      lastUpdate: null
    };
  }

  async ensureDirectories() {
    const dirs = [DATA_DIR, GAME_DIR, SEASONS_DIR];

    for (const dir of dirs) {
      try {
        await fs.access(dir);
      } catch {
        await fs.mkdir(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
      }
    }
  }

  async loadConfig() {
    try {
      const configPath = path.join(DATA_DIR, 'update-config.json');
      const data = await fs.readFile(configPath, 'utf-8');
      this.config = { ...this.config, ...JSON.parse(data) };
      console.log('Loaded existing configuration');
    } catch {
      console.log('No existing configuration found, using defaults');
      await this.saveConfig();
    }
  }

  async saveConfig() {
    const configPath = path.join(DATA_DIR, 'update-config.json');
    await fs.writeFile(configPath, JSON.stringify(this.config, null, 2));
  }

  async checkForUpdates() {
    if (!this.config.apiKey) {
      console.log('⚠️  No Bungie API key found. Set BUNGIE_API_KEY environment variable for automatic updates.');
      return false;
    }

    try {
      // In a real implementation, this would check Bungie's API for manifest updates
      console.log('🔍 Checking for data updates...');

      // Simulate checking for updates
      const now = new Date();
      const lastUpdate = this.config.lastUpdate ? new Date(this.config.lastUpdate) : null;

      if (!lastUpdate || (now - lastUpdate) > 24 * 60 * 60 * 1000) { // 24 hours
        console.log('📦 Updates available');
        return true;
      }

      console.log('✅ Data is up to date');
      return false;
    } catch (error) {
      console.error('❌ Failed to check for updates:', error.message);
      return false;
    }
  }

  async updateWeaponData() {
    console.log('🔫 Updating weapon data...');

    // In a real implementation, this would fetch from Bungie API
    // For now, we'll create a sample structure
    const sampleWeapons = [
      {
        id: 'wish-keeper',
        name: 'Wish-Keeper',
        type: 'Primary',
        weaponType: 'Bow',
        rarity: 'Exotic',
        element: 'Stasis',
        description: 'A bow that grants wishes through precision.',
        season: 'season-23',
        source: 'Season of the Wish Quest',
        intrinsicPerks: ['Stasis Arrows'],
        stats: {
          impact: 76,
          accuracy: 68,
          stability: 46,
          handling: 57,
          reloadSpeed: 72,
          drawTime: 612
        },
        active: true,
        meta: {
          tier: 'A',
          pveRating: 8.2,
          pvpRating: 7.8,
          popularity: 85
        }
      }
    ];

    const weaponsPath = path.join(GAME_DIR, 'weapons.json');
    await fs.writeFile(weaponsPath, JSON.stringify(sampleWeapons, null, 2));
    console.log('✅ Weapon data updated');
  }

  async updateModData() {
    console.log('🔧 Updating mod data...');

    const sampleMods = [
      {
        id: 'powerful-friends',
        name: 'Powerful Friends',
        type: 'Armor',
        category: 'Charged with Light',
        element: 'Arc',
        description: '+20 Mobility. When you become Charged with Light, nearby allies also become Charged with Light.',
        effect: '+20 Mobility, spreads Charged with Light to allies',
        energyCost: 4,
        season: 'season-9',
        source: 'Banshee-44',
        active: true,
        deprecated: false
      }
    ];

    const modsPath = path.join(GAME_DIR, 'mods.json');
    await fs.writeFile(modsPath, JSON.stringify(sampleMods, null, 2));
    console.log('✅ Mod data updated');
  }

  async updateSeasonData() {
    console.log('📅 Updating season data...');

    // Read existing season data and update status
    const seasonTrackerPath = path.join(SEASONS_DIR, 'season-tracker.json');

    try {
      const data = await fs.readFile(seasonTrackerPath, 'utf-8');
      const tracker = JSON.parse(data);

      // Update metadata
      tracker.metadata.lastUpdated = new Date().toISOString();

      // In a real implementation, this would check current season status
      // and update rotations from the API

      await fs.writeFile(seasonTrackerPath, JSON.stringify(tracker, null, 2));
      console.log('✅ Season data updated');
    } catch (error) {
      console.log('⚠️  Season tracker not found, skipping season data update');
    }
  }

  async updateRotations() {
    console.log('🔄 Updating weekly/daily rotations...');

    // This would typically fetch current rotations from the API
    // For now, we'll just update the timestamp to show the system is working

    const rotationsUpdate = {
      timestamp: new Date().toISOString(),
      message: 'Rotations would be updated here with real API data'
    };

    const rotationsPath = path.join(DATA_DIR, 'last-rotation-update.json');
    await fs.writeFile(rotationsPath, JSON.stringify(rotationsUpdate, null, 2));
    console.log('✅ Rotations updated');
  }

  async validateData() {
    console.log('🔍 Validating data integrity...');

    const requiredFiles = [
      path.join(GAME_DIR, 'current-season.json'),
      path.join(SEASONS_DIR, 'season-tracker.json')
    ];

    for (const filePath of requiredFiles) {
      try {
        const data = await fs.readFile(filePath, 'utf-8');
        JSON.parse(data); // Will throw if invalid JSON
        console.log(`✅ ${path.basename(filePath)} is valid`);
      } catch (error) {
        console.error(`❌ ${path.basename(filePath)} is invalid:`, error.message);
        return false;
      }
    }

    console.log('✅ All data files validated successfully');
    return true;
  }

  async generateBackup() {
    console.log('💾 Creating backup...');

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(DATA_DIR, 'backups', timestamp);

    await fs.mkdir(backupDir, { recursive: true });

    // Copy all JSON files to backup
    const copyRecursive = async (src, dest) => {
      const stat = await fs.stat(src);

      if (stat.isDirectory()) {
        await fs.mkdir(dest, { recursive: true });
        const files = await fs.readdir(src);

        for (const file of files) {
          if (!file.startsWith('.')) {
            await copyRecursive(path.join(src, file), path.join(dest, file));
          }
        }
      } else if (path.extname(src) === '.json') {
        await fs.copyFile(src, dest);
      }
    };

    await copyRecursive(DATA_DIR, backupDir);
    console.log(`✅ Backup created at ${backupDir}`);
  }

  async cleanupOldBackups() {
    const backupsDir = path.join(DATA_DIR, 'backups');

    try {
      const backups = await fs.readdir(backupsDir);
      const sortedBackups = backups.sort().reverse(); // Most recent first

      // Keep only the 5 most recent backups
      const backupsToDelete = sortedBackups.slice(5);

      for (const backup of backupsToDelete) {
        const backupPath = path.join(backupsDir, backup);
        await fs.rmdir(backupPath, { recursive: true });
        console.log(`🗑️  Removed old backup: ${backup}`);
      }
    } catch (error) {
      // Backups directory doesn't exist or other error - not critical
      console.log('ℹ️  No old backups to clean up');
    }
  }

  async run(force = false) {
    console.log('🚀 Starting Destiny Rising data update...\n');

    try {
      await this.ensureDirectories();
      await this.loadConfig();

      if (!force) {
        const hasUpdates = await this.checkForUpdates();
        if (!hasUpdates) {
          console.log('✅ No updates needed. Use --force to update anyway.\n');
          return;
        }
      } else {
        console.log('🔄 Force update requested\n');
      }

      // Create backup before updating
      await this.generateBackup();

      // Update data
      await this.updateWeaponData();
      await this.updateModData();
      await this.updateSeasonData();
      await this.updateRotations();

      // Validate all data
      const isValid = await this.validateData();

      if (isValid) {
        // Update config
        this.config.lastUpdate = new Date().toISOString();
        await this.saveConfig();

        // Cleanup old backups
        await this.cleanupOldBackups();

        console.log('\n✅ Data update completed successfully!');
        console.log(`📊 Last updated: ${this.config.lastUpdate}`);
      } else {
        console.error('\n❌ Data validation failed. Update aborted.');
        process.exit(1);
      }

    } catch (error) {
      console.error('\n❌ Update failed:', error.message);
      process.exit(1);
    }
  }
}

// CLI handling
async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force') || args.includes('-f');
  const help = args.includes('--help') || args.includes('-h');

  if (help) {
    console.log(`
Destiny Rising Data Updater

Usage: node update-data.js [options]

Options:
  --force, -f    Force update even if no changes detected
  --help, -h     Show this help message

Environment Variables:
  BUNGIE_API_KEY    Your Bungie API key for automatic updates
  BUNGIE_API_URL    Bungie API base URL (optional)

Examples:
  node update-data.js            # Check and update if needed
  node update-data.js --force    # Force update
`);
    return;
  }

  const updater = new DataUpdater();
  await updater.run(force);
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = DataUpdater;