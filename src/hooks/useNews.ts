'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useFeedStore } from '@/stores/feedStore';
import type { NewsArticle } from '@/types';

export function useNews() {
  const { activeCategories } = useFeedStore();

  const { data: news = [], isLoading, error } = useQuery<NewsArticle[]>({
    queryKey: ['news'],
    queryFn: async () => {
      const response = await fetch('/api/news');
      if (!response.ok) throw new Error('Failed to fetch news');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  const filteredNews = useMemo(() => {
    if (activeCategories.length === 0) return news;
    return news.filter((article) => activeCategories.includes(article.category));
  }, [news, activeCategories]);

  return {
    news: filteredNews,
    allNews: news,
    isLoading,
    error,
  };
}
