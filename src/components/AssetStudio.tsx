import React, { useState } from "react";
import {
  Upload,
  Wand2,
  Search,
  Loader2,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";
import { editProjectImage, analyzeAssetImage } from "../services/gemini";

const AssetStudio: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState<"EDIT" | "ANALYZE">("EDIT");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        setSelectedImage(result);
      }
    };
    reader.readAsDataURL(file);

    setEditedImage(null);
    setAnalysis(null);
  };

  const handleEdit = async () => {
    if (!selectedImage || !prompt) return;
    setIsProcessing(true);
    try {
      const result = await editProjectImage(selectedImage, prompt);
      setEditedImage(result ?? null); // ✅ FIX
    } catch {
      alert("Editing failed. Please try a different prompt.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setIsProcessing(true);
    try {
      const result = await analyzeAssetImage(selectedImage);
      setAnalysis(result ?? null); // ✅ FIX
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif font-black text-manortha-black">
            Asset Intelligence Studio
          </h2>
          <p className="text-slate-500 font-medium">
            Manipulate architectural renders and analyze site progress with Gemini Pro
          </p>
        </div>

        <div className="flex gap-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          <button
            onClick={() => setMode("EDIT")}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              mode === "EDIT"
                ? "bg-manortha-black text-manortha-gold"
                : "text-slate-400"
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setMode("ANALYZE")}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              mode === "ANALYZE"
                ? "bg-manortha-black text-manortha-gold"
                : "text-slate-400"
            }`}
          >
            Analyze
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
            <div className="aspect-video bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center relative overflow-hidden group">
              {selectedImage ? (
                <>
                  <img src={selectedImage} className="w-full h-full object-cover" />
                  <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <span className="bg-white px-4 py-2 rounded-xl text-xs font-black uppercase">
                      Change Image
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept="image/*"
                    />
                  </label>
                </>
              ) : (
                <label className="cursor-pointer flex flex-col items-center gap-4">
                  <Upload size={48} className="text-slate-300" />
                  <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">
                    Upload Project Render
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*"
                  />
                </label>
              )}
            </div>

            <div className="mt-8 space-y-6">
              {mode === "EDIT" ? (
                <>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Change the pool tiles to sapphire blue"
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl"
                  />

                  <button
                    onClick={handleEdit}
                    disabled={isProcessing || !selectedImage || !prompt}
                    className="w-full py-5 bg-manortha-black text-manortha-gold rounded-2xl"
                  >
                    {isProcessing ? <Loader2 className="animate-spin" /> : <Wand2 />}
                    Edit Image
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAnalyze}
                  disabled={isProcessing || !selectedImage}
                  className="w-full py-5 bg-manortha-black text-manortha-gold rounded-2xl"
                >
                  {isProcessing ? <Loader2 className="animate-spin" /> : <Search />}
                  Analyze Image
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-slate-900 rounded-[40px] p-8 text-white flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="text-manortha-gold" />
            <h3 className="text-xl font-serif font-black">AI Output</h3>
          </div>

          <div className="flex-1 flex items-center justify-center">
            {isProcessing ? (
              <Loader2 className="animate-spin text-manortha-gold" size={48} />
            ) : mode === "EDIT" && editedImage ? (
              <img src={editedImage} className="rounded-3xl" />
            ) : mode === "ANALYZE" && analysis ? (
              <p className="whitespace-pre-wrap">{analysis}</p>
            ) : (
              <ImageIcon size={64} className="opacity-20" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetStudio;
