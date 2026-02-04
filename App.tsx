import React, { useState, useEffect } from 'react';
import MainDashboard from './MainDashboard';
import LoginScreen from './components/LoginScreen';
import PdfViewer from './components/PdfViewer';
import { supabase } from './lib/supabase';

// URL Restaurada: Incluindo o ponto 'documents.' que é necessário para este bucket específico
const PDF_URL = "https://oglqubhokihqouytbkzd.supabase.co/storage/v1/object/public/documents./Oraciones-Secretas-de-la-Santa-Cruz-para-la-Prosperidad.pdf";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' | 'chronology-pdf'

  useEffect(() => {
    // Check active session on startup
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setLoading(false);
    });

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