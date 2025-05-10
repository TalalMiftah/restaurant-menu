export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  isAvailable: boolean;
  allergens?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  items: MenuItem[];
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  pictureId: string;
  city: string;
  rating: number;
}

export interface RestaurantDetail extends Restaurant {
  address: string;
  categories: {
    name: string;
  }[];
  menus: {
    foods: {
      name: string;
    }[];
    drinks: {
      name: string;
    }[];
  };
  customerReviews: {
    name: string;
    review: string;
    date: string;
  }[];
}

export interface ApiResponse<T> {
  error: boolean;
  message: string;
  restaurants?: T[];
  restaurant?: T;
}

export interface PerformanceMetrics {
  loadTime: number;
  cacheHit: boolean;
  responseTime: number;
  timestamp: number;
} 