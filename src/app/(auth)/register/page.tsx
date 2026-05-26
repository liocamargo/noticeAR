'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, [router]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="text-5xl">📰</div>
        <h1 className="text-3xl font-bold text-gray-900">NoticeAR</h1>
        <p className="text-gray-600">Redirigiendo...</p>
      </div>
      <div className="flex justify-center">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    </motion.div>
  );
}
