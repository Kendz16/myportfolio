import React from 'react';
import { ArrowUpRight, Check, Quote } from 'lucide-react';
import { EXPERIENCES, TESTIMONIALS } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-mono uppercase tracking-wider text-amber-400/90 mb-2">
            03. Career & System Milestones
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-['Outfit']">
            Proven track record in production architectures.
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl">
            A decade of taking complex distributed problems from whiteboard sketches to multi-region production scale.
          </p>
        </div>

        {/* 2-Column Split: Timeline & Attributable Proof Adjacency */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Timeline Items */}
          <div className="lg:col-span-7 space-y-10">
            {EXPERIENCES.map((exp, index) => (
              <div
                key={exp.period}
                className="relative pl-6 border-l border-slate-800 hover:border-amber-400/80 transition-colors group"
              >
                {/* Timeline node */}
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-700 group-hover:bg-amber-400 transition-colors" />

                {/* Unboxed Metadata Header */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-1.5">
                  <span className="text-amber-400 font-semibold">{exp.period}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-slate-300 font-medium">{exp.company}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{exp.location}</span>
                </div>

                <h3 className="text-lg font-bold text-white font-['Outfit'] mb-2">
                  {exp.role}
                </h3>

                <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                  {exp.description}
                </p>

                {/* Concrete Achievements */}
                <ul className="space-y-2 mb-4">
                  {exp.achievements.map((ach, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-400 flex items-start gap-2 leading-relaxed">
                      <span className="text-amber-400 font-bold shrink-0 mt-0.5">↳</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Unboxed */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 font-mono">
                  <span className="text-slate-400">Stack:</span>
                  {exp.tech.map((t, i) => (
                    <React.Fragment key={t}>
                      <span className="text-slate-300">{t}</span>
                      {i < exp.tech.length - 1 && (
                        <span aria-hidden="true" className="text-slate-700">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Attributable Testimonials & Proof Adjacent */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400/90 font-medium mb-4 flex items-center gap-2">
                <Quote className="w-4 h-4" />
                <span>Executive & Peer Endorsements</span>
              </h3>

              <div className="space-y-6">
                {TESTIMONIALS.map((t, idx) => (
                  <div key={idx} className="space-y-3 pb-6 border-b border-slate-800/80 last:border-b-0 last:pb-0">
                    <p className="text-sm text-slate-300 leading-relaxed italic">
                      "{t.quote}"
                    </p>

                    <div className="flex flex-col text-xs">
                      <span className="font-semibold text-white">{t.author}</span>
                      <span className="text-slate-400">
                        {t.role} · {t.company}
                      </span>
                      <span className="text-[11px] font-mono text-amber-400/80 mt-0.5">
                        {t.relation}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Open Source & Contributions Highlight */}
            <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800/80 space-y-3">
              <div className="text-xs font-mono uppercase text-slate-400">Open Source & Standards</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Active maintainer and contributor to high-performance open-source tools across the Rust, WebAudio, and TypeScript ecosystems.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs font-mono text-amber-400">
                <span>14+ Public Repositories</span>
                <a
                  href="https://github.com/kendz-dev"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1 text-slate-200 hover:text-white"
                >
                  <span>github.com/kendz-dev</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
