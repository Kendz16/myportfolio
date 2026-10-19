import React, { useState } from 'react';
import { ArrowDown, Mail, Github, Check, Copy, GraduationCap, Facebook, Instagram } from 'lucide-react';
import { KENDREW_PROFILE } from '../data/kendrewData';

interface HomeSectionProps {
  onContactClick: () => void;
  onProjectsClick: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  onContactClick,
  onProjectsClick,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(KENDREW_PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="home" className="py-8 sm:py-12">
      {/* Outer Window Frame matching prototype screen 1 */}
      <div className="bg-[#0b0d14] border-2 border-slate-700/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Name, Subtitle, Intro Box, and 2 Action Buttons */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-amber-400 mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>{KENDREW_PROFILE.education[0].school} · {KENDREW_PROFILE.education[0].degree}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">{KENDREW_PROFILE.location}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-mono uppercase leading-tight">
                I'M {KENDREW_PROFILE.name}
              </h1>
              <p className="text-xl sm:text-2xl text-slate-300 font-medium mt-2 tracking-wide">
                {KENDREW_PROFILE.role}
              </p>
            </div>

            {/* Intro Box matching the wireframe */}
            <div className="border-2 border-slate-700 rounded-2xl p-6 bg-slate-900/40 relative">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-2 block">
                intro
              </span>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {KENDREW_PROFILE.intro}
              </p>
            </div>

            {/* Two Action Buttons below Intro Box matching the wireframe */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={onContactClick}
                className="px-6 py-3 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-98 border-2 border-amber-400 rounded-xl transition-all shadow-md shadow-amber-400/20 cursor-pointer"
              >
                Contact Me
              </button>

              <button
                onClick={onProjectsClick}
                className="px-6 py-3 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 active:scale-98 border-2 border-slate-700 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Right Column: Circular Avatar and Social Media Strip matching the wireframe */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6">
            {/* Big Circular Avatar matching the wireframe circle */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full border-4 border-slate-700 p-1.5 bg-slate-900 shadow-2xl overflow-hidden group">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-950">
                <img
                  src={KENDREW_PROFILE.avatar}
                  alt={KENDREW_PROFILE.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Social Media Strip matching the wireframe box */}
            <div className="w-full max-w-md border-2 border-slate-700 rounded-xl px-5 py-3 bg-slate-900/60 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
                Socials
              </span>

              <div className="flex items-center gap-3 sm:gap-4">
                <a
                  href="https://www.facebook.com/kendrew.gonzaga"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-amber-400 transition-colors p-1"
                  title="Facebook: kendrew.gonzaga"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>

                <a
                  href="https://www.instagram.com/kendrew03_16/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-amber-400 transition-colors p-1"
                  title="Instagram: @kendrew03_16"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                <a
                  href="https://github.com/Kendz16"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-amber-400 transition-colors p-1"
                  title="GitHub: Kendz16"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>

                <button
                  onClick={copyEmail}
                  className="text-slate-300 hover:text-amber-400 transition-colors p-1 cursor-pointer"
                  title={copiedEmail ? 'Email Copied!' : `Copy Email (${KENDREW_PROFILE.email})`}
                  aria-label="Email"
                >
                  {copiedEmail ? (
                    <Check className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Mail className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
