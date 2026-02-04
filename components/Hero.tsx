import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-48 bg-gray-900 overflow-hidden shrink-0">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=800&auto=format&fit=crop" 
          alt="Céu com nuvens e luz" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E40AF]/90 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wider mb-2 drop-shadow-lg font-serif">
          BÍBLIA CRONOLÓGICA
        </h1>
        <p className="text-white/90 text-sm max-w-[90%] font-medium">
          Sua jornada diária através das escrituras sagradas.
        </p>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shadow-sm"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-white/40 shadow-sm"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-white/40 shadow-sm"></div>
      </div>
    </section>
  );
};

export default Hero;