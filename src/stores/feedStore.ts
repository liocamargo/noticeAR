import { create } from 'zustand';
import type { Category } from '@/types';

interface FeedState {
  activeCategories: Category[];
  currentIndex: number;
  toggleCategory: (category: Category) => void;
  setCurrentIndex: (index: number) => void;
  resetCategories: () => void;
}

const DEFAULT_CATEGORIES: Category[] = [
  'Política',
  'Economía',
  'Deportes',
  'Cultura',
  'Tecnología',
];

export const useFeedStore = create<FeedState>((set) => ({
  activeCategories: DEFAULT_CATEGORIES,
  currentIndex: 0,

  toggleCategory: (category: Category) =>
    set((state) => ({
      activeCategories: state.activeCategories.includes(category)
        ? state.activeCategories.filter((c) => c !== category)
        : [...state.activeCategories, category],
    })),

  setCurrentIndex: (index: number) =>
    set(() => ({
      currentIndex: index,
    })),

  resetCategories: () =>
    set(() => ({
      activeCategories: DEFAULT_CATEGORIES,
    })),
}));
