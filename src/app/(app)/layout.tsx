'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import { getSession } from '@/services/supabase/auth';

export default function AppLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { session } = await getSession();
      if (!session) {
        router.push('/login');
      }
    };
    checkAuth();
  }, [router]);

  return (
    <main className="pb-24">
      {children}
      <BottomNav />
    </main>
  );
}
