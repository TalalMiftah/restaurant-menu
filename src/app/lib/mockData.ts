import { MenuCategory, MenuItem } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://restaurant-api.dicoding.dev';

export const mockCategories: MenuCategory[] = [
  {
    id: 'starters',
    name: 'Starters',
    description: 'Begin your meal with our delicious appetizers',
    image: `${API_BASE_URL}/images/medium/41/1.jpg`,
    items: [
      {
        id: 'bruschetta',
        name: 'Classic Bruschetta',
        description: 'Toasted bread topped with fresh tomatoes, basil, and garlic',
        price: 8.99,
        image: `${API_BASE_URL}/images/medium/41/1.jpg`,
        categoryId: 'starters',
        isAvailable: true,
        allergens: ['gluten'],
        nutritionalInfo: {
          calories: 220,
          protein: 4,
          carbs: 28,
          fat: 10
        }
      },
      {
        id: 'calamari',
        name: 'Crispy Calamari',
        description: 'Lightly fried squid served with marinara sauce',
        price: 12.99,
        image: `${API_BASE_URL}/images/medium/41/2.jpg`,
        categoryId: 'starters',
        isAvailable: true,
        allergens: ['shellfish', 'gluten'],
        nutritionalInfo: {
          calories: 380,
          protein: 18,
          carbs: 32,
          fat: 22
        }
      }
    ]
  },
  {
    id: 'mains',
    name: 'Main Courses',
    description: 'Our signature dishes prepared with the finest ingredients',
    image: `${API_BASE_URL}/images/medium/41/3.jpg`,
    items: [
      {
        id: 'steak',
        name: 'Grilled Ribeye Steak',
        description: 'Premium cut ribeye steak with garlic butter and seasonal vegetables',
        price: 29.99,
        image: `${API_BASE_URL}/images/medium/41/3.jpg`,
        categoryId: 'mains',
        isAvailable: true,
        allergens: [],
        nutritionalInfo: {
          calories: 650,
          protein: 45,
          carbs: 15,
          fat: 48
        }
      },
      {
        id: 'salmon',
        name: 'Pan-Seared Salmon',
        description: 'Fresh Atlantic salmon with lemon butter sauce and asparagus',
        price: 24.99,
        image: `${API_BASE_URL}/images/medium/41/4.jpg`,
        categoryId: 'mains',
        isAvailable: true,
        allergens: ['fish'],
        nutritionalInfo: {
          calories: 420,
          protein: 38,
          carbs: 8,
          fat: 28
        }
      }
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    description: 'Sweet endings to your perfect meal',
    image: `${API_BASE_URL}/images/medium/41/5.jpg`,
    items: [
      {
        id: 'tiramisu',
        name: 'Classic Tiramisu',
        description: 'Layers of coffee-soaked ladyfingers and mascarpone cream',
        price: 7.99,
        image: `${API_BASE_URL}/images/medium/41/5.jpg`,
        categoryId: 'desserts',
        isAvailable: true,
        allergens: ['dairy', 'eggs'],
        nutritionalInfo: {
          calories: 320,
          protein: 6,
          carbs: 35,
          fat: 18
        }
      },
      {
        id: 'cheesecake',
        name: 'New York Cheesecake',
        description: 'Creamy cheesecake with berry compote',
        price: 8.99,
        image: `${API_BASE_URL}/images/medium/41/6.jpg`,
        categoryId: 'desserts',
        isAvailable: true,
        allergens: ['dairy', 'gluten'],
        nutritionalInfo: {
          calories: 380,
          protein: 8,
          carbs: 42,
          fat: 22
        }
      }
    ]
  }
];

export const getMenuItems = (categoryId: string): MenuItem[] => {
  const category = mockCategories.find(cat => cat.id === categoryId);
  return category?.items || [];
};

export const getAllCategories = (): MenuCategory[] => {
  return mockCategories;
}; 