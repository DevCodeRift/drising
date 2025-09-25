import { NextResponse } from 'next/server';
import { dataManager } from './data-manager';
import { DataValidator, ValidationError } from './data-validation';
import { Weapon, Armor, Mod, Artifact, Season } from '@/types/game-data';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export function createSuccessResponse<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    message
  });
}

export function createErrorResponse(error: string, status = 400): NextResponse<ApiResponse> {
  return NextResponse.json({
    success: false,
    error
  }, { status });
}

export async function handleApiError(error: unknown): Promise<NextResponse<ApiResponse>> {
  console.error('API Error:', error);

  if (error instanceof ValidationError) {
    return createErrorResponse(`Validation Error: ${error.message}`, 400);
  }

  if (error instanceof Error) {
    return createErrorResponse(error.message, 500);
  }

  return createErrorResponse('An unexpected error occurred', 500);
}

export async function validateAndSanitizeWeapon(data: any): Promise<Weapon> {
  const weapon = DataValidator.validateWeapon(data);

  return {
    ...weapon,
    name: DataValidator.sanitizeString(weapon.name),
    description: DataValidator.sanitizeString(weapon.description),
    source: DataValidator.sanitizeString(weapon.source),
    id: weapon.id || DataValidator.generateId(weapon.name)
  };
}

export async function validateAndSanitizeMod(data: any): Promise<Mod> {
  const mod = DataValidator.validateMod(data);

  return {
    ...mod,
    name: DataValidator.sanitizeString(mod.name),
    description: DataValidator.sanitizeString(mod.description),
    effect: DataValidator.sanitizeString(mod.effect),
    source: DataValidator.sanitizeString(mod.source),
    id: mod.id || DataValidator.generateId(mod.name)
  };
}

export async function validateAndSanitizeArtifact(data: any): Promise<Artifact> {
  const artifact = DataValidator.validateArtifact(data);

  return {
    ...artifact,
    name: DataValidator.sanitizeString(artifact.name),
    description: DataValidator.sanitizeString(artifact.description),
    id: artifact.id || DataValidator.generateId(artifact.name),
    mods: artifact.mods.map(mod => ({
      ...mod,
      name: DataValidator.sanitizeString(mod.name),
      description: DataValidator.sanitizeString(mod.description),
      effect: DataValidator.sanitizeString(mod.effect),
      id: mod.id || DataValidator.generateId(mod.name)
    }))
  };
}

export async function validateAndSanitizeSeason(data: any): Promise<Season> {
  const season = DataValidator.validateSeason(data);

  return {
    ...season,
    name: DataValidator.sanitizeString(season.name),
    id: season.id || DataValidator.generateId(season.name),
    expansion: season.expansion ? DataValidator.sanitizeString(season.expansion) : season.expansion
  };
}

export class ApiCache {
  private static cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  static get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.timestamp + entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  static set<T>(key: string, data: T, ttlMinutes = 5): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000
    });
  }

  static clear(pattern?: string): void {
    if (pattern) {
      const keys = Array.from(this.cache.keys()).filter(key => key.includes(pattern));
      keys.forEach(key => this.cache.delete(key));
    } else {
      this.cache.clear();
    }
  }

  static invalidateAll(): void {
    this.cache.clear();
  }
}

export async function getCachedData<T>(
  cacheKey: string,
  dataFetcher: () => Promise<T>,
  ttlMinutes = 5
): Promise<T> {
  const cached = ApiCache.get<T>(cacheKey);
  if (cached) {
    return cached;
  }

  const data = await dataFetcher();
  ApiCache.set(cacheKey, data, ttlMinutes);
  return data;
}

export function requireAuth(request: Request): boolean {
  const apiKey = request.headers.get('x-api-key');
  const validApiKey = process.env.ADMIN_API_KEY;

  if (!validApiKey) {
    console.warn('ADMIN_API_KEY not set in environment variables');
    return false;
  }

  return apiKey === validApiKey;
}

export function corsHeaders(request: Request) {
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    'http://localhost:3000',
    'https://destiny-rising-builds.vercel.app',
    process.env.NEXT_PUBLIC_SITE_URL
  ].filter(Boolean);

  return {
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin || '') ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
  };
}

export function withCors(handler: (request: Request) => Promise<NextResponse>) {
  return async (request: Request) => {
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: corsHeaders(request),
      });
    }

    const response = await handler(request);

    Object.entries(corsHeaders(request)).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  };
}

export async function getGameDataSummary() {
  const stats = await dataManager.getDataStats();
  const currentSeason = await dataManager.getCurrentSeason();

  return {
    stats,
    currentSeason: currentSeason ? {
      id: currentSeason.id,
      name: currentSeason.name,
      number: currentSeason.number,
      active: currentSeason.active
    } : null,
    lastUpdated: stats.lastUpdated
  };
}