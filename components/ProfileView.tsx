import React, { useEffect, useState } from 'react';
import { LogOut, User, Mail, Shield, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const ProfileView: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>('');
  const [userName, setUserName] = useState<string | null>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || '');
        setUserName(user.user_metadata?.full_name || 'Viajante');
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // O App.tsx vai detectar a mudança de estado e redirecionar para o Login automaticamente
    } catch (error: any) {
      alert('Erro ao sair: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F3F4F6]">
      {/* Profile Header */}
      <div className="bg-white p-6 pb-8 rounded-b-[2rem] shadow-sm flex flex-col items-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-4 border-white shadow-md mb-4 relative">
          <User size={40} className="text-gray-400" />
          <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-800">{userName || 'Usuário'}</h2>
        <p className="text-gray-500 text-sm font-medium">{userEmail}</p>

        <div className="mt-4 px-4 py-1.5 bg-[#1E40AF]/10 text-[#1E40AF] rounded-full text-xs font-bold tracking-wide">
          MEMBRO PREMIUM
        </div>
      </div>

      {/* Settings List */}
      <div className="p-5 flex-1 flex flex-col gap-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Geral</h3>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          
          <button className="w-full p-4 flex items-center justify-between border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <Mail size={18} />
              </div>
              <span className="text-sm font-medium text-gray-700">Alterar Email</span>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </button>

          <button className="w-full p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                <Shield size={18} />
              </div>
              <span className="text-sm font-medium text-gray-700">Termos de Uso</span>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </button>
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          disabled={loading}
          className="mt-auto w-full bg-white border border-red-100 text-red-500 font-semibold text-sm rounded-xl py-4 shadow-sm hover:bg-red-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
             <span className="w-5 h-5 border-2 border-red-200 border-t-red-500 rounded-full animate-spin" />
          ) : (
            <>
              <LogOut size={18} />
              <span>Sair da Conta</span>
            </>
          )}
        </button>
        
        <p className="text-center text-[10px] text-gray-400 pb-2">Versão 1.0.2 Premium</p>
      </div>
    </div>
  );
};

export default ProfileView;