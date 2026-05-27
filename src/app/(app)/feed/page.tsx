'use client';

export const dynamic = 'force-dynamic';

import { useCallback } from 'react';
import SwipeStack from '@/components/SwipeStack';
import SwipeButtons from '@/components/SwipeButtons';
import CategoryFilter from '@/components/CategoryFilter';
import Header from '@/components/Header';
import { useNews } from '@/hooks/useNews';
import { useInteractions } from '@/hooks/useInteractions';
import type { NewsArticle } from '@/types';

export default function FeedPage() {
  const { news, isLoading } = useNews();
  const { saveInteraction, markAsSeen } = useInteractions();

  const handleSwipe = useCallback(
    (article: NewsArticle, direction: 'left' | 'right') => {
      markAsSeen(article.id);

      if (direction === 'right') {
        saveInteraction({ article, isFavorite: false });
      }
    },
    [saveInteraction, markAsSeen]
  );

  const handleLike = useCallback(() => {
    if (news.length === 0) return;
    const firstArticle = news[0];
    handleSwipe(firstArticle, 'right');
  }, [news, handleSwipe]);

  const handleSkip = useCallback(() => {
    if (news.length === 0) return;
    const firstArticle = news[0];
    handleSwipe(firstArticle, 'left');
  }, [news, handleSwipe]);

  const handleStar = useCallback(() => {
    if (news.length === 0) return;
    const firstArticle = news[0];
    saveInteraction({ article: firstArticle, isFavorite: true });
    markAsSeen(firstArticle.id);
  }, [news, saveInteraction, markAsSeen]);

  return (
    <div className="h-full flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col overflow-hidden px-4 py-4">
        <div className="w-full">
          <CategoryFilter />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center mt-4">
          <SwipeStack
            articles={news}
            onSwipe={handleSwipe}
            isLoading={isLoading}
          />

          {!isLoading && news.length > 0 && (
            <div className="-mt-16 relative z-10">
              <SwipeButtons
                onSkip={handleSkip}
                onStar={handleStar}
                onLike={handleLike}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
