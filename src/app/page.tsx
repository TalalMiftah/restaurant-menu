import { getRestaurants, getRestaurantImageUrl } from './lib/api';
import Link from 'next/link';

export default async function Home() {
  const restaurants = await getRestaurants();

  return (
    <main className="min-h-screen bg-background dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary dark:text-primary-dark">
          Discover Restaurants
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant) => (
            <Link
              key={restaurant.id}
              href={`/detail/${restaurant.id}`}
              className="group"
            >
              <div className="bg-surface dark:bg-surface-dark rounded-lg shadow-lg overflow-hidden transform transition-transform group-hover:scale-105">
                <div className="relative h-48">
                  <img
                    src={getRestaurantImageUrl(restaurant.pictureId)}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h2 className="text-2xl font-bold text-white">
                      {restaurant.name}
                    </h2>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-text-secondary dark:text-text-secondary-dark">{restaurant.city}</span>
                    <span className="text-accent dark:text-accent-dark font-semibold">
                      ★ {restaurant.rating}
                    </span>
                  </div>
                  <p className="text-text-secondary dark:text-text-secondary-dark line-clamp-2">{restaurant.description}</p>
                  <div className="mt-4 flex justify-end">
                    <span className="text-primary dark:text-primary-dark font-semibold">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
