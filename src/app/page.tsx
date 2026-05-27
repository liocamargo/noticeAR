'use client';

export const dynamic = 'force-dynamic';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '@/services/supabase/auth';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      // Verificar sesión de prueba temporal
      const testSession = localStorage.getItem('noticeAR_testSession');
      if (testSession) {
        router.push('/feed');
        return;
      }

      // Verificar sesión de Supabase
      const { session } = await getSession();
      if (session) {
        router.push('/feed');
      } else {
        router.push('/login');
      }
    };
    checkAuth();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin text-4xl">⏳</div>
    </div>
  );
}
