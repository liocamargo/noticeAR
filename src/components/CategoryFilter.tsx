'use client';

import { useFeedStore } from '@/stores/feedStore';
import type { Category } from '@/types';

const CATEGORIES: Category[] = [
  'Política',
  'Economía',
  'Deportes',
  'Cultura',
  'Tecnología',
];

export default function CategoryFilter() {
  const { activeCategories, toggleCategory } = useFeedStore();

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => toggleCategory(category)}
          className={`px-4 py-2 rounded-full font-medium transition-all ${
            activeCategories.includes(category)
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
