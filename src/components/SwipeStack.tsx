'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NewsCard from './NewsCard';
import { useSwipe } from '@/hooks/useSwipe';
import type { NewsArticle } from '@/types';

interface SwipeStackProps {
  articles: NewsArticle[];
  onSwipe: (article: NewsArticle, direction: 'left' | 'right') => void;
  isLoading?: boolean;
}

export default function SwipeStack({
  articles,
  onSwipe,
  isLoading = false,
}: SwipeStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const handleSwipeEnd = useCallback(
    (direction: 'left' | 'right' | null) => {
      if (!direction || !articles[currentIndex]) return;

      setSwipeDirection(direction);
      onSwipe(articles[currentIndex], direction);

      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setSwipeDirection(null);
      }, 300);
    },
    [currentIndex, articles, onSwipe]
  );

  const { state, handlers } = useSwipe(handleSwipeEnd);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    );
  }

  if (currentIndex >= articles.length) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <div className="text-6xl">🎉</div>
        <p className="text-xl font-semibold text-gray-700">
          ¡Ya viste todas las noticias!
        </p>
        <p className="text-gray-500">Vuelve luego para más contenido</p>
      </div>
    );
  }

  const currentArticle = articles[currentIndex];
  const nextArticle = articles[currentIndex + 1];

  return (
    <div
      className="relative w-full max-w-md mx-auto h-96 perspective"
      {...handlers}
    >
      <AnimatePresence mode="popLayout">
        {nextArticle && (
          <motion.div
            key={`card-${currentIndex + 1}`}
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 0.95, opacity: 0.5, y: 10 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 pointer-events-none"
          >
            <NewsCard article={nextArticle} />
          </motion.div>
        )}

        {currentArticle && (
          <motion.div
            key={`card-${currentIndex}`}
            animate={{
              x: state.x,
              opacity: state.isDragging ? 0.8 : 1,
              rotate: state.x / 20,
            }}
            exit={{
              x: swipeDirection === 'right' ? 500 : -500,
              opacity: 0,
              rotate: swipeDirection === 'right' ? 20 : -20,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0"
          >
            <NewsCard article={currentArticle} />
          </motion.div>
        )}
      </AnimatePresence>

      {state.isDragging && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            backgroundColor:
              state.x > 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          }}
          transition={{ duration: 0.1 }}
        />
      )}
    </div>
  );
}
