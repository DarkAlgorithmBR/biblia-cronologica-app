import React from 'react';
import { Sparkles } from 'lucide-react';

const FloatingButton: React.FC = () => {
  return (
    <button 
      className="absolute bottom-20 right-4 z-40 flex items-center justify-center group"
      aria-label="Assistente IA"
      onClick={() => alert("O Assistente IA estará disponível em breve!")}
    >
      <div className="relative hover:scale-110 transition-transform duration-300">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-[#F59E0B] rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
        
        {/* Main Circle */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#1e3a8a] flex items-center justify-center border-2 border-white/20 shadow-xl relative z-10">
           <Sparkles className="text-white" size={24} strokeWidth={2} />
        </div>
        
        {/* Badge "AI" */}
        <div className="absolute -top-1 -right-1 bg-white rounded-full p-[2px] shadow-sm z-20">
            <div className="bg-[#F59E0B] rounded-full px-1.5 py-0.5 flex items-center justify-center">
                <span className="text-[9px] font-bold text-white leading-none">IA</span>
            </div>
        </div>
      </div>
    </button>
  );
};

export default FloatingButton;