import { promises as fs } from 'fs';
import path from 'path';

export interface SeasonalActivity {
  name: string;
  type: 'Seasonal' | 'Raid' | 'Dungeon' | 'Event';
  rewards: string[];
}

export interface SeasonWeapons {
  seasonal: string[];
  raid?: string[];
  dungeon?: string[];
  event?: string[];
}

export interface SeasonMods {
  artifact: string;
  seasonal: string[];
  raid?: string[];
  dungeon?: string[];
}

export interface HistoricalSeason {
  id: string;
  number: number;
  name: string;
  startDate: string;
  endDate: string;
  active: boolean;
  expansion: string;
  activities: SeasonalActivity[];
  weapons: SeasonWeapons;
  mods?: SeasonMods;
}

export interface UpcomingSeason {
  estimatedStart: string;
  number: number;
  expansion: string;
  name?: string;
}

export interface SeasonalEvent {
  name: string;
  type: 'Annual' | 'Special' | 'Holiday';
  estimatedStart: string;
  estimatedEnd: string;
}

export interface WeeklyRotation {
  nightfall: {
    current: string;
    modifiers: string[];
    resetDate: string;
  };
  raid: {
    featured: string;
    challenges: string[];
    resetDate: string;
  };
  dungeon: {
    featured: string;
    modifiers: string[];
    resetDate: string;
  };
}

export interface DailyRotations {
  lostSector: {
    legend: {
      name: string;
      location: string;
      reward: string;
      champions: string[];
      shields: string[];
      modifiers: string[];
    };
    master: {
      name: string;
      location: string;
      reward: string;
      champions: string[];
      shields: string[];
      modifiers: string[];
    };
    resetDate: string;
  };
}

export interface SeasonTracker {
  currentSeason: string;
  seasonHistory: HistoricalSeason[];
  upcomingSeason: UpcomingSeason;
  seasonalEvents: {
    current: SeasonalEvent[];
    upcoming: SeasonalEvent[];
  };
  weeklyRotations: WeeklyRotation;
  dailyRotations: DailyRotations;
  metadata: {
    lastUpdated: string;
    updateFrequency: string;
    sources: string[];
    version: string;
  };
}

const SEASON_TRACKER_PATH = path.join(process.cwd(), 'data', 'seasons', 'season-tracker.json');

export class SeasonTrackingService {
  private static instance: SeasonTrackingService;
  private tracker: SeasonTracker | null = null;

  private constructor() {}

  static getInstance(): SeasonTrackingService {
    if (!SeasonTrackingService.instance) {
      SeasonTrackingService.instance = new SeasonTrackingService();
    }
    return SeasonTrackingService.instance;
  }

  async loadSeasonTracker(): Promise<SeasonTracker> {
    if (this.tracker) {
      return this.tracker;
    }

    try {
      const data = await fs.readFile(SEASON_TRACKER_PATH, 'utf-8');
      this.tracker = JSON.parse(data);
      return this.tracker!;
    } catch (error) {
      console.error('Failed to load season tracker:', error);
      throw new Error('Unable to load season tracking data');
    }
  }

  async saveSeasonTracker(tracker: SeasonTracker): Promise<void> {
    try {
      const dir = path.dirname(SEASON_TRACKER_PATH);
      await fs.mkdir(dir, { recursive: true });

      await fs.writeFile(SEASON_TRACKER_PATH, JSON.stringify(tracker, null, 2));
      this.tracker = tracker;
    } catch (error) {
      console.error('Failed to save season tracker:', error);
      throw new Error('Unable to save season tracking data');
    }
  }

  async getCurrentSeason(): Promise<HistoricalSeason | null> {
    const tracker = await this.loadSeasonTracker();
    return tracker.seasonHistory.find(season => season.id === tracker.currentSeason) || null;
  }

  async updateCurrentSeason(seasonId: string): Promise<void> {
    const tracker = await this.loadSeasonTracker();

    // Deactivate all seasons
    tracker.seasonHistory.forEach(season => {
      season.active = false;
    });

    // Activate the new current season
    const newCurrentSeason = tracker.seasonHistory.find(season => season.id === seasonId);
    if (newCurrentSeason) {
      newCurrentSeason.active = true;
      tracker.currentSeason = seasonId;
      tracker.metadata.lastUpdated = new Date().toISOString();

      await this.saveSeasonTracker(tracker);
    } else {
      throw new Error(`Season with ID ${seasonId} not found`);
    }
  }

