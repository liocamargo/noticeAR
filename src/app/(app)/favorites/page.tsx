'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import Image from 'next/image';
import { useInteractions } from '@/hooks/useInteractions';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useInteractions();

  const favoritesByCategory = useMemo(() => {
    const grouped: Record<string, typeof favorites> = {};
    favorites.forEach((fav) => {
      const category = fav.article_data.category || 'Sin categoría';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(fav);
    });
    return grouped;
  }, [favorites]);

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 space-y-4">
        <div className="text-6xl">⭐</div>
        <h1 className="text-2xl font-bold text-gray-900">Sin favoritos</h1>
        <p className="text-gray-600">Guarda noticias marcándolas con ★</p>
        <Link
          href="/feed"
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
        >
          Ir al Feed
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Favoritos</h1>
        <p className="text-gray-600">{favorites.length} noticias guardadas</p>
      </div>

      <div className="space-y-8 pb-20">
        {Object.entries(favoritesByCategory).map(([category, articles], categoryIndex) => (
          <motion.section
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg mb-4 shadow-md">
              <h2 className="text-lg font-bold">{category}</h2>
              <p className="text-sm text-blue-100">{articles.length} noticia{articles.length !== 1 ? 's' : ''}</p>
            </div>

            <div className="space-y-3">
              {articles.map((interaction, index) => (
                <motion.article
                  key={interaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: categoryIndex * 0.1 + index * 0.05 }}
                  className="bg-white rounded-lg shadow p-4 hover:shadow-md transition space-y-3"
                >
                  {interaction.article_data.image && (
                    <div className="relative w-full h-32 bg-gray-200 rounded">
                      <Image
                        src={interaction.article_data.image}
                        alt={interaction.article_data.title}
                        fill
                        className="object-cover rounded"
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          img.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-blue-600">
                        {interaction.article_data.source}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-gray-900 line-clamp-2">
                      {interaction.article_data.title}
                    </h2>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {interaction.article_data.description}
                    </p>

                    <div className="flex gap-2 pt-3">
                      <a
                        href={interaction.article_data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center py-2 bg-blue-500 text-white rounded font-semibold text-sm hover:bg-blue-600"
                      >
                        Leer
                      </a>

                      <button
                        onClick={() =>
                          toggleFavorite({
                            articleId: interaction.article_id,
                            isFavorite: false,
                          })
                        }
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded font-semibold text-sm hover:bg-gray-400"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
