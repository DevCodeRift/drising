import { NextRequest } from 'next/server';
import {
  createSuccessResponse,
  handleApiError,
  requireAuth,
  withCors,
  getGameDataSummary
} from '@/lib/api-helpers';

async function handleGET(request: NextRequest) {
  if (!requireAuth(request)) {
    return createSuccessResponse({
      authenticated: false,
      message: 'Authentication required for admin dashboard'
    });
  }

  try {
    const summary = await getGameDataSummary();

    return createSuccessResponse({
      authenticated: true,
      ...summary
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export const GET = withCors(handleGET);