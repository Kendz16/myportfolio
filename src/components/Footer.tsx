import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_HERO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#06070a] py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Quiet Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="font-bold text-white font-['Outfit']">
            {PORTFOLIO_HERO.name}
          </span>
          <span aria-hidden="true" className="hidden sm:inline text-slate-700">·</span>
          <span>© {new Date().getFullYear()} Kendz. All rights reserved.</span>
          <span aria-hidden="true" className="hidden sm:inline text-slate-700">·</span>
          <span className="text-slate-500 font-mono">San Francisco & Remote</span>
        </div>

        {/* Center: Clean External Links */}
        <div className="flex items-center gap-6">
          <a
            href={PORTFOLIO_HERO.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href={PORTFOLIO_HERO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={PORTFOLIO_HERO.x}
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            X (Twitter)
          </a>
          <a
            href={`mailto:${PORTFOLIO_HERO.email}`}
            className="hover:text-amber-400 transition-colors"
          >
            Email
          </a>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer py-1"
          aria-label="Back to top"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
