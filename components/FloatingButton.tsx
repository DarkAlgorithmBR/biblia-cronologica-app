import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingButton: React.FC = () => {
  return (
    <button 
      className="absolute bottom-20 right-4 z-40 flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300"
      aria-label="Chat de Suporte"
    >
      <div className="relative">
        {/* Avatar Ring */}
        <div className="w-14 h-14 rounded-full bg-[#1E40AF] flex items-center justify-center border-2 border-white overflow-hidden">
           {/* Placeholder Avatar */}
           <img 
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" 
            alt="Suporte Pastoral" 
            className="w-full h-full object-cover"
           />
        </div>
        {/* Badge Icon */}
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
            <div className="bg-[#F59E0B] rounded-full p-1">
                <MessageCircle size={12} className="text-white" fill="white" />
            </div>
        </div>
      </div>
    </button>
  );
};

export default FloatingButton;