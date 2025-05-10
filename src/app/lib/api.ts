import { ApiResponse, Restaurant, RestaurantDetail } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://restaurant-api.dicoding.dev';

export async function getRestaurants(): Promise<Restaurant[]> {
  const response = await fetch(`${API_BASE_URL}/list`);
  const data: ApiResponse<Restaurant> = await response.json();
  
  if (data.error) {
    throw new Error(data.message);
  }
  
  return data.restaurants || [];
}

export async function getRestaurantDetail(id: string): Promise<RestaurantDetail> {
  const response = await fetch(`${API_BASE_URL}/detail/${id}`);
  const data: ApiResponse<RestaurantDetail> = await response.json();
  
  if (data.error) {
    throw new Error(data.message);
  }
  
  if (!data.restaurant) {
    throw new Error('Restaurant not found');
  }
  
  return data.restaurant;
}

export function getRestaurantImageUrl(pictureId: string, size: 'small' | 'medium' | 'large' = 'medium'): string {
  return `${API_BASE_URL}/images/${size}/${pictureId}`;
} 