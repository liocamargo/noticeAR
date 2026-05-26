'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/feed', label: 'Swipe', icon: '📰' },
    { href: '/today', label: 'Hoy', icon: '📅' },
    { href: '/favorites', label: 'Favoritos', icon: '⭐' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
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
                className="space-y-1"
              >
                <div className="text-2xl">{item.icon}</div>
                <div className="text-xs font-semibold">{item.label}</div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
