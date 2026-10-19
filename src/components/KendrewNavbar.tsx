import React from 'react';
import { KENDREW_PROFILE } from '../data/kendrewData';

interface KendrewNavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onAvatarClick: () => void;
}

export const KendrewNavbar: React.FC<KendrewNavbarProps> = ({
  activeSection,
  onNavigate,
  onAvatarClick,
}) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
  ];

  return (
    <header className="sticky top-4 z-40 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-[#0f111a]/95 backdrop-blur-md border-2 border-slate-700/80 rounded-2xl px-6 py-3.5 flex items-center justify-between shadow-xl shadow-black/30">
        {/* Brand: Myportfolio */}
        <button
          onClick={() => onNavigate('home')}
          className="text-base sm:text-lg font-bold tracking-tight font-mono text-white hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer"
        >
          Myportfolio
        </button>

        {/* Navigation links & Circular Icon */}
        <div className="flex items-center gap-6 sm:gap-8">
          <nav className="flex items-center gap-5 sm:gap-7 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`transition-colors whitespace-nowrap cursor-pointer relative py-0.5 ${
                    isActive
                      ? 'text-amber-400 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Circle Action Icon from wireframe (Profile Thumbnail / Contact Trigger) */}
          <button
            onClick={onAvatarClick}
            className="w-8 h-8 rounded-full border-2 border-amber-400 overflow-hidden hover:scale-105 active:scale-95 transition-transform cursor-pointer shrink-0 shadow-sm shadow-amber-400/20"
            title="Kendrew Gonzaga (Click to view contact options)"
            aria-label="Open contact and profile"
          >
            <img
              src={KENDREW_PROFILE.avatar}
              alt="Kendrew Gonzaga"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
