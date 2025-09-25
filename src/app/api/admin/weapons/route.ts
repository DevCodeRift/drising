import { NextRequest } from 'next/server';
import { dataManager } from '@/lib/data-manager';
import {
  createSuccessResponse,
  createErrorResponse,
  handleApiError,
  validateAndSanitizeWeapon,
  requireAuth,
  withCors,
  getCachedData,
  ApiCache
} from '@/lib/api-helpers';

async function handleGET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    const season = url.searchParams.get('season');
    const active = url.searchParams.get('active');

    const cacheKey = `weapons-${type || 'all'}-${season || 'all'}-${active || 'all'}`;

    const weapons = await getCachedData(cacheKey, async () => {
      let result = await dataManager.loadWeapons();

      if (type) {
        result = result.filter(weapon => weapon.type === type);
      }

      if (season) {
        result = result.filter(weapon => weapon.season === season);
      }

      if (active !== null && active !== undefined) {
        const isActive = active === 'true';
        result = result.filter(weapon => weapon.active === isActive);
      }

      return result;
    });

    return createSuccessResponse(weapons);
  } catch (error) {
    return handleApiError(error);
  }
}

async function handlePOST(request: NextRequest) {
  if (!requireAuth(request)) {
    return createErrorResponse('Unauthorized', 401);
  }

  try {
    const data = await request.json();
    const weapon = await validateAndSanitizeWeapon(data);

    await dataManager.addWeapon(weapon);
    ApiCache.clear('weapons');

    return createSuccessResponse(weapon, 'Weapon added successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

async function handlePUT(request: NextRequest) {
  if (!requireAuth(request)) {
    return createErrorResponse('Unauthorized', 401);
  }

  try {
    const data = await request.json();

    if (!Array.isArray(data)) {
      return createErrorResponse('Expected an array of weapons');
    }

    const validatedWeapons = await Promise.all(
      data.map(weapon => validateAndSanitizeWeapon(weapon))
    );

    await dataManager.saveWeapons(validatedWeapons);
    ApiCache.clear('weapons');

    return createSuccessResponse(validatedWeapons, 'Weapons updated successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

export const GET = withCors(handleGET);
export const POST = withCors(handlePOST);
export const PUT = withCors(handlePUT);