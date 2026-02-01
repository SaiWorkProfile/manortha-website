
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, X, Phone, Waves, Loader2, Sparkles, Volume2, PlayCircle } from 'lucide-react';
import { createLiveAgentSession, encodeAudio, decodeAudio, decodeAudioData } from '../services/live-agent';

const LiveConcierge: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [sessionStarted, setSessionStarted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());
  const streamRef = useRef<MediaStream | null>(null);

  const startSession = async () => {
    // Audit: Audio Context MUST start on user interaction
    setSessionStarted(true);
    setIsConnecting(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      inputAudioContextRef.current = new AudioCtx({ sampleRate: 16000 });
      outputAudioContextRef.current = new AudioCtx({ sampleRate: 24000 });

      // Browsers require explicit context resume on interaction
      await inputAudioContextRef.current.resume();
      await outputAudioContextRef.current.resume();

      const sessionPromise = createLiveAgentSession({
        onopen: () => {
          setIsConnecting(false);
          setIsActive(true);
          
          if (!inputAudioContextRef.current) return;
          
          const source = inputAudioContextRef.current.createMediaStreamSource(stream);
          const scriptProcessor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
          
          scriptProcessor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const int16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) {
              int16[i] = inputData[i] * 32768;
            }
            
            const pcmBlob = {
              data: encodeAudio(new Uint8Array(int16.buffer)),
              mimeType: 'audio/pcm;rate=16000',
            };

            sessionPromise.then((session: any) => {
              session.sendRealtimeInput({ media: pcmBlob });
            });
          };

          source.connect(scriptProcessor);
          scriptProcessor.connect(inputAudioContextRef.current.destination);
        },
        onmessage: async (message) => {
          const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (base64Audio && outputAudioContextRef.current) {
            setIsSpeaking(true);
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContextRef.current.currentTime);
            
            const audioBuffer = await decodeAudioData(
              decodeAudio(base64Audio),
              outputAudioContextRef.current,
              24000,
              1
            );
            
            const source = outputAudioContextRef.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(outputAudioContextRef.current.destination);
            source.addEventListener('ended', () => {
              sourcesRef.current.delete(source);
              if (sourcesRef.current.size === 0) setIsSpeaking(false);
            });
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += audioBuffer.duration;
            sourcesRef.current.add(source);
          }

          if (message.serverContent?.interrupted) {
            sourcesRef.current.forEach(s => {
              try { s.stop(); } catch(e) {}
            });
            sourcesRef.current.clear();
            nextStartTimeRef.current = 0;
            setIsSpeaking(false);
          }
        },
        onerror: (e) => {
          console.error('Live Agent Error:', e);
          setIsConnecting(false);
        },
        onclose: () => {
          setIsActive(false);
          setIsConnecting(false);
        },
      });
      
      sessionRef.current = sessionPromise;
      
    } catch (err) {
      console.error('Failed to start Live Concierge:', err);
      setIsConnecting(false);
      setSessionStarted(false);
      alert("Microphone access is required for the virtual tour. Please enable permissions and try again.");
    }
  };

  const stopSession = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    if (inputAudioContextRef.current) inputAudioContextRef.current.close();
    if (outputAudioContextRef.current) outputAudioContextRef.current.close();
    if (sessionRef.current) {
      sessionRef.current.then((s: any) => {
        try { s.close(); } catch(e) {}
      });
    }
    setIsActive(false);
    setIsSpeaking(false);
  };

  useEffect(() => {
    return () => stopSession();
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#0A1629]/95 backdrop-blur-xl animate-fade-in">
      <div className="max-w-lg w-full bg-white rounded-[40px] shadow-2xl overflow-hidden relative border border-white/20">
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 transition-colors z-20 cursor-pointer">
          <X size={24} />
        </button>

        {!sessionStarted ? (
          <div className="p-16 flex flex-col items-center text-center space-y-8 animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-[#C5A059]/10 rounded-full flex items-center justify-center text-[#C5A059] mb-4">
              <Sparkles size={48} />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-serif text-[#0A1629]">Bespoke AI Consultation</h3>
              <p className="text-slate-500 font-light text-lg italic">
                You are about to enter a private audio consultation with Elena, our premier luxury advisor.
              </p>
            </div>
            <button 
              onClick={startSession}
              className="w-full py-6 bg-[#0A1629] text-[#C5A059] rounded-2xl font-black text-xs uppercase tracking-[0.4em] hover:bg-[#C5A059] hover:text-[#0A1629] transition-all flex items-center justify-center gap-4 shadow-2xl group cursor-pointer"
            >
              <PlayCircle size={24} className="group-hover:scale-110 transition-transform" /> Begin Virtual Tour
            </button>
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em]">Encrypted Real-time Voice Session</p>
          </div>
        ) : (
          <div className="p-12 flex flex-col items-center text-center">
            <div className="mb-12 relative">
               <div className={`absolute inset-0 rounded-full bg-indigo-500/10 scale-150 transition-all duration-500 ${isSpeaking ? 'animate-ping' : ''}`} />
               <div className={`w-32 h-32 rounded-full bg-[#0A1629] flex items-center justify-center text-[#C5A059] relative z-10 border-4 border-[#C5A059]/30 shadow-2xl transition-transform duration-500 ${isSpeaking ? 'scale-110' : 'scale-100'}`}>
                  {isConnecting ? <Loader2 size={48} className="animate-spin" /> : isSpeaking ? <Volume2 size={48} /> : <Mic size={48} />}
               </div>
            </div>

            <h3 className="text-3xl font-serif text-[#0A1629] mb-4">Elena</h3>
            <p className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-xs mb-8">Virtual Sales Associate</p>
            
            <div className="h-12 flex items-center gap-1 justify-center mb-10">
              {isActive && Array.from({ length: 12 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 bg-indigo-500 rounded-full transition-all duration-300 ${isSpeaking ? 'animate-bounce' : 'h-2 opacity-20'}`}
                  style={{ 
                    height: isSpeaking ? `${Math.random() * 40 + 10}px` : '8px',
                    animationDelay: `${i * 0.05}s`
                  }}
                />
              ))}
            </div>

            <p className="text-slate-500 text-lg font-light leading-relaxed mb-12 italic min-h-[3rem]">
              {isConnecting ? "Establishing secure connection..." : isSpeaking ? "Elena is speaking..." : "Elena is awaiting your inquiry..."}
            </p>

            <button 
              onClick={onClose}
              className="w-full py-6 bg-rose-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.4em] hover:bg-rose-600 transition-all flex items-center justify-center gap-3 shadow-xl cursor-pointer"
            >
              <MicOff size={18} /> End Consultation
            </button>
            
            <div className="mt-8 flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <Sparkles size={12} className="text-[#C5A059]" />
              Secure Real-time Intelligence Engine
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveConcierge;
