import { NextRequest } from 'next/server';
import { dataManager } from '@/lib/data-manager';
import {
  createSuccessResponse,
  createErrorResponse,
  handleApiError,
  validateAndSanitizeMod,
  requireAuth,
  withCors,
  getCachedData,
  ApiCache
} from '@/lib/api-helpers';

async function handleGET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    const category = url.searchParams.get('category');
    const active = url.searchParams.get('active');

    const cacheKey = `mods-${type || 'all'}-${category || 'all'}-${active || 'all'}`;

    const mods = await getCachedData(cacheKey, async () => {
      let result = await dataManager.loadMods();

      if (type) {
        result = result.filter(mod => mod.type === type);
      }

      if (category) {
        result = result.filter(mod => mod.category === category);
      }

      if (active !== null && active !== undefined) {
        const isActive = active === 'true';
        result = result.filter(mod => mod.active === isActive);
      }

      return result;
    });

    return createSuccessResponse(mods);
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
    const mod = await validateAndSanitizeMod(data);

    await dataManager.addMod(mod);
    ApiCache.clear('mods');

    return createSuccessResponse(mod, 'Mod added successfully');
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
      return createErrorResponse('Expected an array of mods');
    }

    const validatedMods = await Promise.all(
      data.map(mod => validateAndSanitizeMod(mod))
    );

    await dataManager.saveMods(validatedMods);
    ApiCache.clear('mods');

    return createSuccessResponse(validatedMods, 'Mods updated successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

export const GET = withCors(handleGET);
export const POST = withCors(handlePOST);
export const PUT = withCors(handlePUT);