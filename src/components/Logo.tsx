
import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ variant = 'dark', showText = true, size = 'md' }) => {
  const isDark = variant === 'dark';
  
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-24'
  };

  return (
    <div className={`flex items-center gap-3 transition-all ${sizeClasses[size]} select-none`}>
      {/* Monogram Recreated with high fidelity */}
      <div className="relative h-full aspect-square flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-xl">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9D423" />
              <stop offset="60%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#B83B1D" />
            </linearGradient>
            <filter id="glow">
               <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
               <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
               </feMerge>
            </filter>
          </defs>
          {/* Monogram Core */}
          <g filter="url(#glow)">
            <path 
              d="M45,15 C25,15 15,30 15,50 C15,65 25,75 35,80 C25,85 15,95 15,110" 
              transform="scale(0.8) translate(5, 5)"
              fill="none" 
              stroke="url(#logoGradient)" 
              strokeWidth="14" 
              strokeLinecap="round"
            />
            <path 
              d="M55,15 C75,15 85,30 85,50 C85,65 75,75 65,80 C75,85 85,95 85,110" 
              transform="scale(0.8) translate(5, 5)"
              fill="none" 
              stroke="url(#logoGradient)" 
              strokeWidth="14" 
              strokeLinecap="round"
            />
            <path d="M40,50 L60,50" stroke="url(#logoGradient)" strokeWidth="14" strokeLinecap="round" transform="scale(0.8) translate(5, 5)"/>
          </g>
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col justify-center h-full">
          <span className={`text-3xl md:text-4xl font-serif font-black tracking-tighter leading-none ${isDark ? 'text-manortha-black' : 'text-white'}`}>
            manortha
          </span>
          <div className="flex flex-col mt-0.5">
            <span className={`text-[9px] md:text-[11px] font-black tracking-[0.25em] uppercase ${isDark ? 'text-manortha-black/70' : 'text-white/60'}`}>
              BUILDERS & DEVELOPERS
            </span>
            <div className="h-2 w-full bg-manortha-gold mt-1 self-end rounded-full shadow-lg shadow-amber-900/20" style={{ width: '45%' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;
