import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, Copy, Terminal } from 'lucide-react';
import { PORTFOLIO_HERO } from '../data/portfolioData';

interface HeroProps {
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_HERO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Subtle background ambient mesh */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-amber-500/10 via-blue-500/5 to-transparent blur-3xl -z-10"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Split Hero: Left typography & Right visual container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Unboxed Kicker */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400/90 mb-4">
              <span>{PORTFOLIO_HERO.kicker}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">{PORTFOLIO_HERO.location}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12] mb-6 font-['Outfit'] [text-wrap:balance]">
              {PORTFOLIO_HERO.headline}
            </h1>

            {/* Lead Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8 font-normal">
              {PORTFOLIO_HERO.lead}
            </p>

            {/* CTAs & Quick Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#works"
                className="px-5 py-2.5 text-sm font-semibold text-slate-950 bg-amber-400 rounded-lg hover:bg-amber-300 active:scale-98 transition-all flex items-center gap-2 shadow-sm shadow-amber-400/20 whitespace-nowrap cursor-pointer"
              >
                <span>Explore Selected Works</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={onContactClick}
                className="px-5 py-2.5 text-sm font-medium text-slate-200 bg-slate-900/90 border border-slate-700/80 rounded-lg hover:bg-slate-800 hover:text-white active:scale-98 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={copyEmail}
                className="px-4 py-2.5 text-xs font-mono text-slate-400 hover:text-amber-400 bg-slate-950/60 border border-slate-800/80 rounded-lg hover:border-slate-700 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
                title="Copy email address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : PORTFOLIO_HERO.email}</span>
              </button>
            </div>

            {/* Unboxed Availability & Status (No pulsing dots) */}
            <div className="pt-5 border-t border-slate-800/80 text-xs text-slate-400 flex flex-wrap items-center gap-2">
              <span className="font-medium text-slate-300">Status</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{PORTFOLIO_HERO.availability}</span>
            </div>
          </div>

          {/* Right Column: Visual Container at Matching Height */}
          <div className="lg:col-span-5 flex items-center">
            <div className="relative w-full h-[360px] sm:h-[440px] lg:h-full min-h-[380px] rounded-2xl overflow-hidden border border-slate-800/90 bg-slate-900/40 shadow-2xl">
              {!imageError ? (
                <img
                  src="/src/assets/images/hero_developer_portrait_1792413037959.jpg"
                  alt="Kendz at engineering workstation"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-900 to-slate-950 text-slate-400 text-center">
                  <Terminal className="w-12 h-12 text-amber-400/80 mb-3" />
                  <p className="text-sm font-mono text-slate-300 font-medium">Kendz</p>
                  <p className="text-xs text-slate-500 mt-1">Creative Systems Architect & Engineer</p>
                </div>
              )}

              {/* Minimal bottom visual caption with unboxed metadata */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#090a0f]/95 via-[#090a0f]/60 to-transparent flex items-center justify-between text-xs text-slate-300">
                <span className="font-mono text-[11px] text-slate-400">Kendz · Engineering Studio</span>
                <span className="text-[11px] text-amber-400/90 font-mono">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Metrics Row Below the Hero Split */}
        <div className="mt-16 pt-10 border-t border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {PORTFOLIO_HERO.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono tracking-tight text-white tabular-nums">
                    {metric.value}
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-amber-400 font-medium">
                    {metric.unit}
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
