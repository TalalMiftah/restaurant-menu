import { NextResponse } from 'next/server';
import { MenuCategory, ApiResponse } from '@/types';
import { getFromCache, setInCache, generateCacheKey } from '../../lib/redis';
import { getAllCategories } from '../../lib/mockData';

export async function GET() {
  const startTime = performance.now();
  const cacheKey = generateCacheKey('categories');

  try {
    // 1. Try to get categories from cache (Redis or in-memory)
    const cachedCategories = await getFromCache<MenuCategory[]>(cacheKey);
    if (cachedCategories) {
      const endTime = performance.now();
      // 2. If found in cache, return cached data with cacheHit=true
      return NextResponse.json<ApiResponse<MenuCategory[]>>({
        data: cachedCategories.slice(0, 20),
        metrics: {
          loadTime: endTime - startTime,
          cacheHit: true,
          responseTime: endTime - startTime,
          timestamp: Date.now(),
        },
      });
    }

    // 3. If not in cache, fetch from data source (mock data)
    const categories = getAllCategories();
    const endTime = performance.now();

    // 4. Store the fresh data in cache for future requests
    await setInCache(cacheKey, categories);

    // 5. Return the fresh data with cacheHit=false
    return NextResponse.json<ApiResponse<MenuCategory[]>>({
      data: categories.slice(0, 20),
      metrics: {
        loadTime: endTime - startTime,
        cacheHit: false,
        responseTime: endTime - startTime,
        timestamp: Date.now(),
      },
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<MenuCategory[]>>(
      {
        data: [],
        error: error instanceof Error ? error.message : 'An error occurred',
      },
      { status: 500 }
    );
  }
} 