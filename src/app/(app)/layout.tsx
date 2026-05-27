'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import { getSession } from '@/services/supabase/auth';

export default function AppLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const testSession = localStorage.getItem('noticeAR_testSession');
      if (testSession) {
        return;
      }

      const { session } = await getSession();
      if (!session) {
        router.push('/login');
      }
    };
    checkAuth();
  }, [router]);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-black text-white">
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
