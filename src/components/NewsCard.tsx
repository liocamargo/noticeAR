'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { NewsArticle } from '@/types';

interface NewsCardProps {
  article: NewsArticle;
  x?: number;
  opacity?: number;
  scale?: number;
}

export default function NewsCard({
  article,
  x = 0,
  opacity = 1,
  scale = 1,
}: NewsCardProps) {
  return (
    <motion.div
      style={{ x, opacity, scale }}
      className="absolute w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
    >
      <div className="relative w-full h-96 bg-gray-200">
        {article.image ? (
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
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
            <span className="text-4xl">📰</span>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {article.source}
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-700">
            {article.category}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(article.pubDate).toLocaleDateString('es-AR')}
          </span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 line-clamp-3">
          {article.title}
        </h2>

        <p className="text-gray-600 text-sm line-clamp-2">
          {article.description}
        </p>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-sm font-semibold hover:underline"
        >
          Leer más →
        </a>
      </div>
    </motion.div>
  );
}
