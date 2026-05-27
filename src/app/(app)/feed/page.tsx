'use client';

export const dynamic = 'force-dynamic';

import { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import TopBar from '@/components/TopBar';
import ArticleCard from '@/components/ArticleCard';
import ActionBar from '@/components/ActionBar';
import CategoryFilter from '@/components/CategoryFilter';
import { useNews } from '@/hooks/useNews';
import { useInteractions } from '@/hooks/useInteractions';

export default function FeedPage() {
  const { news, isLoading } = useNews();
  const { saveInteraction, markAsSeen } = useInteractions();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentArticle = news[currentIndex] || null;

  const handleSkip = useCallback(() => {
    if (!currentArticle) return;
    markAsSeen(currentArticle.id);
    setCurrentIndex((prev) => prev + 1);
  }, [currentArticle, markAsSeen]);

  const handleLike = useCallback(() => {
    if (!currentArticle) return;
    saveInteraction({ article: currentArticle, isFavorite: false });
    markAsSeen(currentArticle.id);
    setCurrentIndex((prev) => prev + 1);
  }, [currentArticle, saveInteraction, markAsSeen]);

  const handleStar = useCallback(() => {
    if (!currentArticle) return;
    saveInteraction({ article: currentArticle, isFavorite: true });
    markAsSeen(currentArticle.id);
    setCurrentIndex((prev) => prev + 1);
  }, [currentArticle, saveInteraction, markAsSeen]);

  return (
    <div className="h-full flex flex-col">
      <TopBar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Category Filter */}
        <div className="border-b border-white/10 px-4 py-3 flex-shrink-0">
          <CategoryFilter />
        </div>

        {/* Article Display */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-spin text-4xl">✨</div>
            </div>
          ) : currentIndex >= news.length ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4 px-4 text-center">
              <div className="text-6xl">🎉</div>
              <h2 className="text-2xl font-bold">¡Todas vistas!</h2>
              <p className="text-gray-400">Vuelve luego para más noticias</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <div key={currentIndex} className="h-full">
                <ArticleCard article={currentArticle!} />
              </div>
            </AnimatePresence>
          )}
        </div>

        {/* Action Bar */}
        {!isLoading && currentIndex < news.length && (
          <ActionBar
            article={currentArticle}
            onLike={handleLike}
            onSkip={handleSkip}
            onStar={handleStar}
          />
        )}
      </div>
    </div>
  );
}
