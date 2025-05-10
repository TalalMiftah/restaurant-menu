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
    // 1. Try to get items from cache (Redis or in-memory)
    const cachedItems = await getFromCache<MenuItem[]>(cacheKey);
    if (cachedItems) {
      const endTime = performance.now();
      // 2. If found in cache, return cached data with cacheHit=true
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

    // 3. If not in cache, fetch from data source (mock data)
    const items = getMenuItems(params.categoryId);
    const endTime = performance.now();

    // 4. Store the fresh data in cache for future requests
    await setInCache(cacheKey, items);

    // 5. Return the fresh data with cacheHit=false
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