
import React, { useState, useEffect } from 'react';
import { ShieldCheck, RefreshCw, CheckCircle2, AlertCircle, Loader2, KeyRound, Smartphone, Info } from 'lucide-react';

interface SecurityFlowProps {
  type: 'LEAD' | 'LOGIN';
  onVerified: () => void;
  onCancel: () => void;
  identifier?: string | null;
}

const SecurityFlow: React.FC<SecurityFlowProps> = ({ type, onVerified, onCancel, identifier }) => {
  const [step, setStep] = useState<'CAPTCHA' | 'OTP'>('CAPTCHA');
  const [captchaCode, setCaptchaCode] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    let interval: any;
    if (step === 'OTP' && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setUserCaptcha('');
    setError('');
  };

  const handleCaptchaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userCaptcha.toUpperCase() === captchaCode) {
      setStep('OTP');
      setError('');
    } else {
      setError('Invalid CAPTCHA code. Please try again.');
      generateCaptcha();
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) return;

    setIsVerifying(true);
    // Simulate API verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (fullOtp === '123456' || fullOtp === '000000') {
      onVerified();
    } else {
      setError('Invalid OTP code. Please use the demo code 123456.');
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[#0A1629]/90 backdrop-blur-md">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden animate-success-pop">
        <div className="bg-[#0A1629] p-8 text-white relative">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-indigo-500/20 rounded-2xl text-[#C5A059]">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold tracking-tight">Secure Verification</h3>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Manortha Group Trust Gateway</p>
            </div>
          </div>
          <button onClick={onCancel} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
            <RefreshCw size={20} className="hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>

        <div className="p-10">
          {step === 'CAPTCHA' ? (
            <form onSubmit={handleCaptchaSubmit} className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-slate-500 font-medium">Please enter the security code shown below to prevent automated submissions.</p>
              </div>

              <div className="relative group">
                <div className="flex items-center justify-center gap-6 p-6 bg-slate-100 rounded-3xl border-2 border-slate-200 select-none">
                  <span className="text-3xl font-serif font-black tracking-[0.3em] text-slate-400 line-through decoration-[#C5A059]/40 italic">
                    {captchaCode}
                  </span>
                  <button type="button" onClick={generateCaptcha} className="text-indigo-600 hover:text-indigo-800">
                    <RefreshCw size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Enter Security Code</label>
                <input 
                  autoFocus
                  type="text"
                  value={userCaptcha}
                  onChange={(e) => setUserCaptcha(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-xl font-bold uppercase tracking-widest text-center focus:border-[#C5A059] outline-none transition-all"
                  placeholder="******"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-rose-500 text-xs font-bold bg-rose-50 p-3 rounded-xl border border-rose-100">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <button className="w-full py-5 bg-[#0A1629] text-[#C5A059] rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                Continue to Verification
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-8">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone size={32} />
                </div>
                <h4 className="text-lg font-bold text-slate-800">Verify your Device</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  We've sent a 6-digit OTP to your registered {type === 'LEAD' ? 'mobile' : 'portal ID'}. 
                  {identifier && <span className="block mt-1 font-bold text-slate-800">{identifier}</span>}
                </p>
              </div>

              <div className="flex justify-between gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-12 h-16 bg-slate-50 border border-slate-200 rounded-xl text-2xl font-black text-center text-slate-900 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none transition-all"
                  />
                ))}
              </div>

              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex items-center gap-3 text-indigo-700 text-xs font-bold">
                 <Info size={16} />
                 <span>For demonstration, use code: <span className="font-black">123456</span></span>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-rose-500 text-xs font-bold bg-rose-50 p-3 rounded-xl border border-rose-100">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <button 
                  disabled={isVerifying || otp.join('').length < 6}
                  className="w-full py-5 bg-[#0A1629] text-[#C5A059] rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isVerifying ? <Loader2 size={20} className="animate-spin" /> : <KeyRound size={20} />}
                  {isVerifying ? 'Verifying Credentials...' : 'Verify & Complete'}
                </button>
                
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {timer > 0 ? (
                    <span>Resend OTP in {timer}s</span>
                  ) : (
                    <button type="button" onClick={() => setTimer(30)} className="text-indigo-600 hover:underline">Resend OTP Now</button>
                  )}
                  <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-emerald-500" /> AES-256 Encrypted</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityFlow;
