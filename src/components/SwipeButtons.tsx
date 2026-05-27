'use client';

import { motion } from 'framer-motion';
import { X, Star, Heart } from 'lucide-react';

interface SwipeButtonsProps {
  onSkip: () => void;
  onStar: () => void;
  onLike: () => void;
  disabled?: boolean;
}

export default function SwipeButtons({
  onSkip,
  onStar,
  onLike,
  disabled = false,
}: SwipeButtonsProps) {
  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  return (
    <div className="flex gap-6 justify-center items-center mt-8">
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={onSkip}
        disabled={disabled}
        className="w-16 h-16 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition"
      >
        <X size={28} />
      </motion.button>

      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={onStar}
        disabled={disabled}
        className="w-16 h-16 rounded-full bg-yellow-500 text-white shadow-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition"
      >
        <Star size={28} fill="currentColor" />
      </motion.button>

      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={onLike}
        disabled={disabled}
        className="w-16 h-16 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition"
      >
        <Heart size={28} fill="currentColor" />
      </motion.button>
    </div>
  );
}
