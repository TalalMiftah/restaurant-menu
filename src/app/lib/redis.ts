import Redis from 'ioredis';

// Initialize Redis client with fallback to in-memory cache in development
let redis: Redis | null = null;

// Only attempt Redis connection in production
if (process.env.NODE_ENV === 'production') {
  try {
    redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
  } catch (error) {
    console.warn('Redis connection failed, running in fallback mode:', error);
  }
} else {
  // In development, use in-memory cache for simplicity
  console.log('Development mode: Using in-memory cache');
}

// Cache TTL in seconds (1 hour)
const CACHE_TTL = 3600;

// In-memory cache fallback (used in development or if Redis is unavailable)
const memoryCache = new Map<string, { data: any; expiry: number }>();

/**
 * Try to get data from Redis or in-memory cache.
 * Returns null if not found or expired.
 */
export async function getFromCache<T>(key: string): Promise<T | null> {
  try {
    if (redis) {
      const cachedData = await redis.get(key);
      return cachedData ? JSON.parse(cachedData) : null;
    } else {
      // Fallback to memory cache
      const cached = memoryCache.get(key);
      if (cached && cached.expiry > Date.now()) {
        return cached.data;
      }
      return null;
    }
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

/**
 * Store data in Redis or in-memory cache with TTL.
 */
export async function setInCache<T>(key: string, data: T): Promise<void> {
  try {
    if (redis) {
      await redis.setex(key, CACHE_TTL, JSON.stringify(data));
    } else {
      // Fallback to memory cache
      memoryCache.set(key, {
        data,
        expiry: Date.now() + CACHE_TTL * 1000,
      });
    }
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

/**
 * Invalidate (delete) a cache entry from Redis or in-memory cache.
 */
export async function invalidateCache(key: string): Promise<void> {
  try {
    if (redis) {
      await redis.del(key);
    } else {
      memoryCache.delete(key);
    }
  } catch (error) {
    console.error('Cache delete error:', error);
  }
}

/**
 * Generate a consistent cache key for API endpoints and parameters.
 */
export function generateCacheKey(endpoint: string, params?: Record<string, string>): string {
  const baseKey = `menu:${endpoint}`;
  if (!params) return baseKey;
  
  const sortedParams = Object.entries(params)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}:${value}`)
    .join(':');
    
  return `${baseKey}:${sortedParams}`;
}

export default redis; 