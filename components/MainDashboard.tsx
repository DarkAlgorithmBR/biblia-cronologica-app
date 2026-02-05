import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DashboardCard from './components/DashboardCard';
import BottomNav from './components/BottomNav';
import ProfileView from './components/ProfileView';
import FloatingButton from './components/FloatingButton';

interface MainDashboardProps {
  onNavigate: (view: string) => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <>
      <Header />

      {/* Scrollable Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar relative bg-[#F3F4F6]">
        
        {activeTab === 'home' && (
          <>
            <Hero />
            <div className="p-5 pb-24">
              <h2 className="text-gray-800 font-bold text-lg mb-4 pl-1 border-l-4 border-[#1E40AF]">
                Sua Jornada
              </h2>
              
              {/* Layout simplificado: Coluna única para destaque total */}
              <div className="flex flex-col gap-4">
                <DashboardCard 
                  title="Ordem Cronológica da Bíblia" 
                  // Nova imagem de alta qualidade de uma Bíblia aberta
                  imageUrl="https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=800&auto=format&fit=crop"
                  onClick={() => onNavigate('chronology-pdf')}
                />

                <div className="mt-4 flex flex-col items-center justify-center opacity-50 gap-2">
                   <div className="w-8 h-0.5 bg-gray-300 rounded-full"></div>
                   <p className="text-[10px] text-gray-400 uppercase tracking-widest">Soli Deo Gloria</p>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'reading' && (
           <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500">
              <div className="bg-gray-200 p-4 rounded-full mb-4">
                  <span className="text-2xl">📖</span>
              </div>
              <h3 className="font-bold text-gray-700">Leitura Bíblica</h3>
              <p className="text-sm mt-2">Acesse a Ordem Cronológica no menu Início.</p>
           </div>
        )}

        {activeTab === 'prayers' && (
           <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500">
              <div className="bg-gray-200 p-4 rounded-full mb-4">
                  <span className="text-2xl">🙏</span>
              </div>
              <h3 className="font-bold text-gray-700">Orações</h3>
              <p className="text-sm mt-2">Seu diário de orações estará disponível em breve.</p>
           </div>
        )}

        {activeTab === 'profile' && (
          <ProfileView />
        )}
        
      </main>

      {/* Botão flutuante de IA visível apenas na Home */}
      {activeTab === 'home' && <FloatingButton />}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </>
  );
};

export default MainDashboard;