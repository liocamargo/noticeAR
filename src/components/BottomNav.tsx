'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, Newspaper, Bookmark } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/favorites', label: 'Favoritos', icon: Heart },
    { href: '/feed', label: 'Noticias', icon: Newspaper },
    { href: '/reading-list', label: 'Por leer', icon: Bookmark },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl">
      <div className="flex justify-around items-center max-w-2xl mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 py-4 text-center transition-colors ${
                isActive
                  ? 'text-blue-500 border-t-2 border-blue-500'
                  : 'text-gray-600 hover:text-blue-400'
              }`}
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center gap-1"
              >
                <Icon size={24} />
                <div className="text-xs font-semibold">{item.label}</div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
