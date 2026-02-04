import React, { useState } from 'react';
import { Mail, Lock, BookOpen, User, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

const LoginScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login Logic
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        // Sign Up Logic
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        
        if (error) throw error;
        
        alert('Cadastro realizado com sucesso! Se necessário, verifique seu e-mail para confirmar.');
        // Opcional: Alternar para login automaticamente ou esperar o Auth State Change no App.tsx
      }
    } catch (error: any) {
      alert(error.message || 'Ocorreu um erro. Verifique seus dados.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white font-sans">
      {/* Upper Colored Section */}
      <div className="bg-[#1E40AF] pt-12 pb-8 px-6 flex flex-col items-center text-center shrink-0">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm mb-5 border border-white/20 shadow-inner">
           <BookOpen className="text-white" size={32} />
        </div>
        
        <h1 className="text-white text-2xl font-bold tracking-tight mb-1">
          Bíblia Cronológica
        </h1>
        <p className="text-blue-100 text-xs font-medium opacity-90">
          Sua jornada diária pelas escrituras
        </p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white px-6 pt-6 pb-6 flex flex-col">
        
        {/* Toggle Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-200 ${
              isLogin 
                ? 'bg-white text-[#1E40AF] shadow-sm' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            ENTRAR
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-200 ${
              !isLogin 
                ? 'bg-white text-[#1E40AF] shadow-sm' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            CADASTRAR
          </button>
        </div>

        <div className="mb-4 text-center">
            <h2 className="text-lg font-bold text-gray-800">
              {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
            </h2>
            <p className="text-gray-400 text-sm">
              {isLogin ? 'Entre com suas credenciais de acesso.' : 'Preencha os dados para começar.'}
            </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Name Field (Only for Register) */}
          {!isLogin && (
            <div className="space-y-2 animate-fadeIn">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                Nome Completo
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1E40AF] transition-colors">
                  <User size={20} />
                </div>
                <input 
                  type="text" 
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-700 text-sm outline-none focus:border-[#1E40AF] focus:ring-4 focus:ring-[#1E40AF]/10 transition-all placeholder:text-gray-300"
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
              Email
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1E40AF] transition-colors">
                <Mail size={20} />
              </div>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-700 text-sm outline-none focus:border-[#1E40AF] focus:ring-4 focus:ring-[#1E40AF]/10 transition-all placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
              Senha
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1E40AF] transition-colors">
                <Lock size={20} />
              </div>
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={6}
                className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-700 text-sm outline-none focus:border-[#1E40AF] focus:ring-4 focus:ring-[#1E40AF]/10 transition-all placeholder:text-gray-300"
              />
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none group">
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${rememberMe ? 'bg-[#1E40AF] border-[#1E40AF]' : 'bg-white border-gray-300 group-hover:border-gray-400'}`}>
                  {rememberMe && <Check size={12} strokeWidth={3} className="text-white" />}
                </div>
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="hidden"
                />
                <span className="text-xs font-medium text-gray-500 group-hover:text-gray-700">Manter conectado</span>
              </label>
              
              <button type="button" className="text-xs font-bold text-[#1E40AF] hover:underline">
                Esqueci a senha
              </button>
            </div>
          )}

          {/* Action Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#1E40AF] hover:bg-blue-800 text-white font-bold text-sm rounded-xl py-4 mt-2 shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] flex items-center justify-center"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              isLogin ? "Acessar Conta" : "Criar Conta"
            )}
          </button>
          
          <div className="text-center mt-4">
              <p className="text-xs text-gray-400">
                  {isLogin ? 'Ainda não tem conta? ' : 'Já tem uma conta? '}
                  <button 
                    type="button" 
                    onClick={() => setIsLogin(!isLogin)} 
                    className="text-[#1E40AF] font-bold hover:underline"
                  >
                    {isLogin ? 'Cadastre-se' : 'Faça Login'}
                  </button>
              </p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default LoginScreen;