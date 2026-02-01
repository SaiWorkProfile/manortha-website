import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  X,
  Loader2,
  Sparkles,
  Languages,
  ChevronDown,
} from "lucide-react";
import { createAIChatSession } from "../services/gemini";
import type { SupportedLanguage } from "../types";

interface Message {
  role: "user" | "model";
  text: string;
}

const LANGUAGES: SupportedLanguage[] = [
  "English",
  "Hindi",
  "Kannada",
  "Telugu",
  "Tamil",
  "Marathi",
];

const AIChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<SupportedLanguage>("English");
  const [showLangs, setShowLangs] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Good day. I am the Manortha Group Elite Concierge. How may I assist you?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);

  const hasKey = Boolean(import.meta.env.VITE_API_KEY);

  useEffect(() => {
    if (!hasKey) return;
    chatSessionRef.current = createAIChatSession(language);
  }, [language, hasKey]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (!chatSessionRef.current) {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "AI service not configured." },
      ]);
      return;
    }

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatSessionRef.current.sendMessageStream({
        message: userMessage,
      });

      let fullResponse = "";
      setMessages((prev) => [...prev, { role: "model", text: "" }]);

      for await (const chunk of response) {
        const chunkText = (chunk as any).text || "";
        fullResponse += chunkText;

        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1].text = fullResponse;
          return copy;
        });
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "AI error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen && (
        <div
          className="
            mb-4 w-[380px] 
            max-h-[80vh]
            bg-white rounded-3xl shadow-2xl 
            border border-slate-200 
            flex flex-col overflow-hidden
          "
        >
          {/* HEADER */}
          <div className="bg-[#0A1629] p-4 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#C5A059] rounded-lg flex items-center justify-center text-[#0A1629] font-black">
                M
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase text-[#C5A059]">
                  Elite Concierge
                </h3>
                <span className="text-[10px] text-slate-400 uppercase">
                  Global Support
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* LANGUAGE */}
              <div className="relative">
                <button
                  onClick={() => setShowLangs(!showLangs)}
                  className="flex items-center gap-1.5 px-2 py-1 bg-white/10 rounded-lg text-[10px] font-black uppercase"
                >
                  <Languages size={14} /> {language} <ChevronDown size={10} />
                </button>

                {showLangs && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl p-2 w-32 grid gap-1 z-50">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setShowLangs(false);
                        }}
                        className={`text-left px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase ${
                          language === lang
                            ? "bg-[#C5A059] text-[#0A1629]"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-[#0A1629] text-[#C5A059]"
                      : "bg-white border border-slate-200 text-slate-700"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="p-4 bg-white border-t border-slate-100 shrink-0">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="How may I assist you?"
                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#0A1629] text-[#C5A059] rounded-lg"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>

            <p className="mt-2 text-[9px] text-center text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1">
              <Sparkles size={10} className="text-[#C5A059]" /> Multilingual AI
            </p>
          </div>
        </div>
      )}

      {/* FLOATING BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full flex items-center justify-center bg-[#0A1629] text-[#C5A059]"
      >
        {isOpen ? <X size={28} /> : <Bot size={28} />}
      </button>
    </div>
  );
};

export default AIChatBox;
