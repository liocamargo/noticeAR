'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/services/supabase/auth';
import { signOut } from '@/services/supabase/auth';
import { LogOut } from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await getCurrentUser();
      if (user?.user_metadata?.full_name) {
        setUserName(user.user_metadata.full_name);
      } else {
        const testSession = localStorage.getItem('noticeAR_testSession');
        if (testSession) {
          const session = JSON.parse(testSession);
          setUserName(session.user?.user_metadata?.full_name || 'Usuario');
        }
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('noticeAR_testSession');
    await signOut();
    router.push('/login');
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg py-4 px-4">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">Bienvenido</p>
          <h1 className="text-2xl font-bold">{userName || 'Usuario'}</h1>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition"
        >
          <LogOut size={20} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
}
