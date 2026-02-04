import React from 'react';
import { Lock } from 'lucide-react';
import { DashboardCardProps } from '../types';

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  imageUrl, 
  isLocked = false, 
  lockMessage, 
  onClick 
}) => {
  return (
    <div 
      onClick={!isLocked ? onClick : undefined}
      className={`
        relative overflow-hidden rounded-2xl shadow-md aspect-square flex flex-col group
        transition-all duration-300
        ${!isLocked ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1 bg-white' : 'cursor-default bg-gray-100'}
      `}
    >
      {/* Card Image */}
      <div className="h-2/3 w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className={`w-full h-full object-cover transition-transform duration-500 ${!isLocked && 'group-hover:scale-105'}`}
        />
      </div>

      {/* Card Title */}
      <div className="h-1/3 w-full flex items-center justify-center bg-white p-2">
        <span className="font-semibold text-gray-800 text-center text-sm md:text-base leading-tight">
          {title}
        </span>
      </div>

      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex flex-col items-center justify-center p-3 text-center z-10">
          <div className="bg-white/20 p-2 rounded-full mb-2 backdrop-blur-md">
            <Lock className="text-white" size={24} />
          </div>
          {lockMessage && (
            <p className="text-white text-[10px] leading-tight font-medium opacity-90">
              {lockMessage}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardCard;