import React from 'react';
import { Bell } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#1E40AF] text-white px-4 py-3 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30 backdrop-blur-sm">
          <span className="text-lg font-bold text-[#F59E0B]">BC</span>
        </div>
        <span className="font-semibold text-sm tracking-wide hidden md:block">Bíblia Cronológica</span>
      </div>

      {/* Notification Icon */}
      <button 
        className="p-2 rounded-full hover:bg-white/10 transition-colors active:scale-95"
        aria-label="Notificações"
      >
        <Bell size={24} strokeWidth={2} />
      </button>
    </header>
  );
};

export default Header;