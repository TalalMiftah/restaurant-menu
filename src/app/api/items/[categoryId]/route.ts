import { NextResponse } from 'next/server';
import { MenuItem, ApiResponse } from '@/types';
import { getFromCache, setInCache, generateCacheKey } from '../../../lib/redis';
import { getMenuItems } from '../../../lib/mockData';

export async function GET(
  request: Request,
  { params }: { params: { categoryId: string } }
) {
  const startTime = performance.now();
  const cacheKey = generateCacheKey(`items/${params.categoryId}`);

  try {
    // Try to get from cache first
    const cachedItems = await getFromCache<MenuItem[]>(cacheKey);
    if (cachedItems) {
      const endTime = performance.now();
      return NextResponse.json<ApiResponse<MenuItem[]>>({
        data: cachedItems,
        metrics: {
          loadTime: endTime - startTime,
          cacheHit: true,
          responseTime: endTime - startTime,
          timestamp: Date.now(),
        },
      });
    }

    // If not in cache, get from mock data
    const items = getMenuItems(params.categoryId);
    const endTime = performance.now();

    // Store in cache for future requests
    await setInCache(cacheKey, items);

    return NextResponse.json<ApiResponse<MenuItem[]>>({
      data: items,
      metrics: {
        loadTime: endTime - startTime,
        cacheHit: false,
        responseTime: endTime - startTime,
        timestamp: Date.now(),
      },
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<MenuItem[]>>(
      {
        data: [],
        error: error instanceof Error ? error.message : 'An error occurred',
      },
      { status: 500 }
    );
  }
} 