  async addSeasonToHistory(season: HistoricalSeason): Promise<void> {
    const tracker = await this.loadSeasonTracker();

    // Check if season already exists
    const existingIndex = tracker.seasonHistory.findIndex(s => s.id === season.id);

    if (existingIndex >= 0) {
      tracker.seasonHistory[existingIndex] = season;
    } else {
      tracker.seasonHistory.unshift(season); // Add to beginning for chronological order
    }

    tracker.metadata.lastUpdated = new Date().toISOString();
    await this.saveSeasonTracker(tracker);
  }

  async updateWeeklyRotations(rotations: Partial<WeeklyRotation>): Promise<void> {
    const tracker = await this.loadSeasonTracker();

    tracker.weeklyRotations = {
      ...tracker.weeklyRotations,
      ...rotations
    };

    tracker.metadata.lastUpdated = new Date().toISOString();
    await this.saveSeasonTracker(tracker);
  }

  async updateDailyRotations(rotations: Partial<DailyRotations>): Promise<void> {
    const tracker = await this.loadSeasonTracker();

    tracker.dailyRotations = {
      ...tracker.dailyRotations,
      ...rotations
    };

    tracker.metadata.lastUpdated = new Date().toISOString();
    await this.saveSeasonTracker(tracker);
  }

  async getSeasonByNumber(seasonNumber: number): Promise<HistoricalSeason | null> {
    const tracker = await this.loadSeasonTracker();
    return tracker.seasonHistory.find(season => season.number === seasonNumber) || null;
  }

  async getSeasonsByExpansion(expansion: string): Promise<HistoricalSeason[]> {
    const tracker = await this.loadSeasonTracker();
    return tracker.seasonHistory.filter(season => season.expansion === expansion);
  }

  async getUpcomingSeason(): Promise<UpcomingSeason> {
    const tracker = await this.loadSeasonTracker();
    return tracker.upcomingSeason;
  }

  async updateUpcomingSeason(season: Partial<UpcomingSeason>): Promise<void> {
    const tracker = await this.loadSeasonTracker();

    tracker.upcomingSeason = {
      ...tracker.upcomingSeason,
      ...season
    };

    tracker.metadata.lastUpdated = new Date().toISOString();
    await this.saveSeasonTracker(tracker);
  }

  async addSeasonalEvent(event: SeasonalEvent, isCurrent = false): Promise<void> {
    const tracker = await this.loadSeasonTracker();

    if (isCurrent) {
      const existingIndex = tracker.seasonalEvents.current.findIndex(e => e.name === event.name);
      if (existingIndex >= 0) {
        tracker.seasonalEvents.current[existingIndex] = event;
      } else {
        tracker.seasonalEvents.current.push(event);
      }
    } else {
      const existingIndex = tracker.seasonalEvents.upcoming.findIndex(e => e.name === event.name);
      if (existingIndex >= 0) {
        tracker.seasonalEvents.upcoming[existingIndex] = event;
      } else {
        tracker.seasonalEvents.upcoming.push(event);
      }
    }

    tracker.metadata.lastUpdated = new Date().toISOString();
    await this.saveSeasonTracker(tracker);
  }

  async getSeasonStats(): Promise<{
    totalSeasons: number;
    currentSeasonNumber: number;
    currentSeasonName: string;
    daysInCurrentSeason: number;
    daysUntilSeasonEnd: number;
    upcomingSeasonNumber: number;
  }> {
    const tracker = await this.loadSeasonTracker();
    const currentSeason = await this.getCurrentSeason();

    if (!currentSeason) {
      throw new Error('No current season found');
    }

    const now = new Date();
    const seasonStart = new Date(currentSeason.startDate);
    const seasonEnd = new Date(currentSeason.endDate);

    const daysInCurrentSeason = Math.floor((now.getTime() - seasonStart.getTime()) / (1000 * 60 * 60 * 24));
    const daysUntilSeasonEnd = Math.floor((seasonEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return {
      totalSeasons: tracker.seasonHistory.length,
      currentSeasonNumber: currentSeason.number,
      currentSeasonName: currentSeason.name,
      daysInCurrentSeason,
      daysUntilSeasonEnd,
      upcomingSeasonNumber: tracker.upcomingSeason.number
    };
  }

  async isRotationOutdated(rotationType: 'daily' | 'weekly'): Promise<boolean> {
    const tracker = await this.loadSeasonTracker();
    const now = new Date();

    if (rotationType === 'daily') {
      const lastReset = new Date(tracker.dailyRotations.lostSector.resetDate);
      const daysSinceReset = Math.floor((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24));
      return daysSinceReset >= 1;
    } else {
      const lastReset = new Date(tracker.weeklyRotations.nightfall.resetDate);
      const daysSinceReset = Math.floor((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24));
      return daysSinceReset >= 7;
    }
  }
}

export const seasonTracker = SeasonTrackingService.getInstance();