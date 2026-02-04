import React from 'react';
import { Home, BookOpen, Heart, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'reading', icon: BookOpen, label: 'Leitura' },
    { id: 'prayers', icon: Heart, label: 'Orações' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="sticky bottom-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
                isActive ? 'text-[#1E40AF]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="relative">
                <Icon 
                  size={24} 
                  strokeWidth={isActive ? 2.5 : 2} 
                  fill={isActive ? "currentColor" : "none"}
                  className={isActive ? "opacity-20" : ""}
                />
                {/* Overlay stroke icon on top of fill */}
                <div className="absolute top-0 left-0">
                   <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                </div>
              </div>
              
              <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;