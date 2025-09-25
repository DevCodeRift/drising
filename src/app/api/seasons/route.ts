import { NextRequest } from 'next/server';
import { seasonTracker } from '@/lib/season-tracker';
import {
  createSuccessResponse,
  handleApiError,
  withCors,
  getCachedData
} from '@/lib/api-helpers';

async function handleGET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const endpoint = url.searchParams.get('endpoint');

    switch (endpoint) {
      case 'current':
        const currentSeason = await getCachedData('current-season-full', async () => {
          return seasonTracker.getCurrentSeason();
        });
        return createSuccessResponse(currentSeason);

      case 'upcoming':
        const upcomingSeason = await getCachedData('upcoming-season', async () => {
          return seasonTracker.getUpcomingSeason();
        });
        return createSuccessResponse(upcomingSeason);

      case 'history':
        const limit = url.searchParams.get('limit');
        const expansion = url.searchParams.get('expansion');

        const history = await getCachedData(`season-history-${limit || 'all'}-${expansion || 'all'}`, async () => {
          const tracker = await seasonTracker.loadSeasonTracker();
          let seasons = tracker.seasonHistory;

          if (expansion) {
            seasons = await seasonTracker.getSeasonsByExpansion(expansion);
          }

          if (limit) {
            const limitNum = parseInt(limit);
            seasons = seasons.slice(0, limitNum);
          }

          return seasons;
        });

        return createSuccessResponse(history);

      case 'stats':
        const stats = await getCachedData('season-stats', async () => {
          return seasonTracker.getSeasonStats();
        }, 10); // Cache for 10 minutes

        return createSuccessResponse(stats);

      case 'rotations':
        const rotationType = url.searchParams.get('type');

        const rotations = await getCachedData(`rotations-${rotationType || 'all'}`, async () => {
          const tracker = await seasonTracker.loadSeasonTracker();

          if (rotationType === 'weekly') {
            return tracker.weeklyRotations;
          } else if (rotationType === 'daily') {
            return tracker.dailyRotations;
          } else {
            return {
              weekly: tracker.weeklyRotations,
              daily: tracker.dailyRotations
            };
          }
        }, 1); // Cache rotations for 1 minute

        return createSuccessResponse(rotations);

      case 'events':
        const events = await getCachedData('seasonal-events', async () => {
          const tracker = await seasonTracker.loadSeasonTracker();
          return tracker.seasonalEvents;
        }, 30); // Cache events for 30 minutes

        return createSuccessResponse(events);

      default:
        const fullTracker = await getCachedData('full-season-tracker', async () => {
          return seasonTracker.loadSeasonTracker();
        });

        return createSuccessResponse(fullTracker);
    }
  } catch (error) {
    return handleApiError(error);
  }
}

export const GET = withCors(handleGET);