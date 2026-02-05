import React, { useState, useEffect } from 'react';
import MainDashboard from './MainDashboard';
import LoginScreen from './components/LoginScreen';
import PdfViewer from './components/PdfViewer';
import { supabase } from './lib/supabase';

// URL Atualizada: Novo arquivo "Jornada Sagrada - A Bíblia Cronológica em 52 Semanas"
const PDF_URL = "https://oglqubhokihqouytbkzd.supabase.co/storage/v1/object/public/documents./Jornada-Sagrada-A-Biblia-Cronologica-em-52-Semanas.pdf";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Modificado: Inicializa o estado lendo do localStorage para lembrar onde o usuário parou
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('bc_last_view') || 'dashboard';
  });

  // Efeito para salvar a tela atual sempre que ela mudar
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('bc_last_view', currentView);
    }
  }, [currentView, isAuthenticated]);

  useEffect(() => {
    // Check active session on startup
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error("Erro ao verificar sessão:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for changes on auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const renderContent = () => {
    if (!isAuthenticated) {
      return <LoginScreen />;
    }

    switch (currentView) {
      case 'chronology-pdf':
        return (
          <PdfViewer 
            url={PDF_URL} 
            title="Ordem Cronológica" 
            onBack={() => setCurrentView('dashboard')} 
          />
        );
      case 'dashboard':
      default:
        return <MainDashboard onNavigate={setCurrentView} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-10 h-10 border-4 border-[#1E40AF] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-0 md:py-8 bg-gray-100">
      {/* Mobile Device Simulator Container */}
      <div className="w-full max-w-[430px] bg-white min-h-screen md:h-[850px] md:min-h-0 md:rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col border-[8px] border-gray-900 md:border-gray-800 ring-1 ring-gray-900/5">
        
        {renderContent()}
        
        {/* iOS Home Indicator Simulator for styling */}
        <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 rounded-full z-50 md:block hidden pointer-events-none ${isAuthenticated ? 'bg-black/20' : 'bg-gray-300'}`}></div>
      </div>
    </div>
  );
};

export default App;