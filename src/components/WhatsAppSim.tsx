
import React, { useState, useEffect } from 'react';
import { MessageSquare, Check, X, Loader2 } from 'lucide-react';

const WhatsAppSim: React.FC = () => {
  const [notification, setNotification] = useState<{ id: string; target: string; status: 'sending' | 'sent' } | null>(null);

  useEffect(() => {
    const handleSend = (e: any) => {
      const { target } = e.detail;
      const id = Math.random().toString(36).substr(2, 9);
      setNotification({ id, target, status: 'sending' });
      
      setTimeout(() => {
        setNotification(prev => prev ? { ...prev, status: 'sent' } : null);
        setTimeout(() => setNotification(null), 3000);
      }, 2000);
    };

    window.addEventListener('whatsapp-send', handleSend);
    return () => window.removeEventListener('whatsapp-send', handleSend);
  }, []);

  if (!notification) return null;

  return (
    <div className="fixed top-6 right-6 z-[200] animate-in slide-in-from-right-8 duration-300">
      <div className="bg-white rounded-2xl shadow-2xl border-l-4 border-emerald-500 p-4 w-72 flex items-center gap-4 overflow-hidden">
        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
          <MessageSquare size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">WhatsApp Gateway</p>
          <p className="text-xs font-bold text-slate-800 truncate">Recipient: {notification.target}</p>
          <div className="flex items-center gap-2 mt-1">
            {notification.status === 'sending' ? (
              <>
                <Loader2 size={12} className="animate-spin text-indigo-500" />
                <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest">Transmitting...</span>
              </>
            ) : (
              <>
                <Check size={12} className="text-emerald-500" />
                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Delivered via API</span>
              </>
            )}
          </div>
        </div>
        <button onClick={() => setNotification(null)} className="text-slate-300 hover:text-slate-500">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default WhatsAppSim;
