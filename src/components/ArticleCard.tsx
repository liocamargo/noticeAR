'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { NewsArticle } from '@/types';

interface ArticleCardProps {
  article: NewsArticle;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full h-full flex flex-col overflow-auto"
    >
      {article.image && (
        <div className="relative w-full h-48 sm:h-64 flex-shrink-0 bg-gradient-to-br from-gray-800 to-black rounded-2xl overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 py-6 space-y-4">
        <div>
          <p className="text-sm font-medium text-blue-400 mb-2">
            {article.category || article.source}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
            {article.title}
          </h2>
        </div>

        <p className="text-base text-gray-300 leading-relaxed max-h-24 overflow-auto">
          {article.description}
        </p>

        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400 pt-2">
          <span>{article.source}</span>
          <span>{article.pubDate ? new Date(article.pubDate).toLocaleDateString() : ''}</span>
        </div>
      </div>
    </motion.div>
  );
}
