import { NextRequest } from 'next/server';
import { dataManager } from '@/lib/data-manager';
import {
  createSuccessResponse,
  createErrorResponse,
  handleApiError,
  validateAndSanitizeSeason,
  requireAuth,
  withCors,
  getCachedData,
  ApiCache
} from '@/lib/api-helpers';

async function handleGET(request: NextRequest) {
  try {
    const currentSeason = await getCachedData('current-season', async () => {
      return dataManager.getCurrentSeason();
    });

    return createSuccessResponse(currentSeason);
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
    const season = await validateAndSanitizeSeason(data);

    await dataManager.updateCurrentSeason(season);
    ApiCache.clear('current-season');

    return createSuccessResponse(season, 'Season updated successfully');
  } catch (error) {
    return handleApiError(error);
  }
}

export const GET = withCors(handleGET);
export const POST = withCors(handlePOST);