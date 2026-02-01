import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Clapperboard, 
  Sparkles, 
  Loader2, 
  AlertCircle,
  Monitor,
  Upload,
  Search
} from 'lucide-react';
import { analyzeVideoFootage } from '../services/gemini';

const MESSAGES = [
  "Analyzing architectural specifications...",
  "Drafting cinematic storyboard...",
  "Rendering luxury 3D assets...",
  "Applying photorealistic textures...",
  "Simulating golden hour lighting...",
  "Optimizing for 4K display...",
  "Finalizing your real estate masterpiece..."
];

interface GeneratedVideo {
  url: string;
  prompt: string;
  timestamp: number;
}

const VideoStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [resolution] = useState<'720p' | '1080p'>('1080p');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [history, setHistory] = useState<GeneratedVideo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [videoAnalysis, setVideoAnalysis] = useState<string | null>(null);

  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      let idx = 0;
      setStatusMessage(MESSAGES[0]);
      interval = setInterval(() => {
        idx = (idx + 1) % MESSAGES.length;
        setStatusMessage(MESSAGES[idx]);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) =>
        setSelectedImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && !selectedImage) return;

    setIsGenerating(true);
    setError(null);

    try {
      // SIMULATED generation (real API should be in services/gemini.ts)
      await new Promise(r => setTimeout(r, 8000));

      const dummyVideo =
        "https://www.w3schools.com/html/mov_bbb.mp4";

      setHistory(prev => [
        { url: dummyVideo, prompt, timestamp: Date.now() },
        ...prev
      ]);
    } catch (err) {
      setError("Production failed. Retry.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVideoAnalysis = async () => {
    setIsAnalyzing(true);
    if (history.length > 0) {
      const result = await analyzeVideoFootage(history[0].url);
      setVideoAnalysis(result ?? null);
    }
    setIsAnalyzing(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div>
            <div className="flex items-center gap-3 text-[#C5A059] mb-6">
              <Sparkles size={24} />
              <span className="text-xs font-bold uppercase tracking-[0.4em]">
                Veo Production Suite
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-2xl p-6 relative">
                {selectedImage ? (
                  <img src={selectedImage} className="rounded-xl opacity-40" />
                ) : (
                  <Upload size={32} className="text-slate-500" />
                )}
                <input type="file" className="absolute inset-0 opacity-0" onChange={handleImageUpload} />
              </div>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Animate the sky..."
                className="bg-transparent border border-white/10 rounded-2xl p-4"
              />
            </div>

            {error && (
              <div className="p-4 bg-rose-500/20 border border-rose-500/50 rounded-xl text-xs flex gap-2">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest mt-6"
            >
              {isGenerating ? <Loader2 className="animate-spin" /> : <Play />}
              Generate
            </button>
          </div>

          <div className="aspect-video bg-white/5 rounded-2xl flex items-center justify-center">
            {isGenerating ? (
              <Clapperboard size={48} />
            ) : history.length > 0 ? (
              <video src={history[0].url} controls autoPlay loop />
            ) : (
              <Monitor size={64} />
            )}
          </div>
        </div>
      </div>

      {history.length > 0 && (
        <div className="bg-white p-10 rounded-[40px] border shadow-sm">
          <button
            onClick={handleVideoAnalysis}
            disabled={isAnalyzing}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl"
          >
            {isAnalyzing ? <Loader2 className="animate-spin" /> : <Search />}
            Analyze Video
          </button>

          {videoAnalysis && (
            <p className="mt-4 italic">{videoAnalysis}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoStudio;
