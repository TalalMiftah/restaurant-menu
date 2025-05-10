import { getRestaurantDetail, getRestaurantImageUrl } from '@/app/lib/api';
import { notFound } from 'next/navigation';

export default async function RestaurantDetail({
  params,
}: {
  params: { id: string };
}) {
  try {
    const restaurant = await getRestaurantDetail(params.id);

    return (
      <main className="min-h-screen bg-background dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-surface dark:bg-surface-dark rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-96">
              <img
                src={getRestaurantImageUrl(restaurant.pictureId, 'large')}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h1 className="text-4xl font-bold text-white">{restaurant.name}</h1>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-text-secondary dark:text-text-secondary-dark">{restaurant.city}</span>
                  <span className="text-accent dark:text-accent-dark font-semibold">
                    ★ {restaurant.rating}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {restaurant.categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 dark:bg-primary-dark/10 text-primary dark:text-primary-dark rounded-full text-sm"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-text-secondary dark:text-text-secondary-dark mb-6">{restaurant.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-primary dark:text-primary-dark">Menu</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-text-primary dark:text-text-primary-dark">Foods</h3>
                      <ul className="list-disc list-inside text-text-secondary dark:text-text-secondary-dark">
                        {restaurant.menus.foods.map((food, index) => (
                          <li key={index}>{food.name}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-text-primary dark:text-text-primary-dark">Drinks</h3>
                      <ul className="list-disc list-inside text-text-secondary dark:text-text-secondary-dark">
                        {restaurant.menus.drinks.map((drink, index) => (
                          <li key={index}>{drink.name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-primary dark:text-primary-dark">Customer Reviews</h2>
                  <div className="space-y-4">
                    {restaurant.customerReviews.map((review, index) => (
                      <div key={index} className="bg-surface dark:bg-surface-dark p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-text-primary dark:text-text-primary-dark">{review.name}</h3>
                          <span className="text-sm text-text-secondary dark:text-text-secondary-dark">{review.date}</span>
                        </div>
                        <p className="text-text-secondary dark:text-text-secondary-dark">{review.review}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    notFound();
  }
} 