'use client';

import { useEffect, useRef } from 'react';
import { MenuItem } from '@/types';
import gsap from 'gsap';

interface MenuItemCardProps {
  item: MenuItem;
  index: number;
}

export default function MenuItemCard({ item, index }: MenuItemCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: index * 0.1,
          ease: 'power2.out',
        }
      );
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
    >
      <div className="relative h-48">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-xl font-bold">Not Available</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
          <span className="text-lg font-bold text-primary">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{item.description}</p>
        {item.allergens && item.allergens.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-1">
              Allergens:
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.allergens.map((allergen) => (
                <span
                  key={allergen}
                  className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full"
                >
                  {allergen}
                </span>
              ))}
            </div>
          </div>
        )}
        {item.nutritionalInfo && (
          <div className="grid grid-cols-4 gap-2 text-sm">
            <div className="text-center">
              <span className="block font-semibold text-gray-700">
                {item.nutritionalInfo.calories}
              </span>
              <span className="text-gray-500">Calories</span>
            </div>
            <div className="text-center">
              <span className="block font-semibold text-gray-700">
                {item.nutritionalInfo.protein}g
              </span>
              <span className="text-gray-500">Protein</span>
            </div>
            <div className="text-center">
              <span className="block font-semibold text-gray-700">
                {item.nutritionalInfo.carbs}g
              </span>
              <span className="text-gray-500">Carbs</span>
            </div>
            <div className="text-center">
              <span className="block font-semibold text-gray-700">
                {item.nutritionalInfo.fat}g
              </span>
              <span className="text-gray-500">Fat</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 