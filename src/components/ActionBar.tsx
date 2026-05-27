'use client';

import { motion } from 'framer-motion';
import { Heart, X, Star, ExternalLink } from 'lucide-react';
import type { NewsArticle } from '@/types';

interface ActionBarProps {
  article: NewsArticle | null;
  onLike: () => void;
  onSkip: () => void;
  onStar: () => void;
  disabled?: boolean;
}

export default function ActionBar({
  article,
  onLike,
  onSkip,
  onStar,
  disabled = false,
}: ActionBarProps) {
  if (!article) return null;

  const buttons = [
    {
      icon: X,
      label: 'Descartar',
      onClick: onSkip,
      color: 'bg-red-500/20 hover:bg-red-500/30 text-red-400',
    },
    {
      icon: Heart,
      label: 'Guardar',
      onClick: onLike,
      color: 'bg-green-500/20 hover:bg-green-500/30 text-green-400',
    },
    {
      icon: Star,
      label: 'Favorito',
      onClick: onStar,
      color: 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400',
    },
    {
      icon: ExternalLink,
      label: 'Leer',
      onClick: () => window.open(article.url, '_blank'),
      color: 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400',
    },
  ];

  return (
    <div className="bg-gradient-to-t from-black via-black/80 to-transparent px-4 py-4 space-y-4 flex-shrink-0">
      <div className="flex gap-2 justify-center flex-wrap">
        {buttons.map((btn) => {
          const Icon = btn.icon;
          return (
            <motion.button
              key={btn.label}
              whileTap={{ scale: 0.95 }}
              onClick={btn.onClick}
              disabled={disabled}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${btn.color} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium hidden sm:inline">
                {btn.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
