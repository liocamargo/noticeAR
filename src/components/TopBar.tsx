'use client';

import { Menu, Settings } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-black/95 backdrop-blur-sm border-b border-white/10 px-4 py-3 flex items-center justify-between">
      <button className="p-2 hover:bg-white/10 rounded-full transition">
        <Menu size={24} className="text-white" />
      </button>

      <h1 className="text-white font-semibold">NoticeAR</h1>

      <button className="p-2 hover:bg-white/10 rounded-full transition">
        <Settings size={24} className="text-white" />
      </button>
    </div>
  );
}
