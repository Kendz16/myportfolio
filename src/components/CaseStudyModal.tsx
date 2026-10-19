import React, { useEffect } from 'react';
import { X, ArrowUpRight, Copy, Check, CheckCircle2, Cpu } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenDemo?: (demoType: 'stream' | 'audio' | 'cache') => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onOpenDemo,
}) => {
  const [copiedCode, setCopiedCode] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const copyCode = () => {
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0c0e16] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/60 shrink-0">
          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span className="text-amber-400 font-medium">{project.category}</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>{project.year}</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>{project.role}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Header info */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-['Outfit'] mb-2">
              {project.title}
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          {/* Hero Image Showcase */}
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[16/9] max-h-[360px]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
              <span className="font-mono text-[11px] text-slate-300">{project.impact}</span>
              {project.liveDemoType && onOpenDemo && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenDemo(project.liveDemoType!);
                  }}
                  className="px-3 py-1.5 bg-amber-400 text-slate-950 text-xs font-semibold rounded-md hover:bg-amber-300 transition-colors flex items-center gap-1 cursor-pointer pointer-events-auto"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Launch Interactive Simulator</span>
                </button>
              )}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <span className="text-xs text-slate-400 font-medium">{m.label}</span>
                <span className="text-lg sm:text-xl font-bold font-mono text-white mt-1 tabular-nums">
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400/90 font-medium">
                The Engineering Challenge
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400/90 font-medium">
                Architectural Solution
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-semibold text-white">
              System Highlights & Architectural Decisions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400/90 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Snippet (if available) */}
          {project.codeSnippet && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Core Implementation — {project.codeSnippet.filename}</span>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy Snippet'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
                <code>{project.codeSnippet.code}</code>
              </pre>
            </div>
          )}

          {/* Technologies Used (Unboxed text with separators) */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-200">Technologies:</span>
            {project.stack.map((tech, index) => (
              <React.Fragment key={tech}>
                <span className="text-slate-300 font-mono">{tech}</span>
                {index < project.stack.length - 1 && (
                  <span aria-hidden="true" className="text-slate-600">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800/80 bg-slate-900/60 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400">
            {project.client ? `Client / Org: ${project.client}` : 'Open Research & Development'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
