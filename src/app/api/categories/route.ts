import { NextResponse } from 'next/server';
import { MenuCategory, ApiResponse } from '@/types';
import { getFromCache, setInCache, generateCacheKey } from '../../lib/redis';
import { getAllCategories } from '../../lib/mockData';

export async function GET() {
  const startTime = performance.now();
  const cacheKey = generateCacheKey('categories');

  try {
    // Try to get from cache first
    const cachedCategories = await getFromCache<MenuCategory[]>(cacheKey);
    if (cachedCategories) {
      const endTime = performance.now();
      return NextResponse.json<ApiResponse<MenuCategory[]>>({
        data: cachedCategories,
        metrics: {
          loadTime: endTime - startTime,
          cacheHit: true,
          responseTime: endTime - startTime,
          timestamp: Date.now(),
        },
      });
    }

    // If not in cache, get from mock data
    const categories = getAllCategories();
    const endTime = performance.now();

    // Store in cache for future requests
    await setInCache(cacheKey, categories);

    return NextResponse.json<ApiResponse<MenuCategory[]>>({
      data: categories,
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