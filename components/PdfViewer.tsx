import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, FileText, Download, Bookmark } from 'lucide-react';

interface PdfViewerProps {
  url: string;
  title: string;
  onBack: () => void;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ url, title, onBack }) => {
  const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  
  // Estado para o marcador de página
  const [bookmark, setBookmark] = useState(() => {
    return localStorage.getItem('bc_pdf_bookmark') || '';
  });

  // Salva o marcador sempre que o usuário digita
  useEffect(() => {
    localStorage.setItem('bc_pdf_bookmark', bookmark);
  }, [bookmark]);

  return (
    <div className="flex flex-col h-full w-full bg-white absolute inset-0 z-50">
      {/* Header com botão voltar */}
      <div className="bg-[#1E40AF] text-white px-4 py-3 flex items-center justify-between shadow-md shrink-0 relative z-30">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Voltar"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="font-semibold text-base tracking-wide truncate max-w-[200px]">{title}</h2>
        </div>
        
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2 text-xs font-medium"
        >
          <span className="hidden sm:inline">Abrir</span>
          <ExternalLink size={16} />
        </a>
      </div>

      {/* Barra de Marcador de Página */}
      <div className="bg-yellow-50 border-b border-yellow-100 px-4 py-2 flex items-center gap-2 shrink-0 z-20">
        <Bookmark size={16} className="text-[#F59E0B]" fill="#F59E0B" />
        <span className="text-xs font-bold text-yellow-800 uppercase tracking-wide whitespace-nowrap">Onde parei:</span>
        <input 
          type="text" 
          value={bookmark}
          onChange={(e) => setBookmark(e.target.value)}
          placeholder="Ex: Dia 5, Página 10..."
          className="flex-1 bg-transparent border-b border-yellow-300 text-sm text-gray-700 focus:outline-none focus:border-yellow-600 placeholder:text-yellow-600/40 px-1"
        />
      </div>

      {/* Container Principal */}
      <div className="flex-1 w-full h-full relative bg-gray-100 flex flex-col overflow-hidden">
        
        {/* Camada de Fundo (Feedback Visual) - Fica atrás do iframe */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-0 p-6 text-center text-gray-400">
            <div className="animate-pulse flex flex-col items-center gap-4">
               <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                 <FileText size={32} className="text-gray-400" />
               </div>
               <div>
                 <h3 className="font-bold text-gray-500 mb-1">Carregando visualização...</h3>
                 <p className="text-xs max-w-[200px]">Se o documento não aparecer, utilize o botão abaixo.</p>
               </div>
            </div>
        </div>

        {/* Iframe do Google Viewer - Fica por cima do fundo */}
        <iframe 
          src={viewerUrl}
          className="w-full h-full border-none relative z-10"
          title="Leitor PDF"
          allowFullScreen
          style={{ backgroundColor: 'transparent' }} 
        />

        {/* Botão Flutuante Principal - Fica POR CIMA de tudo (z-20) para garantir o clique */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20 pointer-events-none">
           <a 
             href={url}
             target="_blank"
             rel="noopener noreferrer"
             className="flex items-center gap-2 bg-[#1E40AF] text-white px-6 py-3 rounded-full shadow-xl font-bold text-sm hover:bg-blue-800 transition-all active:scale-95 pointer-events-auto border border-white/20"
           >
             <Download size={18} />
             <span>Abrir PDF Original</span>
           </a>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;